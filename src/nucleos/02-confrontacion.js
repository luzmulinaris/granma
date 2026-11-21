// NÚCLEO 2 · Confrontación y terror — p. 8 a 13 del PDF
import { foto, pieza, titulo, texto, evento, paso, svg, flecha, fondos, via } from '../lib/ui.js';

export default {
  id: 'confrontacion',
  nombre: 'Confrontación y terror',
  pasos: 7.6,

  html: () => `
    ${evento({
      g: 'e1', y: 380, desde: 1157,
      fecha: 'abril de 1984', yFecha: 340,
      sub: 'Asesinato de Rodrigo Lara Bonilla', ySub: 430,
      ps: ['Rodrigo Lara Bonilla, el ministro de Justicia de Colombia, es asesinado el 30 de abril de 1984 en Bogotá, cuando sicarios en motocicleta dispararon contra su vehículo.'],
    })}
    ${foto('lara-auto', [188.2, 492, 744.3, 420], 'El automóvil de Rodrigo Lara Bonilla con los vidrios destrozados por los disparos', 'foto')}
    ${foto('mapa-bogota', [862, 552, 690, 588], 'Mapa: cómo ocurrió el asesinato. Calle 127, cruce y entorno de la Autopista Norte. El ministro regresaba a su casa cuando fue atacado', 'mapa')}

    <div class="cabeza" data-g="cabeza">${titulo('Confrontación y terror', 57, 264)}</div>

    <!-- p.11 a 13 · reconstrucción del ataque -->
    <div class="escena" data-g="escena">
      ${fondos([140, 3000, '#e9e9e3'])}
      ${svg(`
        ${via(660)}
        <line data-g="rot-auto" x1="662" y1="607" x2="662" y2="746" stroke="#9a9a9a" stroke-width="1.5"/>
        <line data-g="rot-moto" x1="1141" y1="524" x2="1141" y2="589" stroke="#fe1003" stroke-width="1.3"/>
        ${flecha([[1040.1, 475.8], [962.2, 475.8], [884.2, 430.4], [852, 430.4]], [[834.6, 430.4], [855.8, 450.1], [855.8, 410.7]], 'f1')}
        ${flecha([[708.2, 484.7], [647.7, 556.9], [564.7, 610.2], [540, 640]], [[526.1, 656.1], [554.9, 652.6], [524.7, 627.2]], 'f3')}
        ${flecha([[586, 416.3], [57, 416.3]], [[39.7, 416.3], [60.9, 436], [60.9, 396.5]], 'f2')}
      `)}
      ${pieza('auto', [529.4, 473.1, 318.5, 136.3], 'auto')}
      ${pieza('moto', [1047.7, 441, 165.4, 68.2], 'moto')}
      ${pieza('estallido', [664.3, 460.5, 90.9, 86.6], 'bang')}
      ${texto('rotulo', 'Automóvil de Lara Bonilla', 491, 765, null, 'rot-auto')}
      ${texto('rotulo rotulo--rojo', 'Motocicleta con dos ocupantes', 960, 595, null, 'rot-moto')}
      ${paso(1, 'La motocicleta se aproxima por el lado derecho', 1239, 442, 'p1')}
      ${paso(2, 'La motocicleta se acerca al auto y dispara', 797, 386, 'p2')}
      ${paso(3, 'El auto pierde el control y la moto huye de la escena', 68, 465, 'p3')}
    </div>
  `,

  build(k) {
    const { tl, $ } = k;

    // p.8 · título en paneo, línea de abajo hacia arriba, abril de 1984
    k.cabeza();
    k.evento('e1', 0.2);

    // p.9 · se suma la foto por encima
    k.entra('foto', 1.3, { y: 180, rotation: 2 }, { dur: 0.5, ease: 'power3.out' });

    // p.10 · se suma el mapa
    fijarOrigen($('mapa'));
    k.entra('mapa', 2.3, { scale: 0.8, y: 80 }, { dur: 0.5, ease: 'power3.out' });

    // p.11 · el mapa hace zoom y se entra a la escena; se escribe el cuadro 1
    tl.to($('mapa'), { scale: 9, duration: 0.7, ease: 'power2.in' }, 3.3);
    k.sale('cabeza foto e1-l e1-p e1-f e1-s e1-t', 3.3, {}, { dur: 0.3 });
    k.entra('escena', 3.7, {}, { dur: 0.3, ease: 'none' });
    k.sale('mapa', 3.9, {}, { dur: 0.12 });
    k.entra('moto', 3.95, { x: 760 }, { dur: 0.4, ease: 'power2.out' });
    k.entra('rot-auto rot-moto', 4.25, { y: 12 }, { dur: 0.2 });
    k.flecha('f1', 4.35, 0.22);
    k.paso('p1', 4.4);

    // p.12 · la moto se mueve, dispara, cuadro 2
    k.sale('rot-auto rot-moto f1', 5.1, {}, { dur: 0.15 });
    tl.to($('moto'), { x: -433, y: -63, duration: 0.45, ease: 'power2.inOut' }, 5.2);
    k.estalla('bang', 5.65, 'auto');
    k.paso('p2', 5.72);

    // p.13 · el auto pierde el control, la moto huye, cuadro 3
    k.sale('bang', 6.35, { scale: 1.8 }, { dur: 0.12 });
    k.flecha('f3', 6.4, 0.4);
    tl.to($('auto'), { x: -300.4, y: 217, rotation: -17.2, duration: 0.6, ease: 'power1.inOut' }, 6.45);
    k.flecha('f2', 6.7, 0.35);
    k.paso('p3', 6.85);
  },
};

// el zoom del mapa apunta al cruce marcado con el círculo rojo
function fijarOrigen(els) {
  for (const el of els) el.style.transformOrigin = '51.9% 59.2%';
}
