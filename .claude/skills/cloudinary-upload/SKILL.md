---
name: cloudinary-upload
description: Sube imágenes de productos a Cloudinary vía API y actualiza el mapa en src/lib/cloudinary-images.ts — usar cuando se pida "subir imagen a cloudinary", "agregar imagen de producto", "cargar imagen vía API de cloudinary" o "actualizar imágenes del catálogo".
---

## Contexto

Las imágenes de productos se almacenan en Cloudinary (cloud: `mekum5pd`) y se sirven desde
`res.cloudinary.com`. El mapa de nombre→URL vive en `src/lib/cloudinary-images.ts`.
La función `resolveProductImage(name, imageUrl)` normaliza el nombre del producto para encontrar
su clave en ese mapa — la clave es el nombre del producto en minúsculas, sin tildes, sin espacios
ni caracteres especiales, con `%` → `porciento`.

Credenciales en `.env.local`:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=mekum5pd
CLOUDINARY_API_KEY=149965598944576
CLOUDINARY_API_SECRET=Bx_oaYBT8zAjXDR581qz-8HBCks
```

## Pasos

### 1. Subir la imagen vía API de Cloudinary

Usar `curl` con autenticación básica (`API_KEY:API_SECRET`) y el endpoint de upload:

```bash
curl -s -X POST \
  "https://api.cloudinary.com/v1_1/mekum5pd/image/upload" \
  -u "149965598944576:Bx_oaYBT8zAjXDR581qz-8HBCks" \
  -F "file=@/ruta/local/imagen.png" \
  -F "public_id=nombre_archivo_sin_extension" \
  -F "folder=centinela" \
  -F "upload_preset=centinela_preset"
```

La respuesta JSON incluye `secure_url` — esa es la URL permanente HTTPS a guardar en el mapa.

Si el archivo no está disponible localmente pero sí hay una URL pública, usar:
```bash
  -F "file=https://url-publica-de-la-imagen.png"
```

### 2. Calcular la clave normalizada del producto

La clave se obtiene aplicando estas transformaciones al nombre exacto del producto (como viene
del backend GraphQL):

1. Convertir a minúsculas
2. Eliminar tildes (NFD + strip diacríticos)
3. Reemplazar `%` por `porciento`
4. Eliminar todo lo que no sea `[a-z0-9]`

Ejemplos:
```
"Whiteness HP Blue 35% Kit" → "whitenesshpblue35porcientokit"
"Aikkon Cone Morse Kit de Fijación" → "aikkonconemorsekitdefijacion"
"Nanosynt Injerto Óseo 1.0g" → "nanosyntinjertooseo10g"
```

**Gotcha conocido:** los nombres de archivo en Cloudinary pueden tener abreviaciones
que NO coinciden con el nombre completo del producto. La clave del mapa debe ser siempre
la normalización del nombre real del producto, no la del filename de Cloudinary.

### 3. Actualizar el mapa en `src/lib/cloudinary-images.ts`

Agregar la nueva entrada en `CLOUDINARY_IMAGES`:

```ts
nombreproductonormalizado:
  "https://res.cloudinary.com/mekum5pd/image/upload/vXXXXXXXXXX/public_id.png",
```

Verificar que la clave coincide exactamente con la normalización del nombre del producto
antes de guardar.

### 4. Verificar el match

Simular mentalmente la normalización del nombre del producto y confirmar que produce
exactamente la clave agregada al mapa. Si hay duda, trazar el proceso paso a paso:

```
Nombre: "Nombre Del Producto 10%"
→ lower:      "nombre del producto 10%"
→ sin tildes: "nombre del producto 10%"
→ % → porc:  "nombre del producto 10porciento"
→ solo a-z0-9: "nombredelproducto10porciento"
```

## Gotchas conocidos

- **Claves del filename vs nombre del producto** — la causa raíz más frecuente de imágenes
  que no cargan: el filename en Cloudinary es una abreviación, pero la clave del mapa debe
  coincidir con la normalización del nombre **completo** del producto tal como viene del backend.
  Siempre derivar la clave del nombre del producto, nunca del filename.

- **`Ó`/`ó` y otras vocales acentuadas** — el paso NFD + strip funciona para todas las vocales
  con tilde estándar (á é í ó ú Á É Í Ó Ú). La `ñ` se convierte en `n`. La `ü` en `u`.

- **Números con punto decimal** — `1.0g` → `10g` (el punto se elimina). Verificar que la clave
  del mapa refleja esto.

- **Upload preset** — el preset `centinela_preset` es **unsigned**, lo que permite subir desde
  el cliente sin firma. Desde la API server-side (curl con `API_KEY:API_SECRET`) no es necesario
  el preset, pero incluirlo no causa error.

- **`next.config.ts` ya tiene `res.cloudinary.com` en `remotePatterns`** — no es necesario
  modificarlo al agregar nuevas imágenes.
