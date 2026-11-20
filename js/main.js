// Portafolio - Roycer Cervantes

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Datos de los proyectos ---------- */
const PROJECTS = {
  edward: {
    name: 'Edward Parrillata',
    type: 'Negocio real · Restaurante',
    url: 'edwardparrillata.com',
    link: 'http://edwardparrillata.com',
    desc: 'Página web de un restaurante de parrilla al carbón en Santa Marta. El cliente ve la carta, reserva su mesa y pide a domicilio sin salir de la página.',
    tags: ['Carta digital', 'Reservas', 'WhatsApp', 'Domicilios'],
    feats: [
      'Carta completa por categorías, con precios',
      'Formulario para reservar mesa',
      'Botón de pedidos directo a WhatsApp',
      'Horario y dirección siempre a la vista'
    ]
  },
  kuadri: {
    name: 'Kuadri',
    type: 'Aplicación web',
    url: 'kuadri.vercel.app',
    link: 'https://kuadri.vercel.app',
    desc: 'Aplicación para organizar entregas, estudio y metas en un solo panel. Funciona en celular, tableta y computador.',
    tags: ['React 19', 'Node.js + Express', 'MySQL', 'Login con Google'],
    feats: [
      'Tareas y entregas con fecha y prioridad',
      'Temporizador de enfoque para estudiar',
      'Rachas y logros que premian la constancia',
      'Recordatorios automáticos por correo'
    ]
  },
  orbezu: {
    name: 'Orbezu',
    type: 'Aplicación web',
    url: 'orbezu.vercel.app',
    link: 'https://orbezu.vercel.app',
    desc: 'App para aprender idiomas hablando en voz alta, con shadowing y frases largas: primero escuchas, luego repites imitando.',
    tags: ['PWA instalable', 'Reconocimiento de voz', '11 idiomas', 'Modo oscuro'],
    feats: [
      'Lecciones por idioma con frases largas',
      'Compara lo que dijiste con la frase original',
      'Repaso espaciado e historias',
      'Se instala en el celular como una app'
    ]
  }
};

/* ---------- Navegacion ---------- */
const nav = $('#nav');
$('#navToggle').addEventListener('click', () => nav.classList.toggle('open'));
$$('#navLinks a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), { passive: true });
$('#yr').textContent = new Date().getFullYear();

/* ---------- Palabra que se escribe sola ---------- */
(function typer() {
  const el = $('#rotWord');
  const words = ['negocio', 'tienda', 'barbería', 'hostal', 'consultorio', 'restaurante', 'marca'];
  if (reduced) return;
  let w = 0, i = words[0].length, del = true;
  function tick() {
    const word = words[w];
    i += del ? -1 : 1;
    el.textContent = word.slice(0, i);
    let wait = del ? 45 : 85;
    if (!del && i === word.length) { del = true; wait = 1700; }
    else if (del && i === 0) { del = false; w = (w + 1) % words.length; wait = 250; }
    setTimeout(tick, wait);
  }
  setTimeout(tick, 1800);
})();

/* ---------- Tarjetas del inicio: se mueven con el cursor ---------- */
const stack = $('#stack');
if (!reduced && matchMedia('(hover:hover)').matches) {
  stack.addEventListener('mousemove', e => {
    const r = stack.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    $$('.card', stack).forEach(c => {
      const d = +c.dataset.depth;
      c.style.setProperty('--tx', (x * d).toFixed(1) + 'px');
      c.style.setProperty('--ty', (y * d).toFixed(1) + 'px');
    });
  });
  stack.addEventListener('mouseleave', () =>
    $$('.card', stack).forEach(c => { c.style.setProperty('--tx', '0px'); c.style.setProperty('--ty', '0px'); })
  );
}
$$('.card', stack).forEach(c => c.addEventListener('click', () => {
  setProject(c.dataset.go);
  $('#proyectos').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
}));

/* ---------- Visor de proyectos ---------- */
const viewport = $('#viewport'), shot = $('#shot'), device = $('#device');
const playBtn = $('#playBtn'), prog = $('#prog');
let current = 'edward', dev = 'desk', playing = false, raf = null, pos = 0;

function render(infoToo) {
  const p = PROJECTS[current];
  stopPlay();
  shot.classList.add('loading');
  const src = `img/shots/${current}-${dev}.jpg`;
  const img = new Image();
  img.onload = () => { shot.src = src; shot.alt = 'Captura de ' + p.name; viewport.scrollTop = 0; shot.classList.remove('loading'); updateProg(); };
  img.src = src;
  $('#scUrl').textContent = p.url;
  if (!infoToo) return;
  $('#scType').textContent = p.type;
  $('#scName').textContent = p.name;
  $('#scDesc').textContent = p.desc;
  $('#scTags').innerHTML = p.tags.map(t => `<li>${t}</li>`).join('');
  $('#scFeats').innerHTML = p.feats.map(t => `<li>${t}</li>`).join('');
  $('#scLink').href = p.link;
  const info = $('.sc-info');
  info.classList.remove('fade'); void info.offsetWidth; info.classList.add('fade');
}
function setProject(id) {
  current = id;
  $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.p === id));
  render(true);
}
function setDevice(d) {
  dev = d;
  device.className = 'device ' + d;
  $$('#deviceSeg button').forEach(b => b.classList.toggle('on', b.dataset.d === d));
  render(false);
}
$$('#tabs button').forEach(b => b.addEventListener('click', () => setProject(b.dataset.p)));
$$('#deviceSeg button').forEach(b => b.addEventListener('click', () => setDevice(b.dataset.d)));

