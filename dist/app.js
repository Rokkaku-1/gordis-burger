const products = [
  {id:'clasica',category:'burgas',name:'Gordis Clásica',image:'GORDIS-020-web.webp',badge:'LA DE SIEMPRE',teaser:'Cheddar, pickles y nuestra salsa Gordis. Así empieza todo.',ingredients:'Pan brioche, salsa Gordis, pickles de pepino, cebolla fresca, cheddar y medallón Gordis.',label:'CON PAPAS'},
  {id:'bacon',category:'burgas',name:'Gordis Bacon',image:'Gordis_Bacon_doble-web.webp',badge:'PARA EL ANTOJO',teaser:'Bacon glaseado, cebolla crispy y una combinación bien Gordis.',ingredients:'Pan brioche, mayo eneldo, cebolla crispy, bacon glaseado, cheddar, medallón Gordis y salsa Emmy con chutney de panceta y manzana.',label:'CON PAPAS'},
  {id:'tasty',category:'burgas',name:'Gordis Tasty',image:'Gordis_Tasty_simple-web.webp',badge:'UN CLÁSICO CON TODO',teaser:'Lechuga, tomate, cheddar y ese toque de salsa Tasty.',ingredients:'Pan brioche, salsa Gordis Tasty, cebolla, cheddar, medallón Gordis, tomate y lechuga.',label:'CON PAPAS',badgeColor:'blue'},
  {id:'steak',category:'burgas',name:'Steak Gordis',image:'Steak_Gordis_burger_doble-web.webp',badge:'OTRO NIVEL DE ANTOJO',teaser:'Rosti Gordis, cheddar, relish y mayo steak. Una combinación distinta.',ingredients:'Pan brioche, mayo steak, relish, cebolla, rosti Gordis, cheddar, medallón Gordis y mayo relish.',label:'CON PAPAS'},
  {id:'alfredo',category:'burgas',name:'Alfredo Gordis',image:'Alfredo_Gordis_Burger_doble-web.webp',badge:'CON UN TOQUE PICANTE',teaser:'Chili oil, jalapeños y salsa Alfredo. Para cambiar de ritmo.',ingredients:'Pan brioche, salsa chili oil, pickles de jalapeño, salsa Alfredo, medallón Gordis y salsa búfalo.',label:'CON PAPAS'},
  {id:'chicken',category:'pollo',name:'Big Chicken',image:'Big_Chicken_Sandwich-web.webp',badge:'CRISPY, MUY CRISPY',teaser:'Pollo crispy, bacon ahumado, ranch y honey mustard.',ingredients:'Pan con sésamo, salsa ranch, pickles de pepino, bacon ahumado, cheddar, pollo crispy sazonado, lechuga y honey mustard.',label:'POLLO CRISPY',badgeColor:'blue'},
  {id:'papas',category:'acompanamientos',name:'Papas Gordis',image:'Papas_fritas_sazonadas-web.webp',badge:'EL COMPAÑERO IDEAL',teaser:'Sazonadas o sin sazonador. Siempre van bien con una burga.',ingredients:'Porción de 120 g de papas fritas. Podés elegirlas sazonadas o sin sazonador.',label:'PARA COMPARTIR'},
  {id:'caesar',category:'acompanamientos',name:'Caesar Salad',image:'ensalada2-web.webp',badge:'OTRA FORMA DE GORDIS',teaser:'Hojas verdes, parmesano y chicken meatballs con salsa Caesar.',ingredients:'Hojas verdes, crispy onion pangrattato, queso parmesano, salsa Caesar, vinagreta y chicken meatballs.',label:'ENSALADA',badgeColor:'blue'},
  {id:'iceberg',category:'acompanamientos',name:'Iceberg Salad',image:'ensalada1-web.webp',badge:'MUCHO PARA PROBAR',teaser:'Queso azul, pecanas caramelizadas y chicken meatballs.',ingredients:'Chicken meatballs, mix de hojas, crispy onion pangrattato, queso parmesano, nueces pecanas caramelizadas, queso azul y vinagreta.',label:'ENSALADA',badgeColor:'blue'},
  {id:'sundae',category:'dulce',name:'Sundae Gordis',image:'postre-web.webp',badge:'EL FINAL FELIZ',teaser:'Helado de pochoclo, waffles y toffee. Guardate un lugar.',ingredients:'Helado soft sabor pochoclo, pochoclos caramelizados, waffles y salsa toffee.',label:'ALGO DULCE'}
];
const grid = document.querySelector('#products');
const filters = [...document.querySelectorAll('.filter')];
const filtersContainer = document.querySelector('.filters');
const dialog = document.querySelector('#product-dialog');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopQuery = window.matchMedia('(min-width: 1024px)');
const motionButton = document.querySelector('#motion-toggle');
const hero = document.querySelector('.hero');
const burger = document.querySelector('.hero-burger');
const faqAnimations = new Map();
const numberFrames = new Map();
const header = document.querySelector('.site-header');
const ribbon = document.querySelector('.brand-ribbon');
let dialogClosing = false;
let dialogCloseTimer = 0;
let category = 'burgas';
let lastProductButton;
let manuallyPaused = false;
let categoryTransition = null;
let transitionSerial = 0;
let heroVisible = true;
let parallaxFrame = 0;
try { manuallyPaused = localStorage.getItem('gordis-motion-paused') === 'true'; } catch { /* Preferences are optional. */ }
function motionEnabled() {
  return !motionQuery.matches && !manuallyPaused && !navigator.connection?.saveData && !/^(slow-)?2g$/.test(navigator.connection?.effectiveType || '');
}
const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
    if (entry.target.classList.contains('detail-item')) animateNumber(entry.target);
  });
}, { threshold: .08, rootMargin: '0px 0px -24px 0px' }) : null;
function prepareReveals(elements) {
  [...elements].forEach((element, index) => {
    if (element.classList.contains('reveal')) return;
    element.classList.add('reveal');
    if (element.classList.contains('product-card') || element.classList.contains('detail-item')) {
      element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 100}ms`);
    }
    const rect = element.getBoundingClientRect();
    if (!motionEnabled() || !revealObserver || rect.top < window.innerHeight - 24) {
      element.classList.add('is-visible');
      if (element.classList.contains('detail-item')) animateNumber(element);
    } else {
      revealObserver.observe(element);
    }
  });
}
function animateNumber(item) {
  const number = item.querySelector('[data-number]');
  if (!number || number.dataset.counted) return;
  number.dataset.counted = 'true';
  const target = Number(number.dataset.number);
  if (!motionEnabled()) return;
  const parent = number.parentElement;
  parent.classList.add('is-counting');
  const started = performance.now();
  function tick(now) {
    const progress = Math.min((now - started) / 850, 1);
    number.textContent = String(Math.floor(target * progress)).padStart(2, '0');
    if (progress < 1 && motionEnabled()) {
      numberFrames.set(number, requestAnimationFrame(tick));
    } else {
      number.textContent = String(target).padStart(2, '0');
      parent.classList.remove('is-counting');
      numberFrames.delete(number);
    }
  }
  numberFrames.set(number, requestAnimationFrame(tick));
}
const filterTrack = document.createElement('span');
filterTrack.className = 'filter-track';
filterTrack.setAttribute('aria-hidden', 'true');
filtersContainer.append(filterTrack);
function positionFilterTrack() {
  const active = filters.find(filter => filter.dataset.category === category);
  filterTrack.style.width = `${active.offsetWidth}px`;
  filterTrack.style.transform = `translateX(${active.offsetLeft}px)`;
}
if ('ResizeObserver' in window) new ResizeObserver(positionFilterTrack).observe(filtersContainer);
function renderProducts(announce = false, animateCategory = false) {
  const matches = products.filter(product => product.category === category);
  const visible = matches;
  grid.querySelectorAll('.reveal').forEach(card => revealObserver?.unobserve(card));
  const zoom = {clasica:1.15,bacon:1,tasty:1.06,steak:1,alfredo:1,chicken:1.03,papas:1,caesar:1,iceberg:1,sundae:1};
  grid.innerHTML = visible.map((product, index) => `<article class="product-card" data-category="${product.category}" style="--card-index:${index};--zoom:${zoom[product.id]}"><button class="product-image" data-product="${product.id}" aria-label="Ver foto e ingredientes de ${product.name}"><img src="assets/${product.image}" srcset="assets/${product.image.replace(".webp","-400.webp")} 400w, assets/${product.image} 800w, assets/${product.image.replace(".webp","-1200.webp")} 1200w" sizes="(max-width:479px) 88vw, (max-width:1023px) 44vw, 400px" decoding="async" alt="${product.name}" width="1600" height="1067" loading="lazy"><span class="product-badge ${product.badgeColor || ''}">${product.badge}</span></button><div class="product-info"><h3>${product.name}</h3><p>${product.teaser}</p><div class="product-bottom"><span>${product.label}</span><button class="product-detail" data-product="${product.id}" aria-label="Ver ingredientes de ${product.name}">Ver ingredientes <span aria-hidden="true">+</span></button></div></div></article>`).join('');
  document.querySelector(".menu-caption").hidden = category !== "burgas";
  grid.dataset.category = category;
  grid.classList.toggle('category-enter', animateCategory && motionEnabled());
  prepareReveals(grid.querySelectorAll('.product-card'));
  if (announce) document.querySelector('#menu-status').textContent = `${visible.length} opciones de ${filters.find(filter => filter.dataset.category === category).textContent} disponibles para explorar.`;
}
async function changeCategory(nextCategory) {
  if (category === nextCategory) return;
  const serial = ++transitionSerial;
  category = nextCategory;
  filters.forEach(button => {
    const selected = button.dataset.category === category;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  positionFilterTrack();
  if (categoryTransition) categoryTransition.cancel();
  if (motionEnabled() && grid.animate) {
    grid.classList.add('is-changing');
    categoryTransition = grid.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: 'ease-out', fill: 'forwards' });
    await categoryTransition.finished.catch(() => {});
    if (serial !== transitionSerial) return;
  }
  renderProducts(true, true);
  categoryTransition?.cancel();
  categoryTransition = null;
  grid.classList.remove('is-changing');
}
filters.forEach(filter => filter.addEventListener('click', () => changeCategory(filter.dataset.category)));
grid.addEventListener('click', event => {
  const button = event.target.closest('[data-product]');
  if (!button) return;
  const product = products.find(item => item.id === button.dataset.product);
  lastProductButton = button;
  document.querySelector('#dialog-content').innerHTML = `<img src="assets/${product.image}" srcset="assets/${product.image.replace(".webp","-400.webp")} 400w, assets/${product.image} 800w, assets/${product.image.replace(".webp","-1200.webp")} 1200w" sizes="(max-width:479px) 88vw, (max-width:1023px) 44vw, 400px" decoding="async" alt="${product.name}" width="1600" height="1067"><div class="dialog-copy"><p class="eyebrow">${product.badge}</p><h2 id="dialog-title">${product.name}</h2><p>${product.ingredients}</p><a class="button red" href="#local" id="dialog-visit">Nos vemos en el local</a><p class="dialog-note">Consultá precios, variantes y disponibilidad en Gordis.</p></div>`;
  dialog.showModal();
  dialogClosing = false;
  dialog.classList.remove('dialog-closing');
  dialog.classList.toggle('dialog-opening', motionEnabled());
  document.body.style.overflow = 'hidden';
});
function finishDialogClose() {
  clearTimeout(dialogCloseTimer);
  dialogClosing = false;
  dialog.classList.remove('dialog-closing','dialog-opening');
  if (dialog.open) dialog.close();
}
function closeDialog() {
  if (!dialog.open || dialogClosing) return;
  if (!motionEnabled()) { finishDialogClose(); return; }
  dialogClosing = true;
  dialog.classList.remove('dialog-opening');
  dialog.classList.add('dialog-closing');
  dialogCloseTimer = setTimeout(finishDialogClose,220);
}
dialog.addEventListener('cancel', event => {event.preventDefault();closeDialog();});
dialog.addEventListener('animationend', event => {
  if(event.target === dialog && event.animationName === 'dialog-out') finishDialogClose();
});
document.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => {if (event.target.id === 'dialog-visit') closeDialog();if (event.target === dialog) {const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) closeDialog();}});
dialog.addEventListener('close', () => {document.body.style.overflow = '';lastProductButton?.focus({preventScroll:true});});
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
let navCloseTimer;
const menuOverlay = document.querySelector('.menu-overlay');
function closeMobileNav() {menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir navegación');mobileNav.classList.add('nav-closing');menuOverlay.hidden=true;clearTimeout(navCloseTimer);navCloseTimer=setTimeout(()=>{mobileNav.hidden=true;mobileNav.classList.remove('nav-closing');},motionEnabled()?200:0);}
menuToggle.addEventListener('click', () => {if(menuToggle.getAttribute('aria-expanded')==='true'){closeMobileNav();return;}clearTimeout(navCloseTimer);mobileNav.classList.remove('nav-closing');menuToggle.setAttribute('aria-expanded','true');menuToggle.setAttribute('aria-label','Cerrar navegación');mobileNav.hidden=false;menuOverlay.hidden=false;});
menuOverlay.addEventListener('click',closeMobileNav);
mobileNav.addEventListener('click', event => {if(event.target.closest('a'))closeMobileNav();});
document.addEventListener('keydown', event => {if(event.key === 'Escape' && !mobileNav.hidden){closeMobileNav();menuToggle.focus();}});
function finishFaq(detail, state) {
  state.animation?.cancel();
  state.animation = null;
  detail.open = state.target;
  const answer = detail.querySelector('.faq-answer');
  answer.style.height = '';
  answer.style.overflow = '';
  answer.style.opacity = '';
}
document.querySelectorAll('.faq details').forEach(detail => {
  const summary = detail.querySelector('summary');
  const answer = detail.querySelector('.faq-answer');
  const state = { target: detail.open, animation: null };
  faqAnimations.set(detail, state);
  summary.addEventListener('click', event => {
    if (!motionEnabled() || !answer.animate) return;
    event.preventDefault();
    const opening = !(state.animation ? state.target : detail.open);
    const startHeight = detail.open ? answer.getBoundingClientRect().height : 0;
    const startOpacity = detail.open ? Number(getComputedStyle(answer).opacity) : 0;
    state.animation?.cancel();
    state.target = opening;
    detail.open = true;
    answer.style.height = `${startHeight}px`;
    answer.style.overflow = 'hidden';
    const animation = answer.animate([
      { height: `${startHeight}px`, opacity: startOpacity },
      { height: `${opening ? answer.scrollHeight : 0}px`, opacity: opening ? 1 : 0 }
    ], { duration: 400, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' });
    state.animation = animation;
    animation.onfinish = () => {
      if (state.animation === animation) finishFaq(detail, state);
    };
  });
});
function updateParallax() {
  parallaxFrame = 0;
  const scrolled = window.scrollY > 40;
  header.classList.toggle('is-scrolled',scrolled);
  document.body.classList.toggle('has-scrolled',scrolled);
  burger.style.setProperty('--hero-shift', '0px');
  burger.style.setProperty('--hero-tilt', '0deg');
  burger.style.willChange = '';
  hero.style.setProperty('--note-shift', '0px');
  hero.style.setProperty('--background-shift', '0px');
}
function queueParallax() {
  if (!parallaxFrame) parallaxFrame = requestAnimationFrame(updateParallax);
}
window.addEventListener('scroll', queueParallax, { passive: true });
window.addEventListener('resize', () => {positionFilterTrack();queueParallax();});
desktopQuery.addEventListener('change', event => {if(event.matches)closeMobileNav();queueParallax();});
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    hero.classList.toggle('is-in-view', heroVisible);
    queueParallax();
  }).observe(hero);
  new IntersectionObserver(entries => {
    ribbon.classList.toggle('is-in-view',entries[0].isIntersecting);
  }).observe(ribbon);
} else {
  hero.classList.add('is-in-view');
  ribbon.classList.add('is-in-view');
}
document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('is-hidden', document.hidden);
  queueParallax();
});
function applyMotionPreference() {
  const enabled = motionEnabled();
  document.querySelector('#footer').dataset.animations=enabled?'running':'paused';
  document.body.classList.toggle('motion-off', !enabled);
  motionButton.hidden = false;
  motionButton.disabled = motionQuery.matches;
  motionButton.textContent = motionQuery.matches ? 'Movimiento reducido' : enabled ? 'Pausar animaciones' : 'Activar animaciones';
  motionButton.setAttribute('aria-pressed', String(!enabled));
  if (!enabled) {
    header.querySelector('.brand').classList.remove('play-brand-intro');
    hero.classList.remove('play-intro');
    if(dialogClosing) finishDialogClose();
    dialog.classList.remove('dialog-opening');
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
    numberFrames.forEach((frame, number) => {
      cancelAnimationFrame(frame);
      number.textContent = number.dataset.number.padStart(2, '0');
      number.parentElement.classList.remove('is-counting');
    });
    numberFrames.clear();
    faqAnimations.forEach((state, detail) => {if(state.animation)finishFaq(detail, state);});
    if (categoryTransition) {
      ++transitionSerial;
      categoryTransition.cancel();
      categoryTransition = null;
      grid.classList.remove('is-changing');
      renderProducts(true);
    }
  }
  queueParallax();
}
motionButton.addEventListener('click', () => {
  manuallyPaused = !manuallyPaused;
  try {localStorage.setItem('gordis-motion-paused', String(manuallyPaused));} catch { /* A blocked preference store must not block the control. */ }
  applyMotionPreference();
});
motionQuery.addEventListener('change', applyMotionPreference);
document.body.classList.toggle('motion-off', !motionEnabled());
renderProducts();
prepareReveals(document.querySelectorAll('.closing-footer, .section-top, .story-poster, .story-copy, .details-heading, .detail-item, .local-copy, .local-map, .map-label, .faq > div, .footer-top, .footer-mascot'));
positionFilterTrack();
applyMotionPreference();
if(motionEnabled()) {
  const brand=header.querySelector('.brand');
  brand.classList.add('play-brand-intro');
  setTimeout(()=>brand.classList.remove('play-brand-intro'),750);
  hero.classList.add('play-intro');
  setTimeout(()=>hero.classList.remove('play-intro'),1400);
}
