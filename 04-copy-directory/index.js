const fs = require('fs')
const path = require('path')
const src = './04-copy-directory/files'
const dest = './04-copy-directory/files-copy'

function copyDir() {
  fs.mkdirSync(dest)
  const files = fs.readdirSync(src)
  for (let file of files) {
    const srcPath = path.join(src, file)
    const destPath = path.join(dest, file)
    fs.copyFileSync(srcPath, destPath)
  }
}

copyDir()