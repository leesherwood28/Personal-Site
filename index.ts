import { setupNavigation } from './src/navigation';
import { populateAgeLabel } from './src/populate-age';
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
  populateAgeLabel();
  setupNavigation();
  //setupScollerAnimations();
}
