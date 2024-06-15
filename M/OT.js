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
  rl.question('.tnl faýlly papkaň ýoluny görkeziň: : ', (dirPath) => {
    if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
      const tnlFiles = fs.readdirSync(dirPath).filter(file => path.extname(file) === '.tnl');
      if (tnlFiles.length > 0) {
        console.log(`Papkada ${tnlFiles.length} sany .tnl faýl tapyldy`);
        tnlFiles.forEach((file, index) => {
          console.log(`${index + 1}. ${file}`);
        });
        askForFileChoice(dirPath, tnlFiles);
      } else {
        console.error('Papkada hiç hili .tnl faýl tapylmady. Täzeden synanyşyň.');
        askForDirectoryPath();
      }
    } else {
      console.error('Papka tapylmady ýa-da bu papka däl. Täzeden synanyşyň.');
      askForDirectoryPath();
    }
  });
}

// Функция для запроса у пользователя выбора файла
function askForFileChoice(dirPath, tnlFiles) {
  rl.question('Haýsy faýl bilen işleşmek isleýändigiňizi görkeziň:: ', (choice) => {
    const fileIndex = parseInt(choice) - 1;
    if (fileIndex >= 0 && fileIndex < tnlFiles.length) {
      const selectedFile = path.join(dirPath, tnlFiles[fileIndex]);
      runPythonScript(selectedFile);
    } else {
      console.error('Ýalňyş saýladyňyz. Täzeden synanyşyň.');
      askForFileChoice(dirPath, tnlFiles);
    }
  });
}

// Функция для выполнения Python скрипта
function runPythonScript(filePath) {
  const command = `python Main.py ${filePath}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ýalňyşlyk: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
    rl.close();
  });
}

// Запуск функции запроса пути к папке
askForDirectoryPath();