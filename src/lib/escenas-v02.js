import { foto, pieza } from './ui.js';
import fondoBordes from '../assets/bordes-escenas-v02.png';

const fotogramas = {
  lara: [
    [11, 2.65, "30 de abril - bogotá calle 127 | cruce y entorno de la autopista norte Automóvil de Lara Bonilla Conducido por su chofer Motocicleta con dos ocupantes"],
  ],
  cano: [
    [17, 4.45, "17 de diciembre - bogotá calle 22 | avenida 68 sede del espectador Sede de \"El Espectador\". 1. Guillermo Cano sale del edificio. 2. Se sube al auto y realiza un giro en U."],
  ],
  galan: [
    [25, 9.25, "Luis Carlos Galán se encontraba en un acto electoral junto a sus dos escoltas 1 18 de agosto - cundinamarca calle 12 | carrera 7 parque alfonso lópez pumarejo"],
    [26, 10.6, "Luis Carlos Galán se encontraba en un acto electoral junto a sus dos escoltas 1 18 de agosto - cundinamarca calle 12 | carrera 7 parque alfonso lópez pumarejo Entre la multitud se encontraban dos sicarios 2"],
    [27, 11.05, "Luis Carlos Galán se encontraba en un acto electoral junto a sus dos escoltas 1 18 de agosto - cundinamarca calle 12 | carrera 7 parque alfonso lópez pumarejo Los sicarios disparan cinco veces, matando a Galán y a sus dos acompañantes 3 Entre la multitud se encontraban dos sicarios 2"],
  ],
  espectador: [
    [30, 13.85, "2 de septiembre - bogotá calle 22 | avenida 68 sede del espectador Sede de \"El Espectador\""],
    [31, 14.45, "2 de septiembre - bogotá calle 22 | avenida 68 sede del espectador Un camión con 170 kg de dinamita se posiciona frente al edificio de \"El Espectador\" 1"],
  ],
  avianca: [
    [35, 17.65, "27 de noviembre - bogotá aeropuerto \"el dorado\" Un Boeing de Avianca despega de El Dorado hacia Cali con 101 pasajeros y 6 tripulantes 1"],
  ],
  das: [
    [40, 21.85, "6 de diciembre - bogotá carrera 27| calle 18 departamento de seguridad Edificio del \"DAS\""],
    [41, 22.45, "6 de diciembre - bogotá carrera 27| calle 18 departamento de seguridad Un cochebomba se posiciona frente al edificio del DAS 1"],
  ],
};

const movimientos = {
  31: { rect: [602, 824, 416, 179], desde: { x: 850 }, dur: 0.55 },
  41: { rect: [874, 848, 350, 161], desde: { x: 850 }, dur: 0.55 },
};

const explosiones = {
  31: { pagina: 32, tiempo: 15.3, cuadro: '2. La bomba explota y destruye parte del edificio.' },
  41: { pagina: 42, tiempo: 23.3, cuadro: '2. El cochebomba explota junto al edificio del DAS.' },
};

const impactosGalan = [[936, 473], [955, 511], [990, 496], [1020, 519], [1054, 482]];

const paginas = [...Object.values(fotogramas).flat().map(([pagina]) => pagina), 12, 13, 14, 18, 19, 20, 21, 22, 32, 36, 37, 42].sort((a, b) => a - b);
const columnasBordes = paginas.length * 2;

