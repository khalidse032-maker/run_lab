// Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Navbar Scrolled 
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Custom Cursor (Mix-blend-mode sleek dot)
const cursorDot = document.querySelector("[data-cursor-dot]");

if (cursorDot && window.innerWidth > 768) {
  window.addEventListener("mousemove", (e) => {
    gsap.to(cursorDot, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.12,
      ease: "power2.out"
    });
  });

  const interactives = document.querySelectorAll("a, button, input, textarea, .team-card, .skill-item");
  interactives.forEach(el => {
    el.addEventListener("mouseenter", () => cursorDot.classList.add("cursor-active"));
    el.addEventListener("mouseleave", () => cursorDot.classList.remove("cursor-active"));
  });
}

// GSAP Pro Animations
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Cinematic Hero Reveal
  const tl = gsap.timeline();
  tl.from(".hero-badge", { opacity: 0, y: -20, duration: 0.8, ease: "power3.out" })
    .from(".hero-title", { opacity: 0, y: 40, filter: "blur(15px)", duration: 1.2, ease: "power3.out" }, "-=0.4")
    .from(".hero-tagline", { opacity: 0, y: 20, filter: "blur(10px)", duration: 1, ease: "power3.out" }, "-=0.8")
    .from(".hero-pills .hero-pill", { opacity: 0, y: 15, scale: 0.9, duration: 0.6, stagger: 0.08, ease: "back.out(1.5)" }, "-=0.6")
    .from(".hero-buttons .btn", { opacity: 0, y: 20, scale: 0.9, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)" }, "-=0.4");

  // Premium Section Reveals
  const sections = document.querySelectorAll(".about-card, .team-card, .skill-item");
  
  sections.forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: "power2.out"
    });
  });
});

// Tilt configuration
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll(".team-card, .skill-item, .about-card"), {
    max: 10,
    speed: 800,
    glare: true,
    "max-glare": 0.15,
    "perspective": 1000
  });
}

// Initialize EmailJS
emailjs.init("4GouNYEvOIVk4YPFT");

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    formStatus.textContent = '';
    formStatus.style.color = '';

    emailjs.sendForm('service_xlg39z8', 'template_kewn9xp', contactForm)
      .then(() => {
        formStatus.textContent = '✅ Message sent! We\'ll get back to you soon.';
        formStatus.style.color = '#22c55e';
        contactForm.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        formStatus.textContent = '❌ Something went wrong. Please try again.';
        formStatus.style.color = '#ef4444';
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      });
  });
}

// Tech Matrix Animation for Hero Section
function initMatrixAnimation() {
    const canvas = document.getElementById('tech-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = '0110010101110011010100110101010001001001'.split('');
    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops = [];
    for(let x = 0; x < columns; x++) drops[x] = 1;
    function draw() {
        ctx.fillStyle = 'rgba(3, 3, 3, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#3b82f6';
        ctx.font = fontSize + 'px monospace';
        for(let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
    setInterval(draw, 40);
}
document.addEventListener('DOMContentLoaded', initMatrixAnimation);
