# Continuity: Smax Landing Page Development Memory

Tài liệu này lưu giữ trạng thái, quyết định thiết kế và bài học kỹ thuật quan trọng của dự án Smax Web để đảm bảo tính liên tục của ngữ cảnh phát triển cho các session tiếp theo.

* **Active Goal:** Tích hợp nút "Thêm Block / Section" trực tiếp vào giao diện Preview của Smax CMS.
* **Next Actions:**
  1. Kiểm thử thủ công việc chèn nút helper nội tuyến ở cuối mỗi container [data-cms].
  2. Kiểm tra tương tác click nút tự động chuyển sang tab Blocks và highlight.
  3. Kiểm tra cơ chế cleanEditorHtml loại bỏ helper trước khi lưu trữ database.
* **Current Phase:** planning
* **Working Context:** Bổ sung các nút helper nội tuyến (+ Thêm Block / Section) có thuộc tính contenteditable="false". Viết cleanEditorHtml lọc bỏ helper trước khi lưu để giữ database sạch sẽ.


---

## 💡 2. Bài Học & Bẫy CSS Quan Trọng (Key Learnings & CSS Traps)
* **Position Sticky & Overflow:** Thuộc tính `position: sticky` sẽ **không hoạt động** nếu bất kỳ phần tử cha trực tiếp hoặc tổ tiên nào có `overflow: hidden` hoặc `overflow-x: hidden`. 
  * *Bài học:* Luôn gỡ bỏ `overflow-x: hidden` trên wrapper dùng chung và đặt trực tiếp lên `body`.
* **Kích thước Stacked Cards:** Phải cố định chiều cao của `.stacked-card` (ở mức `440px`) và `.stacked-card-media` (ở mức `320px`) kết hợp `object-fit: cover` để tránh việc ảnh screenshot quá khổ làm phình card, gây tràn màn hình và vỡ layout xếp chồng.
* **Tỷ lệ Grid trong Stacked Card:** Đặt `grid-template-columns: 1.25fr 1fr` (phần chữ lớn hơn phần ảnh) để mockup ảnh thu nhỏ vừa vặn, không bị lấn át phần text mô tả.
* **Tọa độ tương đối trên Heatmap:** Sử dụng phần trăm chiều rộng (`x_pct`) của tài liệu để đồng bộ hóa toạ độ click của khách hàng trên các kích thước màn hình khác nhau. Khi vẽ đè Canvas trong iframe, chỉ cần nhân lại tỉ lệ % với chiều rộng thực của iframe tại thời điểm đó để đảm bảo toạ độ click chuẩn 100% trên các thiết bị.
* **Lazy loading các thư viện CDN trong CMS:** Chỉ nên chèn và khởi tạo các thư viện nặng (như Chart.js) động bằng JS khi Admin bấm vào phân hệ tương ứng. Điều này giữ cho trang CMS ban đầu tải siêu nhanh.
* **Gộp truy vấn thống kê qua SQL RPC:** Thay vì gửi 6-7 truy vấn riêng lẻ từ client lên database để lấy số liệu KPIs, bảng biểu đồ và danh sách sự kiện, hãy viết một hàm RPC trên PostgreSQL đóng gói toàn bộ dữ liệu dưới dạng JSONB. Việc này tối ưu hoá mạng, tăng tốc hiển thị dashboard lên gấp 10 lần và là cơ hội để chèn logic dọn dẹp dữ liệu tự động (ví dụ: xoá các bản ghi cũ hơn 90 ngày) mỗi khi chạy.

---

## 🚀 3. Bước Tiếp Theo (Next Steps)
* **Nhân bản các trang phân hệ khác:** Khi có yêu cầu làm các trang tính năng tiếp theo (Chatbot, GenAI, AI Insight...), đọc file quy chuẩn [docs/feature-page-playbook.md](file:///d:/vibe-coding/newweb%20smax/docs/feature-page-playbook.md) để áp dụng nguyên vẹn cấu trúc Bento & Stacked Cards đã tối ưu.
* Sử dụng bộ ảnh tương ứng từ folder `UI chính thức của Smax` khi làm các phân hệ đó.

