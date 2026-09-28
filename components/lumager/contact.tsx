"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRightIcon, CheckIcon, WhatsappLogoIcon, XIcon } from "@phosphor-icons/react";
import { lumager, PREFILL_EVENT, type ContactPrefill } from "@/lib/lumager";

/* Los mismos campos del formulario de su sitio. Sin backend: arma el mensaje y abre
   WhatsApp con los datos cargados; la factura se adjunta en el chat. Se suma una pregunta
   propia: si quiere financiarlo, con la línea que eligió en la sección Financiamiento. */
type Fields = {
  nombre: string;
  email: string;
  whatsapp: string;
  localidad: string;
  tipo: string;
  red: string;
  financia: string;
  linea: string;
  mensaje: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const tipos = ["Residencial", "Comercial / Industrial", "Agro"];
const redes = ["Sí", "No"];
const financias = ["Sí", "No", "Quiero asesoramiento"];
const empty: Fields = { nombre: "", email: "", whatsapp: "", localidad: "", tipo: "", red: "", financia: "", linea: "", mensaje: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.nombre.trim().length < 2) e.nombre = "Escribí tu nombre.";
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Revisá el email: falta el @ o el dominio.";
  if (f.whatsapp.replace(/\D/g, "").length < 8) e.whatsapp = "Incluí el código de área.";
  if (f.localidad.trim().length < 2) e.localidad = "Indicá dónde sería el proyecto.";
  if (!f.tipo) e.tipo = "Elegí un tipo de sistema.";
  if (f.mensaje.trim().length < 5) e.mensaje = "Contanos en una línea qué necesitás.";
  return e;
}

