document.getElementById('nav-main').addEventListener("click", function (event) {
  if(event.target.dataset.section){
    hideAllSectionsAndDeselectButtons(event);

    //Highlight clicked button
    event.target.classList.add('is-selected');

    //Show selected section
    const sectionId = event.target.dataset.section + '-section'
    document.getElementById(sectionId).classList.add('is-shown');
  }
});

function hideAllSectionsAndDeselectButtons(event) {
  const sections = document.querySelectorAll('.section.is-shown');
  Array.prototype.forEach.call(sections, function (section) {
    section.classList.remove('is-shown');
  });
  const buttons = document.querySelectorAll('.nav-button.is-selected');
  Array.prototype.forEach.call(buttons, function (button) {
    button.classList.remove('is-selected');
  });
}
