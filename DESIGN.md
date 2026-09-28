---
name: Lumager Energía Solar
description: Ingeniería solar llave en mano, contada con obras propias sobre grafito, papel y naranja.
colors:
  ink: "#1b1d1c"
  graphite: "#303533"
  paper: "#f3f4f1"
  paper-2: "#e8eae5"
  line: "#d5d8d2"
  muted: "#585d5a"
  on-dark: "#f3f4f1"
  on-dark-muted: "#b4b9b5"
  dark-line: "#3d4240"
  orange: "#ff8900"
  orange-hover: "#ff9d2e"
  green: "#2e8b3a"
  green-live: "#5cc46d"
  plan: "#e8edf3"
  plan-2: "#d9e1ea"
  plan-paper: "#fbfcfd"
  plan-dc: "#d96a00"
  plan-dc-label: "#a34d00"
  plan-ac-label: "#23702d"
  leaf-soft: "#dcebd5"
  sand-soft: "#ece2cf"
  steel-soft: "#dde3ec"
  sky-dawn: "#f4dcc5"
  sky-morning: "#e2eaee"
  sky-noon: "#cfe3f3"
  sky-afternoon: "#f2d4a1"
  sky-night: "#142238"
  news-masthead: "#123f1e"
  news-obras-soft: "#ffe9cf"
  news-obras-ink: "#8a4200"
  news-clientes: "#34a046"
  news-clientes-soft: "#dcefd6"
  news-clientes-ink: "#1f6a2a"
  news-prensa: "#1f9a96"
  news-prensa-soft: "#d3eeec"
  news-prensa-ink: "#145f5c"
  news-diario: "#e0a332"
  news-diario-soft: "#f6e6c4"
  news-diario-ink: "#6e4a0e"
  news-empresa: "#5a67b0"
  news-empresa-soft: "#e1e4f4"
  news-empresa-ink: "#353f7a"
  error: "#b3261e"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3rem, min(8.4vw, 11.5svh), 6rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 125"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 125"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    fontVariation: "\"wdth\" 118"
  figure:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 1.9vw, 1.85rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontFeature: "\"tnum\" 1"
    fontVariation: "\"wdth\" 118"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    fontVariation: "\"wdth\" 100"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontVariation: "\"wdth\" 100"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.3
    fontVariation: "\"wdth\" 112"
  button:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1
    fontVariation: "\"wdth\" 110"
rounded:
  none: "0px"
spacing:
  gutter-mobile: "20px"
  gutter-tablet: "32px"
  gutter-desktop: "48px"
  container: "88rem"
  section: "80px"
  section-lg: "112px"
  module-joint: "2px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.orange-hover}"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "3.25rem"
  button-ink-hover:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-dark}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "3.25rem"
  header-cell:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "4rem"
  header-cell-cta:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "4rem"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12.8px 16px"
  video-play:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "2.75rem"
  news-tag-obras:
    backgroundColor: "{colors.news-obras-soft}"
    textColor: "{colors.news-obras-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 8.8px 0 7.2px"
    height: "1.5rem"
  data-sheet:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.figure}"
    rounded: "{rounded.none}"
    padding: "28px 32px"
---

# Design System: Lumager Energía Solar

## Overview

**Creative North Star: "Plano y Módulo"**

Lumager se presenta como se presenta una obra bien hecha: con el plano sobre la mesa y el módulo a la vista. El sistema toma sus formas del material del rubro. La cabecera es un módulo fotovoltaico, con celdas de vidrio grafito separadas por juntas y busbars tenues. Las secciones se destapan como un panel que se enciende, celda por celda. La sección de servicios es un plano de ingeniería, con unifilar, corriente continua en naranja y alterna en verde. Las cifras van en hojas de datos con filetes. Todo es rectangular y a escuadra, sin una sola esquina redondeada.

La página alterna grafito profundo y papel frío por capítulos, para que cada pregunta del visitante se lea como un bloque. El naranja de la marca aparece poco y siempre con trabajo: marca la acción (contactar, reproducir, elegir) y lo que está vivo (la sección actual, el sol en el hero, la cinta de noticias). El resto del color también trabaja: el verde del logo es lo cumplido y lo sustentable, el plano azulado es la ingeniería y los tintes del cielo cuyano acompañan el paso del día.

Una sola familia, Archivo, trabajada con su eje de ancho: expandida y semibold para titulares, como la rotulación de obra, y normal para leer. La fotografía es siempre de obras propias, a sangre y en bloques rectos. El movimiento es de ease-out fuerte. Cada sección tiene su propia entrada y todo respeta el movimiento reducido: el contenido nunca depende de una animación para verse.

