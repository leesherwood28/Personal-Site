import { setupNavigation } from './src/navigation';
import { populateAge } from './src/populate-age';
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
  populateAge();
  setupNavigation();
  setupScollerAnimations();
}