function capasLara() {
  const recorte = (pagina, grupo, alt = '') =>
    foto(`escena-v02-${pagina}`, [0, 140, 1684, 1050], alt, grupo, grupo);
  return `
    ${recorte(11, 'lara-fondo-flecha')}
    <div class="lara-fondo-auto" aria-hidden="true"></div>
    ${pieza('lara-auto', [855, 790, 295, 131], null, 'vehiculo-svg lara-auto-svg')}
    <div class="lara-fondo-moto" aria-hidden="true"></div>
    ${recorte(11, 'lara-etiquetas')}
    <div class="lara-moto" data-g="lara-moto">
      ${pieza('moto-recorrido', [0, 0, 172, 88], 'lara-moto-recorrido', 'vehiculo-svg')}
      ${pieza('moto-disparo', [0, 0, 172, 88], 'lara-moto-disparo', 'vehiculo-svg')}
    </div>
    <div class="lara-fondo-cuadro" aria-hidden="true"></div>
    ${recorte(12, 'lara-cuadro-uno', '1. La motocicleta se aproxima por el lado derecho')}
    <span class="lara-flecha-entrada" data-g="lara-flecha-entrada" aria-hidden="true"></span>
    ${recorte(13, 'lara-cuadro-dos', '2. La motocicleta se acerca al auto y dispara')}
    <span class="lara-linea" data-g="lara-linea" aria-hidden="true"></span>
    <span class="escena-impacto lara-impacto" data-g="lara-impacto" aria-hidden="true"></span>
    ${recorte(14, 'lara-cuadro-tres', '3. La moto huye de la escena y Lara Bonilla es llevado al hospital donde muere')}
    ${recorte(14, 'lara-flecha-salida')}
  `;
}

function animaLara(k) {
  k.sale('lara-etiquetas', 3.25, {}, { dur: 0.28 });
  k.entra('lara-cuadro-uno', 3.28, {}, { dur: 0.25 });
  k.entra('lara-flecha-entrada', 3.53, {}, { dur: 0.24 });
  k.tl.to(k.$('lara-moto'), {
    keyframes: [
      { x: -122, y: -116, duration: 0.34, ease: 'sine.inOut' },
      { x: -542, y: -116, duration: 0.58, ease: 'sine.inOut' },
    ],
  }, 3.65);
  k.entra('lara-moto-disparo', 4.86, {}, { dur: 0.06 });
  k.sale('lara-moto-recorrido', 4.86, {}, { dur: 0.06 });
  k.tl.to(k.$('lara-moto-recorrido'), { autoAlpha: 1, duration: 0.06 }, 5.55);
  k.sale('lara-moto-disparo', 5.55, {}, { dur: 0.06 });
  k.entra('lara-cuadro-dos', 4.63, {}, { dur: 0.16 });
  k.entra('lara-linea', 4.86, { scaleX: 0 }, { dur: 0.17 });
  animaImpacto(k, 'lara-impacto', 5.03);
  k.sale('lara-linea lara-impacto', 5.45, {}, { dur: 0.16 });
  k.sale('lara-flecha-entrada', 5.45, {}, { dur: 0.24 });
  k.entra('lara-cuadro-tres lara-flecha-salida', 5.55, {}, { dur: 0.16 });
  k.tl.to(k.$('lara-moto'), {
    keyframes: [
      { x: -760, y: -116, duration: 0.27, ease: 'sine.in' },
      { x: -910, y: -14, duration: 0.29, ease: 'sine.inOut' },
    ],
  }, 5.73);
}

function capasCano() {
  const recorte = (pagina, grupo, alt = '') =>
    foto(`escena-v02-${pagina}`, [0, 140, 1684, 1050], alt, grupo, grupo);
  return `
    ${recorte(17, 'cano-rotulo-sede', 'Sede de El Espectador')}
    ${recorte(21, 'cano-fondo-giro')}
    <div class="cano-fondo-cuadro" data-g="cano-fondo-cuadro" aria-hidden="true"></div>
    <div class="cano-calzada">
      ${pieza('lara-auto', [542, 857, 302, 142], 'cano-auto', 'vehiculo-svg')}
      ${pieza('cano-auto-chocado', [1510, 851, 167, 149], 'cano-chocado', 'vehiculo-svg')}
    </div>
    <div class="abs" data-g="cano-moto" style="left:245px;top:1112px">
      ${pieza('moto-recorrido', [0, 0, 150, 77], 'cano-moto-recorrido', 'vehiculo-svg')}
      ${pieza('moto-disparo', [0, 0, 150, 77], 'cano-moto-disparo', 'vehiculo-svg')}
    </div>
    ${recorte(20, 'cano-cuadro-tres', '3. Del otro lado lo esperaba una moto con dos sicarios')}
    ${recorte(21, 'cano-cuadro-cuatro', '4. La moto se acerca por la derecha y le dispara')}
    <span class="lara-linea cano-linea" data-g="cano-linea" aria-hidden="true"></span>
    <span class="escena-impacto cano-impacto" data-g="cano-impacto" aria-hidden="true"></span>
    ${recorte(22, 'cano-flecha-final')}
    <span class="cano-poste" data-g="cano-poste" aria-hidden="true"></span>
    ${recorte(22, 'cano-cuadro-cinco', '5. Guillermo Cano pierde el control del auto y choca contra un poste')}
  `;
}

