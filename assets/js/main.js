(() => {
  const cfg = window.MIRO_CONFIG || {};
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const note = document.getElementById('form-note');
  const form = document.getElementById('contact-form');
  const submit = document.getElementById('submit-contact');
  const direct = document.getElementById('direct-links');
  const heroWhatsapp = document.getElementById('hero-whatsapp');
  document.getElementById('year').textContent = new Date().getFullYear();

  function closeMenu() {
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Abrir menú');
    nav?.classList.remove('open');
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('open', open);
  });
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfg.contactEmail || '');
  const hasEndpoint = /^https:\/\//i.test(cfg.formEndpoint || '');
  const wa = String(cfg.whatsappNumber || '').replace(/\D/g,'');
  const greeting='Hola, equipo de MIRÓ. Quisiera conocer sus servicios de marketing y publicidad y coordinar una primera conversación.';
  const directWaUrl=wa ? 'https://wa.me/' + wa + '?text=' + encodeURIComponent(greeting) : '';
  if (heroWhatsapp && wa) {
    heroWhatsapp.href=directWaUrl;
    heroWhatsapp.target='_blank';
    heroWhatsapp.rel='noopener noreferrer';
    heroWhatsapp.innerHTML='Conversemos por WhatsApp <span aria-hidden="true">↗</span>';
  }
  if (isEmail || wa || /^https:\/\//i.test(cfg.appointmentUrl || '')) {
    direct.hidden = false;
    if (isEmail) {
      const a = document.createElement('a'); a.href = 'mailto:' + cfg.contactEmail;
      a.textContent = cfg.contactEmail; a.className = 'contact-inline-link'; direct.append(a);
    }
    if (wa) {
      const a = document.createElement('a'); a.href = directWaUrl;
      a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='Escribir por WhatsApp ↗';
      a.className='contact-inline-link'; direct.append(a);
    }
    if (/^https:\/\//i.test(cfg.appointmentUrl || '')) {
      const a = document.createElement('a'); a.href = cfg.appointmentUrl;
      a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='Agendar una reunión ↗';
      a.className='contact-inline-link'; direct.append(a);
    }
  }
  if (hasEndpoint) {
    submit.innerHTML='Enviar consulta <span aria-hidden="true">↗</span>';
    note.textContent='Tu consulta será enviada a MIRÓ mediante el formulario configurado.';
  } else if (wa) {
    submit.innerHTML='Continuar por WhatsApp <span aria-hidden="true">↗</span>';
    note.textContent='Al continuar se abrirá WhatsApp con tu consulta preparada. Revisá y confirmá el envío desde allí.';
  } else if (isEmail) {
    submit.innerHTML='Enviar por correo <span aria-hidden="true">↗</span>';
    note.textContent='Al enviar, se abrirá tu aplicación de correo con el mensaje preparado.';
  } else {
    submit.innerHTML='Copiar consulta <span aria-hidden="true">↗</span>';
  }

  function value(name) { return (new FormData(form).get(name) || '').toString().trim(); }
  function setNote(t, ok=false) { note.textContent=t; note.classList.toggle('note-success',ok); }
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const name=value('nombre'), email=value('correo'), company=value('empresa'), service=value('servicio'), message=value('mensaje');
    const subject='Consulta comercial MIRÓ · '+service;
    const body=`Nombre: ${name}\nEmpresa: ${company || 'No indicada'}\nEmail: ${email}\nServicio: ${service}\n\nMensaje:\n${message}`;
    if (hasEndpoint) {
      submit.disabled=true; setNote('Enviando consulta…');
      try {
        const res=await fetch(cfg.formEndpoint,{method:'POST',body:JSON.stringify({nombre:name,empresa:company,correo:email,servicio:service,mensaje:message}),headers:{'Content-Type':'application/json','Accept':'application/json'}});
        if (!res.ok) throw new Error('El servidor no aceptó la solicitud');
        form.reset(); setNote('Consulta enviada correctamente. Gracias por contactarnos.',true);
      } catch {
        setNote('No se pudo enviar la consulta. Intentá nuevamente o utilizá otro canal de contacto.');
      } finally { submit.disabled=false; }
    } else if (wa) {
      const detail = [
        'Hola, equipo de MIRÓ. Quisiera realizar una consulta comercial:',
        '',
        '*Nombre:* ' + name,
        '*Empresa:* ' + (company || 'No indicada'),
        ...(email ? ['*Correo:* ' + email] : []),
        '*Servicio:* ' + service,
        '*Consulta:* ' + message,
        '',
        'Quedo a la espera de su respuesta. Muchas gracias.'
      ].join('\n');
      // La preparación del mensaje no garantiza su envío desde WhatsApp.
      window.MIRO_TRACK?.('whatsapp_form_handoff', {contact_channel:'whatsapp', form_type:'consulta_comercial'});
      const url='https://wa.me/' + wa + '?text=' + encodeURIComponent(detail);
      // Se abre desde la acción explícita del visitante. Nada se envía sin su confirmación en WhatsApp.
      setNote('Tu mensaje está listo. Confirmá el envío desde WhatsApp; MIRÓ no lo recibe hasta entonces.',true);
      window.location.assign(url);
    } else if (isEmail) {
      window.location.href='mailto:'+cfg.contactEmail+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      setNote('Se abrió tu aplicación de correo. El mensaje todavía debe enviarse desde allí.',true);
    } else {
      const text=subject+'\n\n'+body;
      try { await navigator.clipboard.writeText(text); setNote('Consulta copiada. El envío directo se habilitará cuando se configure el canal oficial de MIRÓ.',true); }
      catch { setNote('Copiá la información del formulario: el envío todavía no está configurado.'); }
    }
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) if(entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    }, {threshold:.08, rootMargin:'0px 0px -30px 0px'});
    document.querySelectorAll('.service-card, .step, .section-heading, .difference-grid, .team-grid').forEach(e => {e.classList.add('reveal'); io.observe(e);});
  }
})();
