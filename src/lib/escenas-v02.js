import { foto } from './ui.js';
import fondoBordes from '../assets/bordes-escenas-v02.png';

const fotogramas = {
  lara: [
    [11, 2.65, "30 de abril - bogotá calle 127 | cruce y entorno de la autopista norte Automóvil de Lara Bonilla Conducido por su chofer Motocicleta con dos ocupantes"],
    [12, 3.35, "30 de abril - bogotá calle 127 | cruce y entorno de la autopista norte La motocicleta se aproxima por el lado derecho 1"],
    [13, 4.67, "30 de abril - bogotá calle 127 | cruce y entorno de la autopista norte La motocicleta se aproxima por el lado derecho 1 La motocicleta se acerca al auto y dispara 2"],
    [14, 5.8, "30 de abril - bogotá calle 127 | cruce y entorno de la autopista norte La motocicleta se aproxima por el lado derecho 1 La motocicleta se acerca al auto y dispara 2 La moto huye de la escena y Lara Bonilla es llevado al hospital donde muere 3"],
  ],
  cano: [
    [17, 4.45, "17 de diciembre - bogotá calle 22 | avenida 68 sede del espectador Sede de \"El Espectador\" Automóvil de Guillermo Cano"],
    [18, 4.8, "17 de diciembre - bogotá calle 22 | avenida 68 sede del espectador Guillermo Cano sale del edificio del diario \"El Espectador\" 1 Se sube a su auto para regresar a su casa y realiza un giro en \"U\" 2"],
    [19, 5.9, "17 de diciembre - bogotá calle 22 | avenida 68 sede del espectador Guillermo Cano sale del edificio del diario \"El Espectador\" 1 Se sube a su auto para regresar a su casa y realiza un giro en \"U\" 2"],
    [20, 6.62, "17 de diciembre - bogotá calle 22 | avenida 68 sede del espectador Guillermo Cano sale del edificio del diario \"El Espectador\" 1 Se sube a su auto para regresar a su casa y realiza un giro en \"U\" Del otro lado lo esperaba una moto con dos sicarios 2 3"],
    [21, 7.05, "17 de diciembre - bogotá calle 22 | avenida 68 sede del espectador Guillermo Cano sale del edificio del diario \"El Espectador\" 1 Se sube a su auto para regresar a su casa y realiza un giro en \"U\" Del otro lado lo esperaba una moto con dos sicarios La moto se acerca por la derecha y le dispara 2 3 4"],
    [22, 7.33, "17 de diciembre - bogotá calle 22 | avenida 68 sede del espectador Guillermo Cano sale del edificio del diario \"El Espectador\" 1 Se sube a su auto para regresar a su casa y realiza un giro en \"U\" Del otro lado lo esperaba una moto con dos sicarios La moto se acerca por la derecha y le dispara Guillermo Cano pierde el control del auto y choca contra un poste 2 3 4 5"],
  ],
  galan: [
    [25, 9.25, "Luis Carlos Galán se encontraba en un acto electoral junto a sus dos escoltas 1 18 de agosto - cundinamarca calle 12 | carrera 7 parque alfonso lópez pumarejo"],
    [26, 10.6, "Luis Carlos Galán se encontraba en un acto electoral junto a sus dos escoltas 1 18 de agosto - cundinamarca calle 12 | carrera 7 parque alfonso lópez pumarejo Entre la multitud se encontraban dos sicarios 2"],
    [27, 11.05, "Luis Carlos Galán se encontraba en un acto electoral junto a sus dos escoltas 1 18 de agosto - cundinamarca calle 12 | carrera 7 parque alfonso lópez pumarejo Los sicarios disparan cinco veces, matando a Galán y a sus dos acompañantes 3 Entre la multitud se encontraban dos sicarios 2"],
  ],
  espectador: [
    [30, 13.85, "2 de septiembre - bogotá calle 22 | avenida 68 sede del espectador Sede de \"El Espectador\""],
    [31, 14.45, "2 de septiembre - bogotá calle 22 | avenida 68 sede del espectador Un camión con 170 kg de dinamita se posiciona frente al edificio de \"El Espectador\" 1"],
    [32, 15.3, "2 de septiembre - bogotá calle 22 | avenida 68 sede del espectador Un camión con 170 kg de dinamita se posiciona frente al edificio de \"El Espectador\" 1 La bomba explota a las 6:35 am, desintegrando el camión por completo y destruyendo parte del edifcio 2"],
  ],
  avianca: [
    [35, 17.65, "27 de noviembre - bogotá aeropuerto \"el dorado\" Un Boeing de Avianca despega de El Dorado hacia Cali con 101 pasajeros y 6 tripulantes 1"],
  ],
  das: [
    [40, 21.85, "6 de diciembre - bogotá carrera 27| calle 18 departamento de seguridad Edificio del \"DAS\""],
    [41, 22.45, "6 de diciembre - bogotá carrera 27| calle 18 departamento de seguridad Un cochebomba se posiciona frente al edificio del DAS 1"],
    [42, 23.3, "6 de diciembre - bogotá carrera 27| calle 18 departamento de seguridad Un cochebomba se posiciona frente al edificio del DAS 1 A las 7:30 am el cochebomba explota junto al edifcio 2"],
  ],
};

