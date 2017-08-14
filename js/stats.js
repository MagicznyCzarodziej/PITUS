updateStats = function() {
  let all = lockers.length;
  let notEmpty = lockers.filter(obj => {
    return (!obj.owners[0].surname == "" || !obj.owners[1].surname == "");
  }).length;
  let empty = lockers.filter(obj => {
    return !(!obj.owners[0].surname == "" || !obj.owners[1].surname == "");
  }).length;

  $('#stats-all').html(all);
  $('#stats-not-empty').html(notEmpty);
  $('#stats-empty').html(empty);
}

updateStats();
