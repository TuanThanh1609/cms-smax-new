# 8.5.1. API

*Nguồn: [docs.smax.ai/vi/api](http://docs.smax.ai/vi/api)*

# API Smax: Kết nối Hệ sinh thái & Tự động hóa Vận hành

API (Application Programming Interface) của Smax đóng vai trò là "cầu nối kỹ thuật", cho phép chatbot Smax "giao tiếp" và trao đổi dữ liệu với các phần mềm bên thứ ba (như CRM, ERP, Website, Phần mềm quản lý kho, Kế toán...).

Thay vì phải nhập liệu thủ công giữa các hệ thống, API giúp doanh nghiệp tự động hóa hoàn toàn luồng dữ liệu, loại bỏ sai sót và mang lại trải nghiệm mua sắm tức thì cho khách hàng.

## 1. Khi nào doanh nghiệp bạn cần đến API?

Nếu bạn đang gặp phải một trong những "nỗi đau" dưới đây, API chính là giải pháp tối ưu:

Vấn đề hiện tạiGiải pháp với API SmaxKết quả đạt được**Nhập liệu thủ công:** Nhân viên phải copy SĐT, nhu cầu từ Landing Page/Website dán vào Smax để chăm sóc.Tự động đẩy dữ liệu từ Website sang Smax ngay khi khách nhấn "Gửi".Phản hồi khách hàng tức thì, tăng tỷ lệ chốt đơn.**Tra cứu chậm:** Khách hỏi tồn kho, nhân viên phải mở phần mềm kho kiểm tra rồi mới trả lời.Chatbot tự động gọi API sang kho để kiểm tra số lượng tồn thực tế.Trải nghiệm chuyên nghiệp, giảm tải cho nhân sự.**Dữ liệu rời rạc:** Đơn hàng chốt trên chat nhưng phải nhập tay lại vào phần mềm kế toán/vận chuyển.Tự động đẩy thông tin đơn hàng sang hệ thống vận chuyển/kế toán ngay khi chốt đơn.Quy trình vận hành trơn tru, không sai sót dữ liệu.**Thiếu thông tin chuyên sâu:** Muốn lưu trữ các thông tin đặc thù của khách mà giao diện mặc định không hỗ trợ.Lưu trữ dữ liệu vào các thuộc tính tùy chỉnh thông qua API.Phân loại khách hàng chính xác để Remarketing hiệu quả.

## 2. API Smax giúp bạn làm được gì?

Dựa trên hệ thống quản trị, API của Smax tập trung vào 4 khả năng mở rộng chính:

### 🎯 Cá nhân hóa trải nghiệm khách hàng

Cho phép tạo, cập nhật hoặc truy xuất các thông tin tùy chỉnh của khách hàng. Bạn có thể dùng dữ liệu này để gắn Tag phân loại khách hàng tự động và chạy các chiến dịch chăm sóc riêng biệt.

* **Xem chi tiết tại:** [Thuộc tính]([8.6. THUỘC TÍNH](/vi/thuoc-tinh)).

### 📊 Phân tích hành vi & Insight

Truy xuất các giá trị thuộc tính mà khách hàng đã cung cấp trong suốt phiên hội thoại. Điều này giúp doanh nghiệp hiểu rõ hành trình khách hàng và phân tích nhu cầu thực tế sau khi kết thúc chat.

* **Xem chi tiết tại:** [Phiên & Insight hội thoại]([9.18. PHIÊN & INSIGHT HỘI THOẠI](/vi/phien-insight-hoi-thoai)).

### 🤖 Tối ưu trí tuệ nhân tạo (AI & GenAI)

Kết nối API để điều chỉnh linh hoạt cách chatbot thu thập thông tin (Tên, Loại giá trị, Yêu cầu), giúp AI hiểu ngữ cảnh và phản hồi khách hàng tự nhiên, chính xác hơn.

* **Xem chi tiết tại:** [AI Chatbot](/vi/ai-chatbot-gLEgL1h4qW) và [GenAI]([9.16. GENAI](/vi/genai)).

### 📦 Đồng bộ danh mục sản phẩm

Tự động cập nhật Tên, Mô tả, Thương hiệu, URL, SKU từ hệ thống quản lý sản phẩm sang Smax. Đảm bảo chatbot luôn cung cấp thông tin sản phẩm mới nhất và chính xác nhất cho khách.

* **Xem chi tiết tại:** [Sản phẩm]([9.10. SẢN PHẨM](/vi/san-pham)).

## 3. Use case: Ứng dụng thực tế

### Kịch bản 1: Tự động hóa phễu bán hàng từ Landing Page

* **Luồng vận hành:** Khách để lại thông tin trên Landing Page → API đẩy dữ liệu sang **Thuộc tính tùy chỉnh** của Smax → Smax nhận diện khách mới → Kích hoạt kịch bản chào mừng theo đúng "Nhu cầu" khách đã chọn.

* **Giá trị:** Tốc độ phản hồi tính bằng giây, không bỏ sót bất kỳ lead nào.

### Kịch bản 2: Tra cứu tồn kho thời gian thực

* **Luồng vận hành:** Khách hỏi "Sản phẩm A còn size L không?" → Chatbot gọi API sang **Hệ thống quản lý kho** → API trả về số lượng tồn → Chatbot trả lời: "Dạ, sản phẩm A size L hiện còn 2 chiếc, anh/chị đặt ngay nhé!".

* **Giá trị:** Giảm 80% thời gian tư vấn thủ công cho những câu hỏi lặp đi lặp lại.

### Kịch bản 3: Đồng bộ đơn hàng sang hệ thống Kế toán/CRM

* **Luồng vận hành:** Khách chốt đơn trên Chatbot → API tự động đẩy thông tin (Tên, SĐT, Địa chỉ, Sản phẩm) sang phần mềm Kế toán/CRM → Hệ thống kế toán tự tạo hóa đơn và thông báo cho bộ phận đóng gói.

* **Giá trị:** Loại bỏ hoàn toàn thao tác nhập liệu thủ công, tránh sai sót địa chỉ/số điện thoại.

## 4. Hướng dẫn triển khai

### 💼 Dành cho Chủ doanh nghiệp/Quản lý

Bạn không cần biết viết code để sử dụng API. Bạn chỉ cần:

* Xác định bài toán cần giải quyết (Ví dụ: *"Tôi muốn đồng bộ khách từ Website về Smax"*).

* Gửi tài liệu này cho đội ngũ IT hoặc đối tác kỹ thuật của bạn.

* Yêu cầu họ thực hiện tích hợp dựa trên các Endpoint mà Smax cung cấp.

### 🛠️ Dành cho Đội ngũ Kỹ thuật (Developer)

Để bắt đầu tích hợp, vui lòng thực hiện theo luồng kỹ thuật sau:

* **Xác thực (Authentication):** Truy cập quản trị Smax để lấy **API Key** dùng cho định danh quyền truy cập.

* **Gửi yêu cầu (Request):** Sử dụng các phương thức HTTP chuẩn (`GET`, `POST`, `PUT`, `DELETE`) gửi đến các Endpoint tương ứng.

* **Xử lý phản hồi (Response):** Hệ thống trả về dữ liệu dưới dạng **JSON**. Bạn cần parse dữ liệu này để hiển thị lên chatbot hoặc lưu vào hệ thống nội bộ.

* **Kiểm tra & Tối ưu:** Theo dõi các mã lỗi (**Error Codes**) trả về để điều chỉnh request cho chính xác.
