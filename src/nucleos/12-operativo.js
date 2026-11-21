// NÚCLEO 12 · El operativo
import { foto, titulo, texto } from '../lib/ui.js';

const VERSIONES = [
  'Las autoridades atribuyeron la muerte al operativo del Bloque de Búsqueda. Hugo Aguilar afirmó haber disparado contra Escobar.',
  'Un integrante de Los Pepes atribuyó el disparo fatal a un allegado suyo.',
  'El hijo de Escobar sostuvo que su padre se quitó la vida para evitar la captura.',
];

export default {
  id: 'operativo',
  nombre: 'El operativo',
  pasos: 4.4,

  html: () => `
    <div class="cabeza" data-g="cabeza">
      ${titulo('El operativo', 63, 169)}
      ${texto('bajada justo', 'Con la ubicación exacta, comienza el operativo de búsqueda, que culmina con la muerte de Pablo Escobar en un tejado del barrio Los Olivos, en Medellín. Desde entonces, distintos testimonios se han disputado la autoría del disparo que culminó con su vida.', 64, 260, 640, 'bajada')}
    </div>
    ${foto('operativo', [42, 436, 656, 465], 'Integrantes del Bloque de Búsqueda posan en el tejado junto al cuerpo de Pablo Escobar', 'foto')}
    <h3 class="titulo titulo--rojo titulo--40" id="operativo-versiones" data-g="tres" style="left:798px;top:354px">
      <span>Tres versiones sobre su muerte</span>
    </h3>
    <ol class="abs operativo-versiones" aria-labelledby="operativo-versiones" role="list">
      ${VERSIONES.map((version, i) => `
        <li data-g="v${i + 1}">
          <span class="operativo-versiones__numero">0${i + 1}</span>
          <p>${version}</p>
        </li>
      `).join('')}
    </ol>
  `,

  build(k) {
    k.cabeza();
    k.barre('foto', 0.5, 'izq', { dur: 0.5 });
    k.barre('tres', 1.1, 'izq', { dur: 0.3 });

    VERSIONES.forEach((_, i) => {
      k.entra(`v${i + 1}`, 1.45 + i * 0.85, { y: 20 }, { dur: 0.35, ease: 'power2.out' });
    });
  },
};
