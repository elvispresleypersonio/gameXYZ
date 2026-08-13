"use client";

import { useEffect, useRef, useState } from "react";
import officeMap from "@/data/officeMap.json";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  TILE_SIZE,
  centerCameraOn,
  drawMap,
  type OfficeMap,
} from "@/game/renderer";
import {
  drawAnchoredSprite,
  drawBossMan,
  loadSprites,
  type Direction,
  type SpriteImages,
} from "@/game/sprite";
import { isWalkable } from "@/game/collision";
import { findAdjacentZone } from "@/game/interaction";
import { loadNpcSprites, type NpcSpriteImages } from "@/game/npc";
import { playFootstep, playInteractionDing } from "@/game/audio";

const map = officeMap as OfficeMap;
const npcZones = map.interactionZones.filter((zone) => zone.type === "npc");

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

const DIRECTION_DELTA: Record<Direction, { dx: number; dy: number }> = {
  up: { dx: 0, dy: -1 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
  right: { dx: 1, dy: 0 },
};

interface PlayerState {
  x: number;
  y: number;
  direction: Direction;
}

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [player, setPlayer] = useState<PlayerState>({
    x: map.startPosition.x,
    y: map.startPosition.y,
    direction: "down",
  });
  const [sprites, setSprites] = useState<SpriteImages>({});
  const [npcSprites, setNpcSprites] = useState<NpcSpriteImages>({});
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const playerRef = useRef(player);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    Promise.all([loadSprites(), loadNpcSprites()]).then(
      ([loadedSprites, loadedNpcSprites]) => {
        setSprites(loadedSprites);
        setNpcSprites(loadedNpcSprites);
        setAssetsLoaded(true);
      }
    );
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        setDialogMessage((prev) => {
          if (prev) return null;
          const { x, y } = playerRef.current;
          const zone = findAdjacentZone(map, x, y);
          if (!zone) return null;
          playInteractionDing();
          return zone.message;
        });
        return;
      }

      const direction = KEY_TO_DIRECTION[event.key];
      if (!direction || event.repeat) return;
      event.preventDefault();

      setPlayer((prev) => {
        const { dx, dy } = DIRECTION_DELTA[direction];
        const targetX = prev.x + dx;
        const targetY = prev.y + dy;
        if (!isWalkable(map, targetX, targetY)) {
          return prev;
        }
        playFootstep();
        return { x: targetX, y: targetY, direction };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const camera = centerCameraOn(player.x, player.y, map);
    drawMap(ctx, map, camera);

    for (const npc of npcZones) {
      drawAnchoredSprite(
        ctx,
        npcSprites[npc.id],
        npc.x - camera.x,
        npc.y - camera.y,
        TILE_SIZE
      );
    }

    drawBossMan(
      ctx,
      sprites,
      player.direction,
      player.x - camera.x,
      player.y - camera.y,
      TILE_SIZE
    );
  }, [player, sprites, npcSprites]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          position: "relative",
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          borderRadius: 10,
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{ imageRendering: "pixelated", display: "block" }}
        />

        {!assetsLoaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#e4e9ec",
              color: "#5c636b",
              fontFamily: "system-ui, sans-serif",
              fontSize: 14,
            }}
          >
            Loading office…
          </div>
        )}

        {dialogMessage && (
          <div
            className="dialog-box"
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 16,
              background: "rgba(24, 24, 28, 0.92)",
              color: "#fff",
              padding: "14px 16px",
              borderRadius: 8,
              borderLeft: "4px solid #f5a623",
              fontFamily: "system-ui, sans-serif",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35)",
            }}
          >
            <div style={{ fontSize: 14, lineHeight: 1.4 }}>{dialogMessage}</div>
            <div style={{ fontSize: 11, opacity: 0.6, marginTop: 6 }}>
              Press Space to close
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 13,
          opacity: 0.7,
          textAlign: "center",
        }}
      >
        Use arrow keys to move, Space to interact
      </div>
    </div>
  );
}
