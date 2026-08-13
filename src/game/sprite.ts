export type Direction = "up" | "down" | "left" | "right";

// The source character sheet only has one static pose per direction (no
// walk-cycle frames), so "animation" here is direction switching only —
// see PRD Step 3 note on cropping/exporting static PNGs.
export const SPRITE_PATHS: Record<Direction, string> = {
  down: "/sprites/bossman-down.png",
  up: "/sprites/bossman-up.png",
  left: "/sprites/bossman-left.png",
  right: "/sprites/bossman-right.png",
};

export type SpriteImages = Partial<Record<Direction, HTMLImageElement>>;

export function loadSprites(
  onEach?: (direction: Direction, image: HTMLImageElement) => void
): Promise<SpriteImages> {
  const directions = Object.keys(SPRITE_PATHS) as Direction[];
  return Promise.all(
    directions.map(
      (direction) =>
        new Promise<[Direction, HTMLImageElement | null]>((resolve) => {
          const img = new Image();
          img.onload = () => {
            onEach?.(direction, img);
            resolve([direction, img]);
          };
          img.onerror = () => resolve([direction, null]);
          img.src = SPRITE_PATHS[direction];
        })
    )
  ).then((results) => {
    const images: SpriteImages = {};
    for (const [direction, img] of results) {
      if (img) images[direction] = img;
    }
    return images;
  });
}

const FALLBACK_COLOR = "#ff00ff";

/** Draws an image (or a fallback square) anchored so its feet sit on the given tile's bottom-center. */
export function drawAnchoredSprite(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | undefined,
  tileX: number,
  tileY: number,
  tileSize: number
): void {
  const feetX = tileX * tileSize + tileSize / 2;
  const feetY = tileY * tileSize + tileSize;

  if (!image) {
    const size = tileSize * 0.8;
    ctx.fillStyle = FALLBACK_COLOR;
    ctx.fillRect(feetX - size / 2, feetY - size, size, size);
    return;
  }

  const drawHeight = tileSize * 2;
  const drawWidth = (image.width / image.height) * drawHeight;
  ctx.drawImage(image, feetX - drawWidth / 2, feetY - drawHeight, drawWidth, drawHeight);
}

/** Draws BossMan anchored so his feet sit on the given tile's bottom-center. */
export function drawBossMan(
  ctx: CanvasRenderingContext2D,
  images: SpriteImages,
  direction: Direction,
  tileX: number,
  tileY: number,
  tileSize: number
): void {
  drawAnchoredSprite(ctx, images[direction], tileX, tileY, tileSize);
}
