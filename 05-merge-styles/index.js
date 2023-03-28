const fs = require('fs')
const folderPath = './05-merge-styles/styles'

const cssFiles = []

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err)
    return
  }
  files.forEach(file => {
    const isCssFile = /.*\.css$/i.test(file)
    if (isCssFile) cssFiles.push(file)
  })
  cssFiles.forEach(cssFile => {
    const input = fs.createReadStream(`./05-merge-styles/styles/${cssFile}`)
    const output = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css')
    input.pipe(output)
  })
})

