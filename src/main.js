import 'lenis/dist/lenis.css';
import './styles/main.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

import { animaEscenaV02, escenaV02, inicioEscenaV02 } from './lib/escenas-v02.js';
import { crearKit } from './lib/anim.js';
import { NUCLEOS } from './nucleos/index.js';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
ScrollTrigger.config({ ignoreMobileResize: true });

// Página de diseño (pt) → se escala entera para entrar en la ventana.
const ANCHO = 1684;
const ALTO = 1190;
const raiz = document.documentElement;

function escalar() {
  const vw = raiz.clientWidth;
  const vh = window.innerHeight;
  const s = Math.min(vw / ANCHO, vh / ALTO);
  raiz.style.setProperty('--s', s.toFixed(5));
  raiz.style.setProperty('--oy', `${Math.max(0, (vh - ALTO * s) / 2).toFixed(1)}px`);
}
escalar();
window.addEventListener('resize', escalar);

// ?ver=3:4.5 salta al núcleo 3, paso 4.5 (sirve para revisar un momento puntual)
const ver = new URLSearchParams(location.search).get('ver');
const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ------------------------------------------------------------ secciones
const historia = document.getElementById('historia');
const secciones = NUCLEOS.map((n) => {
  const sec = document.createElement('section');
  sec.className = 'nucleo';
  sec.id = n.id;
  sec.setAttribute('aria-label', n.nombre);
  sec.style.setProperty('--pasos', n.pasos);
  sec.innerHTML = `<div class="pin"><div class="stage">${n.html()}</div></div>`;
  historia.append(sec);
  return sec;
});

// ---------------------------------------------------------- scroll suave
let lenis = null;
if (!ver && !reducido) {
  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, touchMultiplier: 1.2 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Reconstrucciones optativas, independientes de la línea de tiempo del relato.
const visor = document.createElement('dialog');
visor.className = 'visor-reconstruccion';
visor.setAttribute('aria-label', 'Reconstrucción ilustrada');
visor.innerHTML = `<div class="stage"></div>
  <div class="visor-reconstruccion__scroll" tabindex="0" autofocus aria-label="Desplazá para avanzar en la reconstrucción" data-lenis-prevent>
    <div class="visor-reconstruccion__recorrido" aria-hidden="true"></div>
  </div>
  <div class="visor-reconstruccion__controles">
    <span>Hacé scroll para avanzar</span>
    <form method="dialog"><button type="submit" aria-label="Cerrar reconstrucción">×</button></form>
  </div>`;
document.body.append(visor);
const escenaVisor = visor.querySelector('.stage');
const scrollVisor = visor.querySelector('.visor-reconstruccion__scroll');
let animacionVisor;
let inicioVisor;
let cierreVisor;

function actualizarReconstruccion() {
  if (!animacionVisor || !visor.open) return;
  const recorrido = scrollVisor.scrollHeight - scrollVisor.clientHeight;
  const progreso = recorrido > 0 ? scrollVisor.scrollTop / recorrido : 0;
  const progresoEscena = Math.min(1, progreso / 0.86);
  animacionVisor.time(inicioVisor + progresoEscena * (animacionVisor.duration() - inicioVisor));

  clearTimeout(cierreVisor);
  if (recorrido > 0 && scrollVisor.scrollTop >= recorrido - 1) {
    cierreVisor = setTimeout(() => {
      if (visor.open) visor.close();
    }, 450);
  }
}

scrollVisor.addEventListener('scroll', actualizarReconstruccion, { passive: true });

historia.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-reconstruccion]');
  if (!boton || visor.open) return;
  const nombre = boton.dataset.reconstruccion;
  escenaVisor.innerHTML = escenaV02(nombre, 'detalle');
  animacionVisor = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
  inicioVisor = inicioEscenaV02(nombre) + 0.2;
  animaEscenaV02(crearKit(animacionVisor, escenaVisor), nombre, 'detalle');
  lenis?.stop();
  visor.showModal();
  scrollVisor.scrollTop = 0;
  actualizarReconstruccion();
});
visor.addEventListener('close', () => {
  clearTimeout(cierreVisor);
  animacionVisor?.kill();
  animacionVisor = null;
  escenaVisor.replaceChildren();
  lenis?.start();
});

// ------------------------------------------------------------ animaciones
function animar() {
  try {
    armar();
  } finally {
    raiz.classList.add('listo');
  }
}

function armar() {
  NUCLEOS.forEach((n, i) => {
    const sec = secciones[i];
    // Línea de tiempo atada al scroll: 1 unidad = 1 paso.
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: ver ? true : 0.6 },
    });
    const k = crearKit(tl, sec);
    n.build(k);
    if (tl.duration() > n.pasos) console.warn(`[${n.id}] la animación dura ${tl.duration().toFixed(2)} y pasos = ${n.pasos}`);
    tl.set({}, {}, n.pasos);

    // Entrada del núcleo (título en paneo horizontal + bajada).
    if (k.intro) {
      if (ver) k.intro.progress(1);
      else if (i === 0) k.intro.delay(0.25).play();
      else {
        const st = ScrollTrigger.create({
          trigger: sec,
          start: 'top 55%',
          onEnter: () => k.intro.play(),
          onLeaveBack: () => k.intro.reverse(),
        });
        if (st.progress > 0) k.intro.progress(1);
      }
    }
  });
  ScrollTrigger.refresh();

  if (ver) {
    // Conserva las referencias de revisión anteriores a la unión de los hitos.
    const [indiceOriginal, paso = 0] = ver.split(':').map(Number);
    const i = indiceOriginal >= 3 ? indiceOriginal - 1 : indiceOriginal;
    const t = indiceOriginal === 3 ? paso + 2.75 : paso;
    const sec = secciones[i];
    const tramo = sec.offsetHeight - window.innerHeight;
    window.scrollTo(0, sec.offsetTop + (t / NUCLEOS[i].pasos) * tramo);
    ScrollTrigger.update();
  }
}

// Las tipografías cambian el ancho de los textos: se espera a que carguen.
const fuentes = document.fonts?.ready ?? Promise.resolve();
Promise.race([fuentes, new Promise((r) => setTimeout(r, 2500))]).then(animar);

// ------------------------------------------------------------------ índice
const boton = document.querySelector('.menu-btn');
const indice = document.getElementById('indice');
const lista = indice.querySelector('.indice__lista');
lista.innerHTML = NUCLEOS
  .filter((n) => n.enIndice !== false)
  .map((n) => `<li><a href="#${n.id}">${n.nombre}</a></li>`)
  .join('');
indice.hidden = false;
indice.inert = true;

function alternar(abrir = !indice.classList.contains('abierto')) {
  indice.classList.toggle('abierto', abrir);
  indice.inert = !abrir;
  boton.setAttribute('aria-expanded', String(abrir));
  boton.setAttribute('aria-label', abrir ? 'Cerrar índice' : 'Abrir índice');
  if (lenis) abrir ? lenis.stop() : lenis.start();
}
boton.addEventListener('click', () => alternar());
window.addEventListener('keydown', (e) => e.key === 'Escape' && alternar(false));
lista.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  e.preventDefault();
  const sec = document.getElementById(a.hash.slice(1));
  // el salto ocurre tapado por el índice; al cerrarse ya se ve el núcleo
  const y = sec.offsetTop + 2;
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
  history.replaceState(null, '', a.hash);
  alternar(false);
});
