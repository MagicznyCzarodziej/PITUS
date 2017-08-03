$('#remove-locker-btn').on('click', function () {
  $(this).blur();
  let from = parseInt($('#remove-locker-from').val());
  let to = parseInt($('#remove-locker-to').val());
  if(isNaN(from) || isNaN(to) || from > to || from < 0 || to < 0){
    showInfo('remove-locker', 'error', 'Podaj prawidłowy zakres!');
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
    updateStats();

    $('#remove-locker-from').val("");
    $('#remove-locker-to').val("");
    showInfo('remove-locker', 'success', `Usuniętych szafek: ${removedCounter}`);
  }
});
