# Los últimos años de Pablo Escobar — scrollytelling

Versión web navegable del diseño `scrollytelling V01.pdf`. Cada núcleo del PDF es una sección que queda fija en pantalla mientras el scroll hace avanzar sus animaciones, siguiendo el guion de `transiciones.txt`.

Trabajo académico de diseño gráfico.

## Cómo verlo

```bash
npm install
npm run dev        # servidor local con recarga
npm run build      # genera dist/
npm run preview    # sirve dist/ tal como queda publicado
```

## Publicación en GitHub Pages

El workflow `.github/workflows/deploy.yml` compila y publica en cada push a `main`.
Hay que activarlo una sola vez en el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Tecnología

- **Vite** como empaquetador (sitio estático, sin framework).
- **GSAP + ScrollTrigger** para atar cada animación al scroll, **DrawSVG** para trazos que se dibujan (líneas, círculos, la ruta del mapa) y **SplitText** para los cuadros que "se escriben".
- **Lenis** para el scroll suave.

## Estructura

```
src/
  main.js              arma las secciones, el scroll y el índice
  nucleos/             un archivo por núcleo (HTML + animación)
  lib/ui.js            generadores de HTML (título, hito, caja, flecha…)
  lib/anim.js          animaciones reutilizables (paneo, línea de tiempo, estallido…)
  lib/plano.js         plano de manzanas en SVG
  data/geo.json        coordenadas extraídas del PDF
  styles/main.css      estilos y variables (colores, tipografías, velocidad)
public/img, public/svg recursos extraídos del PDF
tools/extract_assets.py  script que extrae esos recursos (PyMuPDF + Pillow)
```

## Cómo se maqueta

La página del PDF mide 1684 × 1190 pt. Todo se posiciona con esas mismas coordenadas dentro de `.stage`, que se escala entera para entrar en la ventana. Mover algo es cambiar sus números `x, y` en el archivo del núcleo.

En cada núcleo, `build(k)` describe la animación sobre una línea de tiempo donde **1 unidad = 1 paso de scroll**:

```js
k.entra('foto', 1.3, { y: 180 });   // en el paso 1.3 la foto sube y aparece
k.evento('e1', 0.2);                // hito: línea → punto → fecha → textos
k.paso('p1', 4.4);                  // cuadro numerado que se escribe
```

Ajustes rápidos:

- **Velocidad general**: `--vh-paso` en `src/styles/main.css` (cuántos vh de scroll dura cada paso).
- **Duración de un núcleo**: su propiedad `pasos`.
- **Ver un momento puntual**: `?ver=N:T` salta al núcleo N en el paso T, por ejemplo `http://localhost:5173/?ver=3:7.7`.

## Tipografías

La web carga Amplitude para los títulos, Karmina para el texto serif y Karmina Sans para el texto sans desde un proyecto de Adobe Fonts. Sus equivalentes libres sirven de respaldo y las versalitas usan Alegreya Sans SC. Las familias se configuran en las variables `--f-*` de `src/styles/main.css`.

## Regenerar los recursos

Si cambia el PDF: `python tools/extract_assets.py "scrollytelling V01.pdf"`. Los índices de los dibujos vectoriales están atados a la versión V01, así que un PDF nuevo puede requerir ajustarlos.
