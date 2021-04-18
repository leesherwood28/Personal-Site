import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up the documents scroll animations
 */
export function setupScollerAnimations() {
  setupScrollRevalAnimation();
  setupFooterScrollAnimation();
}

/**
 * Sets up the translation animation on element scroll reveal
 */
function setupScrollRevalAnimation() {
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

/**
 * Sets upt he footer scroller animation
 */
function setupFooterScrollAnimation() {
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
