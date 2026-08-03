import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";

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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="border-b bg-background">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                <ShieldCheck className="h-6 w-6 text-primary" />
                {BRAND_NAME}
              </Link>
              <div className="flex items-center gap-4">
                <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
                  <Link href="/catalog" className="hover:text-foreground">
                    Catálogo
                  </Link>
                  <Link href="/inbox" className="hover:text-foreground">
                    Inbox de escalaciones
                  </Link>
                  <Link href="/leads" className="hover:text-foreground">
                    Leads
                  </Link>
                  <Link href="/faq" className="hover:text-foreground">
                    Preguntas frecuentes
                  </Link>
                  <Link href="/contacto" className="hover:text-foreground">
                    Contacto
                  </Link>
                  <Link href="/politicas" className="hover:text-foreground">
                    Políticas
                  </Link>
                </nav>
                <ThemeToggle />
                <MobileNav />
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 text-center text-xs text-muted-foreground space-y-3">
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <Link href="/faq" className="hover:text-foreground">
                Preguntas frecuentes
              </Link>
              <Link href="/contacto" className="hover:text-foreground">
                Contacto
              </Link>
              <Link href="/politicas" className="hover:text-foreground">
                Políticas
              </Link>
            </nav>
            <p>
              {BRAND_NAME} — Distribuidor autorizado en Colombia de FGM Dental Group. Venta exclusiva a
              profesionales y clínicas odontológicas.
            </p>
          </footer>
          <ChatWidget brandName={BRAND_NAME} />
        </ThemeProvider>
      </body>
    </html>
  );
}