**Key Characteristics:**
- Grafito y papel frío alternados por capítulos; el naranja solo para la acción y lo vivo.
- Archivo con eje de ancho: expandida (wdth 118 a 125) en titulares y cifras, normal (wdth 100) para leer.
- Cero radio en todo: botones, campos, tarjetas, videos, etiquetas y paneles.
- Filetes de 1px y hojas de datos en lugar de tarjetas con sombra.
- Motivos del rubro con función: módulo, celdas, busbars, plano unifilar, sol y tracker.
- Fotografía y video de obras propias; nada de stock.

## Colors

Grafito y papel como base, un naranja que decide y colores de trabajo que identifican, nunca decoran.

### Primary
- **Naranja Lumager** (orange): el color de la marca y de la acción. Botón principal, celda de contacto de la cabecera, cuadrado de play, marca de la sección actual, sol del instrumento solar, selección de texto y anillo de foco. Sobre él, siempre texto en tinta (ink). Al pasar el mouse se aclara (orange-hover).

### Secondary
- **Verde del Logo** (green; sobre oscuro, green-live): lo cumplido y lo sustentable. Tildes hechos del método, CO₂ evitado en las cifras, corriente alterna en el plano (con sus rótulos en plan-ac-label). En el noticiero, la cabecera usa su versión profunda (news-masthead), a pedido del cliente.

### Tertiary
- **Plano de Ingeniería** (plan, plan-2, plan-paper): solo en "Todo en uno, del sol a la red". Son celdas azuladas de panel con juntas claras, y el contenido va en hojas de papel liso (plan-paper) apoyadas encima. La corriente continua va en naranja profundo (plan-dc, rótulos plan-dc-label).
- **Cielo Cuyano** (sky-dawn, sky-morning, sky-noon, sky-afternoon, sky-night): los tintes del día, del amanecer a la noche. Cada etapa de "De sol a sol" toma el tinte de su hora. El noticiero los usa en sus bandas: la noche en la hoja de cifras y la tarde en el Diario de obra y el cierre.
- **Láminas de servicio** (leaf-soft, sand-soft, steel-soft): tintes suaves por tipo de servicio en las láminas de "Y además".
- **Tonos del noticiero:** cada sección tiene un tono (marca), un tinte (fondo) y una tinta (texto sobre el tinte, AA):
  - Obras en naranja.
  - Clientes en verde.
  - Prensa en verde azulado.
  - Diario de obra en ámbar.
  - Empresa en índigo.

### Neutral
- **Tinta Obra** (ink): fondo de los capítulos oscuros, del pie y del cuerpo de la página. Texto principal sobre papel.
- **Grafito** (graphite): hover de lo oscuro y segundo gris de marca.
- **Papel Frío** (paper) y **Papel Hondo** (paper-2): fondos claros; paper-2 separa una banda de la siguiente.
- **Junta** (line) y **Junta Oscura** (dark-line): filetes de 1px sobre papel y sobre grafito.
- **Gris Nota** (muted) y **Gris Nota Oscuro** (on-dark-muted): texto secundario, siempre con contraste AA.
- **Error** (error): borde del campo inválido y su mensaje.

### Named Rules
**The Orange Works Rule.** El naranja marca la acción o lo que está vivo, y nada más. Un fondo, un título o un adorno en naranja es un error.

**The Working Color Rule.** Todo color fuera de grafito, papel y naranja tiene un trabajo nombrado (lo cumplido, la ingeniería, la hora del día, la sección de una nota). Si no se puede decir qué identifica, no va.

## Typography

**Display Font:** Archivo, eje de ancho (with system-ui, sans-serif)
**Body Font:** Archivo, eje de ancho (with system-ui, sans-serif)

**Character:** Una sola familia con dos voces. Expandida y semibold, es la rotulación de un cartel de obra. A ancho normal, con un leve espacio entre palabras (0.04em), es un texto técnico que se lee sin esfuerzo.

