$('#remove-locker-btn').on('click', function () {
  $(this).blur();
  let from = parseInt($('#remove-locker-from').val());
  let to = parseInt($('#remove-locker-to').val());
  if(isNaN(from) || isNaN(to) || from > to || from < 0 || to < 0){
    showInfo('error', 'Podaj prawidłowy zakres!');
  }else{
    let removedCounter = 0;
    for(let i = from; i <= to; i++){
      lockers = lockers.filter((el) => {
        if(el.nr !== i){
          return true;
        }else removedCounter++;
      });
    }

    storage.saveFile(lockers);

    $('#remove-locker-from').val("");
    $('#remove-locker-to').val("");
    showInfo('success', `Usuniętych szafek: ${removedCounter}`);
  }
});

function showInfo(type, text) {
  $(`.msg.${type}`).remove();
  const infoDOM = $(`<div class="msg ${type}">${text}</div>`);
  $('#remove-locker-section .workplace').append(infoDOM);
  $(infoDOM).delay(1000).fadeOut(1000);
  setTimeout(() => {
    $(infoDOM).remove();
  },2000);
}
