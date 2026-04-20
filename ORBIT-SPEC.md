# Three.js Client Orbit — Complete Specification

Documented 2026-04-04 so we can replicate or revert at any time.

---

## Layout & Container

- **Section:** `#clients` — full-width, `border-t border-white/10 bg-neutral-950 overflow-hidden`
- **Inner grid:** `grid-cols-1 lg:grid-cols-4 lg:divide-x divide-white/10`
  - **Col 1 (lg:col-span-1):** "Our Clients" heading + "Happy former and current partners." subtext
  - **Col 2 (lg:col-span-3):** `#orbit-wrapper` — the canvas container
- **orbit-wrapper:** `relative flex items-center justify-center overflow-visible`, inline `height:600px; padding:35px 0;`
  - Responsive: 500px height at ≤768px, 420px at ≤390px, margin-top: -1rem at ≤768px
- **Canvas:** `#orbit-3d`, absolutely positioned `top:0 left:0 width:100% height:100%`, z-index:0
- **Canvas bleeds right:** JS resize function extends canvas width to viewport right edge (`window.innerWidth - rect.left`), then uses `camera.setViewOffset()` to keep the orbit centered on the container while particles bleed into the right margin

## 3D Scene Setup

- **Renderer:** `WebGLRenderer` with `antialias: true, alpha: true` (transparent background)
- **Pixel ratio:** `1` on mobile (<768px), `min(devicePixelRatio, 2)` on desktop
- **Camera:** `PerspectiveCamera(40, aspect, 0.1, 1000)` — positioned at `(0, 10, 0.01)` looking at origin (top-down view)
- **Lighting:**
  - `AmbientLight(0xffffff, 0.5)`
  - `PointLight(0xef4444, 1, 15)` at `(0, 1.5, 0)` — red glow from center

## Rings (3 concentric)

| Ring | Index | Radius | Speed | Direction | Phase Offset | Line Opacity |
|------|-------|--------|-------|-----------|-------------|-------------|
| Inner | 0 | 1.1 | 0.45 | CW (+1) | 0.7 | 0.15 |
| Middle | 1 | 1.8 | 0.18 | CCW (-1) | 2.1 | 0.12 |
| Outer | 2 | 2.5 | 0.25 | CW (+1) | 4.3 | 0.10 |

- Rings drawn as `THREE.Line` with 128 segments, white, transparent
- Different speeds + directions create visual depth (inner fast CW, middle slow CCW, outer medium CW)

## Client Distribution

- **Total clients:** 21 (shuffled randomly on every page load)
- **Ring assignment:** First 3 → inner (ring 0), next 7 → middle (ring 1), last 11 → outer (ring 2)
- Clients are evenly distributed around their ring: `angleOffset = (index / ringCount) * 2π`

## Client Logos (Sprites)

- **Rendering:** `THREE.Sprite` with `THREE.CanvasTexture` (192×192 canvas)
- **Uniform size:** `scale.set(0.44, 0.44, 1)` (0.22 × 2)
- **Clipping:** Circular — `arc(96, 96, 92, 0, 2π)` clip path on the canvas
- **Image draw:** `drawImage(img, 4, 4, 184, 184)` — 4px inset from canvas edge
- **Border:** `rgba(239, 68, 68, 0.3)` (red/orange, 30% opacity), 2px lineWidth, `arc(96, 96, 90, 0, 2π)`
- **Color space:** `THREE.SRGBColorSpace`, `premultiplyAlpha: false`
- **Y position:** `0.2 + sin(t * 0.4 + angleOffset) * 0.05` — gentle bobbing
- **Depth sorting:** `renderOrder = round(z * 10) + 50` — logos behind center render first

## Center: Solana Logo

- **Asset:** `assets/logos/solana.png` (123KB, transparent PNG)
- **Type:** `THREE.Sprite` with `THREE.SpriteMaterial`
- **Scale:** `0.7 × 0.7`
- **Position:** `y = 0.2` (same plane as client logos)
- **Render order:** 100 (always on top of nearby logos)

## Particle Field

- **Count:** 300 particles
- **Geometry:** `THREE.Points` with `BufferGeometry`
- **Spread:** Disc shape — X: ±10, Y: ±0.4, Z: ±7
- **Size:** 0.045, with `sizeAttenuation: true`
- **Color:** `0xef4444` (red), opacity 0.42
- **Blending:** `THREE.AdditiveBlending`, `depthWrite: false`
- **Movement:** Each particle has random velocity (±0.002 X/Z, ±0.001 Y)
- **Wrapping:** Bounce back at |X|>10 or |Z|>7 (multiply by -0.9)
- **Global rotation:** `particles.rotation.y = t * 0.02`

