# MIRÓ · Landing comercial V2 · WhatsApp corporativo

Sitio estático, responsive y sin dependencias de build. Identidad **Premium + Tecnológica**, con paleta corporativa y llamadas a la acción orientadas a generar consultas B2B.

## Ver localmente

Abrí `index.html` en un navegador. Para simular condiciones de producción y probar el formulario, desde esta carpeta ejecutá:

```bash
python -m http.server 8080
```

Visitá `http://localhost:8080`.

## Antes de publicar (OBLIGATORIO)

1. WhatsApp ya configurado en `assets/js/config.js` (`5493624187073`). Al completar el formulario se abre WhatsApp con un mensaje listo para que la persona confirme el envío. **No hay envío automático ni registro de contactos en la web.** Para recepción por correo o CRM será necesario configurar un canal adicional.
2. Verificar la disponibilidad legal de la marca MIRÓ, su dominio y sus nombres sociales; no se verificaron en este entregable.
3. Configurar el dominio y ajustar `og:image` a una URL absoluta de ese dominio, para compatibilidad con vistas previas en redes sociales.
4. Cambiar la etiqueta `<meta name="robots" content="noindex, nofollow" />` por `index, follow` cuando el sitio y sus canales estén listos.
5. Agregar una política de privacidad propia si se habilita tratamiento de datos; identificar responsable y proveedores del formulario conforme a la normativa aplicable.
6. Revisar consentimiento, tratamiento de datos y cookies antes de agregar píxeles publicitarios, analítica, CRM o captación de leads automatizada.
7. Asegurar que estén realmente disponibles los servicios especializados que se ofrecen antes del lanzamiento.

## Formulario

- `formEndpoint`: si se completa, envía por `fetch` un JSON a una URL HTTPS (el proveedor debe aceptar JSON y solicitudes CORS).
- `contactEmail`: si se completa y no hay endpoint ni WhatsApp, abre el correo local con mensaje prearmado; **no garantiza el envío**.
- `whatsappNumber`: si está configurado y no hay `formEndpoint`, el formulario prepara un mensaje en WhatsApp con nombre, empresa, correo opcional, servicio y consulta. La persona debe presionar Enviar dentro de WhatsApp.
- Sin endpoint, WhatsApp ni correo, el botón copia la consulta y muestra una advertencia transparente.
- Nunca poner secretos API en un archivo JavaScript público.

## Publicar en Vercel

1. Crear un proyecto nuevo.
2. Importar este directorio en un repositorio Git o subirlo mediante el flujo permitido por la plataforma.
3. Framework preset: `Other`. Build command: vacío. Output: raíz del proyecto (`.`).
4. Revisar `README`, `index.html` y `assets/js/config.js` antes de hacer el sitio público.

También puede alojarse en Netlify, GitHub Pages o cualquier hosting estático.

## Arquitectura

`index.html` (contenido y SEO), `assets/css/styles.css` (estilo responsive), `assets/js/main.js` (navegación y formulario), `assets/js/config.js` (contacto), `assets/img/favicon.svg`, `assets/img/og-miro.png`.

### Alcance

Esta es una versión funcional de presentación y captación. No incluye hosting, dominio, backend, formularios conectados, analítica ni casos de éxito inventados. Estos elementos requieren datos y decisiones reales de MIRÓ.

## Publicar esta versión desde Git Bash

Copiar estos archivos dentro de la carpeta local del repositorio `miromkt` (reemplazando los existentes), y ejecutar:

```bash
git add .
git commit -m "Activar contacto por WhatsApp MIRÓ"
git push origin main
```

Si el repositorio está conectado a Vercel, el despliegue se actualizará después del push.

WhatsApp directo: https://wa.me/5493624187073
