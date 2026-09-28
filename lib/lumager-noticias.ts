/**
 * Noticias de Lumager (/lumager/noticias), una muestra sin página por nota: cada nota abre
 * su video. Cada nota real sale de un video del canal de YouTube de Lumager
 * (youtube.com/@lumager.energia, relevado el 28 de septiembre de 2026): la fecha y hora son
 * las de publicación del video (convertidas a hora argentina), y el titular, la bajada y la
 * ficha solo dicen lo que está en su título, su descripción o sus subtítulos.
 *
 * Las notas con `ejemplo: true` muestran cómo se ve el noticiero con más volumen: su texto
 * sale de datos reales de lib/lumager.ts, pero la fecha y el formato de nota son de ejemplo.
 * TODO(negocio): reemplazarlas por notas reales (o borrarlas) antes de publicar.
 */
import { financeLines, method, systemTypes } from "./lumager";
import { watchUrl, type Video } from "./lumager-videos";

export type SectionId = "obras" | "clientes" | "prensa" | "diario" | "empresa";

export const sections: { id: SectionId; label: string }[] = [
  { id: "obras", label: "Obras" },
  { id: "clientes", label: "Clientes" },
  { id: "prensa", label: "Prensa" },
  { id: "diario", label: "Diario de obra" },
  { id: "empresa", label: "Empresa" },
];

export const sectionLabel = (id: SectionId) => sections.find((s) => s.id === id)!.label;

export type Nota = {
  slug: string;
  /** Publicación, en hora argentina. */
  at: string;
  section: SectionId;
  title: string;
  /** Bajada: una o dos frases que completan el titular. */
  dek: string;
  /** Ficha técnica, tal como la publica el video. */
  facts?: [string, string][];
  /** El dato fuerte del cable (potencia, plazo, duración de la entrevista). */
  figure?: string;
  /** Potencia en kW, solo si el video la publica: suma la potencia informada del año. */
  kw?: number;
  place?: string;
  video?: Video;
  /** Portada local en lugar de la del video, o foto de obra si la nota no tiene video. */
  image?: string;
  /** Encuadre de la portada recortada (object-position). */
  pos?: string;
  ejemplo?: boolean;
};

const v = (id: string, title: string, duration: string, vertical = false): Video => ({ id, title, duration, vertical });

