// NÚCLEO 8 · Formación del bloque de búsqueda — p. 42 a 44 del PDF
import geo from '../data/geo.json';
import { foto, titulo, texto, url } from '../lib/ui.js';

const F = geo.fotos;
const afiche = (n, alt) => foto(`sebusca-${n}`, F[`sebusca-${n}`].p43, alt, `af af${n}`, n > 3 ? 'z6' : '');

// Orden de apilado igual al del PDF; el orden de aparición va del 1 al 8.
const AFICHES = [
  [3, 'Volante «La Policía Nacional los busca»'],
  [2, 'Afiche «Se busca: Pablo Emilio Escobar Gaviria»'],
  [1, 'Afiche «Se busca» con recompensas en dólares'],
  [6, 'Afiche «Se busca» con recompensa de mil millones de pesos'],
  [4, 'Afiche «Se busca» con recompensa de 2.700 millones de pesos'],
  [8, 'Afiche «Se buscan»: Pablo y Roberto Escobar Gaviria'],
  [5, 'Afiche «Se busca» con recompensa de cinco mil millones de pesos'],
  [7, 'Pantalla de televisión: «Se buscan. Recompensa $100.000.000»'],
];
const GIROS = [0, -7, 5, -4, 6, -5, 4, -6, 3];

const TRAS = [
  ['tras-1', 'bloque de búsqueda', 'Recapturarlo y enfrentar su organización criminal', 429],
  ['tras-2', 'agentes de la dea', 'Desmantelar la red de cocaína que llegaba a <span class="vers" style="font-size:23.562px">ee.uu</span>', 558],
  ['tras-3', 'los pepes', 'Represalias, supervivencia y disputa del poder criminal', 687],
  ['tras-4', 'cartel de cali', 'Debilitar a su rival y proteger sus intereses en el narcotráfico', 816],
];

export default {
  id: 'bloque',
  nombre: 'Formación del bloque de búsqueda',
  pasos: 8.2,

  html: () => `
    ${AFICHES.map(([n, alt]) => afiche(n, alt)).join('')}

    <div class="cabeza" data-g="cabeza">
      ${titulo('Formación del bloque de búsqueda', 57, 240)}
      ${texto('bajada', 'Creado en 1992 por el gobierno de César Gaviria, con el propósito específico de capturar vivo o muerto al narcotraficante y capo del Cartel de Medellín Pablo Escobar.', 63, 329, 710, 'bajada')}
    </div>

    <!-- p.44 · quiénes iban detrás de Escobar -->
    ${texto('titulo titulo--rojo titulo--40', '<span>Quiénes iban detrás de Escobar</span>', 62, 204, null, 'quienes')}
    ${TRAS.map(
      ([img, nombre, objetivo, y], i) => `
      <div class="retrato retrato--sin-borde" data-g="t${i}" style="left:238px;top:${y - 58}px;width:112px;height:114px">
        <img src="${url(`img/${img}.webp`)}" alt="" loading="lazy" decoding="async">
      </div>
      ${texto('vers vers--rojo', nombre, 369, y - 18, null, `t${i}`)}
      <div class="abs flecha-h" data-g="fl${i}" style="left:624.8px;top:${y - 26.1}px;width:285.7px;height:52.2px"><i></i></div>
      ${texto('objetivo', objetivo, 936, y - 15, null, `ob${i}`)}`,
    ).join('')}
  `,

  build(k) {
    const { tl, $ } = k;
    k.cabeza();

    // p.42 y 43 · los afiches aparecen de a uno hasta cubrir toda la pantalla
    for (let n = 1; n <= 8; n++) {
      const t = n <= 3 ? 0.35 + (n - 1) * 0.5 : 2.1 + (n - 4) * 0.5;
      // desde el cuarto afiche se tapa toda la pantalla: el título se va
      if (n === 4) k.sale('cabeza', t, {}, { dur: 0.25 });
      k.entra(`af${n}`, t, { scale: 1.5, rotation: GIROS[n], y: -60 }, { dur: 0.3, ease: 'power3.in' });
      // golpe seco al "pegarse"
      tl.to($(`af${n}`), { keyframes: { scale: [1, 0.97, 1] }, duration: 0.12, ease: 'none' }, t + 0.3);
    }

    // p.44 · quiénes iban detrás: texto e imágenes, después las flechas
    k.sale('af', 5.0, { y: -180, rotation: () => azar(-10, 10) }, { dur: 0.35, stagger: 0.03 });
    k.entra('quienes', 5.35, { x: -60, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.35, ease: 'power3.out' });
    TRAS.forEach((_, i) => k.entra(`t${i}`, 5.6 + i * 0.22, { x: -40 }, { dur: 0.22, stagger: 0.06 }));
    TRAS.forEach((_, i) => {
      const t = 6.7 + i * 0.25;
      const flecha = $(`fl${i}`)[0].firstElementChild;
      tl.fromTo(flecha, { xPercent: -101 }, { xPercent: 0, duration: 0.25, ease: 'power2.out' }, t);
      k.entra(`ob${i}`, t + 0.18, { x: -24 }, { dur: 0.2 });
    });
  },
};

const azar = (a, b) => a + Math.random() * (b - a);
