//Classes list
$('#nav-main button[data-section="change-year"]').on('click', () =>{
  let classes = [];
  $('#classes-list').html('');
  for (let locker of lockers){
    for(owner of locker.owners){
      if(owner.class != "" && typeof owner.class != "undefined"){
        let alreadyAdded = (classes.indexOf(owner.class) != -1);
        if(!alreadyAdded){
          classes.push(owner.class);

          $('#classes-list').append(`<div class="class-item">${owner.class}<button class="mini-btn remove-class" data-class="${owner.class}">USUŃ</div>`);
        }
      }
    }
  }
});

//Removing classes
$('#classes-list').on('click', 'button', (event) => {
  let thisClass = $(event.target).attr('data-class');
  for(let lockerIndex in lockers){
    let locker = lockers[lockerIndex];
    for(let ownerIndex in locker.owners){
      let owner = locker.owners[ownerIndex];
      if(owner.hasOwnProperty('class')){
        if(owner.class == thisClass) lockers[lockerIndex].owners[ownerIndex] = {};
      }
    }
  }
  $(event.target).parent().fadeOut(300, () => { $(this).remove(); });
  updateStats();
  storage.saveFile(lockers);
});

//Change years
$('#year-change-btn').on('click', () => {
  for(let lockerIndex in lockers){
    let locker = lockers[lockerIndex];
    for(let ownerIndex in locker.owners){
      let owner = locker.owners[ownerIndex];
      if(owner.hasOwnProperty('class') && owner.class != ""){
        let oldClassNr = parseInt(owner.class.charAt(0));
        let newClass = (oldClassNr + 1) + owner.class.substr(1);
        lockers[lockerIndex].owners[ownerIndex].class = newClass;
      }
    }
  }

  updateStats();
  storage.saveFile(lockers);

  $('#year-change-btn').remove();
  showInfo('change-year', 'success', 'Klasy zostały zmienione!', 5000);
  $('.nav-button[data-section=change-year]').click();
});
