const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Smax.ai';
pptx.subject = 'HV Group WhatsApp Revenue Activation Flow';
pptx.title = 'HV Group — WhatsApp Ads, Content & Follow-up Flow';
pptx.company = 'Smax.ai';
pptx.lang = 'vi-VN';
pptx.theme = {
  headFontFace: 'Arial',
  bodyFontFace: 'Arial',
  lang: 'vi-VN'
};
pptx.defineSlideMaster({
  title: 'HV_MASTER',
  background: { color: 'F5F8FF' },
  objects: [
    { line: { x: 0.45, y: 7.12, w: 12.4, h: 0, line: { color: 'D8E4F6', width: 0.8 } } },
    { text: { text: 'HV GROUP × SMAX.AI  •  WHATSAPP REVENUE ACTIVATION', options: { x: 0.55, y: 7.18, w: 7.5, h: 0.14, fontFace: 'Arial', fontSize: 5.8, color: '7180A4', bold: true, charSpacing: 1.1, margin: 0 } } },
    { text: { text: 'Bản flow 07/08/2026', options: { x: 10.8, y: 7.18, w: 1.95, h: 0.14, fontFace: 'Arial', fontSize: 5.8, color: '7180A4', align: 'right', margin: 0 } } }
  ],
  slideNumber: { x: 12.78, y: 7.17, w: 0.15, h: 0.15, color: '7180A4', fontFace: 'Arial', fontSize: 6 }
});

const C = {
  navy: '0B1B45', blue: '1769E8', blue2: 'DDEBFF', cyan: 'E3F6FF',
  purple: '7047EB', purple2: 'EEE8FF', green: '0FA46F', green2: 'E3F8EF',
  orange: 'F28B2D', orange2: 'FFF0DE', red: 'E34D59', red2: 'FFE8EB',
  text: '172341', muted: '61708F', line: 'B9C9E3', white: 'FFFFFF', gray: 'EFF3F9'
};

function title(slide, kicker, heading, sub) {
  slide.addText(kicker.toUpperCase(), { x: 0.55, y: 0.34, w: 4.6, h: 0.18, fontFace: 'Arial', fontSize: 7.5, bold: true, color: C.blue, charSpacing: 1.25, margin: 0 });
  slide.addText(heading, { x: 0.55, y: 0.62, w: 11.9, h: 0.54, fontFace: 'Arial', fontSize: 24, bold: true, color: C.navy, margin: 0, breakLine: false, fit: 'shrink' });
  if (sub) slide.addText(sub, { x: 0.55, y: 1.21, w: 12.05, h: 0.34, fontFace: 'Arial', fontSize: 10.2, color: C.muted, margin: 0, fit: 'shrink' });
}

function box(slide, x, y, w, h, heading, body, style = {}) {
  const fill = style.fill || C.white;
  const line = style.line || C.line;
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { color: line, width: style.lineWidth || 1.1 }, shadow: style.shadow === false ? undefined : { type: 'outer', color: 'B7C4DA', opacity: 0.15, blur: 1, angle: 45, distance: 1 } });
  if (style.badge) {
    slide.addShape(pptx.ShapeType.roundRect, { x: x + 0.16, y: y + 0.14, w: style.badgeW || 0.62, h: 0.25, fill: { color: style.badgeColor || C.blue }, line: { color: style.badgeColor || C.blue } });
    slide.addText(style.badge, { x: x + 0.16, y: y + 0.185, w: style.badgeW || 0.62, h: 0.09, fontFace: 'Arial', fontSize: 6.2, bold: true, color: C.white, align: 'center', margin: 0 });
  }
  const top = style.badge ? y + 0.46 : y + 0.16;
  const headingH = style.headingH || 0.28;
  slide.addText(heading, { x: x + 0.18, y: top, w: w - 0.36, h: headingH, fontFace: 'Arial', fontSize: style.headingSize || 12.5, bold: true, color: style.headingColor || C.navy, margin: 0, fit: 'shrink', valign: 'mid' });
  if (body) {
    const bodyY = top + headingH + 0.04;
    const bodyH = Math.max(0.1, h - (bodyY - y) - 0.09);
    slide.addText(body, { x: x + 0.18, y: bodyY, w: w - 0.36, h: bodyH, fontFace: 'Arial', fontSize: style.bodySize || 8.2, color: style.bodyColor || C.text, margin: 0, breakLine: false, fit: 'shrink', valign: 'top', bullet: style.bullet });
  }
}

