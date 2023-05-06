import fs from 'node:fs'
import cliProgress from 'cli-progress'
import request from 'request'

export async function download(url: string, savePath: string) {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

  let current = 0
  return new Promise((resolve, reject) => {
    request(url)
      .on('response', (response) => {
        const total = parseInt(response.headers['content-length'] ?? '0') || 0
        bar.start(total, 0)
      })
      .on('data', (data) => {
        current += data.length
        bar.update(current)
      })
      .on('close', (err) => {
        if (err) {
          reject(err)
          return
        }

        bar.stop()

        resolve(null)
      })
      .pipe(fs.createWriteStream(savePath))
  })
}
