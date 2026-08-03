import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "¿Quién puede comprar en Centinela Dental?",
    answer:
      "Vendemos exclusivamente a odontólogos, clínicas odontológicas y laboratorios dentales " +
      "legalmente constituidos en Colombia. No vendemos directamente al público general. Para " +
      "activar una cuenta se requiere cédula o tarjeta profesional del odontólogo responsable, " +
      "RUT de la clínica o laboratorio, y certificado de existencia y representación legal si la " +
      "compra se factura a una persona jurídica. La verificación toma entre 1 y 2 días hábiles. " +
      "Sistemas de implantes, biomateriales de injerto óseo y equipos de cirugía guiada solo se " +
      "despachan a cuentas con tarjeta profesional de odontología vigente.",
  },
  {
    question: "¿Cuánto tarda el envío de mi pedido?",
    answer:
      "Bogotá, Medellín, Cali y Barranquilla: 2 a 3 días hábiles. Resto del país: 4 a 7 días " +
      "hábiles. Zonas de difícil acceso (Amazonía, San Andrés y Providencia): hasta 10 días " +
      "hábiles. El envío es gratuito para pedidos superiores a $500.000 COP; por debajo de ese " +
      "valor el costo fijo es de $25.000 COP. Los equipos de CAD/CAM (escáneres, impresoras 3D) " +
      "se envían con seguro de transporte y requieren firma de un responsable de la clínica.",
  },
  {
    question: "¿Puedo devolver un producto?",
    answer:
      "Productos sin abrir y en su empaque original pueden devolverse dentro de los 15 días " +
      "calendario posteriores a la entrega, con nota de crédito o reembolso. Por razones " +
      "sanitarias no se aceptan devoluciones de productos de un solo uso ya abiertos (resinas, " +
      "geles de blanqueamiento, biomateriales) ni de consumibles con el empaque de esterilidad " +
      "roto. Para iniciar una devolución, indica el SKU, número de pedido y motivo; confirmamos " +
      "la elegibilidad en máximo 2 días hábiles.",
  },
  {
    question: "¿Qué garantía tienen los productos?",
    answer:
      "Los sistemas de implantes FGM (Aikkon, Arcsys, Vezza) y sus componentes protésicos tienen " +
      "garantía de fábrica de 30 días calendario contra defectos de fabricación desde la fecha de " +
      "entrega. Los equipos (lámparas de fotocurado, escáneres intraorales, impresoras 3D) tienen " +
      "12 meses de garantía. Los consumibles (resinas, geles de blanqueamiento, higiene oral) " +
      "tienen 15 días. Ninguna garantía cubre fallas por manejo, esterilización o instalación " +
      "inadecuada.",
  },
  {
    question: "¿Qué medios de pago aceptan?",
    answer:
      "Transferencia bancaria (PSE), tarjeta de crédito empresarial y, para clínicas con al menos " +
      "3 pedidos previos completados sin incidencias, crédito directo a 30 días previa aprobación " +
      "de nuestro equipo comercial. Todos los precios están en pesos colombianos (COP) e incluyen " +
      "IVA cuando aplica, y la factura electrónica se emite a nombre de la clínica, laboratorio o " +
      "profesional registrado en la cuenta verificada.",
  },
  {
    question: "¿Puedo pagar en cuotas un equipo de alto valor?",
    answer:
      "Sí. Los equipos de CAD/CAM (escáneres intraorales, impresoras 3D) y los kits de cirugía " +
      "guiada de alto valor pueden pagarse en hasta 3 cuotas mensuales sin intereses, sujeto a " +
      "aprobación de crédito por parte de nuestro equipo comercial.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Preguntas frecuentes</h1>
        <p className="text-muted-foreground">
          Respuestas rápidas sobre compra profesional, envíos, devoluciones, garantías y pagos.
          Para casos particulares, nuestro asistente virtual o el equipo de escalaciones puede
          ayudarte con más detalle.
        </p>
      </div>
      <Accordion>
        {FAQS.map((faq, index) => (
          <AccordionItem key={faq.question} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
