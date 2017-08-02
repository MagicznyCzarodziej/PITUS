const jsonq = require('json-query');

//Add third owner
$('#add-next-owner-btn').on('click', () => {
  $('#add-next-owner-btn').hide();
  $('#third-owner').show();
});

//Autocomplete
let numbers = [];
for(let locker of lockers){
  numbers.push({value: String(locker.nr), data: locker.nr});
}

$("#manage-locker-number").autocomplete({
  lookup: numbers,
  autoSelectFirst: true,
  onSelect: loadOwners
});

function loadOwners(suggestion) {
  let number = suggestion.data;
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

  if(owners[2]){
    $('#add-next-owner-btn').hide();
    $('#third-owner').fadeIn(200);
    $('#manage-locker-owner3-surname').val(owners[2].surname);
    $('#manage-locker-owner3-name').val(owners[2].name);
    $('#manage-locker-owner3-class').val(owners[2].class);
  } else{
    $('#add-next-owner-btn').show();
    $('#third-owner').hide();
    $('.manage-locker-owner3').val("");
 }
}

$('#manage-locker-btn').on('click', (event) => {
  $(event.target).blur();

});
