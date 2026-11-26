// NÚCLEO 3 · Los crímenes de los extraditables — p. 14 a 32 del PDF
import geo from '../data/geo.json';
import { foto, pieza, titulo, texto, evento, paso, svg, fondos, via, edificio, camion, miles } from '../lib/ui.js';

// Los cinco hitos (p.15, 19, 23, 26 y 29) comparten la misma maqueta.
const hito = (g, fecha, sub, ps, desde = 140) =>
  evento({ g, x: 851, y: 500, desde, fecha, yFecha: 469, sub, ySub: 526, ps });


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
  nombre: 'Violencia para frenar la extradición',
  pasos: 26,

  html: () => `
    <!-- p.15 · Guillermo Cano -->
    ${hito('e2', "Diciembre de 1986", "Segundo crimen: Asesinato de Guillermo Cano", ["El 17 de diciembre es asesinado el director de El Espectador. El periodista había denunciado el narcotráfico y los antecedentes de Escobar."])}
    ${foto('cano-v02', [879, 659, 506, 422], 'Tapa de El Espectador: «Asesinado el director de El Espectador»', 'cano')}

    <!-- p.19 · Luis Carlos Galán -->
    ${hito('e3', "Agosto de 1989", "Tercer crimen: Asesinato de Luis Carlos Galán", ["El 18 de agosto es asesinado en Soacha el candidato presidencial Luis Carlos Galán. Su oposición al narcotráfico y su defensa de la extradición lo habían convertido en un objetivo."])}
    ${foto('galan-v02', [878, 681, 522, 399], 'Tarima del acto de Soacha en el momento del atentado contra Galán', 'galan')}

    <!-- p.23 · El Espectador -->
    ${hito('e4', "Septiembre de 1989", "Cuarto crimen: Atentado a la sede de \"El Espectador\"", ["El 2 de septiembre una bomba destruye parte de las instalaciones del periódico en Bogotá en busca de silenciar las denuncias periodísticas"])}
    ${foto('espectador-1-v02', [878, 675, 369, 322], 'Instalaciones de El Espectador destruidas por la bomba', 'esp1')}
    ${foto('espectador-2-v02', [1246, 674, 407, 322], 'Fachada de El Espectador entre escombros', 'esp2')}

    <!-- p.26 · Avianca -->
    ${hito('e5', "Noviembre de 1989", "Quinto crimen: Atentado al vuelo 203 de Avianca", ["El 27 de noviembre una bomba destruye el avión en vuelo. Mueren las 107 personas que iban a bordo. La violencia alcanza a pasajeros y tripulantes civiles."])}
    ${foto('avianca-1-v02', [880, 708, 564, 389], 'Restos del fuselaje del vuelo 203 de Avianca', 'av1')}

    <!-- p.29 · DAS -->
    ${hito('e6', "Diciembre de 1989", "Último crimen: Atentado al edificio del DAS", ["El 6 de diciembre un carro bomba explota junto a la sede del Departamento Administrativo de Seguridad en Bogotá. El atentado afecta también a las personas y las viviendas del entorno."])}
    ${foto('das-1-v02', [872, 719, 419, 278], 'Edificio del DAS tras la explosión', 'das1')}
    ${foto('das-2-v02', [1276, 720, 315, 276], 'Autos y edificios destruidos frente al DAS', 'das2')}

    <div class="cabeza" data-g="cabeza">
      ${texto('tema-editorial', "| Antecedentes", 104, 185, null, 'tema')}
      ${titulo("Violencia para frenar", 104, 235)}
      ${titulo("la extradición", 104, 314)}
      ${texto('bajada texto-editorial', "Tras quedar expuestos sus antecedentes, Escobar pasó a la clandestinidad. Aunque era perseguido por las autoridades, mantuvo el control de su organización y desde sus refugios continuó ordenando acciones violentas.", 103, 414, 590, 'bajada')}
      ${texto('bajada texto-editorial', "La posibilidad de ser extraditado a Estados Unidos se convirtió en uno de los principales motivos de confrontación entre él y el Estado colombiano. Bajo el nombre de Los Extraditables, narcotraficantes recurrieron a amenazas, secuestros y atentados durante más de dos años para presionar al Estado contra esa medida.", 105, 546, 590, 'bajada')}
    </div>

    <!-- p.16 a 18 · asesinato de Cano -->
    <div class="escena" data-g="esc-cano">
      ${fondos([140, 530, '#f5f5f3'], [670, 3000, '#e9e9e3'])}
      ${texto('ubicacion-escena', "17 de diciembre · Bogotá<br>Calle 22 · Avenida 68 · Sede de El Espectador", 104, 165, 475, 'esc-cano-lugar')}
      ${foto('mapa-v02-cano', [104.5, 284.9, 518.7, 387.1], 'Mapa del lugar en la maqueta', null, 'foto--libre')}
      ${svg(`
        ${via(1019)}
        <g data-g="cano-edif">${edificio([882, 272, 442, 338])}</g>
        <line data-g="cano-rot-auto" x1="646" y1="972" x2="646" y2="1080" stroke="#9a9a9a" stroke-width="1.5"/>
        <line data-g="cano-rot-moto" x1="738" y1="783" x2="804" y2="783" stroke="#fe1003" stroke-width="1.3"/>
      `)}
      ${pieza('auto', [478.4, 836.1, 318.5, 136.3], 'cano-auto')}
      ${pieza('moto', [555.7, 749, 165.4, 68.2], 'cano-moto')}
      ${pieza('estallido', [554.3, 826.5, 90.9, 86.6], 'cano-bang')}
      ${texto('rotulo', 'Automóvil de Guillermo Cano', 473, 1099, null, 'cano-rot-auto')}
      ${texto('rotulo rotulo--rojo', 'Motocicleta con dos sicarios', 818, 759, null, 'cano-rot-moto')}
      ${paso(1, 'Guillermo Cano sale del edificio del diario "El Espectador"', 1020, 675, 'c1')}
      ${paso(2, 'Se sube a su auto para regresar a su casa y realiza un giro en U', 315, 739, 'c2')}
      ${paso(3, 'Del otro lado lo esperaba una moto con dos sicarios', 69, 1039, 'c3')}
      ${paso(4, 'La moto se acerca por la derecha y le dispara', 952, 1060, 'c4')}
      ${paso(5, 'Guillermo Cano pierde el control del auto y choca contra un poste', 1265, 975, 'c5')}
    </div>

    <!-- p.20 a 22 · asesinato de Galán -->
    <div class="escena" data-g="esc-galan">
      ${fondos([140, 3000, '#f5f5f3'])}
      ${texto('ubicacion-escena', "18 de agosto · Cundinamarca<br>Calle 12 · Carrera 7 · Parque Alfonso López Pumarejo", 104, 165, 475, 'esc-galan-lugar')}
      ${foto('mapa-v02-galan', [104.5, 277.1, 485.3, 394.9], 'Mapa del lugar en la maqueta', null, 'foto--libre')}
      ${svg(`
        <rect data-g="tarima" x="695" y="387" width="695" height="270" fill="#dfdfdc" stroke="#1b1b1b" stroke-width="2.8"/>
        ${multitud}
      `)}
      ${pieza('tarima-persona', [849.6, 462.5, 43.1, 84.2], 'orador')}
      ${pieza('tarima-persona', [919.8, 457.8, 43.1, 84.2], 'orador')}
      ${pieza('tarima-persona', [988.8, 462.5, 43.1, 84.2], 'orador')}
      ${geo.disparos_p22.map((r) => pieza('estallido', [r[0] + 250, ...r.slice(1)], 'galan-bang')).join('')}
      ${paso(1, 'Luis Carlos Galán se encontraba en un acto electoral junto a sus dos escoltas', 1250, 466, 'g1')}
      ${paso(2, 'Entre la multitud se encontraban dos sicarios', 1292, 646, 'g2')}
      ${paso(3, 'Los sicarios disparan cinco veces, matando a Galán y a sus dos acompañantes', 645, 655, 'g3')}
    </div>

    <!-- p.24 y 25 · bomba en El Espectador -->
    <div class="escena" data-g="esc-esp">
      ${fondos([140, 715, '#f5f5f3'], [855, 3000, '#e9e9e3'])}
      ${texto('ubicacion-escena', "2 de septiembre · Bogotá<br>Calle 22 · Avenida 68 · Sede de El Espectador", 104, 165, 475, 'esc-esp-lugar')}
      ${foto('mapa-v02-espectador', [104.5, 284.9, 518.7, 387.1], 'Mapa del lugar en la maqueta', null, 'foto--libre')}
      ${svg(`
        ${via(1025)}
        <g data-g="esp-edif">${edificio([683, 300, 723, 410])}</g>
        ${camion('esp-camion')}
      `)}
      ${pieza('estallido', [217, 696, 310, 295], 'esp-bang')}
      ${paso(1, 'Un camión con 170 kg de dinamita se posiciona frente al edificio de "El Espectador"', 730, 938, 's1')}
      ${paso(2, 'La bomba explota a las 6:35 am, desintegrando el camión por completo y destruyendo parte del edificio', 778, 751, 's2')}
    </div>

    <!-- p.27 y 28 · vuelo 203 -->
    <div class="escena" data-g="esc-avi">
      ${fondos([140, 3000, '#f5f5f3'])}
      ${texto('ubicacion-escena', "27 de noviembre · Bogotá<br>Aeropuerto El Dorado", 104, 165, 475, 'esc-avi-lugar')}
      ${foto('mapa-v02-avianca', [104.5, 264.8, 326.3, 407.2], 'Mapa del lugar en la maqueta', null, 'foto--libre')}
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
      ${texto('ubicacion-escena', "6 de diciembre · Bogotá<br>Carrera 27 · Calle 18 · Departamento Administrativo de Seguridad", 104, 165, 475, 'esc-das-lugar')}
      ${foto('mapa-v02-das', [104.5, 288, 389.3, 349.6], 'Mapa del lugar en la maqueta', null, 'foto--libre')}
      ${svg(`
        ${via(1025)}
        <g data-g="das-edif">
          ${edificio([1100, 421, 492, 289])}
          ${edificio([683, 300, 723, 410])}
        </g>
        ${camion('das-camion')}
      `)}
      ${pieza('estallido', [261, 780, 252, 240], 'das-bang')}
      ${paso(1, 'Un cochebomba se posiciona frente al edificio del DAS', 730, 946, 'd1')}
      ${paso(2, 'A las 7:30 am el cochebomba explota junto al edificio', 494, 778, 'd2')}
    </div>

    <!-- p.32 · balance de los atentados -->
    <div data-g="grafico">
      ${texto('tema-editorial', "| Consecuencias", 104, 185, null, 'datos-tema')}
      ${texto('titulo', '<span>Los atentados en datos</span>', 104, 235, null, 'datos-titulo')}
      ${texto('bajada texto-editorial', "Los asesinatos y atentados golpearon a funcionarios, dirigentes políticos, periodistas y civiles. Escobar y sus aliados recurrieron a la violencia para silenciar denuncias, atacar a sus adversarios y presionar al Estado contra la extradición.", 105, 321, 610, 'datos-bajada')}
      ${texto('bajada texto-editorial', "Los siguientes gráficos reconstruyen algunos de esos crímenes, cada uno con sus responsables y circunstancias particulares.", 105, 453, 610, 'datos-bajada')}
      ${texto('num-grande', '550', 159, 524, null, 'n550')}
      ${texto('vers', 'policías asesinados<br>por escobar y el cartel', 159, 617, null, 'cap')}
      ${texto('vers vers--der', 'civiles fallecidos', 454, 641, 400, 'rot1')}
      ${texto('vers vers--der', 'personas lesionadas', 451, 738, 400, 'rot2')}
      ${svg([885, 1042, 1199, 1356, 1513].map((x) => `<line data-g="eje" x1="${x}" y1="618" x2="${x}" y2="810" stroke="#dcdcd8" stroke-width="1.2"/>`).join(''))}
      ${[0, 500, 1000, 1500, 2000].map((v, i) => texto('eje', v, 885 + i * 157, 807, null, 'eje')).join('')}
      <div class="barra" data-g="b1" style="left:885px;top:625px;width:124px;height:60px;background:#ee2c35"><b data-g="v1">410</b></div>
      <div class="barra" data-g="b2" style="left:885px;top:723px;width:547px;height:60px;background:#221a22"><b data-g="v2">1.710</b></div>
    </div>
  `,

  build(k) {
    const { tl, $ } = k;
    const vuelveCabeza = (t) => k.vuelve('cabeza', t, {}, { dur: 0.25 });
    const hitoFuera = (g, fotos, t) => {
      k.sale(`cabeza ${fotos}`, t, {}, { dur: 0.25 });
      k.sale(`${g}-l ${g}-p ${g}-f ${g}-s ${g}-t`, t, {}, { dur: 0.25 });
    };

    // Antecedentes y primer hito de este tramo
    k.cabeza();
    k.evento('e2', 0.7, { origen: 'top' });
    k.barre('cano', 1.45, 'arriba', { dur: 0.45 });

    // p.16 · aparece la escena y se forma el primer cuadro
    hitoFuera('e2', 'cano', 4.3);
    k.entra('esc-cano', 4.45, {}, { dur: 0.3, ease: 'none' });
    k.entra('cano-edif', 4.6, { y: 60 }, { dur: 0.3 });
    k.paso('c1', 4.8);
    // p.17 · aparece el auto y el segundo cuadro
    k.entra('cano-auto', 5.4, { x: 1300 }, { dur: 0.5, ease: 'power3.out' });
    k.entra('cano-rot-auto', 5.85, { y: 10 }, { dur: 0.15 });
    k.paso('c2', 5.9);
    // Se agregan los tres cuadros finales de la secuencia.
    k.entra('cano-moto', 6.5, { x: 1200 }, { dur: 0.45, ease: 'power3.out' });
    k.entra('cano-rot-moto', 6.9, { x: 20 }, { dur: 0.15 });
    k.paso('c3', 6.62);
    k.estalla('cano-bang', 7.03, 'cano-auto');
    k.paso('c4', 7.05);
    k.paso('c5', 7.33);

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

    // p.27 · despega y se forma la flecha hacia arriba
    hitoFuera('e5', 'av1', 17.5);
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

    // p.30 · el cochebomba
    hitoFuera('e6', 'das1 das2', 21.7);
    k.entra('esc-das', 21.85, {}, { dur: 0.3, ease: 'none' });
    k.entra('das-edif', 21.95, { y: 60 }, { dur: 0.25 });
    k.entra('das-camion', 22.0, { x: -1100 }, { dur: 0.55, ease: 'power3.out' });
    k.paso('d1', 22.45);
    // p.31 · estallido
    k.estalla('das-bang', 23.15, 'das-edif das-camion');
    k.paso('d2', 23.3);

    // ---------------------------------------------- p.32 · gráfico
    k.sale('esc-das', 24.0, {}, { dur: 0.25 });
    k.entra('datos-titulo datos-tema datos-bajada', 24.15, { y: 16 }, { dur: 0.25 });
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
