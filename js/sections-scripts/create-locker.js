$('#create-locker-btn').on('click', function () {
  $(this).blur();
  let from = parseInt($('#create-locker-from').val());
  let to = parseInt($('#create-locker-to').val());
  if(isNaN(from) || isNaN(to) || from > to || from < 0 || to < 0){
    showInfo('create-locker', 'error', 'Podaj prawidłowy zakres!');
  }else{
    // let howMany = to - from + 1;
    let createdCounter = 0;
    for(let i = from; i <= to; i++){
      if(!lockerExsists(i)){
        lockers.push({"nr": i, "owners":[{},{}]});
        createdCounter++;
      }
    }
    storage.saveFile(lockers);
    updateStats();

    $('#create-locker-from').val("");
    $('#create-locker-to').val("");
    showInfo('create-locker', 'success', `Utworzonych szafek: ${createdCounter}`);
  }
});

function lockerExsists(nr) {
  return lockers.find(obj => obj.nr == nr) != undefined ? true : false;
}
