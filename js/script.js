// ============ MOBILE NAV TOGGLE ============
// This is the only JS on the site — everything else is static
// HTML/CSS. It just opens/closes the full-width mobile menu
// (#navMobile) when the hamburger button (#navToggle) is tapped.

const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

// Toggle the menu open/closed on hamburger click:
// - .is-open class controls visibility (see CSS media query)
// - aria-expanded keeps screen readers in sync with visible state
// - body scroll is locked while the menu is open so the page
//   underneath doesn't scroll behind the full-width overlay
navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : ''; // scroll lock while open
});

// Auto-close the menu when any link inside it is tapped, so users
// don't have to manually dismiss it after navigating.
navMobile.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});