const movimientos = {
  13: { rect: [748, 691, 185, 99], desde: { x: 585, y: 82, rotation: 12 }, dur: 0.44 },
  19: { rect: [554, 1028, 302, 142], desde: { x: -16, y: -162, rotation: 180 }, dur: 0.52 },
  31: { rect: [602, 824, 416, 179], desde: { x: 850 }, dur: 0.55 },
  41: { rect: [874, 848, 350, 161], desde: { x: 850 }, dur: 0.55 },
};

// Disparos de Lara y Cano, y explosiones de El Espectador, Avianca y el DAS.
const fotogramasConTemblor = new Set([13, 21, 32, 42]);

const impactosGalan = [[936, 473], [955, 511], [990, 496], [1020, 519], [1054, 482]];

const paginas = [...Object.values(fotogramas).flat().map(([pagina]) => pagina), 36, 37].sort((a, b) => a - b);
const columnasBordes = paginas.length * 2;

const ascensoAvianca = 'M 440 1005 C 610 1005 690 835 810 702 S 1085 465 1135 560';
const caidaAvianca = 'C 1190 665 1320 700 1390 925';

function vueloAvianca() {
  return `
    <svg class="avianca-recorrido" viewBox="0 0 1684 1190" aria-hidden="true">
      <path data-g="avianca-ascenso" d="${ascensoAvianca}" pathLength="1" />
      <path data-g="avianca-caida" d="M 1135 560 ${caidaAvianca}" pathLength="1" />
    </svg>
    <div class="avianca-avion" data-g="avianca-avion" style="offset-path:path('${ascensoAvianca} ${caidaAvianca}')">
      ${foto('movimiento-v02-36', [0, 0, 500, 324], '', null, 'foto--libre')}
    </div>
    <span class="galan-impacto avianca-impacto" data-g="avianca-impacto" aria-hidden="true"></span>
    ${foto('escena-v02-37', [0, 140, 1684, 1050], 'Minutos luego del despegue el avión explota y cae', 'avianca-cuadro', 'avianca-cuadro')}
  `;
}

function animaVueloAvianca(k) {
  const [ascenso] = k.$('avianca-ascenso');
  const [caida] = k.$('avianca-caida');
  const [avion] = k.$('avianca-avion');
  const largoAscenso = ascenso.getTotalLength();
  const puntoDeExplosion = largoAscenso / (largoAscenso + caida.getTotalLength()) * 100;

  k.tl.to(ascenso, { strokeDashoffset: 0, duration: 1.12, ease: 'sine.inOut' }, 17.91);
  k.tl.to(avion, { offsetDistance: `${puntoDeExplosion}%`, duration: 1.12, ease: 'sine.inOut' }, 17.91);
  k.entra('avianca-impacto', 19.03, { scale: 0.65 }, { dur: 0.09 });
  tiembla(k, 'avianca-impacto', 19.12);
  k.entra('avianca-cuadro', 19.05, {}, { dur: 0.16 });
  k.sale('avianca-impacto', 19.35, { scale: 0.8 }, { dur: 0.16 });
  k.tl.to(caida, { strokeDashoffset: 0, duration: 0.73, ease: 'power1.in' }, 19.13);
  k.tl.to(avion, { offsetDistance: '100%', scale: 0.72, duration: 0.73, ease: 'power1.in' }, 19.13);
}

