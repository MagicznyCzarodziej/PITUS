const jsonq = require('json-query');

let number; //Selected locker number
let choices = [];

//Autocomplete
let complete = new autoComplete({
  selector: '#manage-locker-number',
  minChars: 1,
  source: function (term, suggest) {
    let matches = [];
    for(let i = 0; i < choices.length; i++)
      if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
    suggest(matches);
  },
  onSelect: function (e, term, item) {
    loadOwners(term);
  }
});

$('#manage-locker-number').change( function () {
  let nr = $('#manage-locker-number').val();
  loadOwners(nr);
});

//Reload autocomplete suggestions when opening section
$('#manage-locker-section').on('click', () => {
  choices = [];
  for(let locker of lockers) choices.push(String(locker.nr));
});

function loadOwners(suggestion) {
  number = suggestion;
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

  //Find locker id by number
  let lockerNumber;
  for(let i = 0; i < lockers.length; i++){
    if(lockers[i].nr == number){
      lockerNumber = i;
      break;
    }
  }

  //Save changes to lockers variable
  let ownerObj;
  ownerObj = lockers[lockerNumber].owners[0]; // Pass owner object reference to variable
  ownerObj.surname = $('#manage-locker-owner1-surname').val().toLowerCase();
  ownerObj.name = $('#manage-locker-owner1-name').val().toLowerCase();
  ownerObj.class = $('#manage-locker-owner1-class').val().toLowerCase();

  ownerObj = lockers[lockerNumber].owners[1];
  ownerObj.surname = $('#manage-locker-owner2-surname').val().toLowerCase();
  ownerObj.name = $('#manage-locker-owner2-name').val().toLowerCase();
  ownerObj.class = $('#manage-locker-owner2-class').val().toLowerCase();

  storage.saveFile(lockers);
  updateStats();

  showInfo('manage-locker', 'success', 'Zapisano!');
  $('#manage-locker-number').focus();
});

function isFilled (owner) {
  return $(`#manage-locker-owner${owner+1}-surname`).val() &&
        $(`#manage-locker-owner${owner+1}-name`).val() &&
        $(`#manage-locker-owner${owner+1}-class`).val();
}

//Clear inputs
$('#manage-locker-clear-btn').on('click', (event) => {
  $(event.target).blur();
  $('#manage-locker-section .owners input').val('');
});
