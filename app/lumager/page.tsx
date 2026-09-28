import type { Metadata } from "next";
import { LumagerHeader } from "@/components/lumager/header";
import { Intro } from "@/components/lumager/intro";
import { LumagerHero } from "@/components/lumager/hero";
import { Mountings } from "@/components/lumager/mountings";
import { Sectors } from "@/components/lumager/sectors";
import { Method } from "@/components/lumager/method";
import { Financing } from "@/components/lumager/financing";
import { MobileCta } from "@/components/lumager/mobile-cta";
import { Partners } from "@/components/lumager/partners";
import { PanelEntrance } from "@/components/panel-entrance";
import { Process } from "@/components/lumager/process";
import { EnergyPath } from "@/components/lumager/energy-path";
import { Testimonials } from "@/components/lumager/testimonials";
import { Clients } from "@/components/lumager/clients";
import { SocialReels } from "@/components/lumager/social-reels";
import { Territory } from "@/components/lumager/territory";
import { LumagerContact } from "@/components/lumager/contact";
import { LumagerFooter } from "@/components/lumager/footer";
import { lumager } from "@/lib/lumager";
import { archivo } from "./font";
import "./lumager.css";

/* Propuesta de inicio para mostrarle a Lumager. No se indexa: es una vista previa. */
export const metadata: Metadata = {
  title: `${lumager.name} | Ingeniería solar llave en mano`,
  description: lumager.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${lumager.name} | Ingeniería solar llave en mano`,
    description: lumager.description,
    locale: "es_AR",
    type: "website",
    images: ["/lumager/parque-solar-drone.jpg"],
  },
};

export default function LumagerHome() {
  return (
    <div className={`lx ${archivo.variable}`}>
      <Intro />
      <LumagerHeader />
      {/* El orden cuenta una decisión de compra, un capítulo por pregunta del visitante.
          La prueba va antes que el detalle: quien se reconoce en un sector ve enseguida a
          otros como él que ya lo hicieron, y recién después el catálogo y el método.
          1. ¿Quiénes son y quién confía en ellos? Hero con sus cifras y logos.
          2. ¿Es para mí? Sectores y tipos de sistema.
          3. ¿Lo hicieron antes y cómo les fue? Clientes con nombre propio, sus palabras y dónde va el sistema.
          4. ¿Qué hacen exactamente? Todo en uno, del sol a la red: cada tramo es un servicio, y los que no son tramo van en "Y además".
          5. ¿Cómo trabajan? Llave en mano, la obra en redes y Lean + LPS.
          6. ¿Llegan a mi zona y cómo lo pago? Territorio y financiamiento, pegado al formulario.
          Los fondos alternan papel y grafito para que cada capítulo se lea como un bloque. */}
      <main>
        <LumagerHero />
        <Partners />

        <Sectors />

        {/* Datos y voces en una misma banda cálida: la luz los acompaña de uno al otro. */}
        <div className="lx-people">
          <div className="lx-people-light" aria-hidden="true">
            <div />
          </div>
          <Clients />
          <Testimonials />
        </div>
        <Mountings />

        <EnergyPath />

        <Process />
        <SocialReels />
        <Method />

        <Territory />
        <Financing />
        <LumagerContact />
      </main>
      <LumagerFooter />
      <MobileCta />
      <PanelEntrance />
    </div>
  );
}