export function escenaV02(nombre, grupo) {
  return `<div class="escena" data-g="${grupo}">
    ${fotogramas[nombre].map(([pagina, , descripcion]) => {
      const movimiento = movimientos[pagina];
      const columna = paginas.indexOf(pagina) * 2;
      // En el último fotograma de Cano, el auto llega al borde derecho.
      // Rellenamos ese margen con el fondo del fotograma anterior.
      const bordeDerecho = pagina === 22 ? paginas.indexOf(21) * 2 + 1 : columna + 1;
      const alt = descripcion.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
      return `<div class="fotograma-v02" data-g="v02-${pagina}">
        <div class="fondo-v02" style="--bordes:url('${fondoBordes}');--ancho-bordes:${columnasBordes * 100}%;--borde-izq:${columna / (columnasBordes - 1) * 100}%;--borde-der:${bordeDerecho / (columnasBordes - 1) * 100}%" aria-hidden="true"></div>
        ${foto(`escena-v02-${pagina === 27 ? 26 : pagina === 35 ? 36 : pagina}`, [0, 140, 1684, 1050], alt, null, 'imagen-fotograma-v02')}
        ${pagina === 35 ? vueloAvianca() : ''}
        ${pagina === 25 ? `
          <div class="galan-fondo-mano" aria-hidden="true"></div>
          ${foto('escena-v02-25', [0, 140, 1684, 1050], '', 'galan-mano', 'galan-mano')}
        ` : ''}
        ${pagina === 27 ? `
          <div class="galan-lineas" data-g="galan-lineas" aria-hidden="true"></div>
          ${impactosGalan.map(([x, y], indice) => `
            <span class="galan-impacto" data-g="galan-impacto-${indice}" style="left:${x - 41}px;top:${y - 41}px" aria-hidden="true"></span>
          `).join('')}
          ${foto('escena-v02-27', [0, 140, 1684, 1050], '', 'galan-cuadro', 'galan-cuadro')}
        ` : ''}
        ${pagina === 22 ? '<div class="calzada-final-cano" aria-hidden="true"></div>' : ''}
        ${movimiento ? foto(`movimiento-v02-${pagina}`, movimiento.rect, '', `movimiento-${pagina}`, 'foto--libre') : ''}
      </div>`;
    }).join('')}
  </div>`;
}

function tiembla(k, grupo, tiempo) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  k.tl.to(k.$(grupo), {
    keyframes: [-4, 4, -2, 0].map(x => ({ x, duration: 0.045 })),
  }, tiempo);
}

export function animaEscenaV02(k, nombre, grupo) {
  const frames = fotogramas[nombre];
  k.entra(grupo, frames[0][1], {}, { dur: 0.2, ease: 'none' });
  if (nombre === 'avianca') animaVueloAvianca(k);
  if (nombre === 'galan') {
    k.tl.to(k.$('galan-mano'), {
      keyframes: [12, -11, 12, -11, 0].map(rotation => ({ rotation, duration: 0.18, ease: 'sine.inOut' })),
    }, 9.48);
    k.entra('galan-lineas', 11.05, {}, { dur: 0.12 });
    impactosGalan.forEach((_, indice) => {
      const grupo = `galan-impacto-${indice}`;
      const tiempo = 11.3 + indice * 0.14;
      k.entra(grupo, tiempo, { scale: 0.6 }, { dur: 0.08 });
      tiembla(k, grupo, tiempo + 0.08);
    });
    k.entra('galan-cuadro', 11.3, {}, { dur: 0.14 });
  }
  for (let i = 1; i < frames.length; i++) {
    const [pagina, t] = frames[i];
    const anterior = frames[i - 1][0];
    const movimiento = movimientos[pagina];
    const dur = movimiento ? 0.06 : 0.22;
    k.entra(`v02-${pagina}`, t, {}, { dur, ease: 'none' });
    k.sale(`v02-${anterior}`, t + dur, {}, { dur: 0.05, ease: 'none' });
    if (fotogramasConTemblor.has(pagina)) {
      tiembla(k, `v02-${pagina}`, t + dur + (movimiento?.dur ?? 0));
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
