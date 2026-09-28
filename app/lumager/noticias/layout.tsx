import { InstagramDock } from "@/components/lumager/noticias/instagram-dock";
import { getInstagramFeed } from "@/lib/lumager-instagram";
import { archivo } from "../font";
import "../lumager.css";
import "./noticias.css";

/* Noticias de Lumager: el mismo mundo que el inicio (grafito, papel, naranja, Archivo).
   El CTA de Instagram queda fijo en la esquina. */
export default async function NoticiasLayout({ children }: LayoutProps<"/lumager/noticias">) {
  const feed = await getInstagramFeed();
  return (
    <div className={`lx ${archivo.variable}`}>
      {children}
      <InstagramDock feed={feed} />
    </div>
  );
}
