
//add file

const fs = require("fs");

const filePath = "02-write-file/text.txt";

fs.writeFile(filePath, "", function(err){

  if (err) {
    console.log(err);

    return;
  }

  console.log('enter text, to exit press "ctrl + c" or enter "exit"');

});

// console 

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout

});


function farewellMessage() {
  console.log('Goodbye!');
}

rl.on('close', farewellMessage)

// writing to file

rl.on('line', line => {
  if (line === 'exit'){
    rl.close();
    return;
  }

  fs.appendFile(filePath, line+'\n', function(error){
    if(error) throw error;
  })

})