const {remote} = require('electron');
const {BrowserWindow, dialog, shell} = remote;
const fs = require('fs');

let printWindow;
let save_pdf_path;

//Work in progress

/*$('#print-btn').on('click', () => {
  $('#print-btn').blur();
  printWindow = new BrowserWindow({'auto-hide-menu-bar':true});
  printWindow.loadURL('file://' + __dirname + '/print.html');
  printWindow.show();

  printWindow.webContents.on('did-finish-load', savePDF);

  printWindow.on('closed', () => {
    printWindow = null;
  });
});*/

function getPDFPrintSettings() {
  var option = {
    landscape: false,
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    pageSize: 'A4',
  };

  return option;
}

function savePDF() {
  if (!printWindow) {
    dialog.showErrorBox('Błąd', "Okno do drukowania nie jest otwarte!");
    return;
  }

  dialog.showSaveDialog(printWindow, {title: "Zapis"}, (file_path) => {
    if (file_path) {
      printWindow.webContents.printToPDF(getPDFPrintSettings(), (err, data) => {
        if (err) {
          dialog.showErrorBox('Błąd', err);
          return;
        }

        fs.writeFile(file_path, data, (err) => {
          if (err) {
            dialog.showErrorBox('Błąd', err);
            return;
          }

          save_pdf_path = file_path;
        });
      });
    }
  });
}
