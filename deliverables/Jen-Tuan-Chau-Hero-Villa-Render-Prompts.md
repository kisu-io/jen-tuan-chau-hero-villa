# Jen Tuan Chau · Hero Villa — External Render Prompt Pack

Pack of five production prompts for photoreal architectural and interior renders. Each prompt is tuned for Midjourney v6 / Flux.1 Dev / SDXL-1.0. Use the **master style stem** for consistency across all five; swap only the scene-specific content.

The intent is a colonial-tropical peer to **Capella Sentosa Manors** (Foster + Partners restoration + Matthew Shang Design Office interiors), set on **Tuần Châu island, Hạ Long Bay**, with the existing **Caye Sereno SEA Type 2** plan extended so the first floor matches the ground-floor footprint (total GFA ≈ 600 m²).

---

## Master style stem (reuse at the head of every prompt)

> colonial-tropical manor villa, Capella Sentosa Singapore design language, architecture by Foster + Partners, interiors by Matthew Shang Design Office, Hạ Long Bay setting on Tuần Châu island, Vietnam, hand-made clay pan tile pitched hipped roof in weathered terracotta, warm ivory lime-wash rendered walls, dark charcoal-stained teak louvered shutters, split-face basalt stone base, wrapping 2.4 m covered verandas on both storeys, copper gutters and ridge with green patina, honest craftsmanship, non-reflective muted UNESCO-buffer-compliant palette, low-rise two-storey silhouette, ridge at 9 m, eave at 6.5 m, FFL at 2.93 m

**Negative (for SDXL / Flux — prepend `--no` for Midjourney):**
> no modern high-rise, no glass curtain wall, no reflective metal cladding, no white plastic, no saturated primary colours, no cartoon, no render-style hard edges, no CGI gloss, no people with visible faces, no text overlays, no watermarks, no logos

**Recommended technical tail:**
- Midjourney v6 · `--ar 16:9 --style raw --stylize 150 --v 6.1 --quality 2 --seed <fixed-per-series>`
- Flux.1 Dev · `guidance 3.5, steps 40, 1920×1080, sampler: dpm++ 2m karras, schedule: karras`
- SDXL 1.0 · `cfg 6, steps 35, sampler: dpm++ 2m sde karras, size 1536×864, refiner 0.8`

---

## Prompt 01 · Hero Exterior — South-West Corner, Golden Hour

Use this as the cover render for the board deck. It must carry the whole package in one image.

```
[MASTER STEM]
wide 3/4 exterior hero shot from the south-west corner at golden hour, 20 minutes before sunset, sun just clipping Cat Ba silhouette, villa sits 12 m back from the bay edge, infinity pool in foreground with mirror-calm water reflecting the terracotta roof, 18 × 5 m pool edged in tumbled Indonesian basalt, tropical planting of heliconia and bird-of-paradise at pool margin, three mature frangipani trees dappling shadow on the ivory render walls, wraparound teak veranda with six slender square columns, teak louvered shutters half-closed throwing horizontal striped shadows, warm lamplight glowing from behind the shutters on both ground and first floor, L1 extends the full length of the GF (600 m² total GFA), 25-degree hipped clay-tile roof catching the last direct sun as a band of orange copper, concealed copper gutter line, limestone karst peaks of Hạ Long Bay in the hazy distance, soft sea mist at horizon, water gently lapping pool overflow, distant junk boat sail, composition on a 16:9 frame with the villa occupying the right 2/3 and a pair of palm fronds breaking the upper-left corner

photographer: Iwan Baan, lighting by James Turrell, cinematography by Roger Deakins, Hasselblad H6D 100MP, 35 mm lens, f/8, low ISO, architectural photography, print-magazine quality

--ar 16:9 --style raw --stylize 200
```

**Scene notes**
- The villa is set back 12 m from the water, pool is an infinity edge to the bay.
- Frangipani trees should drop shadows on the rendered wall — contrast anchor.
- Ridge at +9.00 m must read as lower than distant karst peaks — landscape, not skyline.

