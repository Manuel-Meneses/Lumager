import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AVIF primero (bastante más liviano que WebP en fotos de obra); WebP para el resto.
  images: { formats: ["image/avif", "image/webp"] },
  // El proyecto es solo Lumager: la raíz lleva a su inicio. Temporal (307) para poder
  // mover /lumager a la raíz más adelante sin redirecciones cacheadas en los navegadores.
  redirects() {
    return [{ source: "/", destination: "/lumager", permanent: false }];
  },
};

export default nextConfig;
