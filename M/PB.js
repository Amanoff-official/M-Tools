const fs = require('fs');
const readline = require('readline');
const { exec } = require('child_process');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Функция для запроса у пользователя пути к папке
function askForDirectoryPath() {
  rl.question('.pb faýlly papkaň ýoluny görkeziň:  ', (dirPath) => {
    if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
      const pbFiles = fs.readdirSync(dirPath).filter(file => path.extname(file) === '.pb');
      if (pbFiles.length > 0) {
        console.log(`Papkada ${pbFiles.length} sany .pb faýl tapyldy:`);
        pbFiles.forEach((file, index) => {
          console.log(`${index + 1}. ${file}`);
        });
        askForFileChoice(dirPath, pbFiles);
      } else {
        console.error('Papkada hiç hili .pb faýl tapylmady. Täzeden synanyşyň.');
        askForDirectoryPath();
      }
    } else {
      console.error('Papka tapylmady ýa-da bu papka däl. Täzeden synanyşyň.');
      askForDirectoryPath();
    }
  });
}

// Функция для запроса у пользователя выбора файла
function askForFileChoice(dirPath, pbFiles) {
  rl.question('Haýsy faýl bilen işleşmek isleýändigiňizi görkeziň: ', (choice) => {
    const fileIndex = parseInt(choice) - 1;
    if (fileIndex >= 0 && fileIndex < pbFiles.length) {
      const selectedFile = path.join(dirPath, pbFiles[fileIndex]);
      runPythonScript(selectedFile);
    } else {
      console.error('Ýalňyş saýladyňyz. Täzeden synanyşyň.');
      askForFileChoice(dirPath, pbFiles);
    }
  });
}

// Функция для выполнения Python скрипта
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

// Запуск функции запроса пути к папке
askForDirectoryPath();