# Portfolio - Heber Daza

Este es el repositorio de mi portafolio profesional, desarrollado con React, TypeScript y Vite.

## Estado actual

La aplicación actual funciona como un portafolio público de una sola superficie. El router monta `PublicHome` para `/*`; no se debe presentar como un dashboard privado operativo sin verificar primero una implementación de autenticación y rutas protegidas.

## 🚀 Tecnologías Utilizadas

- **Frontend:** React 18 con Vite
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Iconos:** Lucide React
- **IA:** Google Generative AI para el chatbot del portafolio
- **Enrutamiento:** React Router DOM v7
- **Pruebas:** Vitest y React Testing Library
- **Despliegue:** Netlify / Vercel

## ✨ Características

- **Diseño Responsivo:** Adaptado para dispositivos móviles, tablets y escritorio.
- **Modo oscuro:** La dirección visual PCB actual está diseñada para dark mode; cualquier variante clara requiere actualizar `DESIGN.md`.
- **Arquitectura de Vistas:**
  - **Vista pública (`/`):** presentación, habilidades, proyectos, trayectoria, contacto y herramientas de IA.
- **Secciones Destacadas:**
  - **Hero:** Introducción impactante con animaciones suaves.
  - **Sobre mí:** Resumen del perfil profesional (Backend Developer).
  - **Tecnologías:** Stack técnico segmentado por categorías (Backend, DB, DevOps, Seguridad).
  - **Proyectos:** Galería de trabajos realizados.
  - **Educación y Experiencia:** Detalle cronológico de la trayectoria académica y profesional.

## Comandos

Requisitos: Node.js `^20.19.0` o `>=22.12.0` (Vite 7) y npm. La vista pública se puede iniciar sin una clave de Gemini. El chatbot lee `VITE_GEMINI_API_KEY` y no puede responder sin ella. Como el código la usa en el navegador, no pongas una credencial privada en esa variable ni la incluyas en un build público.

La sección de noticias usa `/api/news`. Coloca `GNEWS_API_KEY` (sin prefijo `VITE_`) en tu `.env` local para `dev` y `preview`, o como variable de servidor en Vercel. Si tenías `VITE_GNEWS_API_KEY`, renómbrala en tu configuración local. Sin clave, el portafolio sigue disponible y la sección muestra que no hay noticias. El alojamiento estático necesita un backend para servir esta ruta.

El contacto abre la aplicación de correo del visitante; el sitio no envía mensajes ni confirma su entrega.

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
```

El proyecto requiere `VITE_GEMINI_API_KEY` para las funciones del chatbot. No publiques su valor.


## 📄 Licencia

Este proyecto está bajo la licencia MIT.
