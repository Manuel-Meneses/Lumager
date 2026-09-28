"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { lumager, lumagerCta } from "@/lib/lumager";

/**
 * En celular la cabecera no tiene lugar para el botón de contacto: esta barra lo trae
 * abajo, al alcance del pulgar. Aparece al dejar el hero y se va al llegar al formulario
 * (y en todo lo que sigue), para no tapar lo que ya está pidiendo.
 */
export function MobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contacto");
    if (!hero || !contact) return;
    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    // Desde que el formulario asoma un cuarto de pantalla y todo lo que queda abajo.
    const contactIo = new IntersectionObserver(
      ([e]) => setAtContact(e.isIntersecting || e.boundingClientRect.top < 0),
      { rootMargin: "0px 0px -25% 0px" },
    );
    heroIo.observe(hero);
    contactIo.observe(contact);
    return () => {
      heroIo.disconnect();
      contactIo.disconnect();
    };
  }, []);

  const shown = pastHero && !atContact;

  return (
    <div className="lx-mobile-cta sm:hidden" data-shown={shown} inert={!shown}>
      <a href={lumagerCta.href} className="lx-mobile-cta-main">
        {lumagerCta.label}
        <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
      </a>
      <a
        href={`https://wa.me/${lumager.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp (se abre en otra pestaña)"
        className="lx-mobile-cta-wa"
      >
        <WhatsappLogoIcon size={24} weight="fill" aria-hidden="true" />
      </a>
    </div>
  );
}
