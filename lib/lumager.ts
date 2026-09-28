/**
 * Propuesta de inicio para Lumager Energía Solar (ruta /lumager).
 * Todos los datos salen de su sitio actual (lumagerenergia.com.ar, septiembre 2026):
 * cifras, servicios, sedes, horarios, redes y campos del formulario. No se inventan
 * clientes, testimonios ni precios. Las fotos también son suyas (obras propias).
 * Clientes, testimonios y videos salen de su canal de YouTube: ver lib/lumager-videos.ts.
 * Financiamiento, sectores, tipos de sistema, cobertura y metodología (Lean Construction +
 * Last Planner System) salen de sus piezas para redes, transcriptas en septiembre de 2026.
 */
import type { LogoId } from "./lumager-logos";

export const lumager = {
  name: "Lumager Energía Solar",
  shortName: "Lumager",
  description:
    "Ingeniería en energía solar: proyectos fotovoltaicos llave en mano para industria, agro, minería, comercio y hogares.",
  url: "https://lumagerenergia.com.ar",
  // El número al que lleva el botón "Contactanos" de su sitio (wa.link/a8zdvh), solo dígitos.
  whatsapp: "543416383048",
  email: "energia@lumager.com.ar",
  hours: "Lunes a viernes, 8 a 17 h",
  coverage: "Centro, Norte, Cuyo y Litoral",
} as const;

export const lumagerCta = { label: "Contanos tu proyecto", href: "#contacto" } as const;

export const lumagerLinks = [
  { label: "Clientes", href: "#clientes" },
  { label: "Servicios", href: "#servicios" },
  { label: "Llave en mano", href: "#llave-en-mano" },
  { label: "Territorio", href: "#territorio" },
  { label: "Financiamiento", href: "#financiamiento" },
];

/** Las noticias viven en su propia ruta (app/lumager/noticias), fuera del scroll-spy. */
export const newsLink = { label: "Noticias", href: "/lumager/noticias" } as const;

/** Contadores del sitio actual ("+7000", "+13000", "+300"). */
export const lumagerStats = { co2: 7000, kw: 13000, projects: 300, provinces: 11 } as const;

/** Sede de referencia para el instrumento solar del hero. */
export const sunSite = { name: "Pocito, San Juan", lat: -31.68, lon: -68.58, utcOffset: -3 } as const;

/**
 * Los 8 servicios de su sitio. Cinco son tramos del recorrido de la energía y viven en
 * "Del sol a la red" (components/lumager/energy-path.tsx): parques, backup, tableros,
 * bombeo y media tensión. Estos tres no son un tramo y van en su fila "Y además", con su
 * lámina (`drawing` apunta a lib/service-drawings.ts; `tone`, al tinte de .lx-lamina).
 */
export const moreServices = [
  {
    drawing: "alumbrado",
    tone: "steel",
    title: "Alumbrado público solar",
    body: "Luminarias LED con su propio panel solar y batería: funcionan sin cableado.",
  },
  {
    drawing: "eficiencia",
    tone: "leaf",
    title: "Gestión y eficiencia energética",
    body: "Sistemas de gestión de la energía: implementación, desarrollo y capacitación. Análisis y soluciones para ganar eficiencia, e implementación de la norma ISO 50001.",
  },
  {
    drawing: "civil",
    tone: "sand",
    title: "Obras civiles complementarias",
    body: "Cabinas, shelters, galpones, alambrados y cercos perimetrales, como parte de una propuesta todo en uno.",
  },
] as const;

/** Las cinco etapas que nombran en su servicio de parques. */
export const steps = [
  { title: "Diseño", body: "Partimos de tu consumo y tu necesidad. Con la factura de luz ya hay un punto de partida." },
  { title: "Dimensionamiento", body: "Potencia y tipo de sistema: conectado a red, aislado o híbrido, con o sin baterías." },
  { title: "Provisión", body: "Paneles, inversores, baterías, estructuras y tableros en una sola compra." },
  { title: "Ejecución", body: "Montaje, obra eléctrica y obra civil complementaria, coordinados por el mismo equipo." },
  { title: "Postventa", body: "Seguimiento del sistema en marcha para que rinda lo proyectado." },
];

