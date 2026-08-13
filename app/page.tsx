"use client";

import { useState } from "react";
import GameCanvas from "@/game/GameCanvas";
import StartScreen from "@/game/StartScreen";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        minHeight: "100vh",
        padding: "32px 16px",
      }}
    >
      {started ? (
        <>
          <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: 0.5 }}>
            BossMan Office Explorer
          </h1>
          <GameCanvas />
        </>
      ) : (
        <StartScreen onStart={() => setStarted(true)} />
      )}
    </main>
  );
}
