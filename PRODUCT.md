# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary audience (equal priority):**
- **Reclutadores y hiring managers** que evalúan el perfil para decidir si entrevistar o contratar.
- **Colegas y comunidad tech** que buscan conocer el trabajo, colaborar o aprender de los proyectos.
- **Clientes potenciales freelance** interesados en contratar para proyectos de desarrollo.

**Key job across all audiences:** entender rápidamente quién es Heber, qué sabe hacer, y qué lo diferencia — con suficiente profundidad técnica para tomar una decisión informada.

## Product Purpose

Portafolio profesional de Heber Yesid Daza Toloza. Expone su perfil como Ingeniero de Sistemas en formación y Backend Developer, sus proyectos, habilidades técnicas, trayectoria y datos de contacto. Incluye un chatbot con IA (Gemini) que responde preguntas sobre su perfil usando contexto estructurado.

## Positioning

**SDD + IA como ventaja competitiva.** Heber se diferencia por integrar Specification-Driven Development (SDD) y uso intensivo de IA en el ciclo de desarrollo — Claude Code, Model Context Protocol (MCP), flujos asistidos por IA — como mecanismo para entregar software con mayor velocidad, calidad y trazabilidad que un desarrollador backend tradicional con el mismo stack.

## Operating Context

- Visitantes llegan desde LinkedIn, GitHub, búsquedas orgánicas, o referidos.
- El chatbot con IA permite a reclutadores hacer preguntas específicas sin necesidad de leer todo el portafolio.
- El portafolio mismo es evidencia de capacidad técnica (código público, deploy real, tests automatizados).
- La versión actual está desplegada en Vercel: `https://portfolio-heber-dazas-projects.vercel.app/`

## Capabilities and Constraints

**Capabilities confirmadas:**
- Single-page portfolio con secciones: Hero, Sobre mí, Experiencia, Habilidades, Proyectos, Educación, Chatbot IA, Idiomas, Tech News, Contacto.
- Modo oscuro PCB; no se ofrece una variante clara.
- Contacto mediante el cliente de correo del visitante y enlaces directos a otros canales.
- Chatbot impulsado por Google Gemini (gemini-flash-latest) que responde usando datos estructurados del perfil (PORTFOLIO_CONTEXT).
- Diseño responsivo (mobile, tablet, desktop).
- Tests automatizados con Vitest y React Testing Library.
- Deploy en Netlify y Vercel.

**Constraints:**
- La API key de Gemini es una variable de entorno (`VITE_GEMINI_API_KEY`) — el chatbot depende de que esté configurada.
- Contenido en español como idioma principal.
- Datos profesionales (nombre, experiencia, proyectos, educación) son hechos reales y no deben inventarse ni alterarse.

## Brand Commitments

- **Nombre:** Heber Yesid Daza Toloza — fijo.
- **Datos profesionales:** experiencia laboral, educación, proyectos, habilidades, certificaciones y datos de contacto son hechos verificables y no deben modificarse sin confirmación.
- **Sin identidad visual definida:** no hay logo, guía de marca, paleta oficial ni activos de diseño vinculantes. El diseño actual es libre de evolucionar.

## Evidence on Hand

- **Proyectos reales con código público:** Investment Tracker, Code Duel, Aula AlDía, Concurrent Scheduler Lab — todos en GitHub con demos desplegadas.
- **Certificaciones:** 23 certificaciones adicionales documentadas en `https://github.com/HeberYesid/Certificados`.
- **Experiencia laboral verificable:** dos períodos en EXCOMIN SAS con responsabilidades y logros específicos.
- **No hay testimonios de terceros, case studies externos ni métricas de impacto** — no deben fabricarse.

## Product Principles

1. **La profundidad técnica convence más que el marketing.** Mostrar código real, arquitectura, tests y decisiones de diseño pesa más que claims genéricos.
2. **El portafolio es evidencia, no solo escaparate.** Cada proyecto listado debe ser inspeccionable (GitHub) y demostrable (demo live).
3. **La IA como extensión del perfil, no como truco.** El chatbot no es un gimmick — es una forma legítima de que reclutadores exploren el perfil haciendo preguntas naturales.
4. **Una sola fuente de verdad profesional.** El PORTFOLIO_CONTEXT centraliza los datos del perfil; el chatbot, la UI y cualquier futura integración deben derivar de esa misma fuente.

## Accessibility & Inclusion

- Sitio en español como idioma principal, con markup semántico.
- Soporte para lectores de pantalla mediante roles ARIA y atributos `aria-label` en interacciones clave.
- Contraste en el tema oscuro PCB.
