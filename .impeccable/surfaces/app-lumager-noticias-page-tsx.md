---
version: 1
slug: "app-lumager-noticias-page-tsx"
primary_target: "app/lumager/noticias/page.tsx"
related_targets: ["app/lumager/noticias/[nota]/page.tsx", "components/lumager/noticias", "lib/lumager-noticias.ts"]
---

# Surface brief: /lumager/noticias

Scope: noticiero de Lumager dentro del mundo de /lumager (hereda su identidad: grafito, papel, naranja, Archivo con eje de ancho, filetes de 1px). Modo: Read.
Pedido (28 sept. 2026): "un noticiero tech profesional". Estructura elegida por el usuario: cable de agencia (nota principal, dos secundarias, hoja de cifras y un cable denso con fecha, sección y dato).
Contenido: 22 notas reales, una por video del canal de YouTube de Lumager, con la fecha y hora de publicación del video (hora argentina) y texto tomado solo de su título, descripción y subtítulos. Más 3 notas de ejemplo (`ejemplo: true`), a pedido del usuario, con texto de lib/lumager.ts y fecha de muestra, marcadas "Ejemplo" en el cable y con aviso en la nota. TODO: reemplazarlas antes de publicar.
Secciones: Obras, Clientes, Prensa, Diario de obra, Empresa; cada una con su tono (ver Color).
Portada: cabecera con hora de San Juan, nombre "Noticias" y hoja de datos del medio; cinta "Último" que corre (se detiene con mouse o foco; quieta con movimiento reducido); nota principal (portada.principal) y dos secundarias; hoja "Lumager en cifras" a todo el ancho; cable filtrable por sección (filtrar reimprime las filas de izquierda a derecha); banda oscura "Diario de obra"; CTA al formulario del inicio.
Sin página por nota (28 sept. 2026, a pedido: "va a ser una muestra"): la nota principal reproduce su video ahí mismo; las secundarias, el Diario de obra, la cinta y las filas del cable abren el video en YouTube; las notas de ejemplo no llevan a ningún lado. noindex, como el inicio.
Navegación: "Noticias" en la cabecera y el pie de /lumager.
Color (28 sept. 2026, a pedido: "más colores para que se vea más linda"): cada sección tiene tono, tinte suave e tinta oscura (obras naranja, clientes verde, prensa verde azulado, diario ámbar, empresa índigo; tinta sobre tinte AA). Las secciones son fichas teñidas; el cable tiñe la fila al pasar el mouse y cada mes muestra la mezcla de secciones. Cabecera en el verde del logo (pedido del usuario, en lugar del azul noche), profundo arriba y fundido al grafito, con el sol naranja abajo a la derecha. Bandas con los cielos de la home:, hoja de cifras en noche con un color por cifra, Diario de obra en tarde ámbar y CTA final en papel que se entibia.
CTA de Instagram (28 sept. 2026): fijo abajo a la derecha (components/lumager/noticias/instagram-dock.tsx). Cerrado, tarjeta con miniaturas y la marca de Instagram; abierto, perfil, grilla de seis publicaciones y "Seguir". Las publicaciones reales llegan con INSTAGRAM_ACCESS_TOKEN (lib/lumager-instagram.ts, revalida cada hora); sin token muestra fotos de obra de Lumager que llevan al perfil. Instagram no permite leer publicaciones sin sesión.
