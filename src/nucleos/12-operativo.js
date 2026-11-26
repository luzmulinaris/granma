// NÚCLEO 12 · El operativo
import { foto, linea, punto, titulo, texto } from '../lib/ui.js';

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
      ${texto('tema-editorial', "El operativo", 104, 185, null, 'tema')}
      ${titulo("La búsqueda llega", 104, 235)}
      ${titulo("a su fin", 104, 314)}
      ${texto('bajada texto-editorial', "Con la ubicación exacta, comienza el operativo de búsqueda, que culmina con la muerte de Pablo Escobar en un tejado del barrio Los Olivos, en Medellín. Desde entonces, distintos testimonios se han disputado la autoría del disparo que culminó con su vida.", 105, 417, 590, 'bajada')}
    </div>
    ${linea(851, 140, 415, 'tramo-fecha')}
    ${punto(851, 415, 'punto-fecha')}
    ${texto('fecha', '2 de diciembre de 1993', 885, 380, null, 'fecha-operativo')}
    ${texto('sub', 'Muerte de Pablo Escobar', 883, 442, null, 'muerte')}
    ${foto('operativo-v02', [103, 565, 654, 463], 'Integrantes del Bloque de Búsqueda posan en el tejado junto al cuerpo de Pablo Escobar', 'foto')}
    <h3 class="titulo titulo--rojo titulo--40" id="operativo-versiones" data-g="tres" style="left:871px;top:537px">
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
    k.crece('tramo-fecha', 0.38, 'top', { dur: 0.3 });
    k.entra('punto-fecha', 0.58, { scale: 0 }, { dur: 0.2 });
    k.entra('fecha-operativo muerte', 0.38, { y: 12 }, { dur: 0.28 });
    k.barre('foto', 0.5, 'izq', { dur: 0.5 });
    k.barre('tres', 1.1, 'izq', { dur: 0.3 });

    VERSIONES.forEach((_, i) => {
      k.entra(`v${i + 1}`, 1.45 + i * 0.85, { y: 20 }, { dur: 0.35, ease: 'power2.out' });
    });
  },
};