const notasReales: Nota[] = [
  {
    slug: "agro-fer-cinco-parques-pocito",
    at: "2026-09-19T09:00-03:00",
    section: "obras",
    title: "Cinco parques solares para Agro Fer en Pocito: 233,1 kWp en total",
    dek: "Son 376 paneles repartidos entre cinco suministros, con estructuras sobre techo, pérgolas solares y montajes sobre suelo.",
    facts: [
      ["Potencia", "233,1 kWp"],
      ["Paneles", "376"],
      ["Suministros", "5"],
      ["Estructuras", "Coplanar sobre techo, pérgola y triángulo"],
      ["Ubicación", "Pocito, San Juan"],
    ],
    figure: "233,1 kWp",
    kw: 233.1,
    place: "Pocito, San Juan",
    video: v("zCdorWfTCTc", "Parques solares para 5 suministros de energía", "0:35"),
    image: "/lumager/videos/zCdorWfTCTc-poster.jpg",
  },
  {
    slug: "ernesto-ferrer-agro-fer-postventa",
    at: "2026-09-15T16:00-03:00",
    section: "clientes",
    title: "Ernesto Ferrer, de Agro Fer, cuenta cómo fue su proyecto con Lumager",
    dek: "El dueño de Agro Fer repasa el desarrollo de sus cinco parques solares y destaca el acompañamiento después de la obra.",
    facts: [
      ["Cliente", "Agro Fer"],
      ["Proyecto", "5 parques solares"],
      ["Potencia", "233,1 kWp"],
    ],
    figure: "0:57",
    place: "San Juan",
    video: v("eZIKMDKPzqg", "AgroFer nos cuenta su experiencia con Lumager", "0:57", true),
  },
  {
    slug: "solfrut-puesta-en-marcha-huawei",
    at: "2026-09-07T12:02-03:00",
    section: "diario",
    title: "Puesta en marcha en Solfrut: pruebas y verificaciones junto al equipo de Huawei",
    dek: "El quinto episodio del Diario de obra muestra la etapa que convierte meses de trabajo en energía.",
    facts: [
      ["Cliente", "Solfrut"],
      ["Etapa", "Puesta en marcha"],
      ["Con", "Equipo de Huawei"],
      ["Serie", "Diario de obra, EP. 05"],
    ],
    figure: "EP. 05",
    pos: "object-[50%_15%]",
    video: v("d3P-jZcOEHQ", "EP. 05 – Puesta en marcha, Solfrut", "0:32", true),
  },
  {
    slug: "taranto-finaliza-parque-tracker-1-mw",
    at: "2026-08-14T10:00-03:00",
    section: "obras",
    title: "Taranto ya genera su propia energía: terminó la obra de 1 MW con tracker en San Juan",
    dek: "El proyecto incluyó líneas de media tensión, estructuras tracker y la capacitación del personal de mantenimiento de la fábrica.",
    facts: [
      ["Potencia", "1 MW"],
      ["Sistema", "On-grid"],
      ["Estructura", "Tracker"],
      ["Incluye", "Líneas de media tensión"],
      ["Normativa", "Naturgy"],
      ["Ubicación", "San Juan"],
    ],
    figure: "1 MW",
    kw: 1000,
    place: "San Juan",
    video: v("fh-zAupFcQM", "Taranto San Juan: PSFV con estructura tracker", "1:02"),
  },
  {
    slug: "lucas-costa-san-juan-construye-llave-en-mano",
    at: "2026-07-31T19:00-03:00",
    section: "prensa",
    title: "Lucas Costa, en San Juan Construye: qué significa un sistema solar llave en mano",
    dek: "El socio de Lumager explicó cómo trabaja la empresa, desde la ingeniería y el diseño hasta la puesta en funcionamiento.",
    facts: [
      ["Medio", "San Juan Construye"],
      ["Entrevistado", "Lucas Costa, socio de Lumager"],
      ["Tema", "Proyectos llave en mano"],
    ],
    figure: "0:34",
    video: v("6NpbKGh3j8M", "¿Qué significa ofrecer un sistema de energía solar llave en mano?", "0:34", true),
  },
  {
    slug: "solfrut-tendido-corriente-alterna",
    at: "2026-07-17T19:00-03:00",
    section: "diario",
    title: "Avances en Solfrut: el tendido de corriente alterna, antes de pasar a la continua",
    dek: "Nico, ingeniero de proyectos de Lumager, muestra cómo avanza el tendido eléctrico del parque.",
    facts: [
      ["Cliente", "Solfrut"],
      ["Etapa", "Tendido de corriente alterna"],
      ["Próxima etapa", "Tendido de corriente continua"],
      ["Serie", "Diario de obra, EP. 04"],
    ],
    figure: "EP. 04",
    video: v("PLRADvXnFDs", "EP. 04 – Avances Solfrut, tendido eléctrico", "0:38", true),
  },
  {
    slug: "diario-de-obra-hincado-de-estructuras",
    at: "2026-07-03T15:16-03:00",
    section: "diario",
    title: "Hincado de estructuras: el parque empieza a tomar forma",
    dek: "Cada estructura instalada marca el lugar donde pronto se va a generar energía.",
    facts: [
      ["Etapa", "Hincado de estructuras"],
      ["Serie", "Diario de obra, EP. 02"],
    ],
    figure: "EP. 02",
    video: v("7r3TPJLHQUc", "EP. 02 – Hincado de estructuras", "0:30", true),
  },
  {
    slug: "diario-de-obra-estacion-transformadora-jupiter",
    at: "2026-07-03T15:14-03:00",
    section: "diario",
    title: "Estación Transformadora Júpiter: la base de un nuevo parque solar",
    dek: "Lumager abre su Diario de obra con la instalación de una pieza clave para que la energía llegue donde tiene que llegar.",
    facts: [
      ["Etapa", "Estación transformadora"],
      ["Nombre", "Estación Transformadora Júpiter"],
      ["Serie", "Diario de obra, EP. 01"],
    ],
    figure: "EP. 01",
    video: v("ErGCoDfvhnA", "EP. 01 – Estación transformadora", "0:37", true),
  },
  {
    slug: "senor-gonzalez-parque-sobre-techo-taller",
    at: "2026-04-22T10:29-03:00",
    section: "clientes",
    title: "Señor González vuelve a elegir a Lumager: parque solar sobre el techo de su nuevo taller",
    dek: "Gustavo Salcedo, gerente de Posventa, cuenta por qué apostaron a una operación más eficiente en el taller de chapa y pintura.",
    facts: [
      ["Cliente", "Señor González"],
      ["Instalación", "Parque sobre techo"],
      ["Destino", "Taller de chapa y pintura"],
    ],
    figure: "1:08",
    pos: "object-[50%_30%]",
    video: v("ZCV6P7UnlVk", "Ahora, más sustentables", "1:08", true),
  },
  {
    slug: "jeremias-parque-solar-30-dias",
    at: "2026-03-20T11:21-03:00",
    section: "clientes",
    title: "«Creo que lo realizaron en 30 días»: Jeremías cuenta los tiempos de su parque solar",
    dek: "Un cliente de Lumager repasa cuánto tardó la obra, de la firma a la entrega del parque.",
    figure: "30 días",
    video: v("HmCdSjL0eDk", "Jeremías cuenta su experiencia con Lumager", "0:31", true),
  },
  {
    slug: "solfrut-finca-capayan-siete-parques",
    at: "2026-02-26T08:17-03:00",
    section: "obras",
    title: "Finca Capayán: ya operan los siete parques solares de Solfrut, con 1,4 MWp",
    dek: "Son 2.304 paneles en un proyecto llave en mano: diseño, construcción y provisión de materiales.",
    facts: [
      ["Potencia", "1,4 MWp"],
      ["Parques", "7"],
      ["Paneles", "2.304"],
      ["Modalidad", "Llave en mano"],
      ["Ubicación", "Finca Capayán"],
    ],
    figure: "1,4 MWp",
    kw: 1400,
    place: "Finca Capayán",
    video: v("06s3nw9Xroo", "Parque solar fotovoltaico Solfrut, Finca Capayán", "0:42"),
    image: "/lumager/videos/06s3nw9Xroo-poster.jpg",
  },
  {
    slug: "bichos-de-campo-alfonso-barassi",
    at: "2025-08-11T10:26-03:00",
    section: "prensa",
    title: "Alfonso Barassi, en Bichos de Campo: el parque solar que resolvió el riego de su finca",
    dek: "El cliente de Lumager explicó por qué la energía solar fue una solución eficiente para su sistema de riego.",
    facts: [
      ["Medio", "Bichos de Campo"],
      ["Entrevistado", "Alfonso Barassi, cliente de Lumager"],
      ["Uso", "Finca y sistema de riego"],
    ],
    figure: "3:35",
    video: v("zoopGf4_2SM", "Entrevista de Bichos de Campo a Alfonso Barassi", "3:35"),
  },
  {
    slug: "bichos-de-campo-solfrut-sofia-chediak",
    at: "2025-08-08T17:02-03:00",
    section: "prensa",
    title: "Solfrut, en Bichos de Campo: por qué apuestan a la energía solar como fuente principal",
    dek: "Sofía Chediak detalla los sistemas fotovoltaicos que instalaron junto a Lumager.",
    facts: [
      ["Medio", "Bichos de Campo"],
      ["Entrevistada", "Sofía Chediak, Solfrut"],
    ],
    figure: "9:20",
    video: v("XPsBB3Yn4WU", "Entrevista de Bichos de Campo a Solfrut", "9:20"),
  },
  {
    slug: "bichos-de-campo-francisco-lorente-on-grid",
    at: "2025-08-08T16:31-03:00",
    section: "prensa",
    title: "Francisco Lorente y su parque on-grid: eficiencia y menos costos en la finca",
    dek: "En Bichos de Campo, el productor cuenta qué cambió después de instalar su parque solar conectado a red.",
    facts: [
      ["Medio", "Bichos de Campo"],
      ["Entrevistado", "Francisco Lorente"],
      ["Sistema", "On-grid"],
    ],
    figure: "10:33",
    video: v("N8DxxBk2Er0", "Entrevista de Bichos de Campo a Francisco Lorente: parque on-grid", "10:33"),
  },
  {
    slug: "bichos-de-campo-francisco-lorente-off-grid",
    at: "2025-08-08T16:31-03:00",
    section: "prensa",
    title: "Sin red eléctrica: Francisco Lorente explica cómo funciona su sistema off-grid",
    dek: "El sistema le dio autonomía energética y continuidad operativa en una zona sin acceso a la red.",
    facts: [
      ["Medio", "Bichos de Campo"],
      ["Entrevistado", "Francisco Lorente"],
      ["Sistema", "Off-grid"],
    ],
    figure: "3:02",
    video: v("n6Liw3i7uiI", "Entrevista de Bichos de Campo a Francisco Lorente: sistema off-grid", "3:02"),
  },
  {
    slug: "bombeo-solar-15-hp-en-dos-dias",
    at: "2025-08-01T11:23-03:00",
    section: "obras",
    title: "Bombeo solar off-grid de 15 HP, instalado en dos días",
    dek: "Cristian Heredia, encargado de obra, cuenta cómo lo resolvieron: agua donde antes no llegaba la red.",
    facts: [
      ["Sistema", "Bombeo solar off-grid"],
      ["Potencia", "15 HP"],
      ["Plazo de obra", "2 días"],
    ],
    figure: "2 días",
    video: v("3H11oS3RCjw", "Obra terminada en 2 días", "0:52", true),
  },
  {
    slug: "importacion-directa-paneles-seraphim",
    at: "2025-08-01T11:08-03:00",
    section: "empresa",
    title: "Importación directa: llegaron tres contenedores con más de 2.000 paneles Seraphim",
    dek: "Lucas Costa, socio de Lumager, explica por qué traer los paneles directamente de China es un paso clave.",
    facts: [
      ["Contenedores", "3"],
      ["Paneles", "Más de 2.000"],
      ["Fabricante", "Seraphim Solar"],
      ["Origen", "China, importación directa"],
    ],
    figure: "+2.000 paneles",
    video: v("xwp-mDJCddU", "Recepción de paneles Seraphim", "0:40", true),
  },
  {
    slug: "taranto-arranca-sistema-on-grid-1-mw",
    at: "2025-07-21T11:41-03:00",
    section: "obras",
    title: "Arranca la obra en Taranto: un sistema on-grid de 1 MW para su fábrica de San Juan",
    dek: "Lumager lidera la ejecución de un proyecto que marca un antes y un después en su trayectoria.",
    facts: [
      ["Potencia máxima", "1 MW"],
      ["Sistema", "On-grid"],
      ["Ubicación", "Fábrica de Taranto, San Juan"],
    ],
    figure: "1 MW",
    place: "San Juan",
    video: v("GRu6MtOHNAQ", "Sistema fotovoltaico on-grid en la fábrica de Taranto, San Juan", "0:43", true),
  },
  {
    slug: "uccuyo-energia-fotovoltaica-universidad",
    at: "2025-07-21T08:50-03:00",
    section: "clientes",
    title: "La Universidad Católica de Cuyo suma energía solar a su modelo educativo",
    dek: "La rectora María Laura Sinomazzi cuenta cómo fue incorporar energía fotovoltaica junto a Lumager.",
    facts: [
      ["Cliente", "Universidad Católica de Cuyo"],
      ["Voz", "María Laura Sinomazzi, rectora"],
    ],
    figure: "1:45",
    place: "San Juan",
    pos: "object-[50%_35%]",
    video: v("ZnbMpmFPqcg", "María Laura Sinomazzi, rectora de la Universidad Católica de Cuyo", "1:45", true),
  },
  {
    slug: "cofeco-autoconsumo-estacionamiento",
    at: "2024-01-10T00:00-03:00",
    section: "obras",
    title: "Plásticos COFECO genera su energía sobre el estacionamiento",
    dek: "Un sistema de autoconsumo montado sobre la playa de estacionamiento de la planta.",
    facts: [
      ["Cliente", "Plásticos COFECO"],
      ["Sistema", "Autoconsumo"],
      ["Montaje", "Sobre estacionamiento"],
    ],
    figure: "Carport",
    video: v("IwcfLgW-ens", "Plásticos COFECO: sistema de autoconsumo sobre estacionamiento", "0:53"),
  },
  {
    slug: "cetal-parque-senal-de-cambio",
    at: "2023-07-06T20:59-03:00",
    section: "obras",
    title: "«Señal de Cambio»: la Cooperativa Eléctrica de Tres Algarrobos genera con 300 kW solares",
    dek: "Es la primera etapa del parque, que posiciona a CETAL como pionera en generación renovable en su zona.",
    facts: [
      ["Cliente", "Cooperativa Eléctrica de Tres Algarrobos"],
      ["Potencia", "300 kW (primera etapa)"],
      ["Parque", "«Señal de Cambio»"],
    ],
    figure: "300 kW",
    kw: 300,
    video: v("ArlRTN8fIpY", "Parque solar «Señal de Cambio» de la Cooperativa Eléctrica de Tres Algarrobos", "0:40"),
  },
  {
    slug: "avicola-alicia-parque-fotovoltaico",
    at: "2023-07-06T20:08-03:00",
    section: "obras",
    title: "El Establecimiento Avícola Alicia se suma a la generación renovable",
    dek: "Un parque fotovoltaico para autoconsumo: ahorro en la factura y menos emisiones de CO₂.",
    facts: [
      ["Cliente", "Establecimiento Avícola Alicia"],
      ["Sistema", "Autoconsumo"],
    ],
    figure: "Autoconsumo",
    video: v("qwGT9JwMjy8", "Parque fotovoltaico Establecimiento Avícola Alicia", "0:52"),
  },
];

