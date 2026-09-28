/**
 * Logos de clientes, entidades de financiamiento y prensa que aparecen en /lumager.
 * Cada archivo sale del sitio oficial de la organización (o de Wikimedia Commons en el
 * caso de Santander, cuyo sitio no se deja descargar), bajado en septiembre de 2026,
 * recortado y convertido a silueta: la página los pinta en un solo color con una máscara.
 * Clientes: solo los que tienen obra en video en el canal de Lumager (lib/lumager-videos.ts).
 * Financiamiento: las entidades de sus piezas "Financiá tu parque solar".
 * TODO(negocio): confirmar con Lumager que puede mostrar los logos de sus clientes.
 */
export type LogoId =
  | "taranto"
  | "solfrut"
  | "uccuyo"
  | "cetal"
  | "cofeco"
  | "santander"
  | "bna"
  | "cfi"
  | "fiduciaria-san-juan"
  | "bichos-de-campo";

export type Logo = {
  id: LogoId;
  name: string;
  /** Medidas del PNG en public/lumager/logos (solo para la proporción). */
  w: number;
  h: number;
  source: string;
};

export const logos: Record<LogoId, Logo> = {
  taranto: { id: "taranto", name: "Taranto", w: 234, h: 39, source: "https://www.taranto-argentina.com/" },
  solfrut: { id: "solfrut", name: "Solfrut", w: 615, h: 160, source: "https://www.solfrut.com.ar/" },
  uccuyo: { id: "uccuyo", name: "Universidad Católica de Cuyo", w: 177, h: 93, source: "https://www.uccuyo.edu.ar/" },
  cetal: { id: "cetal", name: "Cooperativa Eléctrica de Tres Algarrobos", w: 111, h: 109, source: "https://cetal.ar/" },
  cofeco: { id: "cofeco", name: "Plásticos COFECO", w: 430, h: 160, source: "https://plasticoscofeco.ar/" },
  santander: {
    id: "santander",
    name: "Banco Santander",
    w: 918,
    h: 160,
    source: "https://commons.wikimedia.org/wiki/File:Banco_Santander_Logotipo.svg",
  },
  bna: { id: "bna", name: "Banco Nación", w: 442, h: 160, source: "https://www.bna.com.ar/" },
  cfi: { id: "cfi", name: "Consejo Federal de Inversiones", w: 430, h: 160, source: "https://cfi.org.ar/" },
  "fiduciaria-san-juan": {
    id: "fiduciaria-san-juan",
    name: "Fiduciaria San Juan",
    w: 476,
    h: 99,
    source: "https://fiduciariasanjuan.com/",
  },
  "bichos-de-campo": { id: "bichos-de-campo", name: "Bichos de Campo", w: 753, h: 102, source: "https://bichosdecampo.com/" },
};

/** Clientes con logo, cada uno con su video de obra (id de YouTube). */
export const clientLogos: { logo: LogoId; video: string }[] = [
  { logo: "taranto", video: "fh-zAupFcQM" },
  { logo: "solfrut", video: "06s3nw9Xroo" },
  { logo: "uccuyo", video: "ZnbMpmFPqcg" },
  { logo: "cetal", video: "ArlRTN8fIpY" },
  { logo: "cofeco", video: "IwcfLgW-ens" },
];

/** Entidades de financiamiento, en el orden de la sección y con la fila que abren. */
export const financeLogos: { logo: LogoId; line: string }[] = [
  { logo: "santander", line: "santander" },
  { logo: "bna", line: "bna" },
  { logo: "cfi", line: "cfi" },
  { logo: "fiduciaria-san-juan", line: "fiduciaria" },
];
