# Portafolio profesional

Sitio público para mostrar trayectoria, habilidades y proyectos a reclutadores y visitantes. El enrutador actual monta la experiencia pública; no debe confundirse con un dashboard privado.

## Arquitectura y flujos

[`main.tsx`](src/main.tsx) monta React; [`App.tsx`](src/App.tsx) dirige a [`PublicHome.tsx`](src/components/PublicHome.tsx), que compone las secciones. Los componentes cubren proyectos, experiencia, contacto y herramientas. [`PRODUCT.md`](PRODUCT.md) y [`DESIGN.md`](DESIGN.md) explican audiencia y dirección visual.

- **Chatbot:** [`Chatbot.tsx`](src/components/Chatbot.tsx) combina la pregunta con [`portfolioContext.ts`](src/utils/portfolioContext.ts) y usa Google Generative AI desde el cliente. La interacción envía datos al proveedor; no se identificó un backend de chat persistente en este árbol. El nombre `VITE_GEMINI_API_KEY` que documenta el README corresponde a configuración del cliente: no lo trates como secreto de servidor.
- **Noticias:** [`TechNews.tsx`](src/components/TechNews.tsx) consulta `/api/news` y guarda caché en `localStorage`; [`api/news.ts`](api/news.ts) consulta GNews con `GNEWS_API_KEY` del servidor. El arranque de Vite y la disponibilidad de la función en el entorno de alojamiento son comprobaciones distintas.

## Arranque y lectura

El [README](README.md) indica `npm install`, `npm run dev` y `npm run build`. Las funciones externas requieren su configuración propia; no se comprobó el despliegue. Orden: `App.tsx` → `PublicHome.tsx` → `Projects.tsx`; luego sigue `Chatbot.tsx` o `TechNews.tsx` según lo que quieras entender.
