# ANACO · Tienda ficticia para el laboratorio de GA4

Sitio **académico de simulación** (Universidad del Tolima). ANACO S.A.S. — "Analítica de Comercio Colombiano". Los servicios, precios y la plataforma son propuestas académicas. No procesa pagos ni guarda datos personales. Solo HTML, CSS y JavaScript puros: sin npm, sin compilación, sin servidor.

## 1. Conectar tu GA4 (único archivo a editar)
1. En GA4: **Administrar > Flujos de datos > tu flujo web** y copia el *ID de medición* (`G-...`).
2. Abre `js/config.js` y reemplaza `G-XXXXXXXXXX` por tu ID.
3. Deja `DEBUG_MODE: true` mientras practicas (los eventos salen en **Administrar > DebugView**). Pon `false` para medición normal.

Con el ID marcador no se carga `gtag.js` y el monitor de la derecha muestra un aviso rojo.

## 2. Estructura
`index.html` (catálogo) · `producto.html?id=ANA-001` · `carrito.html` · `checkout.html` · `gracias.html` · `css/estilos.css` · `js/` (`config`, `productos`, `carrito`, `analytics` y un `.js` por página).

## 3. Eventos medidos (12)
`view_item_list`, `view_promotion`, `select_promotion`, `select_item`, `view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`, `add_shipping_info`, `add_payment_info`, `purchase`. Todos con `currency: "COP"`. Con el cupón **ANUAL8** (8 %) los ítems llevan `price` con descuento, `discount` por unidad y `coupon`.
`purchase` se envía una sola vez por pedido (recargar `gracias.html` no lo repite). Propiedad de usuario: `tipo_cliente` (Nacional / Internacional).

Para analizarla en GA4 registra en **Administrar > Definiciones personalizadas**: `tipo_cliente` como dimensión de **usuario** y de **evento** (en purchase).

## 4. Monitor de eventos
Panel derecho con estado de conexión, origen de la visita (UTM), los últimos 12 eventos y el botón **Simular nuevo visitante** (borra cookies `_ga*`, carrito y sessionStorage). Para probar el origen abre, por ejemplo: `index.html?utm_source=clase&utm_medium=lab&utm_campaign=ga4`.

## 5. Publicar
**GitHub (desde el navegador)**
1. Crea un repositorio nuevo en github.com (botón *New*).
2. Pulsa *uploading an existing file*, descomprime el .zip y arrastra **el contenido** de `anaco-tienda` (que `index.html` quede en la raíz del repositorio, con las carpetas `css` y `js`).
3. Pulsa *Commit changes*.

**Vercel**
1. Entra a vercel.com con tu cuenta de GitHub > *Add New > Project* e importa el repositorio.
2. En **Framework Preset** elige **Other**. Deja vacíos Build Command y Output Directory.
3. Pulsa *Deploy*. Cada cambio que subas a GitHub se vuelve a publicar solo.
