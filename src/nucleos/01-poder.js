// NÚCLEO 1 · El poder queda expuesto — p. 4 a 7 del PDF
import { foto, titulo, texto, parrafos, linea, punto, caja, svg, flecha, ROJO } from '../lib/ui.js';

const X = 1074; // eje de la línea de tiempo

export default {
  id: 'poder',
  nombre: 'El poder queda expuesto',
  pasos: 5.8,

  html: () => `
    ${foto('congreso', [56.8, 336, 964.9, 530.8], 'Pablo Escobar sonríe en su banca de la Cámara de Representantes', 'congreso')}

    ${linea(X, -200, 436, 'l-a')}${linea(X, 436, 584, 'l-b')}${linea(X, 584, 1600, 'l-c')}

    <!-- p.4 · 1983 -->
    ${punto(X, 584, 'e1-p')}
    ${texto('fecha', '1983', 1108, 548, null, 'e1-f')}
    ${texto('sub', 'Escobar en el poder político', 1103, 622, null, 'e1-s')}
    ${texto('txt', parrafos(
      'Escobar ejercía como Suplente de Jairo Ortega en la Cámara de Representantes.',
      'La representación política le ofrecía acceso y legitimidad pública.',
    ), 1102, 646, 255, 'e1-t')}

    <!-- p.5 · agosto de 1983 -->
    ${punto(X, 424, 'e2-p')}
    ${texto('fecha', 'agosto de 1983', 1108, 401, null, 'e2-f')}
    ${texto('sub', 'Denuncia pública al narcotrafico', 1103, 490, null, 'e2-s')}
    ${texto('txt', parrafos(
      'Rodrigo Lara Bonilla, el ministro de Justicia de Colombia denuncia públicamente los vínculos de Pablo Escobar y otros jefes del Cartel de Medellín con el narcotráfico y la política.',
    ), 1103, 515, 246, 'e2-t')}
    ${foto('denuncia', [761.1, 685.6, 780.3, 466.4], 'Tapa de El Espectador: «Soy un ministro peligroso para quienes están fuera de la ley»', 'denuncia')}

    <!-- p.6 · 1984 -->
    ${punto(X, 436, 'e3-p')}
    ${texto('fecha', '1984', 1108, 400, null, 'e3-f')}
    ${texto('sub', 'Escobar queda expuesto', 1103, 466, null, 'e3-s')}
    ${texto('txt', parrafos('Escobar queda expuesto'), 1103, 496, 255, 'e3-t')}
    ${svg(`
      <circle data-g="circulo" cx="870" cy="659.5" r="136" fill="none" stroke="${ROJO}" stroke-width="5" transform="rotate(-90 870 659.5)"/>
      ${flecha([[1004.2, 656.2], [1080, 656.2]], [[1094.4, 656.2], [1077.4, 640.5], [1077.4, 672]], 'fl', 10)}
    `)}
    ${caja('Jefe del cartel de Medellín', 1104, 637, 181, 'jefe', 'caja--1')}

    <!-- p.7 -->
    ${foto('preso-1976', [704.3, 364.7, 712.3, 614.6], 'Recorte de diario: «En 1976 Escobar estuvo preso»', 'preso')}
    ${caja('La noticia de la captura de Escobar de 1976 vuelve a ser pública.', 1285, 927, 182, 'nota')}
    ${texto('txt', parrafos(
      'La exposición de sus antecedentes y las actuaciones judiciales alteran su posición. La visibilidad pública se convierte en una vulnerabilidad.',
    ), 531, 994, 255, 'cierre')}

    <div class="cabeza" data-g="cabeza">${titulo('El poder queda expuesto', 57, 264)}</div>
  `,

  build(k) {
    const { tl, $ } = k;

    // p.4 · título en paneo horizontal, imagen, línea de abajo hacia arriba + 1983
    k.cabeza();
    k.barre('congreso', 0.15, 'izq', { dur: 0.6 });
    k.crece('l-c', 1.0, 'bottom', { dur: 0.3 });
    k.evento('e1', 1.0);

    // p.5 · baja la línea de tiempo: agosto de 1983 + denuncia.jpg
    k.saleEvento('e1', 2.0, -90);
    k.crece('l-b', 2.05, 'bottom', { dur: 0.12 });
    k.crece('l-a', 2.17, 'bottom', { dur: 0.25 });
    k.evento('e2', 2.05);
    k.entra('denuncia', 2.55, { y: 160, rotation: -3 }, { dur: 0.4, ease: 'power3.out' });

    // p.6 · 1984 + círculo que rodea a Escobar + flecha + «jefe del cartel»
    k.saleEvento('e2', 3.1, -90);
    k.sale('denuncia', 3.1, { y: 120 });
    tl.to($('l-c'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.18, ease: 'none' }, 3.12);
    tl.to($('l-b'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.08, ease: 'none' }, 3.3);
    k.evento('e3', 3.15);
    k.traza('circulo', 3.6, { dur: 0.4, ease: 'power1.inOut' });
    k.flecha('fl', 3.98, 0.12);
    k.entra('jefe', 4.1, { x: -24, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.2 });

    // p.7 · se superpone el recorte de 1976 y aparece el texto
    k.saleEvento('e3', 4.6, -40);
    k.sale('l-a', 4.6);
    k.entra('preso', 4.7, { y: 200, scale: 0.9 }, { dur: 0.5, ease: 'power3.out' });
    k.entra('nota', 5.15, { y: 20 }, { dur: 0.22 });
    k.entra('cierre', 5.3, { y: 20 }, { dur: 0.22 });
  },
};
