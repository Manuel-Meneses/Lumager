/**
 * Animación de inicio: un módulo de celdas grafito tapa la pantalla, el logo aparece
 * con una barra naranja que carga y las celdas se retiran en diagonal, como el sol
 * barriendo un panel, destapando el parque. Es CSS puro (no espera a la hidratación)
 * y dura menos de 2 s. Se ve una vez por sesión: el script de abajo, que corre antes
 * de pintar, la apaga si ya se vio o si el visitante pide menos movimiento.
 */
const COLS = 12;
const ROWS = 8;
// En vertical la grilla pasa a 6 x 12 celdas: cada celda lleva el retardo de las dos grillas.
const M_COLS = 6;
const M_ROWS = 12;

const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
  const c = i % COLS;
  const r = Math.floor(i / COLS);
  const mc = i % M_COLS;
  const mr = Math.floor(i / M_COLS);
  return {
    // Diagonal desde abajo a la izquierda: por ahí entra la luz.
    d: c + (ROWS - 1 - r),
    md: mr < M_ROWS ? mc + (M_ROWS - 1 - mr) : -1,
  };
});

const skipScript = `try{var k="lx-intro-seen";if(sessionStorage.getItem(k)||matchMedia("(prefers-reduced-motion: reduce)").matches){var s=document.createElement("style");s.textContent=".lx-intro{display:none!important}.lx{--intro-delay:0ms}";document.head.appendChild(s)}else{sessionStorage.setItem(k,"1")}}catch(e){}`;

export function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: skipScript }} />
      <div className="lx-intro" aria-hidden="true">
        <div className="lx-intro-grid">
          {cells.map((cell, i) => (
            <span
              key={i}
              data-m={cell.md >= 0 ? undefined : "off"}
              style={{ ["--d" as string]: cell.d, ["--md" as string]: Math.max(0, cell.md) }}
            />
          ))}
        </div>
        <div className="lx-intro-mark">
          <span className="lx-logo lx-intro-logo" />
          <span className="lx-intro-bar" />
        </div>
      </div>
    </>
  );
}
