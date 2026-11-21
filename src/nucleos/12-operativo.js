// NÚCLEO 12 · El operativo — p. 52 y 53 del PDF
import geo from '../data/geo.json';
import { foto, titulo, texto, caja } from '../lib/ui.js';

export default {
  id: 'operativo',
  nombre: 'El operativo',
  pasos: 4.4,

  html: () => `
    <div class="cabeza" data-g="cabeza">
      ${titulo('El operativo', 62, 240)}
      ${texto('bajada justo', 'Con la ubicación exacta, comienza el operativo de búsqueda, que culmina con la muerte de Pablo Escobar en un tejado del barrio Los Olivos, en Medellín. Desde entonces, distintos testimonios se han disputado la autoría del disparo que culminó con su vida.', 63, 329, 640, 'bajada')}
    </div>
    ${texto('titulo titulo--rojo titulo--40', '<span>Tres versiones sobre su muerte</span>', 794, 425, null, 'tres')}
    ${foto('operativo', geo.fotos.operativo.p52, 'Integrantes del Bloque de Búsqueda posan en el tejado junto al cuerpo de Pablo Escobar', 'foto')}
    ${caja('<span data-g="v1-t">Las autoridades atribuyeron la muerte al operativo del Bloque de Búsqueda. Hugo Aguilar afirmó haber disparado contra Escobar.</span>', 718, 603, 237, 'v1', 'caja--20')}
    ${caja('<span data-g="v2-t">Un integrante de Los Pepes atribuyó el disparo fatal a un allegado suyo.</span>', 718, 758, 237, 'v2', 'caja--20')}
    ${caja('<span data-g="v3-t">El hijo de Escobar sostuvo que su padre se quitó la vida para evitar la captura.</span>', 718, 890, 237, 'v3', 'caja--20')}
  `,

  build(k) {
    const { tl, $ } = k;
    const desde = { x: -30, clipPath: 'inset(0% 100% 0% 0%)' };

    // p.52 · título + bajada, subtítulo e imagen; primer cuadro de texto
    k.cabeza();
    k.entra('tres', 0.3, { x: -60, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.35, ease: 'power3.out' });
    k.barre('foto', 0.5, 'izq', { dur: 0.5 });
    // en la p.52 el primer cuadro está abajo (y=831); en la p.53 sube a y=603
    k.entra('v1', 1.3, { ...desde, y: 228 }, { dur: 0.22, y: 228 });
    k.escribe('v1-t', 1.42, 0.45);

    // p.53 · se suman el segundo y el tercer cuadro
    tl.to($('v1'), { y: 0, duration: 0.3, ease: 'power2.inOut' }, 2.3);
    k.entra('v2', 2.5, desde, { dur: 0.22 });
    k.escribe('v2-t', 2.62, 0.35);
    k.entra('v3', 3.3, desde, { dur: 0.22 });
    k.escribe('v3-t', 3.42, 0.35);
  },
};
