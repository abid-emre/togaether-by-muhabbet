# Togaether by Muhabbet — Shopify theme

A custom Online Store 2.0 theme for Togaether, built from scratch from the
"Togaether Shopify Wireframes" (Claude Design) and the Classical design system.

## Connect to Shopify

1. In the Shopify admin, go to **Online Store › Themes**.
2. Under the theme library, choose **Add theme › Connect from GitHub**.
3. Pick the `abid-emre/togaether-by-muhabbet` repository and the `main` branch.
4. The theme appears unpublished in the library. Use **Customize** to preview it.

Every merge to `main` syncs to that theme automatically. Edits made in the theme
editor are committed back to the branch by Shopify.

## Set up in the admin

- **Navigation:** create a `main-menu` and a `footer` menu. Use anchor links
  such as `/#approach`, `/#calendar`, `/#memory-room`, `/#faq`, `/#contact`.
- **Theme settings › Social media:** Instagram, WhatsApp community invite link,
  LinkedIn and contact email. Empty links are hidden.
- **Languages:** add Turkish and Spanish in Settings › Languages and translate
  content with the free Translate & Adapt app. The header switcher appears once
  more than one language is published.

## Structure

| Folder | What's in it |
| --- | --- |
| `layout/` | `theme.liquid` (site shell) and `password.liquid` (opening-soon page) |
| `sections/` | Header and footer (in section groups), page templates, `tg-*` custom sections |
| `snippets/` | Design tokens (`tg-css-variables`), icons, language switcher, meta tags |
| `assets/` | `tg-theme.css`, `tg-theme.js`, self-hosted Cormorant Garamond and Lora |
| `config/` | Theme settings (colours, type scale, page width, social links) |
| `locales/` | Storefront text in English, Turkish and Spanish |

Custom sections and assets use the `tg-` prefix so they're easy to spot.

## Checks

Run [Theme Check](https://shopify.dev/docs/storefronts/themes/tools/theme-check)
before opening a pull request:

```sh
shopify theme check
```

## Fonts

Cormorant Garamond and Lora are licensed under the SIL Open Font License 1.1.
