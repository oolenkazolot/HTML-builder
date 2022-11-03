const fs = require('fs');
const path = require('node:path');

const newDirectoryPath = path.join(__dirname, 'project-dist');
const directory = path.dirname(newDirectoryPath);

//Add new directory project-dist

fs.mkdir(newDirectoryPath, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  addHtml();
  copyStyles();
  copyAssets();
});

function addHtml() {
  fs.readFile(`${directory}/template.html`, 'utf8', function (error, template) {
    fs.readFile(`${directory}/components/header.html`, 'utf8', function (error, header) {
      template = template.replace('{{header}}', header);

      fs.readFile(`${directory}/components/articles.html`, 'utf8', function (error, articles) {
        template = template.replace('{{articles}}', articles);

        fs.readFile(`${directory}/components/footer.html`, 'utf8', function (error, footer) {
          template = template.replace('{{footer}}', footer);
          fs.writeFile(`${directory}/project-dist/index.html`, template, function (error) {
            if (error) throw error;
          });
        });
      });
    });
  });
}

function copyStyles() {
  const filePath = path.join(__dirname, 'project-dist/style.css');
  const directoryPath = path.join(__dirname, 'styles');

  // Add file bundle.css

  fs.writeFile(filePath, '', function (err) {
    if (err) {
      console.log(err);

      return;
    }
  });

  // Check files extension

  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((item, index) => {
      if (item.isFile()) {
        const parse = path.parse(`${directoryPath}/${item.name}`);
        const pathFileStyle = `${parse.dir}/${parse.base}`;
        const postfix = index + 1 === files.length ? '' : '\n';

        if (parse.ext === '.css') {
          readFile(pathFileStyle, postfix);
        }
      }
    });
  });

  // Reading files style and write to array

  function readFile(item, postfix) {
    fs.readFile(item, 'utf8', function (error, data) {
      if (error) throw error;
      writeFile(data + postfix);
    });
  }

  // Writing data to a file

  function writeFile(data) {
    fs.appendFile(filePath, data, function (error) {
      if (error) throw error;
    });
  }
}

function copyAssets() {
  const newDirectoryPath = path.join(__dirname, 'project-dist/assets');
  const directoryPath = path.join(__dirname, 'assets');
  copyDir(directoryPath, newDirectoryPath);
}

function copyDir(directoryPath, newDirectoryPath) {
  fs.mkdir(newDirectoryPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((element) => {
      if (!element.isFile()) {
        copyDir(`${directoryPath}/${element.name}`, `${newDirectoryPath}/${element.name}`);
      } else {
        fs.copyFile(`${directoryPath}/${element.name}`, `${newDirectoryPath}/${element.name}`, (err) => {
          if (err) throw err;
        });
      }
    });
  });
}
