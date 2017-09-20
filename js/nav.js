$('#nav-main').on("click", (event) => {
  if($(event.target).data('section')){
    hideAllSectionsAndDeselectButtons(event);

    //Highlight clicked button
    $(event.target).addClass('is-selected');

    //Show selected section
    const sectionId = $(event.target).data('section') + '-section';
    $(`#${sectionId}`).addClass('is-shown');
  }
});

function hideAllSectionsAndDeselectButtons(event) {
  const sections = $('.section.is-shown');
  Array.prototype.forEach.call(sections, function (section) {
    $(section).removeClass('is-shown');
  });
  const buttons = $('.nav-button.is-selected');
  Array.prototype.forEach.call(buttons, function (button) {
    $(button).removeClass('is-selected');
  });
}

//Author github link
const {shell} = require('electron');

$('#author').on('click', () => {
  shell.openExternal("https://github.com/MagicznyCzarodziej/PITUS");
});

$('#help').on('click', () => {
  shell.openExternal("https://github.com/MagicznyCzarodziej/PITUS#funkcje");
});


$('#help-year-change').on('click', () => {
  shell.openExternal("https://github.com/MagicznyCzarodziej/PITUS#jak-zmienić-rocznik");
});
