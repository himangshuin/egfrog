/* ============================================================
   EGFROG — Components (Navbar + Footer injection)
   Include this AFTER main.js on every page
   ============================================================ */

/* ── NAVBAR HTML ── */
const NAVBAR_HTML = `
<nav class="navbar" id="navbar">
  <a class="nav-logo" href="../index.html">
    <div class="logo-mark">Ef</div>
    <div>
      <span class="logo-text">Eg<span>frog</span></span>
      <span class="logo-sub">Guwahati · Assam</span>
    </div>
  </a>

  <ul class="nav-links">
    <li><a href="../index.html">Home</a></li>
    <li><a href="../pages/services.html">Services</a></li>
    <li><a href="../pages/portfolio.html">Work</a></li>
    <li><a href="../pages/about.html">About</a></li>
    <li><a href="../blog/index.html">Blog</a></li>
    <li><a href="../pages/contact.html">Contact</a></li>
    <li><a href="../pages/contact.html" class="nav-cta">Get Started</a></li>
  </ul>

  <div class="hamburger" id="hamburger">
    <span></span><span></span><span></span>
  </div>
</nav>

<nav class="mobile-nav" id="mobileNav">
  <a href="../index.html">Home</a>
  <a href="../pages/services.html">Services</a>
  <a href="../pages/portfolio.html">Portfolio</a>
  <a href="../pages/about.html">About Us</a>
  <a href="../blog/index.html">Blog</a>
  <a href="../pages/contact.html">Contact</a>
  <a href="../pages/contact.html" class="nav-cta btn-primary">Get a Free Quote →</a>
</nav>
`;

/* ── MARQUEE HTML ── */
const MARQUEE_HTML = `
<div class="marquee-strip">
  <div class="marquee-track" id="marqueeTrack">
    <span class="marquee-item">Web Design <span class="marquee-dot">✦</span></span>
    <span class="marquee-item">SEO Services <span class="marquee-dot">✦</span></span>
    <span class="marquee-item">Digital Marketing <span class="marquee-dot">✦</span></span>
    <span class="marquee-item">Social Media <span class="marquee-dot">✦</span></span>
    <span class="marquee-item">PPC Advertising <span class="marquee-dot">✦</span></span>
    <span class="marquee-item">Branding & Design <span class="marquee-dot">✦</span></span>
    <span class="marquee-item">Local SEO <span class="marquee-dot">✦</span></span>
    <span class="marquee-item">E-Commerce <span class="marquee-dot">✦</span></span>
  </div>
</div>
`;

/* ── FOOTER HTML ── */
const FOOTER_HTML = `
<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <div class="nav-logo" style="margin-bottom:14px;">
        <div class="logo-mark">Ef</div>
        <div>
          <span class="logo-text">Eg<span>frog</span></span>
          <span class="logo-sub">Guwahati · Assam</span>
        </div>
      </div>
      <p>Your local partner for SEO, web development, and results-driven digital strategies in Assam. Serving businesses across Northeast India since 2021.</p>
      <div class="footer-socials">
        <a class="social-link" href="#" aria-label="Facebook">📘</a>
        <a class="social-link" href="#" aria-label="Instagram">📷</a>
        <a class="social-link" href="#" aria-label="YouTube">▶️</a>
        <a class="social-link" href="#" aria-label="LinkedIn">💼</a>
        <a class="social-link" href="#" aria-label="WhatsApp">💬</a>
      </div>
    </div>

    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="../pages/services.html#web-design">Website Design</a></li>
        <li><a href="../pages/services.html#web-dev">Web Development</a></li>
        <li><a href="../pages/services.html#seo">SEO Services</a></li>
        <li><a href="../pages/services.html#digital-marketing">Digital Marketing</a></li>
        <li><a href="../pages/services.html#social-media">Social Media</a></li>
        <li><a href="../pages/services.html#ppc">PPC Advertising</a></li>
        <li><a href="../pages/services.html#branding">Branding</a></li>
        <li><a href="../pages/services.html#local-seo">Local SEO</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="../pages/about.html">About Egfrog</a></li>
        <li><a href="../pages/portfolio.html">Our Work</a></li>
        <li><a href="../blog/index.html">Blog</a></li>
        <li><a href="../pages/contact.html">Contact Us</a></li>
        <li><a href="../pages/contact.html#careers">Careers</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Contact</h4>
      <div class="footer-contact-item">
        <span>📍</span>
        <span>Beltola Tiniali, Guwahati,<br>781028, Assam, India</span>
      </div>
      <div class="footer-contact-item">
        <span>📞</span>
        <a href="tel:+918876430049">+91 88764 30049</a>
      </div>
      <div class="footer-contact-item">
        <span>✉️</span>
        <a href="mailto:info@egfrog.com">info@egfrog.com</a>
      </div>
      <div class="footer-contact-item">
        <span>🕐</span>
        <span>Mon–Sat: 9am – 6pm IST</span>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <p>© ${new Date().getFullYear()} Egfrog Web Design Digital Marketing Solution, Guwahati. All rights reserved.</p>
    <p>Made with 💚 in Assam, India</p>
  </div>
</footer>
`;

/* ── INJECT on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {
  // Inject navbar before first element in body
  document.body.insertAdjacentHTML('afterbegin', NAVBAR_HTML);

  // Inject marquee after hero (if hero exists), else after navbar placeholder
  const hero = document.querySelector('.hero, .post-hero, .about-hero, .contact-page');
  if (hero) hero.insertAdjacentHTML('afterend', MARQUEE_HTML);

  // Inject footer at end of body
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Fix active nav link for current page
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.href && path.includes(a.getAttribute('href').replace('../', ''))) {
      a.classList.add('active');
    }
  });

  // Hamburger toggle (re-init after injection)
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileNav');
  if (ham && mob) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mob.classList.toggle('open');
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      ham.classList.remove('open');
      mob.classList.remove('open');
    }));
  }

  // Duplicate marquee
  const track = document.getElementById('marqueeTrack');
  if (track) {
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
  }
});
