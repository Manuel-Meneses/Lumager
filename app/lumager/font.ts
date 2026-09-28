import { Archivo } from "next/font/google";

// Archivo con eje de ancho: expandida en titulares, normal para leer. La comparten el inicio
// y las noticias de /lumager.
export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
