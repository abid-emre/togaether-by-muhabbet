/*
  <tg-calendar>: filters experience cards by time (all / upcoming / past) and
  by city, without reloading the page.
*/
if (!customElements.get('tg-calendar')) {
  customElements.define(
    'tg-calendar',
    class TgCalendar extends HTMLElement {
      connectedCallback() {
        this.tab = this.dataset.defaultTab || 'all';
        this.city = 'all';

        this.querySelectorAll('[data-tab]').forEach((button) => {
          button.addEventListener('click', () => {
            this.tab = button.dataset.tab;
            this.update();
          });
        });
        this.querySelectorAll('[data-city]').forEach((button) => {
          if (button.hasAttribute('data-card')) return;
          button.addEventListener('click', () => {
            this.city = button.dataset.city;
            this.update();
          });
        });

        this.update();
      }

      update() {
        this.querySelectorAll('button[data-tab]').forEach((b) => {
          b.setAttribute('aria-pressed', String(b.dataset.tab === this.tab));
        });
        this.querySelectorAll('button[data-city]').forEach((b) => {
          b.setAttribute('aria-pressed', String(b.dataset.city === this.city));
        });

        this.querySelectorAll('[data-group]').forEach((group) => {
          const cards = group.querySelectorAll('[data-card]');
          const showGroup = cards.length > 0 && (this.tab === 'all' || this.tab === group.dataset.group);
          let visible = 0;
          cards.forEach((card) => {
            const match = this.city === 'all' || card.dataset.city === this.city;
            card.hidden = !match;
            if (match) visible++;
          });
          group.hidden = !showGroup;
          const empty = group.querySelector('[data-empty]');
          if (empty) empty.hidden = visible > 0;
        });
      }
    }
  );
}
