// NÚCLEO 10 · Ubicación reducida — p. 47 y 48 del PDF
import { titulo, texto } from '../lib/ui.js';
import { plano } from '../lib/plano.js';

export default {
  id: 'ubicacion',
  nombre: 'Ubicación reducida',
  pasos: 5,

  html: () => `
    ${plano()}

    <!-- p.47 -->
    <div class="cabeza" data-g="cabeza">
      ${titulo('Ubicación reducida a 8 manzanas', 105, 196, 'titulo--rojo')}
      ${texto('bajada', 'Mientras se cumplían las labores de rastreo, la expectativa estaba centrada en el primero de diciembre, porque en esa fecha Escobar cumplía años. En efecto, la voz del jefe del cartel de Medellín se escuchó desde muy temprano. Esta llamada no fue tan larga para rastrearlo por completo pero si para reducir su ubicación.', 102, 269, 560, 'bajada')}
    </div>

    <!-- p.48 -->
    ${texto('titulo titulo--rojo', '<span>Ubicación reducida a 12 puntos posibles</span>', 107, 248, null, 'titulo2')}
    ${texto('bajada', 'Luego, la familia se vuelve a comunicar con Escobar. Hubo una serie de cinco llamadas para dictar preguntas para una entrevista y la ubicación se redujo a doce sitios posibles en un radio de dos manzanas.', 102, 329, 560, 'bajada2')}
  `,

  build(k) {
    const o = { transformOrigin: '50% 50%' };
    k.oculta('onda');

    // p.47 · título + bajada; aparece el plano de todas las manzanas…
    k.cabeza();
    k.entra('plano-fondo', 0.2, {}, { dur: 0.3 });
    k.entra('mz', 0.3, { scale: 0, ...o }, { dur: 0.22, stagger: { amount: 0.55, grid: [5, 6], from: 'start' }, ease: 'back.out(1.6)' });
    // …y se marcan 8
    k.entra('hit', 1.4, { scale: 0.4, ...o }, { dur: 0.2, stagger: 0.07, ease: 'back.out(2.5)' });

    // p.48 · se mantiene el plano y se marcan los 12 puntos
    k.sale('cabeza', 2.5, { y: -30 }, { dur: 0.25 });
    k.entra('titulo2', 2.7, { x: -60, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.35, ease: 'power3.out' });
    k.entra('bajada2', 2.9, { y: 16 }, { dur: 0.25 });
    k.entra('velo', 3.0, { scale: 0, ...o }, { dur: 0.4, ease: 'power2.out' });
    k.entra('orbita', 3.1, {}, { dur: 0.02, stagger: 0.5 / 88, ease: 'none' });
    k.entra('pt', 3.6, { scale: 0, ...o }, { dur: 0.16, stagger: 0.07, ease: 'back.out(3)' });
  },
};