### Hierarchy
- **Display** (600, clamp(3rem, min(8.4vw, 11.5svh), 6rem), 0.98; wdth 125): el titular del hero, en dos líneas.
- **Headline** (600, clamp(2.25rem, 5vw, 4rem), 0.98; wdth 125): el título de cada capítulo, con `text-wrap: balance`. Nunca supera 6rem.
- **Title** (600, 1.125 a 1.25rem, 1.3; wdth 118): títulos de tarjetas, obras, notas y pestañas.
- **Figure** (600, clamp(1.3rem, 1.9vw, 1.85rem); wdth 118; cifras tabulares): cifras de las hojas de datos y de los contadores.
- **Lead** (400, 1.125 a 1.25rem, 1.625): bajadas de sección, con un máximo de 46 a 58ch.
- **Body** (400, 1rem, 1.5): texto corrido, con un máximo de 65 a 70ch.
- **Label** (600, 0.8rem; wdth 112): etiquetas de sección de las notas, rótulos de datos y duraciones.

### Named Rules
**The Width Axis Rule.** La jerarquía sale del eje de ancho y del peso, no de otra familia: expandida para ser vista y normal para ser leída. No se agrega una segunda tipografía ni monoespaciada de adorno.

**The Tabular Figures Rule.** Toda cifra que se compara o cuenta (kW, fechas, horas, duraciones) va con números tabulares.

## Layout

- **Contenedor y márgenes:** un contenedor de 88rem centrado, con márgenes de 20px en celular, 32px en tablet y 48px en escritorio. Grilla de 12 columnas en escritorio: el texto de sección suele ocupar 5 a 7 columnas y la bajada se ubica a la derecha, alineada abajo con el título.
- **Ritmo y fondos:** los capítulos tienen 80px de alto de padding (112px en escritorio grande) y alternan papel y grafito.
- **Recorrido de la página:** está ordenado como una decisión de compra: quiénes son, si es para mí, lo hicieron antes, qué hacen, cómo trabajan, si llegan y cómo pago.
- **Densidad:** media y aireada en el inicio, con una idea por capítulo. Densa en el cable del noticiero, con filas de seis columnas (fecha, sección, titular, dato, miniatura y flecha) que en celular bajan a dos.
- **Celular:** los rieles horizontales pasan a desplazamiento con snap y las hojas de datos pasan de columnas a filas. Una barra de contacto fija aparece entre el hero y el formulario.

## Elevation & Depth

El sistema es plano. La profundidad sale del tono (papel sobre grafito, hoja sobre plano) y de filetes de 1px. Las sombras quedan solo para lo que flota o se apoya.

### Shadow Vocabulary
- **Módulo flotante** (`box-shadow: 0 10px 30px rgb(10 12 11 / 0.18)`; sólido: `0 12px 34px rgb(10 12 11 / 0.3)`): la cabecera sobre el hero y al bajar.
- **Hoja de plano** (`box-shadow: 0 1px 0 rgb(16 42 76 / 0.04), 0 18px 40px -16px rgb(16 42 76 / 0.22)`): las hojas apoyadas sobre el panel del plano.
- **Panel emergente** (`box-shadow: 0 24px 60px rgb(10 12 11 / 0.45)`): el panel abierto de Instagram en el noticiero.

### Named Rules
**The No Blur Rule.** Nada se desenfoca: ni `filter: blur` ni `backdrop-filter`, ni quietos ni animados, ni el `placeholder="blur"` de las imágenes de Next (su filtro SVG a pantalla completa trababa la intro). Lo que flota sobre una foto usa un fondo más denso, y una foto que carga muestra el fondo liso de su contenedor. Es un pedido del cliente por fluidez en Chrome.

**The Flat Sheet Rule.** Las tarjetas, las cifras y las listas no llevan sombra. Si algo necesita separarse, va un filete o un cambio de tono.

## Shapes

- **Radio:** cero en todo, sin excepciones, como las celdas de un módulo y los cortes de una chapa.
- **Separación:** los contenedores se separan con juntas de 1px o de 2px, en las que el fondo asoma entre celdas.
- **Formas cuadradas:** las marcas de sección, el play y los indicadores son cuadrados. Los únicos círculos son el sol (en el instrumento solar y en "De sol a sol") y los símbolos eléctricos del unifilar, que siguen la notación del plano.
- **Fotos y videos:** van en rectángulos a sangre, con recorte controlado (object-position por obra).

## Components

### Buttons
- **Shape:** a escuadra (0px), de 52px de alto y 24px de padding lateral. Label semibold con eje de ancho 110. La flecha avanza 4px al pasar el mouse y el botón se achica a 0.97 al presionar.
- **Primary:** naranja con texto en tinta. Es la acción de contacto ("Contanos tu proyecto").
- **Ink:** tinta con texto claro, sobre papel; al pasar el mouse pasa a grafito.
- **Line:** borde de 1px del color del texto; al pasar el mouse toma un tinte del 10%.
- **Focus:** anillo naranja de 2px, desplazado 3px.

