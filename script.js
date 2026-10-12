
(() => {
  const root = document.documentElement;
  const langButton = document.getElementById('languageToggle');
  const themeButton = document.getElementById('themeToggle');
  const menuButton = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');
  const header = document.querySelector('.site-header');

  function setLanguage(lang) {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      const value = el.dataset[lang];

      if (value !== undefined) {
        el.textContent = value;
      }
    });

    langButton.textContent = lang === 'en' ? 'AR' : 'EN';

    langButton.setAttribute(
      'aria-label',
      lang === 'en' ? 'Switch to Arabic' : 'Switch to English'
    );

    document.title = lang === 'ar'
      ? 'محمد شعبان | مختبر برمجيات'
      : 'Mohamed Shabban | Software Tester';
  }

  langButton.addEventListener('click', () => {
    setLanguage(root.lang === 'en' ? 'ar' : 'en');
  });

  themeButton.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';

    root.dataset.theme = next;
    themeButton.textContent = next === 'dark' ? '☼' : '☾';
  });

  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');

    menuButton.textContent = navLinks.classList.contains('open')
      ? '✕'
      : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.textContent = '☰';
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 12);
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }

  window.addEventListener('scroll', onScroll, {
    passive: true
  });

  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  document.getElementById('year').textContent =
    new Date().getFullYear();

  document.getElementById('contactForm').addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    const subject = encodeURIComponent(
      `Software Testing Inquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href =
      `mailto:mohamedworkoff@gmail.com?subject=${subject}&body=${body}`;
  });
})();
