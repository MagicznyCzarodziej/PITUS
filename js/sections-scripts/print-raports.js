const {remote} = require('electron');
const {BrowserWindow, dialog, shell} = remote;
const fs = require('fs');

let printWindow;
let save_pdf_path;
let template;

updatePrintTemplate = function() {
  $.get('print-template.html', function(data) {
    template = $(data);
    template.find('#list').append($('#found-lockers-list').html());
    template = $('<div/>').append($(template).clone()).html();

    createPreviewWindow();
  }, 'html');
}

$('#print-btn').on('click', () => {
  $('#print-btn').blur();
   updatePrintTemplate();
});

function createPreviewWindow() {
  printWindow = new BrowserWindow({'auto-hide-menu-bar': true});
  printWindow.loadURL("data:text/html;charset=utf-8," + encodeURI(template));
  printWindow.show();

  printWindow.webContents.on('did-finish-load', savePDF);

  printWindow.on('closed', () => {
    printWindow = null;
  });
}


function savePDF() {
  if (!printWindow) {
    dialog.showErrorBox('Błąd', "Okno do drukowania nie jest otwarte!");
    return;
  }

  let PDFoptions = {
    landscape: false,
    marginsType: 0,
    printBackground: true,
    printSelectionOnly: false,
    pageSize: 'A4',
  };

  let dialogOptions = {
    title: "Zapis",
    defaultPath: "Lista szafek.pdf",
    filters: [{
      name: 'Plik PDF',
      extensions: ['pdf']
    }]
  }

  dialog.showSaveDialog(printWindow, dialogOptions, (file_path) => {
    if (!file_path) return;

    printWindow.webContents.printToPDF(PDFoptions, (err, data) => {
      if (err) {
        dialog.showErrorBox('Błąd', err);
        return;
      }

      fs.writeFile(file_path, data, (err) => {
        if (err) {
          dialog.showErrorBox('Błąd', err);
          return;
        }
      });

    });
  });
}