function updateProg() {
  const max = viewport.scrollHeight - viewport.clientHeight;
  prog.style.width = (max > 0 ? (viewport.scrollTop / max) * 100 : 0) + '%';
}
viewport.addEventListener('scroll', updateProg, { passive: true });

function step() {
  const max = viewport.scrollHeight - viewport.clientHeight;
  pos += dev === 'mob' ? 1.6 : 1.2;
  if (pos >= max) { viewport.scrollTop = max; stopPlay(); return; }
  viewport.scrollTop = pos;
  raf = requestAnimationFrame(step);
}
function startPlay() {
  const max = viewport.scrollHeight - viewport.clientHeight;
  pos = viewport.scrollTop >= max - 2 ? 0 : viewport.scrollTop;
  playing = true; playBtn.classList.add('on'); $('#playTxt').textContent = 'Pausar';
  raf = requestAnimationFrame(step);
}
function stopPlay() {
  playing = false; cancelAnimationFrame(raf);
  playBtn.classList.remove('on'); $('#playTxt').textContent = 'Recorrer sola';
}
playBtn.addEventListener('click', () => (playing ? stopPlay() : startPlay()));
['wheel', 'touchstart', 'mousedown'].forEach(ev =>
  viewport.addEventListener(ev, () => playing && stopPlay(), { passive: true })
);
if (innerWidth < 700) setDevice('mob');
render(true);

/* ---------- Arma tu pagina ---------- */
const FEATS = {
  catalogo: { label: { restaurante: 'Carta', hostal: 'Habitaciones', tienda: 'Catálogo', def: 'Servicios' }, msg: { restaurante: 'la carta con precios', hostal: 'las habitaciones', tienda: 'el catálogo de productos', def: 'mis servicios' }, html: '<div class="row"><i></i><i></i><i></i></div>' },
  fotos: { label: { def: 'Galería' }, msg: { def: 'galería de fotos' }, html: '<div class="row"><i></i><i></i></div>' },
  reservas: { label: { restaurante: 'Reservar mesa', hostal: 'Reservar', def: 'Agendar cita' }, msg: { restaurante: 'reservas', hostal: 'reservas', def: 'agenda de citas' }, html: '<div class="ln"></div><div class="ln s"></div>', cls: 'dark' },
  mapa: { label: { def: 'Dónde estamos · Horario' }, msg: { def: 'mapa y horario' }, html: '<div class="row"><i></i></div>', cls: 'map' },
  admin: { label: { def: 'Panel del dueño' }, msg: { def: 'un panel para editarla yo mismo' }, html: '<div class="ln"></div><div class="ln s"></div>' },
  whatsapp: { label: { def: 'Pedir por WhatsApp' }, msg: { def: 'pedidos por WhatsApp' }, html: '', cls: 'wa' }
};
const ORDER = ['catalogo', 'fotos', 'reservas', 'mapa', 'admin', 'whatsapp'];
let biz = 'negocio';
const pick = (o) => o[biz] || o.def;

