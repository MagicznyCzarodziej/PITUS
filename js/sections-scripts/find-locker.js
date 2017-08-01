const jsonq = require('json-query');

$('#find-locker-inputs').keyup(() => {
  let number, surname, name, classCode;
  number = $('#find-locker-number').val();
  surname = $('#find-locker-surname').val();
  name = $('#find-locker-name').val();
  classCode = $('#find-locker-class').val();

  let foundLockers = jsonq(`[*nr=${number}]`, {data: lockers}).value;

  // document.getElementById('found-lockers-list').innerHTML = "";
  // let ownerString = [];
  // for(let item of foundLockers){
  //   console.log(item);
  //   for(let owner of item.owners){
  //     ownerString[] = `${owner.surname} ${owner.name} ${owner.class}`;
  //   }
  //   let element = `<div class="found-locker"><div class="found-locker-number">${item.number}</div><div class="found-locker-owner">dgfhgfh</div><div class="found-locker-owner">Hanc Tomasz 4IA</div><button type="button" name="edit-locker" class="general-btn">Edytuj</button></div>`;
  //   // document.getElementById('found-lockers-list').appendChild(element);
  // }
  // console.log(foundLockers);
});
