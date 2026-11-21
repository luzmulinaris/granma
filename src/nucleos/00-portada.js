// PORTADA — p. 1, 2 y 3 del PDF
import { foto, texto, svg, ROJO } from '../lib/ui.js';

export default {
  id: 'portada',
  nombre: 'Portada',
  pasos: 3,

  html: () => `
    <div class="cabeza" data-g="cabeza">
      <h1 class="titulo titulo--portada" data-g="titulo" style="left:57px;top:363px" aria-label="Los últimos años de Pablo Escobar y la llamada que llevó a su caída"><span>Los últimos años de Pablo Escobar</span></h1>
      <div class="titulo titulo--portada" data-g="titulo" style="left:57px;top:459px" aria-hidden="true"><span>y la llamada que llevó a su caída</span></div>
      ${texto(
        'bajada',
        'De la entrega negociada en La Catedral a la fuga y la persecución: un recorrido por los acontecimientos, los protagonistas y las llamadas que permitieron localizar al jefe del cartel más grande de Colombia.',
        57, 557, 860, 'bajada',
      )}
    </div>

    ${foto('diarios', [1077.6, 153.6, 511.3, 986.4], 'Tapa de El Tiempo «¡Al fin cayó!» y afiches de «Se busca» con recompensas por Pablo Escobar', 'diarios', 'foto--libre z6')}
    ${foto('escobar-mug', [27.1, 501.1, 423.6, 634.1], 'Ficha policial de Pablo Escobar en Medellín, número 128482', 'mug', 'foto--libre z6')}
    ${texto(
      'txt',
      '<p>Pablo Emilio Escobar Gaviria (1949–1993) fue un narcotraficante colombiano y jefe del Cartel de Medellín. Construyó una organización que combinó el tráfico de cocaína, la corrupción y la violencia.</p>',
      464, 730, null, 'bio',
    )}

    ${svg(`
      <g class="flecha-scroll" fill="none" stroke="${ROJO}" stroke-width="8">
        <line x1="841.9" y1="1085.9" x2="841.9" y2="1124"/>
        <polyline points="852.6,1116.4 841.9,1128 831.2,1116.4"/>
      </g>`)}
  `,

  build(k) {
    // 1 · título en paneo horizontal + bajada (al cargar)
    k.cabeza();
    // 2 · con el scroll aparecen los diarios
    k.entra('diarios', 0.3, { y: 260, rotation: 5 }, { dur: 0.7, ease: 'power3.out' });
    // 3 · Escobar y el texto que explica quién es
    k.entra('mug', 1.5, { y: 320 }, { dur: 0.6, ease: 'power3.out' });
    k.entra('bio', 2.0, { y: 24 }, { dur: 0.35 });
  },
};