function arrow(slide, x, y, w = 0.38, color = C.blue) {
  slide.addShape(pptx.ShapeType.line, { x, y, w, h: 0, line: { color, width: 2.2, beginArrowType: 'none', endArrowType: 'triangle' } });
}

function down(slide, x, y, h = 0.35, color = C.blue) {
  slide.addShape(pptx.ShapeType.line, { x, y, w: 0, h, line: { color, width: 2.2, beginArrowType: 'none', endArrowType: 'triangle' } });
}

function pill(slide, x, y, w, text, color = C.blue, fill = C.blue2) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.31, fill: { color: fill }, line: { color: fill } });
  slide.addText(text, { x: x + 0.08, y: y + 0.09, w: w - 0.16, h: 0.09, fontFace: 'Arial', fontSize: 6.5, bold: true, color, align: 'center', margin: 0, fit: 'shrink' });
}

function eventBar(slide, items, y) {
  slide.addText('EVENT & KPI', { x: 0.58, y: y + 0.02, w: 0.85, h: 0.18, fontFace: 'Arial', fontSize: 7, bold: true, color: C.muted, margin: 0 });
  let x = 1.48;
  for (const [t, c] of items) {
    const w = Math.max(0.9, Math.min(1.7, t.length * 0.055 + 0.45));
    pill(slide, x, y, w, t, c, c === C.green ? C.green2 : c === C.orange ? C.orange2 : C.blue2);
    x += w + 0.14;
  }
}

