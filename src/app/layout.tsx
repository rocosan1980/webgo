import type { Metadata } from "next";
import { Figtree, Space_Grotesk } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WebGo | Landing pages profesionales de entrega ágil",
    template: "%s | WebGo",
  },
  description:
    "WebGo diseña landing pages profesionales de alta conversión con entrega rápida, formularios a WhatsApp, automatizaciones e integraciones con IA. webgo.lat",
  metadataBase: new URL("https://webgo.lat"),
  openGraph: {
    title: "WebGo | Landing pages profesionales de entrega ágil",
    description:
      "Diseño web ágil, alta conversión e integraciones avanzadas para hacer crecer tu negocio.",
    url: "https://webgo.lat",
    siteName: "WebGo",
    locale: "es_LA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${figtree.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