function buildPreview(animateKey) {
  const active = $$('#featChips button.on').map(b => b.dataset.f);
  const list = ORDER.filter(k => active.includes(k));
  $('#mpName').textContent = 'Tu ' + (biz === 'negocio de servicios' ? 'negocio' : biz);
  $('#mpBlocks').innerHTML = list.map(k => {
    const f = FEATS[k];
    const anim = animateKey === k || animateKey === 'all' ? '' : 'style="animation:none"';
    return `<div class="mp-b ${f.cls || ''}" ${anim}>${pick(f.label)}${f.html}</div>`;
  }).join('');
  $('#bCount').textContent = list.length;

  const parts = list.map(k => pick(FEATS[k].msg));
  const txt = parts.length > 1 ? parts.slice(0, -1).join(', ') + ' y ' + parts.at(-1) : (parts[0] || '');
  const art = biz === 'tienda' ? 'una' : 'un';
  const msg = `Hola Roycer, tengo ${art} ${biz} y quiero una página web` + (txt ? ` con ${txt}.` : '.') + ' ¿Me cuentas cómo sería?';
  $('#waPreview').textContent = '"' + msg + '"';
  $('#waSend').href = 'https://wa.me/573154930657?text=' + encodeURIComponent(msg);
}
function setBiz(v) {
  biz = v;
  $$('#bizChips button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
  buildPreview('all');
}
$$('#bizChips button').forEach(b => b.addEventListener('click', () => setBiz(b.dataset.v)));
$$('#featChips button').forEach(b => b.addEventListener('click', () => {
  b.classList.toggle('on');
  buildPreview(b.dataset.f);
}));
$$('[data-pick]').forEach(a => a.addEventListener('click', () => setBiz(a.dataset.pick)));
buildPreview('all');

/* ---------- Pasos del proceso ---------- */
const steps = $$('#steps li');
let stepI = 0, stepTimer = null;
const setStep = i => { stepI = i; steps.forEach((s, k) => s.classList.toggle('on', k === i)); };
const autoSteps = () => { stepTimer = setInterval(() => setStep((stepI + 1) % steps.length), 2600); };
steps.forEach((s, i) => {
  s.addEventListener('mouseenter', () => { clearInterval(stepTimer); setStep(i); });
  s.addEventListener('click', () => { clearInterval(stepTimer); setStep(i); });
});
$('#steps').addEventListener('mouseleave', () => { clearInterval(stepTimer); if (!reduced) autoSteps(); });
if (!reduced) autoSteps();

/* ---------- Copiar correo ---------- */
$('#copyMail').addEventListener('click', async e => {
  const tag = $('#copyTag');
  try {
    await navigator.clipboard.writeText(e.currentTarget.dataset.mail);
    tag.textContent = 'Copiado';
  } catch {
    tag.textContent = 'Cópialo a mano';
  }
  setTimeout(() => (tag.textContent = 'Copiar'), 2000);
});

/* ---------- Aparicion al hacer scroll ---------- */
const targets = $$('.hero-text, .hero-stack, .sc-head, .sc-tabs, .sc-body, .services h2, .svc, .b-left, .b-right, .process h2, .steps li, .about-card, .contact h2, .contact p, .contact .hero-btns');
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    const el = e.target;
    el.classList.add('in'); io.unobserve(el);
    setTimeout(() => { el.classList.remove('rv', 'in'); el.style.transitionDelay = ''; }, 1300);
  }
}), { threshold: 0.1 });
targets.forEach((el, i) => { el.classList.add('rv'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
