// NÚCLEO 2 · Confrontación y terror — p. 8 a 13 del PDF
import { foto, titulo, texto, evento } from '../lib/ui.js';
import { animaOtrosCrimenes, htmlOtrosCrimenes } from './03-extraditables.js';
import { botonReconstruccion } from '../lib/escenas-v02.js';

export default {
  id: 'confrontacion',
  nombre: "Violencia para frenar la extradición",
  pasos: 16.75,

  html: () => `
    ${evento({
      g: 'e1', x: 851, y: 500, desde: 116,
      fecha: 'Abril de 1984', yFecha: 469,
      sub: 'Primer crimen: Asesinato de Rodrigo Lara Bonilla', ySub: 526,
      ps: ["Rodrigo Lara Bonilla, el ministro de Justicia de Colombia que había expuesto a Escobar, es asesinado el 30 de abril de 1984 en Bogotá, cuando sicarios en motocicleta dispararon contra su vehículo."],
    })}
    ${foto('lara-auto-v02', [880, 720, 621, 351], 'El automóvil de Rodrigo Lara Bonilla con los vidrios destrozados por los disparos', 'foto')}

    <div class="cabeza" data-g="cabeza">
      ${texto('tema-editorial', "Antecedentes", 104, 185, null, 'tema')}
      ${titulo("Violencia para frenar", 104, 242, 'titulo--editorial')}
      ${titulo("la extradición", 104, 326, 'titulo--editorial')}
      ${texto('bajada texto-editorial', "Tras quedar expuestos sus antecedentes, Escobar pasó a la clandestinidad. Aunque era perseguido por las autoridades, mantuvo el control de su organización y desde sus refugios continuó ordenando acciones violentas.", 103, 414, 585, 'bajada')}
      ${texto('bajada texto-editorial', "La posibilidad de ser extraditado a Estados Unidos se convirtió en uno de los principales motivos de confrontación entre él y el Estado colombiano. Bajo el nombre de Los Extraditables, narcotraficantes recurrieron a amenazas, secuestros y atentados durante más de dos años para presionar al Estado contra esa medida.", 105, 546, 585, 'bajada')}
    </div>

    ${botonReconstruccion('lara', 'ver-lara', [880, 1085])}
    ${htmlOtrosCrimenes()}
  `,

  build(k) {
    // p.8 · título en paneo, línea de abajo hacia arriba, abril de 1984
    k.cabeza();
    k.evento('e1', 0.2);

    // p.9 · se suma la foto por encima
    k.entra('foto', 1.3, { y: 180, rotation: 2 }, { dur: 0.5, ease: 'power3.out' });

    k.entra('ver-lara', 1.55, { y: 12 }, { dur: 0.25 });
    k.sale('foto ver-lara e1-l e1-p e1-f e1-s e1-t', 3.15, {}, { dur: 0.25 });
    animaOtrosCrimenes(k);
  },
};