// Slide 1 — Portfolio map
{
  const s = pptx.addSlide('HV_MASTER');
  title(s, 'Bản đồ tổng quan', 'Một nguồn Ads — bốn luồng doanh thu khác nhau', 'Mỗi campaign có nội dung, điểm vào, nhánh follow-up và event riêng. Creative Test là lớp học chung, không phải một funnel độc lập.');
  pill(s, 9.15, 0.38, 3.45, 'LEARNING 20/08–02/09  •  100% BUDGET', C.blue, C.blue2);

  const laneY = [1.72, 2.82, 3.92, 5.02];
  const lanes = [
    { id: '01', color: C.blue, fill: C.blue2, name: 'DIRECT PURCHASE', budget: '30% → 40% → 50%', creative: 'UGC • Proof/BPOM\nStock • Value/Bundle', entry: 'Click Ads → WhatsApp\n“Cek stok / Pesan”', logic: 'AI hỏi tối đa 2 tín hiệu\n→ SKU → Order summary', branch: 'Chưa mua: Price / Trust / Fit / Shipping\nĐã mua: Utility + chăm sóc', outcome: 'Purchase • Delivered\nNet ROAS' },
    { id: '02', color: C.purple, fill: C.purple2, name: 'QUIZ QUALITY LEAD', budget: '30% → 22% → 15%', creative: 'Problem hook\n“60 detik temukan produk”', entry: 'Click Ads → WhatsApp\n→ mở Quiz Webview', logic: '4 câu: concern • category\nbudget • buying timing', branch: 'Bỏ dở: 30m + 6h\nHoàn tất: score Hot/Warm/Cold', outcome: 'Qualified Lead\nOrder • Delivered' },
    { id: '03', color: C.orange, fill: C.orange2, name: 'PRODUCT FINDER', budget: '15% → 13% → 10%', creative: 'Comparison • Budget\nCategory / Benefit', entry: 'Ads → Webview\nhoặc WhatsApp-first', logic: 'Filter → chọn SKU\n→ lưu context', branch: 'Ẩn danh: Ads remarketing\nĐịnh danh: WhatsApp follow-up', outcome: 'ViewContent • Lead\nPurchase' },
    { id: '04', color: C.green, fill: C.green2, name: 'REMARKETING & REPEAT', budget: '10% → 15% → 20%', creative: 'Price • Trust • Fit\nShipping • Replenishment', entry: 'Tệp theo reason\nhoặc lifecycle', logic: 'Nội dung đúng rào cản\n→ quay lại WhatsApp', branch: 'Chưa mua / Bỏ giỏ\nĐã mua / VIP / Dormant', outcome: 'Recovered Revenue\nRepeat Purchase' }
  ];

  lanes.forEach((l, i) => {
    const y = laneY[i];
    box(s, 0.55, y, 1.9, 0.82, l.name + '\n' + l.budget, null, { fill: l.fill, line: l.color, badge: l.id, badgeColor: l.color, headingSize: 9.6, headingH: 0.31, shadow: false });
    arrow(s, 2.5, y + 0.41, 0.26, l.color);
    box(s, 2.8, y, 1.95, 0.82, 'NỘI DUNG ADS', l.creative, { fill: C.white, line: l.color, headingSize: 9.2, bodySize: 7.2, shadow: false });
    arrow(s, 4.8, y + 0.41, 0.26, l.color);
    box(s, 5.1, y, 2.0, 0.82, 'ĐIỂM VÀO', l.entry, { fill: C.white, line: l.color, headingSize: 9.2, bodySize: 7.2, shadow: false });
    arrow(s, 7.15, y + 0.41, 0.26, l.color);
    box(s, 7.45, y, 2.0, 0.82, 'SMAX XỬ LÝ', l.logic, { fill: C.white, line: l.color, headingSize: 9.2, bodySize: 7.2, shadow: false });
    arrow(s, 9.5, y + 0.41, 0.26, l.color);
    box(s, 9.8, y, 1.85, 0.82, 'RẼ NHÁNH', l.branch, { fill: C.white, line: l.color, headingSize: 9.2, bodySize: 6.9, shadow: false });
    arrow(s, 11.7, y + 0.41, 0.26, l.color);
    box(s, 12.0, y, 0.78, 0.82, 'KẾT QUẢ\n' + l.outcome, null, { fill: l.fill, line: l.color, headingSize: 6.4, headingH: 0.56, shadow: false });
  });
  box(s, 0.55, 6.05, 12.23, 0.78, 'CREATIVE TEST — LỚP HỌC CHUNG CHO TOÀN BỘ FUNNEL', 'Hook • Creator • CTA • Offer • Timing. Mỗi test chỉ đổi 1 biến; giữ nguyên objective, audience và placements. Chọn winner theo cost/đơn giao thành công và Net ROAS — không theo CTR/CPC.', { fill: 'EEF3FB', line: C.line, headingSize: 9.5, headingH: 0.2, bodySize: 7.2, shadow: false });
}

