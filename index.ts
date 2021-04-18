import { setupNavigation } from './src/navigation';
import { setupScollerAnimations } from './src/scroll-animations';

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      setupDocument();
    });
  });
});

/**
 * Sets up the document
 */
function setupDocument() {
  setupAge();
  setupNavigation();
  setupScollerAnimations();
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
