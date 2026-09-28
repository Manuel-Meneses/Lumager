/**
 * Posición del sol (algoritmo simplificado de la NOAA, error de unos pocos minutos
 * y décimas de grado). Suficiente para mostrar la altura del sol y el arco del día.
 */
const rad = Math.PI / 180;

function solarTerms(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - start) / 86_400_000);
  const hours = date.getUTCHours() + date.getUTCMinutes() / 60;
  const g = ((2 * Math.PI) / 365) * (dayOfYear - 1 + (hours - 12) / 24);
  const eqTime =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl =
    0.006918 -
    0.399912 * Math.cos(g) +
    0.070257 * Math.sin(g) -
    0.006758 * Math.cos(2 * g) +
    0.000907 * Math.sin(2 * g) -
    0.002697 * Math.cos(3 * g) +
    0.00148 * Math.sin(3 * g);
  return { eqTime, decl };
}

export type SunState = {
  /** Altura del sol sobre el horizonte, en grados. */
  elevation: number;
  /** Salida y puesta, en minutos desde la medianoche local. */
  sunrise: number;
  sunset: number;
  /** Minutos desde la medianoche local ahora. */
  now: number;
  /** 0 a 1 entre salida y puesta; fuera de ese rango, de noche. */
  progress: number;
};

export function sunState(date: Date, lat: number, lon: number, utcOffset: number): SunState {
  const { eqTime, decl } = solarTerms(date);
  const utcMinutes = date.getUTCHours() * 60 + date.getUTCMinutes() + date.getUTCSeconds() / 60;
  const trueSolar = utcMinutes + eqTime + 4 * lon;
  const hourAngle = trueSolar / 4 - 180;
  const cosZenith =
    Math.sin(lat * rad) * Math.sin(decl) + Math.cos(lat * rad) * Math.cos(decl) * Math.cos(hourAngle * rad);
  const elevation = 90 - Math.acos(Math.min(1, Math.max(-1, cosZenith))) / rad;

  const ha =
    Math.acos(
      Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl),
    ) / rad;
  const toLocal = (m: number) => (((m + utcOffset * 60) % 1440) + 1440) % 1440;
  const sunrise = toLocal(720 - 4 * (lon + ha) - eqTime);
  const sunset = toLocal(720 - 4 * (lon - ha) - eqTime);
  const now = toLocal(utcMinutes);
  return { elevation, sunrise, sunset, now, progress: (now - sunrise) / (sunset - sunrise) };
}

export function hhmm(minutes: number) {
  const m = Math.round(minutes) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}