### Navigation (el módulo)
- **Style:** una barra fija, flotante, que es un módulo fotovoltaico. Tiene un marco de aluminio translúcido, celdas de vidrio grafito denso (76% de opacidad, sin desenfoque) y tres busbars tenues por celda. Sobre el hero deja ver apenas la foto; al bajar se vuelve casi opaca.
- **States:** la celda de la sección actual "genera" (marca naranja y un calor que sube). Al pasar el mouse, un reflejo de sol cruza el vidrio en diagonal. El contacto es la celda naranja.
- **Mobile:** menú en grilla de dos columnas con celdas grandes y un velo grafito detrás.

### Inputs / Fields
- **Style:** fondo papel, borde de 1px (line) y cursor naranja. Radio cero.
- **Focus:** contorno de tinta de 2px.
- **Error:** borde en error, con el mensaje anunciado y enlazado al campo.
- **Opciones:** las opciones se eligen con botones a escuadra. El campo precargado destella naranja una vez.

### Chips (etiquetas de sección del noticiero)
- **Style:** una ficha teñida con el tinte de la sección, el texto en su tinta y un cuadrado de su tono. Sobre grafito queda solo el cuadrado.

### Video
- **Style:** portada local hasta que se toca. Play cuadrado naranja: abajo a la izquierda en vertical y al centro en horizontal. Duración con números tabulares y un velo corto de lectura. YouTube carga solo al reproducir, sin cookies.

### Data Sheet (hoja de datos)
- **Style:** cifras expandidas con números tabulares y su rótulo, separadas por filetes. Cada una tiene su color de trabajo (CO₂ en verde, potencia en naranja). Aparece en el hero, en el noticiero y en la cabecera del medio.

### Signature: Instrumento solar
La hora real de Pocito, la altura del sol calculada y un arco del día con el sol en su posición actual. Es la firma del hero.

### Signature: Intro
Un módulo de celdas grafito tapa la pantalla, el logo aparece con una barra naranja que carga y las celdas se retiran en diagonal desde abajo a la izquierda, destapando el hero. Dura menos de 2 s y se ve una vez por sesión. El logo va incrustado en el CSS para estar en el primer cuadro, y todo anima solo con transformación y opacidad.

### Signature: Entrada en panel
Cada sección sin entrada propia arranca tapada por una grilla de celdas de su mismo color. La luz la barre en diagonal y cada celda se achica y se retira, solo con transformación y opacidad. Las grillas se arman cuando el navegador queda libre y recién cuando la sección está por aparecer.

## Do's and Don'ts

### Do:
- **Do** alternar papel y grafito por capítulo, para que cada pregunta del visitante se lea como un bloque.
- **Do** usar el naranja solo en la acción y en lo vivo, con texto en tinta encima.
- **Do** titular con Archivo expandida (wdth 125, semibold, tracking -0.02em) y leer a ancho normal.
- **Do** separar con filetes de 1px y juntas, y mostrar cifras en hojas de datos con números tabulares.
- **Do** usar fotos y videos de obras propias, con el cliente nombrado cuando el video lo nombra.
- **Do** darle a cada color secundario un trabajo que se pueda nombrar.
- **Do** respetar el movimiento reducido: el contenido tiene que verse completo sin ninguna animación.
- **Do** animar solo `transform` y `opacity` en todo lo que se mueve al cargar o con el scroll, para que la GPU lo resuelva aunque la página esté cargando JavaScript.
- **Do** en celular, convertir las pilas largas de tarjetas en carriles horizontales (84% de ancho, con la siguiente asomando) y dar al menos 38px de alto de toque a los enlaces.

### Don't:
- **Don't** redondear esquinas, en ningún componente.
- **Don't** usar fotos de stock, íconos de adorno ni emojis en lugar de íconos.
- **Don't** sumar una segunda familia tipográfica ni monoespaciada de disfraz técnico.
- **Don't** usar sombras en tarjetas o listas; la profundidad es tonal.
- **Don't** usar blur (`filter: blur` o `backdrop-filter`), ni animar colores de fondo en elementos grandes o repetidos.
- **Don't** llenar fondos o títulos de naranja, ni usar degradés en el texto.
- **Don't** armar la página con grillas de tarjetas iguales de ícono, título y texto.
- **Don't** poner una etiqueta o antetítulo encima de un título.
