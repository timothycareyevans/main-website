# main website

Source for [timothycareyevans.com](https://www.timothycareyevans.com) — a static, dependency-free landing page built with plain HTML, CSS, and vanilla JavaScript.

## Overview

The site serves two completely different layouts from a single `index.html`, chosen by viewport width at page load:

| Viewport            | Layout                         | Hero video                       |
| ------------------- | ------------------------------ | -------------------------------- |
| `> 1024px` (desktop) | Modern "KRETI-style" landing page | `error.mp4` in a rounded frame |
| `769–1024px` (tablet) | Legacy fullscreen video + side menu | `error.mp4` fullscreen        |
| `≤ 768px` (mobile)   | Legacy fullscreen video + side menu | `bay_bridge_timelapse.mp4` fullscreen |

A tiny pre-paint script in `<head>` sets `<html data-layout="desktop|legacy">`, and a post-body script then **removes** the layout that isn't active from the DOM so its videos never load. Crossing a breakpoint via window resize triggers a page reload so the correct layout renders.

## Desktop layout (KRETI-style)

A dark, grid-lined landing page broken into five sections:

1. **Top nav** — brand, three nav links ("About me", "Portfolio work", "My services"), green pill CTA.
2. **Hero** — two columns: headline/lede/yellow CTA on the left, looping video on the right inside a rounded black frame.
3. **Featured partners** — horizontal strip of partner/tool names.
4. **Why me** — three cards linking to Cybersecurity, AI, and TIMELEACH subsites.
5. **Footer** — copyright plus Github and LinkedIn links.

Palette: solid black background with a subtle gray grid (vertical + horizontal repeating-linear-gradient lines every 38px), `#e8f23f` yellow accent, `#0e3b2e` dark-green CTA, Fraunces serif for display type, Inter for body.

## Legacy layout (mobile + tablet)

The original design preserved:

- Fullscreen hero video with overlaid "Hack the Planet / San Francisco, CA / Start Your Day" text.
- Absolute-positioned side menu (300px wide) that slides in when the CSS-only animated three-dot → X toggle is clicked.
- Dark background (`#111` showcase, `#1a1a1a` menu).
- Breakpoint-aware video selection handled in JS (tablet plays `error.mp4`, mobile plays `bay_bridge_timelapse.mp4`). Poppins font.

All legacy CSS is scoped under `.legacy-wrap` so it can't leak into the desktop styles.

## File structure

```
main website/
├── index.html      # both layouts + layout-selector JS
├── style.css       # desktop styles first, legacy styles scoped under .legacy-wrap
├── README.md
├── .gitignore
├── error.mp4                          # desktop hero + tablet hero
├── bay_bridge_timelapse.mp4           # mobile hero
├── Planet_2880x1220_HPA.mp4           # unused (previously desktop globe)
├── close.png / menu.png               # unused (CSS toggle replaced PNG icons)
└── timeleach/
    └── video.html                     # TIMELEACH playback page
```

## Video handling

Autoplay on tablets was historically unreliable. The current `playVideo()` helper:

1. Sets `muted = true` and `playsInline = true` as JS properties (required by iPadOS Safari's autoplay gate — the HTML attributes alone aren't always honored).
2. Waits for the `loadeddata` event if the element isn't ready yet.
3. Retries `.play()` once after 300ms if the returned Promise rejects.

## Local development

```bash
npx serve "main website"
```

Any static-file server works. No build step, no dependencies, no framework.

Breakpoints live in two places that must stay in sync:

- The pre-paint script in `<head>` (desktop vs. legacy split at `1024px`).
- The CSS media queries for legacy's tablet vs. mobile split (`769px` / `768px`).

## History

Bug history and design iterations are tracked as GitHub issues — see [closed issues](https://github.com/timothycareyevans/main-website/issues?q=is%3Aissue+is%3Aclosed) for the chronology.
