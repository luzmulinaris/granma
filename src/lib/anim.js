import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Valor "en reposo" de cada propiedad que se usa como punto de partida.
const REPOSO = {
  x: 0,
  y: 0,
  xPercent: 0,
  yPercent: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  rotationX: 0,
  rotationY: 0,
  clipPath: 'inset(0% 0% 0% 0%)',
};

const BARRIDO = {
  izq: 'inset(0% 100% 0% 0%)',
  der: 'inset(0% 0% 0% 100%)',
  arriba: 'inset(0% 0% 100% 0%)',
  abajo: 'inset(100% 0% 0% 0%)',
};

/**
 * Caja de herramientas de un núcleo. `tl` es la línea de tiempo atada al
 * scroll: cada unidad de tiempo equivale a un "paso" de scroll.
 * Los elementos se buscan por nombre de grupo (data-g) dentro de `root`.
 */
export function crearKit(tl, root) {
  const $ = (sel) => {
    if (typeof sel !== 'string') return gsap.utils.toArray(sel);
    const css = sel
      .trim()
      .split(/\s+/)
      .map((n) => `[data-g~="${n}"]`)
      .join(',');
    return gsap.utils.toArray(root.querySelectorAll(css));
  };

  const k = {
    tl,
    root,
    $,
    intro: null,

    /** Oculta de entrada (sin animación). */
    oculta(sel) {
      gsap.set($(sel), { autoAlpha: 0 });
      return k;
    },
    /** Fija el punto de giro/escala. */
    origen(sel, valor = '50% 50%') {
      gsap.set($(sel), { transformOrigin: valor });
      return k;
    },

    /** Aparece: parte oculto desde `desde` y llega a su estado natural. */
    entra(sel, t, desde = {}, o = {}) {
      const els = $(sel);
      if (!els.length) return k;
      const { dur = 0.4, stagger = 0, ease = 'power2.out', ...extra } = o;
      gsap.set(els, { autoAlpha: 0, ...desde });
      const hasta = { autoAlpha: 1 };
      for (const p in desde) if (p in REPOSO) hasta[p] = REPOSO[p];
      tl.to(els, { ...hasta, ...extra, duration: dur, stagger, ease }, t);
      return k;
    },

    /** Desaparece. */
    sale(sel, t, hacia = {}, o = {}) {
      const els = $(sel);
      if (!els.length) return k;
      tl.to(els, { autoAlpha: 0, ...hacia, duration: o.dur ?? 0.3, stagger: o.stagger ?? 0, ease: o.ease ?? 'power2.in' }, t);
      return k;
    },

    /** Vuelve a aparecer algo que ya había salido. */
    vuelve(sel, t, desde = {}, o = {}) {
      const els = $(sel);
      if (!els.length) return k;
      const { dur = 0.4, stagger = 0, ease = 'power2.out', ...extra } = o;
      tl.fromTo(
        els,
        { autoAlpha: 0, ...desde },
        { autoAlpha: 1, x: 0, y: 0, scale: 1, ...extra, duration: dur, stagger, ease, immediateRender: false },
        t,
      );
      return k;
    },

    /** Barrido tipo persiana: el elemento se descubre desde un lado. */
    barre(sel, t, lado = 'izq', o = {}) {
      const { desde = {}, ...resto } = o;
      return k.entra(sel, t, { clipPath: BARRIDO[lado], ...desde }, { dur: 0.45, ease: 'power2.inOut', ...resto });
    },

    /** Llamada (ui.llamadas): marca el punto, traza la guía y abre la caja. */
    llamada(g, t) {
      k.entra(`${g}-d`, t, { scale: 0, transformOrigin: '50% 50%' }, { dur: 0.12, ease: 'back.out(3)' });
      k.traza(`${g}-l`, t + 0.08, { dur: 0.2 });
      k.entra(`${g}-c`, t + 0.24, { scale: 0.6 }, { dur: 0.16, ease: 'back.out(2)' });
      return k;
    },

    /** Línea de tiempo que crece (por defecto de abajo hacia arriba). */
    crece(sel, t, origen = 'bottom', o = {}) {
      const els = $(sel);
      if (!els.length) return k;
      gsap.set(els, { scaleY: 0, transformOrigin: `50% ${origen === 'bottom' ? '100%' : '0%'}` });
      tl.to(els, { scaleY: 1, duration: o.dur ?? 0.35, ease: o.ease ?? 'power1.inOut' }, t);
      return k;
    },

    /** Hito completo de línea de tiempo: línea → punto → fecha → textos. */
    evento(g, t, o = {}) {
      k.crece(`${g}-l`, t, o.origen ?? 'bottom', { dur: 0.3 });
      k.entra(`${g}-p`, t + 0.24, { scale: 0 }, { dur: 0.16, ease: 'back.out(3)' });
      k.entra(`${g}-f`, t + 0.3, { x: -40, clipPath: BARRIDO.izq }, { dur: 0.28, ease: 'power3.out' });
      k.entra(`${g}-s ${g}-t`, t + 0.44, { y: 18 }, { dur: 0.26, stagger: 0.07 });
      return k;
    },
    saleEvento(g, t, y = -60) {
      return k.sale(`${g}-l ${g}-p ${g}-f ${g}-s ${g}-t`, t, { y }, { dur: 0.25 });
    },

    /** El texto se escribe letra por letra (máquina de escribir). */
    escribe(sel, t, dur = 0.3) {
      for (const el of $(sel)) {
        const sp = new SplitText(el, { type: 'words,chars', aria: 'auto' });
        gsap.set(sp.chars, { opacity: 0 });
        tl.to(sp.chars, { opacity: 1, duration: 0.01, ease: 'none', stagger: dur / Math.max(sp.chars.length, 1) }, t);
      }
      return k;
    },

    /** Caja numerada: salta el número, se despliega la caja y se escribe. */
    paso(sel, t) {
      for (const el of $(sel)) {
        const b = el.querySelector('b');
        const sp = el.querySelector('span');
        gsap.set(el, { autoAlpha: 0 });
        gsap.set(b, { scale: 0 });
        gsap.set(sp, { clipPath: BARRIDO.izq });
        tl.to(el, { autoAlpha: 1, duration: 0.01 }, t)
          .to(b, { scale: 1, duration: 0.16, ease: 'back.out(2.5)' }, t)
          .to(sp, { clipPath: REPOSO.clipPath, duration: 0.2, ease: 'power2.out' }, t + 0.1);
        k.escribe(sp, t + 0.18, 0.32);
      }
      return k;
    },

    /** Trazo SVG que se dibuja (línea, círculo, ruta). */
    traza(sel, t, o = {}) {
      const els = $(sel);
      if (!els.length) return k;
      gsap.set(els, { drawSVG: '0%', autoAlpha: 1 });
      tl.to(els, { drawSVG: '100%', duration: o.dur ?? 0.4, ease: o.ease ?? 'none', stagger: o.stagger ?? 0 }, t);
      return k;
    },

    /** Flecha generada con ui.flecha(): se traza y luego aparece la punta. */
    flecha(sel, t, dur = 0.35) {
      for (const el of $(sel)) {
        const trazo = el.querySelector('[data-trazo]');
        const punta = el.querySelector('[data-punta]');
        gsap.set(el, { autoAlpha: 1 });
        gsap.set(trazo, { drawSVG: '0%' });
        gsap.set(punta, { scale: 0, transformOrigin: '50% 50%' });
        tl.to(trazo, { drawSVG: '100%', duration: dur, ease: 'none' }, t).to(
          punta,
          { scale: 1, duration: 0.12, ease: 'back.out(2)' },
          t + dur - 0.04,
        );
      }
      return k;
    },

    /** Estallido: salta la estrella roja y tiembla lo que se indique. */
    estalla(sel, t, tiembla) {
      k.entra(sel, t, { scale: 0, rotation: -40 }, { dur: 0.22, ease: 'back.out(3)', stagger: 0.07 });
      if (tiembla) {
        tl.to(
          $(tiembla),
          { keyframes: { x: [0, -12, 10, -7, 5, -2, 0], y: [0, 6, -5, 4, -2, 1, 0] }, duration: 0.3, ease: 'none' },
          t + 0.04,
        );
      }
      return k;
    },

    /** Contador numérico. */
    cuenta(sel, t, hasta, o = {}) {
      const fmt = o.fmt ?? String;
      for (const el of $(sel)) {
        const obj = { v: 0 };
        el.textContent = fmt(0);
        tl.to(obj, { v: hasta, duration: o.dur ?? 0.5, ease: 'power1.out', onUpdate: () => (el.textContent = fmt(Math.round(obj.v))) }, t);
      }
      return k;
    },

    /**
     * Entrada del núcleo (no depende del scroll): el título hace un paneo
     * horizontal y aparece la bajada. Se dispara al llegar a la sección.
     */
    cabeza(extra) {
      const it = gsap.timeline({ paused: true });
      const ts = $('titulo');
      const spans = ts.map((e) => e.firstElementChild);
      gsap.set(ts, { clipPath: BARRIDO.izq });
      gsap.set(spans, { x: -160 });
      it.to(ts, { clipPath: REPOSO.clipPath, duration: 0.75, ease: 'power3.inOut', stagger: 0.14 }, 0).to(
        spans,
        { x: 0, duration: 1, ease: 'power3.out', stagger: 0.14 },
        0.08,
      );
      const bj = $('bajada');
      if (bj.length) it.fromTo(bj, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.5);
      if (extra) extra(it);
      k.intro = it;
      return k;
    },
  };
  return k;
}