function animaCano(k) {
  k.sale('cano-rotulo-sede', 4.83, {}, { dur: 0.22 });
  k.tl.set(k.$('cano-auto'), { rotation: 180 }, 4.83);
  k.entra('cano-auto', 4.83, { x: 84 }, { dur: 0.28 });
  k.sale('cano-fondo-cuadro', 5.08, {}, { dur: 0.14 });
  k.sale('cano-fondo-giro', 5.22, {}, { dur: 0.15 });
  const [auto] = k.$('cano-auto');
  const centroGiro = -164;
  const radioGiro = 82;
  k.tl.to(auto, { x: centroGiro, duration: 0.21, ease: 'sine.in' }, 5.32);
  k.tl.to(auto, {
    keyframes: [30, 60, 90, 120, 150, 180].map(grados => {
      const angulo = grados * Math.PI / 180;
      return {
        x: centroGiro - radioGiro * Math.sin(angulo),
        y: radioGiro * (1 - Math.cos(angulo)),
        rotation: 180 - grados,
        duration: 0.067,
        ease: 'none',
      };
    }),
  }, 5.53);
  k.tl.to(auto, { x: 18, duration: 0.2, ease: 'sine.out' }, 5.932);
  k.tl.to(k.$('cano-fondo-giro'), { autoAlpha: 1, duration: 0.15 }, 5.98);
  k.entra('cano-cuadro-tres cano-moto', 6.0, {}, { dur: 0.15 });
  k.tl.to(k.$('cano-moto'), { x: 468, y: 0, duration: 0.38, ease: 'sine.inOut' }, 6.15);
  k.tl.to(k.$('cano-auto'), { x: 164, y: 114, duration: 0.38, ease: 'sine.inOut' }, 6.15);
  k.entra('cano-cuadro-cuatro', 6.55, {}, { dur: 0.14 });
  k.entra('cano-moto-disparo', 6.71, {}, { dur: 0.06 });
  k.sale('cano-moto-recorrido', 6.71, {}, { dur: 0.06 });
  k.entra('cano-linea', 6.71, { scaleX: 0 }, { dur: 0.15 });
  animaImpacto(k, 'cano-impacto', 6.86);
  k.sale('cano-linea cano-impacto', 7.13, {}, { dur: 0.13 });
  k.entra('cano-cuadro-cinco cano-flecha-final cano-poste', 7.18, {}, { dur: 0.13 });
  k.tl.to(k.$('cano-auto'), {
    keyframes: [
      { x: 465, y: 76, rotation: -13, duration: 0.19, ease: 'sine.in' },
      { x: 837, y: 14, rotation: -17, duration: 0.22, ease: 'sine.in' },
      { x: 816, y: 22, rotation: -23, duration: 0.09, ease: 'sine.out' },
    ],
  }, 7.3);
  k.sale('cano-auto', 7.71, {}, { dur: 0.05 });
  k.entra('cano-chocado', 7.71, {}, { dur: 0.05 });
}

const ascensoAvianca = 'M 440 1005 C 610 1005 690 835 810 702 S 1060 545 1135 545';
const caidaAvianca = 'C 1260 545 1350 688 1510 824';