---

## Prompt 02 · Arrival / Porte-Cochère — Dusk

```
[MASTER STEM]
night-arrival view from the motor court at blue hour, 8:30 pm, slightly elevated eye-level from the gate approach looking south-east toward the porte-cochère, sawn basalt setts with grass joints underfoot, two mature frangipani trees in raised basalt planters flanking the entry axis, pair of 2.4 m high solid FSC teak doors with recessed teak panelling and aged-brass bull-nose pulls, doors half open revealing a warm glow of aged-brass lantern in the foyer beyond, double-height clerestory lantern above the porte-cochère spilling honey-coloured light onto the ivory render, parking envelope holds a single vintage dark-green Land Rover Defender 110 in the forecourt shadow, housekeeping staff-tier uniform in cream linen standing just inside the threshold, tropical bougainvillea climbing the west wall in magenta, the stone base of the villa reads as massive and grounded while the render wall above floats, pitched terracotta roof reads as a dark silhouette against the blue-violet sky, venus visible in the upper frame

photographer: Fernando Guerra, Scott Frances, Hasselblad X2D, 28 mm, f/4, low ISO for film-grain quality, night architectural

--ar 3:2 --style raw --stylize 175
```

---

## Prompt 03 · Formal Living — Bay View, Shutters Open, Morning Light

```
[MASTER STEM]
interior wide-angle view of the formal living room, 11 m wide by 6 m deep, 3.4 m ceiling, looking south through four pairs of full-height sliding teak-and-glass doors onto the 2.4 m covered veranda and the bay beyond, Hạ Long Bay karst peaks reading softly in morning haze, 9 am sun catching the bay water, raffia-panelled ceiling between exposed reclaimed teak joists, herringbone teak floor 140×700 mm boards in natural oil, two 3.2 m linen sofas in oat facing each other across a reclaimed-teak coffee table piled with art books and fresh frangipani in a hand-thrown ceramic bowl, flanked by a pair of ink-velvet armchairs, vintage Turkish rug in faded rust tones anchoring the centre, honed travertine fireplace wall on the north (non-functional, axial anchor), pair of aged-brass pendant lanterns hanging low, wall-mounted lime-wash rough plaster in warm ivory, a single large framed Vietnamese lacquer panel on the east wall, side tables in teak with aged-brass hardware, filtered sunlight throwing horizontal-striped shadows through the half-closed teak louvered shutters onto the far end of the floor, table lamps off (daylight only), a single white linen scarf draped on the sofa arm for colour accent, no people visible

photographer: Julia Klimi for AD100, Annie Schlechter, Hasselblad H6D, 24 mm TS-E, f/5.6, natural daylight, editorial interior

--ar 16:9 --style raw --stylize 150
```

---

## Prompt 04 · Primary Suite — Four-Poster, Shutter-Framed Bay View, 6 am

```
[MASTER STEM]
interior perspective view of the primary suite at dawn, 6 am, 5,500 K cool morning light entering through a pair of pivoting full-height teak shutters framing the bay view, teak four-poster bed centred on the west wall facing south toward the bay, handwoven raffia headboard wall behind the bed in a soft oat warp, white oak brushed floor, crisp white linen bedding with a fringed oat throw folded at the foot, bedside tables in teak with unlacquered aged-brass drawer pulls, pair of brass table lamps unlit, French linen curtains in oat pulled back, exposed tie-beam ceiling in whitewashed teak, honed-travertine stepping from the bedroom into a marble ensuite glimpsed through an open archway, a freestanding aged-brass soaking tub visible in the ensuite under a 1.2×1.2 m pivot window giving a bath-with-bay-view moment, morning fog lifting off the bay, a single white orchid in a ceramic vessel on the bedside table, soft warm lamplight from the ensuite casting a single brass-coloured highlight on the bedroom floor, no people

photographer: Simon Upton for WoI, Stephen Kent Johnson, Hasselblad H6D 100MP, 32 mm, f/4.5, architectural dawn interior, film-grain quality

--ar 4:3 --style raw --stylize 150
```

