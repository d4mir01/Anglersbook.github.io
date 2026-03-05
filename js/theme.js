const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.querySelector('.theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (themeBtn && themeIcon) {
    // Проверка сохранённой темы
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-theme');
      themeIcon.src = themeIcon.src.includes('sun') ? themeIcon.src.replace('sun', 'moon') : themeIcon.src;
    }

    // Переключение темы
    themeBtn.addEventListener('click', (e) => {
      e.preventDefault();

      body.classList.toggle('dark-theme');

      if (body.classList.contains('dark-theme')) {
        themeIcon.src = themeIcon.src.replace('sun', 'moon');
        localStorage.setItem('theme', 'dark');
      } else {
        themeIcon.src = themeIcon.src.replace('moon', 'sun');
        localStorage.setItem('theme', 'light');
      }
    });
  }
});

/*УВЕЛИЧЕНИЕ КАРТИНОК*/

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('imgModalContent');
  const modalClose = document.getElementById('imgModalClose');

  let currentScale = 1;

  document.querySelectorAll('.card-img img, .media-img img').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      currentScale = 1;
      modalImg.style.transform = 'scale(1)';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  modalImg.addEventListener('wheel', (e) => {
    e.preventDefault();
    currentScale += e.deltaY < 0 ? 0.1 : -0.1;
    currentScale = Math.min(Math.max(currentScale, 0.5), 3);
    modalImg.style.transform = `scale(${currentScale})`;
  });

});

/* КНОПКА НАВЕРХ */

document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollTopBtn');

  if (!scrollBtn) return;

  // Показ / скрытие кнопки
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  // Прокрутка наверх
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// === SCROLL-ЭФФЕКТ ДЛЯ ПРЕМИУМ БЛОКА ===

document.addEventListener('scroll', () => {
  const hero = document.getElementById('scrollHero');
  if (!hero) return;

  const rect = hero.getBoundingClientRect();
  const triggerPoint = window.innerHeight * 0.75;

  if (rect.top < triggerPoint) {
    hero.classList.add('active');
  }
}); 