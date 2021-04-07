import * as AOS from 'aos';
import $ from 'jquery';

$(document).ready(() => setupListeners());

function setupListeners() {
  setupMobileNav();
  setupScrollIntoView();
}

function setupMobileNav() {
  const menu = $('#mobile-menu');
  const menuButton = $('#mobile-menu-button');
  let menuOpen: boolean = false;

  const outsideClickListener = (ev) => {
    if (!menuOpen) {
      return;
    }
    if (
      menu.find(ev.target).length === 0 &&
      menuButton.find(ev.target).length === 0
    ) {
      closeMenu();
    }
  };

  const closeMenu = () => {
    menu.removeClass('h-52');
    menu.addClass('h-0');
    $(document).off('click', outsideClickListener);
    menuOpen = false;
  };

  const openMenu = () => {
    menu.removeClass('h-0');
    menu.addClass('h-52');
    menuOpen = true;
    $(document).on('click', outsideClickListener);
  };

  menuButton.on('click', () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

function setupScrollIntoView() {
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
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}
