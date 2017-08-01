let fs = require('fs');
let filename = 'storage.json';

function loadFile() {
  console.log("Wczytywanie pliku");
  if(fs.existsSync(filename)){
    let data = fs.readFileSync(filename, 'utf8');
    if(data) return JSON.parse(data);
    else return [];
  }else{
    console.log("Plik nie istnieje. Utworzono nowy plik.");
    fs.writeFile(filename, '', (err) => {
      if(err) console.log(err);
    });
    return [];
  }
}

function saveFile(dataJSON) {
  let data = JSON.stringify(dataJSON);
  if(!fs.existsSync(filename)) console.log("Plik nie istnieje. Utworzono nowy plik.");
  fs.writeFile(filename, data, (err) => {
    if(err) console.log(err);
  });
  console.log("Plik zapisany.");
}

module.exports = {loadFile, saveFile};
