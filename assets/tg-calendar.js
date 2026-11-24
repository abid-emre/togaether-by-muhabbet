/*
  <tg-calendar>: filters experience cards by time (all / upcoming / past) and
  by city, without reloading the page.

  It also moves events whose last day (data-ends, YYYY-MM-DD) is before the
  visitor's date from upcoming to past. Shopify caches rendered pages, so the
  Liquid date check alone can be out of date.
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

        this.moveEndedToPast();
        this.update();
      }

      static today() {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
      }

      moveEndedToPast() {
        const today = TgCalendar.today();
        const pastList = this.querySelector('[data-past-list]');
        let moved = false;

        this.querySelectorAll('[data-card][data-status="upcoming"][data-ends]').forEach((card) => {
          if (card.dataset.ends >= today) return;
          const handle = card.dataset.handle;
          const template =
            pastList &&
            [...pastList.querySelectorAll('template[data-past-for]')].find((t) => t.dataset.pastFor === handle);
          if (template) {
            pastList.appendChild(template.content.cloneNode(true));
            template.remove();
            moved = true;
          }
          card.remove();
        });

        if (!moved) return;
        const max = parseInt(pastList.dataset.max, 10) || Infinity;
        const items = [...pastList.querySelectorAll(':scope > [data-card]')];
        items.sort((a, b) => (b.dataset.sort || '').localeCompare(a.dataset.sort || ''));
        items.forEach((item, i) => {
          if (i < max) pastList.appendChild(item);
          else item.remove();
        });
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
