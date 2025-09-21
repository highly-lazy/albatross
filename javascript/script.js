document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const darkToggle = document.getElementById('darkToggle');
  const year = document.getElementById('year');

  // Year
  if (year) year.textContent = new Date().getFullYear();

  // === THEME TOGGLE ===
  const saved = localStorage.getItem('theme');
  if (saved) {
    body.className = saved;
  } else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add('dark');
    } else {
      body.classList.add('light');
    }
  }
  if (darkToggle) {
    darkToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
    darkToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      body.classList.toggle('light');
      darkToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
      localStorage.setItem('theme', body.className);
    });
  }

  // === MENU TOGGLE ===
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      menuToggle.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
    });
  }

  // === CAROUSEL ===
  const carousel = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  let index = 0;
  let autoSlide;

  if (carousel && items.length > 0) {
    const showSlide = i => {
      index = (i + items.length) % items.length;
      carousel.style.transform = `translateX(${-index * 100}%)`;
    };

    const startAutoSlide = () => {
      autoSlide = setInterval(() => showSlide(index + 1), 4000);
    };
    const resetAutoSlide = () => {
      clearInterval(autoSlide);
      startAutoSlide();
    };

    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(index - 1); resetAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(index + 1); resetAutoSlide(); });

    startAutoSlide();
  }
});
