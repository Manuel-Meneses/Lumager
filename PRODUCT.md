# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Quien decide la compra:** dueños, gerentes y responsables de planta de industrias, agro, minería, comercios y telecomunicaciones que evalúan un sistema solar para su empresa: bajar costos de energía, tener respaldo ante cortes o llevar energía donde la red no llega. También cooperativas eléctricas, instituciones (como una universidad) y particulares. Llegan comparando proveedores y buscan pruebas: obras hechas, clientes con nombre, cómo trabajan, si llegan a su zona y cómo se paga.
- **Quien recibe la propuesta:** el sitio es una propuesta de inicio para mostrarle a la dirección de Lumager. Tiene que leerse como un sitio profesional del rubro, hecho solo con su material.

## Product Purpose

Lumager Energía Solar hace ingeniería en energía solar: proyectos fotovoltaicos llave en mano, del diseño a la postventa. Este proyecto es su propuesta de sitio: un inicio corporativo (`/lumager`) y un noticiero de muestra (`/lumager/noticias`). El éxito es que un visitante con un proyecto escriba por WhatsApp con los datos suficientes para empezar (sector, tipo de sistema, zona, si quiere financiarlo), y que Lumager reconozca su empresa en el sitio.

## Positioning

Todo en uno, del sol a la red: diseño, dimensionamiento, provisión, ejecución y postventa en una sola propuesta, con obras propias que lo prueban (de 233,1 kWp a 1,4 MWp, sobre suelo con tracker, sobre techo, en estacionamiento y fuera de la red). Importación directa de paneles (tres contenedores con más de 2.000 paneles Seraphim), planificación con Lean Construction y Last Planner System, y líneas de financiamiento con bancos y organismos públicos.

## Operating Context

- **Sedes:** San Juan (Lemos entre 6 y 7, Pocito) y Rosario (Laprida 4075). Cobertura: Centro, Norte, Cuyo y Litoral. Horario: lunes a viernes, de 8 a 17 h.
- **Contacto:** WhatsApp 543416383048 (el de su botón "Contactanos"). El formulario no tiene backend: arma el mensaje y abre WhatsApp. Las líneas de financiamiento y los tipos de instalación precargan el formulario.
- **Proceso que nombran:** diseño, dimensionamiento, provisión, ejecución y postventa.
- **Vocabulario del rubro:** on-grid, off-grid, microrredes aisladas, híbridos para backup, kW, kWp, MWp, tracker, media tensión, tableros, bombeo solar (HP), carport, llave en mano.
- **Rutas:** `/` redirige (307) a `/lumager`; existen `/lumager` y `/lumager/noticias`. Ambas son vista previa y no se indexan.

## Capabilities and Constraints

- **Servicios (los 8 de su sitio):** parques solares fotovoltaicos, sistemas de backup con baterías, tableros, bombeo solar (de 1 a 200 HP), media tensión, alumbrado público solar, gestión y eficiencia energética (ISO 50001) y obras civiles complementarias.
- **Sistemas:** on-grid, off-grid, microrredes aisladas e híbridos para backup. **Sectores:** industrias, comercios, agricultura, minería y telecomunicaciones.
- **Financiamiento publicado:** Banco Santander, Banco Nación (inversión; AgroNación, BNA Conecta y PymeNación), CFI y Fiduciaria San Juan (solo San Juan). Las tasas cambian: se muestran con aviso de vigencia.
- **Stack:** Next.js 16 (App Router), Tailwind CSS v4 y Phosphor Icons. Las animaciones son CSS: no hay librería de animación. Los datos viven en `lib/lumager.ts`, `lib/lumager-videos.ts`, `lib/lumager-noticias.ts`, `lib/lumager-logos.ts` y `lib/lumager-instagram.ts`.
- **Restricciones:**
  - Liviana en celular: sin WebGL ni simuladores.
  - Sin blur (`filter: blur` ni `backdrop-filter`), a pedido del cliente por fluidez en Chrome.
  - Los videos de YouTube cargan solo al tocar play, sin cookies.
  - Fotos en AVIF, con WebP de respaldo.
- **Pendiente con Lumager:**
  - Permiso para mostrar logos de clientes.
  - Token de Instagram (`INSTAGRAM_ACCESS_TOKEN`) para mostrar sus últimas publicaciones.
  - Reemplazar o borrar las tres notas de ejemplo del noticiero.
  - Dominio definitivo del sitio.

## Brand Commitments

- **Nombre:** Lumager Energía Solar (corto: Lumager). El logo está en `public/lumager/logo-lumager.png`.
- **Colores de marca:** grafito (#303533 y #1B1D1C), naranja (#FF8900) y el verde del logo. El detalle visual vive en DESIGN.md.
- **Voz:** español rioplatense con voseo ("Contanos tu proyecto", "Financiá tu parque solar"). Directa y concreta, sin superlativos.
- **Su lenguaje:** "llave en mano", "acompañamiento integral", "todo en uno". No prometer "un solo equipo" ni "el mismo equipo".

## Evidence on Hand

- **Cifras publicadas en su sitio:** más de 300 proyectos, más de 13.000 kW instalados, 11 provincias y más de 7.000 t de CO₂ evitadas por año.
- **Fotos de obra propias** en `public/lumager/`.
- **Canal de YouTube** (youtube.com/@lumager.energia): clientes con nombre y obra (Taranto, Solfrut, Agro Fer, Universidad Católica de Cuyo, Señor González, Cooperativa Eléctrica de Tres Algarrobos, Plásticos COFECO, Establecimiento Avícola Alicia), testimonios con sus subtítulos textuales, entrevistas de Bichos de Campo y San Juan Construye, el Diario de obra y reels. Las portadas están en `public/lumager/videos/` y la fecha real de cada video en `lib/lumager-noticias.ts`.
- **Logos** de clientes con obra en video, bancos y prensa, en `public/lumager/logos/`.
- **Instagram** @lumager.energia: 11 mil seguidores y 480 publicaciones al 28 de septiembre de 2026.
- **Sin inventar:** no hay precios publicados. No se inventan clientes, testimonios, cifras ni fechas; todo sale de su sitio, sus videos o sus piezas para redes.

## Product Principles

1. **Solo material de Lumager.** Toda cifra, cliente, cita y foto sale de lo que la empresa publicó; lo que es de ejemplo se marca como tal.
2. **La prueba antes que el detalle.** Obras reales y clientes con nombre pesan más que el catálogo de servicios.
3. **Todo lleva a la conversación.** Cada acción comercial termina en WhatsApp con el contexto ya cargado.
4. **Profesional y liviano.** Al nivel de las grandes del sector, pero rápido en un celular de obra.

## Accessibility & Inclusion

WCAG 2.1 AA:
- Contraste mínimo de 4.5:1 en texto.
- Navegación completa por teclado, con foco visible.
- Respeto por `prefers-reduced-motion` y `prefers-reduced-transparency`: el contenido nunca depende de una animación para verse.
- Errores de formulario anunciados y enlazados a su campo.
