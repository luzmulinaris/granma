// NÚCLEO 7 · La fuga — p. 41 del PDF
import geo from '../data/geo.json';
import { titulo, texto, caja, svg, url, ROJO } from '../lib/ui.js';

const P = geo.sprites['catedral-p41'];
const DESPLAZAMIENTO_X = 52;
const DESPLAZAMIENTO_Y = 126;
const centroCirculoX = 650.5 + DESPLAZAMIENTO_X;

export default {
  id: 'fuga',
  nombre: 'La fuga',
  pasos: 2.8,

  html: () => `
    <img class="abs" data-g="plano" src="${url('img/catedral.webp')}" alt="Plano de La Catedral con el punto del cerco por donde escapó Escobar" style="left:${P[0] + DESPLAZAMIENTO_X}px;top:${P[1] + DESPLAZAMIENTO_Y}px;width:${P[2]}px" loading="lazy" decoding="async">
    ${svg(`
      <circle data-g="circulo" cx="${centroCirculoX}" cy="${471.5 + DESPLAZAMIENTO_Y}" r="41.5" fill="none" stroke="${ROJO}" stroke-width="5" transform="rotate(180 ${centroCirculoX} ${471.5 + DESPLAZAMIENTO_Y})"/>
      <line data-g="guia" x1="${609 + DESPLAZAMIENTO_X}" y1="${468 + DESPLAZAMIENTO_Y}" x2="${521 + DESPLAZAMIENTO_X}" y2="${468 + DESPLAZAMIENTO_Y}" stroke="${ROJO}" stroke-width="5"/>
    `)}
    ${caja('<span data-g="escrito">Escobar, su hermano y 9 cómplices patearon un muro de yeso y escaparon</span>', 310 + DESPLAZAMIENTO_X, 432 + DESPLAZAMIENTO_Y, 211, 'nota')}
    <div class="cabeza" data-g="cabeza">
      ${texto('tema-editorial', "De vuelta a la clandestinidad", 104, 185, null, 'tema')}
      ${titulo("La fuga", 104, 242, 'titulo--editorial')}
      ${texto('bajada texto-editorial', "Entre la noche del 21 y la madrugada del 22 de julio de 1992, Pablo Escobar escapó de La Catedral junto con varios de sus hombres, mientras las autoridades intentaban concretar su traslado.", 105, 326, 595, 'bajada')}
      ${texto('bajada texto-editorial', "La vigilancia del penal no logró impedir la salida y el operativo terminó sin su captura. La fuga puso fin a trece meses de reclusión y lo devolvió a la clandestinidad: desde entonces, tendría que ocultarse mientras el Estado reorganizaba su búsqueda", 105, 432, 595, 'bajada')}
    </div>
  `,

  build(k) {
    // título + bajada; aparece el plano
    k.cabeza();
    k.entra('plano', 0.25, { y: 120, scale: 0.9 }, { dur: 0.6, ease: 'power3.out' });
    // se genera el círculo que marca y aparece el cuadro de texto
    k.traza('circulo', 1.2, { dur: 0.35, ease: 'power1.inOut' });
    k.traza('guia', 1.55, { dur: 0.15 });
    k.entra('nota', 1.68, { x: 30, clipPath: 'inset(0% 0% 0% 100%)' }, { dur: 0.2 });
    k.escribe('escrito', 1.8, 0.4);
  },
};
