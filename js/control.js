storage = require('./fileHandler.js');
lockers = storage.loadFile();

showInfo = function(section, type, text, time) {
  time = parseInt(time) || 2000;
  time = time < 1000 ? 1000 : time;
  $(`.msg.${type}`).remove();
  const infoDOM = $(`<div class="msg ${type}">${text}</div>`);
  $(`#${section}-section .workplace:last-of-type`).append(infoDOM);
  $(infoDOM).delay(time-1000).fadeOut(1000);
  setTimeout(() => {
    $(infoDOM).remove();
  },time);
}
