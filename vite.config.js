import { defineConfig } from 'vite';

// base relativa: el sitio funciona igual en https://usuario.github.io/granma/
// que en un dominio propio o abriendo `vite preview`.
export default defineConfig({
  base: './',
  build: { target: 'es2022', assetsInlineLimit: 0 },
});
