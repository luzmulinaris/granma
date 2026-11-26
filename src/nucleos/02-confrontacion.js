// NÚCLEO 2 · Confrontación y terror — p. 8 a 13 del PDF
import { foto, pieza, titulo, texto, evento, paso, svg, flecha, fondos, via } from '../lib/ui.js';

export default {
  id: 'confrontacion',
  nombre: "Violencia para frenar la extradición",
  pasos: 6.55,

  html: () => `
    ${evento({
      g: 'e1', x: 851, y: 500, desde: 116,
      fecha: 'Abril de 1984', yFecha: 469,
      sub: 'Primer crimen: Asesinato de Rodrigo Lara Bonilla', ySub: 526,
      ps: ["Rodrigo Lara Bonilla, el ministro de Justicia de Colombia que había expuesto a Escobar, es asesinado el 30 de abril de 1984 en Bogotá, cuando sicarios en motocicleta dispararon contra su vehículo."],
    })}
    ${foto('lara-auto-v02', [880, 720, 621, 351], 'El automóvil de Rodrigo Lara Bonilla con los vidrios destrozados por los disparos', 'foto')}

    <div class="cabeza" data-g="cabeza">
      ${texto('tema-editorial', "| Antecedentes", 104, 185, null, 'tema')}
      ${titulo("Violencia para frenar", 104, 235)}
      ${titulo("la extradición", 104, 314)}
      ${texto('bajada texto-editorial', "Tras quedar expuestos sus antecedentes, Escobar pasó a la clandestinidad. Aunque era perseguido por las autoridades, mantuvo el control de su organización y desde sus refugios continuó ordenando acciones violentas.", 103, 414, 585, 'bajada')}
      ${texto('bajada texto-editorial', "La posibilidad de ser extraditado a Estados Unidos se convirtió en uno de los principales motivos de confrontación entre él y el Estado colombiano. Bajo el nombre de Los Extraditables, narcotraficantes recurrieron a amenazas, secuestros y atentados durante más de dos años para presionar al Estado contra esa medida.", 105, 546, 585, 'bajada')}
    </div>

    <!-- p.11 a 13 · reconstrucción del ataque -->
    <div class="escena" data-g="escena">
      ${fondos([140, 3000, '#e9e9e3'])}
      ${texto('ubicacion-escena', "30 de abril · Bogotá<br>Calle 127 · Cruce y entorno de la Autopista Norte", 104, 165, 475, 'escena-lugar')}
      ${foto('mapa-v02-lara', [104.5, 276, 518.7, 360], 'Mapa del lugar en la maqueta', null, 'foto--libre')}
      <div class="abs" style="left:0;top:330px;width:1684px;height:1190px">
        ${svg(`
          ${via(660)}
          <line data-g="rot-auto" x1="662" y1="607" x2="662" y2="746" stroke="#9a9a9a" stroke-width="1.5"/>
          <line data-g="rot-moto" x1="1141" y1="524" x2="1141" y2="589" stroke="#fe1003" stroke-width="1.3"/>
          ${flecha([[1040.1, 475.8], [962.2, 475.8], [884.2, 430.4], [852, 430.4]], [[834.6, 430.4], [855.8, 450.1], [855.8, 410.7]], 'f1')}
          ${flecha([[708.2, 484.7], [647.7, 556.9], [564.7, 610.2], [540, 640]], [[526.1, 656.1], [554.9, 652.6], [524.7, 627.2]], 'f3')}
          ${flecha([[586, 416.3], [57, 416.3]], [[39.7, 416.3], [60.9, 436], [60.9, 396.5]], 'f2')}
        `)}
        ${pieza('auto', [529.4, 473.1, 318.5, 136.3], 'auto')}
        ${pieza('moto', [1047.7, 441, 165.4, 68.2], 'moto')}
        ${pieza('estallido', [664.3, 460.5, 90.9, 86.6], 'bang')}
        ${texto('rotulo', 'Automóvil de Lara Bonilla', 491, 765, null, 'rot-auto')}
        ${texto('rotulo rotulo--rojo', 'Motocicleta con dos ocupantes', 960, 595, null, 'rot-moto')}
      </div>
      ${paso(1, 'La motocicleta se aproxima por el lado derecho', 1215, 860, 'p1')}
      ${paso(2, 'La motocicleta se acerca al auto y dispara', 930, 700, 'p2')}
      ${paso(3, 'La moto huye de la escena y Lara Bonilla es llevado al hospital donde muere', 68, 805, 'p3')}
    </div>
  `,

  build(k) {
    const { tl, $ } = k;

    // p.8 · título en paneo, línea de abajo hacia arriba, abril de 1984
    k.cabeza();
    k.evento('e1', 0.2);

    // p.9 · se suma la foto por encima
    k.entra('foto', 1.3, { y: 180, rotation: 2 }, { dur: 0.5, ease: 'power3.out' });

    // p.11 · transición de la foto a la reconstrucción
    k.sale('cabeza foto e1-l e1-p e1-f e1-s e1-t', 2.25, {}, { dur: 0.3 });
    k.entra('escena', 2.65, {}, { dur: 0.3, ease: 'none' });
    k.entra('moto', 2.90, { x: 760 }, { dur: 0.4, ease: 'power2.out' });
    k.entra('rot-auto rot-moto', 3.20, { y: 12 }, { dur: 0.2 });
    k.flecha('f1', 3.30, 0.22);
    k.paso('p1', 3.35);

    // p.12 · la moto se mueve, dispara, cuadro 2
    k.sale('rot-auto rot-moto f1', 4.05, {}, { dur: 0.15 });
    tl.to($('moto'), { x: -433, y: -63, duration: 0.45, ease: 'power2.inOut' }, 4.15);
    k.estalla('bang', 4.60, 'auto');
    k.paso('p2', 4.67);

    // p.13 · el auto pierde el control, la moto huye, cuadro 3
    k.sale('bang', 5.30, { scale: 1.8 }, { dur: 0.12 });
    k.flecha('f3', 5.35, 0.4);
    tl.to($('auto'), { x: -300.4, y: 217, rotation: -17.2, duration: 0.6, ease: 'power1.inOut' }, 5.40);
    k.flecha('f2', 5.65, 0.35);
    k.paso('p3', 5.80);
  },
};
