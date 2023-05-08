import path from 'node:path'
import fs from 'fs-extra'
import request from 'request'
import ora from 'ora'
import chalk from 'chalk'
import AdmZip from 'adm-zip'

export interface FileStat {
  name: string
  isDirectory: boolean
  isFile: boolean
}

// tempPath templates/baicie-temp /temp.zip
export async function download(url: string, tempPath: string) {
  const spinner = ora(`正在从 ${url} 拉取远程模板...`).start()
  const zipPath = path.join(tempPath, 'temp.zip')

  return new Promise<FileStat[]>((resolve) => {
    request(url)
      .pipe(fs.createWriteStream(zipPath))
      .on('close', () => {
        // 解压
        const zip = new AdmZip(zipPath)
        zip.extractAllTo(tempPath, true)
        // 过滤文件
        const files = readDirWithFileTypes(tempPath).filter(
          file => !file.name.startsWith('.git') && file.isDirectory && file.name !== '__MACOSX',
        )

        // 没有文件
        if (files.length !== 1) {
          spinner.color = 'red'
          spinner.fail(chalk.red(`拉取远程模板仓库失败！\n${new Error('远程模板源组织格式错误')}`))
          return resolve([])
        }

        spinner.color = 'green'
        spinner.succeed(`${chalk.grey('拉取远程模板仓库成功！')}`)

        resolve(files)
      })
      .on('error', async (err) => {
        spinner.color = 'red'
        spinner.fail(chalk.red(`拉取远程模板仓库失败！\n${err}`))
        await fs.remove(tempPath)
        return resolve([])
      })
  })
}

export function readDirWithFileTypes(folder: string): FileStat[] {
  const list = fs.readdirSync(folder)
  const res = list.map((name) => {
    const stat = fs.statSync(path.join(folder, name))
    return {
      name,
      isDirectory: stat.isDirectory(),
      isFile: stat.isFile(),
    }
  })
  return res
}
