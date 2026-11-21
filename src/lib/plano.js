// Plano de manzanas (p. 47, 48 y 50 del PDF) dibujado en SVG a partir de las
// coordenadas extraídas del original. Grupos animables:
//   mz        cada manzana gris          hit     realce rojo de las 8 manzanas
//   velo      óvalo blanco translúcido   orbita  puntos del contorno del óvalo
//   pt        los 12 puntos posibles     exacto  el punto final (también es `pt`)
//   onda      anillos de "radar" sobre el punto exacto
import geo from '../data/geo.json';
import { svg, ROJO } from './ui.js';

const M = geo.manzanas;
const poly = (q) => q.map((p) => p.join(',')).join(' ');
const grilla = (g, color) => g.map(([a, b, c, d]) => `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${color}" stroke-width="0.6"/>`).join('');

export function plano() {
  const [fx, fy, fw, fh] = M.fondo;
  const [ex, ey, ew, eh] = M.elipse;
  const cx = ex + ew / 2;
  const cy = ey + eh / 2;

  const manzanas = M.bloques
    .map(
      (b) =>
        `<g data-g="mz"><polygon points="${poly(b.quad)}" fill="#e5e9e3" stroke="#d7d7d2" stroke-width="1.1"/>${grilla(b.grid, '#d4d7cd')}</g>` +
        (b.hit
          ? `<g data-g="hit"><polygon points="${poly(b.quad)}" fill="#ffb9b1" stroke="#ff0701" stroke-width="1.1"/>${grilla(b.grid, '#ef938b')}</g>`
          : ''),
    )
    .join('');

  // contorno punteado del óvalo, punto por punto
  const N = 88;
  let orbita = '';
  for (let i = 0; i < N; i++) {
    const a = -Math.PI / 2 + (i / N) * Math.PI * 2;
    orbita += `<circle data-g="orbita" cx="${(cx + (ew / 2) * Math.cos(a)).toFixed(1)}" cy="${(cy + (eh / 2) * Math.sin(a)).toFixed(1)}" r="2.5" fill="${ROJO}"/>`;
  }

  const [px, py] = M.exacto;
  const puntos = M.puntos
    .map(([x, y]) => {
      const exacto = Math.abs(x - px) < 1 && Math.abs(y - py) < 1;
      return `<circle data-g="${exacto ? 'pt exacto' : 'pt resto'}" cx="${x}" cy="${y}" r="${M.radio_punto}" fill="${ROJO}"/>`;
    })
    .join('');

  return svg(`
    <rect data-g="plano-fondo" x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="#f8f8f5"/>
    ${manzanas}
    <ellipse data-g="velo" cx="${cx}" cy="${cy}" rx="${ew / 2}" ry="${eh / 2}" fill="#fff" fill-opacity="0.68"/>
    ${orbita}
    <circle data-g="onda" cx="${px}" cy="${py}" r="${M.radio_punto}" fill="none" stroke="${ROJO}" stroke-width="3"/>
    <circle data-g="onda" cx="${px}" cy="${py}" r="${M.radio_punto}" fill="none" stroke="${ROJO}" stroke-width="3"/>
    ${puntos}
  `);
}
