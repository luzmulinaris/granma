// NÚCLEO 11 · La última señal — p. 49 a 51 del PDF
import geo from '../data/geo.json';
import { titulo, texto, svg, llamadas, url } from '../lib/ui.js';
import { plano } from '../lib/plano.js';

const CITA = [
  '"A la 1:35 cometió el error que todos estábamos',
  'esperando. Su conversación telefónica duró cerca',
  'de cuatro minutos y por primera vez en los 7 meses',
  'de persecución violó su seguridad personal, ese',
  'tiempo nos permitió ubicar con exactitud el sitio',
  'donde se encontraba"',
];

// Recorte (en % de la ilustración) de cada pieza del receptor, de arriba
// hacia abajo, y la llamada de texto que le corresponde.
const PIEZAS = [
  ['Antena receptora', [[5, 0], [58, 0], [58, 6], [46, 7.5], [44, 13], [5, 16]]],
  ['Soporte de antena', [[45.5, 7.8], [57, 7.8], [57, 16.3], [45.5, 16.3]]],
  ['Cable coaxial', [[60.2, 8], [84, 8], [84, 16.8], [60.2, 16.8]]],
  ['Cubierta superior', [[18, 17], [57.3, 17], [57.3, 15], [60.2, 15], [60.2, 17], [71, 17], [71, 28.7], [33, 33.3], [18, 33.3]]],
  ['Indicador de dirección', [[13, 33.4], [32.1, 33.4], [32.1, 45], [13, 45]]],
  ['Panel frontal', [[32.2, 33.4], [33, 33.3], [70, 28.9], [70, 39.9], [51.5, 42.6], [44, 44.3], [32.2, 44.6]]],
  ['Perilla de control', [[70.2, 34], [79, 34], [79, 40.5], [70.2, 40.5]]],
  ['Botonera', [[51.5, 42.7], [70.3, 40], [70.3, 45.5], [54, 47.6], [51.5, 47]]],
  ['Placa de control', [[24, 44.6], [51.4, 44.6], [51.4, 47.2], [52.8, 48], [52.8, 50.2], [40, 52.8], [24, 53.2]]],
  ['Blindaje metálico', [[52.9, 50.3], [52.9, 48], [66, 48], [71.2, 50.5], [71.2, 53.8], [58, 56.6], [52.3, 54.6]]],
  ['Módulo receptor', [[23, 53.4], [40, 53], [52.2, 54.8], [58, 56.8], [69, 54.5], [69, 61.3], [33, 65.3], [23, 62]]],
  ['Placa de procesamiento', [[25, 65.6], [33, 65.4], [69, 61.4], [69, 68], [46, 71.6], [33.5, 72.3], [25, 69.5]]],
  ['Fuente de alimentación', [[44.3, 72.6], [46, 71.7], [69.2, 68.2], [72.5, 71], [72.5, 77.3], [52, 80.2], [44.3, 77.5]]],
  ['Conectores posteriores', [[8, 70.5], [28, 70.5], [28, 77.4], [16, 80], [8, 80]]],
  ['Chasis inferior', [[16, 80.1], [28, 77.5], [44.3, 77.6], [52, 80.3], [72.6, 77.4], [76, 79], [76, 100], [16, 100]]],
];

const R = geo.fotos.radio.p51;
const DESPLAZAMIENTO_RADIO_X = 28;
const radio = llamadas(geo.llamadas.radio.map((llamada) => ({
  ...llamada,
  box: [llamada.box[0] + DESPLAZAMIENTO_RADIO_X, ...llamada.box.slice(1)],
  dot: [llamada.dot[0] + DESPLAZAMIENTO_RADIO_X, llamada.dot[1]],
  line: llamada.line.map(([x, y]) => [x + DESPLAZAMIENTO_RADIO_X, y]),
})), 'c');
const indiceLlamada = (nombre) => geo.llamadas.radio.findIndex((c) => c.text === nombre);

