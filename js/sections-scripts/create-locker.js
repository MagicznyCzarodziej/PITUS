$('#create-locker-btn').on('click', function () {
  $(this).blur();
  let from = parseInt($('#create-locker-from').val());
  let to = parseInt($('#create-locker-to').val());
  if(isNaN(from) || isNaN(to) || from > to || from < 0 || to < 0){
    showInfo('error', 'Podaj prawidłowy zakres!');
  }else{
    let howMany = to - from + 1;
    let createdCounter = 0;
    for(let i = 0; i < howMany; i++){
      if(!lockerExsists(from+i)){
        lockers.push({"nr": from+i, "owners":[]});
        createdCounter++;
      }
    }
    $('#create-locker-from').val("");
    $('#create-locker-to').val("");
    showInfo('info', `Utworzonych szafek: ${createdCounter}`);
  }
});

function lockerExsists(nr) {
  return lockers.find(obj => obj.nr == nr) != undefined ? true : false;
}

function showInfo(type, text) {
  let infoDOM = $(`<div class="msg ${type}">${text}</div>`);
  $('#create-locker-section .workplace').append(infoDOM);
  setTimeout(() => {
    $(infoDOM).remove();
  },2000);
}