function vueloAvianca() {
  return `
    <svg class="abs" width="0" height="0" aria-hidden="true">
      <path data-g="avianca-ascenso" d="${ascensoAvianca}" />
      <path data-g="avianca-caida" d="M 1135 545 ${caidaAvianca}" />
    </svg>
    <div class="avianca-avion" data-g="avianca-avion" style="offset-path:path('${ascensoAvianca} ${caidaAvianca}')">
      ${foto('movimiento-v02-36', [0, 0, 500, 324], '', null, 'foto--libre')}
    </div>
    <span class="escena-impacto avianca-impacto" data-g="avianca-impacto" aria-hidden="true"></span>
    ${foto('escena-v02-37', [0, 140, 1684, 1050], 'Minutos luego del despegue el avión explota y cae', 'avianca-cuadro', 'avianca-cuadro')}
  `;
}

function animaVueloAvianca(k) {
  const [ascenso] = k.$('avianca-ascenso');
  const [caida] = k.$('avianca-caida');
  const [avion] = k.$('avianca-avion');
  const largoAscenso = ascenso.getTotalLength();
  const puntoDeExplosion = largoAscenso / (largoAscenso + caida.getTotalLength()) * 100;

  k.tl.to(avion, { offsetDistance: `${puntoDeExplosion}%`, duration: 1.12, ease: 'sine.inOut' }, 17.91);
  k.entra('avianca-cuadro', 18.88, {}, { dur: 0.16 });
  animaImpacto(k, 'avianca-impacto', 19.08);
  k.sale('avianca-impacto', 19.34, { scale: 0.8 }, { dur: 0.14 });
  k.tl.to(avion, { offsetDistance: '100%', duration: 0.62, ease: 'sine.inOut' }, 19.39);
}

export function botonReconstruccion(nombre, grupo, [x, y], atentado = false) {
  return `<button type="button" class="boton-reconstruccion" data-g="${grupo}" data-reconstruccion="${nombre}" style="left:${x}px;top:${y}px" aria-haspopup="dialog">
    Ver cómo ocurrió el ${atentado ? 'atentado' : 'asesinato'}
  </button>`;
}

export function inicioEscenaV02(nombre) {
  return fotogramas[nombre][0][1];
}

export function escenaV02(nombre, grupo) {
  return `<div class="escena" data-g="${grupo}">
    ${fotogramas[nombre].map(([pagina, , descripcion]) => {
      const movimiento = movimientos[pagina];
      const columna = paginas.indexOf(pagina) * 2;
      const bordeDerecho = columna + 1;
      const alt = descripcion.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
      return `<div class="fotograma-v02" data-g="v02-${pagina}">
        <div class="fondo-v02" style="--bordes:url('${fondoBordes}');--ancho-bordes:${columnasBordes * 100}%;--borde-izq:${columna / (columnasBordes - 1) * 100}%;--borde-der:${bordeDerecho / (columnasBordes - 1) * 100}%" aria-hidden="true"></div>
        ${foto(`escena-v02-${pagina === 27 ? 26 : pagina === 35 ? 36 : pagina === 11 ? 12 : pagina === 17 ? 19 : pagina}`, [0, 140, 1684, 1050], alt, null, 'imagen-fotograma-v02')}
        ${pagina === 31 ? pieza('espectador-camion', movimiento.rect, 'movimiento-31', 'vehiculo-svg') :
          pagina === 41 ? pieza('das-auto', movimiento.rect, 'movimiento-41', 'vehiculo-svg') : ''}
        ${explosiones[pagina] ? `
          ${foto(`escena-v02-${explosiones[pagina].pagina}`, [0, 140, 1684, 1050], explosiones[pagina].cuadro, `cuadro-explosion-${pagina}`, `cuadro-explosion-${pagina}`)}
          <span class="escena-impacto explosion-${pagina}" data-g="explosion-${pagina}" aria-hidden="true"></span>
        ` : ''}
        ${pagina === 11 ? capasLara() : ''}
        ${pagina === 35 ? vueloAvianca() : ''}
        ${pagina === 25 ? `
          <div class="galan-fondo-mano" aria-hidden="true"></div>
          <div class="galan-mano" data-g="galan-mano">
            ${pieza('galan-saludo', [-80, 0, 103, 242], null, 'vehiculo-svg')}
          </div>
        ` : ''}
        ${pagina === 27 ? `
          <div class="galan-lineas" data-g="galan-lineas" aria-hidden="true"></div>
          ${impactosGalan.map(([x, y], indice) => `
            <span class="escena-impacto" data-g="galan-impacto-${indice}" style="left:${x - 41}px;top:${y - 41}px" aria-hidden="true"></span>
          `).join('')}
          ${foto('escena-v02-27', [0, 140, 1684, 1050], '', 'galan-cuadro', 'galan-cuadro')}
        ` : ''}
        ${pagina === 17 ? capasCano() : ''}
      </div>`;
    }).join('')}
  </div>`;
}

