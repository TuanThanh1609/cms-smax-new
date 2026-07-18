# 9.8.3. TÍCH HỢP CHATBOT

*Nguồn: [docs.smax.ai/vi/tich-hop-chatbot](http://docs.smax.ai/vi/tich-hop-chatbot)*

# Hướng dẫn Tích hợp Form vào Chatbot để Tối ưu Thu thập Thông tin

Thay vì chat qua lại để xin thông tin, bạn nên cung cấp một biểu mẫu chuyên nghiệp để khách hàng điền thông tin tập trung. Điều này không chỉ giúp dữ liệu chính xác hơn mà còn tăng đáng kể tỷ lệ chuyển đổi đơn hàng.

### 💡 Khi nào bạn nên sử dụng Form thay vì đặt câu hỏi chat?

Hãy sử dụng Form khi bạn cần thu thập nhiều thông tin cùng lúc để tránh làm gián đoạn trải nghiệm của khách hàng:

* **Thu thập thông tin chi tiết:** Khi cần lấy nhiều trường dữ liệu (Họ tên, SĐT, Địa chỉ, Yêu cầu cụ thể, Ngày sinh...).

* **Đăng ký dịch vụ/Đặt lịch:** Khách hàng đăng ký tư vấn, đặt lịch hẹn khám/spa hoặc nhận voucher ưu đãi.

* **Khảo sát & Đánh giá:** Lấy feedback chi tiết về sản phẩm/dịch vụ sau khi khách hàng mua hàng.

### 🛠 Điều kiện chuẩn bị

Để bắt đầu tích hợp, bạn cần đảm bảo hai điều kiện sau:

* Đã tạo Form trong module **Form Builder**.

* Có quyền truy cập và quản trị module **Bot-Auto**.

### 🚀 Hướng dẫn chi tiết các bước thực hiện

#### Bước 1: Tạo điểm chạm (Nút bấm) trong Bot-Auto

Đầu tiên, bạn cần tạo một vị trí trong luồng chat để khách hàng có thể nhấn vào và mở Form.

* Truy cập module **Bot-Auto**, tạo một block (tin nhắn) mới.

* Thêm một thẻ **Messenger Text** (văn bản) hoặc **Messenger Gallery** (hình ảnh/danh mục) để dẫn dắt khách hàng.

* Tạo một **Button (Nút bấm)** trong thẻ đó.

*Mẹo:* Đặt tên nút thu hút như *"Đăng ký ngay"*, *"Nhận tư vấn miễn phí"* thay vì *"Điền Form"*.

<img src="./ui-tich-hop/tich-hop-chatbot_img_bf1a0fc4.png" alt="9.8.3. TÍCH HỢP CHATBOT" />

#### Bước 2: Cấu hình hiển thị Form (Webview)

* Trong phần cài đặt của Button vừa tạo, chọn tab **Webview**.

* Tại mục chọn nguồn, chọn **Form Builder**.

* Chọn chính xác tên **Form** mà bạn đã tạo trước đó.

<img src="./ui-tich-hop/tich-hop-chatbot_img_793d8d91.png" alt="9.8.3. TÍCH HỢP CHATBOT" />

#### Bước 3: Thiết lập lời cảm ơn tự động (Confirmation)

Đừng để khách hàng rơi vào trạng thái "im lặng" sau khi nhấn Gửi (Submit). Một lời xác nhận sẽ giúp khách hàng yên tâm rằng thông tin đã được gửi đi thành công.

* 
Tại mục **Gửi block khi xác nhận**, hãy chọn một block có sẵn hoặc tạo block mới chứa nội dung thông báo xác nhận.

* 
Nội dung thông báo nên ngắn gọn, rõ ràng và cho khách hàng biết bước tiếp theo.

* 
**Ví dụ:**

*Cảm ơn bạn đã gửi thông tin. Chúng tôi đã nhận được yêu cầu của bạn và chuyên viên sẽ liên hệ để hỗ trợ trong vòng 30 phút. Vui lòng giữ liên lạc để không bỏ lỡ cuộc gọi hoặc tin nhắn từ chúng tôi.*

### 🌟 Kịch bản ứng dụng thực tế (User Journey)

Thay vì chỉ tạo Form để thu thập thông tin, hãy tích hợp Form vào quy trình vận hành thực tế nhằm nâng cao hiệu quả xử lý và tối ưu tỷ lệ chuyển đổi.

Ngành hàngQuy trình áp dụng (Workflow)Mục tiêu**Spa/Nha khoa**Tư vấn dịch vụ → Gửi Form đặt lịch → Nhân viên liên hệ xác nhận thời gian hẹn.Đặt lịch chính xác, giảm tỷ lệ khách hàng quên hoặc bỏ lỡ lịch hẹn.**Bất động sản**Giới thiệu dự án → Gửi Form đăng ký xem nhà → Điều phối nhân viên tư vấn và sắp xếp lịch xem nhà.Thu thập đầy đủ nhu cầu của khách hàng và tối ưu việc sắp xếp lịch hẹn.**Thương mại điện tử**Giao hàng thành công → Gửi Form đánh giá → Tặng mã ưu đãi sau khi khách hoàn thành phản hồi.Thu thập phản hồi thực tế để cải thiện chất lượng sản phẩm và dịch vụ.

### 📌 Mẹo tối ưu tỷ lệ chuyển đổi

* **Chỉ thu thập thông tin cần thiết:** Hạn chế yêu cầu quá nhiều trường dữ liệu. Form càng ngắn gọn, khách hàng càng có xu hướng hoàn thành.

* **Sử dụng lời kêu gọi hành động (CTA) rõ ràng:** Ưu tiên các thông điệp nhấn mạnh lợi ích như **"Nhận ưu đãi 20%"**, **"Đăng ký tư vấn miễn phí"** hoặc **"Nhận báo giá ngay"** thay vì các nút bấm chung chung như **"Gửi"**.

* **Kiểm tra thực tế:** Luôn sử dụng tính năng **Preview** hoặc dùng tài khoản cá nhân chat thử với Bot để đảm bảo Form hiển thị đúng và dữ liệu đổ về hệ thống chính xác.