// Slide 2 — Quiz detail
{
  const s = pptx.addSlide('HV_MASTER');
  title(s, 'Luồng chi tiết 01', 'Quiz Quality Lead — từ quảng cáo đến đơn hàng', 'Kiến trúc pilot ưu tiên WhatsApp-first để Smax định danh khách trước, lưu tiến độ và có thể follow-up người bỏ dở.');
  pill(s, 0.58, 1.53, 2.25, 'CAMPAIGN: LEADS', C.purple, C.purple2);
  pill(s, 2.95, 1.53, 3.15, 'AD SET: MESSAGING APPS → WHATSAPP', C.purple, C.purple2);
  pill(s, 6.22, 1.53, 2.55, 'GOAL: MAXIMIZE CONVERSATIONS', C.purple, C.purple2);
  pill(s, 8.9, 1.53, 3.45, 'DOWNSTREAM: QUALIFIED LEAD → PURCHASE', C.purple, C.purple2);

  box(s, 0.55, 1.96, 2.15, 1.56, '1. ADS A/B', 'A — Problem hook\n“Kulit kusam, kering atau sensitif?”\nB — Result hook\n“60 detik untuk menemukan produk cocok”\nCTA: Mulai Quiz', { fill: C.purple2, line: C.purple, badge: 'ADS', badgeColor: C.purple, badgeW: 0.55, headingSize: 12.3, bodySize: 6.45, shadow: false });
  arrow(s, 2.76, 2.73, 0.3, C.purple);
  box(s, 3.1, 1.96, 2.1, 1.56, '2. WHATSAPP', 'Prefilled message: “Mulai Quiz”\n\nAI xác nhận nguồn Ads, giải thích lợi ích và xin consent phù hợp.\n\nButton: Mulai Quiz', { fill: C.white, line: C.purple, badge: 'ID', badgeColor: C.purple, badgeW: 0.45, headingSize: 12.3, bodySize: 6.85, shadow: false });
  arrow(s, 5.26, 2.73, 0.3, C.purple);
  box(s, 5.6, 1.96, 2.72, 1.56, '3. QUIZ 4 CÂU', 'Q1  Nhu cầu: Kusam/noda • Kering • Berminyak • Sensitif\nQ2  Category: Skincare • Makeup • Haircare\nQ3  Ngân sách\nQ4  Mua khi nào?', { fill: C.white, line: C.purple, badge: 'WEBVIEW', badgeColor: C.purple, badgeW: 0.9, headingSize: 12.3, bodySize: 6.45, shadow: false });
  arrow(s, 8.38, 2.73, 0.3, C.purple);
  box(s, 8.72, 2.18, 1.58, 1.12, 'HOÀN TẤT?', 'Đủ 4 câu + xem kết quả?', { fill: C.orange2, line: C.orange, badge: 'GATE', badgeColor: C.orange, badgeW: 0.55, headingSize: 11.5, bodySize: 7.2, shadow: false });

  arrow(s, 10.36, 2.55, 0.28, C.green);
  box(s, 10.68, 1.96, 2.1, 1.56, 'YES → LEAD SCORE', 'Hot ≥7: hỏi giá/tồn kho hoặc mua ≤7 ngày\nWarm 4–6: cần tư vấn/so sánh\nCold <4: nurture, không đẩy Sales\n\nEvent Lead chỉ fire khi đủ chuẩn.', { fill: C.green2, line: C.green, badge: 'YES', badgeColor: C.green, badgeW: 0.52, headingSize: 11.2, bodySize: 7.1, shadow: false });

  down(s, 9.51, 3.33, 0.47, C.red);
  box(s, 7.95, 3.88, 3.12, 0.98, 'NO → QUIZ INCOMPLETE\nSmax lưu câu trả lời cuối cùng và không tính là Quality Lead.', null, { fill: C.red2, line: C.red, badge: 'NO', badgeColor: C.red, badgeW: 0.46, headingSize: 9.6, headingH: 0.38, shadow: false });
  down(s, 9.51, 4.9, 0.3, C.red);
  box(s, 6.62, 5.25, 2.82, 1.18, 'SAU 30 PHÚT — FLW-01', '“Quiz-mu belum selesai. Tinggal beberapa pertanyaan lagi untuk mendapatkan rekomendasi yang lebih relevan. Mau lanjut?”\n\nCTA: Lanjutkan Quiz • Nanti', { fill: C.white, line: C.red, headingSize: 10.4, bodySize: 6.9, shadow: false });
  arrow(s, 9.49, 5.84, 0.24, C.red);
  box(s, 9.77, 5.25, 2.55, 1.18, 'SAU 6 GIỜ — FLW-01B', '“Mau lanjut dari pertanyaan terakhir? Hasil rekomendasimu belum selesai.”\n\nKhông phản hồi: dừng. Ngoài 24h chỉ gửi khi có opt-in và template phù hợp.', { fill: C.white, line: C.red, headingSize: 10.4, bodySize: 6.85, shadow: false });

  box(s, 0.55, 4.03, 2.45, 1.18, '4. KẾT QUẢ CÁ NHÂN', '“Fokusmu: {{concern}}. {{SKU}} cocok dipertimbangkan karena {{approved_claim}}.”\n\nCTA: Cara pakai • Cek harga • Alternatif', { fill: C.green2, line: C.green, headingSize: 10.8, bodySize: 7.15, shadow: false });
  arrow(s, 3.05, 4.62, 0.24, C.green);
  box(s, 3.33, 4.03, 2.45, 1.18, '5. RECOMMENDATION', '1 SKU chính + 1 lựa chọn thay thế.\nKhông gửi toàn catalog.\n\nKhông hành động sau 6h → FLW-02.', { fill: C.white, line: C.green, headingSize: 10.8, bodySize: 7.15, shadow: false });
  arrow(s, 5.83, 4.62, 0.24, C.green);
  box(s, 6.11, 4.03, 1.45, 1.18, '6. ĐƠN HÀNG', 'Order summary\n→ nhân viên xác nhận\n→ utility', { fill: C.green2, line: C.green, headingSize: 9.7, bodySize: 6.9, shadow: false });

  eventBar(s, [['ConversationStart', C.blue], ['QuizStart', C.purple], ['QuizComplete', C.purple], ['Qualified Lead', C.green], ['OrderDraft', C.orange], ['Purchase', C.green], ['Delivered', C.green]], 6.63);
}

