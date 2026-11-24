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

Requisitos: Node.js `^20.19.0` o `>=22.12.0` (Vite 7) y npm.

La sección de noticias usa `/api/news`. Coloca `GNEWS_API_KEY` (sin prefijo `VITE_`) en tu `.env` local para `dev` y `preview`, o como variable de servidor en Vercel. Si tenías `VITE_GNEWS_API_KEY`, renómbrala en tu configuración local. Sin clave, el portafolio sigue disponible y la sección muestra que no hay noticias. El alojamiento estático necesita un backend para servir esta ruta.

El contacto abre la aplicación de correo del visitante; el sitio no envía mensajes ni confirma su entrega.

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
```

## Disponibilidad del chatbot

- **Orden:** Groq (`openai/gpt-oss-20b`) → OpenRouter (`recursive/flint-v1.0:free`, luego `openrouter/free` si no hay una respuesta válida) → Gemini opcional → respuestas locales. OpenRouter no usa modelos de pago; si devuelve `429`, ambos intentos comparten la pausa de cuota. Las claves son independientes: si falta alguna, se omite ese proveedor.
- **Vercel:** configura `GROQ_API_KEY` y `OPENROUTER_API_KEY` únicamente como variables de servidor en **Production** y vuelve a desplegar. Deja `GEMINI_API_KEY` sin configurar si no quieres usar Gemini. Comprueba que la URL de producción permita acceso sin iniciar sesión.
- **Local:** agrega las claves a `.env` y reinicia Vite. No uses el prefijo `VITE_`. Si una clave se incluyó antes en un build público, revócala y usa una nueva para el servidor.
- **Sin proveedores:** si no hay clave, hay errores, se agota la cuota o el sitio solo sirve archivos estáticos, el chat muestra «Respuesta del portafolio · modo local». Estas respuestas cubren preguntas frecuentes; no sustituyen una conversación generativa.
- **Modelo visible:** cada respuesta generada muestra el proveedor y el modelo que este reportó. Si el proveedor no identifica el modelo concreto, aparece «modelo no informado».
- **Límites:** no hace falta mantener un servidor encendido. Cada proveedor conserva su cuota. Las llamadas comparten un presupuesto de 8 segundos y se pausa por instancia al proveedor que responde `429`. El límite de 12 solicitudes por minuto por instancia protege de ráfagas, pero no limita el consumo global; aplica un límite compartido por IP para `POST /api/chat` antes de habilitar una clave de pago.
- **Comprobación:** con una sola clave configurada a la vez, pregunta «¿En cuál de sus proyectos ejecuta código enviado por usuarios?» y luego «¿Y cómo aísla esa ejecución?». La respuesta debe mencionar Code Duel y después Docker, sin la etiqueta «modo local». Repite sin claves y verifica que aparezca esa etiqueta en las respuestas de respaldo.
- **Diagnóstico:** revisa `POST /api/chat` en la pestaña Red del navegador. Un `503` de la API indica que no hay proveedores configurados y un `429` indica un límite temporal. Si ves `502`, busca `[chat] Sin respuesta generada` en los logs de la función de Vercel: indica el proveedor, el intento y el motivo (estado HTTP, timeout, error de red o respuesta inválida/incompleta), sin registrar la conversación ni las claves.


## 📄 Licencia

Este proyecto está bajo la licencia MIT.
