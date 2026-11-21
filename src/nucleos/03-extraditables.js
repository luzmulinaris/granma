// NÚCLEO 3 · Los crímenes de los extraditables — p. 14 a 32 del PDF
import geo from '../data/geo.json';
import { foto, pieza, titulo, texto, evento, paso, svg, fondos, via, edificio, camion, miles } from '../lib/ui.js';

// Los cinco hitos (p.15, 19, 23, 26 y 29) comparten la misma maqueta.
const hito = (g, fecha, sub, ps) =>
  evento({ g, y: 376, desde: 116, fecha, yFecha: 340, sub, ySub: 406, ps, yTxt: 436 });

const VENTANAS_CH = [[205, 302, 406, 511], [314, 409, 503], 49];
const VENTANAS_GR = [[94, 252, 422, 595], [322, 477, 632], 80];

const esSicario = ([x, y]) => geo.sicarios.some(([sx, sy]) => Math.abs(sx - x) < 2 && Math.abs(sy - y) < 2);
const multitud = geo.multitud
  .map(
    (p) =>
      `<g class="per" data-g="${esSicario(p) ? 'per sic' : 'per'}" transform="translate(${p[0]} ${p[1]})">` +
      `<circle cy="-7.3" r="9.84"/><path d="M-13.65 17.1C-4.55-2.6 4.55-2.6 13.65 17.1"/></g>`,
  )
  .join('');

