# Analytics event dictionary

The site ships a **provider-neutral abstraction** (`src/scripts/main.ts`): every event is pushed to
`window.dataLayer` as `{ event, lang, route, ts, ...params }`. **No analytics provider is loaded**, so no
cookies are set, nothing leaves the browser, and no consent banner is required. To activate a provider
(e.g. GA4 via Google Tag Manager, Plausible, Umami) add its script tag in `src/layouts/Base.astro`, extend
the Content-Security-Policy (`script-src`/`connect-src`) accordingly, and — if the provider sets cookies —
add a consent step first and update `/privacy/`.

No parameter ever contains a name, phone number, message text or other personal data.

| Event | When | Parameters |
| --- | --- | --- |
| `page_view` | every page load | `locality` (only on the locality page), `referrer` (hostname only), `utm_source`, `utm_medium`, `utm_campaign` |
| `whatsapp_click` | any WhatsApp CTA | `placement`: `header`, `hero`, `mid_page`, `contact_card`, `clinical_studies`, `locality_page`, `sticky_mobile`, `floating` |
| `phone_click` | tel: links | `placement`: `contact_card`, `sticky_mobile` |
| `nav_cta` | primary navigation / mobile menu link | `target`: `#tech`, `#clinic`, `studies`, `#faq`, `#contact` |
| `language_change` | language switcher link | `from`, `to` |
| `form_submit` | lead form | `status`: `validation_error` or `opened_whatsapp` |
| `locality_cta` | *(reserved — the locality CTA currently reports as `whatsapp_click` with `placement=locality_page` and `locality_slug`)* | `locality_slug` |

Search performance (queries, impressions, clicks per page and language) comes from Google Search Console
once the domain is verified — nothing on the site is needed for that.
