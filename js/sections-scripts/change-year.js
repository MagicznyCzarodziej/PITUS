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

  for(let lockerIndex in lockers){
    let locker = lockers[lockerIndex];
    for(let ownerIndex in locker.owners){
      let owner = locker.owners[ownerIndex];
      if(owner.hasOwnProperty('class')){
        let oldClassNr = parseInt(owner.class.charAt(0));
        let classFirstLetter = owner.class.charAt(1).toLowerCase();
        let maxYears = 4;
        if(classFirstLetter === "z") maxYears = 3;

        if(oldClassNr < maxYears){
          let newClass = (oldClassNr + 1) + owner.class.substr(1);
          lockers[lockerIndex].owners[ownerIndex].class = newClass;
        } else lockers[lockerIndex].owners[ownerIndex] = {};
      }
    }
  }

  updateStats();
  storage.saveFile(lockers);

  $('#year-change-btn').remove();
  showInfo('change-year', 'success', 'Klasy zostały zmienione! Uczniowie ostatnich klas usunięci.', 5000);
});
