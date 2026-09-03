const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((f) => f.classList.remove('active'));
    filter.classList.add('active');
    const value = filter.dataset.filter;
    cards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      const show = value === 'all' || categories.includes(value);
      card.classList.toggle('hidden', !show);
    });
  });
});


const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    menuToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    mobileNav.classList.toggle('open', !open);
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      mobileNav.classList.remove('open');
    });
  });

  document.addEventListener('click', (event) => {
    if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      mobileNav.classList.remove('open');
    }
  });
}
