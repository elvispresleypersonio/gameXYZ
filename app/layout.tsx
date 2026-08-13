import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BossMan Office Explorer",
  description: "Walk BossMan around the office.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
