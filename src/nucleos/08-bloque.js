// NÚCLEO 8 · Formación del bloque de búsqueda — p. 42 a 44 del PDF
import { foto, titulo, texto, url } from '../lib/ui.js';

const AFICHES = [[1044, 648, 313, 388], [1048, 325, 312, 333], [712, 351, 337, 435], [712, 781, 338, 243], [1321, 722, 292, 404], [1354, 354, 274, 366]];

const TRAS = [
  ['tras-1', 'bloque de búsqueda', 'Recapturarlo y enfrentar su organización criminal', 565],
  ['tras-2', 'agentes de la dea', 'Desmantelar la red de cocaína que llegaba a <span class="vers" style="font-size:23.562px">ee.uu</span>', 694],
  ['tras-3', 'los pepes', 'Represalias, supervivencia y disputa del poder criminal', 823],
  ['tras-4', 'cartel de cali', 'Debilitar a su rival y proteger sus intereses en el narcotráfico', 952],
];

export default {
  id: 'bloque',
  nombre: 'Formación del bloque de búsqueda',
  pasos: 8.2,

  html: () => `
    ${AFICHES.map((rect, i) => foto(`afiche-v02-${i + 1}`, rect, 'Afiche de búsqueda de Pablo Escobar', `af af${i + 1}`)).join('')}

    <div class="cabeza" data-g="cabeza">
      ${texto('tema-editorial', "| La búsqueda", 104, 185, null, 'tema')}
      ${titulo("Formación del bloque", 104, 235)}
      ${titulo("de búsqueda", 104, 314)}
      ${texto('bajada texto-editorial', "Tras la fuga de La Catedral, el Gobierno reorganizó el Bloque de Búsqueda, una unidad especial encargada de localizar y capturar a Pablo Escobar. La Policía Nacional encabezó la persecución, con apoyo de otras instituciones colombianas y asistencia estadounidense en inteligencia y tecnología.", 111, 417, 580, 'bajada')}
      ${texto('bajada texto-editorial', "La búsqueda combinó allanamientos, seguimiento de sus colaboradores, información de testigos e interceptación de comunicaciones. El objetivo era debilitar su red de protección y reducir los lugares donde podía esconderse. Sus contactos, desplazamientos y llamadas se convirtieron en pistas para encontrarlo.", 113, 576, 580, 'bajada')}
    </div>

    <!-- p.44 · quiénes iban detrás de Escobar -->
    ${texto('titulo titulo--rojo titulo--40', '<span>Quiénes iban detrás de Escobar</span>', 104, 402, null, 'quienes')}
    ${TRAS.map(
      ([img, nombre, objetivo, y], i) => `
      <div class="retrato retrato--sin-borde" data-g="t${i}" style="left:262px;top:${y - 58}px;width:112px;height:114px">
        <img src="${url(`img/${img}.webp`)}" alt="" loading="lazy" decoding="async">
      </div>
      ${texto('vers vers--rojo', nombre, 369, y - 18, null, `t${i}`)}
      <div class="abs flecha-h" data-g="fl${i}" style="left:624.8px;top:${y - 26.1}px;width:285.7px;height:52.2px"><i></i></div>
      ${texto('objetivo', objetivo, 936, y - 15, null, `ob${i}`)}`,
    ).join('')}
  `,

  build(k) {
    const { tl, $ } = k;
    k.cabeza();

    // Los afiches aparecen de a uno al costado de la bajada.
    AFICHES.forEach((_, i) => {
      const t = 0.35 + i * 0.55;
      k.entra(`af${i + 1}`, t, { scale: 1.15, y: -40 }, { dur: 0.3, ease: 'power3.out' });
    });

    // p.44 · quiénes iban detrás: texto e imágenes, después las flechas
    k.sale('bajada', 4.9, {}, { dur: 0.25 });
    k.sale('af', 5.0, { y: -180, rotation: () => azar(-10, 10) }, { dur: 0.35, stagger: 0.03 });
    k.entra('quienes', 5.35, { x: -60, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.35, ease: 'power3.out' });
    TRAS.forEach((_, i) => k.entra(`t${i}`, 5.6 + i * 0.22, { x: -40 }, { dur: 0.22, stagger: 0.06 }));
    TRAS.forEach((_, i) => {
      const t = 6.7 + i * 0.25;
      const flecha = $(`fl${i}`)[0].firstElementChild;
      tl.fromTo(flecha, { xPercent: -101 }, { xPercent: 0, duration: 0.25, ease: 'power2.out' }, t);
      k.entra(`ob${i}`, t + 0.18, { x: -24 }, { dur: 0.2 });
    });
  },
};

const azar = (a, b) => a + Math.random() * (b - a);