// Slide 3 — Direct Purchase
{
  const s = pptx.addSlide('HV_MASTER');
  title(s, 'Luồng chi tiết 02', 'Direct Purchase — chốt nhanh nhưng vẫn có kiểm soát', 'Dành cho khách đã biết sản phẩm hoặc có ý định cao. AI rút ngắn hội thoại; nhân viên xác nhận đơn và xử lý ngoại lệ.');
  pill(s, 0.58, 1.53, 2.15, 'CAMPAIGN: ENGAGEMENT', C.blue, C.blue2);
  pill(s, 2.85, 1.53, 2.85, 'MESSAGING APPS → WHATSAPP', C.blue, C.blue2);
  pill(s, 5.82, 1.53, 2.52, 'MAXIMIZE CONVERSATIONS', C.blue, C.blue2);
  pill(s, 8.46, 1.53, 4.0, 'UPGRADE: SALES/PURCHASE KHI GATE PASS', C.blue, C.blue2);

  box(s, 0.55, 2.05, 2.05, 1.3, '1. ADS CONTENT', '• UGC problem–solution\n• Proof: BPOM/keaslian\n• Value / bundle\n• Stock / promo đã duyệt\n\nCTA: Cek stok / Pesan', { fill: C.blue2, line: C.blue, badge: 'ADS', badgeColor: C.blue, badgeW: 0.55, headingSize: 11.3, bodySize: 7.25, shadow: false });
  arrow(s, 2.66, 2.7, 0.28, C.blue);
  box(s, 2.98, 2.05, 2.25, 1.3, '2. GREETING', '“Kamu datang dari iklan {{produk}}. Mau cek stok dan promo, dibantu memilih, atau langsung pesan?”\n\nButtons: Cek stok • Bantu pilih • Pesan', { fill: C.white, line: C.blue, badge: 'WA', badgeColor: C.blue, badgeW: 0.48, headingSize: 11.3, bodySize: 7.05, shadow: false });
  arrow(s, 5.29, 2.7, 0.28, C.blue);
  box(s, 5.61, 2.05, 2.15, 1.3, '3. QUALIFY', 'Tối đa 2 câu trước recommendation:\n• concern/category\n• budget / thời điểm mua\n\nKhông hỏi lại dữ liệu đã có.', { fill: C.white, line: C.blue, badge: 'AI', badgeColor: C.blue, badgeW: 0.42, headingSize: 11.3, bodySize: 7.2, shadow: false });
  arrow(s, 7.82, 2.7, 0.28, C.blue);
  box(s, 8.14, 2.05, 2.15, 1.3, '4. RECOMMEND', '1 SKU chính + giá + claim đã duyệt.\nButtons: Varian • Cara pakai • Pesan\n\nKhách chọn mua → Order summary.', { fill: C.white, line: C.blue, badge: 'SKU', badgeColor: C.blue, badgeW: 0.48, headingSize: 11.3, bodySize: 7.2, shadow: false });
  arrow(s, 10.35, 2.7, 0.28, C.blue);
  box(s, 10.67, 2.05, 2.1, 1.3, '5. HUMAN CONFIRM', 'Nhân viên kiểm tra tồn kho, ongkir, payment/COD.\n\nĐơn hợp lệ → Purchase\nGiao thành công → Delivered', { fill: C.green2, line: C.green, badge: 'SALE', badgeColor: C.green, badgeW: 0.55, headingSize: 11.1, bodySize: 7.05, shadow: false });

  box(s, 0.55, 3.72, 2.2, 1.22, 'KHÔNG MUA — GẮN REASON', 'Buttons: Harga • Kecocokan • Keaslian • Pengiriman\n\nSmax lưu reason_no_buy + SKU + source.', { fill: C.orange2, line: C.orange, headingSize: 10.6, bodySize: 7.2, shadow: false });
  arrow(s, 2.81, 4.33, 0.25, C.orange);
  box(s, 3.1, 3.72, 2.05, 1.22, 'PRICE — FLW-03', 'Value/cost-per-use hoặc size phù hợp. Không giảm giá ngay.\n\nCTA: Opsi hemat • Pilih awal', { fill: C.white, line: C.orange, headingSize: 10.4, bodySize: 7.0, shadow: false });
  box(s, 5.36, 3.72, 2.05, 1.22, 'TRUST — FLW-04', 'Distributor resmi • BPOM • tem/kebijakan đã duyệt.\n\nCTA: Lihat bukti • Tanya tim', { fill: C.white, line: C.orange, headingSize: 10.4, bodySize: 7.0, shadow: false });
  box(s, 7.62, 3.72, 2.05, 1.22, 'FIT — FLW-05', 'Chỉ dùng thông tin sản phẩm đã duyệt; nhạy cảm/ngoài KB → handover.\n\nCTA: Komposisi • Tim', { fill: C.white, line: C.orange, headingSize: 10.4, bodySize: 6.9, shadow: false });
  box(s, 9.88, 3.72, 2.9, 1.22, 'SHIPPING / CART', 'Shipping: hỏi city/postal code.\nCart: 30m FLW-06 → 6h FLW-07 → 24–48h FLW-08 nếu có opt-in/template.\nDừng ngay khi reply/order/opt-out.', { fill: C.white, line: C.orange, headingSize: 10.4, bodySize: 6.95, shadow: false });

  box(s, 0.55, 5.25, 12.23, 0.92, 'SAU KHI NHÂN VIÊN XÁC NHẬN', 'Utility: Confirmed → Payment pending (nếu có) → Shipped → Delivered. Không trộn promotion vào utility. Sau Delivered: Day 3 hướng dẫn sử dụng → Day 7 hỏi trải nghiệm → positive mới eligible cross-sell/replenishment.', { fill: C.green2, line: C.green, headingSize: 10.6, bodySize: 7.6, shadow: false });
  eventBar(s, [['ConversationStart', C.blue], ['Qualified Lead', C.blue], ['OrderDraft', C.orange], ['Purchase', C.green], ['Delivered', C.green], ['Net ROAS', C.green]], 6.42);
}

