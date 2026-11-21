// NÚCLEO 6 · El acuerdo se rompe — p. 40 del PDF
import { titulo, texto, evento } from '../lib/ui.js';

export default {
  id: 'acuerdo',
  nombre: 'El acuerdo se rompe',
  pasos: 2.6,

  html: () => `
    ${evento({
      g: 'e1', y: 385, desde: 312, fecha: 'julio de 1992', yFecha: 340,
      sub: 'Socios asesinados', ySub: 406,
      ps: ['Fernando Galeano y Gerardo «Kiko» Moncada son asesinados dentro de La Catedral, en el contexto de disputas con Escobar.'],
      yTxt: 436,
    })}
    ${evento({
      g: 'e2', y: 628, desde: 385, sub: 'Intervenir y trasladar', ySub: 622,
      ps: ['El gobierno ordena retomar el control y trasladar a Escobar. Eduardo Mendoza, viceministro de Justicia, y Hernando Navas Rubio, director de Prisiones, ingresan y son retenidos por los reclusos.'],
      yTxt: 652,
    })}
    <div class="cabeza" data-g="cabeza">
      ${titulo('El acuerdo se rompe', 57, 240)}
      ${texto('bajada', 'Los delitos cometidos dentro del establecimiento fuerzan una intervención. El intento de recuperar el control termina con la fuga y reactiva la búsqueda.', 63, 329, 690, 'bajada')}
    </div>
  `,

  build(k) {
    // título en paneo + bajada; línea de abajo hacia arriba, 1992 y los textos
    k.cabeza();
    k.evento('e1', 0.25);
    k.evento('e2', 1.2, { origen: 'top' });
  },
};
