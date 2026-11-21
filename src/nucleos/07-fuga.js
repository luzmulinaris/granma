// NÚCLEO 7 · La fuga — p. 41 del PDF
import geo from '../data/geo.json';
import { titulo, texto, caja, svg, url, ROJO } from '../lib/ui.js';

const P = geo.sprites['catedral-p41'];

export default {
  id: 'fuga',
  nombre: 'La fuga',
  pasos: 2.8,

  html: () => `
    <img class="abs" data-g="plano" src="${url('img/catedral.webp')}" alt="Plano de La Catedral con el punto del cerco por donde escapó Escobar" style="left:${P[0]}px;top:${P[1]}px;width:${P[2]}px" loading="lazy" decoding="async">
    ${svg(`
      <circle data-g="circulo" cx="650.5" cy="471.5" r="41.5" fill="none" stroke="${ROJO}" stroke-width="5" transform="rotate(180 650.5 471.5)"/>
      <line data-g="guia" x1="609" y1="468" x2="521" y2="468" stroke="${ROJO}" stroke-width="5"/>
    `)}
    ${caja('<span data-g="escrito">Escobar, su hermano y 9 cómplices patearon un muro de yeso y escaparon</span>', 310, 432, 211, 'nota')}
    <div class="cabeza" data-g="cabeza">
      ${titulo('La fuga', 57, 240)}
      ${texto('bajada', 'Escobar escapa durante la noche del 21 a la madrugada del 22 de julio de 1992.', 63, 329, null, 'bajada')}
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
