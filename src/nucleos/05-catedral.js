// NÚCLEO 5 · La catedral — p. 35 a 39 del PDF
import geo from '../data/geo.json';
import { foto, pieza, titulo, texto, caja, svg, llamadas, url, ROJO } from '../lib/ui.js';

const ruta = geo.ruta.map((p) => p.join(',')).join(' ');
const hab = llamadas(geo.llamadas.habitacion, 'h');
const habitacionPlano = llamadas([{
  text: 'Habitación de Pablo Escobar',
  box: [1110, 210],
  dot: [790, 278],
  line: [[1110, 228], [900, 228], [790, 278]],
}], 'habitacion-plano');
const CAT = geo.sprites.catedral; // [x, y, ancho, alto] del plano en la página

const RECLUSOS = [
  ['recluso-1', 'Roberto Escobar Gaviria', 'El osito'],
  ['recluso-2', 'John Jairo Velásquez', 'Popeye'],
  ['recluso-3', 'Luis Carlos Aguilar', 'El mugre'],
  ['recluso-4', 'Otoniel González', 'Otto'],
  ['recluso-5', 'Gustavo González', 'Tavo'],
];

const ANCHO_RETRATO = 232;
const ANCHO_NOMBRE = 254;
const SEPARACION_RECLUSOS = 30;
const anchoFila = RECLUSOS.length * ANCHO_NOMBRE + (RECLUSOS.length - 1) * SEPARACION_RECLUSOS;
const inicioFila = (1684 - anchoFila) / 2;

