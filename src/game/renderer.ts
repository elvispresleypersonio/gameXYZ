import officeMap from "@/data/officeMap.json";

export type TileType = (typeof officeMap.grid)[number][number];

export interface OfficeMap {
  width: number;
  height: number;
  tileSize: number;
  grid: string[][];
  interactionZones: Array<{
    id: string;
    x: number;
    y: number;
    type: string;
    variant?: string;
    message: string;
  }>;
  obstacleTypes: string[];
  startPosition: { x: number; y: number };
}

export interface Camera {
  x: number; // top-left tile x of the viewport
  y: number; // top-left tile y of the viewport
}

export const TILE_SIZE = 32;
export const VIEWPORT_TILES_X = 25;
export const VIEWPORT_TILES_Y = 15;
export const CANVAS_WIDTH = VIEWPORT_TILES_X * TILE_SIZE;
export const CANVAS_HEIGHT = VIEWPORT_TILES_Y * TILE_SIZE;

// Placeholder flat-color tileset — swap for real tile images once art is available.
// Magenta signals an unrecognized tile type so gaps are obvious during development.
const TILE_COLORS: Record<string, string> = {
  floor: "#e4e9ec",
  wall: "#5c636b",
  desk: "#a9805f",
  tree: "#3f8f4f",
  pingPongTable: "#2f6fb3",
  loungeFurniture: "#8d7360",
};
const FALLBACK_COLOR = "#ff00ff";

export function clampCamera(camera: Camera, map: OfficeMap): Camera {
  const maxX = Math.max(0, map.width - VIEWPORT_TILES_X);
  const maxY = Math.max(0, map.height - VIEWPORT_TILES_Y);
  return {
    x: Math.min(Math.max(0, camera.x), maxX),
    y: Math.min(Math.max(0, camera.y), maxY),
  };
}

export function centerCameraOn(
  tileX: number,
  tileY: number,
  map: OfficeMap
): Camera {
  return clampCamera(
    {
      x: tileX - Math.floor(VIEWPORT_TILES_X / 2),
      y: tileY - Math.floor(VIEWPORT_TILES_Y / 2),
    },
    map
  );
}

export function drawTileHighlight(
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  x: number,
  y: number
): void {
  const screenX = (x - camera.x) * TILE_SIZE;
  const screenY = (y - camera.y) * TILE_SIZE;
  ctx.save();
  ctx.fillStyle = "rgba(255, 235, 59, 0.55)";
  ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
  ctx.strokeStyle = "rgba(255, 193, 7, 0.9)";
  ctx.lineWidth = 2;
  ctx.strokeRect(screenX + 1, screenY + 1, TILE_SIZE - 2, TILE_SIZE - 2);
  ctx.restore();
}

export function drawMap(
  ctx: CanvasRenderingContext2D,
  map: OfficeMap,
  camera: Camera
): void {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  for (let row = 0; row < VIEWPORT_TILES_Y; row++) {
    const mapY = camera.y + row;
    if (mapY < 0 || mapY >= map.height) continue;

    for (let col = 0; col < VIEWPORT_TILES_X; col++) {
      const mapX = camera.x + col;
      if (mapX < 0 || mapX >= map.width) continue;

      const tileType = map.grid[mapY][mapX];
      ctx.fillStyle = TILE_COLORS[tileType] ?? FALLBACK_COLOR;
      ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}
