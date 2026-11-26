// NÚCLEO 1 · El poder queda expuesto — p. 4 a 7 del PDF
import { foto, titulo, texto, parrafos, linea, punto, caja, svg, flecha, ROJO } from '../lib/ui.js';

const X = 850; // eje de la línea de tiempo

export default {
  id: 'poder',
  nombre: "Escobar queda expuesto",
  pasos: 5.8,

  html: () => `
    ${foto('congreso-v02', [103, 455, 672, 409], 'Pablo Escobar sonríe en su banca de la Cámara de Representantes', 'congreso')}

    ${linea(X, 140, 535, 'l-a')}

    <!-- p.5 · agosto de 1983 -->
    ${punto(X, 535, 'e2-p')}
    ${texto('fecha', 'Agosto de 1983', 885, 504, null, 'e2-f')}
    ${texto('sub', 'Denuncia pública al narcotráfico', 883, 569, null, 'e2-s')}
    ${texto('txt', parrafos(
      'Rodrigo Lara Bonilla, el ministro de Justicia de Colombia denuncia públicamente los vínculos de Pablo Escobar y otros jefes del Cartel de Medellín con el narcotráfico y la política.',
    ), 880, 600, null, 'e2-t')}

    <!-- p.6 · 1984 -->
    ${punto(X, 500, 'e3-p')}
    ${texto('fecha', '1984', 885, 469, null, 'e3-f')}
    ${svg(`
      <circle data-g="circulo" cx="539" cy="730" r="120" fill="none" stroke="${ROJO}" stroke-width="5" transform="rotate(-90 539 730)"/>
      ${flecha([[658, 718], [849, 718]], [[866, 718], [845, 703], [845, 733]], 'fl', 10)}
    `)}
    ${caja('Jefe del cartel de Medellín', 874, 700, null, 'jefe', 'caja--1')}

    <!-- p.7 -->
    ${texto('txt', parrafos("La noticia de la captura de Escobar en 1976 vuelve a ser pública. La exposición de sus antecedentes y las actuaciones judiciales alteran su posición. Finalmente queda expuesto como jefe del cartel de Medellín y visibilidad pública se convierte en una vulnerabilidad."), 879, 526, 420, 'cierre')}

    <div class="cabeza" data-g="cabeza">
      ${texto('tema-editorial', "| Antecedentes", 104, 185, null, 'tema')}
      ${titulo("Escobar queda expuesto", 104, 235)}
      ${texto('bajada texto-editorial', "Durante sus primeros años, Escobar ejercía como Suplente de Jairo Ortega en la Cámara de Representantes. La representación política le ofrecía acceso y legitimidad pública.", 107, 341, 650, 'bajada')}
    </div>
  `,

  build(k) {
    // p.4 · título en paneo horizontal, imagen, línea de abajo hacia arriba + 1983
    k.cabeza();
    k.barre('congreso', 0.15, 'izq', { dur: 0.6 });

    // p.5 · baja la línea de tiempo: agosto de 1983 + denuncia.jpg
    k.crece('l-a', 2.05, 'top', { dur: 0.25 });
    k.evento('e2', 2.05);

    // p.6 · 1984 + círculo que rodea a Escobar + flecha + «jefe del cartel»
    k.saleEvento('e2', 3.1, -90);
    k.evento('e3', 3.15);
    k.traza('circulo', 3.6, { dur: 0.4, ease: 'power1.inOut' });
    k.flecha('fl', 3.98, 0.12);
    k.entra('jefe', 4.1, { x: -24, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.2 });

    k.entra('cierre', 3.45, { y: 20 }, { dur: 0.22 });
  },
};
