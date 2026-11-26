// NÚCLEO 13 · Balance de búsqueda — p. 54 del PDF
import { titulo, texto, svg, miles } from '../lib/ui.js';

const EJE = [787, 926, 1061, 1195, 1329, 1458];
const BARRAS = [
  ['muertos en operativos', 209, 497, 564, 59],
  ['capturados', 52, 608, 146, 60],
  ['sometidos a la justicia', 29, 706, 83, 60],
];

export default {
  id: 'balance',
  nombre: "El fin de meses de búsqueda",
  pasos: 2.4,

  html: () => `
    <div class="cabeza" data-g="cabeza">
      ${texto('tema-editorial', "El fin de la búsqueda", 104, 185, null, 'tema')}
      ${titulo("El fin de meses", 104, 235)}
      ${titulo("de búsqueda", 104, 314)}
    </div>
    ${texto('num-grande', '15.000', 129, 561, null, 'n15')}
    ${texto('vers', 'allanamientos realizados<br>para lograr capturarlo', 129, 655, null, 'cap')}
    ${svg(EJE.map((x) => `<line data-g="eje" x1="${x}" y1="497" x2="${x}" y2="794" stroke="#dcdcd8" stroke-width="1.2"/>`).join(''))}
    ${EJE.map((x, i) => texto('eje', i * 50, x, 790, null, 'eje')).join('')}
    ${BARRAS.map(
      ([rotulo, valor, y, ancho, alto], i) => `
      ${texto('vers vers--der', rotulo, 375, y + 19, 400, `rot${i}`)}
      <div class="barra" data-g="b${i}" style="left:787px;top:${y}px;width:${ancho}px;height:${alto}px;background:#d91403"><b data-g="v${i}">${valor}</b></div>`,
    ).join('')}
  `,

  build(k) {
    k.cabeza();
    // aparecen los gráficos y se van formando las barras
    k.entra('n15', 0.3, { y: 30 }, { dur: 0.25 });
    k.cuenta('n15', 0.3, 15000, { dur: 0.6, fmt: miles });
    k.entra('cap', 0.55, { y: 16 }, { dur: 0.2 });
    k.entra('eje', 0.6, {}, { dur: 0.2, stagger: 0.015 });
    BARRAS.forEach(([, valor, , ancho], i) => {
      const t = 0.85 + i * 0.3;
      const dur = 0.2 + (ancho / 564) * 0.4;
      k.entra(`rot${i}`, t - 0.05, { x: -20 }, { dur: 0.2 });
      k.barre(`b${i}`, t, 'izq', { dur, ease: 'power2.out' });
      k.cuenta(`v${i}`, t, valor, { dur });
    });
  },
};
