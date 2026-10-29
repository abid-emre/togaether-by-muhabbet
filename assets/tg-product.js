/*
  <tg-product>: the product page. Edition chips pick the matching variant and
  update the price, the add-to-cart button, the URL and the photo; thumbnails
  swap the main photo; − and + change the quantity.
*/
if (!customElements.get('tg-product')) {
  customElements.define(
    'tg-product',
    class TgProduct extends HTMLElement {
      connectedCallback() {
        const data = JSON.parse(this.querySelector('[data-variants]')?.textContent || '{}');
        this.variants = data.variants || [];
        this.prices = data.prices || {};
        this.labels = data.labels || {};
        this.idInput = this.querySelector('[data-variant-id]');
        this.price = this.querySelector('[data-price]');
        this.addButton = this.querySelector('[data-add-button]');
        this.mainImage = this.querySelector('.product__main-image');
        this.thumbs = Array.from(this.querySelectorAll('.product__thumb'));

        this.querySelectorAll('.product__option-input').forEach((input) => {
          input.addEventListener('change', () => this.onOptionChange());
        });
        this.thumbs.forEach((thumb) => {
          thumb.addEventListener('click', () => this.showMedia(thumb));
        });
        this.querySelectorAll('[data-quantity]').forEach((button) => {
          button.addEventListener('click', () => this.stepQuantity(parseInt(button.dataset.quantity, 10)));
        });
      }

      selectedOptions() {
        const options = [];
        this.querySelectorAll('.product__option-input:checked').forEach((input) => {
          options[parseInt(input.dataset.optionPosition, 10) - 1] = input.value;
        });
        return options;
      }

      onOptionChange() {
        const options = this.selectedOptions();
        const variant = this.variants.find((v) => v.options.every((value, i) => value === options[i]));
        this.updateButton(variant);
        if (!variant) return;

        this.idInput.value = variant.id;
        this.updatePrice(variant);
        if (variant.featured_media) {
          const thumb = this.thumbs.find((t) => t.dataset.mediaId === String(variant.featured_media.id));
          if (thumb) this.showMedia(thumb);
        }
        const url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        window.history.replaceState({}, '', url);
      }

      updateButton(variant) {
        if (!this.addButton) return;
        const available = Boolean(variant && variant.available);
        this.addButton.disabled = !available;
        this.addButton.textContent = !variant ? this.labels.unavailable : available ? this.labels.add : this.labels.soldOut;
      }

      // Prices come pre-formatted from Liquid so they match the store's currency format.
      updatePrice(variant) {
        const price = this.prices[variant.id];
        if (!this.price || !price) return;
        this.price.textContent = price.price;
        if (price.compare) {
          const was = document.createElement('s');
          was.className = 'text-muted';
          was.textContent = price.compare;
          this.price.append(' ', was);
        }
      }

      showMedia(thumb) {
        if (!this.mainImage) return;
        this.mainImage.src = thumb.dataset.src;
        this.mainImage.srcset = thumb.dataset.srcset;
        this.mainImage.alt = thumb.dataset.alt;
        this.thumbs.forEach((t) => t.setAttribute('aria-current', t === thumb ? 'true' : 'false'));
      }

      stepQuantity(step) {
        const input = this.querySelector('.quantity__input');
        if (!input) return;
        input.value = Math.max(1, (parseInt(input.value, 10) || 1) + step);
      }
    }
  );
}
