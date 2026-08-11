import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/vibe-coding/newweb smax/outputs/hv-group-whatsapp-pnl-2026-08-05";
const outputPath = `${outDir}/HV-Group-WhatsApp-PnL-2-thang.xlsx`;

const wb = Workbook.create();
const sheet = wb.worksheets.add("P&L WhatsApp");
const sources = wb.worksheets.add("Nguồn & Giả định");

const navy = "#081D42";
const blue = "#1463EA";
const lightBlue = "#EAF2FF";
const paleBlue = "#F4F7FC";
const green = "#0C684B";
const lightGreen = "#E9F8F1";
const yellow = "#FFF4CC";
const amber = "#B54708";
const lightAmber = "#FFF7E6";
const ink = "#102348";
const red = "#B42318";
const lightRed = "#FDECEC";
const border = "#D9E3F2";
const vnd = '"₫" #,##0;[Red]("₫" #,##0);-';
const vnd2 = '"₫" #,##0.00;[Red]("₫" #,##0.00);-';
const usd4 = '"$"0.0000;[Red]("$"0.0000);-';
const idr = '"Rp" #,##0;[Red]("Rp" #,##0);-';
const count = '#,##0;[Red](#,##0);-';
const pct = '0.0%;[Red](0.0%);-';
const multiple = '0.00"x";[Red](0.00"x");-';

function style(range, config) {
  sheet.getRange(range).format = config;
}

function formula(cell, value) {
  sheet.getRange(cell).formulas = [[value]];
}

sheet.showGridLines = false;
sheet.freezePanes.freezeRows(4);
sheet.getRange("A1:J88").format = {
  font: { name: "Arial", size: 10, color: ink },
  verticalAlignment: "center",
  wrapText: true,
};

for (const range of [
  "A1:J1", "A2:J2", "A3:J3", "A5:J5", "A11:D11", "F11:J11",
  "A42:J42", "A57:J57", "A64:J64", "A65:J65", "A66:J66", "A67:J67", "A68:J68", "A69:J69",
  "A72:J72", "D73:J73", "D74:J74", "D75:J75", "D76:J76", "D77:J77", "D78:J78", "D79:J79",
  "A82:F82", "G82:J82",
]) sheet.getRange(range).merge();

