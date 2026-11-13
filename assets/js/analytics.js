/**
 * MIRÓ · Google Analytics 4
 * Medición opt-in: sin carga de etiqueta antes del consentimiento.
 * NO enviar nombres, email, teléfonos ni contenido del formulario a GA4.
 */
(() => {
  'use strict';
  const MEASUREMENT_ID = 'G-R23LREB241';
  const CONSENT_KEY = 'miro_analytics_consent_v1';
  const banner = document.getElementById('cookie-consent');
  const accept = document.getElementById('cookie-accept');
  const reject = document.getElementById('cookie-reject');
  const settings = document.getElementById('privacy-settings');
  let accepted = false;
  let loaded = false;

  function getStoredChoice() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (_) { return null; }
  }
  function storeChoice(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (_) { /* no persistent storage */ }
  }
  function setBannerVisible(visible) { if (banner) banner.hidden = !visible; }

  function startGoogleAnalytics() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID);
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    document.head.appendChild(script);
  }

  function selectChoice(value) {
    storeChoice(value);
    setBannerVisible(false);
    accepted = value === 'yes';
    if (accepted) {
      startGoogleAnalytics();
    } else if (loaded) {
      // Si cambia la preferencia durante la sesión, impedir nuevas mediciones.
      window['ga-disable-' + MEASUREMENT_ID] = true;
      // No eliminar aquí cookies de otros servicios. Informar que para limpiar
      // cookies históricas debe usarse la configuración del navegador.
    }
    if (accepted) window['ga-disable-' + MEASUREMENT_ID] = false;
  }

  accept?.addEventListener('click', () => selectChoice('yes'));
  reject?.addEventListener('click', () => selectChoice('no'));
  settings?.addEventListener('click', () => { setBannerVisible(true); banner?.querySelector('button')?.focus(); });

  const choice = getStoredChoice();
  if (choice === 'yes') selectChoice('yes');
  else if (choice === 'no') selectChoice('no');
  else setBannerVisible(true);

  function track(eventName, params={}) {
    if (!accepted || !loaded || typeof window.gtag !== 'function') return;
    // Sólo valores no identificatorios. Nunca agregar datos del formulario.
    window.gtag('event', eventName, params);
  }
  window.MIRO_TRACK = track;

  document.addEventListener('click', (event) => {
    const a = event.target.closest?.('a[href]');
    if (!a) return;
    let u;
    try { u = new URL(a.href, window.location.href); } catch (_) { return; }
    if (!['wa.me', 'api.whatsapp.com'].includes(u.hostname)) return;
    track('contact_whatsapp_click', {contact_channel:'whatsapp', element_id: a.id || 'enlace_contacto'});
  });
})();
