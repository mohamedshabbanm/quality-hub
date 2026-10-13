const languageToggle = document.getElementById('languageToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
let currentLanguage = 'en';

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en][data-ar]').forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  languageToggle.textContent = language === 'en' ? 'عربي ↗' : 'English ↗';
  languageToggle.setAttribute('aria-label', language === 'en' ? 'Switch to Arabic' : 'Switch to English');
  document.title = language === 'en' ? 'Mohamed Shabban — Software Quality & Testing' : 'محمد شعبان — اختبار البرمجيات وضمان الجودة';
}

languageToggle.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'ar' : 'en'));
menuToggle.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.textContent = opened ? '×' : '☰';
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();
