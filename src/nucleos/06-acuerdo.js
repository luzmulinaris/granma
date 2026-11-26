// NÚCLEO 6 · El acuerdo se rompe — p. 40 del PDF
import { titulo, texto, evento } from '../lib/ui.js';

export default {
  id: 'acuerdo',
  nombre: "Las condiciones no se cumplen",
  pasos: 2.6,

  html: () => `
    ${evento({
      g: 'e1', x: 851, y: 415, desde: 140, fecha: 'Julio de 1992', yFecha: 384,
      sub: 'Asesinatos dentro de la prisión', ySub: 442,
      ps: ['Fernando Galeano y Gerardo «Kiko» Moncada son asesinados dentro de La Catedral.'],
    })}
    ${evento({
      g: 'e2', x: 851, y: 582, desde: 415, sub: 'Intervenir y trasladar', ySub: 574,
      ps: ['El gobierno ordena retomar el control y trasladar a Escobar. Eduardo Mendoza, viceministro de Justicia, y Hernando Navas Rubio, director de Prisiones, ingresan y son retenidos por los reclusos.'],
    })}
    <div class="cabeza" data-g="cabeza">
      ${texto('tema-editorial', "La reclusión", 104, 185, null, 'tema')}
      ${titulo("Las condiciones", 104, 242, 'titulo--editorial')}
      ${titulo("no se cumplen", 104, 326, 'titulo--editorial')}
      ${texto('bajada texto-editorial', "El asesinato de sus socios dentro de La Catedral evidenció que Escobar seguía ejerciendo su poder criminal desde la prisión. Ante la gravedad de los hechos, el gobierno de César Gaviria decidió intervenir el establecimiento y trasladarlo para poner fin a esas condiciones de reclusión.", 105, 414, 595, 'bajada')}
      ${texto('bajada texto-editorial', "El operativo se desarrolló entre el 21 y el 22 de julio. Escobar se resistió al traslado y tomó como rehenes a dos funcionarios que habían ingresado al penal. En medio de la crisis, escapó junto con varios de sus hombres. Después de trece meses de reclusión, volvía a la clandestinidad y comenzaba una nueva etapa de persecución.", 104, 572, 595, 'bajada')}
    </div>
  `,

  build(k) {
    // título en paneo + bajada; línea de abajo hacia arriba, 1992 y los textos
    k.cabeza();
    k.evento('e1', 0.25, { origen: 'top' });
    k.evento('e2', 1.2, { origen: 'top' });
  },
};
