# Guía para agentes

## Estado actual

El producto actual es un portafolio público Vite/React. `src/App.tsx` monta `PublicHome` para `/*`; no asumas dashboard privado, Supabase Auth ni rutas protegidas sin evidencia en el código.

## Antes de cambiar

Lee `README.md`, `PRODUCT.md` y `DESIGN.md`. Revisa `git status --short`. Los datos profesionales deben conservarse fielmente y el contenido del chatbot debe derivar de la fuente de contexto del proyecto.

## Reglas visuales

- Respeta la dirección PCB descrita en `DESIGN.md`.
- Mantén soporte de teclado, contraste y movimiento reducido.
- No introduzcas una variante clara sin actualizar la decisión de diseño.
- No publiques claves de Gemini ni valores de `.env`.

## Verificación

```powershell
npm install
npm run lint
npm test
npm run build
```

Comprueba además la página pública en desktop y móvil cuando cambies layout o navegación.
