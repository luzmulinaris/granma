// NÚCLEO 9 · La familia en el hotel Tequendama — p. 55 y 56 del PDF
import { foto, titulo, texto, svg, llamadas } from '../lib/ui.js';

const pisos = llamadas([
  {
    text: 'Familia de Escobar',
    box: [762, 677],
    dot: [1088, 631],
    line: [[900, 677], [939, 631], [1088, 631]],
  },
  {
    text: 'Policía de Colombia',
    box: [748, 830],
    dot: [1074, 803],
    line: [[905, 830], [925, 803], [1074, 803]],
  },
], 'p');
const escucha = llamadas([{
  text: 'La policía intervino<br>sus líneas telefónicas',
  box: [718, 936],
  dot: [1114, 923],
  line: [[883, 936], [896, 923], [1114, 923]],
}], 'escucha');
// el zoom apunta a los pisos 28 y 29
const ORIGEN = 'transform-origin:1200px 690px';

export default {
  id: 'tequendama',
  nombre: "La familia en el hotel Tequendama",
  pasos: 4.4,

  html: () => `
    <div class="abs" data-g="hotel-zoom" style="inset:0;${ORIGEN}">
      <div class="abs" data-g="torre-g" style="inset:0">
        ${foto('torre-v02', [924.9, 152.7, 760, 1038.8], 'Torre de las Residencias Tequendama, en Bogotá', 'torre', 'foto--libre')}
        ${svg(pisos.lineas)}
        ${texto('vers vers--rojo tequendama-piso', 'piso 29', 1131, 595, null, 'p0-n')}
        ${texto('vers vers--rojo tequendama-piso', 'piso 28', 1123, 763, null, 'p1-n')}
        ${pisos.cajas}
      </div>
      <div class="abs" data-g="interior-g" style="inset:0">
        ${foto('torre-interior-v02', [920, 137, 828, 1125], 'Corte del edificio: la familia de Escobar en el piso 29 y la policía, con equipos de escucha, en el piso 28', 'interior', 'foto--libre')}
        ${svg(escucha.lineas)}
        ${escucha.cajas}
      </div>
    </div>

    <div class="cabeza" data-g="cabeza">
      ${texto('tema-editorial', "Primeras pistas", 104, 185, null, 'tema')}
      ${titulo("La familia en el", 104, 242, 'titulo--editorial')}
      ${titulo("hotel Tequendama", 104, 326, 'titulo--editorial')}
      ${texto('bajada texto-editorial', "La familia quiso escapar a Alemania, pero su entrada fue prohibida. De regreso en Colombia fue llevada por las autoridades colombianas a las Residencias Tequendama, un complejo de apartamentos propiedad del Ejército de Colombia en Bogotá, que tenía custodia y protección policial/militar.", 112, 417, 595, 'bajada')}
      ${texto('bajada texto-editorial', "La estrategia del gobierno: La presencia de la familia en ese lugar formaba parte de una estrategia del Estado para acorralar a Pablo Escobar, ya que su esposa e hijos eran su punto más vulnerable.", 113, 576, 595, 'bajada')}
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

    // Las dos vistas comparten el mismo movimiento de cámara.
    tl.to($('hotel-zoom'), { x: -285, y: -30, scale: 1.38, duration: 1.23, ease: 'sine.inOut' }, 2.6);
    k.sale('cabeza', 2.86, {}, { dur: 0.42, ease: 'sine.inOut' });
    k.entra('interior-g', 2.95, {}, { dur: 0.62, ease: 'sine.inOut' });
    k.sale('torre-g', 3.37, {}, { dur: 0.20, ease: 'sine.inOut' });
    k.llamada('escucha0', 3.58);
  },
};
