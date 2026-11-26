// NÚCLEO 4 · Una entrega bajo condiciones — p. 33 y 34 del PDF
import { foto, titulo, texto, evento } from '../lib/ui.js';

export default {
  id: 'entrega',
  nombre: "Acuerdo de entrega con el gobierno",
  pasos: 6.4,

  html: () => `
    <!-- p.33 · 1990 -->
    ${evento({
      g: 'a1', x: 851, y: 415, desde: 140, fecha: '1990', yFecha: 384,
      sub: 'La posibilidad de entregarse', ySub: 442,
      ps: ['El gobierno de César Gaviria impulsa una política de sometimiento a la justicia con beneficios por comparecencia y confesión.'],
    })}
    ${evento({
      g: 'a3', x: 851, y: 580, desde: 415,
      ps: ['Se presentan las garantías y condiciones negociadas para su reclusión en Envigado.'],
      yTxt: 563, xTxt: 880,
    })}

    <!-- p.34 · junio de 1991 -->
    ${evento({
      g: 'b1', x: 851, y: 415, desde: 140, fecha: 'Junio de 1991', yFecha: 384,
      sub: 'La prohibición de la extradición', ySub: 442,
      ps: ['La Asamblea Constituyente vota por la prohibición de extraditar a los colombianos por nacimiento.'],
    })}
    ${evento({ g: 'b2', x: 851, y: 640, desde: 415, sub: 'La entrega', ySub: 627, ps: ['Pablo Escobar se entrega y es trasladado a Envigado, a la prisión «La Catedral».'] })}
    ${foto('rejas-v02', [880, 733, 518, 275], 'Pablo Escobar detrás de las rejas de La Catedral', 'rejas')}

    <div class="cabeza" data-g="cabeza">
      ${texto('tema-editorial', "La entrega", 104, 185, null, 'tema')}
      ${titulo("Acuerdo de entrega", 104, 235)}
      ${titulo("con el gobierno", 104, 314)}
      ${texto('bajada texto-editorial', "La escalada de asesinatos, atentados y secuestros convirtió la lucha contra la extradición en una crisis nacional. Mientras continuaba la persecución a los narcotraficantes, el gobierno de César Gaviria abrió otra vía: una política de sometimiento a la justicia que ofrecía rebajas de penas y garantías de no extradición a quienes se entregaran y confesaran delitos. En ese contexto, Escobar negoció las condiciones de su reclusión.", 105, 414, 595, 'bajada')}
      ${texto('bajada texto-editorial', "Así, se entregó e ingresó a La Catedral, en Envigado. Ese mismo día, la Asamblea Constituyente aprobó prohibir la extradición de colombianos por nacimiento, eliminando su principal temor: ser enviado a una cárcel de Estados Unidos.", 104, 625, 595, 'bajada')}
    </div>
  `,

  build(k) {
    // p.33 · se forma la línea, aparece 1990 y van apareciendo los hechos
    k.cabeza();
    k.evento('a1', 0.2, { origen: 'top' });
    k.evento('a3', 1.9, { origen: 'top' });
    // con el último scroll aparece la imagen

    // p.34 · junio de 1991: cada hecho trae su imagen
    for (const g of ['a1', 'a3']) k.saleEvento(g, 3.6, -40);
    k.evento('b1', 3.8, { origen: 'top' });
    k.evento('b2', 4.9, { origen: 'top' });
    k.entra('rejas', 5.3, { y: 120, scale: 0.92 }, { dur: 0.4, ease: 'power3.out' });
  },
};