---

## Prompt 05 · Pool Terrace & Sala Pavilion — Afternoon

```
[MASTER STEM]
wide landscape view of the pool terrace looking east from just off the veranda, 4 pm afternoon sun from the south-west throwing long shadows across the teak pool deck, 18 × 5 m infinity pool with its south edge spilling imperceptibly into the view of Hạ Long Bay, tumbled Indonesian basalt coping in charcoal honed finish, water reads as bay-blue with a very slight green cast, detached sala pavilion on the east lawn: 3.6 × 3.6 m square plan, pitched clay-tile roof matching the main house, four slender teak columns, open on all four sides, a teak day bed inside dressed with oat-linen cushions and one ink-blue bolster, an aged-brass drinks cart on the lawn beside the pavilion with a tray of two empty coupe glasses and a pressed-glass decanter, foreground tropical planting of heliconia and bird-of-paradise, a pair of mature sea-almond and mango trees framing the east boundary and dropping dappled shade onto the lawn, main house on the right showing five bays of teak louvered shutters along the upper veranda, eave line reading horizontal and low against the karst silhouette, a small Vietnamese junk boat passing in the far middle distance, blue sky with high cirrus, a slow crop duster of clouds over the karst peaks, absolutely no people in frame

photographer: Dook, Iwan Baan, Hasselblad H6D, 35 mm, f/9, polarising filter, architectural landscape

--ar 21:9 --style raw --stylize 200
```

---

## Series variants (optional)

If you need more than the five core prompts, keep the master stem and swap only the scene directive. Suggested extensions:

- **Dining at night** — 10-seat teak table candlelit, bay in twilight through open teak-and-glass doors, raffia ceiling lit softly by brass pendants.
- **Study / library** — half-panelled teak walls, writing desk in front of a single shutter-framed window, art and books, one green banker's lamp.
- **Guest suite A (L1)** — king bed facing bay, shutter half-open, morning sun, herringbone teak floor, raffia pendant.
- **Guest lounge / gallery (L1)** — axial corridor view through the atrium void over the foyer with the roof lantern above, coffered teak ceiling.
- **Outdoor kitchen at night** — wood-fired grill under a timber pergola, copper pots, warm incandescent.
- **Aerial drone shot** — straight-down plan view of the full plot showing the terracotta roof over the pool, service yard at the north, motor court frangipani pair, to evidence the 28 × 30 m plot with the L1 reading the same outline as the GF.

---

## Production notes

1. **Series consistency** — lock a single seed per scene across iterations; re-use the same master stem verbatim. Colour cast should be consistent across all five renders (warm terracotta + ivory + charcoal + bay-blue).
2. **Atmosphere over detail** — Capella imagery is never clinical. Push for dappled shadow, soft sea haze, half-closed shutters, unlit lamps, lived-in cushions. Nothing should feel freshly unboxed.
3. **UNESCO buffer reading** — every exterior prompt should have at least one distant karst peak in the background, and the ridge of the villa should sit *below* that skyline. This is a non-negotiable composition rule.
4. **People** — prefer no visible faces. A background staff figure in cream linen or a guest's linen scarf draped on a sofa is enough to make the space feel inhabited.
5. **Finish realism** — specify "hand-made clay pan tile" (not "concrete tile"), "lime-wash render" (not "painted stucco"), "FSC teak" (not "stained wood"), "unlacquered aged brass" (not "gold metal"). Generative models react well to material honesty.
6. **Comparable references for style-transfer** — if your pipeline supports reference images, feed Capella Sentosa Manor public photography, Aman Venice corridor shots, Six Senses Con Dao villa exteriors, Amanoi pool-pavilion dusk imagery.

---

*Prepared alongside the concept design DOCX and the HTML visual package for Công ty TNHH Jen Tuan Chau · April 2026 · Issue for Client Review.*
