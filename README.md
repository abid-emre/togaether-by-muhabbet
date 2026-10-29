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

## Homepage sections

The homepage (`templates/index.json`) is built from these sections, in order.
Each can be edited, reordered or hidden in the theme editor.

| Section | Anchor | Notes |
| --- | --- | --- |
| Hero (`tg-hero`) | `#hero` | Photo, optional desktop-only video, two-line heading, three buttons |
| Memory room (`tg-memory-room`) | `#memory-room` | Auto-sliding photo carousel with captions, four Instagram tiles |
| Approach (`tg-approach`) | `#approach` | Four steps, four principles, two-column story |
| Stats (`tg-stats`) | `#stats` | Numbers count up on scroll; one can count the city entries |
| Experience calendar (`tg-experience-calendar`) | `#calendar` | Reads experience entries; filters by time and city |
| First time FAQ (`tg-faq`) | `#first-time` | Accordions plus FAQ structured data for search |
| Host (`tg-host`) | `#host` | Portrait and quote, "become a host" pop-up form |
| Testimonials (`tg-testimonials`) | `#voices` | Reads testimonial entries, "share your experience" pop-up form |
| Partner logos (`tg-logo-wall`) | `#partners` | Logo grid, muted until hover |
| Contact (`tg-contact`) | `#contact` | Newsletter signup and corporate enquiry form |

Forms are Shopify contact forms, so host applications, testimonials and
corporate enquiries arrive in the store's email inbox. Newsletter sign-ups join
the customer list tagged `newsletter`, ready for Shopify Email.

### Metaobjects the homepage reads

Create these in **Settings › Custom data › Metaobjects**. Field keys must match.

**Experience** (`experience`): `name`, `status` (upcoming / ongoing / past),
`introduction`, `location`, `city` (reference to City), `start_date` (date),
`dates_text`, `duration`, `event_type`, `language`, `price`, `quota` (integer),
`seats_left` (integer), `host` (reference to Host), `photo` (image),
`instagram_post` (URL), `more_photos` (URL). An upcoming entry whose start date
has passed moves to past on its own. `seats_left` of 0 shows "join the waitlist".

**City** (`city`): `name`, `country`.

**Testimonial** (`testimonial`): `name`, `quote`, `experience` (reference to
Experience), `photo` (image), `consent` (true/false). Turn on the "Publishing"
option so new entries stay as drafts until approved.

**Host** (`host`): `name`, `role`, `one_line`, `portrait` (image).

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
