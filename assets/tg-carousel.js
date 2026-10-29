/*
  <tg-carousel>: a scroll-snap carousel that slides by itself.
  Pauses on hover, on focus and while the tab is hidden; never autoplays for
  visitors who prefer reduced motion. Swipe and keyboard work natively.
*/
if (!customElements.get('tg-carousel')) {
  customElements.define(
    'tg-carousel',
    class TgCarousel extends HTMLElement {
      connectedCallback() {
        this.track = this.querySelector('[data-track]');
        this.slides = Array.from(this.querySelectorAll('[data-slide]'));
        this.dots = this.querySelector('[data-dots]');
        if (!this.track || this.slides.length === 0) return;

        this.delay = parseFloat(this.dataset.autoplay) || 0;
        this.paused = false;
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.buildDots();
        this.querySelector('[data-prev]')?.addEventListener('click', () => this.go(this.index() - 1, true));
        this.querySelector('[data-next]')?.addEventListener('click', () => this.go(this.index() + 1, true));
        this.track.addEventListener('scroll', () => this.updateDots(), { passive: true });

        const pause = () => (this.paused = true);
        const resume = () => (this.paused = false);
        this.addEventListener('mouseenter', pause);
        this.addEventListener('mouseleave', resume);
        this.addEventListener('focusin', pause);
        this.addEventListener('focusout', resume);
        this.track.addEventListener('pointerdown', pause);

        this.start();
      }

      disconnectedCallback() {
        clearInterval(this.timer);
      }

      perView() {
        const slideWidth = this.slides[0].getBoundingClientRect().width || 1;
        return Math.max(1, Math.round(this.track.clientWidth / slideWidth));
      }

      pageCount() {
        return Math.max(1, this.slides.length - this.perView() + 1);
      }

      index() {
        const slideWidth = this.slides[0].getBoundingClientRect().width || 1;
        return Math.round(this.track.scrollLeft / slideWidth);
      }

      go(index, fromUser) {
        const count = this.pageCount();
        const target = ((index % count) + count) % count;
        this.track.scrollTo({
          left: this.slides[target].offsetLeft - this.track.offsetLeft,
          behavior: this.reducedMotion ? 'auto' : 'smooth',
        });
        if (fromUser) this.restart();
      }

      buildDots() {
        if (!this.dots) return;
        this.dots.innerHTML = '';
        const count = this.pageCount();
        if (count < 2) return;
        for (let i = 0; i < count; i++) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'carousel__dot';
          dot.setAttribute('aria-label', `${i + 1} / ${count}`);
          dot.addEventListener('click', () => this.go(i, true));
          this.dots.appendChild(dot);
        }
        this.updateDots();
      }

      updateDots() {
        if (!this.dots) return;
        const current = Math.min(this.index(), this.pageCount() - 1);
        this.dots.querySelectorAll('.carousel__dot').forEach((dot, i) => {
          dot.setAttribute('aria-current', i === current ? 'true' : 'false');
        });
      }

      start() {
        if (!this.delay || this.reducedMotion || this.pageCount() < 2) return;
        this.timer = setInterval(() => {
          if (this.paused || document.hidden) return;
          this.go(this.index() + 1, false);
        }, this.delay);
      }

      restart() {
        clearInterval(this.timer);
        this.start();
      }
    }
  );
}
