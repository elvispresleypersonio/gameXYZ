import GameCanvas from "@/game/GameCanvas";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        minHeight: "100vh",
        padding: "32px 16px",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: 0.5 }}>
        BossMan Office Explorer
      </h1>
      <GameCanvas />
    </main>
  );
}
