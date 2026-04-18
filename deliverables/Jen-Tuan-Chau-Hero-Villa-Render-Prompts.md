# Jen Tuan Chau · Biệt thự chủ đạo — Gói Prompt Render Ngoại tuyến

Gói năm prompt sản xuất cho các hình render kiến trúc và nội thất siêu thực. Mỗi prompt được tinh chỉnh cho Midjourney v6 / Flux.1 Dev / SDXL-1.0. Sử dụng **gốc phong cách chủ đạo (master style stem)** để bảo đảm tính nhất quán giữa cả năm render; chỉ thay đổi phần nội dung riêng của từng cảnh.

Ý định thiết kế là một công trình thuộc địa nhiệt đới ngang tầm **Capella Sentosa Manors** (phục dựng kiến trúc bởi Foster + Partners, nội thất bởi Matthew Shang Design Office), đặt trên **đảo Tuần Châu, Vịnh Hạ Long**, với mặt bằng cơ sở **Caye Sereno SEA Type 2** được mở rộng để tầng 1 khớp với dấu chân tầng trệt (tổng diện tích sàn ≈ 600 m²).

> **Lưu ý dịch thuật:** các khối prompt bên dưới được giữ nguyên bằng tiếng Anh vì các mô hình tạo ảnh (Midjourney, Flux, SDXL) được huấn luyện trên token tiếng Anh và phản hồi tốt nhất với vốn từ kiến trúc tiếng Anh. Chỉ phần văn bản bao quanh được dịch.

---

## Gốc phong cách chủ đạo (dùng lại ở đầu mỗi prompt)

> colonial-tropical manor villa, Capella Sentosa Singapore design language, architecture by Foster + Partners, interiors by Matthew Shang Design Office, Hạ Long Bay setting on Tuần Châu island, Vietnam, hand-made clay pan tile pitched hipped roof in weathered terracotta, warm ivory lime-wash rendered walls, dark charcoal-stained teak louvered shutters, split-face basalt stone base, wrapping 2.4 m covered verandas on both storeys, copper gutters and ridge with green patina, honest craftsmanship, non-reflective muted UNESCO-buffer-compliant palette, low-rise two-storey silhouette, ridge at 9 m, eave at 6.5 m, FFL at 2.93 m

**Negative prompt (cho SDXL / Flux — với Midjourney hãy thêm tiền tố `--no`):**
> no modern high-rise, no glass curtain wall, no reflective metal cladding, no white plastic, no saturated primary colours, no cartoon, no render-style hard edges, no CGI gloss, no people with visible faces, no text overlays, no watermarks, no logos

**Đuôi kỹ thuật đề xuất:**
- Midjourney v6 · `--ar 16:9 --style raw --stylize 150 --v 6.1 --quality 2 --seed <seed-cố-định-cho-mỗi-series>`
- Flux.1 Dev · `guidance 3.5, steps 40, 1920×1080, sampler: dpm++ 2m karras, schedule: karras`
- SDXL 1.0 · `cfg 6, steps 35, sampler: dpm++ 2m sde karras, size 1536×864, refiner 0.8`

---

## Prompt 01 · Ngoại thất chủ đạo — Góc Tây-Nam, giờ vàng

Dùng làm render bìa cho bộ deck trình bày. Render này phải gánh toàn bộ gói trong một hình.

```
[MASTER STEM]
wide 3/4 exterior hero shot from the south-west corner at golden hour, 20 minutes before sunset, sun just clipping Cat Ba silhouette, villa sits 12 m back from the bay edge, infinity pool in foreground with mirror-calm water reflecting the terracotta roof, 18 × 5 m pool edged in tumbled Indonesian basalt, tropical planting of heliconia and bird-of-paradise at pool margin, three mature frangipani trees dappling shadow on the ivory render walls, wraparound teak veranda with six slender square columns, teak louvered shutters half-closed throwing horizontal striped shadows, warm lamplight glowing from behind the shutters on both ground and first floor, L1 extends the full length of the GF (600 m² total GFA), 25-degree hipped clay-tile roof catching the last direct sun as a band of orange copper, concealed copper gutter line, limestone karst peaks of Hạ Long Bay in the hazy distance, soft sea mist at horizon, water gently lapping pool overflow, distant junk boat sail, composition on a 16:9 frame with the villa occupying the right 2/3 and a pair of palm fronds breaking the upper-left corner

photographer: Iwan Baan, lighting by James Turrell, cinematography by Roger Deakins, Hasselblad H6D 100MP, 35 mm lens, f/8, low ISO, architectural photography, print-magazine quality

--ar 16:9 --style raw --stylize 200
```

