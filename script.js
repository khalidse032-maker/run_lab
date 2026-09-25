// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Navbar background state on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
  const setScrolled = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });
}

// Contact form (client-side only — wire to your backend/email service)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = 'Sending...';
    setTimeout(() => {
      formStatus.textContent = "Thanks! We'll get back to you soon.";
      contactForm.reset();
    }, 700);
  });
}
