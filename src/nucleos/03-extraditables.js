// NÚCLEO 3 · Los crímenes de los extraditables — p. 14 a 32 del PDF
import { foto, titulo, texto, evento, svg, miles } from '../lib/ui.js';
import { escenaV02, animaEscenaV02 } from '../lib/escenas-v02.js';

const hito = (g, fecha, sub, ps) =>
  evento({ g, x: 851, y: 500, desde: 140, fecha, yFecha: 469, sub, ySub: 526, ps });

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
      ${texto('tema-editorial', "Antecedentes", 104, 185, null, 'tema')}
      ${titulo("Violencia para frenar", 104, 242, 'titulo--editorial')}
      ${titulo("la extradición", 104, 326, 'titulo--editorial')}
      ${texto('bajada texto-editorial', "Tras quedar expuestos sus antecedentes, Escobar pasó a la clandestinidad. Aunque era perseguido por las autoridades, mantuvo el control de su organización y desde sus refugios continuó ordenando acciones violentas.", 103, 414, 590, 'bajada')}
      ${texto('bajada texto-editorial', "La posibilidad de ser extraditado a Estados Unidos se convirtió en uno de los principales motivos de confrontación entre él y el Estado colombiano. Bajo el nombre de Los Extraditables, narcotraficantes recurrieron a amenazas, secuestros y atentados durante más de dos años para presionar al Estado contra esa medida.", 105, 546, 590, 'bajada')}
    </div>

    ${escenaV02('cano', 'esc-cano')}
    ${escenaV02('galan', 'esc-galan')}
    ${escenaV02('espectador', 'esc-esp')}
    ${escenaV02('avianca', 'esc-avi')}
    ${escenaV02('das', 'esc-das')}

    <!-- p.32 · balance de los atentados -->
    <div data-g="grafico">
      ${texto('tema-editorial', "Consecuencias", 104, 185, null, 'datos-tema')}
      ${texto('titulo titulo--editorial', '<span>Los atentados en datos</span>', 104, 242, null, 'datos-titulo')}
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
    animaEscenaV02(k, 'cano', 'esc-cano');

    // ---------------------------------------------- p.19 · Luis Carlos Galán
    k.sale('esc-cano', 7.8, {}, { dur: 0.25 });
    vuelveCabeza(7.9);
    k.evento('e3', 7.95);
    k.barre('galan', 8.35, 'izq', { dur: 0.45 });

    // p.20 · la tarima, la multitud y el primer cuadro
    hitoFuera('e3', 'galan', 9.1);
    animaEscenaV02(k, 'galan', 'esc-galan');

    // ---------------------------------------------- p.23 · El Espectador
    k.sale('esc-galan', 12.2, {}, { dur: 0.25 });
    vuelveCabeza(12.3);
    k.evento('e4', 12.35);
    k.entra('esp1', 12.75, { y: 120 }, { dur: 0.35 });
    k.entra('esp2', 13.05, { y: 160, rotation: 2 }, { dur: 0.35 });

    // p.24 · el camión se posiciona
    hitoFuera('e4', 'esp1 esp2', 13.7);
    animaEscenaV02(k, 'espectador', 'esc-esp');

    // ---------------------------------------------- p.26 · Avianca
    k.sale('esc-esp', 16.0, {}, { dur: 0.25 });
    vuelveCabeza(16.1);
    k.evento('e5', 16.15);
    k.entra('av1', 16.55, { y: 120 }, { dur: 0.35 });

    // p.27 · despega y se forma la flecha hacia arriba
    hitoFuera('e5', 'av1', 17.5);
    animaEscenaV02(k, 'avianca', 'esc-avi');

    // ---------------------------------------------- p.29 · DAS
    k.sale('esc-avi', 20.1, {}, { dur: 0.25 });
    vuelveCabeza(20.2);
    k.evento('e6', 20.25);
    k.entra('das1', 20.6, { y: 120 }, { dur: 0.3 });
    k.entra('das2', 20.82, { y: 140, rotation: -2 }, { dur: 0.3 });

    // p.30 · el cochebomba
    hitoFuera('e6', 'das1 das2', 21.7);
    animaEscenaV02(k, 'das', 'esc-das');

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
