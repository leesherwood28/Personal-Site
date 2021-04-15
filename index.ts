import { gsap } from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      setupDocument();
    });
  });
});

function setupDocument() {
  setupScrollReveal();
  setupMobileNav();
  setupAge();
  setupFooterAnimation();
  setupNavigation();
}

function setupNavigation() {
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

function scrollToElement(elementId: string) {
  const scrollArea = document.querySelector('main');
  gsap.to(scrollArea, { duration: 0.4, scrollTo: { y: elementId } });
}

function setupScrollReveal() {
  const revealers = gsap.utils.toArray('[data-scroll-reveal]');
  const scroller = document.querySelector('main');
  revealers.forEach((entry) => {
    gsap.to(entry as any, {
      y: 0,
      autoAlpha: 1,
      scrollTrigger: {
        trigger: entry as any,
        scroller,
        start: '-50% 100%',
      },
    });
  });
}

function setupFooterAnimation() {
  const target = document.querySelector('footer');
  const scrollArea = document.querySelector('main');
  const logoLeftBracket = document.querySelector('#logo-left-bracket');
  const logoRightBracket = document.querySelector('#logo-right-bracket');
  const logoSlash = document.querySelector('#logo-slash');

  gsap.set(logoLeftBracket, { x: '-30vw', scale: 0.7 });
  gsap.set(logoRightBracket, { x: '30vw', scale: 0.7 });
  gsap.set(logoSlash, { autoAlpha: 0, scale: 0 });

  const footerAnimation = gsap.timeline({
    scrollTrigger: {
      scroller: scrollArea,
      trigger: target,
      scrub: true,
      start: 'top center',
      end: `bottom bottom`,
    },
  });
  footerAnimation
    .to(logoLeftBracket, { x: 0, autoAlpha: 1, ease: 'expo' })
    .to(logoRightBracket, { x: 0, autoAlpha: 1, ease: 'expo' }, '<')
    .to(logoLeftBracket, { scale: 1, duration: 0.15 })
    .to(logoRightBracket, { scale: 1, duration: 0.15 }, '<')
    .to(
      logoSlash,
      { autoAlpha: 1, scale: 1, ease: 'back.inOut(1.7)' },
      '-=0.5'
    );
}

function setupAge() {
  const dob = new Date(1993, 0, 28);

  document.querySelector('#age').textContent = gregorianAge(
    dob,
    new Date()
  ).toString();
}

/**
 * Calculates human age in years given a birth day. Optionally ageAtDate
 * can be provided to calculate age at a specific date
 *
 * @param string|Date Object birthDate
 * @param string|Date Object ageAtDate optional
 * @returns integer Age between birthday and a given date or today
 */
function gregorianAge(birthDate, ageAtDate) {
  // convert birthDate to date object if already not
  if (Object.prototype.toString.call(birthDate) !== '[object Date]')
    birthDate = new Date(birthDate);

  // use today's date if ageAtDate is not provided
  if (typeof ageAtDate == 'undefined') ageAtDate = new Date();
  // convert ageAtDate to date object if already not
  else if (Object.prototype.toString.call(ageAtDate) !== '[object Date]')
    ageAtDate = new Date(ageAtDate);

  // if conversion to date object fails return null
  if (ageAtDate == null || birthDate == null) return null;

  var _m = ageAtDate.getMonth() - birthDate.getMonth();

  // answer: ageAt year minus birth year less one (1) if month and day of
  // ageAt year is before month and day of birth year
  return (
    ageAtDate.getFullYear() -
    birthDate.getFullYear() -
    (_m < 0 || (_m === 0 && ageAtDate.getDate() < birthDate.getDate()) ? 1 : 0)
  );
}

function setupMobileNav() {
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
      closeMenu();
    }
  };

  const closeMenu = () => {
    menu.classList.remove('h-52');
    menu.classList.add('h-0');
    document.removeEventListener('click', outsideClickListener);
    menuOpen = false;
  };

  const openMenu = () => {
    menu.classList.add('h-0');
    menu.classList.remove('h-52');
    menuOpen = true;
    document.addEventListener('click', outsideClickListener);
  };

  menuButton.addEventListener('click', () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}
