/**
 * Clientes, testimonios y videos de /lumager. Todo sale del canal de YouTube de Lumager
 * (youtube.com/@lumager.energia, relevado en septiembre de 2026): nombres, cargos, obras y
 * cifras están en el título, la descripción o el texto visible del video. No se agrega nada
 * que no esté ahí. Las citas son los subtítulos que el propio video muestra en pantalla.
 *
 * Las miniaturas (public/lumager/videos/<id>.jpg) son las portadas de esos videos, bajadas
 * de i.ytimg.com: material propio de Lumager, igual que las fotos de obra.
 *
 * Portadas de obra (<id>-poster.jpg, septiembre de 2026): cuando la portada del video trae
 * texto encima o es un collage, se usa un fotograma que el propio YouTube genera del video
 * (i.ytimg.com/vi/<id>/maxres3.jpg). Solfrut: recortado por debajo del texto sobreimpreso
 * (ffmpeg crop 672x378 desde 540,342). Agro Fer: el fotograma completo.
 */

export type Video = {
  /** Id de YouTube. La miniatura vive en /lumager/videos/<id>.jpg. */
  id: string;
  title: string;
  /** Duración como la muestra YouTube. */
  duration: string;
  /** Short (9:16) o video común (16:9). */
  vertical?: boolean;
};

export const youtubeChannel = "https://www.youtube.com/@lumager.energia";

export const watchUrl = (v: Video) =>
  v.vertical ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;

/* ---------- Clientes con obra en video ---------- */

export type Client = {
  name: string;
  /** Rubro del cliente, leído de su nombre y de la obra: para que el visitante se reconozca. */
  sector: string;
  work: string;
  /** Solo si el video la publica. */
  figure?: string;
  /** La misma potencia en kW, para comparar la escala entre obras. Solo si hay `figure`. */
  kw?: number;
  /** Encuadre de la portada cuando se recorta (object-position). */
  pos?: string;
  /** Portada limpia para las obras en grande (ver arriba). Si falta, la del video. */
  poster?: string;
  video: Video;
};

export const clients: Client[] = [
  {
    name: "Taranto",
    sector: "Industria",
    work: "Sistema on-grid con estructura tracker en su fábrica de San Juan",
    figure: "1 MW",
    kw: 1000,
    video: { id: "fh-zAupFcQM", title: "Taranto San Juan: PSFV con estructura tracker", duration: "1:02" },
  },
  {
    name: "Solfrut",
    sector: "Agro",
    work: "Parque solar fotovoltaico en Finca Capayán",
    figure: "1,4 MWp",
    kw: 1400,
    poster: "/lumager/videos/06s3nw9Xroo-poster.jpg",
    video: { id: "06s3nw9Xroo", title: "Parque solar fotovoltaico Solfrut, Finca Capayán", duration: "0:42" },
  },
  {
    name: "Agro Fer",
    sector: "Agro",
    work: "Cinco parques solares para cinco suministros de energía",
    figure: "233,1 kWp",
    kw: 233.1,
    poster: "/lumager/videos/zCdorWfTCTc-poster.jpg",
    video: { id: "zCdorWfTCTc", title: "Parques solares para 5 suministros de energía", duration: "0:35" },
  },
  {
    name: "Universidad Católica de Cuyo",
    sector: "Educación",
    work: "Energía fotovoltaica integrada a la universidad",
    pos: "object-[50%_35%]",
    video: { id: "ZnbMpmFPqcg", title: "María Laura Sinomazzi, rectora de la Universidad Católica de Cuyo", duration: "1:45", vertical: true },
  },
  {
    name: "Señor González",
    sector: "Comercio",
    work: "Parque sobre techo en su nuevo taller de chapa y pintura",
    pos: "object-[50%_30%]",
    video: { id: "ZCV6P7UnlVk", title: "Ahora, más sustentables", duration: "1:08", vertical: true },
  },
  {
    name: "Cooperativa Eléctrica de Tres Algarrobos",
    sector: "Cooperativa eléctrica",
    work: "Parque solar «Señal de Cambio»",
    video: { id: "ArlRTN8fIpY", title: "Parque solar «Señal de Cambio» de la Cooperativa Eléctrica de Tres Algarrobos", duration: "0:40" },
  },
  {
    name: "Plásticos COFECO",
    sector: "Industria",
    work: "Autoconsumo sobre el estacionamiento",
    video: { id: "IwcfLgW-ens", title: "Plásticos COFECO: sistema de autoconsumo sobre estacionamiento", duration: "0:53" },
  },
  {
    name: "Establecimiento Avícola Alicia",
    sector: "Agro",
    work: "Parque fotovoltaico en el establecimiento",
    video: { id: "qwGT9JwMjy8", title: "Parque fotovoltaico Establecimiento Avícola Alicia", duration: "0:52" },
  },
];

