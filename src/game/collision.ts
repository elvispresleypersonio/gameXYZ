import type { OfficeMap } from "@/game/renderer";

/** Map edges are implicit walls; collision is checked before any position update. */
export function isWalkable(map: OfficeMap, x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) return false;
  const tile = map.grid[y][x];
  if (map.obstacleTypes.includes(tile)) return false;

  // NPCs aren't baked into the tile grid (they're rendered as entities), so
  // block their tile here instead.
  return !map.interactionZones.some(
    (zone) => zone.type === "npc" && zone.x === x && zone.y === y
  );
}