sheet.getRange("A1").values = [["P&L DỰ KIẾN — KÊNH BÁN HÀNG WHATSAPP (2 THÁNG)"]];
sheet.getRange("A2").values = [["HV Group | Indonesia | Quy đổi VND | Chính sách Meta cập nhật 05/08/2026"]];
sheet.getRange("A3").values = [["Ô màu vàng là giả định có thể chỉnh sửa. Kết quả chưa bao gồm COGS, logistics, COD fee và các chi phí vận hành khác."]];
style("A1:J1", { fill: navy, font: { name: "Arial", size: 18, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center" });
style("A2:J2", { fill: navy, font: { size: 10, color: "#C6DCFF" }, horizontalAlignment: "center" });
style("A3:J3", { fill: navy, font: { size: 9, color: "#93C5FD" }, horizontalAlignment: "center", wrapText: true });

sheet.getRange("A5").values = [["KẾT QUẢ TÓM TẮT"]];
style("A5:J5", { fill: blue, font: { bold: true, color: "#FFFFFF" } });
sheet.getRange("A6:J6").values = [["Hội thoại mới", null, "Chi phí quảng cáo", null, "Phí WhatsApp + VAT", null, "Doanh thu sau hoàn–hủy", null, "ROAS media", null]];
sheet.getRange("A8:J8").values = [["Tổng chi phí kênh", null, "Đóng góp trước COGS", null, "Revenue / Tổng chi phí", null, "All-in cost / chat", null, "ROAS hòa vốn", null]];
for (const cell of ["A6", "C6", "E6", "G6", "I6", "A8", "C8", "E8", "G8", "I8"]) {
  style(cell, { fill: paleBlue, font: { bold: true, color: ink }, wrapText: true });
}
formula("B6", "=$B$15");
formula("D6", "=$B$21");
formula("F6", "=$I$19");
formula("H6", "=$B$23");
formula("J6", "=$B$22");
formula("B8", "=$B$49");
formula("D8", "=$B$50");
formula("F8", "=$B$52");
formula("H8", "=$B$53");
formula("J8", "=$B$54");
style("B6:J8", { font: { size: 13, bold: true, color: ink }, horizontalAlignment: "right" });
style("H6:J6", { fill: lightGreen, font: { size: 13, bold: true, color: green }, horizontalAlignment: "right" });
style("D8:F8", { fill: lightRed, font: { size: 13, bold: true, color: red }, horizontalAlignment: "right" });
style("J8", { fill: lightAmber, font: { size: 13, bold: true, color: amber }, horizontalAlignment: "right" });
sheet.getRange("B6").format.numberFormat = count;
for (const cell of ["D6", "F6", "H6", "B8", "D8", "H8"]) sheet.getRange(cell).format.numberFormat = vnd;
for (const cell of ["J6", "F8", "J8"]) sheet.getRange(cell).format.numberFormat = multiple;

sheet.getRange("A11").values = [["GIẢ ĐỊNH ĐẦU VÀO"]];
sheet.getRange("F11").values = [["CHI PHÍ WHATSAPP THEO FLOW 1 KHÁCH HÀNG MỚI"]];
for (const range of ["A11:D11", "F11:J11"]) style(range, { fill: blue, font: { bold: true, color: "#FFFFFF" } });
sheet.getRange("A12:J12").values = [["Giả định", "Giá trị", "Đơn vị", "Nguồn / ghi chú", null, "Bước trong flow", "Số tin", "Đơn giá VND", "Chi phí trước VAT", "Cách tính"]];
style("A12:J12", { fill: lightBlue, font: { bold: true, color: ink }, horizontalAlignment: "center", wrapText: true, borders: { preset: "inside", style: "thin", color: border } });

sheet.getRange("A13:D39").values = [
  ["Thời gian mô phỏng", 60, "ngày", "Theo brief: 2 tháng"],
  ["Hội thoại mới/ngày", 100, "hội thoại", "KPI HV Group"],
  ["Tổng hội thoại mới", null, "hội thoại", "60 ngày × 100 hội thoại/ngày"],
  ["Benchmark thấp – chi phí/chat", 1500, "IDR/chat", "Benchmark CTWA Indonesia"],
  ["Benchmark cơ sở – chi phí/chat", 3000, "IDR/chat", "Kịch bản dùng trong P&L"],
  ["Benchmark cao – chi phí/chat", 5000, "IDR/chat", "Benchmark CTWA Indonesia"],
  ["Tỷ giá IDR → VND", 1.46448696, "VND/IDR", "XE 05/08/2026"],
  ["Chi phí quảng cáo/chat", null, "VND/chat", "Rp3.000 × tỷ giá"],
  ["Chi phí quảng cáo", null, "VND", "Tổng chat × chi phí/chat"],
  ["ROAS media mục tiêu", 3, "x", "Doanh thu sau hoàn–hủy / Ads"],
  ["Doanh thu dự kiến sau hoàn–hủy", null, "VND", "Ads × ROAS media"],
  ["Tỷ lệ mua từ hội thoại", 0.1, "%", "Giả định để tính tin sau mua; có thể chỉnh"],
  ["Số khách mua", null, "khách", "Tổng chat × tỷ lệ mua"],
  ["VAT/PPN phí WhatsApp", 0.11, "%", "Điều chỉnh theo hóa đơn thực tế"],
  ["Chi phí nhân sự", 0, "VND", "Theo brief"],
  ["Chi phí nền tảng Smax.ai", 0, "VND", "Theo brief"],
  ["Tỷ giá USD → VND", 26237.82, "VND/USD", "XE 05/08/2026"],
  ["Tỷ lệ follow-up được miễn nhờ FEP", 1, "%", "Base: 100% traffic từ CTWA và gửi trong 72h"],
  ["Token trung bình/tin Meta Business Agent", 22500, "token/tin", "Midpoint 20.000–25.000 token/tin"],
  ["Phí Meta Business Agent", 2, "USD/1M token", "Hiệu lực 01/08/2026"],
  ["Tin Meta Business Agent/chat", 10, "tin/chat", "Theo flow HV Group"],
  ["Tin follow-up sau 24h/chat", 3, "tin/chat", "Phải dùng template; FEP có thể miễn phí delivery"],
  ["Tin utility/đơn hàng", 3, "tin/đơn", "Thông báo hành trình đơn hàng"],
  ["Tin upsell/đơn hàng", 1, "tin/đơn", "Gửi sau nhận hàng 7 ngày"],
  ["Đơn giá Marketing – Indonesia", 0.0411, "USD/tin", "Meta rate card hiệu lực 01/07/2026"],
  ["Đơn giá Utility – Indonesia", 0.025, "USD/tin", "Meta rate card hiệu lực 01/07/2026"],
  ["Tỷ lệ utility bị tính phí", 1, "%", "Bảo thủ: toàn bộ tin hành trình đơn nằm ngoài FEP"],
];
formula("B15", "=B13*B14");
formula("B20", "=B17*B19");
formula("B21", "=B15*B20");
formula("B23", "=B21*B22");
formula("B25", "=B15*B24");
style("A13:A39", { fill: paleBlue, font: { bold: true, color: ink }, wrapText: true });
for (const range of ["B13:B14", "B16:B19", "B22:B22", "B24:B24", "B26:B39"]) style(range, { fill: yellow, font: { color: "#0000FF" }, horizontalAlignment: "right" });
style("B15:B25", { horizontalAlignment: "right" });
style("C13:C39", { horizontalAlignment: "center" });
sheet.getRange("B13:B18").format.numberFormat = count;
sheet.getRange("B19").format.numberFormat = "0.000000";
for (const cell of ["B20", "B21", "B23", "B27", "B28"]) sheet.getRange(cell).format.numberFormat = vnd;
sheet.getRange("B22").format.numberFormat = multiple;
for (const cell of ["B24", "B26", "B30", "B39"]) sheet.getRange(cell).format.numberFormat = pct;
sheet.getRange("B25").format.numberFormat = count;
sheet.getRange("B29").format.numberFormat = '#,##0.00';
sheet.getRange("B31:B36").format.numberFormat = count;
sheet.getRange("B37:B38").format.numberFormat = usd4;

sheet.getRange("F13:J16").values = [
  ["Khách nhắn → AI trả lời 10 tin", null, null, null, "Meta Business Agent: tính theo token từ 01/08/2026; FEP không miễn phí token"],
  ["Sau 24h → 3 tin follow-up", null, null, null, "Sau 24h phải dùng template; miễn phí delivery nếu FEP 72h còn mở"],
  ["Khách mua → 3 tin utility", null, null, null, "Base tính phí toàn bộ để thận trọng"],
  ["Sau nhận hàng 7 ngày → upsell", null, null, null, "Marketing template ngoài cửa sổ miễn phí"],
];
formula("G13", "=$B$15*$B$33");
formula("H13", "=$B$31/1000000*$B$32*$B$29");
formula("I13", "=G13*H13");
formula("G14", "=$B$15*$B$34");
formula("H14", "=$B$37*$B$29");
formula("I14", "=G14*(1-$B$30)*H14");
formula("G15", "=$B$25*$B$35");
formula("H15", "=$B$38*$B$29");
formula("I15", "=G15*H15*$B$39");
formula("G16", "=$B$25*$B$36");
formula("H16", "=$B$37*$B$29");
formula("I16", "=G16*H16");
sheet.getRange("F17:J21").values = [
  ["Tạm tính trước VAT", null, null, null, null],
  ["VAT/PPN", null, null, null, null],
  ["TỔNG PHÍ WHATSAPP", null, null, null, null],
  ["Phí WhatsApp / hội thoại mới", null, null, null, null],
  ["Giá trị miễn nhờ FEP 72h", null, null, null, "Chỉ miễn delivery; Meta Business Agent vẫn tính token"],
];
formula("I17", "=SUM(I13:I16)");
formula("I18", "=I17*$B$26");
formula("I19", "=SUM(I17:I18)");
formula("I20", "=I19/$B$15");
formula("I21", "=G14*H14*$B$30*(1+$B$26)");
style("F13:F21", { fill: paleBlue, font: { bold: true, color: ink }, wrapText: true });
style("F19:J19", { fill: lightGreen, font: { bold: true, color: green } });
style("F21:J21", { fill: lightAmber, font: { bold: true, color: amber } });
sheet.getRange("G13:G16").format.numberFormat = count;
sheet.getRange("H13:I21").format.numberFormat = vnd;

sheet.getRange("A42").values = [["P&L DỰ KIẾN — KỊCH BẢN CƠ SỞ"]];
style("A42:J42", { fill: blue, font: { bold: true, color: "#FFFFFF" } });
sheet.getRange("A43:D43").values = [["Hạng mục", "Giá trị", "Đơn vị", "Diễn giải"]];
style("A43:D43", { fill: lightBlue, font: { bold: true, color: ink }, horizontalAlignment: "center", borders: { preset: "inside", style: "thin", color: border } });
sheet.getRange("A44:D54").values = [
  ["DOANH THU SAU HOÀN–HỦY", null, "VND", "Chi phí quảng cáo × ROAS media 3.0x"],
  ["Chi phí quảng cáo", null, "VND", "6.000 chat × chi phí/chat quy đổi VND"],
  ["Chi phí WhatsApp + VAT", null, "VND", "MBA + follow-up + utility + upsell"],
  ["Chi phí nhân sự", null, "VND", "Theo brief: 0"],
  ["Chi phí nền tảng Smax.ai", null, "VND", "Theo brief: 0"],
  ["TỔNG CHI PHÍ KÊNH", null, "VND", "Không gồm COGS, logistics, COD fee"],
  ["ĐÓNG GÓP TRƯỚC COGS/FULFILLMENT", null, "VND", "Contribution, không phải lợi nhuận ròng kế toán"],
  ["Biên đóng góp trước COGS", null, "%", "Contribution / Doanh thu"],
  ["Doanh thu / Tổng chi phí kênh", null, "x", "Hiệu quả sau khi cộng toàn bộ phí WhatsApp"],
  ["All-in cost / hội thoại mới", null, "VND/chat", "Tổng chi phí kênh / Tổng hội thoại"],
  ["ROAS media hòa vốn", null, "x", "Doanh thu tối thiểu / chi phí quảng cáo"],
];
const pnl = ["=$B$23", "=$B$21", "=$I$19", "=$B$27", "=$B$28", "=SUM(B45:B48)", "=B44-B49", "=IFERROR(B50/B44,0)", "=IFERROR(B44/B49,0)", "=IFERROR(B49/$B$15,0)", "=IFERROR(B49/B45,0)"];
sheet.getRange("B44:B54").formulas = pnl.map((x) => [x]);
style("A44:A54", { wrapText: true });
style("A44:B44", { fill: lightBlue, font: { bold: true, color: ink } });
style("A49:B49", { fill: lightBlue, font: { bold: true, color: ink }, borders: { top: { style: "medium", color: blue } } });
style("A50:B50", { fill: lightRed, font: { bold: true, color: red }, borders: { top: { style: "medium", color: blue } } });
sheet.getRange("B44:B50").format.numberFormat = vnd;
sheet.getRange("B51").format.numberFormat = pct;
sheet.getRange("B52").format.numberFormat = multiple;
sheet.getRange("B53").format.numberFormat = vnd;
sheet.getRange("B54").format.numberFormat = multiple;

sheet.getRange("A57").values = [["ĐỘ NHẠY — CHI PHÍ HỘI THOẠI & FEP 72H"]];
style("A57:J57", { fill: blue, font: { bold: true, color: "#FFFFFF" } });
sheet.getRange("A58:J58").values = [["Kịch bản", "Ads/chat IDR", "Ads/chat VND", "Hội thoại", "Chi phí Ads", "Doanh thu @3.0x", "Phí WhatsApp", "Tổng chi phí", "Đóng góp", "Revenue / Tổng CP"]];
style("A58:J58", { fill: lightBlue, font: { bold: true, color: ink }, horizontalAlignment: "center", wrapText: true, borders: { preset: "inside", style: "thin", color: border } });
sheet.getRange("A59:J62").values = [
  ["Thấp + FEP", null, null, null, null, null, null, null, null, null],
  ["Cơ sở + FEP", null, null, null, null, null, null, null, null, null],
  ["Cao + FEP", null, null, null, null, null, null, null, null, null],
  ["Cơ sở không FEP", null, null, null, null, null, null, null, null, null],
];
formula("B59", "=$B$16"); formula("B60", "=$B$17"); formula("B61", "=$B$18"); formula("B62", "=$B$17");
for (const r of [59, 60, 61, 62]) {
  formula(`C${r}`, `=B${r}*$B$19`);
  formula(`D${r}`, "=$B$15");
  formula(`E${r}`, `=C${r}*D${r}`);
  formula(`F${r}`, `=E${r}*$B$22`);
  formula(`G${r}`, r === 62 ? "=$I$19+$I$21" : "=$I$19");
  formula(`H${r}`, `=E${r}+G${r}+$B$27+$B$28`);
  formula(`I${r}`, `=F${r}-H${r}`);
  formula(`J${r}`, `=IFERROR(F${r}/H${r},0)`);
}
style("A60:J60", { fill: lightGreen, font: { bold: true, color: green } });
style("A62:J62", { fill: lightAmber, font: { bold: true, color: amber } });
sheet.getRange("B59:B62").format.numberFormat = idr;
for (const range of ["C59:C62", "E59:I62"]) sheet.getRange(range).format.numberFormat = vnd;
sheet.getRange("D59:D62").format.numberFormat = count;
sheet.getRange("J59:J62").format.numberFormat = multiple;

sheet.getRange("A64").values = [["CHÍNH SÁCH CỬA SỔ NHẮN TIN — CÁCH ÁP DỤNG VÀO FLOW"]];
style("A64:J64", { fill: blue, font: { bold: true, color: "#FFFFFF" } });
sheet.getRange("A65").values = [["24 giờ — Customer Service Window: mở và reset mỗi khi khách nhắn. Tin non-template chỉ được gửi trong cửa sổ này."]];
sheet.getRange("A66").values = [["Sau 24 giờ: doanh nghiệp chỉ có thể chủ động tiếp cận lại bằng template đã được phê duyệt."]];
sheet.getRange("A67").values = [["72 giờ — Free Entry Point: chỉ áp dụng khi khách vào từ Click-to-WhatsApp Ads/Facebook CTA và doanh nghiệp phản hồi trong 24 giờ. Đây không phải cửa sổ dịch vụ thông thường."]];
sheet.getRange("A68").values = [["Meta Business Agent: tính phí token từ 01/08/2026 ngay cả trong FEP 72 giờ; mức tham chiếu $2/1 triệu token, thường 20.000–25.000 token/tin."]];
sheet.getRange("A69").values = [["Từ 01/10/2026: service message và utility gửi trong cửa sổ 24 giờ bắt đầu bị tính phí; service có đơn giá bằng utility/authentication theo từng thị trường."]];
for (const row of [65, 66, 67, 68, 69]) style(`A${row}:J${row}`, { fill: row === 68 ? lightAmber : paleBlue, font: { color: row === 68 ? amber : ink, bold: row === 68 }, wrapText: true });

sheet.getRange("A72").values = [["NGUỒN & QUY ƯỚC"]];
style("A72:J72", { fill: blue, font: { bold: true, color: "#FFFFFF" } });
sheet.getRange("A73:D73").values = [["Hạng mục", "Giá trị dùng trong model", "Nguồn", "URL / ghi chú"]];
style("A73:D73", { fill: lightBlue, font: { bold: true, color: ink }, horizontalAlignment: "center" });
sheet.getRange("A74:D79").values = [
  ["Chính sách giá & 24h/72h", "Per delivered message", "Meta for Developers", "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing"],
  ["Meta Business Agent", "$2/1M token; 20K–25K token/tin", "Meta for Developers", "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages"],
  ["Rate card Indonesia", "Marketing $0.0411; Utility $0.0250", "Meta rate card 01/07/2026", "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing#rates"],
  ["Tỷ giá IDR/VND", "1 IDR = 1.46448696 VND", "XE 05/08/2026", "https://www.xe.com/en-us/currencyconverter/convert/?Amount=1&From=IDR&To=VND"],
  ["Tỷ giá USD/VND", "1 USD = 26,237.82 VND", "XE 05/08/2026", "https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=VND"],
  ["Benchmark CTWA Indonesia", "Rp1.500–5.000/chat", "Berdu.id", "https://berdu.id/blog/dari-iklan-ke-chat-merancang-click-to-whatsapp-yang-menghasilkan-penjualan-bukan-sekadar-lead"],
];
style("A74:A79", { fill: paleBlue, font: { bold: true, color: ink } });
style("D74:D79", { font: { color: "#1155CC" }, wrapText: true });

sheet.getRange("A82").values = [["KIỂM TRA MÔ HÌNH"]];
formula("G82", '="MODEL STATUS: "&IF(COUNTIF(C84:C88,"CHECK")=0,"PASS","FAIL")');
style("A82:F82", { fill: blue, font: { bold: true, color: "#FFFFFF" } });
style("G82:J82", { fill: navy, font: { bold: true, color: "#FFFFFF" }, horizontalAlignment: "center" });
sheet.getRange("A83:D83").values = [["Kiểm tra", "Giá trị", "Trạng thái", "Ghi chú"]];
style("A83:D83", { fill: lightBlue, font: { bold: true, color: ink }, horizontalAlignment: "center" });
sheet.getRange("A84:D88").values = [
  ["Tổng hội thoại = 6.000", null, null, "100/ngày × 60 ngày"],
  ["Doanh thu = Ads × ROAS", null, null, "Sai lệch phải bằng 0"],
  ["Phí WhatsApp = các bước + VAT", null, null, "Tie-out flow"],
  ["Nhân sự + Smax = 0", null, null, "Theo brief"],
  ["Đơn vị mô hình = VND", null, null, "Không còn số tiền P&L bằng IDR"],
];
formula("B84", "=$B$15"); formula("B85", "=B44-B45*$B$22"); formula("B86", "=$I$19-(SUM($I$13:$I$16)*(1+$B$26))"); formula("B87", "=$B$27+$B$28"); formula("B88", "=1");
formula("C84", '=IF(B84=6000,"OK","CHECK")'); formula("C85", '=IF(ABS(B85)<1,"OK","CHECK")'); formula("C86", '=IF(ABS(B86)<1,"OK","CHECK")'); formula("C87", '=IF(B87=0,"OK","CHECK")'); formula("C88", '=IF(B88=1,"OK","CHECK")');
sheet.getRange("B84").format.numberFormat = count;
sheet.getRange("B85:B87").format.numberFormat = vnd;
sheet.getRange("C84:C88").conditionalFormats.add("containsText", { text: "OK", format: { fill: lightGreen, font: { bold: true, color: green } } });
sheet.getRange("C84:C88").conditionalFormats.add("containsText", { text: "CHECK", format: { fill: lightRed, font: { bold: true, color: red } } });

const widths = { A: 235, B: 135, C: 130, D: 270, E: 170, F: 225, G: 120, H: 135, I: 155, J: 300 };
for (const [col, px] of Object.entries(widths)) sheet.getRange(`${col}1:${col}88`).format.columnWidthPx = px;
sheet.getRange("1:1").format.rowHeightPx = 44;
sheet.getRange("2:2").format.rowHeightPx = 28;
sheet.getRange("3:3").format.rowHeightPx = 40;
for (const row of [5, 11, 42, 57, 64, 72, 82]) sheet.getRange(`${row}:${row}`).format.rowHeightPx = 30;
for (const row of [6, 8]) sheet.getRange(`${row}:${row}`).format.rowHeightPx = 50;
for (const row of [12, 43, 58, 73, 83]) sheet.getRange(`${row}:${row}`).format.rowHeightPx = 42;
for (const row of [59, 60, 61, 62]) sheet.getRange(`${row}:${row}`).format.rowHeightPx = 36;
for (const row of [65, 66, 67, 68, 69, 74, 75, 76, 77, 78, 79]) sheet.getRange(`${row}:${row}`).format.rowHeightPx = 46;

sources.showGridLines = false;
sources.freezePanes.freezeRows(3);
sources.getRange("A1:F1").merge();
sources.getRange("A2:F2").merge();
sources.getRange("A1").values = [["NGUỒN GIÁ & GIẢ ĐỊNH — WHATSAPP INDONESIA"]];
sources.getRange("A2").values = [["Cập nhật 05/08/2026 | Kiểm tra lại Meta rate card và tỷ giá trước khi ký ngân sách"]];
sources.getRange("A1:F1").format = { fill: navy, font: { name: "Arial", size: 16, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center" };
sources.getRange("A2:F2").format = { fill: navy, font: { name: "Arial", size: 10, color: "#C6DCFF" }, horizontalAlignment: "center" };
sources.getRange("A4:F4").values = [["Đầu vào", "Giá trị", "Đơn vị", "Nguồn", "URL", "Ghi chú áp dụng"]];
sources.getRange("A4:F4").format = { fill: blue, font: { bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", wrapText: true };
sources.getRange("A5:F12").values = [
  ["CTWA cost/chat — thấp", 1500, "IDR/chat", "Berdu.id", "https://berdu.id/blog/dari-iklan-ke-chat-merancang-click-to-whatsapp-yang-menghasilkan-penjualan-bukan-sekadar-lead", "Benchmark thị trường"],
  ["CTWA cost/chat — cơ sở", 3000, "IDR/chat", "Berdu.id", "https://berdu.id/blog/dari-iklan-ke-chat-merancang-click-to-whatsapp-yang-menghasilkan-penjualan-bukan-sekadar-lead", "Dùng trong P&L"],
  ["CTWA cost/chat — cao", 5000, "IDR/chat", "Berdu.id", "https://berdu.id/blog/dari-iklan-ke-chat-merancang-click-to-whatsapp-yang-menghasilkan-penjualan-bukan-sekadar-lead", "Benchmark thận trọng"],
  ["Marketing — Indonesia", 0.0411, "USD/message", "Meta rate card", "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing#rates", "Hiệu lực 01/07/2026"],
  ["Utility — Indonesia", 0.025, "USD/message", "Meta rate card", "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing#rates", "Hiệu lực 01/07/2026"],
  ["Meta Business Agent", 2, "USD/1M token", "Meta for Developers", "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages", "Hiệu lực 01/08/2026"],
  ["IDR/VND", 1.46448696, "VND/IDR", "XE", "https://www.xe.com/en-us/currencyconverter/convert/?Amount=1&From=IDR&To=VND", "05/08/2026"],
  ["USD/VND", 26237.82, "VND/USD", "XE", "https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=VND", "05/08/2026"],
];
sources.getRange("A5:A12").format = { fill: paleBlue, font: { bold: true, color: ink } };
sources.getRange("E5:E12").format = { font: { color: "#1155CC" }, wrapText: true };
sources.getRange("A1:F12").format.font.name = "Arial";
for (const [col, px] of Object.entries({ A: 220, B: 130, C: 120, D: 180, E: 430, F: 280 })) sources.getRange(`${col}1:${col}12`).format.columnWidthPx = px;
sources.getRange("5:12").format.rowHeightPx = 46;

await fs.mkdir(outDir, { recursive: true });
const mainPreview = await wb.render({ sheetName: "P&L WhatsApp", range: "A1:J88", scale: 1, format: "png" });
await fs.writeFile(`${outDir}/preview-pnl.png`, new Uint8Array(await mainPreview.arrayBuffer()));
const sourcePreview = await wb.render({ sheetName: "Nguồn & Giả định", range: "A1:F12", scale: 1, format: "png" });
await fs.writeFile(`${outDir}/preview-sources.png`, new Uint8Array(await sourcePreview.arrayBuffer()));

const inspect = await wb.inspect({ kind: "table", range: "P&L WhatsApp!A42:D54", include: "values,formulas", tableMaxRows: 20, tableMaxCols: 8, maxChars: 6000 });
console.log(inspect.ndjson);
const errors = await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 100 }, summary: "final formula error scan" });
console.log(errors.ndjson);
const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(outputPath);
console.log(JSON.stringify({ outputPath }));
