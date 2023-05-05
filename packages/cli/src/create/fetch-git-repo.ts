import download from 'download-git-repo'

// declare module 'download-git-repo';
download('flippidippi/download-git-repo-fixture', 'test/tmp', { }, (err) => {
  console.log(err ? 'Error' : 'Success')
})