export default {
  id: 'catedral',
  nombre: 'La catedral',
  pasos: 13.4,

  html: () => `
    <!-- p.35 · mapa y camino -->
    <div class="abs" data-g="mapa-g" style="left:0;top:0;width:1684px;height:1190px;transform-origin:1044.6px 855.9px">
      ${foto('mapa-envigado', [719.7, 346.8, 777.4, 571.9], 'Mapa del sur del valle de Aburrá: de Envigado a La Catedral', 'mapa')}
      ${svg(`
        <polyline data-g="ruta" points="${ruta}" fill="none" stroke="#fff" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
        <polyline data-g="ruta" points="${ruta}" fill="none" stroke="#fe1003" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
        <line data-g="env" x1="959" y1="575.7" x2="1011" y2="575.7" stroke="#fe1003" stroke-width="1.5"/>
        <line data-g="cat" x1="1046" y1="852.7" x2="1111" y2="852.7" stroke="#fe1003" stroke-width="1.5"/>
      `)}
      ${pieza('brujula', [1363.1, 793.9, 107.7, 107.7], 'brujula')}
      <img class="abs" data-g="pin1" src="${url('img/pin.webp')}" alt="" style="left:1008.8px;top:546px;width:21.4px;transform-origin:50% 100%">
      <img class="abs" data-g="pin2" src="${url('img/pin.webp')}" alt="" style="left:1033.9px;top:821.2px;width:21.4px;transform-origin:50% 100%">
      ${caja('Envigado', 881, 558, null, 'env', 'caja--1')}
      ${caja('La catedral', 1111, 836, null, 'cat', 'caja--1')}
    </div>

    <!-- p.36 y 37 · plano de la catedral -->
    <div class="giro" data-g="plano-g" style="transform-origin:790px 300px">
      <img class="abs" data-g="plano" src="${url('img/catedral.webp')}" alt="Plano isométrico de La Catedral: tres pabellones, cancha de fútbol y cerco perimetral" style="left:${CAT[0]}px;top:${CAT[1]}px;width:${CAT[2]}px">
      <img class="abs" data-g="roja" src="${url('img/catedral-roja.webp')}" alt="" style="left:${CAT[0]}px;top:${CAT[1]}px;width:${CAT[2]}px">
      ${svg(habitacionPlano.lineas)}
      ${habitacionPlano.cajas}
    </div>

    <!-- p.38 · la habitación de Escobar -->
    <div class="abs" data-g="hab-g" style="left:0;top:0;width:1684px;height:1190px;transform-origin:668px 648px">
      ${foto('habitacion', geo.sprites.habitacion, 'Interior de la habitación de Escobar en La Catedral', 'hab', 'foto--libre')}
      ${svg(hab.lineas)}
      ${hab.cajas}
    </div>

    ${texto('titulo titulo--rojo titulo--40', '<span>Los lujos de su prisión</span>', 62, 220, null, 'lujos')}

    <!-- p.39 · otros reclusos -->
    ${texto('titulo titulo--rojo titulo--40', '<span>Otros reclusos</span>', 62, 317, null, 'otros')}
    ${RECLUSOS.map(
      ([img, nombre, alias], i) => {
        const xNombre = inicioFila + i * (ANCHO_NOMBRE + SEPARACION_RECLUSOS);
        const xRetrato = xNombre + (ANCHO_NOMBRE - ANCHO_RETRATO) / 2;
        return `
      <div class="retrato" data-g="r${i}" style="left:${xRetrato}px;top:456px;width:${ANCHO_RETRATO}px;height:240px">
        <img src="${url(`img/${img}.webp`)}" alt="${nombre}, alias «${alias}»" loading="lazy" decoding="async">
      </div>
      ${caja(`${nombre}<br>Alias "${alias}"`, xNombre, 698, ANCHO_NOMBRE, `r${i}-c`, 'caja--20 caja--recluso')}`;
      },
    ).join('')}

    <div class="cabeza" data-g="cabeza">${titulo('La catedral', 57, 240)}</div>
    <div class="cabeza" data-g="cab2">
      ${texto('bajada justo', 'La Catedral fue una prisión de máxima seguridad construida y diseñada por Pablo Escobar en una montaña de Envigado, Antioquia (Colombia), como parte de un acuerdo de entrega con el gobierno del presidente César Gaviria en 1991.', 63, 334, 496, 'bajada')}
    </div>
  `,

  build(k) {
    const { tl, $ } = k;
    const cae = { y: -90, scale: 0.3 };

    // p.35 · título + bajada; se forma el mapa y se va marcando el camino
    k.cabeza();
    k.barre('mapa', 0.2, 'izq', { dur: 0.6 });
    k.entra('brujula', 0.6, { scale: 0, rotation: -200 }, { dur: 0.4, ease: 'back.out(1.6)' });
    k.entra('pin1', 0.95, cae, { dur: 0.25, ease: 'bounce.out' });
    k.entra('env', 1.15, { x: 16 }, { dur: 0.18 });
    k.traza('ruta', 1.45, { dur: 1.3 });
    k.entra('pin2', 2.75, cae, { dur: 0.25, ease: 'bounce.out' });
    k.entra('cat', 2.95, { x: -16 }, { dur: 0.18 });

    // zoom sobre La Catedral para pasar a la página siguiente
    tl.to($('mapa-g'), { scale: 10, duration: 0.75, ease: 'power2.in' }, 3.6);
    k.sale('cabeza cab2', 3.6, {}, { dur: 0.3 });
    k.sale('mapa-g', 4.05, {}, { dur: 0.3 });

    // p.36 · aparece el plano de la catedral tipo 360°
    k.entra('plano', 4.2, { rotationY: -200, scale: 0.35, transformOrigin: '50% 55%' }, { dur: 0.95, ease: 'power2.out' });

    // p.37 · se marca en rojo la habitación de Escobar
    k.entra('roja', 5.7, {}, { dur: 0.3, ease: 'power1.inOut' });
    k.llamada('habitacion-plano0', 5.7);
    k.sale('habitacion-plano0-d habitacion-plano0-l habitacion-plano0-c', 6.5, {}, { dur: 0.2 });

    // zoom al interior → p.38
    tl.to($('plano-g'), { scale: 4.2, duration: 0.7, ease: 'power2.in' }, 6.5);
    k.sale('plano-g', 6.9, {}, { dur: 0.3 });
    k.entra('hab-g', 6.95, { scale: 1.9 }, { dur: 0.6, ease: 'power2.out' });
    k.barre('lujos', 7.4, 'izq', { dur: 0.35, desde: { x: -60 }, ease: 'power3.out' });
    // se van marcando de a una las características
    geo.llamadas.habitacion.forEach((_, i) => k.llamada(`h${i}`, 7.75 + i * 0.5));

    // p.39 · otros reclusos, de a uno
    k.sale('hab-g', 10.5, { scale: 0.92 }, { dur: 0.3 });
    k.sale('lujos', 10.5, {}, { dur: 0.3 });
    k.vuelve('cabeza', 10.65, {}, { dur: 0.25 });
    k.entra('otros', 10.75, { x: -60, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.35, ease: 'power3.out' });
    RECLUSOS.forEach((_, i) => {
      const t = 11.15 + i * 0.4;
      k.entra(`r${i}`, t, { scale: 0, rotation: -25 }, { dur: 0.28, ease: 'back.out(1.8)' });
      k.entra(`r${i}-c`, t + 0.18, { y: -20, clipPath: 'inset(0% 0% 100% 0%)' }, { dur: 0.18 });
    });
  },
};
