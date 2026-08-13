// Placeholder art: recolored variants of BossMan's idle pose (no dedicated
// NPC sprites exist yet) — see PRD Section 6 fallback note.
export const NPC_SPRITE_PATHS: Record<string, string> = {
  "npc-01": "/sprites/npc-01.png",
  "npc-02": "/sprites/npc-02.png",
};

export type NpcSpriteImages = Partial<Record<string, HTMLImageElement>>;

export function loadNpcSprites(): Promise<NpcSpriteImages> {
  const ids = Object.keys(NPC_SPRITE_PATHS);
  return Promise.all(
    ids.map(
      (id) =>
        new Promise<[string, HTMLImageElement | null]>((resolve) => {
          const img = new Image();
          img.onload = () => resolve([id, img]);
          img.onerror = () => resolve([id, null]);
          img.src = NPC_SPRITE_PATHS[id];
        })
    )
  ).then((results) => {
    const images: NpcSpriteImages = {};
    for (const [id, img] of results) {
      if (img) images[id] = img;
    }
    return images;
  });
}