/** Las regiones que publican en su sitio. El sombreado del mapa es una lectura geográfica de esos nombres. */
export const regions = [
  { id: "cuyo", label: "Cuyo" },
  { id: "norte", label: "Norte" },
  { id: "centro", label: "Centro" },
  { id: "litoral", label: "Litoral" },
] as const;

export type Office = { name: string; map: { x: number; y: number }; address: string; mapQuery: string; phoneDisplay: string; phoneHref: string; email: string };

export const offices: Office[] = [
  {
    name: "San Juan",
    map: { x: 85.4, y: 203.6 },
    address: "Lemos entre 6 y 7, Pocito, San Juan",
    mapQuery: "Pocito, San Juan, Argentina",
    phoneDisplay: "+54 341 638-3048",
    phoneHref: "tel:+543416383048",
    email: "info@lumagerenergia.com.ar",
  },
  {
    name: "Rosario",
    map: { x: 210.4, y: 229 },
    address: "Laprida 4075, Rosario, Santa Fe",
    mapQuery: "Laprida 4075, Rosario, Santa Fe, Argentina",
    phoneDisplay: "+54 341 228-1625",
    phoneHref: "tel:+543412281625",
    email: "energia@lumager.com.ar",
  },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/lumager.energia/" },
  { label: "LinkedIn", href: "https://ar.linkedin.com/company/lumager-energia" },
  { label: "YouTube", href: "https://www.youtube.com/@lumager.energia" },
  { label: "Facebook", href: "https://www.facebook.com/lumager.energia/" },
];

/* ---------- Sectores y tipos de sistema (sus piezas "Nuestros servicios") ---------- */

export const sectors = ["Industrias", "Comercios", "Agricultura", "Minería", "Telecomunicaciones"] as const;

/** Las definiciones son del rubro, no promesas: explican qué es cada sistema. */
export const systemTypes = [
  { title: "On-grid", body: "Conectado a la red. Lo que generás se consume en el momento y baja la factura." },
  { title: "Off-grid", body: "Aislado, con baterías. Energía propia donde la red no llega." },
  { title: "Microrredes aisladas", body: "Generación y almacenamiento para varios consumos, sin depender de la red." },
  { title: "Híbridos para backup", body: "Conectados a la red y con baterías: siguen andando cuando se corta." },
] as const;

/* ---------- Financiamiento (sus piezas "Financiá tu parque solar") ---------- */

export type FinanceLine = {
  id: string;
  entity: string;
  program?: string;
  /** Límite de alcance que la pieza publica. */
  scope?: string;
  /** El dato fuerte de la pieza, grande en la fila: número (cuenta al entrar) y unidad. */
  key: { value: number; unit: string; label: string };
  /** Logo en public/lumager/logos (ver lib/lumager-logos.ts). */
  logo: LogoId;
  term: string;
  grace: string;
  /** Condiciones tal como las publica la pieza. */
  conditions: [string, string][];
};

