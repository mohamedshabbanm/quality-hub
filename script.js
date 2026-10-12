/* ===== Translations (EDIT the text here) ===== */
const T = {
  en: {
    nav_about:"About", nav_skills:"Skills", nav_process:"Process", nav_projects:"Projects", nav_samples:"Samples", nav_journey:"Journey", nav_contact:"Contact",
    badge:"Open to QA opportunities", hi:"Hi, I'm",
    roles:["Software Tester","Manual Testing","Automation Testing","API Testing"],
    hero_lead:"I find bugs before your users do. I design clear test cases, build maintainable automation suites and validate REST APIs so teams can ship with confidence.",
    cta_projects:"View Projects", cta_contact:"Contact Me", cta_cv:"Download CV",
    about_eyebrow:"// about", about_title:"Quality is a mindset, not a phase",
    about_p1:"I'm a software tester who cares about the user experience behind every feature. I test from three angles: hands-on manual testing, automated regression suites, and API-level validation.",
    about_p2:"I write precise bug reports, think in edge cases, and automate the repetitive checks so the team can focus on shipping. I'm always learning new tools and practices to raise the quality bar.",
    f1_t:"Manual Testing", f1_d:"Exploratory, functional and regression testing with well-documented results.",
    f2_t:"Test Automation", f2_d:"Reliable UI frameworks with Page Object Model, reports and CI.",
    f3_t:"API Testing", f3_d:"Validating status codes, payloads, schemas, auth and error handling.",
    skills_eyebrow:"// skills", skills_title:"What I bring to the team",
    m1:"Test plans, test cases and traceability matrix", m2:"Functional, regression, smoke and exploratory testing", m3:"Clear bug reports and lifecycle tracking in Jira", m4:"Boundary value analysis & equivalence partitioning", m5:"STLC, SDLC and Agile/Scrum",
    a1:"Python + pytest and Selenium / Playwright", a2:"Page Object Model & clean framework design", a3:"Data-driven and parameterized tests", a4:"HTML / Allure reporting", a5:"CI runs with GitHub Actions",
    p1:"Postman collections, environments and variables", p2:"Status codes, response body and JSON schema checks", p3:"Auth, negative and boundary scenarios", p4:"Newman and Python requests automation", p5:"Reading Swagger / OpenAPI docs",
    tools_title:"Tools & technologies",
    proc_eyebrow:"// workflow", proc_title:"How I test",
    s1_t:"Analyze", s1_d:"Study requirements and find gaps or risks early.",
    s2_t:"Design", s2_d:"Write test scenarios and cases with full coverage.",
    s3_t:"Execute", s3_d:"Run manual and automated tests, log defects.",
    s4_t:"Report", s4_d:"Share clear results, evidence and severity.",
    s5_t:"Improve", s5_d:"Retest, automate regressions and refine coverage.",
    proj_eyebrow:"// work", proj_title:"Featured projects", f_all:"All",
    pr1_d:"Test framework for an e-commerce site covering login, cart and checkout, with POM and reports.",
    pr2_d:"Postman collection and Python tests for CRUD, auth, validation and negative scenarios.",
    pr3_d:"Test plan, test cases and bug reports for a real web application.",
    pr4_d:"GitHub Actions workflow that runs the suite on every push and publishes the report.",
    smp_eyebrow:"// samples", smp_title:"How my work looks", copy:"Copy", copied:"Copied ✓",
    jr_eyebrow:"// journey", jr_title:"Education & learning",
    j1_t:"Bachelor's degree, [Your University]", j1_d:"Computer science / information systems studies, Egypt.",
    j2_t:"Software Testing course / bootcamp", j2_d:"Manual testing, automation and API testing training.",
    j3_t:"Certification (ISTQB / other)", j3_d:"Add your certificates and dates here.",
    ct_eyebrow:"// contact", ct_title:"Let's build quality together",
    ct_p:"Looking for a software tester for your team or project? Send me a message and I'll reply soon.",
    fm_name:"Name", fm_email:"Email", fm_msg:"Message", fm_send:"Send Message",
    fm_err:"Please fill in all fields with a valid email.", fm_ok:"Opening your email app…",
    foot:"Built with HTML, CSS & JavaScript"
  },
  ar: {
    nav_about:"عني", nav_skills:"المهارات", nav_process:"طريقة الشغل", nav_projects:"المشاريع", nav_samples:"نماذج", nav_journey:"المسيرة", nav_contact:"تواصل",
    badge:"متاح لفرص الـ QA", hi:"أهلاً، أنا",
    roles:["Software Tester","Manual Testing","Automation Testing","API Testing"],
    hero_lead:"بلاقي الـ bugs قبل ما توصل للمستخدم. بكتب test cases واضحة، وببني automation framework سهل الصيانة، وبختبر الـ REST APIs عشان الفريق يطلّع المنتج وهو واثق.",
    cta_projects:"شوف المشاريع", cta_contact:"كلمني", cta_cv:"حمّل الـ CV",
    about_eyebrow:"// عني", about_title:"الجودة طريقة تفكير مش مرحلة",
    about_p1:"أنا Software Tester بهتم بتجربة المستخدم ورا كل feature. بختبر من 3 زوايا: manual testing، وautomated regression، وAPI validation.",
    about_p2:"بكتب bug reports دقيقة، وبفكر في الـ edge cases، وبعمل automation للحاجات المتكررة عشان الفريق يركز على التسليم. دايماً بتعلم أدوات جديدة عشان أرفع مستوى الجودة.",
    f1_t:"Manual Testing", f1_d:"اختبار exploratory وfunctional وregression مع توثيق واضح للنتائج.",
    f2_t:"Test Automation", f2_d:"frameworks موثوقة بـ Page Object Model وتقارير وCI.",
    f3_t:"API Testing", f3_d:"فحص الـ status codes والـ payloads والـ schemas والـ auth والـ errors.",
    skills_eyebrow:"// المهارات", skills_title:"إيه اللي هضيفه للفريق",
    m1:"Test plans وtest cases وtraceability matrix", m2:"Functional وregression وsmoke وexploratory testing", m3:"Bug reports واضحة ومتابعة دورة حياتها على Jira", m4:"Boundary value analysis وequivalence partitioning", m5:"STLC وSDLC وAgile/Scrum",
    a1:"Python + pytest وSelenium / Playwright", a2:"Page Object Model وتصميم framework نضيف", a3:"Data-driven وparameterized tests", a4:"تقارير HTML / Allure", a5:"تشغيل الـ tests على GitHub Actions (CI)",
    p1:"Postman collections وenvironments وvariables", p2:"فحص status codes والـ response body وJSON schema", p3:"سيناريوهات Auth وnegative وboundary", p4:"أتمتة بـ Newman وPython requests", p5:"قراءة Swagger / OpenAPI",
    tools_title:"الأدوات والتقنيات",
    proc_eyebrow:"// الخطوات", proc_title:"بختبر إزاي",
    s1_t:"تحليل", s1_d:"دراسة المتطلبات واكتشاف الثغرات والمخاطر بدري.",
    s2_t:"تصميم", s2_d:"كتابة السيناريوهات والـ test cases بتغطية كاملة.",
    s3_t:"تنفيذ", s3_d:"تشغيل الاختبارات اليدوية والآلية وتسجيل العيوب.",
    s4_t:"تقرير", s4_d:"عرض النتائج والأدلة والـ severity بوضوح.",
    s5_t:"تحسين", s5_d:"إعادة الاختبار وأتمتة الـ regression وتطوير التغطية.",
    proj_eyebrow:"// الشغل", proj_title:"أهم المشاريع", f_all:"الكل",
    pr1_d:"Test framework لموقع e-commerce بيغطي login وcart وcheckout بـ POM وتقارير.",
    pr2_d:"Postman collection وPython tests لـ CRUD والـ auth والـ validation والـ negative scenarios.",
    pr3_d:"Test plan وtest cases وbug reports لتطبيق ويب حقيقي.",
    pr4_d:"GitHub Actions workflow بيشغّل الـ suite مع كل push وينشر التقرير.",
    smp_eyebrow:"// نماذج", smp_title:"شكل شغلي", copy:"نسخ", copied:"اتنسخ ✓",
    jr_eyebrow:"// المسيرة", jr_title:"التعليم والتعلّم",
    j1_t:"بكالوريوس، [اسم الجامعة]", j1_d:"دراسة علوم الحاسب / نظم المعلومات، مصر.",
    j2_t:"كورس / معسكر Software Testing", j2_d:"تدريب على manual testing وautomation وAPI testing.",
    j3_t:"شهادة (ISTQB / غيرها)", j3_d:"ضيف شهاداتك وتواريخها هنا.",
    ct_eyebrow:"// تواصل", ct_title:"خلينا نبني جودة مع بعض",
    ct_p:"محتاج Software Tester لفريقك أو مشروعك؟ ابعتلي رسالة وهرد عليك بسرعة.",
    fm_name:"الاسم", fm_email:"الإيميل", fm_msg:"الرسالة", fm_send:"ابعت الرسالة",
    fm_err:"من فضلك املا كل الخانات بإيميل صحيح.", fm_ok:"بفتحلك تطبيق الإيميل…",
    foot:"اتبنى بـ HTML وCSS وJavaScript"
  }
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k){ try{ return localStorage.getItem(k) }catch(e){ return null } },
  set(k,v){ try{ localStorage.setItem(k,v) }catch(e){} }
};
const root = document.documentElement;
let lang = store.get('lang') || 'en';

