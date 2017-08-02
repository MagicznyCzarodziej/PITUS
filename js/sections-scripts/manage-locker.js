const jsonq = require('json-query');

let number; //Selected locker number

//Reload autocomplete suggestions when opening section
$('#manage-locker-section').on('click', () => {
  let numbers = [];
  for(let locker of lockers){
    numbers.push({value: String(locker.nr), data: locker.nr});
  }

  $("#manage-locker-number").autocomplete({
    lookup: numbers,
    autoSelectFirst: true,
    onSelect: loadOwners
  });
});


function loadOwners(suggestion) {
  number = suggestion.data;
  let owners = jsonq(`[nr=${number}]`, {data: lockers}).value.owners;

  if(owners[0]){
    $('#manage-locker-owner1-surname').val(owners[0].surname);
    $('#manage-locker-owner1-name').val(owners[0].name);
    $('#manage-locker-owner1-class').val(owners[0].class);
  } else $('.manage-locker-owner1').val("");

  if(owners[1]){
    $('#manage-locker-owner2-surname').val(owners[1].surname);
    $('#manage-locker-owner2-name').val(owners[1].name);
    $('#manage-locker-owner2-class').val(owners[1].class);
  } else $('.manage-locker-owner2').val("");
}

$('#manage-locker-btn').on('click', (event) => {
  $(event.target).blur();
  let lockerNumber;
  for(let i = 0; i < lockers.length; i++){
    if(lockers[i].nr == number){
      lockerNumber = i;
      break;
    }
  }

  if(isFilled(0)){
    if(!lockers[lockerNumber].owners.length) lockers[lockerNumber].owners.push({});
    let ownerObj = lockers[lockerNumber].owners[0];
    ownerObj.surname = $('#manage-locker-owner1-surname').val();
    ownerObj.name = $('#manage-locker-owner1-name').val();
    ownerObj.class = $('#manage-locker-owner1-class').val();
  }

  if(isFilled(1)){
    if(!lockers[lockerNumber].owners.length) lockers[lockerNumber].owners.push({});
    let ownerObj = lockers[lockerNumber].owners[1];
    ownerObj.surname = $('#manage-locker-owner2-surname').val();
    ownerObj.name = $('#manage-locker-owner2-name').val();
    ownerObj.class = $('#manage-locker-owner2-class').val();
  }

  storage.saveFile(lockers);
  showInfo('success', 'Zapisano!');
});

function isFilled (owner) {
  return $(`#manage-locker-owner${owner+1}-surname`).val() &&
        $(`#manage-locker-owner${owner+1}-name`).val() &&
        $(`#manage-locker-owner${owner+1}-class`).val();
}

function showInfo(type, text) {
  $(`.msg.${type}`).remove();
  const infoDOM = $(`<div class="msg ${type}">${text}</div>`);
  $('#manage-locker-section .workplace').append(infoDOM);
  $(infoDOM).delay(1000).fadeOut(1000);
  setTimeout(() => {
    $(infoDOM).remove();
  },2000);
}
