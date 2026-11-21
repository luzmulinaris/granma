// Pequeños generadores de HTML. Todas las medidas están en puntos de la
// página original del PDF (1684 × 1190), que es el sistema de coordenadas
// de `.stage`. El parámetro `g` es el nombre de grupo con el que después
// se anima el elemento (atributo data-g).

const B = import.meta.env.BASE_URL;

export const ROJO = '#d91403';

const st = (x, y, w, h) =>
  `left:${x}px;top:${y}px;` + (w != null ? `width:${w}px;` : '') + (h != null ? `height:${h}px;` : '');
const dg = (g) => (g ? ` data-g="${g}"` : '');

export const url = (ruta) => `${B}${ruta}`;

export const foto = (nombre, r, alt, g, cls = '') =>
  `<img class="abs foto ${cls}"${dg(g)} src="${B}img/${nombre}.webp" alt="${alt}" style="${st(...r)}" loading="lazy" decoding="async">`;

export const pieza = (nombre, r, g, cls = '') =>
  `<img class="abs ${cls}"${dg(g)} src="${B}svg/${nombre}.svg" alt="" style="${st(...r)}">`;

export const titulo = (t, x, y, cls = '', g = 'titulo') =>
  `<h2 class="titulo ${cls}"${dg(g)} style="${st(x, y)}"><span>${t}</span></h2>`;

export const texto = (cls, html, x, y, w, g) =>
  `<div class="abs ${cls}"${dg(g)} style="${st(x, y, w)}">${html}</div>`;

export const parrafos = (...ps) => ps.map((p) => `<p>${p}</p>`).join('');

export const linea = (x, y1, y2, g) =>
  `<i class="linea"${dg(g)} style="left:${x}px;top:${y1}px;height:${y2 - y1}px"></i>`;

export const punto = (x, y, g) => `<i class="punto"${dg(g)} style="left:${x}px;top:${y}px"></i>`;

export const caja = (html, x, y, w, g, cls = '') =>
  `<div class="abs caja ${cls}"${dg(g)} style="${st(x, y, w)}">${html}</div>`;

/** Caja numerada (cuadrado rojo con número + texto que "se escribe"). */
export const paso = (n, html, x, y, g) =>
  `<div class="abs paso"${dg(g)} style="${st(x, y)}"><b>${n}</b><span>${html}</span></div>`;

export const svg = (inner, g = '') =>
  `<svg class="abs capa"${dg(g)} viewBox="0 0 1684 1190" width="1684" height="1190" aria-hidden="true">${inner}</svg>`;

const pts = (arr) => arr.map((p) => p.join(',')).join(' ');

/** Flecha roja gruesa: una polilínea que se traza + punta triangular. */
export const flecha = (puntos, punta, g, ancho = 14) =>
  `<g${dg(g)}><polyline data-trazo points="${pts(puntos)}" fill="none" stroke="${ROJO}" stroke-width="${ancho}"/>` +
  `<polygon data-punta points="${pts(punta)}" fill="${ROJO}"/></g>`;

/**
 * Hito de la línea de tiempo. Genera los grupos `${g}-l` (línea), `-p`
 * (punto), `-f` (fecha), `-s` (subtítulo) y `-t` (texto).
 */
export function evento({ g, x = 827, y, desde, fecha, yFecha, sub, ySub, ps, yTxt, w = 288, xTxt }) {
  const xt = xTxt ?? x + 29;
  let h = '';
  if (desde != null) h += linea(x, Math.min(desde, y), Math.max(desde, y), `${g}-l`);
  h += punto(x, y, `${g}-p`);
  if (fecha) h += texto('fecha', fecha, x + 35, yFecha ?? y - 40, null, `${g}-f`);
  if (sub) h += texto('sub', sub, xt + 1, ySub ?? y + 30, null, `${g}-s`);
  if (ps) h += texto('txt', parrafos(...ps), xt, yTxt ?? y + 60, w, `${g}-t`);
  return h;
}

/**
 * Fondos a sangre para las escenas: [[y, alto, color], ...]
 * La primera banda se estira hacia arriba para que no quede un hueco blanco
 * bajo la cabecera cuando la página no ocupa todo el alto (pantallas verticales).
 */
export const fondos = (...bandas) =>
  bandas
    .map(([y, alto, color], i) => {
      const extra = i === 0 ? 3000 : 0;
      return `<div class="fondo" style="top:${y - extra}px;height:${alto + extra}px;background:${color}"></div>`;
    })
    .join('');

export const via = (y) =>
  `<line x1="-4000" x2="5684" y1="${y}" y2="${y}" stroke="#fff" stroke-width="5" stroke-dasharray="25 18"/>`;

/** Edificio esquemático con ventanas. */
export function edificio([x, y, w, h], xs = [], ys = [], lado = 49) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#dfdfdc" stroke="#1b1b1b" stroke-width="1.5"/>`;
  for (const wy of ys) for (const wx of xs) s += `<rect x="${wx}" y="${wy}" width="${lado}" height="${lado}" fill="#1b1b1b"/>`;
  return s;
}

/** Camión visto de costado (p. 24 y 30 del PDF). */
export const camion = (g) =>
  `<g${dg(g)}><image href="${url('svg/camion.svg')}" x="133" y="908" width="620" height="223.2"/></g>`;

/**
 * Llamadas de texto (línea guía roja + cuadradito + caja). `lista` viene de
 * geo.json; cada una genera los grupos `${g}${i}-d`, `-l` y `-c`.
 */
export function llamadas(lista, g) {
  let lineas = '';
  let cajas = '';
  lista.forEach((c, i) => {
    const inv = [...c.line].reverse();
    lineas +=
      `<polyline data-g="${g}${i}-l" points="${pts(inv)}" fill="none" stroke="${ROJO}" stroke-width="3" stroke-linejoin="round"/>` +
      `<rect data-g="${g}${i}-d" x="${c.dot[0] - 6}" y="${c.dot[1] - 6}" width="12" height="12" fill="${ROJO}"/>`;
    cajas += caja(c.text, c.box[0], c.box[1], null, `${g}${i}-c`, 'caja--1');
  });
  return { lineas, cajas };
}

/** Separador de miles con punto: 1710 -> "1.710" */
export const miles = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
