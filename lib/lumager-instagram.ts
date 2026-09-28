/**
 * Instagram de Lumager (@lumager.energia) para el CTA de la esquina en /lumager/noticias.
 *
 * Instagram no deja leer las publicaciones de una cuenta sin iniciar sesión: el perfil, la API
 * pública y la versión embebida devuelven solo la cáscara de la página (probado el 28 de
 * septiembre de 2026). Por eso las últimas publicaciones llegan por la API oficial:
 *
 *   INSTAGRAM_ACCESS_TOKEN = token de larga duración de la cuenta @lumager.energia
 *   (API de Instagram con inicio de sesión de Instagram; cuenta profesional).
 *
 * Con el token, el CTA muestra las últimas seis publicaciones reales y los números en vivo, y se
 * renueva cada hora. Sin el token muestra fotos de obra de Lumager (las mismas de /lumager) que
 * llevan al perfil, sin simular publicaciones, y los números del perfil relevados a mano.
 * TODO(negocio): pedirle el token a Lumager y cargarlo en el entorno de producción.
 */

export const instagram = {
  handle: "lumager.energia",
  url: "https://www.instagram.com/lumager.energia/",
  /** Números del perfil al 28 de septiembre de 2026 (descripción pública del perfil). */
  followers: 11_000,
  posts: 480,
} as const;

export type InstagramPost = {
  id: string;
  href: string;
  image: string;
  /** Primera línea del texto de la publicación, para el texto alternativo y el título. */
  caption: string;
  /** Fecha ISO, solo en publicaciones reales. */
  at?: string;
  video?: boolean;
  /** Imagen remota del CDN de Instagram: se sirve sin optimizar (sus URL firmadas vencen). */
  remote?: boolean;
};

export type InstagramFeed = {
  live: boolean;
  followers: number;
  postsCount: number;
  posts: InstagramPost[];
};

/** Fotos de obra propias para cuando no hay token: cada una lleva al perfil. */
const obraPhotos: InstagramPost[] = [
  { id: "drone", href: instagram.url, image: "/lumager/parque-solar-drone.jpg", caption: "Parque solar visto desde el drone" },
  { id: "montaje", href: instagram.url, image: "/lumager/obra-montaje.jpg", caption: "Montaje de estructuras en obra" },
  { id: "tableros", href: instagram.url, image: "/lumager/tableros-parque.jpg", caption: "Tableros de un parque solar" },
  { id: "bombeo", href: instagram.url, image: "/lumager/bombeo-solar.jpg", caption: "Bombeo solar" },
  { id: "carport", href: instagram.url, image: "/lumager/carport-solar.jpg", caption: "Carport solar sobre estacionamiento" },
  { id: "media-tension", href: instagram.url, image: "/lumager/media-tension.jpg", caption: "Obra de media tensión" },
];

const fallback: InstagramFeed = { live: false, followers: instagram.followers, postsCount: instagram.posts, posts: obraPhotos };

type GraphMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

const firstLine = (s = "") => s.split("\n")[0].trim().slice(0, 140);

/** Últimas publicaciones y números del perfil. Nunca falla: ante cualquier error, el respaldo. */
export async function getInstagramFeed(): Promise<InstagramFeed> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return fallback;

  const base = "https://graph.instagram.com/v21.0/me";
  const opts = { next: { revalidate: 3600 } };
  try {
    const [profileRes, mediaRes] = await Promise.all([
      fetch(`${base}?fields=followers_count,media_count&access_token=${token}`, opts),
      fetch(`${base}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=6&access_token=${token}`, opts),
    ]);
    if (!profileRes.ok || !mediaRes.ok) return fallback;
    const profile = (await profileRes.json()) as { followers_count?: number; media_count?: number };
    const media = (await mediaRes.json()) as { data?: GraphMedia[] };

    const posts = (media.data ?? [])
      .map((m): InstagramPost | null => {
        const image = m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url;
        if (!image) return null;
        return {
          id: m.id,
          href: m.permalink,
          image,
          caption: firstLine(m.caption) || "Publicación de Lumager en Instagram",
          at: m.timestamp,
          video: m.media_type === "VIDEO",
          remote: true,
        };
      })
      .filter((p): p is InstagramPost => !!p);
    if (!posts.length) return fallback;

    return {
      live: true,
      followers: profile.followers_count ?? instagram.followers,
      postsCount: profile.media_count ?? instagram.posts,
      posts,
    };
  } catch {
    return fallback;
  }
}
