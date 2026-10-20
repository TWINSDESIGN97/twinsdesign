/* TWINSDESIGN : interactions du site */
(function () {
  'use strict';

  var WHATSAPP = '22373470813';

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

  // Formulaire de demande de devis : compose un message WhatsApp prérempli
  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = form.elements.nom.value.trim();
      var company = form.elements.structure.value.trim();
      var service = form.elements.prestation.value;
      var message = form.elements.message.value.trim();
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
      window.open(url, '_blank', 'noopener');
    });
  }

  // Carte de visite : partage natif ou copie du lien
  var share = document.getElementById('share-card');
  if (share) {
    share.addEventListener('click', function () {
      var data = { title: 'Youba Sokona | TWINSDESIGN', text: 'Carte de visite de Youba Sokona, Data Scientist', url: 'https://twinsdesign.org/carte.html' };
      var note = document.getElementById('share-note');
      if (navigator.share) {
        navigator.share(data).catch(function () {});
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(data.url).then(function () {
          if (note) note.textContent = 'Lien copié : ' + data.url;
        }, function () {
          if (note) note.textContent = data.url;
        });
      } else if (note) {
        note.textContent = data.url;
      }
    });
  }
})();