/* ===== Language ===== */
function applyLang(l){
  lang = l;
  root.lang = l; root.dir = l === 'ar' ? 'rtl' : 'ltr';
  $$('[data-i18n]').forEach(el => { const v = T[l][el.dataset.i18n]; if(v) el.textContent = v; });
  $('#langBtn').textContent = l === 'ar' ? 'EN' : 'AR';
  store.set('lang', l);
  restartTyping();
}
$('#langBtn').onclick = () => applyLang(lang === 'ar' ? 'en' : 'ar');

/* ===== Theme ===== */
function applyTheme(t){
  root.dataset.theme = t;
  $('#themeBtn').textContent = t === 'dark' ? '☾' : '☀';
  store.set('theme', t);
}
$('#themeBtn').onclick = () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
applyTheme(store.get('theme') || 'dark');

/* ===== Typing effect ===== */
let typeTimer;
function restartTyping(){
  clearTimeout(typeTimer);
  const el = $('#typed'), roles = T[lang].roles;
  let i = 0, j = 0, del = false;
  (function tick(){
    const word = roles[i];
    el.textContent = word.slice(0, j);
    if(!del && j === word.length){ del = true; typeTimer = setTimeout(tick, 1400); return; }
    if(del && j === 0){ del = false; i = (i + 1) % roles.length; }
    j += del ? -1 : 1;
    typeTimer = setTimeout(tick, del ? 45 : 90);
  })();
}

