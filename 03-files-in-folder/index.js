const { readdir } = require('fs/promises')
const path = require('path')
const fs = require('fs')

async function readDirectory() {
  try {
    const files = await readdir('./03-files-in-folder/secret-folder', { withFileTypes: true })
    files.forEach(file => {
      if (file.isDirectory()) {
        console.log(`${file.name} is a directory`)
      } else if (file.isFile()) {
        const fileExtension = path.extname(`${file.name}`).replace('.', '')
        const fileName = path.parse(`${file.name}`)
        const filePath = `./03-files-in-folder/secret-folder/${file.name}`

        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error(err)
            return
          }
          const fileSize = Math.round(stats.size / 1024)
          console.log(`${fileName.name} - ${fileExtension} - ${fileSize}kb`)
        })

      }
    })
  }
  catch (error) {
    console.error(error.message)
  }
}

readDirectory()