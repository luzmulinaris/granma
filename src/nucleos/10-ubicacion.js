// NÚCLEO 10 · Ubicación reducida — p. 47 y 48 del PDF
import { linea, punto, titulo, texto } from '../lib/ui.js';
import { plano } from '../lib/plano.js';

export default {
  id: 'ubicacion',
  nombre: 'Acercamiento a la ubicación',
  pasos: 5,

  html: () => `
    <div class="plano-editorial">${plano()}</div>

    <!-- p.47 -->
    <div class="cabeza" data-g="cabeza">
      ${texto('tema-editorial', "Primeras pistas", 104, 185, null, 'tema')}
      ${titulo("Acercamiento a", 104, 235)}
      ${titulo("la ubicación", 104, 314)}
      ${texto('bajada texto-editorial', "Mientras se cumplían las labores de rastreo, la expectativa estaba centrada en el primero de diciembre, porque en esa fecha Escobar cumplía años. En efecto, la voz del jefe del cartel de Medellín se escuchó desde muy temprano. Esta llamada no fue tan larga para rastrearlo por completo pero sí para reducir su ubicación. Luego, la familia se vuelve a comunicar con Escobar. Hubo una serie de cinco llamadas para dictar preguntas para una entrevista y la ubicación se redujo a doce sitios posibles en un radio de dos manzanas.", 112, 417, 595, 'bajada')}
    </div>

    ${linea(851, 140, 415, 'tramo-fecha')}
    ${punto(851, 415, 'punto-fecha')}
    ${texto('fecha', '1 de diciembre de 1993', 885, 380, null, 'fecha-ubicacion')}
    ${texto('sub', 'Ubicación reducida a 8 manzanas', 883, 442, null, 'ubicacion8')}
    ${texto('sub', 'Ubicación reducida a 12 sitios posibles', 883, 442, null, 'ubicacion12')}
  `,

  build(k) {
    const o = { transformOrigin: '50% 50%' };
    k.oculta('onda');

    // p.47 · título + bajada; aparece el plano de todas las manzanas…
    k.cabeza();
    k.crece('tramo-fecha', 0.15, 'top', { dur: 0.3 });
    k.entra('punto-fecha', 0.35, { scale: 0 }, { dur: 0.2 });
    k.entra('fecha-ubicacion ubicacion8', 0.15, { y: 12 }, { dur: 0.3 });
    k.entra('plano-fondo', 0.2, {}, { dur: 0.3 });
    k.entra('mz', 0.3, { scale: 0, ...o }, { dur: 0.22, stagger: { amount: 0.55, grid: [5, 6], from: 'start' }, ease: 'back.out(1.6)' });
    // …y se marcan 8
    k.entra('hit', 1.4, { scale: 0.4, ...o }, { dur: 0.2, stagger: 0.07, ease: 'back.out(2.5)' });

    // p.48 · se mantiene el plano y se marcan los 12 puntos
    k.sale('ubicacion8', 2.5, { y: -30 }, { dur: 0.25 });
    k.entra('ubicacion12', 2.7, { y: 12 }, { dur: 0.25 });
    k.entra('velo', 3.0, { scale: 0, ...o }, { dur: 0.4, ease: 'power2.out' });
    k.entra('orbita', 3.1, {}, { dur: 0.02, stagger: 0.5 / 88, ease: 'none' });
    k.entra('pt', 3.6, { scale: 0, ...o }, { dur: 0.16, stagger: 0.07, ease: 'back.out(3)' });
  },
};
