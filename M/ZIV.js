const fs = require('fs');
const readline = require('readline');
const { exec } = require('child_process');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funksiýa ulanyjydan bukjaň ýoly barada soramak üçin
function askForDirectoryPath() {
  rl.question('.ziv faýlly papkaň ýoluny görkeziň: ', (dirPath) => {
    if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
      const zivFiles = fs.readdirSync(dirPath).filter(file => path.extname(file) === '.ziv');
      if (zivFiles.length > 0) {
        console.log(`Papkada ${zivFiles.length} sany .ziv faýly tapyldy:`);
        zivFiles.forEach((file, index) => {
          console.log(`${index + 1}. ${file}`);
        });
        askForFileChoice(dirPath, zivFiles);
      } else {
        console.error('Papkada hiç hili .ziv faýly ýok. Täzeden synanyşyň.');
        askForDirectoryPath();
      }
    } else {
      console.error('Papka tapylmady ýa-da bu papka däl. Täzeden synanyşyň.');
      askForDirectoryPath();
    }
  });
}

// Funksiýa ulanyjydan faýly saýlamagy barada soramak üçin
function askForFileChoice(dirPath, zivFiles) {
  rl.question('Haýsy faýl bilen işleşmek isleýändigiňizi görkeziň: ', (choice) => {
    const fileIndex = parseInt(choice) - 1;
    if (fileIndex >= 0 && fileIndex < zivFiles.length) {
      const selectedFile = path.join(dirPath, zivFiles[fileIndex]);
      runPythonScript(selectedFile);
    } else {
      console.error('Ýalňyş saýladyňyz. Täzeden synanyşyň.');
      askForFileChoice(dirPath, zivFiles);
    }
  });
}

// Python skriptini ýerine ýetirmek üçin funksiýa
function runPythonScript(filePath) {
  const command = `python Main.py ${filePath}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`Ýalňyşlyk: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
    rl.close();
  });
}

// Bukjaň ýoly barada soramak funksiýasyny işletmek
askForDirectoryPath();