function animaImpacto(k, grupo, tiempo) {
  k.entra(grupo, tiempo, { scale: 0.55 }, { dur: 0.09 });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const [destello] = k.$(grupo);
  k.tl.to(destello, {
    keyframes: [-4, 4, -2, 0].map(x => ({ x, duration: 0.045 })),
  }, tiempo + 0.09);
  k.tl.to(destello.closest('.escena'), {
    keyframes: [
      { x: -8, y: 4 },
      { x: 6, y: -3 },
      { x: -3, y: 2 },
      { x: 0, y: 0 },
    ].map(posicion => ({ ...posicion, duration: 0.03, ease: 'none' })),
  }, tiempo + 0.09);
}

export function animaEscenaV02(k, nombre, grupo) {
  const frames = fotogramas[nombre];
  k.entra(grupo, frames[0][1], {}, { dur: 0.2, ease: 'none' });
  if (nombre === 'lara') animaLara(k);
  if (nombre === 'cano') animaCano(k);
  if (nombre === 'avianca') animaVueloAvianca(k);
  if (nombre === 'galan') {
    k.tl.to(k.$('galan-mano'), {
      keyframes: [12, -11, 12, -11, 0].map(rotation => ({ rotation, duration: 0.18, ease: 'sine.inOut' })),
    }, 9.48);
    k.entra('galan-lineas', 11.05, {}, { dur: 0.12 });
    impactosGalan.forEach((_, indice) => {
      const grupo = `galan-impacto-${indice}`;
      const tiempo = 11.3 + indice * 0.14;
      animaImpacto(k, grupo, tiempo);
    });
    k.entra('galan-cuadro', 11.3, {}, { dur: 0.14 });
  }
  for (let i = 1; i < frames.length; i++) {
    const [pagina, t] = frames[i];
    const anterior = frames[i - 1][0];
    const movimiento = movimientos[pagina];
    const dur = movimiento ? 0.12 : 0.32;
    k.entra(`v02-${pagina}`, t, {}, { dur, ease: 'sine.inOut' });
    k.sale(`v02-${anterior}`, t + dur, {}, { dur: 0.1, ease: 'sine.out' });
    const explosion = explosiones[pagina];
    if (explosion) {
      k.entra(`cuadro-explosion-${pagina}`, explosion.tiempo, {}, { dur: 0.14 });
      animaImpacto(k, `explosion-${pagina}`, explosion.tiempo);
    }
    if (movimiento) {
      const selector = `movimiento-${pagina}`;
      const pieza = k.$(selector);
      k.oculta(selector);
      k.tl.set(pieza, { ...movimiento.desde, autoAlpha: 1 }, t + dur);
      k.tl.to(pieza, { x: 0, y: 0, rotation: 0, duration: movimiento.dur, ease: 'power2.inOut' }, t + dur);
    }
  }
}