/* ---------- Notas de ejemplo (ver arriba): texto real, fecha y formato de ejemplo ---------- */

const notasEjemplo: Nota[] = [
  {
    slug: "cinco-lineas-para-financiar-un-parque-solar",
    at: "2026-09-24T10:00-03:00",
    section: "empresa",
    title: "Cinco líneas para financiar un parque solar, de bancos y organismos públicos",
    dek: "Santander, Banco Nación, CFI y Fiduciaria San Juan: plazos, tasas y períodos de gracia de cada una.",
    facts: financeLines.map((l) => [l.entity + (l.program ? ` (${l.program.split(",")[0]})` : ""), l.term] as [string, string]),
    figure: "5 líneas",
    image: "/lumager/parque-pradera.jpg",
    ejemplo: true,
  },
  {
    slug: "lean-construction-last-planner-system",
    at: "2026-09-10T10:00-03:00",
    section: "empresa",
    title: "Lean Construction y Last Planner System: cómo planifica Lumager cada obra",
    dek: "Dos métodos para eliminar desperdicios y coordinar a todos los que intervienen, del plan maestro al plan semanal.",
    facts: method.levels.map((l, i) => [`Nivel ${i + 1}`, l.title] as [string, string]),
    figure: "4 niveles",
    image: "/lumager/obra-montaje.jpg",
    ejemplo: true,
  },
  {
    slug: "on-grid-off-grid-microrredes-hibridos",
    at: "2026-08-28T10:00-03:00",
    section: "empresa",
    title: "On-grid, off-grid, microrredes o híbridos: qué resuelve cada sistema",
    dek: "Una guía corta para elegir entre conectarse a la red, independizarse de ella o tener respaldo cuando se corta.",
    facts: systemTypes.map((s) => [s.title, s.body.split(".")[0]] as [string, string]),
    figure: "Guía",
    image: "/lumager/baterias-backup.jpg",
    ejemplo: true,
  },
];