**Ghi chú cảnh**
- Biệt thự lùi 12 m tính từ mép nước, bể bơi là bể tràn hướng ra vịnh.
- Cây frangipani (sứ) cần đổ bóng lên tường vữa trát — mỏ neo tương phản.
- Đỉnh mái ở cao độ +9,00 m phải đọc được là *thấp hơn* các đỉnh núi đá vôi ở xa — là cảnh quan, không phải đường chân trời đô thị.

---

## Prompt 02 · Lối vào / mái đón (porte-cochère) — Chạng vạng

```
[MASTER STEM]
night-arrival view from the motor court at blue hour, 8:30 pm, slightly elevated eye-level from the gate approach looking south-east toward the porte-cochère, sawn basalt setts with grass joints underfoot, two mature frangipani trees in raised basalt planters flanking the entry axis, pair of 2.4 m high solid FSC teak doors with recessed teak panelling and aged-brass bull-nose pulls, doors half open revealing a warm glow of aged-brass lantern in the foyer beyond, double-height clerestory lantern above the porte-cochère spilling honey-coloured light onto the ivory render, parking envelope holds a single vintage dark-green Land Rover Defender 110 in the forecourt shadow, housekeeping staff-tier uniform in cream linen standing just inside the threshold, tropical bougainvillea climbing the west wall in magenta, the stone base of the villa reads as massive and grounded while the render wall above floats, pitched terracotta roof reads as a dark silhouette against the blue-violet sky, venus visible in the upper frame

photographer: Fernando Guerra, Scott Frances, Hasselblad X2D, 28 mm, f/4, low ISO for film-grain quality, night architectural

--ar 3:2 --style raw --stylize 175
```

---

## Prompt 03 · Phòng khách trang trọng — hướng vịnh, cửa chớp mở, ánh sáng buổi sáng

```
[MASTER STEM]
interior wide-angle view of the formal living room, 11 m wide by 6 m deep, 3.4 m ceiling, looking south through four pairs of full-height sliding teak-and-glass doors onto the 2.4 m covered veranda and the bay beyond, Hạ Long Bay karst peaks reading softly in morning haze, 9 am sun catching the bay water, raffia-panelled ceiling between exposed reclaimed teak joists, herringbone teak floor 140×700 mm boards in natural oil, two 3.2 m linen sofas in oat facing each other across a reclaimed-teak coffee table piled with art books and fresh frangipani in a hand-thrown ceramic bowl, flanked by a pair of ink-velvet armchairs, vintage Turkish rug in faded rust tones anchoring the centre, honed travertine fireplace wall on the north (non-functional, axial anchor), pair of aged-brass pendant lanterns hanging low, wall-mounted lime-wash rough plaster in warm ivory, a single large framed Vietnamese lacquer panel on the east wall, side tables in teak with aged-brass hardware, filtered sunlight throwing horizontal-striped shadows through the half-closed teak louvered shutters onto the far end of the floor, table lamps off (daylight only), a single white linen scarf draped on the sofa arm for colour accent, no people visible

photographer: Julia Klimi for AD100, Annie Schlechter, Hasselblad H6D, 24 mm TS-E, f/5.6, natural daylight, editorial interior

--ar 16:9 --style raw --stylize 150
```

---

## Prompt 04 · Phòng ngủ chính — giường bốn cột, khung cửa chớp ôm view vịnh, 6 giờ sáng

```
[MASTER STEM]
interior perspective view of the primary suite at dawn, 6 am, 5,500 K cool morning light entering through a pair of pivoting full-height teak shutters framing the bay view, teak four-poster bed centred on the west wall facing south toward the bay, handwoven raffia headboard wall behind the bed in a soft oat warp, white oak brushed floor, crisp white linen bedding with a fringed oat throw folded at the foot, bedside tables in teak with unlacquered aged-brass drawer pulls, pair of brass table lamps unlit, French linen curtains in oat pulled back, exposed tie-beam ceiling in whitewashed teak, honed-travertine stepping from the bedroom into a marble ensuite glimpsed through an open archway, a freestanding aged-brass soaking tub visible in the ensuite under a 1.2×1.2 m pivot window giving a bath-with-bay-view moment, morning fog lifting off the bay, a single white orchid in a ceramic vessel on the bedside table, soft warm lamplight from the ensuite casting a single brass-coloured highlight on the bedroom floor, no people

photographer: Simon Upton for WoI, Stephen Kent Johnson, Hasselblad H6D 100MP, 32 mm, f/4.5, architectural dawn interior, film-grain quality

--ar 4:3 --style raw --stylize 150
```

---

## Prompt 05 · Sân bể bơi & nhà nghỉ mát (sala pavilion) — buổi chiều

