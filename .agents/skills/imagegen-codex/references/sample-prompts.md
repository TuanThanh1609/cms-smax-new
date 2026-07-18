# Thư viện Prompt Mẫu (Sample Prompts)

Dưới đây là các công thức (recipes) viết prompt mẫu cho các mục đích sử dụng khác nhau. Hãy dùng các mẫu này làm điểm xuất phát và điều chỉnh cho phù hợp với yêu cầu thực tế của dự án.

Khi chuyển đổi yêu cầu của người dùng thành prompt:
- Giữ nguyên các yêu cầu cốt lõi của người dùng.
- Chỉ thêm chi tiết dựa trên nguyên tắc viết prompt trong `prompting.md`.
- Tránh tự ý bịa thêm các chi tiết cốt truyện hoặc chi tiết không liên quan nếu người dùng không yêu cầu.

---

## 1. Dành cho Tạo ảnh mới (Generate)

### Tạo ảnh chân thực tự nhiên (photorealistic-natural)
```text
Use case: photorealistic-natural
Primary request: candid photo of an elderly sailor on a small fishing boat adjusting a net
Scene/backdrop: coastal water with soft haze
Subject: weathered skin with wrinkles and sun texture
Style/medium: photorealistic candid photo
Composition/framing: medium close-up, eye-level
Lighting/mood: soft coastal daylight, shallow depth of field, subtle film grain
Materials/textures: real skin texture, worn fabric, salt-worn wood
Constraints: natural color balance; no heavy retouching; no glamorization; no watermark
Avoid: studio polish; staged look
```

### Mockup sản phẩm (product-mockup)
```text
Use case: product-mockup
Primary request: premium product photo of a matte black shampoo bottle with a minimal label
Scene/backdrop: clean studio gradient from light gray to white
Subject: single bottle centered with subtle reflection
Style/medium: premium product photography
Composition/framing: centered, slight three-quarter angle, generous padding
Lighting/mood: softbox lighting, clean highlights, controlled shadows
Materials/textures: matte plastic, crisp label printing
Constraints: no logos or trademarks; no watermark
```

### Mockup giao diện người dùng (ui-mockup)
```text
Use case: ui-mockup
Primary request: mobile app home screen for a local farmers market with vendors and daily specials
Asset type: mobile app screen
Style/medium: realistic product UI, not concept art
Composition/framing: clean vertical mobile layout with clear hierarchy
Constraints: practical layout, clear typography, no logos or trademarks, no watermark
```

### Sơ đồ/Biểu đồ thông tin (infographic-diagram)
```text
Use case: infographic-diagram
Primary request: detailed infographic of an automatic coffee machine flow
Scene/backdrop: clean, light neutral background
Subject: bean hopper -> grinder -> brew group -> boiler -> water tank -> drip tray
Style/medium: clean vector-like infographic with clear callouts and arrows
Composition/framing: vertical poster layout, top-to-bottom flow
Text (verbatim): "Bean Hopper", "Grinder", "Brew Group", "Boiler", "Water Tank", "Drip Tray"
Constraints: clear labels, strong contrast, no logos or trademarks, no watermark
```

### Thiết kế Logo/Thương hiệu (logo-brand)
```text
Use case: logo-brand
Primary request: original logo for "Field & Flour", a local bakery
Style/medium: vector logo mark; flat colors; minimal
Composition/framing: single centered logo on a plain background with generous padding
Constraints: strong silhouette, balanced negative space; original design only; no gradients unless essential; no trademarks; no watermark
```

### Concept nghệ thuật điện ảnh (stylized-concept)
```text
Use case: stylized-concept
Primary request: cavernous hangar interior with tall support beams and drifting fog
Scene/backdrop: industrial hangar interior, deep scale, light haze
Subject: compact shuttle parked near the center
Style/medium: cinematic concept art, industrial rendering
Lighting/mood: dramatic lighting, volumetric fog, high contrast
Constraints: focus on scale and atmospheric depth; no watermarks
```
