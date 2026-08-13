# PRD: BossMan Office Explorer

## 1. Header Block

| Field | Value |
|---|---|
| Project name | BossMan Office Explorer |
| Owner | Kevin |
| Runtime | Next.js (App Router, TypeScript), client-side rendered |
| Schedule | N/A — always-on interactive web app, no scheduled jobs |
| Delivery method | Deployed to Vercel, shared as a link with the team |
| Status | Ready to build |

---

## 2. Problem Statement

The team has heard about Claude Code but hasn't seen a tangible, memorable example of what it can build quickly. Abstract demos (CLI output, code diffs) don't stick the way something playable does. A small top-down game starring BossMan, walking around the *actual* office layout, gives the team a fun, recognizable, hands-on artifact — built end-to-end with Claude Code — that doubles as an icebreaker and a "what's possible" showcase. Without it, the demo stays theoretical instead of something people open, laugh at, and remember.

---

## 3. Target Users

| User group | Description |
|---|---|
| Primary | Kevin's immediate team — will play the game live in a demo/icebreaker setting |
| Secondary | Kevin (builder/presenter) — needs a clean, reliable build to demo confidently |

---

## 4. Key Entities / Subjects

| Entity | Notes |
|---|---|
| BossMan | Playable character, in-game display name for the "Sanchit Shekhar" (`OFFICE_WORKER_01`) sprite sheet |
| Office floor plan | Real layout confirmed — single open floor with desk clusters, meeting rooms, reception, kitchens, courtyard |
| Whelan's | BossMan's "home" meeting room — special interaction ("Oh I found my office") |
| Other meeting rooms | The Snug, Tonic's, The Bernard Shaw, Crogan's, Mary's, Johnnie Fox's, O'Donoghue's, An Póitín, The Garden, O'Neill's, The Brazen Head — all share the same joke interaction ("This isn't my office!") |
| Desks | Non-interactive for MVP (obstacle tiles only) — see Open Decisions |
| Kitchen / break areas (x2) | Interactive zones — trigger a kitchen-themed tooltip |
| Courtyard, ping pong table, checkered lounge furniture | Decorative obstacles — block movement, no tooltip |
| Walls / furniture / obstacles | Non-walkable tiles — block movement |
| Decorative NPCs | Static characters standing around the office (recommended — see Open Decisions) |

> **Assets confirmed:** Character Sheet (`Shantanu_Character_Sheet.jpeg`), RAW office layout (`RAW_office_layout.png`), and pixel-art reference (`pixel_office.png`) have all been received. Section 6 has been updated accordingly — the Gemini prompts are now optional/fallback only.

---

## 5. Interaction Types and Trigger Tiers

*(Adapted from "signal types" — for a game, this maps interaction zones to trigger behaviour.)*

