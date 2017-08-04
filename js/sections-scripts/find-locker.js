const jsonq = require('json-query');

//Edit button
$('#found-lockers-list').on('click', 'button', (event) => {
  $(event.target).blur();
  let number = $(event.target).attr('data-number');

  $('#nav-main button[data-section="manage-locker"]').trigger('click');
  $('#manage-locker-number').val(number);
  $('#manage-locker-number').focus();
});

//Input any data
$('#find-locker-inputs').keyup(findLockers);

findLockers();
function findLockers() {
  let number, surname, name, classCode;
  number = $('#find-locker-number').val();
  surname = $('#find-locker-surname').val().toLowerCase();
  name = $('#find-locker-name').val().toLowerCase();
  classCode = $('#find-locker-class').val().toLowerCase();

  let foundLockers = lockers;

  if(number) foundLockers = checkNumber();
  if(surname) foundLockers = checkSurname();
  if(name) foundLockers = checkName();
  if(classCode) foundLockers = checkClass();

  if(foundLockers.length > 0) $('#lockers-not-found').hide();
  else $('#lockers-not-found').fadeIn(100);

  function sortByNr(a, b){
    return ((a.nr < b.nr) ? -1 : ((a.nr > b.nr) ? 1 : 0));
  }

  foundLockers.sort(sortByNr);

  $('#found-lockers-list').html("");
  for(let locker of foundLockers){
    let lockerDOM = $(`<div class="found-locker empty-locker"><div class="found-locker-number">${locker.nr}</div></div>`);
    for(let owner of locker.owners){
      if(!$.isEmptyObject(owner)){
        let ownerDOM = $(`<div class="found-locker-owner">${owner.surname} ${owner.name} <span style="text-transform: uppercase;">${owner.class}</span></div>`);
        lockerDOM.removeClass('empty-locker');
        lockerDOM.append(ownerDOM);
      }
    }
    lockerDOM.append(`<button type="button" name="edit-locker" data-number=${locker.nr} class="general-btn">Edytuj</button>`);
    $('#found-lockers-list').append(lockerDOM);
  }

  //Select lockers to show
  changeVisibleLockers();

  function checkNumber() {
    return jsonq(`[*nr~/^${number}/]`, {data: lockers, allowRegexp: true}).value;
  }

  function checkSurname() {
    return foundLockers.filter(locker => {
      for(let owner of locker.owners){
        if(owner.hasOwnProperty('surname') && owner.surname.startsWith(surname)) return true;
      }
      return false;
    });
  }

  function checkName() {
    return foundLockers.filter(locker => {
      for(let owner of locker.owners){
        if(owner.hasOwnProperty('name') && owner.name.startsWith(name)) return true;
      }
      return false;
    });
  }

  function checkClass() {
    return foundLockers.filter(locker => {
      for(let owner of locker.owners){
        if(owner.hasOwnProperty('class') && owner.class.startsWith(classCode)) return true;
      }
      return false;
    });
  }
}



$('.find-type').on('click', findLockers);

function changeVisibleLockers() {
  let type = $('input[name="find-type"]:checked').val();
  if(type == 'empty'){
    $('.found-locker:not(.empty-locker)').hide();
    $('.empty-locker').show();
  }else if (type == 'not-empty') {
    $('.empty-locker').hide();
    $('.found-locker:not(.empty-locker)').show();
  }else{
    $('.found-locker:not(.empty-locker)').show();
    $('.empty-locker').show();
  }
}
