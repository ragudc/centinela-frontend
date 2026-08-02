import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BRAND_NAME = process.env.BRAND_NAME ?? "Centinela Dental";

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Distribuidor autorizado FGM en Colombia`,
  description:
    "Tienda B2B de productos odontológicos profesionales FGM Dental Group, con asistente de atención al cliente disponible 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b bg-background">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <ShieldCheck className="h-6 w-6 text-primary" />
              {BRAND_NAME}
            </Link>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/catalog" className="hover:text-foreground">
                Catálogo
              </Link>
              <Link href="/inbox" className="hover:text-foreground">
                Inbox de escalaciones
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          {BRAND_NAME} — Distribuidor autorizado en Colombia de FGM Dental Group. Venta exclusiva a
          profesionales y clínicas odontológicas.
        </footer>
        <ChatWidget brandName={BRAND_NAME} />
      </body>
    </html>
  );
}
