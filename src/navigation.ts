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
  const menu = document.querySelector('#mobile-menu');
  const menuButton = document.querySelector('#mobile-menu-button');
  let menuOpen: boolean = false;

  const outsideClickListener = (ev) => {
    if (!menuOpen) {
      return;
    }
    if (
      !menu.querySelector(ev.target) &&
      !menuButton.querySelector(ev.target)
    ) {
      closeMenuPanel();
    }
  };

  const closeMenuPanel = () => {
    menu.classList.remove('h-52');
    menu.classList.add('h-0');
    document.removeEventListener('click', outsideClickListener);
    menuOpen = false;
  };

  const openMenuPanel = () => {
    menu.classList.add('h-0');
    menu.classList.remove('h-52');
    document.addEventListener('click', outsideClickListener);
    menuOpen = true;
  };

  menuButton.addEventListener('click', () => {
    if (menuOpen) {
      closeMenuPanel();
    } else {
      openMenuPanel();
    }
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