| Interaction type | Trigger | Behaviour |
|---|---|---|
| BossMan's own desk | BossMan adjacent + Space bar | Tooltip: **"Hey that's my bag and stuff, but this isn't my office!"** (location: bottom row of desks, between the Pantry/Workspace Room and the ping pong table, ~tile 18,24) |
| Whelan's (BossMan's "office") | BossMan enters the room / at the doorway + Space bar | Tooltip: **"Oh, I found my office!"** |
| Any other meeting room (The Snug, Tonic's, The Bernard Shaw, Crogan's, Mary's, Johnnie Fox's, O'Donoghue's, An Póitín, The Garden, O'Neill's, The Brazen Head) | BossMan enters the room / at the doorway + Space bar | Tooltip: **"This isn't my office!"** (same message reused for all of these — one shared zone type) |
| Kitchen/break area (x2) | BossMan enters zone + Space bar | Small kitchen (near reception): **"Hey this is close to my office"** &nbsp;•&nbsp; Main kitchen: **"Ooh it's not lunch time yet, but let's grab a quick coffee"** |
| Decorative NPCs (x2) | BossMan adjacent to NPC + Space bar | Tooltip: NPC asks **"Is your office free yet?"** (variation optional per NPC) |
| Other desks (not BossMan's) | — | Obstacle only, no tooltip |
| Courtyard trees / ping pong table / checkered lounge furniture | Any movement input toward it | Obstacle — blocks movement, purely decorative, no tooltip |
| Wall / furniture / obstacle | Any movement input toward it | Movement blocked — BossMan stays on current tile, no animation frame advance into it |
| Floor (open, incl. checkered lounge floor & courtyard path) | Movement input | BossMan moves one tile in that direction |

---

## 6. Internal or Contextual Sources

| Source | Access method | Provides |
|---|---|---|
| `Shantanu_Character_Sheet.jpeg` | Committed to `/public/sprites/` | BossMan's voxel character sheet — 8-direction reference views, item slots, stats block (flavor only, not used mechanically in MVP) |
| `Office Layout Description.txt` | MD sytle description of office layout | Buklt off of ground-truth CAD-style floor plan — room names, desk cluster positions, doors, kitchens, courtyard |
| `pixel_office.png` | Visual/art style reference | Isometric voxel-style rendering of the same layout — style guide for tileset art direction |
| In-joke content (Whelan's / other meeting rooms) | Confirmed inline — see Section 5 | "Oh, I found my office!" vs "This isn't my office!" |
| Kitchen tooltip content | Still needed from Kevin | Short kitchen-themed message(s) for the two kitchen zones |

### Sprite sheet note
The character sheet includes 8 directional frames (N/S/E/W/NE/SE/SW/NW). MVP movement only uses 4 (up/down/left/right), so Step 3 only needs to wire up the N/S/E/W frames — the diagonals can be ignored for now or reserved for a future 8-directional movement upgrade.

### Fallback asset generation (Gemini image prompts)

Real assets are now available, so these are optional — useful only if you want additional art (e.g. NPCs, or a cleaned-up tileset extracted from the isometric reference) rather than hand-tracing the tileset from `pixel_office.png`.

**BossMan sprite sheet (walk cycle, 4 directions):**
```
Create a 16-bit top-down RPG character sprite sheet in the style of classic
Pokemon/Zelda games. Character: a friendly cartoon office boss character
named "BossMan" — [describe hair, outfit, glasses, etc. from character sheet].
Layout: 4 rows x 4 columns, each row is a walk-cycle animation for one
direction (down, up, left, right), each column is one animation frame.
Transparent background. Consistent 32x32 pixel tile size per frame.
Flat, clean pixel-art shading, no gradients, no outlines outside the
character silhouette.
```

**Office tileset (floor, walls, desks, doors):**
```
Create a 16-bit top-down pixel-art tileset for an office environment, in
the style of classic Pokemon/Zelda RPG games. Include: carpet floor tile,
wall tile (straight + corner variants), office desk with computer monitor
(top-down view), meeting room table with chairs, kitchen counter with
sink/fridge, doorway tile. Each tile 32x32px, consistent color palette
(muted blues/greys/wood tones), transparent background, arranged in a
grid sheet with clear spacing between tiles.
```

**Decorative NPC sprites (optional, static):**
```
Create 3 top-down 16-bit pixel-art office worker characters, standing
idle pose only (single frame, facing down), in the same art style and
palette as [reference the BossMan sprite]. Each character should look
visually distinct (different hair/outfit colors). 32x32px each,
transparent background.
```

---

## 7. Feature List

**Core (MVP)**
- BossMan renders on a tile-based office map, top-down perspective, 32px tiles
- ~42x26 tile map, ~25x15 tile viewport with camera-follow scrolling
- Arrow key movement (up/down/left/right), one tile per keypress, grid-snapped
- Collision detection — cannot walk through walls/furniture/obstacles
- Walk-cycle animation (4-direction sprite sheet, extracted from the 8-direction reference)
- Space bar triggers tooltip/dialog at BossMan's desk, meeting rooms, kitchens, and NPCs
- Footstep sound on movement, interaction "ding" sound on tooltip trigger
- Static, pre-authored tile map JSON matching real office layout
- Deployed to Vercel, shareable link

**Enhanced**
- 2 decorative static NPCs, each asking "Is your office free yet?" when BossMan interacts with them
- Simple on-screen control hint / legend ("Use arrow keys to move, Space to interact")

**Advanced**
- Mobile/touch on-screen D-pad fallback (explicitly out of scope for the laptop demo, could be added later)
- Multiple floors with stairs/elevator transitions
- Easter-egg interactions (rare/hidden tooltips)
- Simple day/night or lighting toggle for visual flair
- Shareable "screenshot moment" / achievement popup
- 8-directional diagonal movement (sprite sheet already supports it)

---

## 8. User Flow

### Automated flow (what the system does each session)
1. App loads → fetches static tile map JSON and sprite assets from `/public`
2. Renders office grid on a `<canvas>` (or DOM grid), camera centered on BossMan's start tile
3. Listens for arrow key input
4. On keypress: checks target tile against collision map
   - If walkable → moves BossMan one tile, advances walk-cycle frame, updates camera offset
   - If blocked → ignores movement, no state change
5. On interact keypress: checks BossMan's current tile / facing tile against interaction zones
   - If a zone matches → displays tooltip/dialog with associated text
   - If no match → no-op
6. Loop continues on each input event (no fixed tick/schedule — event-driven)

### Human experience
1. Team member opens the Vercel link
2. Sees BossMan standing in the office, rendered in a familiar top-down layout
3. Uses arrow keys to walk him around, laughing at recognizing real desks/rooms
4. Walks up to a colleague's desk and presses the interact key — a tooltip pops up with an in-joke
5. Explores the whole floor, hits a few more tooltips, then hands control to the next person

---

## 9. Technical Preferences

| Aspect | Choice |
|---|---|
| Runtime | Next.js 14+ (App Router), TypeScript, client component for game canvas |
| Schedule | N/A — event-driven, no cron/scheduled jobs |
| Data sources | Static local JSON (tile map, interaction content) — no runtime API calls |
| APIs used | None required for MVP (no AI API dependency, consistent with your no-runtime-API preference) |
| AI model | N/A for MVP — not used at runtime |
| Rendering | HTML5 `<canvas>`, 32px tile size, ~25x15 tile viewport (800x480px canvas), camera-follow scrolling |
| Audio | HTML5 Audio API — footstep sound on movement, short "ding" on interaction; gated behind first user input (click/keypress) to satisfy browser autoplay policies |
| Input | Keyboard only for v1 — arrow keys for movement, Space bar for interact (no mobile/touch controls) |
| Output/delivery | Deployed as a static/client-rendered Next.js app on Vercel |
| State management | Local React state (`useState`/`useReducer`) — no backend persistence needed |
| Error handling | Guard against out-of-bounds movement (treat map edge as collision); fallback placeholder sprite if an asset fails to load |

---

## 10. Architecture — Numbered Build Steps

Each step below is written as a standalone handoff prompt for a single Claude Code session, per your usual one-step-per-session workflow.

### Step 0 — Project Setup
**What it does:** Scaffolds the Next.js + TypeScript project, folder structure, and base dependencies.
**Inputs:** None (fresh repo)
**Outputs:** Runnable Next.js app skeleton, `/public/sprites/`, `/public/tiles/`, `/src/data/`, `/src/game/` folders created
**Key decisions:** Use App Router; no backend/API routes needed for MVP; set up `CLAUDE.md` at root referencing this PRD's path (`/docs/PRD_BossManOfficeExplorer_2026-08.md`).

### Step 1 — Office Tile Map Data
**What it does:** Defines the static JSON structure representing the office floor as a grid of tiles (floor, wall, desk, meeting-room, kitchen, courtyard obstacle), hand-authored from `Office Layout Description.txt`.
**Inputs:** `Office Layout Description.txt` (ground truth positions), `pixel_office.png` (style reference)
**Outputs:** `/src/data/officeMap.json`
**Key decisions:**
- Confirmed dimensions: **42x26 tiles at 32px each** (~1344x832px full map) — matches the real layout's proportions and gives enough detail to see the character and objects clearly against a ~25x15 tile viewport.
- Use a simple 2D array of tile-type codes plus a separate metadata layer for interactive zones.
- Meeting rooms use a shared `meetingRoom` type with a `variant` field so Whelan's can carry a distinct message from every other pub-named room without needing 11 separate zone types.
- BossMan's own desk gets a unique `id` and message (location + joke text pending Kevin's reference image); all other desks are plain `obstacle` tiles.
- Courtyard trees, ping pong table, and checkered-lounge furniture are `obstacle` tiles — not interactive, just collision.
- Two kitchen zones each get their own `id` so they can eventually carry different messages if desired.

Example schema:
```json
{
  "width": 42,
  "height": 26,
  "tileSize": 32,
  "grid": [
    ["floor", "floor", "wall", "desk", "..."],
    ["..."]
  ],
  "interactionZones": [
    { "id": "bossmans-desk", "x": 18, "y": 24, "type": "desk", "variant": "personal", "message": "Hey that's my bag and stuff, but this isn't my office!" },
    { "id": "whelans", "x": 12, "y": 4, "type": "meetingRoom", "variant": "home", "message": "Oh, I found my office!" },
    { "id": "the-snug", "x": 3, "y": 2, "type": "meetingRoom", "variant": "other", "message": "This isn't my office!" },
    { "id": "kitchen-main", "x": 20, "y": 3, "type": "kitchen", "message": "Ooh it's not lunch time yet, but let's grab a quick coffee" },
    { "id": "kitchen-small", "x": 8, "y": 14, "type": "kitchen", "message": "Hey this is close to my office" },
    { "id": "npc-01", "x": 15, "y": 10, "type": "npc", "message": "Is your office free yet?" },
    { "id": "npc-02", "x": 22, "y": 18, "type": "npc", "message": "Is your office free yet?" }
  ],
  "obstacleTypes": ["wall", "desk", "tree", "pingPongTable", "loungeFurniture"],
  "startPosition": { "x": 1, "y": 1 }
}
```
Author enough of the grid to match the real layout's overall shape (desk cluster blocks, central courtyard, perimeter rooms) — pixel-perfect tile-for-tile accuracy isn't necessary, just recognizable placement and proportions.

### Step 2 — Tile Rendering Engine
**What it does:** Renders the office grid onto a `<canvas>` using the tile map JSON, with camera offset support.
**Inputs:** `officeMap.json`, tileset image(s)
**Outputs:** A rendering module that draws the visible viewport of tiles given a camera position
**Key decisions:** Canvas sized to ~25x15 tiles (800x480px at 32px tiles) — only render tiles within this viewport, not the whole 42x26 map every frame. This keeps BossMan and nearby objects clearly visible while the camera scrolls.

### Step 3 — BossMan Sprite & Animation System
**What it does:** Extracts the 4 cardinal-direction frames (N/S/E/W) from `Shantanu_Character_Sheet.jpeg` and manages walk-cycle/idle frame state.
**Inputs:** `Shantanu_Character_Sheet.jpeg` (or a cropped/re-exported version isolating just the 4 cardinal frames), current facing direction, moving/idle state
**Outputs:** A draw function that renders the correct frame each render tick
**Key decisions:**
- The source sheet has 8 directions; only N/S/E/W are needed for MVP arrow-key movement — diagonals (NE/SE/SW/NW) can be left unused or reserved for a future upgrade.
- The sheet's item slots and stats block (coffee, laptop, ID badge, HP/Speed/Stamina, "Coffee Break" perk) are flavor text on the reference sheet, not game mechanics — ignore for MVP unless later added as an Advanced-tier feature.
- If the cardinal frames aren't cleanly separable as individual sprites, crop/export them once as static PNGs rather than parsing the whole reference sheet at runtime.

### Step 4 — Movement & Input Handling
**What it does:** Listens for arrow key events and translates them into tile-based movement requests.
**Inputs:** Keyboard events, current BossMan position
**Outputs:** Updated position state (or blocked/no-op)
**Key decisions:** Debounce/queue input so rapid key presses don't desync from animation; movement is one tile per press (not continuous hold-to-run) per your tile-grid choice. Trigger footstep sound on each successful move.

### Step 5 — Collision System
**What it does:** Checks whether a target tile is walkable before allowing movement.
**Inputs:** Target tile coordinates, tile map grid
**Outputs:** Boolean walkable/blocked result
**Key decisions:** Treat map edges as implicit walls; collision check happens before position update, not after.

### Step 6 — Interaction System
**What it does:** Detects when BossMan is at/adjacent to an interaction zone and Space bar is pressed, then displays a tooltip/dialog and plays an interaction sound.
**Inputs:** BossMan's current position + facing direction, `interactionZones` from map JSON, Space bar keypress
**Outputs:** Dialog/tooltip UI state (open, message text), interaction "ding" sound trigger
**Key decisions:** Decide whether interaction requires facing the zone or just being adjacent (simpler: adjacent, any direction, for MVP). NPCs (type `npc`) use the same interaction pathway as desks/rooms — no separate system needed.

### Step 7 — Interaction Content
**What it does:** Populates the `message` field for each interaction zone with actual content.
**Inputs:** All content confirmed — see Section 5 and the schema in Step 1
**Outputs:** Updated `officeMap.json` with all real content
**Key decisions:** Keep messages short (1–2 sentences) so the tooltip UI doesn't need scrolling — all confirmed messages already fit this.

### Step 8 — Decorative NPCs *(Enhanced tier)*
**What it does:** Places 2 static, non-interactive-to-move (but interactive-via-Space) character sprites around the office. Each responds with "Is your office free yet?" when BossMan interacts with them.
**Inputs:** NPC sprite images, fixed positions in the map JSON, NPC dialogue text
**Outputs:** NPCs rendered alongside BossMan, with the same tooltip interaction pattern as Step 6
**Key decisions:** Purely decorative for movement (no AI/pathing logic) — but they do participate in the interaction system, unlike plain obstacles.

### Step 9 — UI Polish
**What it does:** Adds the on-screen control hint, dialog box styling, and general visual polish pass.
**Inputs:** Existing game state
**Outputs:** Finished-feeling UI layer
**Key decisions:** Use `/clear` (not `/compact`) before this session per your usual pattern, since it touches many files at once.

### Step 10 — Deployment
**What it does:** Connects the repo to GitHub, configures Vercel deployment.
**Inputs:** GitHub repo (SSH auth per your convention), Vercel project
**Outputs:** Live shareable URL
**Key decisions:** Static/client-only app — no environment variables or secrets needed for MVP, so Vercel setup should be close to zero-config.

---

## 11. Open Decisions

| Decision | Notes / Recommendation |
|---|---|
| Diagonal movement / 8-directional upgrade | Sprite sheet already supports it — not in MVP scope, flagged as an easy Advanced-tier add later |

All other content and scoping decisions are resolved — see Sections 4–9 for confirmed values.