/** Otros clientes con video en el canal, nombrados en una línea. */
export const moreClients = ["Andreolli Frenos", "Granja Modelo San Fernando", "ACC", "Distribuidora AMAF", "Finca El Campito"];

/* ---------- Testimonios en video ---------- */

export type Testimonial = {
  name: string;
  role: string;
  /** Subtítulo que el video muestra en pantalla, textual. Sin cita si el video no la muestra. */
  quote?: string;
  context: string;
  video: Video;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ernesto Ferrer",
    role: "Dueño de Agro Fer",
    quote: "…y que después tiene un postventa muy bueno.",
    context: "Cinco parques solares, 233,1 kWp instalados.",
    video: { id: "eZIKMDKPzqg", title: "Agro Fer nos cuenta su experiencia con Lumager", duration: "0:57", vertical: true },
  },
  {
    name: "Jeremías",
    role: "Cliente de Lumager",
    quote: "Creo que lo realizaron en 30 días, más o menos, a la entrega del parque.",
    context: "Cuenta cómo fueron los tiempos de obra de su parque solar.",
    video: { id: "HmCdSjL0eDk", title: "Jeremías cuenta su experiencia con Lumager", duration: "0:31", vertical: true },
  },
  {
    name: "Gustavo Salcedo",
    role: "Gerente de Posventa, Señor González",
    quote: "…y estamos obteniendo los grandes beneficios que ellos generan.",
    context: "Parque sobre techo en el taller de chapa y pintura. Volvieron a elegirnos.",
    video: { id: "ZCV6P7UnlVk", title: "Gustavo Salcedo, gerente de Posventa de Señor González", duration: "1:08", vertical: true },
  },
  {
    name: "María Laura Sinomazzi",
    role: "Rectora, Universidad Católica de Cuyo",
    context: "Cómo fue incorporar energía fotovoltaica a la universidad, junto a Lumager.",
    video: { id: "ZnbMpmFPqcg", title: "María Laura Sinomazzi, rectora de la Universidad Católica de Cuyo", duration: "1:45", vertical: true },
  },
];

/** Entrevistas del medio agropecuario Bichos de Campo a clientes de Lumager. */
export const pressInterviews: { name: string; detail: string; video: Video }[] = [
  {
    name: "Alfonso Barassi",
    detail: "Cliente de Lumager",
    video: { id: "zoopGf4_2SM", title: "Entrevista de Bichos de Campo a Alfonso Barassi", duration: "3:35" },
  },
  {
    name: "Solfrut",
    detail: "Parque en Finca Capayán",
    video: { id: "XPsBB3Yn4WU", title: "Entrevista de Bichos de Campo a Solfrut", duration: "9:20" },
  },
  {
    name: "Francisco «Paco» Lorente",
    detail: "Parque on-grid",
    video: { id: "N8DxxBk2Er0", title: "Entrevista de Bichos de Campo a Francisco Lorente: parque on-grid", duration: "10:33" },
  },
  {
    name: "Francisco «Paco» Lorente",
    detail: "Sistema off-grid",
    video: { id: "n6Liw3i7uiI", title: "Entrevista de Bichos de Campo a Francisco Lorente: sistema off-grid", duration: "3:02" },
  },
];

/* ---------- Reels de obra ---------- */

export const reels: { tag: string; title: string; video: Video }[] = [
  {
    tag: "Diario de obra · EP. 01",
    title: "Estación transformadora",
    video: { id: "ErGCoDfvhnA", title: "EP. 01: Estación transformadora", duration: "0:37", vertical: true },
  },
  {
    tag: "Diario de obra · EP. 02",
    title: "Hincado de estructuras",
    video: { id: "7r3TPJLHQUc", title: "EP. 02: Hincado de estructuras", duration: "0:30", vertical: true },
  },
  {
    tag: "Diario de obra · EP. 04",
    title: "Tendido eléctrico de corriente alterna",
    video: { id: "PLRADvXnFDs", title: "EP. 04: Avances Solfrut, tendido eléctrico", duration: "0:38", vertical: true },
  },
  {
    tag: "Diario de obra · EP. 05",
    title: "Puesta en marcha en Solfrut",
    video: { id: "d3P-jZcOEHQ", title: "EP. 05: Puesta en marcha, Solfrut", duration: "0:32", vertical: true },
  },
  {
    tag: "Bombeo solar",
    title: "15 HP off-grid, instalado en 2 días",
    video: { id: "3H11oS3RCjw", title: "Obra terminada en 2 días", duration: "0:52", vertical: true },
  },
  {
    tag: "Importación directa",
    title: "Tres contenedores, más de 2.000 paneles",
    video: { id: "xwp-mDJCddU", title: "Recepción de paneles Seraphim", duration: "0:40", vertical: true },
  },
  {
    tag: "Industria",
    title: "Arranca Taranto: 1 MW on-grid",
    video: { id: "GRu6MtOHNAQ", title: "Sistema fotovoltaico on-grid en la fábrica de Taranto, San Juan", duration: "0:43", vertical: true },
  },
  {
    tag: "Entrevista",
    title: "¿Qué es un sistema llave en mano?",
    video: { id: "6NpbKGh3j8M", title: "¿Qué significa ofrecer un sistema de energía solar llave en mano?", duration: "0:34", vertical: true },
  },
];

