
const fs = require('fs');
const path = require('node:path');

const filePath = "05-merge-styles/project-dist/bundle.css";
const directoryPath = "05-merge-styles/styles"


// Add file bundle.css

fs.writeFile(filePath, "", function(err){

  if (err) {
    console.log(err);

    return;
  }

});

// Check files extension 

fs.readdir(directoryPath, {withFileTypes: true}, (err, files) => {

  if (err) throw err;

  files.forEach((item, index) => {

    if (item.isFile()) {
      const parse = path.parse(`${directoryPath}/${item.name}`);
      const pathFileStyle = `${parse.dir}/${parse.base}`;
      const postfix = index + 1 === files.length ? '': '\n';

      if (parse.ext === '.css') {
        readFile(pathFileStyle, postfix);

      }

    }
  })
});


// Reading files style and write to array

function readFile(item, postfix) {
  fs.readFile(item, "utf8", function(error, data) {

    if (error) throw error; 
    writeFile(data+postfix);

  });
}


// Writing data to a file

function writeFile (data) {
  fs.appendFile(filePath, data, function(error){

    if(error) throw error;

  });
}






