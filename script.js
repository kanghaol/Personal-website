document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else {
    document.documentElement.setAttribute('data-theme', 'dark'); // default
  }

  window.toggleTheme = function () {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  // ScrollReveal setup
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.timeline-item', {
      distance: '30px',
      origin: 'bottom',
      opacity: 0,
      duration: 600,
      interval: 200,
      reset: true,
      easing: 'ease-out'
    });
  } else {
    console.warn("ScrollReveal is not defined");
  }
});