/* ---------- Dónde va el sistema ----------
   Obras agrupadas por dónde se instaló el sistema. Cada cliente va donde su video lo muestra:
   Avícola Alicia y la Cooperativa, sobre suelo (portada); Agro Fer, sobre techo y sobre suelo
   (el subtítulo de su video lo dice); Señor González, sobre techo (título); COFECO, sobre el
   estacionamiento (título). Fuera de la red: la entrevista de Bichos de Campo a Paco Lorente
   sobre su sistema off-grid y el reel de bombeo off-grid de 15 HP. */

export type MountingId = "suelo" | "techo" | "estacionamiento" | "aislado";

export type Mounting = {
  id: MountingId;
  label: string;
  title: string;
  body: string;
  /** Botón que lleva al formulario con el mensaje precargado. */
  cta: string;
  ask: string;
  works: { name: string; detail: string; video: Video }[];
};

const byName = (name: string) => {
  const c = clients.find((x) => x.name === name);
  if (!c) throw new Error(`Cliente sin video: ${name}`);
  return c.video;
};

export const mountings: Mounting[] = [
  {
    id: "suelo",
    label: "Sobre suelo",
    title: "Parques sobre suelo.",
    body: "Para potencias grandes y terreno disponible. Con estructura fija o con tracker, que sigue al sol durante el día.",
    cta: "Quiero un parque sobre suelo",
    ask: "Me interesa un parque solar sobre suelo.",
    works: [
      { name: "Taranto", detail: "1 MW con tracker, en su fábrica", video: byName("Taranto") },
      { name: "Solfrut", detail: "1,4 MWp en Finca Capayán", video: byName("Solfrut") },
      { name: "Agro Fer", detail: "Cinco suministros, sobre suelo y techo", video: byName("Agro Fer") },
      {
        name: "Cooperativa Eléctrica de Tres Algarrobos",
        detail: "Parque «Señal de Cambio»",
        video: byName("Cooperativa Eléctrica de Tres Algarrobos"),
      },
      { name: "Establecimiento Avícola Alicia", detail: "Parque en el establecimiento", video: byName("Establecimiento Avícola Alicia") },
    ],
  },
  {
    id: "techo",
    label: "Sobre techo",
    title: "Sobre el techo que ya tenés.",
    body: "En la nave, el galpón o el taller: genera energía donde se consume y no ocupa terreno.",
    cta: "Quiero uno sobre techo",
    ask: "Me interesa un sistema solar sobre techo.",
    works: [
      { name: "Señor González", detail: "Su nuevo taller de chapa y pintura", video: byName("Señor González") },
      { name: "Agro Fer", detail: "Cinco suministros, sobre techo y suelo", video: byName("Agro Fer") },
    ],
  },
  {
    id: "estacionamiento",
    label: "En estacionamiento",
    title: "El estacionamiento también genera.",
    body: "Un carport solar: la estructura da sombra a los vehículos y los paneles generan energía para el autoconsumo.",
    cta: "Quiero un carport solar",
    ask: "Me interesa un carport solar sobre el estacionamiento.",
    works: [{ name: "Plásticos COFECO", detail: "Autoconsumo sobre el estacionamiento", video: byName("Plásticos COFECO") }],
  },
  {
    id: "aislado",
    label: "Fuera de la red",
    title: "Donde la red no llega.",
    body: "Sistemas off-grid con baterías, o bombeo solar de 1 HP hasta 200 HP, sin depender del tendido eléctrico.",
    cta: "Quiero un sistema aislado",
    ask: "Me interesa un sistema aislado, fuera de la red.",
    works: [
      {
        name: "Francisco «Paco» Lorente",
        detail: "Su sistema off-grid, en Bichos de Campo",
        video: { id: "n6Liw3i7uiI", title: "Entrevista de Bichos de Campo a Francisco Lorente: sistema off-grid", duration: "3:02" },
      },
      {
        name: "Bombeo solar de 15 HP",
        detail: "Off-grid, instalado en 2 días",
        video: { id: "3H11oS3RCjw", title: "Obra terminada en 2 días", duration: "0:52", vertical: true },
      },
    ],
  },
];
