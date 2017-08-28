const {remote} = require('electron');
const {BrowserWindow, dialog, shell} = remote;
const fs = require('fs');

//Import
$('#import-btn').on('click', (event) => {
  $(event.target).blur();

  dialog.showOpenDialog({title: "Importuj plik", filters: [{name: 'Plik JSON', extensions: ['json']}]}, (filePaths) => {
    if(filePaths){
      if(fs.existsSync(filePaths[0])){
        let data = fs.readFileSync(filePaths[0], 'utf8');
        if(data){
          lockers = JSON.parse(data);
          storage.saveFile(lockers);
          updateStats();
          showInfo('import-export', 'success', 'Zaimportowano.');
        }else showInfo('import-export', 'error', 'Plik jest pusty!.');
      }else showInfo('import-export', 'error', 'Błąd! Plik nie istnieje!');
    }
  });
});

//Export
$('#export-btn').on('click', (event) => {
  $(event.target).blur();

  dialog.showSaveDialog({title: "Exportuj plik", defaultPath: "storage.json", filters: [{name: 'Plik JSON', extensions: ['json']}]}, (filePath) => {
    if(filePath){
      let data = JSON.stringify(lockers);
      fs.writeFile(filePath, data, (err) => {
        if(err){
          console.error(err);
          showInfo('import-export', 'error', 'Błąd');
        }
      });

      showInfo('import-export', 'success', 'Wyeksportowano.');
    }
  });
});