/* ===== Terminal animation ===== */
const termLines = [
  ['<span class="cmd">$ pytest -v --alluredir=reports</span>', 500],
  ['<span class="dim">collected 8 items</span>', 500],
  ['', 150],
  ['tests/test_login.py::test_valid_login <span class="ok">PASSED</span>', 380],
  ['tests/test_login.py::test_wrong_password <span class="ok">PASSED</span>', 380],
  ['tests/test_cart.py::test_add_item <span class="ok">PASSED</span>', 380],
  ['tests/test_cart.py::test_remove_item <span class="ok">PASSED</span>', 380],
  ['tests/test_api.py::test_create_user_201 <span class="ok">PASSED</span>', 380],
  ['tests/test_api.py::test_get_user_404 <span class="ok">PASSED</span>', 380],
  ['tests/test_api.py::test_auth_required_401 <span class="ok">PASSED</span>', 380],
  ['tests/test_checkout.py::test_empty_cart <span class="ok">PASSED</span>', 380],
  ['', 150],
  ['<span class="ok">=========== 8 passed in 4.21s ===========</span>', 2600]
];
function runTerminal(){
  const t = $('#term'); t.innerHTML = ''; let i = 0;
  (function next(){
    if(i >= termLines.length){ setTimeout(runTerminal, 1200); return; }
    t.innerHTML += termLines[i][0] + '\n';
    const d = termLines[i][1]; i++;
    setTimeout(next, d);
  })();
}

/* ===== Nav: scroll state, active link, mobile menu ===== */
const nav = $('#nav'), toTop = $('#toTop');
addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 10);
  toTop.classList.toggle('show', scrollY > 600);
}, { passive: true });
toTop.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
$('#burger').onclick = () => $('#links').classList.toggle('open');
$$('#links a').forEach(a => a.onclick = () => $('#links').classList.remove('open'));

const secObs = new IntersectionObserver(es => {
  es.forEach(e => {
    if(e.isIntersecting){
      $$('#links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => secObs.observe(s));

/* ===== Reveal on scroll ===== */
const revObs = new IntersectionObserver(es => {
  es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); revObs.unobserve(e.target); } });
}, { threshold: .12 });
$$('.reveal').forEach(el => revObs.observe(el));

/* ===== Project filters ===== */
$('#filters').onclick = e => {
  const b = e.target.closest('button'); if(!b) return;
  $$('#filters button').forEach(x => x.classList.toggle('active', x === b));
  $$('#projGrid .proj').forEach(p => p.classList.toggle('hide', b.dataset.filter !== 'all' && p.dataset.cat !== b.dataset.filter));
};

/* ===== Code tabs + copy ===== */
$('#codeTabs').onclick = e => {
  const b = e.target.closest('button'); if(!b) return;
  $$('#codeTabs button').forEach(x => x.classList.toggle('active', x === b));
  $$('.code').forEach(c => c.classList.toggle('active', c.id === 'tab-' + b.dataset.tab));
};
$('#copyBtn').onclick = async () => {
  const txt = $('.code.active').innerText, btn = $('#copyBtn');
  try{ await navigator.clipboard.writeText(txt); btn.textContent = T[lang].copied; }catch(e){}
  setTimeout(() => btn.textContent = T[lang].copy, 1600);
};

/* ===== Contact form (opens email app; no backend needed) ===== */
const CONTACT_EMAIL = 'you@example.com'; // EDIT
$('#form').onsubmit = e => {
  e.preventDefault();
  const f = e.target, n = f.name.value.trim(), m = f.email.value.trim(), g = f.msg.value.trim();
  const ok = n && g && /^\S+@\S+\.\S+$/.test(m);
  [f.name, f.email, f.msg].forEach(i => i.classList.toggle('invalid', !i.value.trim()));
  $('#formNote').style.color = ok ? '' : '#ff5f57';
  $('#formNote').textContent = ok ? T[lang].fm_ok : T[lang].fm_err;
  if(!ok) return;
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Portfolio message from ' + n)}&body=${encodeURIComponent(g + '\n\n' + n + ' (' + m + ')')}`;
};

$('#year').textContent = new Date().getFullYear();
applyLang(lang);
runTerminal();
