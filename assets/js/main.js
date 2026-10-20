/* TWINSDESIGN : interactions du site (aucune donnée envoyée à un serveur) */
(function () {
  'use strict';

  var WHATSAPP = '22373470813';

  // Protection contre l'intégration du site dans une page tierce (sur le domaine officiel uniquement)
  if (window.top !== window.self && /(^|\.)twinsdesign\.org$/.test(location.hostname)) {
    try { window.top.location.replace(window.location.href); } catch (e) { document.documentElement.hidden = true; }
  }

  // Menu mobile
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Fermer' : 'Menu';
    });
  }

  // Année du pied de page
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Formulaire de devis : présélection de la prestation, puis message WhatsApp prérempli
  var form = document.getElementById('quote-form');
  if (form) {
    var wanted = new URLSearchParams(location.search).get('prestation');
    if (wanted && /^[a-z-]{1,30}$/.test(wanted)) {
      var options = form.querySelectorAll('#prestation option');
      for (var i = 0; i < options.length; i++) {
        if (options[i].getAttribute('data-id') === wanted) { options[i].selected = true; }
      }
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var clean = function (value, max) { return String(value || '').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').trim().slice(0, max); };
      var name = clean(form.elements.nom.value, 80);
      var company = clean(form.elements.structure.value, 80);
      var service = clean(form.elements.prestation.value, 120);
      var message = clean(form.elements.message.value, 1500);
      var status = document.getElementById('form-status');

      if (!name || !message) {
        status.textContent = 'Indiquez votre nom et décrivez votre besoin pour envoyer la demande.';
        return;
      }

      var lines = [
        'Bonjour TWINSDESIGN,',
        '',
        'Nom : ' + name + (company ? ' (' + company + ')' : ''),
        'Prestation : ' + service,
        '',
        message
      ];
      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
      status.textContent = 'WhatsApp s’ouvre avec votre message prêt à envoyer.';
      var win = window.open(url, '_blank', 'noopener,noreferrer');
      if (win) { win.opener = null; }
    });
  }
})();
