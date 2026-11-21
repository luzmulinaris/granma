// NÚCLEO 9 · La familia en Tequendama — p. 45 y 46 del PDF
import geo from '../data/geo.json';
import { foto, titulo, texto, svg, llamadas, ROJO } from '../lib/ui.js';

const pisos = llamadas(geo.llamadas.torre, 'p');
const escucha = llamadas([{
  text: 'La policía intervenía las llamadas de la familia',
  box: [545, 766],
  dot: [1250, 806],
  line: [[840, 784], [1000, 784], [1030, 806], [1250, 806]],
}], 'escucha');
// el zoom apunta a los pisos 28 y 29
const ORIGEN = 'transform-origin:1250px 520px';

export default {
  id: 'tequendama',
  nombre: 'La familia en Tequendama',
  pasos: 4.4,

  html: () => `
    <div class="abs" data-g="torre-g" style="left:0;top:0;width:1684px;height:1190px;${ORIGEN}">
      ${foto('torre', geo.fotos.torre.p45, 'Torre de las Residencias Tequendama, en Bogotá', 'torre', 'foto--libre')}
      ${svg(pisos.lineas)}
      ${texto('vers vers--rojo vers--60', 'piso 29', 1129, 433, null, 'p0-n')}
      ${texto('vers vers--rojo vers--60', 'piso 28', 1129, 535, null, 'p1-n')}
      ${pisos.cajas}
    </div>
    <div class="abs" data-g="interior-g" style="left:0;top:0;width:1684px;height:1190px;${ORIGEN}">
      ${foto('torre-interior', geo.fotos['torre-interior'].p46, 'Corte del edificio: la familia de Escobar en el piso 29 y la policía, con equipos de escucha, en el piso 28', 'interior', 'foto--libre')}
      ${svg(`
        <path data-g="senal-telefonica" d="M1301 614 H1350 V806 H1250"
          fill="none" stroke="${ROJO}" stroke-width="3" stroke-dasharray="7 6"/>
        ${escucha.lineas}
      `)}
      ${escucha.cajas}
    </div>

    <div class="cabeza" data-g="cabeza">
      ${titulo('La familia en Tequendama', 57, 240)}
      ${texto('bajada', 'La familia fue llevada por las autoridades colombianas a las Residencias Tequendama, un complejo de apartamentos propiedad del Ejército de Colombia en Bogotá, bajo custodia y protección policial/militar. La estrategia del gobierno: La presencia de la familia en ese lugar formaba parte de una estrategia del Estado para acorralar a Pablo Escobar, ya que su esposa e hijos eran su punto más vulnerable.', 63, 329, 609, 'bajada')}
    </div>
  `,

  build(k) {
    const { tl, $ } = k;
    // título + bajada; aparece el edificio
    k.cabeza();
    k.entra('torre', 0.25, { y: 900 }, { dur: 0.75, ease: 'power3.out' });

    // se marcan los pisos
    [0, 1].forEach((i) => {
      const t = 1.3 + i * 0.5;
      k.entra(`p${i}-n`, t, { x: 40, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.22 });
      k.llamada(`p${i}`, t + 0.12);
    });

    // zoom → p.46 · interior del edificio
    tl.to($('torre-g'), { scale: 2.4, duration: 0.6, ease: 'power2.in' }, 2.7);
    k.sale('torre-g', 3.0, {}, { dur: 0.3 });
    k.entra('interior-g', 3.0, { scale: 0.55 }, { dur: 0.6, ease: 'power2.out' });
    k.entra('senal-telefonica', 3.6, {}, { dur: 0.2 });
    k.llamada('escucha0', 3.68);
  },
};
