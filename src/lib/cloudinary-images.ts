/**
 * Mapa de imágenes de productos en Cloudinary.
 * Clave: nombre del producto normalizado (minúsculas, sin tildes, sin espacios,
 *        sin caracteres especiales, "%" → "porciento").
 * Valor: secure_url de Cloudinary.
 */
const CLOUDINARY_IMAGES: Record<string, string> = {
  witsmilecepillosonico:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986716/witsmilecepillosonico_dgupzy.png",
  whitenesssimple6porcientokit:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986715/whitenesssimple6porcientokit_ww5yha.png",
  whitenessperfect10porcientokit:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986715/whitenessperfect10porcientokit_pettze.png",
  vittraapsuniquestarterkit:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986714/vittraapsuniquestarterkit_smniht.png",
  whitenesshpblue35porcientokit:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986713/whitenesshpblue35porcientokit_lgfovo.png",
  vezzakitdefijaciondeimplante:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986711/vezzakitdefijaciondeimplante_kugsid.png",
  quazar5glamparadefotocuradoled:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986711/quazar5glamparadefotocuradoled_zw3o2s.png",
  nanosyntinjertooseo10g:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986709/nanosyntinjertoose10g_mnzrjr.png",
  nanosyntinjertooseo05g:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986708/nanosyntinjertooseo05g_gq9atx.png",
  kituniversaldetornillosprotesicos:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986708/kituniversaldetornillosprotesicos_hrqvlw.png",
  impresora3ddeescritoriomodelodistribuido:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986705/impresora3ddeescritoriomodelodistribuido_otvdyl.png",
  eloraapskit5tonos:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986705/eloraapskit5tonos_olqzse.png",
  aikkonkitdecirugiaguiada:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986703/aikkonkitcirugiaguiada_cinkak.png",
  escanerintraoralmodelodistribuido:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986703/escanerintraoralmodelodistribuido_ymjami.png",
  arcsyskitdepilarprotesico:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986700/arcsyskitdepilarprotesico_vvpkvl.png",
  ambaruniversalapsjeringa:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986700/ambaruniversalapsjeringa_lwwerf.png",
  desensibilizekf2porciento:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986700/desensibilizekf2porciento_uxd4xn.png",
  aikkonconemorsekitdefijacion:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986700/aikkonconemorsekitfijacion_d9i9oi.png",
  ambarapsbleach:
    "https://res.cloudinary.com/mekum5pd/image/upload/v1785986699/ambarapsbleach_bafox0.png",
};

function normalizeProductName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/%/g, "porciento")
    .replace(/[^a-z0-9]/g, ""); // elimina espacios y caracteres especiales
}

/**
 * Devuelve la URL de imagen para un producto.
 * Prioridad: Cloudinary → imageUrl del backend → placeholder local.
 */
export function resolveProductImage(name: string, imageUrl: string | null): string {
  const key = normalizeProductName(name);
  return CLOUDINARY_IMAGES[key] ?? imageUrl ?? "/products/placeholder.jpg";
}
