/**
 * Populates the document age field with my age
 */
export function populateAge() {
  const dob = new Date(1993, 0, 28);

  document.querySelector('#age').textContent = calculateApproximateAge(
    dob
  ).toString();
}

/**
 * Calculates the approximate age in years for the provided
 * birthday, not accurate for time zone boundries
 * @param birthday
 * @returns
 */
function calculateApproximateAge(birthday: Date): number {
  var ageInMilliseconds = Date.now() - birthday.getTime();
  const ageFromEpoch = new Date(ageInMilliseconds);
  return Math.abs(ageFromEpoch.getUTCFullYear() - 1970);
}
