/*
  Togaether theme scripts: sticky-header shadow and the mobile menu drawer.
  Written to survive theme-editor section reloads.
*/
(function () {
  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header || header.dataset.ready) return;
    header.dataset.ready = 'true';

    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initDrawer() {
    var drawer = document.querySelector('[data-drawer]');
    var opener = document.querySelector('[data-drawer-open]');
    if (!drawer || !opener || drawer.dataset.ready) return;
    drawer.dataset.ready = 'true';

    var close = function () {
      drawer.classList.remove('is-open');
      opener.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('has-open-drawer');
      setTimeout(function () {
        if (!drawer.classList.contains('is-open')) drawer.hidden = true;
      }, 300);
      opener.focus();
    };

    var open = function () {
      drawer.hidden = false;
      // Let the browser paint the unhidden drawer before sliding it in.
      requestAnimationFrame(function () {
        drawer.classList.add('is-open');
        var first = drawer.querySelector('[data-drawer-close]:not(.menu-drawer__backdrop)');
        if (first) first.focus();
      });
      opener.setAttribute('aria-expanded', 'true');
      document.body.classList.add('has-open-drawer');
    };

    opener.addEventListener('click', open);
    drawer.querySelectorAll('[data-drawer-close], [data-drawer-link]').forEach(function (el) {
      el.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });
  }

  // Pop-up forms: <button data-dialog-open="id"> opens <dialog id="id">.
  function initDialogs() {
    document.querySelectorAll('[data-dialog-open]:not([data-ready])').forEach(function (button) {
      button.dataset.ready = 'true';
      button.addEventListener('click', function () {
        var dialog = document.getElementById(button.dataset.dialogOpen);
        if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
      });
    });
    document.querySelectorAll('dialog[data-dialog]:not([data-ready])').forEach(function (dialog) {
      dialog.dataset.ready = 'true';
      dialog.querySelectorAll('[data-dialog-close]').forEach(function (el) {
        el.addEventListener('click', function () {
          dialog.close();
        });
      });
      // Close when the backdrop (outside the dialog box) is clicked.
      dialog.addEventListener('click', function (event) {
        if (event.target === dialog) dialog.close();
      });
    });
  }

  // Several contact forms share the homepage, and Shopify marks all of them as
  // posted after any one is sent. The URL hash names the form that was sent,
  // so keep its message, hide the others and reopen its pop-up if it has one.
  function initFormStatus() {
    var statuses = document.querySelectorAll('[data-form-status]');
    if (!statuses.length) return;
    var sentId = window.location.hash.slice(1);
    statuses.forEach(function (status) {
      var form = status.closest('form');
      if (!form) return;
      if (sentId && form.id !== sentId) {
        status.hidden = true;
        return;
      }
      var dialog = form.closest('dialog');
      if (sentId && dialog && typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
    });
  }

  function init() {
    initHeader();
    initDrawer();
    initDialogs();
  }

  document.addEventListener('DOMContentLoaded', initFormStatus);

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('shopify:section:load', init);
})();