/** Todas las notas, de la más nueva a la más vieja. */
export const notas: Nota[] = [...notasReales, ...notasEjemplo].sort((a, b) => Date.parse(b.at) - Date.parse(a.at));

export const notaBySlug = (slug: string) => notas.find((n) => n.slug === slug);

/** Portada: la nota principal y las dos que la acompañan. */
export const portada = {
  principal: "agro-fer-cinco-parques-pocito",
  secundarias: ["taranto-finaliza-parque-tracker-1-mw", "solfrut-puesta-en-marcha-huawei"],
};

/** Adónde lleva una nota: su video en YouTube. Las de ejemplo no llevan a ningún lado. */
export const notaHref = (n: Nota) => (n.video ? watchUrl(n.video) : null);

/** Portada local de una nota: la foto propia, la del video o, si no hay ninguna, null. */
export const notaImage = (n: Nota) => n.image ?? (n.video ? `/lumager/videos/${n.video.id}.jpg` : null);

/* ---------- Fechas, en hora argentina ---------- */

const TZ = "America/Argentina/Buenos_Aires";

export const fmtLong = (at: string) =>
  new Intl.DateTimeFormat("es-AR", { timeZone: TZ, day: "numeric", month: "long", year: "numeric" }).format(new Date(at));

export const fmtShort = (at: string) =>
  new Intl.DateTimeFormat("es-AR", { timeZone: TZ, day: "2-digit", month: "2-digit" }).format(new Date(at)).replace("/", ".");

export const fmtTime = (at: string) =>
  new Intl.DateTimeFormat("es-AR", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(at));

export const fmtMonth = (at: string) => {
  const s = new Intl.DateTimeFormat("es-AR", { timeZone: TZ, month: "long", year: "numeric" }).format(new Date(at));
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/** Año de publicación en hora argentina (para agrupar y sumar potencia). */
export const yearOf = (at: string) => Number(new Intl.DateTimeFormat("en", { timeZone: TZ, year: "numeric" }).format(new Date(at)));