export const financeLines: FinanceLine[] = [
  {
    id: "santander",
    entity: "Banco Santander",
    key: { value: 25, unit: "%", label: "TNA fija, hasta 12 meses" },
    logo: "santander",
    term: "Hasta 60 meses",
    grace: "Consultanos",
    conditions: [
      ["Hasta 12 meses", "TNA tasa fija 25%"],
      ["Hasta 60 meses", "TNA tasa fija 26,5%"],
      ["Tasa variable", "TNA TAMAR + 6,5%"],
      ["Tasa variable, capital UVA", "TNA + 9%"],
    ],
  },
  {
    id: "bna",
    entity: "Banco Nación",
    program: "Financiamiento de inversión",
    key: { value: 10, unit: " años", label: "de plazo" },
    logo: "bna",
    term: "Hasta 10 años",
    grace: "2 años",
    conditions: [
      ["Plazo", "Hasta 10 años"],
      ["Período de gracia", "2 años"],
    ],
  },
  {
    id: "agronacion",
    entity: "Banco Nación",
    program: "AgroNación, BNA Conecta y PymeNación",
    key: { value: 29, unit: "%", label: "tasa fija en pesos" },
    logo: "bna",
    term: "Hasta 36 meses",
    grace: "Consultanos",
    conditions: [
      ["Plazos", "18, 24 o 36 meses"],
      ["Tasa", "Fija en pesos, 29%"],
    ],
  },
  {
    id: "cfi",
    entity: "CFI",
    program: "Consejo Federal de Inversiones",
    key: { value: 16, unit: "%", label: "tasa fija, años 1 y 2" },
    logo: "cfi",
    term: "Consultanos",
    grace: "Hasta 12 meses",
    conditions: [
      ["Años 1 y 2", "Tasa fija 16%"],
      ["Desde el año 3", "Tasa variable TAMAR + 2%"],
      ["Período de gracia", "Hasta 12 meses"],
      ["Monto máximo", "Hasta $500.000.000"],
    ],
  },
  {
    id: "fiduciaria",
    entity: "Fiduciaria San Juan",
    scope: "Solo para proyectos en San Juan",
    key: { value: 48, unit: " meses", label: "de plazo" },
    logo: "fiduciaria-san-juan",
    term: "48 meses",
    grace: "Consultanos",
    conditions: [
      ["Plazo", "48 meses"],
      ["TNA", "40% de BADLAR"],
      ["Alcance", "Solo provincia de San Juan"],
    ],
  },
];

/* ---------- Metodología de obra (su pieza institucional) ---------- */

export const method = {
  lean: "Lean Construction busca eliminar desperdicios, mejorar de forma continua y maximizar el valor para el cliente en todo el proceso de construcción.",
  lps: "El Last Planner System planifica y controla la producción con foco en la colaboración y la coordinación entre todos los que intervienen en la obra.",
  how: "En Lumager integramos las dos en nuestras obras para optimizar la planificación y la ejecución de cada proyecto de energía renovable.",
  /* Los cuatro niveles del Last Planner System tal como los define el método (no son datos
     de una obra). El esquema de la sección los dibuja uno debajo del otro. */
  levels: [
    { id: "maestro", title: "Plan maestro", body: "Los hitos de la obra, hasta la puesta en marcha." },
    { id: "fases", title: "Por fases, hacia atrás", body: "Desde la puesta en marcha se planifica cada fase con quienes la ejecutan." },
    {
      id: "intermedio",
      title: "Próximas semanas",
      body: "Se liberan las restricciones antes de que frenen la obra: materiales, información y equipos.",
    },
    { id: "semanal", title: "Plan semanal", body: "Compromisos concretos cada semana. Se mide lo cumplido y se aprende de lo que no." },
  ],
} as const;

/* ---------- Precarga del formulario de contacto ---------- */

/** Lo que llega precargado al formulario: la financiación elegida o un mensaje de arranque. */
export type ContactPrefill = { financia?: "Sí" | "Quiero asesoramiento"; linea?: string; mensaje?: string };
export const PREFILL_EVENT = "lx:prefill";
/** Abre una línea de la sección Financiamiento (detail: el id de la línea). */
export const FINANCE_OPEN_EVENT = "lx:finance-open";

/** Lleva al formulario con el financiamiento ya elegido. Solo en el navegador. */
export function prefillContact(detail: ContactPrefill) {
  window.dispatchEvent(new CustomEvent<ContactPrefill>(PREFILL_EVENT, { detail }));
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("contacto")?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}