export default {
  id: 'extraditables',
  nombre: 'Los crímenes de los extraditables',
  pasos: 26,

  html: () => `
    <!-- p.14 · noviembre 1986 -->
    ${foto('extraditables', [67.6, 432, 652.2, 489.3], 'Pablo Escobar rodeado de familiares y allegados en una reunión', 'ext')}
    ${texto('txt', '<p>Su propósito era impedir a toda costa la extradición de ciudadanos colombianos hacia los Estados Unidos, bajo el tratado bilateral existente en ese entonces.</p>', 733, 430, 284, 'proposito')}
    ${texto('cita', '"Prefiero una tumba en Colombia,', 908, 494, null, 'cita')}
    ${texto('cita', 'que una carcel en Estados Unidos"', 920, 547, null, 'cita')}
    ${evento({
      g: 'e1', x: 828, y: 782, desde: 634, fecha: 'noviembre 1986', yFecha: 749,
      ps: [
        'Los Extraditables recurren a amenazas, secuestros y atentados para presionar al Estado y evitar su envío a Estados Unidos.',
        'La extradición se convierte en un eje de la confrontación.',
      ],
      yTxt: 814, xTxt: 849,
    })}

    <!-- p.15 · Guillermo Cano -->
    ${hito('e2', 'diciembre de 1986', 'Asesinato de Guillermo Cano', [
      'El 17 de diciembre es asesinado el director de El Espectador. El periodista había denunciado el narcotráfico y los antecedentes de Escobar.',
      'La violencia alcanza también a quienes investigan y publican.',
    ])}
    ${foto('cano', [67.6, 330.5, 745.9, 622.8], 'Tapa de El Espectador: «Asesinado el director de El Espectador»', 'cano')}

    <!-- p.19 · Luis Carlos Galán -->
    ${hito('e3', 'agosto de 1989', 'Asesinato de Luis Carlos Galán', [
      'El 18 de agosto es asesinado en Soacha el candidato presidencial Luis Carlos Galán.',
      'Su oposición al narcotráfico y su defensa de la extradición lo habían convertido en un objetivo.',
    ])}
    ${foto('galan', [43.1, 343.9, 755.5, 514.3], 'Tarima del acto de Soacha en el momento del atentado contra Galán', 'galan')}

    <!-- p.23 · El Espectador -->
    ${hito('e4', 'septiembre de 1989', 'Atentado a El Espectador', [
      'El 2 de septiembre una bomba destruye parte de las instalaciones del periódico en Bogotá.',
      'La ofensiva busca silenciar las denuncias periodísticas',
    ])}
    ${foto('espectador-1', [50.8, 265.3, 748.9, 421.2], 'Instalaciones de El Espectador destruidas por la bomba', 'esp1')}
    ${foto('espectador-2', [303.2, 576, 666.6, 457.7], 'Fachada de El Espectador entre escombros', 'esp2')}

    <!-- p.26 · Avianca -->
    ${hito('e5', 'noviembre de 1989', 'El vuelo 203 de Avianca', [
      'El 27 de noviembre una bomba destruye el avión en vuelo. Mueren las 107 personas que iban a bordo.',
      'La violencia alcanza a pasajeros y tripulantes civiles.',
    ])}
    ${foto('avianca-1', [50.8, 265.3, 748.9, 454.4], 'Restos del fuselaje del vuelo 203 de Avianca', 'av1')}
    ${foto('avianca-2', [301.5, 609.4, 665.6, 354.8], 'Rescatistas entre los restos del avión', 'av2')}

    <!-- p.29 · DAS -->
    ${hito('e6', 'diciembre de 1989', 'La bomba contra el DAS', [
      'El 6 de diciembre un carro bomba explota junto a la sede del Departamento Administrativo de Seguridad en Bogotá.',
      'El atentado afecta también a las personas y las viviendas del entorno.',
    ])}
    ${foto('das-1', [50.8, 265.3, 748.9, 454.4], 'Edificio del DAS tras la explosión', 'das1')}
    ${foto('das-2', [202.3, 562.5, 680.9, 458.8], 'Autos y edificios destruidos frente al DAS', 'das2')}
    ${foto('das-3', [561.3, 620.8, 540.6, 526.2], 'Tapa de El Mundo: «Embestida de muerte»', 'das3')}

    <div class="cabeza" data-g="cabeza">${titulo('Los crímenes de los extraditables', 57, 240)}</div>
    <div class="cabeza" data-g="cab2">
      ${texto('bajada', 'Los Extraditables fue una organización armada y de narcoterrorismo fundada el 6 de noviembre 1986 por los principales líderes del Cártel de Medellín, encabezada por Pablo Escobar Gaviria.', 63, 334, 1180, 'bajada')}
    </div>

    <!-- p.16 a 18 · asesinato de Cano -->
    <div class="escena" data-g="esc-cano">
      ${fondos([140, 530, '#f5f5f3'], [670, 3000, '#e9e9e3'])}
      ${svg(`
        ${via(1019)}
        <g data-g="cano-edif">${edificio([164, 270, 442, 338], ...VENTANAS_CH)}</g>
        <line data-g="cano-rot-auto" x1="646" y1="972" x2="646" y2="1080" stroke="#9a9a9a" stroke-width="1.5"/>
        <line data-g="cano-rot-moto" x1="738" y1="783" x2="804" y2="783" stroke="#fe1003" stroke-width="1.3"/>
      `)}
      ${pieza('auto', [478.4, 836.1, 318.5, 136.3], 'cano-auto')}
      ${pieza('moto', [555.7, 749, 165.4, 68.2], 'cano-moto')}
      ${pieza('estallido', [554.3, 826.5, 90.9, 86.6], 'cano-bang')}
      ${texto('rotulo', 'Automóvil de Guillermo Cano', 473, 1099, null, 'cano-rot-auto')}
      ${texto('rotulo rotulo--rojo', 'Motocicleta con dos sicarios', 818, 759, null, 'cano-rot-moto')}
      ${paso(1, 'Guillermo Cano sale del edificio del diario "El Espectador"', 654, 408, 'c1')}
      ${paso(2, 'Se sube a su auto para regresar a su casa', 828, 874, 'c2')}
      ${paso(3, 'Aparece una moto con 2 sicarios que le disparan y lo matan', 206, 754, 'c3')}
    </div>

    <!-- p.20 a 22 · asesinato de Galán -->
    <div class="escena" data-g="esc-galan">
      ${fondos([140, 3000, '#f5f5f3'])}
      ${svg(`
        <rect data-g="tarima" x="445" y="387" width="695" height="270" fill="#dfdfdc" stroke="#1b1b1b" stroke-width="2.8"/>
        ${multitud}
      `)}
      ${pieza('tarima-persona', [599.6, 462.5, 43.1, 84.2], 'orador')}
      ${pieza('tarima-persona', [669.8, 457.8, 43.1, 84.2], 'orador')}
      ${pieza('tarima-persona', [738.8, 462.5, 43.1, 84.2], 'orador')}
      ${geo.disparos_p22.map((r) => pieza('estallido', r, 'galan-bang')).join('')}
      ${paso(1, 'Luis Carlos Galán se encontraba en una tarima en un acto electoral', 856, 466, 'g1')}
      ${paso(2, 'Entre la multitud se encontraban dos sicarios', 1326, 646, 'g2')}
      ${paso(3, 'Los sicarios disparan cinco veces, matando a Galán y a sus dos acompañantes', 320, 565, 'g3')}
    </div>

    <!-- p.24 y 25 · bomba en El Espectador -->
    <div class="escena" data-g="esc-esp">
      ${fondos([140, 715, '#f5f5f3'], [855, 3000, '#e9e9e3'])}
      ${svg(`
        ${via(1025)}
        <g data-g="esp-edif">${edificio([27, 250, 723, 552], ...VENTANAS_GR)}</g>
        ${camion('esp-camion')}
      `)}
      ${pieza('estallido', [217, 696, 310, 295], 'esp-bang')}
      ${paso(1, 'Un camión con 170 kg de dinamita se posiciona frente al edificio de "El Espectador"', 730, 938, 's1')}
      ${paso(2, 'La bomba explota a las 6:35 am, dejando 70 heridos', 778, 751, 's2')}
    </div>

    <!-- p.27 y 28 · vuelo 203 -->
    <div class="escena" data-g="esc-avi">
      ${fondos([140, 3000, '#f5f5f3'])}
      ${pieza('montanas', [-41.3, 804.6, 1782.4, 154.3], 'montanas')}
      ${pieza('flecha-sube', [342.1, 610, 147.8, 179.2], 'sube')}
      ${pieza('avion', [514.2, 383.8, 536.7, 328.4], 'avion')}
      ${pieza('estallido', [642, 475, 208, 197], 'avi-bang')}
      ${pieza('flecha-cae', [1024.6, 664.4, 155.4, 179.8], 'cae')}
      ${paso(1, 'Un Boeing de Avianca despega de El Dorado hacia Cali con 101 pasajeros y 6 tripulantes', 395, 769, 'a1')}
      ${paso(2, 'Minutos luego del despegue el avión explota y cae', 988, 404, 'a2')}
    </div>

    <!-- p.30 y 31 · bomba contra el DAS -->
    <div class="escena" data-g="esc-das">
      ${fondos([140, 715, '#f5f5f3'], [855, 3000, '#e9e9e3'])}
      ${svg(`
        ${via(1025)}
        <g data-g="das-edif">
          ${edificio([750, 421, 492, 382])}
          ${edificio([27, 250, 723, 552], ...VENTANAS_GR)}
        </g>
        ${camion('das-camion')}
      `)}
      ${pieza('estallido', [261, 780, 252, 240], 'das-bang')}
      ${paso(1, 'Un cochebomba se posiciona frente al edificio del DAS', 730, 946, 'd1')}
      ${paso(2, 'El cochebomba explota dejando 60 muertos y 300 heridos', 890, 322, 'd2')}
    </div>

    <!-- p.32 · balance de los atentados -->
    <div data-g="grafico">
      ${texto('num-grande', '550', 159, 492, null, 'n550')}
      ${texto('vers', 'policías asesinados<br>por escobar y el cartel', 159, 586, null, 'cap')}
      ${texto('vers vers--der', 'civiles fallecidos', 454, 527, 400, 'rot1')}
      ${texto('vers vers--der', 'personas lesionadas', 451, 624, 400, 'rot2')}
      ${svg([885, 1042, 1199, 1356, 1513].map((x) => `<line data-g="eje" x1="${x}" y1="504" x2="${x}" y2="696" stroke="#dcdcd8" stroke-width="1.2"/>`).join(''))}
      ${[0, 500, 1000, 1500, 2000].map((v, i) => texto('eje', v, 885 + i * 157, 693, null, 'eje')).join('')}
      <div class="barra" data-g="b1" style="left:885px;top:511px;width:124px;height:60px;background:#ee2c35"><b data-g="v1">410</b></div>
      <div class="barra" data-g="b2" style="left:885px;top:609px;width:547px;height:60px;background:#221a22"><b data-g="v2">1.710</b></div>
    </div>
  `,

  build(k) {
    const { tl, $ } = k;
    const vuelveCabeza = (t) => k.vuelve('cabeza', t, {}, { dur: 0.25 });
    const hitoFuera = (g, fotos, t) => {
      k.sale(`cabeza ${fotos}`, t, {}, { dur: 0.25 });
      k.sale(`${g}-l ${g}-p ${g}-f ${g}-s ${g}-t`, t, {}, { dur: 0.25 });
    };

    // ---------------------------------------------- p.14 · noviembre 1986
    k.cabeza();
    k.barre('ext', 0.25, 'izq', { dur: 0.55 });
    k.entra('proposito', 0.95, { y: 20 }, { dur: 0.3 });
    k.entra('cita', 1.2, { x: -50, clipPath: 'inset(0% 100% 0% 0%)' }, { dur: 0.4, stagger: 0.18, ease: 'power3.out' });
    k.evento('e1', 2.0);

    // ---------------------------------------------- p.15 · Guillermo Cano
    k.sale('ext proposito cita cab2', 3.0, { y: -30 }, { dur: 0.25 });
    k.saleEvento('e1', 3.0, -30);
    k.evento('e2', 3.15);
    k.barre('cano', 3.55, 'arriba', { dur: 0.45 });

    // p.16 · aparece la escena y se forma el primer cuadro
    hitoFuera('e2', 'cano', 4.3);
    k.entra('esc-cano', 4.45, {}, { dur: 0.3, ease: 'none' });
    k.entra('cano-edif', 4.6, { y: 60 }, { dur: 0.3 });
    k.paso('c1', 4.8);
    // p.17 · aparece el auto y el segundo cuadro
    k.entra('cano-auto', 5.4, { x: 1300 }, { dur: 0.5, ease: 'power3.out' });
    k.entra('cano-rot-auto', 5.85, { y: 10 }, { dur: 0.15 });
    k.paso('c2', 5.9);
    // p.18 · aparece la moto que dispara y el tercer cuadro
    k.entra('cano-moto', 6.5, { x: 1200 }, { dur: 0.45, ease: 'power3.out' });
    k.entra('cano-rot-moto', 6.9, { x: 20 }, { dur: 0.15 });
    k.estalla('cano-bang', 6.95, 'cano-auto');
    k.paso('c3', 7.05);

    // ---------------------------------------------- p.19 · Luis Carlos Galán
    k.sale('esc-cano', 7.8, {}, { dur: 0.25 });
    vuelveCabeza(7.9);
    k.evento('e3', 7.95);
    k.barre('galan', 8.35, 'izq', { dur: 0.45 });

    // p.20 · la tarima, la multitud y el primer cuadro
    hitoFuera('e3', 'galan', 9.1);
    k.entra('esc-galan', 9.25, {}, { dur: 0.3, ease: 'none' });
    k.entra('tarima', 9.35, { y: 40 }, { dur: 0.25 });
    k.entra('orador', 9.5, { scale: 0, transformOrigin: '50% 100%' }, { dur: 0.2, stagger: 0.06, ease: 'back.out(2)' });
    k.entra('per', 9.45, { scale: 0, transformOrigin: '50% 50%' }, { dur: 0.15, stagger: { amount: 0.45, from: 'random' }, ease: 'back.out(2)' });
    k.paso('g1', 9.75);
    // p.21 · se colorean dos personas de la multitud
    tl.to($('sic'), { color: '#d91403', scale: 1.5, duration: 0.2, stagger: 0.1, ease: 'back.out(3)' }, 10.45).to(
      $('sic'),
      { scale: 1, duration: 0.15, stagger: 0.1 },
      10.7,
    );
    k.paso('g2', 10.6);
    // p.22 · los disparos
    k.estalla('galan-bang', 11.3, 'tarima orador');
    k.paso('g3', 11.5);

    // ---------------------------------------------- p.23 · El Espectador
    k.sale('esc-galan', 12.2, {}, { dur: 0.25 });
    vuelveCabeza(12.3);
    k.evento('e4', 12.35);
    k.entra('esp1', 12.75, { y: 120 }, { dur: 0.35 });
    k.entra('esp2', 13.05, { y: 160, rotation: 2 }, { dur: 0.35 });

    // p.24 · el camión se posiciona
    hitoFuera('e4', 'esp1 esp2', 13.7);
    k.entra('esc-esp', 13.85, {}, { dur: 0.3, ease: 'none' });
    k.entra('esp-edif', 13.95, { y: 60 }, { dur: 0.25 });
    k.entra('esp-camion', 14.0, { x: -1100 }, { dur: 0.55, ease: 'power3.out' });
    k.paso('s1', 14.45);
    // p.25 · estallido
    k.estalla('esp-bang', 15.15, 'esp-edif esp-camion');
    k.paso('s2', 15.3);

    // ---------------------------------------------- p.26 · Avianca
    k.sale('esc-esp', 16.0, {}, { dur: 0.25 });
    vuelveCabeza(16.1);
    k.evento('e5', 16.15);
    k.entra('av1', 16.55, { y: 120 }, { dur: 0.35 });
    k.entra('av2', 16.85, { y: 160, rotation: -2 }, { dur: 0.35 });

    // p.27 · despega y se forma la flecha hacia arriba
    hitoFuera('e5', 'av1 av2', 17.5);
    k.entra('esc-avi', 17.65, {}, { dur: 0.3, ease: 'none' });
    k.entra('montanas', 17.7, { y: 80 }, { dur: 0.3 });
    k.entra('avion', 17.75, { x: -620, y: 330, rotation: 14, scale: 0.7 }, { dur: 0.7, ease: 'power2.out' });
    k.barre('sube', 18.1, 'abajo', { dur: 0.3 });
    k.paso('a1', 18.25);
    // p.28 · estalla, cuadro 2, la flecha indica que cae
    k.sale('sube', 18.95, {}, { dur: 0.15 });
    tl.to($('avion'), { rotation: 30, x: -20, y: 26, duration: 0.35, ease: 'power2.inOut' }, 19.0);
    k.estalla('avi-bang', 19.2, 'avion');
    k.paso('a2', 19.3);
    k.barre('cae', 19.45, 'arriba', { dur: 0.3 });

    // ---------------------------------------------- p.29 · DAS
    k.sale('esc-avi', 20.1, {}, { dur: 0.25 });
    vuelveCabeza(20.2);
    k.evento('e6', 20.25);
    k.entra('das1', 20.6, { y: 120 }, { dur: 0.3 });
    k.entra('das2', 20.82, { y: 140, rotation: -2 }, { dur: 0.3 });
    k.entra('das3', 21.04, { y: 160, rotation: 3 }, { dur: 0.3 });

    // p.30 · el cochebomba
    hitoFuera('e6', 'das1 das2 das3', 21.7);
    k.entra('esc-das', 21.85, {}, { dur: 0.3, ease: 'none' });
    k.entra('das-edif', 21.95, { y: 60 }, { dur: 0.25 });
    k.entra('das-camion', 22.0, { x: -1100 }, { dur: 0.55, ease: 'power3.out' });
    k.paso('d1', 22.45);
    // p.31 · estallido
    k.estalla('das-bang', 23.15, 'das-edif das-camion');
    k.paso('d2', 23.3);

    // ---------------------------------------------- p.32 · gráfico
    k.sale('esc-das', 24.0, {}, { dur: 0.25 });
    k.entra('n550', 24.2, { y: 30 }, { dur: 0.25 });
    k.cuenta('n550', 24.2, 550, { dur: 0.5 });
    k.entra('cap', 24.4, { y: 16 }, { dur: 0.2 });
    k.entra('eje', 24.45, {}, { dur: 0.2, stagger: 0.02 });
    k.entra('rot1 rot2', 24.5, { x: -20 }, { dur: 0.2, stagger: 0.12 });
    k.barre('b1', 24.6, 'izq', { dur: 0.3, ease: 'power2.out' });
    k.cuenta('v1', 24.6, 410, { dur: 0.3 });
    k.barre('b2', 24.75, 'izq', { dur: 0.55, ease: 'power2.out' });
    k.cuenta('v2', 24.75, 1710, { dur: 0.55, fmt: miles });
  },
};
