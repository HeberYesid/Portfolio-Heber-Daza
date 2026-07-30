# DESIGN.md — Portfolio Heber Daza

**Surface:** Public portfolio (single-page)  
**Mode:** Experience  
**Form:** PCB Circuit Board Schematic  
**Seed:** `939cbd1a`  
**Version:** 1.0 — 2026-07-30

---

## Visual World

### Material

The page is a printed circuit board viewed from above — FR-4 dark substrate with copper traces, gold contact pads, silver vias, and white silkscreen labeling.

| Layer | Token | Color | Role |
|---|---|---|---|
| Substrate | `substrate` | `#080c08` | FR-4 near-black with green undertone — the board itself |
| Ground plane | `plane-ground` | `#060a06` | Deeper substrate for alternating sections |
| Raised surface | `substrate-raised` | `#0e120e` | Elevated chip bodies |
| Copper traces | `trace` / `trace-bright` | `#00c8c8` → `#00e5ff` | Active signal routes, interactive elements |
| Gold pads | `copper` / `pad` | `#c4a44a` → `#d4a843` | Contact points, links, primary actions |
| Silver vias | `via` / `via-bright` | `#a0a8b0` → `#c8d0d8` | Structural borders, passive elements |
| Silkscreen | `silkscreen` / `silkscreen-dim` | `#d8dcd6` → `#8a9088` | Body text, labels, metadata |
| LED green | `led-green` | `#00ff41` | Active status, online indicators |
| LED amber | `led-amber` | `#ffaa00` | Warning/in-progress status |
| LED red | `led-red` | `#ff3344` | Error, reset |

### Typography

| Role | Family | Weight | Size | Tracking |
|---|---|---|---|---|
| Display (name) | Exo 2 | 800 | `clamp(3rem, 8vw, 7rem)` | `-0.04em` |
| Headings (h2) | Exo 2 | 700 | `1.875rem` → `2.25rem` | `-0.025em` (tight) |
| Body | Exo 2 | 400/300 | `0.875rem` → `1.125rem` | normal |
| Technical labels | JetBrains Mono | 400–600 | `0.5rem` → `0.75rem` | `0.08em` → `0.2em` |
| Code, pins, specs | JetBrains Mono | 400–500 | `0.5rem` → `0.75rem` | `0.08em` → `0.15em` |

### Depth System

```css
shadow-component:      0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,200,200,0.08)
shadow-component-hover: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,200,200,0.2), 0 0 24px rgba(0,229,255,0.08)
shadow-trace-glow:      0 0 12px rgba(0,229,255,0.15)
shadow-pad-hover:       0 0 16px rgba(212,168,67,0.3), 0 2px 0 rgba(180,140,60,0.6)
```

All shadows carry offset + soft blur. No zero-blur block shadows.

### Motion

| Animation | Target | Duration | Behavior |
|---|---|---|---|
| `signal-pulse` | ChevronDown, via dots | 2s | Opacity 0.4 ↔ 1, ease-in-out |
| `led-blink` | LED indicators | 1.5s | Opacity 1 ↔ 0.3, ease-in-out |
| `trace-dash` | SVG traces (reserved) | 3s | Stroke dash offset, linear |
| `power-on` | Section entrance (reserved) | 0.6s | Opacity + brightness, ease-out |
| `scan-line` | Decorative overlay (reserved) | 8s | Vertical translate, linear |

Ambient: LED blink on status indicators throughout. Authored: signal pulse invites scroll.  
Reduced motion: all animations collapsed to 0.01ms via `prefers-reduced-motion`.

### Border Radius

```
pad:       0.125rem  — buttons, small interactive elements
component: 0.25rem   — chip bodies, cards, panels
chip:      0.5rem    — reserved for IC outlines (unused in current components)
```

Consistently angular — PCB components have square corners with slight rounding. No pill shapes, no large-radius cards.

---

## Component Designators

Every section and significant element carries a PCB component designator:

