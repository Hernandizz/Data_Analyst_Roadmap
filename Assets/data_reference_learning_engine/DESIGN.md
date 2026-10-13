---
name: Data Reference & Learning Engine
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4943'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7a73'
  outline-variant: '#bdc9c1'
  surface-tint: '#006c4e'
  primary: '#005d42'
  on-primary: '#ffffff'
  primary-container: '#047857'
  on-primary-container: '#9ffdd3'
  inverse-primary: '#7bd8b1'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#863933'
  on-tertiary: '#ffffff'
  tertiary-container: '#a45049'
  on-tertiary-container: '#ffe4e0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#97f5cc'
  primary-fixed-dim: '#7bd8b1'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#00513a'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ac'
  on-tertiary-fixed: '#3e0405'
  on-tertiary-fixed-variant: '#792f2a'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 1.875rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-xs:
    fontFamily: Hanken Grotesk
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.875rem
    letterSpacing: 0em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 0.875em
    fontWeight: '500'
    lineHeight: inherit
    letterSpacing: -0.01em
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a focused, high-density, authoritative environment engineered for long reading sessions, technical documentation, and interactive data analysis exercises. The aesthetic strips away extraneous visual decoration, decorative gradients, floating blurs, and glassmorphism. It honors the pragmatic clarity of classic documentation hubs like MDN Web Docs, the structured accessibility of W3Schools, and the computational precision of Observable notebooks.

### Design Principles
1. **Content Primacy**: Chrome, badges, and peripheral navigation yield completely to typography, monospace snippets, interactive computational outputs, and data tables.
2. **Absolute Predictability**: Explicit structural boundaries, hairline dividing borders, consistent vertical rhythm, and standard link affordances eliminate cognitive friction.
3. **Ergonomic Endurance**: High contrast paired with subtle off-white backdrops prevents optical fatigue during prolonged coding and analytical study sessions.
4. **Immediate Tactility**: Interactive sandboxes ("Try It Yourself" / "Coba Sendiri"), query consoles, and interactive dataframes feel like dependable developer utilities rather than marketing surfaces.

## Colors

The palette relies on an ultra-disciplined neutral scale accented by a single high-clarity academic emerald green, supplemented by purposeful slate blues for secondary hierarchy.

### Color Tokens & Roles
- **Primary (`#047857`)**: Academic emerald green. Anchors primary calls-to-action ("Run Query", "Try It Yourself"), active progress trackers, selected sidebar items, and verified answer states.
- **Primary Hover / Focus (`#065F46`)**: Deeper emerald state for interactive engagement.
- **Primary Light / Wash (`#ECFDF5`)**: Ultra-soft tinted background for callout tips, active module highlights, and passing test results.
- **Secondary (`#334155`)**: Deep slate. Utilized for meta headers, table column headers, and structural UI chrome.
- **Secondary Surface (`#F1F5F9`)**: Neutral fill for inline code pills, table alternating rows, and disabled action buttons.
- **Canvas Base (`#FFFFFF`)**: Primary reading column and active card background.
- **Canvas Sunken (`#F8FAFC`)**: Fixed sidebars, secondary navigation panels, and interactive runner workspaces.
- **Text Primary (`#0F172A`)**: Near-black slate providing WCAG AAA readability on light canvases.
- **Text Secondary (`#475569`)**: Muted slate for captioning, metadata, navigation chapter titles, and secondary timestamps.
- **Border Default (`#E2E8F0`)**: Crisp 1px structural dividing lines for cards, tables, and sidebars.
- **Code Block Background (`#0F172A`)**: Dark slate monospace container for contrast syntax highlighting in executable Python, SQL, and Pandas blocks.

## Typography

Typography prioritizes continuous scanning and deep reading. **Hanken Grotesk** serves as both the display and reading typeface: its geometric precision and humanist qualities yield distinct letterforms that remain crisp at small navigation scales and comfortable at long-form paragraph lengths. **JetBrains Mono** supplies exact horizontal alignment for syntax, dataframe tables, terminal outputs, and parameter tables.

### Typesetting Rules
- **Prose Line Length**: Body copy in documentation articles is strictly constrained to `max-w-4xl` (65–75 characters per line) to maintain visual tracking without eye fatigue.
- **Code Inlining**: Inline code spans adopt a subtle background badge (`#F1F5F9`) with 1px border (`#E2E8F0`) and strict JetBrains Mono rendering.
- **Line Heights**: Body copy utilizes a generous `1.75rem` line height on a `1rem` base to make technical explanations easily digestible.

## Layout & Spacing

The layout is a 3-zone documentation framework engineered around desktop productivity and responsive reflow:

1. **Left Navigation Rail (Fixed / Collapsible)**: Width fixed at `280px`. Contains deep hierarchical course syllabi, module checklists, and quick-filter inputs.
2. **Central Reading & Workspace Column (Fluid up to `896px` / `56rem`)**: Holds the primary documentation prose, interactive coding sandboxes, and instructional walkthroughs.
3. **Right In-Page Anchor Rail (Sticky)**: Width fixed at `220px` on viewports wider than `1280px`. Displays section jump-links ("On this page") and quick feedback toggles.

### Responsive Breakpoints
- **Desktop (≥ 1280px)**: 3-column split view (Sidebar + Documentation Column + Table of Contents rail).
- **Tablet / Small Desktop (768px – 1279px)**: 2-column view (Sidebar + Full Documentation Column; in-page anchors move to top collapsible dropdown).
- **Mobile (< 768px)**: 1-column reading view. Left sidebar collapses into a persistent top-level drawer with sticky search bar; horizontal margins reduce from `2rem` to `1rem`.

