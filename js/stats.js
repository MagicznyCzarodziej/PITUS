updateStats = function() {
  let all = lockers.length;
  let notEmpty = lockers.filter(obj => {
    return !($.isEmptyObject(obj.owners[0]) && $.isEmptyObject(obj.owners[0]));
  }).length;
  let empty = lockers.filter(obj => {
    return ($.isEmptyObject(obj.owners[0]) && $.isEmptyObject(obj.owners[0]));
  }).length;

  $('#stats-all').html(all);
  $('#stats-not-empty').html(notEmpty);
  $('#stats-empty').html(empty);
}

updateStats();