| Designator | Section | Description |
|---|---|---|
| U1 | Hero, Header | Central processor — Heber Yesid Daza Toloza |
| U1A–U1D | About | Datasheet specification sub-circuits |
| EXP1–EXP2 | Experience | Signal path nodes |
| M1–M8 | Skills | Peripheral modules with pin counts |
| IC1–IC4 | Projects | Integrated circuits with STACK labels |
| EDU1 | Education | Firmware module |
| CERT1–CERT6 | Education | Certification subsystems |
| J1 | Contact | Main connector with labeled pads |
| J3 | Languages | Auxiliary connector |
| P1–P5 | Contact | Individual contact pads (EMAIL, TEL, LOC, GH, LI) |
| MSG | Contact | Message transmission sub-circuit |
| BUS01–BUS06 | TechNews | Data bus channels |
| GND, VCC, TX, RX, RST | Footer | Pinout terminals |

---

## Layout Structure

```
┌─────────────────────────────────────────────────┐
│ HEADER — fixed top, U1 pad + mono nav labels    │
├─────────────────────────────────────────────────┤
│ HERO — U1 processor center, monumental name     │
│        LED STATUS: ACTIVE, CTA pads              │
├──── trace-line ─────────────────────────────────┤
│ ABOUT — U1 datasheet, 4 spec chips (U1A–U1D)    │
├──── bg-plane-ground ────────────────────────────┤
│ EXPERIENCE — signal path timeline, via dots     │
├──── trace-line ─────────────────────────────────┤
│ SKILLS — 8 peripheral modules (M1–M8)           │
├──── bg-plane-ground ────────────────────────────┤
│ PROJECTS — 4 ICs (IC1–IC4) with STACK labels    │
├──── trace-line ─────────────────────────────────┤
│ EDUCATION — firmware section, cert grid         │
├──── bg-plane-ground ────────────────────────────┤
│ CHATBOT — diagnostic interface, AI              │
├──── trace-line ─────────────────────────────────┤
│ LANGUAGES — J3 connector                        │
├──── bg-plane-ground ────────────────────────────┤
│ TECH NEWS — data bus (BUS01–BUS06)              │
├──── trace-line ─────────────────────────────────┤
│ CONTACT — J1 connector, 5 pads, transmit form   │
├─────────────────────────────────────────────────┤
│ FOOTER — pinout: GND | VCC | TX | RX | RST      │
└─────────────────────────────────────────────────┘
```

Section alternation between `bg-substrate` (inner routing) and `bg-plane-ground` (ground plane). Desktop only: vertical trace-line at `left-8` in every substrate section.

---

## Interactive Language

| Element | Visual | Label Convention |
|---|---|---|
| Primary action (trace) | Cyan border, trace glow on hover | `snake_case` — `ver_proyectos`, `ver_certificados` |
| Secondary action (copper) | Gold border, pad glow on hover | `lowercase` — `contactar` |
| Form submit | Cyan border, Send icon | `UPPERCASE` — `TRANSMITIR`, `ENVIAR` |
| Form labels | Mono micro-text, 0.2em tracking | `UPPERCASE` — `IDENTIFICADOR`, `DIRECCIÓN`, `PAYLOAD` |
| Status | LED indicator + mono label | `UPPERCASE` — `STATUS: ACTIVE`, `ONLINE`, `PROCESANDO...` |
| Empty/error | Mono technical message | `UPPERCASE` — `SIGNAL LOST — NO DATA AVAILABLE`, `FETCHING DATA BUS...` |

---

## Constraints

- **Dark only.** The PCB world is inherently dark. Light mode toggle exists but the palette is not designed for it. Lock dark mode or fully design the light variant.
- **No gradients.** Colors are solid — the PCB aesthetic rejects gradients. Subtle radial gradient in hero background is the sole exception (ambient light, not decoration).
- **No border-radius above 0.5rem.** Components are angular. The geometry belongs to the board, not to soft UI.
- **Mono is silkscreen, not body.** JetBrains Mono reserved for labels, designators, terminal output, and code. Never use mono for running body text.
- **Icons from Lucide only.** Consistent 1.5px stroke weight. No mixed icon libraries. No emoji or unicode glyphs.
