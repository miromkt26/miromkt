# MIRÓ · Landing V3 (Google Analytics + WhatsApp + SEO)

## Contenido
- Landing responsive, identidad Premium + Tecnológica.
- WhatsApp corporativo configurado: +54 9 362 418-7073.
- Google Analytics 4: ID G-R23LREB241.
- La etiqueta de analítica se carga solo tras aceptar desde el aviso.
- Eventos personalizados: `contact_whatsapp_click` (clic en enlace) y `whatsapp_form_handoff` (apertura de WhatsApp desde formulario). NO equivalen a un mensaje enviado.
- `robots.txt`, `sitemap.xml`, meta `index, follow` y URL canónica.
- Nota de privacidad preliminar: requiere revisión de contenido legal antes del lanzamiento.

## Instalación
1. Copiá el contenido de este ZIP a la carpeta local del repositorio GitHub `miromkt`. Si hiciste modificaciones después de la versión V2, revisá diferencias antes de sobrescribir.
2. Ejecutá: `git status`, `git add .`, `git commit -m "Instalar GA4 con consentimiento y seguimiento de WhatsApp"`, `git push origin main`.
3. Tras desplegar Vercel, abrí el sitio en una ventana privada y aceptá la analítica. Si rechazás, no se debe cargar Google Analytics.
4. En Analytics → Informes → Tiempo real, confirmá `page_view` luego de aceptar. Para nuevas pruebas, cambiá la preferencia desde el pie del sitio.
5. Para verificar eventos, hacé clic en el enlace de WhatsApp y probá el formulario. No ingreses datos reales de otras personas durante la prueba.
6. Si la propiedad tiene dos etiquetas implementadas desde otro sistema (Google Tag Manager, Vercel Analytics etc.), revisá duplicados antes de publicar.

## Privacidad
- El visitante puede rechazar GA4 y navegar igual.
- Nunca enviar nombres, correos, teléfonos ni textos del formulario a GA4.
- Revisá política de privacidad definitiva, marco legal aplicable y posibilidad de retirar consentimiento/cookies antes del lanzamiento abierto.
- No utiliza una base de datos propia. El envío a WhatsApp requiere confirmación en WhatsApp.
