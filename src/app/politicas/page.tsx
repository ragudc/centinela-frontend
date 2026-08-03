import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { POLICIES } from "@/lib/policies-content";

export default function PoliciesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Políticas</h1>
        <p className="text-muted-foreground">
          Envíos, devoluciones, garantía, verificación de comprador profesional y términos de pago.
          Este es el mismo contenido que usa nuestro asistente virtual para responder tus preguntas.
        </p>
      </div>

      <Tabs defaultValue={POLICIES[0].slug}>
        <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <TabsList>
            {POLICIES.map((policy) => (
              <TabsTrigger key={policy.slug} value={policy.slug}>
                {policy.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {POLICIES.map((policy) => (
          <TabsContent key={policy.slug} value={policy.slug} className="space-y-4">
            {policy.sections.map((section) => (
              <div key={section.heading} className="space-y-1">
                <h2 className="text-base font-semibold">{section.heading}</h2>
                <p className="text-sm text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