// Slide 4 — Product Finder architecture
{
  const s = pptx.addSlide('HV_MASTER');
  title(s, 'Luồng chi tiết 03', 'Product Finder / Webview — hai kiến trúc, hai cách follow-up', 'Điểm khác biệt quan trọng: khách ẩn danh trên Webview không thể nhận WhatsApp follow-up nếu chưa chủ động mở chat hoặc cung cấp consent.');
  box(s, 0.55, 1.62, 5.95, 0.82, 'A — WHATSAPP-FIRST  •  KHUYẾN NGHỊ CHO PILOT', 'Ads → WhatsApp → mở Product Finder Webview. Khách được định danh ngay; Smax giữ context và có thể follow-up trong 24h.', { fill: C.green2, line: C.green, headingSize: 12, bodySize: 7.8, shadow: false });
  box(s, 6.83, 1.62, 5.95, 0.82, 'B — WEBVIEW-FIRST  •  TEST SAU KHI TRACKING ỔN', 'Ads → Webview → WhatsApp. Tối ưu được Lead trên web, nhưng người bỏ dở trước khi mở WhatsApp chỉ có thể nhận Ads remarketing.', { fill: C.orange2, line: C.orange, headingSize: 12, bodySize: 7.8, shadow: false });

  box(s, 0.55, 2.78, 1.82, 1.12, 'ADS', '“Bandingkan produk berdasarkan kebutuhan dan budget.”\nCTA: Lihat produk', { fill: C.orange2, line: C.orange, headingSize: 11, bodySize: 7.2, shadow: false });
  arrow(s, 2.43, 3.34, 0.25, C.orange);
  box(s, 2.72, 2.66, 2.35, 1.36, 'WEBVIEW FILTER', '• concern / category\n• budget\n• format / preference\n• 5–10 SKU pilot\n\nKhông hỏi lại trong chat.', { fill: C.white, line: C.orange, headingSize: 11.2, bodySize: 7.4, shadow: false });
  arrow(s, 5.13, 3.34, 0.25, C.orange);
  box(s, 5.42, 2.78, 1.78, 1.12, 'CHỌN SKU', 'Lưu SKU, budget, comparison và CTA đã chọn.', { fill: C.white, line: C.orange, headingSize: 11, bodySize: 7.2, shadow: false });
  arrow(s, 7.26, 3.34, 0.25, C.orange);
  box(s, 7.55, 2.66, 2.3, 1.36, 'WHATSAPP CÓ CONTEXT', '“Kamu tadi melihat {{SKU}} untuk kebutuhan {{concern}}.”\n\nButtons: Cek cocok • Cek stok • Pesan', { fill: C.white, line: C.orange, headingSize: 11.1, bodySize: 7.15, shadow: false });
  arrow(s, 9.91, 3.34, 0.25, C.orange);
  box(s, 10.2, 2.66, 2.58, 1.36, 'RECOMMEND → ORDER', '1 SKU chính + 1 alternative.\nKhông mua → reason follow-up.\nMua → order summary → nhân viên confirm.', { fill: C.green2, line: C.green, headingSize: 11.1, bodySize: 7.25, shadow: false });

  box(s, 0.55, 4.42, 3.76, 1.28, 'NẾU BỎ DỞ — WHATSAPP-FIRST', 'Đã định danh và còn trong 24h:\n30m: nhắc tiếp tục từ bước gần nhất.\n6h: hỏi “Bạn cần chọn theo nhu cầu hay ngân sách?”\nReply → quay lại đúng filter/SKU.', { fill: C.green2, line: C.green, badge: 'ID', badgeColor: C.green, badgeW: 0.45, headingSize: 10.8, bodySize: 7.2, shadow: false });
  box(s, 4.55, 4.42, 3.76, 1.28, 'NẾU BỎ DỞ — WEBVIEW-FIRST', 'Chưa có phone/WhatsApp consent:\nKhông gửi WhatsApp. Dùng Pixel/CAPI để tạo tệp ViewContent/Lead chưa hoàn tất và chạy Ads remarketing.\nChỉ mở follow-up sau khi khách chủ động chat.', { fill: C.orange2, line: C.orange, badge: 'ANON', badgeColor: C.orange, badgeW: 0.62, headingSize: 10.8, bodySize: 7.1, shadow: false });
  box(s, 8.55, 4.42, 4.23, 1.28, 'EVENT & QUY TẮC', 'Webview-first: ViewContent → Qualified Lead khi hoàn tất + chọn SKU/CTA.\nWhatsApp-first: ConversationStart → FinderComplete → Qualified Lead.\nPurchase chỉ sau đơn hợp lệ; dedupe bằng Order ID.', { fill: C.blue2, line: C.blue, badge: 'DATA', badgeColor: C.blue, badgeW: 0.58, headingSize: 10.8, bodySize: 7.15, shadow: false });
  eventBar(s, [['ViewContent', C.orange], ['FinderComplete', C.orange], ['Qualified Lead', C.blue], ['OrderDraft', C.orange], ['Purchase', C.green], ['Delivered', C.green]], 6.2);
}

