import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/**
 * Sets up the navigation elements of the document
 */
export function setupNavigation() {
  setupMobileNavPanel();
  setupScrollNavigation();
}

let toggleMenu: () => void;

/**
 * Creates the mobile navigation panel
 */
function setupMobileNavPanel() {
  const menuPanel = document.querySelector('#mobile-menu-panel');
  const menuButton = document.querySelector('#mobile-menu-button');
  const menuBackdrop = document.querySelector('#mobile-menu-backdrop');
  const menuAnimation = gsap.timeline({ paused: true, reversed: true });
  menuAnimation
    .set(menuBackdrop, {
      display: 'block',
    })
    .to(menuPanel, {
      duration: 0.2,
      height: 'auto',
    });

  toggleMenu = () => {
    menuAnimation.reversed() ? menuAnimation.play() : menuAnimation.reverse();
  };

  menuButton.addEventListener('click', toggleMenu);
  menuBackdrop.addEventListener('touchstart', toggleMenu);
}

/**
 * Sets up the scroll navigation for the entries in the document
 */
function setupScrollNavigation() {
  document.querySelectorAll(`a[href^='#'`).forEach((el) => {
    const navigationLocationId = el.attributes.getNamedItem('href').value;
    const isMobileMenuItem = !!el.closest('#mobile-menu-panel');
    el.addEventListener('click', function (e) {
      e.preventDefault();
      scrollToElement(navigationLocationId);
      if (isMobileMenuItem) {
        toggleMenu();
      }
    });
    gsap.to(el, {
      scrollTrigger: {
        trigger: navigationLocationId,
        scroller: 'main',
        toggleActions: 'play reset play reset',
      },
      filter: 'grayscale(10%) opacity(1)',
    });
  });
}

/**
 * Scrolls to the element with the provided element id
 * @param elementId The elemtn id of the element you wish to scroll to
 */
function scrollToElement(elementId: string) {
  const scrollArea = document.querySelector('main');
  gsap.to(scrollArea, {
    duration: 0.4,
    scrollTo: { y: elementId, offsetY: -1, autoKill: true },
  });
}
