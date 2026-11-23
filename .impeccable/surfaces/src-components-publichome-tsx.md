---
version: 1
slug: "src-components-publichome-tsx"
primary_target: "src/components/PublicHome.tsx"
related_targets: []
---

# PublicHome Surface Brief

## Scope
Portafolio completo single-page (`/`) — Hero, About, Experience, Skills, Projects, Education, Chatbot IA, Languages, Tech News, Contact, Header, Footer.

## Visitor Mode
**Experience** — el portafolio es el artefacto. La interfaz retrocede, el trabajo lidera.

## Audience
Reclutadores, hiring managers, colegas tech y clientes freelance (prioridad equitativa). Escanean en 30-60 segundos con múltiples perfiles abiertos. Necesitan decidir si este perfil merece más tiempo.

## Job & Task
En un viewport, entender que este developer escribe código de producción y piensa en sistemas. En 60 segundos, saber qué lo diferencia (SDD + IA), qué stack domina, y cómo contactarlo.

## Direction: PCB / Circuit Board Schematic
El portafolio como placa de circuito impreso. Trazas de cobre/cyan sobre sustrato FR-4 oscuro. El developer como procesador central (U1), skills como periféricos, proyectos como circuitos integrados. Tipografía mono técnica + grotesk. Navegación por trazas: seguir una pista conecta skills con proyectos. Hover ilumina rutas completas. Scroll revela capas de la placa. Header como borde de PCB, footer como pinout de contacto.

## Memorable Moment
Primer viewport: procesador U1 central rodeado de periféricos conectados por trazas routing visibles. LED STATUS. "Backend Developer" legible a escala monumental. El circuito dice "ingeniería" antes que cualquier palabra.

## States
- Chatbot empty: preguntas sugeridas como pads cliqueables
- Loading: pulso de luz recorriendo trazas
- Error: componente FAULT con LED rojo
- Modo oscuro nativo; no hay selector de tema.
- Mobile: trazas colapsan a single-column routing

## Constraints
- React 18 + TypeScript + Vite + Tailwind CSS (stack existente)
- Sin imágenes de proyecto reales (representación abstracta PCB)
- Contenido profesional y chatbot IA no se modifican
- Anti-goals: no template, no ilegible, no lento, no inaccesible

## Open
- Paleta PCB exacta (verde militar vs oliva vs near-black)
- Nivel de realismo de trazas (esquemático vs fotorrealista)
- Tipografía grotesk específica (Inter se mantiene como fallback)
