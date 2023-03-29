const fs = require('fs');
const fsExtra = require('fs-extra');

const templateContent = fs.readFileSync('./06-build-page/template.html', 'utf-8')

const articlesContent = fs.readFileSync('./06-build-page/components/articles.html', 'utf-8')
const footerContent = fs.readFileSync('./06-build-page/components/footer.html', 'utf-8')
const headerContent = fs.readFileSync('./06-build-page/components/header.html', 'utf-8')

const replacedTempCont = templateContent
  .replace(/{{articles}}/g, articlesContent)
  .replace(/{{footer}}/g, footerContent)
  .replace(/{{header}}/g, headerContent)

fs.mkdir('./06-build-page/project-dist', (err) => {
  if (err) console.error(err)
})
fs.writeFile('./06-build-page/project-dist/index.html', replacedTempCont, (err) => {
  if (err) console.error(err)
  console.log('New file index.html is created successfully.')
})

const folderPath = './06-build-page/styles'
const cssFiles = []

fs.readdir(folderPath, (err, files) => {
  if (err) console.error(err)
  files.forEach(file => {
    cssFiles.push(file)
  })
  cssFiles.forEach(cssFile => {
    const input = fs.createReadStream(`./06-build-page/styles/${cssFile}`)
    const output = fs.createWriteStream('./06-build-page/project-dist/style.css')
    input.pipe(output)
  })
  console.log('New file style.css is created successfully.')
})

const src = './06-build-page/assets'
const dest = './06-build-page/project-dist/assets'

fsExtra.copy(src, dest, (err) => {
  if (err) throw err;
  console.log('Assets folder was successfully copied.');
});