import { download } from './download'

// import consola from 'consola'

// declare module 'download-git-repo';
// download('flippidippi/download-git-repo-fixture', 'test/tmp', { }, (err) => {
//   consola.log(err ? 'Error' : 'Success')
// })

interface DownloadOpt {
  /** true git false 源码（gitee） */
  clone?: boolean
}

export async function downloadWarpper(repo: string, savePath: string) {
  // return new Promise((resolve, reject) => {
  //   download(repo, dest, opts, (err: unknown) => {
  //     consola.log(err ? 'Error' : 'Success')
  //     err ? reject(err) : resolve(err)
  //   })
  // })
  await download(repo, `${savePath}/temp.zip`)
}
