import type { Metadata, Viewport } from "next";
import { lumager } from "@/lib/lumager";
import "./globals.css";

export const metadata: Metadata = {
  title: lumager.name,
  description: lumager.description,
};

export const viewport: Viewport = {
  themeColor: "#1b1d1c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className="antialiased">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
