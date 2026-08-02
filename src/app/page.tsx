import Link from "next/link";
import { ShieldCheck, Stethoscope, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/lib/catalog";

const BRAND_NAME = process.env.BRAND_NAME ?? "Centinela Dental";

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 space-y-16">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            Distribuidor autorizado FGM Dental Group en Colombia
          </span>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Productos odontológicos profesionales, con soporte inteligente 24/7
          </h1>
          <p className="text-lg text-muted-foreground">
            {BRAND_NAME} distribuye implantes, biomateriales, resinas, equipos de fotocurado y
            flujo digital de FGM Dental Group a clínicas y laboratorios en toda Colombia. Nuestro
            asistente resuelve dudas de precio, stock y recomendación clínica al instante — y te
            conecta con un asesor humano cuando lo necesitas.
          </p>
          <div className="flex gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/catalog" />}>
              Ver catálogo
            </Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/inbox" />}>
              Panel de escalaciones
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <Stethoscope className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Venta profesional</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Cuentas verificadas para odontólogos, clínicas y laboratorios.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <Truck className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Envíos a todo el país</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Despacho asegurado para equipos e implantes, 2 a 7 días hábiles.
            </CardContent>
          </Card>
          <Card className="sm:col-span-2">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Asistente Centinela</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Responde con base en nuestro catálogo y políticas reales, recomienda productos según
              la necesidad clínica, y escala a un asesor humano cuando hace falta. Pruébalo con el
              botón de chat.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Líneas de producto</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/catalog/${category.slug}`}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle className="text-base">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {category.description}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
