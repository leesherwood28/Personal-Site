document.addEventListener('DOMContentLoaded', () => setupListeners());

function setupListeners() {
  setupMobileNav();
  setupAge();
  setupScrollReveal();
  setupFooterAnimation();
}

function setupScrollReveal() {
  const handleIntersect = (entries: IntersectionObserverEntry[], observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add(
        'animate__animated',
        'animate__fadeInUp',
        'revealed'
      );
    });
  };
  const observer = new IntersectionObserver(handleIntersect, { threshold: 1 });
  const targets = document.querySelectorAll('[data-scroll-reveal]');
  targets.forEach((target) => {
    observer.observe(target);
  });
}

function setupFooterAnimation() {
  const target = document.querySelector('footer');
  const scrollArea = document.querySelector('main');

  scrollArea.addEventListener('scroll', function (e) {
    const topDistance = target.getBoundingClientRect().top;

    if (topDistance > document.body.clientHeight) {
      return;
    }
    const footerHeight = target.getBoundingClientRect().height;
    const progress = (document.body.clientHeight - topDistance) / footerHeight;

    target.style.setProperty('--scroll', progress.toString());
  });
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
