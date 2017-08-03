let locked = true;

//Unlock button
$('#unlock-year-change-btn').on('click', () => {
  locked = false;
  $('#unlock-year-change-btn').hide();
  $('#year-change-btn').removeClass('locked');
});

//Change years
$('#year-change-btn').on('click', () => {
  if(locked) return;

  //If class < 4 class++ else remove owner from the locker.
  //TODO: Refactor this shit
  for(let locker in lockers){
    for(let owner in lockers[locker].owners){
      if(lockers[locker].owners[owner].hasOwnProperty('class')){
        let oldClassNr = parseInt(lockers[locker].owners[owner].class.charAt(0));
        if(oldClassNr < 4){
          let newClass = (oldClassNr+1) + lockers[locker].owners[owner].class.substr(1);
          lockers[locker].owners[owner].class = newClass;
        } else lockers[locker].owners[owner] = {};
      }
    }
  }

  storage.saveFile(lockers);

  $('#year-change-btn').remove();
  showInfo('change-year', 'success', 'Klasy zostały zmienione! Uczniowie klas czwartych usunięci.', 5000);
});
