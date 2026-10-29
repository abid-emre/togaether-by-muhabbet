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
      });
      opener.setAttribute('aria-expanded', 'true');
      document.body.classList.add('has-open-drawer');
      var first = drawer.querySelector('[data-drawer-close]:not(.menu-drawer__backdrop)');
      if (first) first.focus();
    };

    opener.addEventListener('click', open);
    drawer.querySelectorAll('[data-drawer-close], [data-drawer-link]').forEach(function (el) {
      el.addEventListener('click', close);
    });
    drawer.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close();
    });
  }

  function init() {
    initHeader();
    initDrawer();
  }

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('shopify:section:load', init);
})();
