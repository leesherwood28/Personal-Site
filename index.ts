import * as AOS from 'aos';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';

// Needs to be done after elements are loaded
setTimeout(() => {
  var delay = 0;
  $('[data-aos]').each(function () {
    if (isElementInViewport(this)) {
      delay = delay + 100;
      $(this).attr('data-aos-delay', delay);
    }
  });
  AOS.init({
    duration: 300,
    easing: 'ease-in-sine',
  });
}, 0);

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}
