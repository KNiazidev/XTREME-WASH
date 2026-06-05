/* Xtreme Wash — Main JavaScript */

(function () {
  'use strict';

  const WA_URL = 'https://wa.me/923191017122?text=Hi%2C%20I%20want%20to%20book%20a%20car%20detailing%20service';

  /* Header scroll effect */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* Mobile menu */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Active nav link */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__dropdown-item, .mobile-menu__link, .mobile-menu__sub, .footer__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* Intersection Observer fade-in */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* Back to top */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Testimonials carousel */
  const track = document.querySelector('.testimonials__track');
  const prevBtn = document.querySelector('.testimonials__btn--prev');
  const nextBtn = document.querySelector('.testimonials__btn--next');
  if (track) {
    let index = 0;
    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;

    function getVisible() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function updateCarousel() {
      const visible = getVisible();
      const maxIndex = Math.max(0, total - visible);
      if (index > maxIndex) index = maxIndex;
      const cardWidth = cards[0].offsetWidth;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { index = Math.max(0, index - 1); updateCarousel(); });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      const visible = getVisible();
      index = Math.min(total - visible, index + 1);
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();

    setInterval(() => {
      const visible = getVisible();
      index = index >= total - visible ? 0 : index + 1;
      updateCarousel();
    }, 5000);
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* Contact form */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const toast = document.querySelector('.toast');
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
      }
      form.reset();
    });
  }

  /* Gallery filter */
  const filters = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      const cat = filter.dataset.filter;
      galleryItems.forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.category === cat) ? '' : 'none';
      });
    });
  });

  /* Lightbox */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox__img');
  const lightboxClose = document.querySelector('.lightbox__close');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  /* Hero particles */
  const particlesContainer = document.querySelector('.hero__particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'hero__particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 8 + 's';
      p.style.animationDuration = (5 + Math.random() * 5) + 's';
      particlesContainer.appendChild(p);
    }
  }

  /* WhatsApp links — set pre-filled message */
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    el.setAttribute('href', WA_URL);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

})();
