/* ============================================================
   EGFROG — Main JavaScript
   Egfrog Web Design & Digital Marketing | Guwahati, Assam
   ============================================================ */

'use strict';

/* ── 1. NAVBAR: scroll shadow + active link ── */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  // Scroll shadow
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Active nav link via IntersectionObserver
  if (sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const target = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (target) target.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => io.observe(s));
  }
})();

/* ── 2. HAMBURGER MENU ── */
(function initHamburger() {
  const btn     = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
})();

/* ── 3. SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  // Stagger children in grids
  document.querySelectorAll(
    '.services-grid, .pricing-grid, .industries-grid, .portfolio-grid, .faq-grid, .blog-grid-3, .blog-sidebar'
  ).forEach(parent => {
    parent.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 90}ms`;
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => io.observe(el));
})();

/* ── 4. MARQUEE: duplicate for seamless loop ── */
(function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;

  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);
})();

/* ── 5. COUNTER ANIMATION ── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num, .metric-num');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.trim();
      const numMatch = raw.match(/[\d,]+/);
      if (!numMatch) return;
      const target = parseInt(numMatch[0].replace(/,/g, ''));
      const suffix = raw.replace(numMatch[0], '');
      let start = 0;
      const duration = 1600;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
})();

/* ── 6. BLOG CATEGORY FILTER ── */
(function initBlogFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-category]');
  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const match = cat === 'all' || card.dataset.category === cat;
        card.style.display = match ? '' : 'none';
        card.style.opacity = match ? '1' : '0';
      });
    });
  });
})();

/* ── 7. TABLE OF CONTENTS (blog post) ── */
(function initTOC() {
  const tocItems = document.querySelectorAll('.toc-item');
  if (!tocItems.length) return;

  const headings = document.querySelectorAll('.post-content h2');
  if (!headings.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocItems.forEach(t => t.classList.remove('active'));
        const active = document.querySelector(`.toc-item[data-target="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  headings.forEach(h => io.observe(h));

  tocItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = document.getElementById(item.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ── 8. CONTACT FORM ── */
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const original = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async (replace with real fetch to backend)
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--accent)';
      btn.style.color = 'var(--bg)';
      form.reset();

      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    }, 1200);
  });
})();

/* ── 9. PRICING TOGGLE (monthly / yearly) ── */
(function initPricingToggle() {
  const toggle = document.querySelector('.pricing-toggle');
  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isYearly = toggle.checked;
    document.querySelectorAll('.pricing-amount').forEach(el => {
      const monthly = parseInt(el.dataset.monthly);
      const yearly  = parseInt(el.dataset.yearly);
      if (!monthly || !yearly) return;
      el.textContent = (isYearly ? yearly : monthly).toLocaleString();
    });
    document.querySelectorAll('.pricing-period').forEach(el => {
      el.textContent = isYearly ? '/ year' : '/ month';
    });
  });
})();

/* ── 10. HERO TYPEWRITER (optional enhancement) ── */
(function initTypewriter() {
  const el = document.querySelector('[data-typewrite]');
  if (!el) return;

  const words = el.dataset.typewrite.split('|');
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

    let delay = deleting ? 60 : 100;
    if (!deleting && ci > word.length)     { deleting = true; delay = 1800; }
    if (deleting && ci < 0)               { deleting = false; wi = (wi + 1) % words.length; delay = 400; }

    setTimeout(tick, delay);
  }
  tick();
})();

/* ── 11. SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
