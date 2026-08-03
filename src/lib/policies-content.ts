// Contenido copiado de los 4 documentos reales que alimentan la base de conocimiento
// del asistente de IA (centinela-backend/apps/engagement-service/seed/policies/*.md).
// No parafrasear ni inventar cifras nuevas aquí — si el backend cambia una política,
// hay que actualizar este archivo a mano (no hay sincronización automática entre repos).
export const POLICIES = [
  {
    slug: "envios",
    title: "Envíos",
    sections: [
      {
        heading: "Cobertura y tiempos de entrega",
        body:
          "Centinela Dental despacha pedidos a clínicas y consultorios en todo el territorio " +
          "colombiano. Bogotá, Medellín, Cali y Barranquilla: entrega en 2 a 3 días hábiles. Resto " +
          "del país: entrega en 4 a 7 días hábiles. Zonas de difícil acceso (Amazonía, San Andrés y " +
          "Providencia) pueden requerir hasta 10 días hábiles.",
      },
      {
        heading: "Costos de envío",
        body:
          "El envío es gratuito para pedidos superiores a $500.000 COP. Pedidos por debajo de " +
          "ese valor tienen un costo fijo de $25.000 COP, calculado automáticamente al finalizar la " +
          "compra.",
      },
      {
        heading: "Productos de manejo especial",
        body:
          "Equipos de CAD/CAM (escáneres intraorales, impresoras 3D) se envían con seguro de " +
          "transporte incluido y requieren firma de un responsable de la clínica al momento de la " +
          "entrega. Biomateriales e implantes se despachan en empaque con control de temperatura " +
          "cuando el fabricante lo exige.",
      },
      {
        heading: "Seguimiento",
        body:
          "Todo pedido despachado incluye número de guía y enlace de rastreo enviado al correo " +
          "registrado en la cuenta de la clínica.",
      },
    ],
  },
  {
    slug: "devoluciones-garantia",
    title: "Devoluciones y garantía",
    sections: [
      {
        heading: "Devoluciones",
        body:
          "Productos sin abrir y en su empaque original pueden devolverse dentro de los 15 " +
          "días calendario posteriores a la entrega, con nota de crédito o reembolso según lo " +
          "prefiera la clínica. Por razones sanitarias, no se aceptan devoluciones de productos de " +
          "un solo uso ya abiertos (resinas, geles de blanqueamiento, biomateriales) ni de " +
          "consumibles cuyo empaque de esterilidad haya sido roto.",
      },
      {
        heading: "Garantía de implantes y componentes protésicos",
        body:
          "Los sistemas de implantes FGM (Aikkon, Arcsys, Vezza) y sus componentes protésicos " +
          "cuentan con garantía de fábrica de 30 días calendario contra defectos de fabricación, " +
          "contados desde la fecha de entrega. La garantía no cubre fallas por manejo, " +
          "esterilización o instalación inadecuada.",
      },
      {
        heading: "Garantía de equipos",
        body:
          "Lámparas de fotocurado, escáneres intraorales e impresoras 3D tienen garantía de 12 " +
          "meses contra defectos de fabricación, gestionada directamente con soporte técnico de " +
          "Centinela Dental.",
      },
      {
        heading: "Garantía de consumibles",
        body:
          "Resinas, geles de blanqueamiento y productos de higiene oral tienen garantía de 15 " +
          "días únicamente por defectos de fabricación verificables (no por mal uso o vencimiento " +
          "posterior a la entrega).",
      },
      {
        heading: "Proceso",
        body:
          "Para iniciar una devolución o reclamo de garantía, la clínica debe indicar el SKU, " +
          "número de pedido y motivo; nuestro equipo confirma la elegibilidad en un plazo máximo de " +
          "2 días hábiles.",
      },
    ],
  },
  {
    slug: "verificacion-comprador",
    title: "Verificación de comprador",
    sections: [
      {
        heading: "Quién puede comprar",
        body:
          "Centinela Dental es un distribuidor B2B: vende exclusivamente a odontólogos, " +
          "clínicas odontológicas y laboratorios dentales legalmente constituidos en Colombia. No " +
          "vendemos directamente al público general.",
      },
      {
        heading: "Documentos requeridos",
        body:
          "Para activar una cuenta de compra se requiere: cédula profesional o tarjeta " +
          "profesional del odontólogo responsable, RUT de la clínica o laboratorio, y certificado " +
          "de existencia y representación legal si la compra se factura a una persona jurídica.",
      },
      {
        heading: "Productos con restricción adicional",
        body:
          "Sistemas de implantes, biomateriales de injerto óseo y equipos de cirugía guiada " +
          "solo se despachan a cuentas verificadas con tarjeta profesional de odontología vigente. " +
          "Productos de higiene oral y algunos kits de blanqueamiento domiciliario pueden comprarse " +
          "con verificación estándar de clínica.",
      },
      {
        heading: "Tiempo de verificación",
        body:
          "La verificación de una cuenta nueva toma entre 1 y 2 días hábiles tras recibir los " +
          "documentos completos.",
      },
    ],
  },
  {
    slug: "terminos-pago",
    title: "Términos de pago",
    sections: [
      {
        heading: "Medios de pago",
        body:
          "Aceptamos transferencia bancaria (PSE), tarjeta de crédito empresarial y, para " +
          "clínicas con historial de compra recurrente, crédito directo a 30 días previa aprobación " +
          "de nuestro equipo comercial.",
      },
      {
        heading: "Moneda y facturación",
        body:
          "Todos los precios publicados están en pesos colombianos (COP) e incluyen IVA cuando " +
          "aplica. La factura electrónica se emite a nombre de la clínica, laboratorio o " +
          "profesional registrado en la cuenta verificada.",
      },
      {
        heading: "Crédito a 30 días",
        body:
          "Disponible para clínicas con al menos 3 pedidos previos completados sin " +
          "incidencias. El cupo de crédito inicial se define según el historial de compra y puede " +
          "ampliarse con el tiempo.",
      },
      {
        heading: "Pedidos de alto valor",
        body:
          "Equipos de CAD/CAM (escáneres intraorales, impresoras 3D) y kits de cirugía guiada " +
          "de alto valor pueden pagarse en hasta 3 cuotas mensuales sin intereses, sujeto a " +
          "aprobación de crédito.",
      },
    ],
  },
] as const;
