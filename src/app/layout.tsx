
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosmic Explorer | An Interactive Journey Through the Universe",
  description:
    "Explore eight planets in 3D, discover cosmic mysteries, compare planets, calculate space journeys, explore historic missions and test your astronomy knowledge.",
  keywords: [
    "Cosmic Explorer",
    "Solar System",
    "3D planets",
    "Astronomy",
    "Space Missions",
    "Universe Explorer",
    "Space Travel Calculator",
    "Astronomy Quiz",
  ],
  openGraph: {
    title: "Cosmic Explorer",
    description: "Beyond Earth. Beyond Imagination.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
