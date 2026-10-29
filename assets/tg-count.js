/*
  Counts numbers up from zero when they scroll into view.
  Leaves the typed number alone for reduced motion or non-numeric values.
*/
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function animate(el) {
    var target = parseFloat(String(el.dataset.countTo).replace(/[^\d.]/g, ''));
    if (!isFinite(target) || target <= 0) return;
    var duration = 1400;
    var start = null;
    var step = function (now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function init() {
    var items = document.querySelectorAll('[data-count-to]:not([data-counted])');
    if (!items.length || !('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          animate(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    items.forEach(function (el) {
      el.dataset.counted = 'true';
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('shopify:section:load', init);
})();
