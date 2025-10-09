gsap.registerPlugin(ScrollTrigger);

function setupHorizontalScroll() {
  const wrapper = document.querySelector('#projects');          // the section that gets pinned
  const scrollContainer = wrapper.querySelector('.scroll-container');
  const items = gsap.utils.toArray('.scroll-item');

  let totalWidth = 0;
  items.forEach(item => {
    totalWidth += item.getBoundingClientRect().width;
  });
  scrollContainer.style.width = `${totalWidth}px`;

  // helper to compute how many pixels horizontally need to scroll
  const getTotalScroll = () => scrollContainer.scrollWidth - window.innerWidth;

  // create the tween using function values so invalidateOnRefresh will recalc
  gsap.to(scrollContainer, {
    x: () => -getTotalScroll(),
    ease: 'none',
    scrollTrigger: {
      trigger: wrapper,                   
      start: 'top top',
      end: () => `+=${getTotalScroll()}`, // end = vertical distance that maps 1:1 to horizontal movement
      scrub: 1,
      pin: true,
      anticipatePin: 0,
      invalidateOnRefresh: true,         
    }
  });
}


window.addEventListener('load', () => {
  setupHorizontalScroll();
  // refresh on resize/orientationchange to recalc widths
  window.addEventListener('resize', () => ScrollTrigger.refresh());
  window.addEventListener('orientationchange', () => ScrollTrigger.refresh());
});




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
});



// copy to clipboard for email popup
const emailEl = document.getElementById("email");
const msgEl = document.getElementById("copy-message");

emailEl.addEventListener("click", () => {
  const email = emailEl.textContent;
  navigator.clipboard.writeText(email).then(() => {
    msgEl.classList.add("show");
    setTimeout(() => msgEl.classList.remove("show"), 1000); // hide after 1.5s
  });
});



// Typewriter effect
const typewriterPhrases = [
  "Hi there! I'm Kang",
  "Curiosity‑driven",
  "Web Developer, Tech Enthusiast",
  "Turning ideas into code",
  "Welcome to my personal website!"
];

const typewriterTextEl = document.getElementById('typewriter-text');
let currentPhraseIndex = 0;
let currentCharIndex = 0;
const typingSpeed = 60; // ms per character
const pauseTime = 1500; // ms to pause before erasing
const erasingSpeed = typingSpeed / 2; // ms per character when erasing

function typewriter(){
  const curPhrase = typewriterPhrases[currentPhraseIndex];
  typewriterTextEl.textContent = curPhrase.slice(0, currentCharIndex);
  if (currentCharIndex < curPhrase.length) {
    currentCharIndex++;
    setTimeout(typewriter, typingSpeed);
  } else {
    setTimeout(eraseTypewriter, pauseTime);
  }
}

function eraseTypewriter(){
  const curPhrase = typewriterPhrases[currentPhraseIndex];
  if (currentCharIndex > 0) {
    currentCharIndex--;
    typewriterTextEl.textContent = curPhrase.slice(0, currentCharIndex);
    setTimeout(eraseTypewriter, erasingSpeed);
  } else {
    currentPhraseIndex = (currentPhraseIndex + 1) % typewriterPhrases.length;
    setTimeout(typewriter, typingSpeed);
  }
}

typewriter();

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

const btn = document.getElementById('spin-btn');

btn.addEventListener('click', () => {
  btn.classList.add('spin');

  
  btn.addEventListener('animationend', () => {
    btn.classList.remove('spin');
  }, { once: true });
});