// Slide 5 — Remarketing and repeat
{
  const s = pptx.addSlide('HV_MASTER');
  title(s, 'Luồng chi tiết 04', 'Remarketing — không dùng một nội dung cho mọi khách', 'Smax phân tệp theo rào cản và trạng thái đơn; mỗi campaign chỉ gửi nội dung giải quyết đúng một nhiệm vụ.');

  box(s, 0.55, 1.68, 2.15, 1.3, 'NGUỒN TỆP', '• Quiz / Product Finder\n• Hội thoại chưa mua / Bỏ giỏ\n• Delivered / VIP / Dormant', { fill: C.blue2, line: C.blue, badge: 'DATA', badgeColor: C.blue, badgeW: 0.58, headingSize: 11.5, bodySize: 6.55, shadow: false });
  arrow(s, 2.76, 2.27, 0.28, C.blue);
  box(s, 3.08, 1.68, 2.15, 1.3, 'PHÂN TỆP SMAX', 'reason_no_buy • last_SKU\nlast_stage • intent • budget\ndelivered_date • sentiment\nmarketing_opt_in', { fill: C.white, line: C.blue, badge: 'TAG', badgeColor: C.blue, badgeW: 0.48, headingSize: 11.5, bodySize: 6.4, shadow: false });
  arrow(s, 5.29, 2.27, 0.28, C.blue);
  box(s, 5.61, 1.68, 2.15, 1.3, 'CAMPAIGN', 'Chưa mua: Sales/Engagement → WhatsApp\nĐã mua: lifecycle segment\nHoldout 10%', { fill: C.white, line: C.blue, badge: 'ADS', badgeColor: C.blue, badgeW: 0.48, headingSize: 11.5, bodySize: 6.75, shadow: false });
  arrow(s, 7.82, 2.27, 0.28, C.blue);
  box(s, 8.14, 1.68, 2.15, 1.3, 'NỘI DUNG', 'Một rào cản / một message.\nKhông voucher đại trà.\nUtility không trộn promotion.', { fill: C.white, line: C.blue, badge: 'COPY', badgeColor: C.blue, badgeW: 0.55, headingSize: 11.5, bodySize: 6.75, shadow: false });
  arrow(s, 10.35, 2.27, 0.28, C.blue);
  box(s, 10.67, 1.68, 2.1, 1.3, 'KẾT QUẢ', 'Recovered Purchase\nRepeat Purchase\nIncremental Revenue\nUnsubscribe guardrail', { fill: C.green2, line: C.green, badge: 'KPI', badgeColor: C.green, badgeW: 0.45, headingSize: 11.5, bodySize: 6.65, shadow: false });

  const items = [
    ['PRICE', 'Value/cost-per-use hoặc size thấp hơn', 'FLW-03 • Lihat opsi hemat', C.orange, C.orange2],
    ['TRUST', 'BPOM, distributor resmi, proof đã duyệt', 'FLW-04 • Lihat bukti', C.purple, C.purple2],
    ['FIT', 'Thông tin phù hợp; ngoài KB → handover', 'FLW-05 • Hubungi tim', C.blue, C.blue2],
    ['SHIPPING', 'City/postal code, ongkir, ETA, COD', 'CNT-19 • Kirim lokasi', C.orange, C.orange2],
    ['CART', '30m reminder → 6h reason → 24–48h template', 'FLW-06/07/08', C.red, C.red2],
    ['REPEAT', 'Day 3 guide → Day 7 sentiment → cycle 21/30/45', 'FLW-13/14/16/17', C.green, C.green2]
  ];
  items.forEach((it, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.55 + col * 4.11;
    const y = 3.25 + row * 1.35;
    box(s, x, y, 3.85, 1.1, it[0], it[1] + '\n' + it[2], { fill: it[4], line: it[3], badge: String(i + 1).padStart(2, '0'), badgeColor: it[3], badgeW: 0.46, headingSize: 11.2, bodySize: 6.7, shadow: false });
  });
  box(s, 0.55, 5.86, 12.23, 0.92, 'STOP & SUPPRESSION', 'Dừng ngay khi khách reply, tạo đơn, mua, opt-out hoặc vào flow ưu tiên cao hơn. Ngoài 24h chỉ dùng template/category phù hợp và consent hợp lệ. Negative feedback → suppress marketing + human handover.', { fill: 'EEF3FB', line: C.line, headingSize: 9.8, headingH: 0.2, bodySize: 7.1, shadow: false });
}

const output = process.argv[2] || 'HV-Group-WhatsApp-Revenue-Flow.pptx';
pptx.writeFile({ fileName: output });
