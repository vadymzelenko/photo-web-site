# Enigma Studio — Photographer Website

Website of a photographer working in Kyiv and Dnipro: portfolio, types of shoots, prices with a calculator, the shooting process, FAQ and contacts. Booking goes through a Telegram bot.

## Features

- Hero styled as a photographer's contact sheet
- Portfolio gallery with a lightbox (keyboard and swipe navigation)
- Shoot types with previews, price menu and calculator (base hours plus extra hours)
- Telegram bot deep links that pass the selected package, for example `?start=lovestory_120m_mua`
- Smooth scrolling (Lenis) and section reveal animations (GSAP, ScrollTrigger, SplitText); content stays visible without JavaScript and motion is reduced when `prefers-reduced-motion` is set

## Getting started

```bash
npm install
npm run dev               # http://localhost:3000
npm run build && npm start
```

## Editing content

All texts, contacts, prices, FAQ and photos live in `lib/site.js`:

- `site.contacts`: phone, email, Instagram, Telegram, bot, address, opening hours
- `photos`: placeholder images; put real photos in `public/photos/` and set `src: "/photos/<name>.jpg"` with the real `w` and `h`, then remove the Unsplash credit from `components/Footer.js`
- `priceGroups`: `base` is the hours included in a package, `perHour` the price of an extra hour

## Structure

| Path | Purpose |
|---|---|
| `components/Motion.js` | Lenis and the reveal system: blocks with `data-section` reveal their `data-reveal` children in order (`lines`, `develop`, `rows`) |
| `components/Overlays.js` | Lightbox and notifications |
| `components/` | Sections: Hero, Intro, Gallery, Services, Pricing, Process, Faq, Contact, Footer |

## Stack

Next.js 15 (App Router, JavaScript), GSAP, Lenis.

A copy of this site is part of the [template store](https://github.com/vadymzelenko/templates_store) (`sites/enigma-photo`).

## License

[MIT](LICENSE) © Vadym Zelenko
