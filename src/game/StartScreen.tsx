"use client";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
        width: "100%",
        maxWidth: 720,
        padding: "32px 24px",
        borderRadius: 14,
        background: "#1b1d22",
        color: "#fff",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: 1,
          margin: 0,
        }}
      >
        BossMan
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          width: "100%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/BossMan-Large.png"
          alt="BossMan"
          style={{
            width: 160,
            height: "auto",
            imageRendering: "pixelated",
            flexShrink: 0,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>
            BossMan is late to the office and needs to find his &quot;office.&quot;
            Help him navigate!
          </p>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              fontSize: 14,
              lineHeight: 1.6,
              opacity: 0.85,
            }}
          >
            <li>Use the arrow keys to move around the office</li>
            <li>Press the space bar to interact with items</li>
          </ul>
        </div>
      </div>

      <button
        onClick={onStart}
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: "#1b1d22",
          background: "#f5a623",
          border: "none",
          borderRadius: 8,
          padding: "12px 40px",
          cursor: "pointer",
        }}
      >
        Start
      </button>
    </div>
  );
}
