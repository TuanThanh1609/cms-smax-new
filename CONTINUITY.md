# Continuity: Smax Landing Page Development Memory

Tài liệu này lưu giữ trạng thái, quyết định thiết kế và bài học kỹ thuật quan trọng của dự án Smax Web để đảm bảo tính liên tục của ngữ cảnh phát triển cho các session tiếp theo.

## 📌 1. Trạng Thế Hiện Tại (Current Status)
* **Active Goal:** Triển khai hệ thống Smax CMS quản lý nội dung/hình ảnh toàn website (Supabase + Vercel SSG + Admin Dashboard).
* **Next Actions:**
  1. Khởi tạo cấu trúc bảng dữ liệu `site_content` trên database Supabase.
  2. Xây dựng File build script SDK `scripts/build.js` để tích hợp dữ liệu Supabase vào HTML tĩnh tại Vercel build-time.
  3. Phát triển trang quản trị trực quan `/admin.html` cho quản trị viên đăng nhập và chỉnh sửa bài viết/ảnh.
* **Current Phase:** planning
* **Working Context:** Triển khai hệ thống CMS độc lập giúp quản lý thông tin toàn website. Sử dụng phương pháp JAMstack (Static Site Generation) để giữ nguyên tốc độ load 0ms của Vercel và tối ưu hóa SEO 100% (crawlers đọc trực tiếp HTML đã build sẵn, database Supabase chỉ query lúc build-time/deploy).


---

## 💡 2. Bài Học & Bẫy CSS Quan Trọng (Key Learnings & CSS Traps)
* **Position Sticky & Overflow:** Thuộc tính `position: sticky` sẽ **không hoạt động** nếu bất kỳ phần tử cha trực tiếp hoặc tổ tiên nào có `overflow: hidden` hoặc `overflow-x: hidden`. 
  * *Bài học:* Luôn gỡ bỏ `overflow-x: hidden` trên wrapper dùng chung và đặt trực tiếp lên `body`.
* **Kích thước Stacked Cards:** Phải cố định chiều cao của `.stacked-card` (ở mức `440px`) và `.stacked-card-media` (ở mức `320px`) kết hợp `object-fit: cover` để tránh việc ảnh screenshot quá khổ làm phình card, gây tràn màn hình và vỡ layout xếp chồng.
* **Tỷ lệ Grid trong Stacked Card:** Đặt `grid-template-columns: 1.25fr 1fr` (phần chữ lớn hơn phần ảnh) để mockup ảnh thu nhỏ vừa vặn, không bị lấn át phần text mô tả.

---

## 🚀 3. Bước Tiếp Theo (Next Steps)
* **Nhân bản các trang phân hệ khác:** Khi có yêu cầu làm các trang tính năng tiếp theo (Chatbot, GenAI, AI Insight...), đọc file quy chuẩn [docs/feature-page-playbook.md](file:///d:/vibe-coding/newweb%20smax/docs/feature-page-playbook.md) để áp dụng nguyên vẹn cấu trúc Bento & Stacked Cards đã tối ưu.
* Sử dụng bộ ảnh tương ứng từ folder `UI chính thức của Smax` khi làm các phân hệ đó.

