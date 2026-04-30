// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
toggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Typing animation
const phrases = [
  'Telecommunications Expert',
  'Software Developer',
  'AI/ML Enthusiast',
  'Founder of GulTechs',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 50 : 90);
}
type();

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-group, .about-grid, .contact-grid').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Skill bars animate when visible
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animate'));
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

// Contact form — Formspree
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  const btn = this.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.textContent = 'Sending…';
  status.textContent = '';
  status.style.color = 'var(--accent2)';

  try {
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(this),
    });

    if (res.ok) {
      status.textContent = 'Message sent ✓';
      status.style.color = '#50fa7b';
      this.reset();
    } else {
      status.textContent = 'Something went wrong. Please try again.';
      status.style.color = '#ff5f57';
    }
  } catch {
    status.textContent = 'Network error. Please try again.';
    status.style.color = '#ff5f57';
  }

  btn.disabled = false;
  btn.textContent = 'Send message';
});
