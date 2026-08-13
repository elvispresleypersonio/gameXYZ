import type { OfficeMap } from "@/game/renderer";

export interface InteractionZone {
  id: string;
  x: number;
  y: number;
  type: string;
  variant?: string;
  message: string;
}

/** MVP rule: interacting works from the zone's own tile or any orthogonally adjacent tile. */
export function findAdjacentZone(
  map: OfficeMap,
  x: number,
  y: number
): InteractionZone | null {
  for (const zone of map.interactionZones as InteractionZone[]) {
    const dx = Math.abs(zone.x - x);
    const dy = Math.abs(zone.y - y);
    const isSameTile = dx === 0 && dy === 0;
    const isOrthogonalNeighbor = dx + dy === 1;
    if (isSameTile || isOrthogonalNeighbor) return zone;
  }
  return null;
}
