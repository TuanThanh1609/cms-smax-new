---
name: "imagegen-codex"
description: "Generate or edit raster images using the built-in generate_image tool when the task benefits from AI-created bitmap visuals (photos, illustrations, mockups, UI components, sprites, etc.). Do not use when the task is better handled by code (HTML/CSS/SVG)."
---

# Image Generation Skill (Codex Adapted for Antigravity)

Kỹ năng này giúp Antigravity tạo hoặc chỉnh sửa hình ảnh bitmap (hình ảnh raster như PNG, JPG, WebP) cho dự án (ảnh minh họa, ảnh nền website, UI mockups, sản phẩm, thiết kế logo, biểu đồ) bằng cách sử dụng công cụ built-in `generate_image`.

## Quy tắc sử dụng công cụ

- **Công cụ duy nhất:** Luôn sử dụng công cụ built-in **`generate_image`** cho mọi yêu cầu tạo mới hoặc chỉnh sửa hình ảnh.
- **Tham số đầu vào:**
  - `Prompt`: Mô tả chi tiết hình ảnh mong muốn.
  - `ImageName`: Tên hình ảnh sẽ lưu. Sử dụng ký tự thường và gạch dưới (ví dụ: `hero_banner_background`).
  - `ImagePaths` (tùy chọn): Chứa tối đa 3 đường dẫn ảnh hiện có trong workspace nếu cần chỉnh sửa, kết hợp hoặc lấy phong cách từ ảnh đó.
- **Quy tắc về độ trong suốt (Transparency/Tách nền):**
  - Nếu người dùng yêu cầu ảnh có nền trong suốt, hãy viết prompt yêu cầu tạo ảnh với một màu nền phẳng, đơn sắc (chroma-key background như màu xanh lá neon hoặc màu đen thuần/trắng thuần).
  - Sau khi ảnh được tạo, sử dụng script bổ trợ Node.js tại thư mục `scripts/remove_chroma_key.js` thông qua terminal (`run_command`) để tiến hành tách nền tự động. Script sẽ tự động tạo thêm một phiên bản ảnh tối ưu định dạng `.webp` bên cạnh file ảnh `.png` gốc để tối ưu SEO và tải trang.

## Quy tắc lưu trữ và quản lý đường dẫn file

- **Thư mục mặc định:** Khi gọi công cụ `generate_image`, Antigravity sẽ tự động tạo và lưu ảnh kết quả vào thư mục artifact (`C:\Users\Te\.gemini\antigravity\brain\<conversation-id>\`).
- **Precedence về lưu trữ file:**
  1. Nếu người dùng chỉ định cụ thể thư mục lưu (ví dụ: thư mục `public/` hoặc `assets/` trong dự án), hãy copy/di chuyển ảnh từ thư mục artifact về thư mục chỉ định đó ngay sau khi tạo xong.
  2. Nếu hình ảnh được tạo ra nhằm mục đích sử dụng trực tiếp trong mã nguồn của website/dự án, hãy chủ động lưu hoặc copy nó vào thư mục làm việc thích hợp của dự án (ví dụ: `d:\vibe-coding\newweb smax\public\` hoặc thư mục ảnh hiện tại của dự án).
  3. Nếu ảnh chỉ nhằm mục đích xem trước, brainstorm hoặc thảo luận, có thể hiển thị trực tiếp bằng cú pháp markdown mà không cần copy vào workspace.
- **Tính phi hủy hoại:** Không bao giờ ghi đè trực tiếp lên một asset ảnh hiện có của dự án trừ khi người dùng yêu cầu rõ ràng. Hãy tạo ra các phiên bản khác nhau (ví dụ: `logo_v2.png`, `banner_updated.png`).

## Khi nào nên dùng
- Tạo hình ảnh mới (concept art, ảnh sản phẩm, ảnh nền anh hùng website - hero banner).
- Tạo ảnh dựa trên phong cách, bố cục hoặc màu sắc của một hoặc nhiều hình ảnh tham chiếu (truyền vào `ImagePaths`).
- Chỉnh sửa ảnh hiện có (thay đổi ánh sáng, thời tiết, thay thế phông nền, loại bỏ vật thể, tách nền).
- Tạo nhiều biến thể ảnh cho cùng một yêu cầu.

## Khi nào KHÔNG nên dùng
- Tạo các biểu tượng (icons), logo dạng vector (SVG) có thể code trực tiếp bằng mã HTML/CSS/SVG.
- Chỉnh sửa nhỏ trên các hình ảnh đã có định dạng vector gốc dễ chỉnh sửa.
- Bất kỳ tác vụ nào người dùng muốn có kết quả dạng code hiển thị chính xác thay vì hình ảnh bitmap cố định.

## Quy trình làm việc (Workflow)
1. Xác định rõ mục đích: Tạo mới hoàn toàn (`generate`) hay chỉnh sửa từ ảnh có sẵn (`edit`).
2. Xác định xem ảnh sẽ được dùng trực tiếp trong mã nguồn hay chỉ để xem trước.
3. Thu thập thông tin đầu vào: prompt chi tiết, các yếu tố cần tránh, các hình ảnh tham chiếu hiện có.
4. Gắn nhãn rõ ràng cho các ảnh tham chiếu (ví dụ: `Image 1: ảnh cần chỉnh sửa`, `Image 2: ảnh tham chiếu phong cách`).
5. Gọi công cụ `generate_image` với các tham số tương ứng.
6. **BẮT BUỘC Kiểm duyệt hình ảnh:** AI phải luôn mở xem lại hình ảnh thành phẩm (bằng công cụ `view_file`) ngay sau khi tạo xong để tự đối chiếu với prompt ban đầu. 
   - Đảm bảo các nhãn văn bản (text labels) đúng chính tả, không có ký tự/chữ vô nghĩa (gibberish/dummy text).
   - Đảm bảo đầy đủ các chi tiết bố cục, không bị crop mất các bộ phận chủ thể.
   - Nếu phát hiện bất kỳ lỗi nào hoặc ảnh không khớp 100% với prompt gốc, AI **PHẢI** lập tức tinh chỉnh prompt và lặp lại quy trình tạo ảnh mới cho đến khi đạt độ hoàn hảo tuyệt đối.
7. Sau khi ảnh đạt chất lượng kiểm duyệt, tiến hành tách nền (nếu là ảnh trong suốt) và copy ảnh từ thư mục artifact của Antigravity vào thư mục đích trong workspace và cập nhật mã nguồn để liên kết đến ảnh mới.
