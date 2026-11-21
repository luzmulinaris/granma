// NÚCLEO 4 · Una entrega bajo condiciones — p. 33 y 34 del PDF
import { foto, titulo, evento } from '../lib/ui.js';

export default {
  id: 'entrega',
  nombre: 'Una entrega bajo condiciones',
  pasos: 6.4,

  html: () => `
    <!-- p.33 · 1990 -->
    ${evento({
      g: 'a1', y: 385, desde: 312, fecha: '1990', yFecha: 340,
      sub: 'La posibilidad de entregarse', ySub: 406,
      ps: ['El gobierno de César Gaviria impulsa una política de sometimiento a la justicia con beneficios por comparecencia y confesión.'],
      yTxt: 436,
    })}
    ${evento({
      g: 'a2', y: 592, desde: 385, sub: 'Los intermediarios', ySub: 586,
      ps: ['El sacerdote Rafael García Herreros facilita los contactos para concretar la entrega de Pablo Escobar.'],
      yTxt: 611, xTxt: 849,
    })}
    ${evento({
      g: 'a3', y: 796, desde: 592,
      ps: ['Se presentan las garantías y condiciones negociadas para su reclusión en Envigado.'],
      yTxt: 779, xTxt: 850,
    })}
    ${foto('garcia-herreros', [155.5, 540.2, 637.8, 455.6], 'Pablo Escobar junto al sacerdote Rafael García Herreros', 'cura')}

    <!-- p.34 · junio de 1991 -->
    ${evento({
      g: 'b1', y: 385, desde: 312, fecha: 'junio de 1991', yFecha: 340,
      sub: 'La decisión sobre la extradición', ySub: 406,
      ps: ['La Asamblea Constituyente vota por la prohibición de extraditar a los colombianos por nacimiento.'],
      yTxt: 436,
    })}
    ${evento({ g: 'b2', y: 640, desde: 385, sub: 'Entrega de Pablo Escobar', ySub: 634 })}
    ${foto('gaceta', [227.8, 358.8, 463.9, 689.1], 'Gaceta Constitucional: Constitución Política de Colombia 1991', 'gaceta')}
    ${foto('rejas', [858.5, 690.2, 656.7, 348.2], 'Pablo Escobar detrás de las rejas de La Catedral', 'rejas')}

    <div class="cabeza" data-g="cabeza">${titulo('Una entrega bajo condiciones', 57, 240)}</div>
  `,

  build(k) {
    // p.33 · se forma la línea, aparece 1990 y van apareciendo los hechos
    k.cabeza();
    k.evento('a1', 0.2, { origen: 'top' });
    k.evento('a2', 1.1, { origen: 'top' });
    k.evento('a3', 1.9, { origen: 'top' });
    // con el último scroll aparece la imagen
    k.entra('cura', 2.7, { y: 160, rotation: -2 }, { dur: 0.45, ease: 'power3.out' });

    // p.34 · junio de 1991: cada hecho trae su imagen
    for (const g of ['a1', 'a2', 'a3']) k.saleEvento(g, 3.6, -40);
    k.sale('cura', 3.6, { y: -40 });
    k.evento('b1', 3.8, { origen: 'top' });
    k.barre('gaceta', 4.2, 'arriba', { dur: 0.45 });
    k.evento('b2', 4.9, { origen: 'top' });
    k.entra('rejas', 5.3, { y: 120, scale: 0.92 }, { dur: 0.4, ease: 'power3.out' });
  },
};
