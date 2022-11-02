
const newDirectoryPath = "04-copy-directory/files-copy";
const directoryPath = "04-copy-directory/files";

const fs = require('fs');

fs.mkdir(newDirectoryPath, { recursive: true }, (err) => {

  if (err) {
    console.error(err)
    return;
  }

})

fs.readdir(directoryPath, (err, files) => {

  if (err) {
    console.error(err)
    return;
  }

  files.forEach(element => {
    fs.copyFile(`${directoryPath}/${element}`, `${newDirectoryPath}/${element}`, err => {

      if(err) throw err; // failed to copy file

    });

  });
})
