// PORTADA — p. 1, 2 y 3 del PDF
import { foto, texto, svg, ROJO } from '../lib/ui.js';

export default {
  id: 'portada',
  nombre: 'Portada',
  pasos: 3,

  html: () => `
    <div class="abs fondo-portada" data-g="fondo-portada"></div>
    ${foto('portada-v02', [698, 316, 986, 696], 'Pablo Escobar tras las rejas', 'diarios', 'foto--libre')}
    <div class="cabeza" data-g="cabeza">
      <h1 class="titulo titulo--portada portada-v02" data-g="titulo" style="left:104px;top:265px"><span>La caída de Pablo Escobar</span></h1>
      ${texto('bajada texto-editorial texto-portada', "De las denuncias que expusieron sus antecedentes, a los asesinatos y atentados que marcaron su gran confrontación con el Estado colombiano.", 105, 398, 545, 'bajada')}
      ${texto('bajada texto-editorial texto-portada', "Un recorrido por la entrega negociada de Pablo Escobar, su reclusión y fuga de La Catedral y la última persecución que terminó con su localización y muerte en Medellín.", 105, 518, 545, 'bajada')}
    </div>

    <div class="abs introduccion" data-g="introduccion">
      ${texto('tema-editorial', 'Introducción', 104, 333, null, 'intro-tema')}
      ${texto('intro-texto', "Pablo Emilio Escobar Gaviria (1949–1993) fue un narcotraficante colombiano y uno de los principales líderes del Cartel de Medellín. Su organización acumuló poder mediante el tráfico de cocaína, la corrupción y la violencia. Mientras buscaba reconocimiento público e incursionaba en la política, impulsó una confrontación contra el Estado para evitar su extradición a Estados Unidos.", 113, 405, 595, 'bio')}
      ${texto('intro-texto intro-cierre', "Sus últimos años estuvieron marcados por los asesinatos y atentados vinculados a esa confrontación, su entrega negociada en 1991 y la fuga de La Catedral en 1992. <strong>La persecución posterior terminó con su localización y muerte durante un operativo policial en Medellín, el 2 de diciembre de 1993.</strong>", 112, 590, 595, 'bio')}
      ${foto('introduccion-v02', [775, 405, 838, 471], 'Retrato de Pablo Escobar', 'mug', 'foto--libre')}
    </div>

    ${svg(`
      <g class="flecha-scroll" data-g="flecha-portada" fill="none" stroke="${ROJO}" stroke-width="8">
        <line x1="841.9" y1="1085.9" x2="841.9" y2="1124"/>
        <polyline points="852.6,1116.4 841.9,1128 831.2,1116.4"/>
      </g>`)}
  `,

  build(k) {
    // 1 · título en paneo horizontal + bajada (al cargar)
    k.cabeza();
    k.entra('diarios', 0.3, { y: 32 }, { dur: 0.55 });
    k.sale('fondo-portada cabeza diarios flecha-portada', 1.35, {}, { dur: 0.25 });
    k.entra('introduccion', 1.55, {}, { dur: 0.25 });
    k.entra('mug', 1.65, { x: 30 }, { dur: 0.45 });
    k.entra('bio', 1.8, { y: 18 }, { dur: 0.3, stagger: 0.14 });
  },
};