function message(f: Fields) {
  return [
    `Hola ${lumager.shortName}, quiero consultar por un proyecto.`,
    `Nombre: ${f.nombre.trim()}`,
    `Email: ${f.email.trim()}`,
    `WhatsApp: ${f.whatsapp.trim()}`,
    `Localidad: ${f.localidad.trim()}`,
    `Tipo de sistema: ${f.tipo}`,
    f.red ? `Conexión a la red: ${f.red}` : "",
    f.financia ? `Financiamiento: ${f.financia}${f.financia === "Sí" && f.linea ? ` (${f.linea})` : ""}` : "",
    `Mensaje: ${f.mensaje.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function LumagerContact() {
  const id = useId();
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);
  // Cada precarga suma uno: remonta la pregunta de financiamiento y la hace destellar.
  const [flash, setFlash] = useState(0);

  const set = (k: keyof Fields, v: string) => {
    // La línea elegida solo tiene sentido si quiere financiar.
    setF((p) => ({ ...p, [k]: v, ...(k === "financia" && v !== "Sí" ? { linea: "" } : {}) }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  // Desde Financiamiento llega la línea elegida (o el pedido de asesoramiento); desde Obras,
  // un mensaje de arranque. El mensaje solo reemplaza uno vacío o el que precargamos antes.
  const lastAsk = useRef("");
  const [askFlash, setAskFlash] = useState(0);
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { financia, linea = "", mensaje } = (e as CustomEvent<ContactPrefill>).detail;
      setSent(null);
      if (financia) {
        setF((p) => ({ ...p, financia, linea }));
        setFlash((n) => n + 1);
      }
      if (mensaje) {
        const prev = lastAsk.current;
        lastAsk.current = mensaje;
        setF((p) => (p.mensaje.trim() && p.mensaje !== prev ? p : { ...p, mensaje }));
        setAskFlash((n) => n + 1);
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(f);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) return document.getElementById(`${id}-${first}`)?.focus();
    const url = `https://wa.me/${lumager.whatsapp}?text=${encodeURIComponent(message(f))}`;
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const err = (k: keyof Fields) =>
    errors[k] && (
      <p id={`${id}-${k}-err`} className="mt-2 text-sm font-medium text-[#b3261e]">
        {errors[k]}
      </p>
    );

  const field = (k: keyof Fields, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`${id}-${k}`} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={`${id}-${k}`}
        name={k}
        value={f[k]}
        onChange={(e) => set(k, e.target.value)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${id}-${k}-err` : undefined}
        className="lx-field"
        {...props}
      />
      {err(k)}
    </div>
  );

  const choices = (k: "tipo" | "red" | "financia", legend: string, options: string[], cols: string) => (
    <fieldset aria-describedby={errors[k] ? `${id}-${k}-err` : undefined}>
      <legend className="text-sm font-semibold">{legend}</legend>
      <div className={`mt-2 grid gap-2 ${cols}`}>
        {options.map((o, i) => (
          <label key={o} className="lx-choice">
            <input
              type="radio"
              name={k}
              value={o}
              id={i === 0 ? `${id}-${k}` : undefined}
              checked={f[k] === o}
              onChange={() => set(k, o)}
              className="sr-only"
            />
            {o}
          </label>
        ))}
      </div>
      {err(k)}
    </fieldset>
  );

  // Sin la entrada de celdas (data-own-entrance): es el destino de cada acción y tiene que
  // estar a la vista al llegar.
  return (
    <section id="contacto" aria-labelledby="lx-contact-title" data-own-entrance className="lx-orange">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <h2 id="lx-contact-title" className="lx-display text-[clamp(2.5rem,4.4vw,4.25rem)]">
            Contanos tu proyecto.
          </h2>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed">
            Si ya tenés una idea del sistema, contanos qué buscás. Si no, alcanza con tu consumo y tu necesidad. Tu factura
            de luz ayuda: la podés adjuntar en el chat.
          </p>
          <a
            href={`https://wa.me/${lumager.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="lx-btn lx-btn-ink mt-10"
          >
            <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
            Escribir directo por WhatsApp
            <span className="sr-only">(se abre en otra pestaña)</span>
          </a>
        </div>

        <div className="bg-[var(--lx-paper)] p-6 sm:p-10 lg:col-span-7">
          {/* Formulario y confirmación se turnan con una entrada corta en CSS (lx-swap). */}
          {sent ? (
            <div key="ok" role="status" className="lx-swap flex min-h-[520px] flex-col justify-center">
              <span className="flex size-12 items-center justify-center bg-[var(--lx-ink)] text-[var(--lx-on-dark)]">
                <CheckIcon size={24} weight="bold" aria-hidden="true" />
              </span>
              <h3 className="lx-wide mt-6 text-2xl font-semibold">Tu consulta está lista.</h3>
              <p className="mt-2 max-w-[44ch] text-[var(--lx-muted)]">
                Abrimos WhatsApp con tus datos cargados. Enviá el mensaje y, si la tenés, sumá la foto de tu factura.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={sent} target="_blank" rel="noopener noreferrer" className="lx-btn lx-btn-primary">
                  <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
                  Abrir WhatsApp
                </a>
                <button type="button" onClick={() => setSent(null)} className="lx-btn lx-btn-line">
                  Editar datos
                </button>
              </div>
            </div>
          ) : (
            <form key="form" noValidate onSubmit={submit} className="lx-swap grid gap-6 sm:grid-cols-2">
              {field("nombre", "Nombre", { autoComplete: "name" })}
              {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
              {field("whatsapp", "WhatsApp", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "264 555 0123" })}
              {field("localidad", "Localidad del proyecto", { autoComplete: "address-level2" })}
              <div className="sm:col-span-2">{choices("tipo", "Tipo de sistema", tipos, "grid-cols-1 sm:grid-cols-3")}</div>
              <div className="sm:col-span-2">
                {choices("red", "¿Hay conexión a la red eléctrica?", redes, "grid-cols-2 sm:max-w-xs")}
              </div>
              <div key={flash} className="sm:col-span-2" data-flash={flash > 0 || undefined}>
                {choices("financia", "¿Querés financiarlo?", financias, "grid-cols-2 sm:max-w-lg sm:grid-cols-[1fr_1fr_2fr] [&>label:last-child]:col-span-2 sm:[&>label:last-child]:col-span-1")}
                {f.financia === "Sí" && f.linea && (
                  <p className="lx-flash mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="text-[var(--lx-muted)]">Línea elegida:</span>
                    <span className="font-semibold">{f.linea}</span>
                    <button
                      type="button"
                      onClick={() => set("linea", "")}
                      className="lx-link inline-flex min-h-8 items-center gap-1 text-[var(--lx-muted)]"
                    >
                      <XIcon size={14} aria-hidden="true" />
                      Quitar
                    </button>
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-mensaje`} className="text-sm font-semibold">
                  Qué necesitás
                </label>
                <textarea
                  id={`${id}-mensaje`}
                  name="mensaje"
                  rows={4}
                  value={f.mensaje}
                  onChange={(e) => set("mensaje", e.target.value)}
                  aria-invalid={!!errors.mensaje}
                  aria-describedby={errors.mensaje ? `${id}-mensaje-err` : undefined}
                  placeholder="Ej.: riego con bomba de 15 HP en un campo sin red."
                  key={askFlash}
                  className={`lx-field resize-y ${askFlash > 0 ? "lx-field-flash" : ""}`}
                />
                {err("mensaje")}
              </div>
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[var(--lx-muted)]">Respondemos por WhatsApp, sin compromiso.</p>
                <button type="submit" className="lx-btn lx-btn-ink">
                  Enviar consulta
                  <ArrowRightIcon size={18} weight="bold" className="lx-arrow" aria-hidden="true" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
