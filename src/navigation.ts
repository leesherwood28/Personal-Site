import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
gsap.registerPlugin(ScrollToPlugin);

/**
 * Sets up the navigation elements of the document
 */
export function setupNavigation() {
  setupMobileNavPanel();
  setupScrollNavigation();
}

/**
 * Creates the mobile navigation panel
 */
function setupMobileNavPanel() {
  const menuPanel = document.querySelector('#mobile-menu-panel');
  const menuButton = document.querySelector('#mobile-menu-button');

  //   const outsideClickListener = (ev) => {
  //     if (!menuOpen) {
  //       return;
  //     }
  //     if (
  //       !menuPanel.querySelector(ev.target) &&
  //       !menuButton.querySelector(ev.target)
  //     ) {
  //       closeMenuPanel();
  //     }
  //   };

  const menuAnimation = gsap.from(menuPanel, {
    duration: 0.2,
    paused: true,
    reversed: true,
    height: 0,
  });

  menuButton.addEventListener('click', () => {
    menuAnimation.reversed() ? menuAnimation.play() : menuAnimation.reverse();
  });
}

/**
 * Sets up the scroll navigation for the entries in the document
 */
function setupScrollNavigation() {
  document.querySelectorAll(`a[href^='#'`).forEach((el) => {
    const elementSection = el.attributes.getNamedItem('href').value;

    el.addEventListener('click', function (e) {
      e.preventDefault();
      scrollToElement(elementSection);
    });
    gsap.to(el, {
      scrollTrigger: {
        trigger: elementSection,
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
    scrollTo: { y: elementId, offsetY: -1 },
  });
}
