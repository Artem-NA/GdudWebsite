$(document).ready(function() {
    $('#banner_slider').carousel();
    $('#main_slider').carousel();
  });

  function scrollToDiv(id) {
    const element = document.getElementById(id);
    const yOffset = -100000; // Increase this negative value to scroll higher
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
}

