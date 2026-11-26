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
  box: [718, 898],
  dot: [1046, 882],
  line: [[883, 898], [896, 882], [1046, 882]],
}], 'escucha');
// el zoom apunta a los pisos 28 y 29
const ORIGEN = 'transform-origin:1250px 520px';

export default {
  id: 'tequendama',
  nombre: "La familia en el hotel Tequendama",
  pasos: 4.4,

  html: () => `
    <div class="abs" data-g="torre-g" style="left:0;top:0;width:1684px;height:1190px;${ORIGEN}">
      ${foto('torre-v02', [924.9, 152.7, 760, 1038.8], 'Torre de las Residencias Tequendama, en Bogotá', 'torre', 'foto--libre')}
      ${svg(pisos.lineas)}
      ${texto('vers vers--rojo tequendama-piso', 'piso 29', 1131, 595, null, 'p0-n')}
      ${texto('vers vers--rojo tequendama-piso', 'piso 28', 1123, 763, null, 'p1-n')}
      ${pisos.cajas}
    </div>
    <div class="abs" data-g="interior-g" style="left:0;top:0;width:1684px;height:1190px;${ORIGEN}">
      ${foto('torre-interior-v02', [869.1, 158.2, 760.8, 1033.4], 'Corte del edificio: la familia de Escobar en el piso 29 y la policía, con equipos de escucha, en el piso 28', 'interior', 'foto--libre')}
      ${svg(escucha.lineas)}
      ${escucha.cajas}
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

    // zoom → p.56 · interior del edificio
    tl.to($('torre-g'), { scale: 2.4, duration: 0.6, ease: 'power2.in' }, 2.7);
    k.sale('torre-g', 3.0, {}, { dur: 0.3 });
    k.entra('interior-g', 3.0, { scale: 0.55 }, { dur: 0.6, ease: 'power2.out' });
    k.llamada('escucha0', 3.68);
  },
};