```
[MASTER STEM]
wide landscape view of the pool terrace looking east from just off the veranda, 4 pm afternoon sun from the south-west throwing long shadows across the teak pool deck, 18 × 5 m infinity pool with its south edge spilling imperceptibly into the view of Hạ Long Bay, tumbled Indonesian basalt coping in charcoal honed finish, water reads as bay-blue with a very slight green cast, detached sala pavilion on the east lawn: 3.6 × 3.6 m square plan, pitched clay-tile roof matching the main house, four slender teak columns, open on all four sides, a teak day bed inside dressed with oat-linen cushions and one ink-blue bolster, an aged-brass drinks cart on the lawn beside the pavilion with a tray of two empty coupe glasses and a pressed-glass decanter, foreground tropical planting of heliconia and bird-of-paradise, a pair of mature sea-almond and mango trees framing the east boundary and dropping dappled shade onto the lawn, main house on the right showing five bays of teak louvered shutters along the upper veranda, eave line reading horizontal and low against the karst silhouette, a small Vietnamese junk boat passing in the far middle distance, blue sky with high cirrus, a slow crop duster of clouds over the karst peaks, absolutely no people in frame

photographer: Dook, Iwan Baan, Hasselblad H6D, 35 mm, f/9, polarising filter, architectural landscape

--ar 21:9 --style raw --stylize 200
```

---

## Biến thể chuỗi (tùy chọn)

Nếu cần hơn năm prompt lõi, hãy giữ nguyên master stem và chỉ thay phần chỉ định cảnh. Gợi ý mở rộng:

- **Phòng ăn buổi tối** — bàn gỗ teak 10 chỗ thắp nến, vịnh trong ánh hoàng hôn nhìn qua cửa teak-và-kính mở, trần raffia chiếu sáng dịu bởi đèn thả đồng thau.
- **Phòng làm việc / thư viện** — tường teak ốp nửa chiều cao, bàn viết trước một cửa sổ có khung chớp, sách và nghệ thuật, một đèn bàn xanh kiểu banker's lamp.
- **Phòng ngủ khách A (tầng 1)** — giường king hướng vịnh, chớp cửa mở nửa, nắng sáng, sàn teak xương cá, đèn thả raffia.
- **Sảnh khách / hành lang trưng bày (tầng 1)** — view trục qua khoảng thông tầng trên foyer với giếng trời, trần teak ô.
- **Bếp ngoài trời ban đêm** — lò nướng củi dưới pergola gỗ, nồi đồng, ánh đèn sợi đốt ấm.
- **Ảnh drone từ trên xuống** — view mặt bằng nhìn thẳng xuống toàn lô, thấy mái ngói terracotta phủ trên bể bơi, sân dịch vụ phía bắc, đôi frangipani ở sân xe, để minh chứng lô 28 × 30 m với tầng 1 đọc cùng dấu chân với tầng trệt.

---

## Ghi chú sản xuất

1. **Tính nhất quán chuỗi** — khóa một seed duy nhất cho mỗi cảnh qua các lần lặp; sử dụng lại master stem nguyên văn. Tông màu phải nhất quán qua cả năm render (terracotta ấm + ngà + than + xanh vịnh).
2. **Bầu không khí hơn chi tiết** — hình ảnh Capella không bao giờ lạnh lẽo. Hãy đẩy bóng đổ lốm đốm, sương biển dịu, chớp cửa mở nửa, đèn không thắp, gối có dấu vết sử dụng. Không điều gì nên trông như vừa mới mở hộp.
3. **Đọc được vùng đệm UNESCO** — mọi prompt ngoại thất phải có ít nhất một đỉnh karst ở hậu cảnh xa, và đỉnh mái của biệt thự phải nằm *dưới* đường chân trời đó. Đây là quy tắc bố cục không thương lượng.
4. **Nhân vật** — ưu tiên không có khuôn mặt nhìn thấy. Một bóng nhân viên phục vụ mặc linen kem ở hậu cảnh hoặc khăn linen của khách vắt trên tay ghế sofa là đủ để không gian có cảm giác có người ở.
5. **Tính chân thực vật liệu** — hãy chỉ rõ "hand-made clay pan tile" (không phải "concrete tile"), "lime-wash render" (không phải "painted stucco"), "FSC teak" (không phải "stained wood"), "unlacquered aged brass" (không phải "gold metal"). Các mô hình sinh phản hồi tốt với sự chân thực vật liệu.
6. **Tham chiếu so sánh cho style-transfer** — nếu pipeline hỗ trợ ảnh tham chiếu, hãy đưa ảnh công khai của Capella Sentosa Manor, ảnh hành lang Aman Venice, ngoại thất biệt thự Six Senses Côn Đảo, ảnh chạng vạng pavilion bể bơi Amanoi.

---

*Chuẩn bị cùng với DOCX thiết kế concept và gói hình ảnh HTML cho Công ty TNHH Jen Tuan Chau · Tháng 4 năm 2026 · Phát hành để Khách hàng duyệt.*
