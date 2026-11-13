# MIRÓ · Landing comercial V1

Sitio estático, responsive y sin dependencias de build. Identidad **Premium + Tecnológica**, con paleta corporativa y llamadas a la acción orientadas a generar consultas B2B.

## Ver localmente

Abrí `index.html` en un navegador. Para simular condiciones de producción y probar el formulario, desde esta carpeta ejecutá:

```bash
python -m http.server 8080
```

Visitá `http://localhost:8080`.

## Antes de publicar (OBLIGATORIO)

1. Editar `assets/js/config.js` con un correo oficial real y/o endpoint de formulario HTTPS. **Sin esos datos, el formulario solamente copia la consulta, no la envía.** También podés agregar WhatsApp y una URL de agenda.
2. Verificar la disponibilidad legal de la marca MIRÓ, su dominio y sus nombres sociales; no se verificaron en este entregable.
3. Configurar el dominio y ajustar `og:image` a una URL absoluta de ese dominio, para compatibilidad con vistas previas en redes sociales.
4. Cambiar la etiqueta `<meta name="robots" content="noindex, nofollow" />` por `index, follow` cuando el sitio y sus canales estén listos.
5. Agregar una política de privacidad propia si se habilita tratamiento de datos; identificar responsable y proveedores del formulario conforme a la normativa aplicable.
6. Revisar consentimiento, tratamiento de datos y cookies antes de agregar píxeles publicitarios, analítica, CRM o captación de leads automatizada.
7. Asegurar que estén realmente disponibles los servicios especializados que se ofrecen antes del lanzamiento.

## Formulario

- `formEndpoint`: si se completa, envía por `fetch` un JSON a una URL HTTPS (el proveedor debe aceptar JSON y solicitudes CORS).
- `contactEmail`: si se completa y no hay endpoint, abre el correo local con mensaje prearmado; **no garantiza el envío**.
- Sin ambos campos, el botón copia la consulta y muestra una advertencia transparente.
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