### Spacing Philosophy
Rhythm follows an explicit 4px / 8px baseline. Vertical margins between documentation subheadings and paragraphs remain tightly coupled (`space-sm` to `space-md`), while thematic section breaks use `space-xl` with hairline borders to maintain systematic visual hierarchy.

## Elevation & Depth

This design system rejects diffuse, floating drop shadows and blur filters in favor of **Tonal Layers and Low-Contrast Structural Outlines**.

### Elevation Rules
- **Flat Surface Tiering**: Depth is achieved entirely through background color shifts: `#FFFFFF` (foreground cards and editor surfaces) sits over `#F8FAFC` (ambient background, sidebars, and run consoles).
- **Structural Outlines**: All interactive containers, code editors, and cards utilize a crisp `1px solid #E2E8F0` hairline boundary.
- **Dropdowns & Popovers**: When an element must sit on a higher z-index (e.g., autocompletion menus, search palettes), use a zero-blur, sharp mechanical offset: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)` combined with a 1px solid `#CBD5E1` border.
- **Hover Transitions**: Interactive elements indicate focus or cursor hover through explicit border shifts (from `#E2E8F0` to `#047857`) and subtle background highlights, never through scaling or upward vertical translation.

## Shapes

The design system enforces a **Soft (`1`)** roundedness scale (`0.25rem` / `4px` base radius). This produces clean, precise, tool-grade ergonomics reminiscent of developer IDEs and scientific instruments.

### Application Standards
- **Buttons, Text Inputs, and Badges**: `0.25rem` (`rounded-sm`).
- **Interactive Code Blocks and Sandbox Panels**: `0.375rem` to `0.5rem` (`rounded-md` / `rounded-lg`).
- **Data Tables**: Outer boundary `0.375rem` (`rounded-md`); inner cells remain square for clear grid alignment.
- **Pill-shaped elements**: Strictly reserved for count badges and active status indicators.

## Components

### 1. Buttons
- **Primary ("Run Code", "Next Lesson")**: Solid `#047857` background with `#FFFFFF` text. Sharp hover state shifting to `#065F46`. Focus state shows a 2px offset ring in `#047857`. Height: `36px` (compact) or `40px` (default).
- **Secondary ("Reset Code", "Copy")**: `#FFFFFF` background, `1px solid #E2E8F0`, `#334155` text. On hover, background shifts to `#F8FAFC` and border shifts to `#94A3B8`.
- **Tertiary / Ghost**: Borderless, `#475569` text, background shifts to `#F1F5F9` on hover.

### 2. Interactive "Try It Yourself" (Coba Sendiri) Widget
- **Structure**: A split or stacked dual-pane component.
- **Header Bar**: `#F1F5F9` background, `1px solid #E2E8F0`, housing file name tab (`main.py` or `query.sql`), execution timing stats (`0.04s`), and a primary emerald "Run" button.
- **Editor Window**: Dark slate (`#0F172A`) or clean light IDE surface with line numbers rendered in `#64748B` JetBrains Mono.
- **Output Console**: Direct execution output container immediately adjacent, separated by a 1px border. Renders dataframe tables or stdout with a distinct status badge.

### 3. Data Tables (DataFrames & Reference Tables)
- **Header**: `#F8FAFC` background with `#0F172A` bold text, bottom border `2px solid #CBD5E1`.
- **Rows**: Alternating striping (odd `#FFFFFF`, even `#F8FAFC`), bottom border `1px solid #E2E8F0`. Padding: `8px 12px` per cell for dense data review.
- **Numeric Cells**: JetBrains Mono font with tabular numbers and right alignment.

### 4. Code Blocks & Syntax Highlighting
- **Inline**: `#F1F5F9` fill, `1px solid #E2E8F0`, padding `2px 6px`, JetBrains Mono text.
- **Display Block**: `#0F172A` background, `1px solid #1E293B` border, padding `1rem`. Top-right copy action button appears on hover. Syntax colors strictly differentiate keywords (emerald/cyan), strings (amber), comments (slate-400), and operators (rose-400).

### 5. Navigation Sidebar Items
- **Inactive**: `#475569` text, hover background `#F1F5F9` with `#0F172A` text.
- **Active / Current Lesson**: `#ECFDF5` background, `#047857` bold text, with an explicit `3px` solid `#047857` left border indicator.
- **Completed Lesson**: Inactive text accompanied by a miniature `#047857` checkmark icon.

### 6. Callout Cards (Notes, Warnings, Tips)
- **Container**: `1px solid #E2E8F0` border, `rounded-md`, padding `1rem`, with a `4px` solid accent border on the left margin.
- **Tip**: Green border `#047857`, background `#F0FDF4`.
- **Important**: Slate border `#334155`, background `#F8FAFC`.
- **Warning**: Amber border `#D97706`, background `#FFFBEB`.

### 7. Form Controls & Inputs
- **Text Inputs**: Flat `#FFFFFF` surface, `1px solid #CBD5E1` border, `0.25rem` radius. Focus ring: `2px solid #047857` with 0px blur offset.
- **Checkboxes & Radios**: Emerald accent color (`#047857`) when checked, with crisp high-contrast checkmarks.