## Interaction — Desktop

- **Hover detection:** `THREE.Raycaster` on mousemove over canvas
- **When hovering a logo:**
  - `orbitPaused = true` (orbit stops rotating, clock still ticks to not lose delta)
  - Tooltip appears above the logo (screen-space projection)
  - `cursor: pointer`
- **When not hovering:** tooltip hidden, `cursor: default`
- **Click:** Opens `client.url` in new tab (`window.open(url, '_blank')`)

## Interaction — Mobile (Touch)

- **Detection:** `'ontouchstart' in window`
- **First tap on logo:**
  - Shows tooltip with client name
  - Pauses orbit rotation (`orbitPaused = true`)
  - Stores `activeSprite` reference
- **Second tap on same logo:** Opens URL in new tab
- **Tap on empty space:** Clears selection, hides tooltip

## Tooltip Styling

```css
background: rgba(15, 15, 17, 0.92);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(239, 68, 68, 0.15);
border-radius: 8px;
padding: 8px 16px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
white-space: nowrap;
```

Text: white, Inter/sans-serif, 13px, font-weight 500, letter-spacing 0.02em

## Animation Loop

- Uses `THREE.Clock` for delta time
- `lastTime` accumulates only when `!orbitPaused`
- Each sprite position: `x = cos(angle) * radius`, `z = sin(angle) * radius`
  - `angle = angleOffset + ringPhaseOffset + t * speed * direction`
- **Performance optimizations (added 2026-04-04):**
  - IntersectionObserver pauses entire rAF when orbit off-screen
  - 30fps throttle on mobile (frameBudget 33.3ms)
  - Pixel ratio capped to 1 on mobile

## Lazy Loading

- Three.js (~600KB) loaded from CDN: `https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js`
- Orbit code stored in `<script type="text/orbit-template" id="orbit-code">`
- IntersectionObserver with `rootMargin: 200px` triggers injection when wrapper approaches viewport
- Script injected as `type="module"` into `document.body`

## All 21 Clients (with assets and URLs)

| # | Name | Logo Path | URL |
|---|------|-----------|-----|
| 1 | Chomp | assets/logos/chomp.png | https://x.com/chompdotfyi |
| 2 | Saturn BTC | assets/logos/saturn.png | https://www.saturnbtc.io/ |
| 3 | Avicenne Studio | assets/logos/avicenne.png | https://www.avicenne.studio/ |
| 4 | Polify | assets/logos/polify.jpg | https://polify.xyz/ |
| 5 | BonkZ | assets/logos/bonkz.png | https://bonkz.io/ |
| 6 | The Fracture | assets/logos/fracture.jpg | https://thefracture.io/ |
| 7 | Motion Corporation | assets/logos/motion-corporation.jpg | https://www.digitalmotioncorp.com/ |
| 8 | RevTec | assets/logos/revtec.jpg | https://www.revtec.fi/ |
| 9 | DiversiFi | assets/logos/diversifi.jpg | https://diversifi.trade/ |
| 10 | dOrg | assets/logos/dorg.jpg | https://www.dorg.tech/ |
| 11 | Superteam Balkan | assets/logos/superteam-balkan.jpg | https://x.com/SuperteamBLKN/ |
| 12 | OMNI Studio | assets/logos/omni-studio.jpg | https://www.omnicreative.studio/ |
| 13 | Lingo | assets/logos/lingo.jpg | https://mylingo.io/ |
| 14 | Solana ID | assets/logos/solanaid.png | https://www.solana.id/ |
| 15 | BOOGLE | assets/logos/boogle.jpg | https://x.com/solBOOGLE |
| 16 | Seedplex | assets/logos/seedplex.png | https://seedplex.io/ |
| 17 | Fundl | assets/logos/fundl.jpg | https://www.fundl.fun/ |
| 18 | GREED Academy | assets/logos/greed.png | https://greed.academy/ |
| 19 | ZERG | assets/logos/zerg.jpg | https://welcome.zerg.app/ |
| 20 | Longwood Labs | assets/logos/longwood-labs.png | https://x.com/longwoodlabs |
| 21 | BlastCtrl | assets/logos/blastctrl.png | https://tools.blastctrl.com/ |

## Files Involved

- `index.html` — lines ~1317-1710 (section + all JS)
- `assets/logos/solana.png` — center logo (123KB)
- `assets/logos/*.{png,jpg}` — 21 client logos (2.5KB–43KB each)
- Three.js CDN: `three@0.162.0/build/three.module.js`
