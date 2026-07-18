# 9.21.2. TÍCH HỢP VÀO CHATBOT

*Nguồn: [docs.smax.ai/vi/tich-hop-vao-chatbot](http://docs.smax.ai/vi/tich-hop-vao-chatbot)*

# Hướng dẫn Tích hợp Mẫu tin nhắn vào Chatbot

Thẻ **Messenger Template** cho phép bạn gửi các mẫu tin nhắn chuyên nghiệp (đã được Meta phê duyệt) đến khách hàng thông qua kịch bản chatbot tự động.

Thay vì gửi những tin nhắn văn bản thông thường, việc sử dụng mẫu tin nhắn giúp thương hiệu của bạn trông uy tín hơn và đặc biệt là có khả năng gửi thông báo đến khách hàng ngay cả khi họ không tương tác với Page trong vòng 24 giờ.

<img src="./ui-tich-hop/tich-hop-vao-chatbot_img_317b0128.png" alt="9.21.2. TÍCH HỢP VÀO CHATBOT" />

**Điều kiện để sử dụng tính năng này:**

Để thẻ Messenger Template hoạt động, bạn cần hoàn thành 3 bước chuẩn bị sau:

* **Kích hoạt kho mẫu:** Bật mô-đun Mẫu tin nhắn trong hệ thống.

* **Thiết kế mẫu:** Tạo các mẫu tin nhắn tiện ích theo nhu cầu của doanh nghiệp.

* **Meta phê duyệt:** Chờ Meta kiểm duyệt nội dung mẫu (đây là yêu cầu bắt buộc từ Facebook).

👉 Vui lòng tham khảo **[[Kich hoat module](/vi/kich-hoat-module)](/vi/kich-hoat-module)** để biết chi tiết cách kích hoạt và tạo mẫu.

<img src="./ui-tich-hop/tich-hop-vao-chatbot_img_c53bb202.png" alt="9.21.2. TÍCH HỢP VÀO CHATBOT" />

### Các bước thiết lập chi tiết

#### Bước 1: Thêm thẻ vào kịch bản

Trong giao diện **Bot-Auto**, bạn tạo một khối mới, sau đó tìm và thêm thẻ **Messenger Template** vào khối này.

Tại đây, bạn cần **chọn chính xác Fanpage** mà mẫu tin nhắn đó đã được đăng ký và phê duyệt.

<img src="./ui-tich-hop/tich-hop-vao-chatbot_img_dfd8211e.png" alt="9.21.2. TÍCH HỢP VÀO CHATBOT" />

#### Bước 2: Lựa chọn mẫu tin nhắn

Tiếp theo, bạn **chọn một mẫu tin nhắn tiện ích** đã được phê duyệt từ thư viện mẫu của mình.

<img src="./ui-tich-hop/tich-hop-vao-chatbot_img_10e84146.png" alt="9.21.2. TÍCH HỢP VÀO CHATBOT" />

Sau khi chọn xong Trang và Mẫu, hệ thống sẽ hiển thị **Bản xem trước (Preview)**. Bạn hãy kiểm tra kỹ nội dung để đảm bảo thông tin hiển thị chính xác như mong muốn trước khi gửi cho khách hàng.

<img src="./ui-tich-hop/tich-hop-vao-chatbot_img_b76f9d90.png" alt="9.21.2. TÍCH HỢP VÀO CHATBOT" />

#### Bước 3: Cá nhân hóa nội dung (Sử dụng thông tin tự động)

Để tin nhắn không bị khô khan và tăng tỷ lệ chuyển đổi, bạn có thể chèn các **thông tin cá nhân hóa** (như Tên khách hàng, Mã đơn hàng, Ngày hẹn...) bằng cách nhập dấu `**{**`.

<img src="./ui-tich-hop/tich-hop-vao-chatbot_img_a3bc7892.png" alt="9.21.2. TÍCH HỢP VÀO CHATBOT" />

### 💡 Ứng dụng thực tế Use case

Bạn có thể áp dụng thẻ **Messenger Template** vào các kịch bản kinh doanh sau để tối ưu vận hành:

* **Xác nhận đơn hàng:** Thay vì nhắn tin thủ công, hãy dùng mẫu: *"Chào {first_name}, đơn hàng #{order_id} của bạn đã được xác nhận thành công!"* → Tạo sự chuyên nghiệp và tin tưởng tuyệt đối.

* **Thông báo vận chuyển:** Gửi tự động khi đơn hàng rời kho: *"Chào {first_name}, đơn hàng của bạn đang trên đường giao đến. Bạn có thể theo dõi tại đây..."* → Giảm tỷ lệ khách hàng hủy đơn do lo lắng.

* **Nhắc lịch hẹn:** Dành cho các Spa, Nha khoa, Phòng khám: *"Nhắc lịch: {first_name} có hẹn chăm sóc da vào lúc {time} ngày {date}. Hẹn gặp bạn nhé!"* → Giảm tỷ lệ khách quên lịch.
