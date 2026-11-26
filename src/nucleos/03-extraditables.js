// NÚCLEO 3 · Los crímenes de los extraditables — p. 14 a 32 del PDF
import { foto, titulo, texto, evento, svg, miles } from '../lib/ui.js';
import { botonReconstruccion } from '../lib/escenas-v02.js';

const hito = (g, fecha, sub, ps) =>
  evento({ g, x: 851, y: 500, desde: 140, fecha, yFecha: 469, sub, ySub: 526, ps });

export const htmlOtrosCrimenes = () => `
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

    ${botonReconstruccion('cano', 'ver-cano', [879, 1095])}
    ${botonReconstruccion('galan', 'ver-galan', [878, 1094])}
    ${botonReconstruccion('espectador', 'ver-espectador', [878, 1011], true)}
    ${botonReconstruccion('avianca', 'ver-avianca', [880, 1111], true)}
    ${botonReconstruccion('das', 'ver-das', [872, 1011], true)}

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
  `;

export function animaOtrosCrimenes(k) {
  const salir = (g, fotos, boton, tiempo) => {
    k.sale(`${fotos} ${boton} ${g}-l ${g}-p ${g}-f ${g}-s ${g}-t`, tiempo, {}, { dur: 0.25 });
  };

  k.evento('e2', 3.45, { origen: 'top' });
  k.barre('cano', 4.20, 'arriba', { dur: 0.45 });
  k.entra('ver-cano', 4.30, { y: 12 }, { dur: 0.25 });
  salir('e2', 'cano', 'ver-cano', 5.90);

  k.evento('e3', 6.15);
  k.barre('galan', 6.55, 'izq', { dur: 0.45 });
  k.entra('ver-galan', 6.65, { y: 12 }, { dur: 0.25 });
  salir('e3', 'galan', 'ver-galan', 8.00);

  k.evento('e4', 8.25);
  k.entra('esp1', 8.65, { y: 120 }, { dur: 0.35 });
  k.entra('esp2', 8.85, { y: 160, rotation: 2 }, { dur: 0.35 });
  k.entra('ver-espectador', 8.95, { y: 12 }, { dur: 0.25 });
  salir('e4', 'esp1 esp2', 'ver-espectador', 10.25);

  k.evento('e5', 10.50);
  k.entra('av1', 10.90, { y: 120 }, { dur: 0.35 });
  k.entra('ver-avianca', 11.00, { y: 12 }, { dur: 0.25 });
  salir('e5', 'av1', 'ver-avianca', 12.30);

  k.evento('e6', 12.55);
  k.entra('das1', 12.90, { y: 120 }, { dur: 0.3 });
  k.entra('das2', 13.12, { y: 140, rotation: -2 }, { dur: 0.3 });
  k.entra('ver-das', 13.20, { y: 12 }, { dur: 0.25 });
  salir('e6', 'das1 das2', 'ver-das', 14.50);
  k.sale('cabeza', 14.50, {}, { dur: 0.25 });

  k.entra('datos-titulo datos-tema datos-bajada', 14.75, { y: 16 }, { dur: 0.25 });
  k.entra('n550', 14.80, { y: 30 }, { dur: 0.25 });
  k.cuenta('n550', 14.80, 550, { dur: 0.5 });
  k.entra('cap', 15.00, { y: 16 }, { dur: 0.2 });
  k.entra('eje', 15.05, {}, { dur: 0.2, stagger: 0.02 });
  k.entra('rot1 rot2', 15.10, { x: -20 }, { dur: 0.2, stagger: 0.12 });
  k.barre('b1', 15.20, 'izq', { dur: 0.3, ease: 'power2.out' });
  k.cuenta('v1', 15.20, 410, { dur: 0.3 });
  k.barre('b2', 15.35, 'izq', { dur: 0.55, ease: 'power2.out' });
  k.cuenta('v2', 15.35, 1710, { dur: 0.55, fmt: miles });
}
