import * as AOS from 'aos';
import $ from 'jquery';

$(document).ready(() => setupListeners());

function setupListeners() {
  setupMobileNav();
}

function setupMobileNav() {
  const menu = $('#mobile-menu');
  const menuButton = $('#mobile-menu-button');
  let menuOpen: boolean = false;

  menuButton.on('click', () => {
    if (menuOpen) {
      menu.removeClass('h-52');
      menu.addClass('h-0');
    } else {
      menu.removeClass('h-0');
      menu.addClass('h-52');
    }
    menuOpen = !menuOpen;
  });
}

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