export default {
  id: 'senal',
  nombre: 'La última señal',
  pasos: 10.2,

  html: () => `
    <!-- p.49 -->
    <div class="cabeza" data-g="cabeza">
      ${titulo('La última señal', 57, 240)}
      ${texto('bajada', 'Tal como lo esperaban, Escobar se comunicó nuevamente con su familia el 2 de diciembre, manteniendo una llamada de más de dos minutos, facilitando la localización de su ubicación.', 63, 329, 705, 'bajada')}
    </div>
    <blockquote class="abs cita cita--recta" data-g="cita-g" style="left:64px;top:430px;margin:0">
      ${CITA.map((l, i) => `<div data-g="cita" ${i === 0 ? 'style="margin-left:-12px"' : ''}>${l}</div>`).join('')}
    </blockquote>

    <!-- p.50 -->
    ${texto('titulo titulo--rojo', '<span>Ubicación exacta</span>', 107, 248, null, 'exacta')}
    <div data-g="plano">${plano()}</div>

    <!-- p.51 -->
    ${texto('titulo titulo--rojo titulo--40', '<span>La clave: el equipo de radiolocalización</span>', 61, 194, null, 'clave')}
    ${texto('bajada', 'Gracias a la llamada de más de 2 minutos, pudieron descubir exactamente en donde se encontraba Escobar con su equipo de radiolocalización.', 63, 245, 610, 'clave-b')}
    <div class="despiece" data-g="despiece" role="img" aria-label="Receptor radiogoniométrico en vista explotada" style="left:${R[0] + DESPLAZAMIENTO_RADIO_X}px;top:${R[1]}px;width:${R[2]}px;height:${R[3]}px">
      ${PIEZAS.map(
        ([, pol], i) =>
          `<i data-g="pz${i}" style="background-image:url(${url('img/radio.webp')});clip-path:polygon(${pol.map((p) => `${p[0]}% ${p[1]}%`).join(',')})"></i>`,
      ).join('')}
    </div>
    ${svg(radio.lineas)}
    ${radio.cajas}
  `,

  build(k) {
    const { tl, $ } = k;

    // p.49 · título + bajada; aparece el texto rojo entre comillas
    k.cabeza();
    k.entra('cita', 0.35, { x: -50, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.3, stagger: 0.14, ease: 'power3.out' });

    // p.50 · ubicación exacta: de los 12 puntos queda uno solo
    k.sale('cabeza cita-g', 1.8, { y: -30 }, { dur: 0.25 });
    k.entra('exacta', 2.0, { x: -60, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.35, ease: 'power3.out' });
    k.entra('plano', 2.05, { y: 40 }, { dur: 0.35 });
    k.origen('resto exacto onda');
    tl.to($('resto'), { scale: 0, duration: 0.18, stagger: 0.06, ease: 'back.in(2)' }, 2.75);
    tl.to($('exacto'), { keyframes: { scale: [1, 1.9, 1] }, duration: 0.3, ease: 'power1.inOut' }, 3.45);
    tl.fromTo(
      $('onda'),
      { autoAlpha: 0, scale: 1 },
      { keyframes: { autoAlpha: [0, 0.9, 0], scale: [1, 5, 9] }, duration: 0.6, stagger: 0.22, ease: 'none', immediateRender: true },
      3.5,
    );

    // p.51 · el despiece de la radio se va formando, pieza por pieza
    k.sale('exacta plano', 4.6, { y: -30 }, { dur: 0.25 });
    k.entra('clave', 4.8, { x: -60, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.35, ease: 'power3.out' });
    k.entra('clave-b', 5.0, { y: 16 }, { dur: 0.25 });
    PIEZAS.forEach(([nombre], i) => {
      const t = 5.3 + i * 0.3;
      k.entra(`pz${i}`, t, { y: -70, x: i % 2 ? 40 : -40, scale: 1.12 }, { dur: 0.3, ease: 'power3.out' });
      const c = indiceLlamada(nombre);
      if (c >= 0) k.llamada(`c${c}`, t + 0.16);
    });
  },
};
