# BossMan Office Explorer

PRD: `documentation/PRD_BossManOfficeExplorer_2026-08.md`
Office layout reference: `documentation/Office Layout Description.txt`

## What this is
A top-down tile-based game where BossMan walks around a pixel-art recreation
of the real office. Built end-to-end with Claude Code as a team demo.

## Stack
- Next.js (App Router), TypeScript, client-rendered
- No backend/API routes, no database — static local JSON + local React state
- HTML5 `<canvas>` for rendering, HTML5 Audio API for sound
- Deployed to Vercel

## Structure
- `app/` — Next.js App Router pages
- `src/data/` — static tile map JSON (`officeMap.json`) and interaction content
- `src/game/` — game engine modules (rendering, input, collision, interaction)
- `public/sprites/` — character sprite sheets (BossMan, NPCs)
- `public/tiles/` — office tileset images
- `images/` — raw reference assets (layout scans, style references) not shipped to the app

## Build steps
The PRD (Section 10) lays out numbered build steps (Step 0–10), each meant to be
one Claude Code session. Follow them in order unless told otherwise.

## Conventions
- One build step per session; use `/clear` before UI-polish-style steps that touch many files at once.
- Tile-grid movement: one tile per keypress, grid-snapped — not continuous/analog movement.
- Keyboard only for v1 (arrow keys to move, Space to interact) — no mobile/touch controls in MVP.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
