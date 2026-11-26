import { foto } from './ui.js';

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
    [27, 11.5, "Luis Carlos Galán se encontraba en un acto electoral junto a sus dos escoltas 1 18 de agosto - cundinamarca calle 12 | carrera 7 parque alfonso lópez pumarejo Los sicarios disparan cinco veces, matando a Galán y a sus dos acompañantes 3 Entre la multitud se encontraban dos sicarios 2"],
  ],
  espectador: [
    [30, 13.85, "2 de septiembre - bogotá calle 22 | avenida 68 sede del espectador Sede de \"El Espectador\""],
    [31, 14.45, "2 de septiembre - bogotá calle 22 | avenida 68 sede del espectador Un camión con 170 kg de dinamita se posiciona frente al edificio de \"El Espectador\" 1"],
    [32, 15.3, "2 de septiembre - bogotá calle 22 | avenida 68 sede del espectador Un camión con 170 kg de dinamita se posiciona frente al edificio de \"El Espectador\" 1 La bomba explota a las 6:35 am, desintegrando el camión por completo y destruyendo parte del edifcio 2"],
  ],
  avianca: [
    [35, 17.65, "27 de noviembre - bogotá aeropuerto \"el dorado\" Un Boeing de Avianca despega de El Dorado hacia Cali con 101 pasajeros y 6 tripulantes 1"],
    [36, 18.25, "27 de noviembre - bogotá aeropuerto \"el dorado\" Un Boeing de Avianca despega de El Dorado hacia Cali con 101 pasajeros y 6 tripulantes 1"],
    [37, 19.3, "27 de noviembre - bogotá aeropuerto \"el dorado\" Un Boeing de Avianca despega de El Dorado hacia Cali con 101 pasajeros y 6 tripulantes 1 Minutos luego del despegue el avión explota y cae 2"],
  ],
  das: [
    [40, 21.85, "6 de diciembre - bogotá carrera 27| calle 18 departamento de seguridad Edificio del \"DAS\""],
    [41, 22.45, "6 de diciembre - bogotá carrera 27| calle 18 departamento de seguridad Un cochebomba se posiciona frente al edificio del DAS 1"],
    [42, 23.3, "6 de diciembre - bogotá carrera 27| calle 18 departamento de seguridad Un cochebomba se posiciona frente al edificio del DAS 1 A las 7:30 am el cochebomba explota junto al edifcio 2"],
  ],
};

export function escenaV02(nombre, grupo) {
  return `<div class="escena" data-g="${grupo}">
    ${fotogramas[nombre].map(([pagina, , descripcion]) =>
      foto(`escena-v02-${pagina}`, [0, 140, 1684, 1050], descripcion.replaceAll('&', '&amp;').replaceAll('"', '&quot;'), `v02-${pagina}`)
    ).join('')}
  </div>`;
}

export function animaEscenaV02(k, nombre, grupo) {
  const frames = fotogramas[nombre];
  k.entra(grupo, frames[0][1], {}, { dur: 0.2, ease: 'none' });
  for (let i = 1; i < frames.length; i++) {
    const [pagina, t] = frames[i];
    const anterior = frames[i - 1][0];
    k.entra(`v02-${pagina}`, t, {}, { dur: 0.14, ease: 'none' });
    k.sale(`v02-${anterior}`, t + 0.14, {}, { dur: 0.08, ease: 'none' });
  }
}
