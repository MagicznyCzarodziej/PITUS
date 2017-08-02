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
$('#find-locker-inputs').keyup(() => {
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

  $('#found-lockers-list').html("");
  for(let locker of foundLockers){
    let lockerDOM = $(`<div class="found-locker"><div class="found-locker-number">${locker.nr}</div></div>`);
    if(locker.owners.length == 0) lockerDOM.addClass('empty-locker');
    for(let owner of locker.owners){
      let ownerDOM = $(`<div class-"found-locker-owner">${owner.surname} ${owner.name} ${owner.class}</div>`);
      lockerDOM.append(ownerDOM);
    }
    lockerDOM.append(`<button type="button" name="edit-locker" data-number=${locker.nr} class="general-btn">Edytuj</button>`);
    $('#found-lockers-list').append(lockerDOM);
  }

  function checkNumber() {
    return jsonq(`[*nr~/^${number}/]`, {data: lockers, allowRegexp: true}).value;
  }

  function checkSurname() {
    return foundLockers.filter(locker => {
      for(let owner of locker.owners){
        if(owner.surname.startsWith(surname)) return true;
      }
      return false;
    });
  }

  function checkName() {
    return foundLockers.filter(locker => {
      for(let owner of locker.owners){
        if(owner.name.startsWith(name)) return true;
      }
      return false;
    });
  }

  function checkClass() {
    return foundLockers.filter(locker => {
      for(let owner of locker.owners){
        if(owner.class.startsWith(classCode)) return true;
      }
      return false;
    });
  }
});
