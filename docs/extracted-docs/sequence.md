# 5.3.14.33. SEQUENCE

*Nguồn: [docs.smax.ai/vi/sequence](http://docs.smax.ai/vi/sequence)*

# Thẻ Sequence: Tự động hóa lộ trình chăm sóc khách hàng

Thẻ **Sequence** là công cụ mạnh mẽ giúp bạn đưa khách hàng vào một lộ trình chăm sóc tự động (kịch bản bám đuổi). Thay vì phải gửi tin nhắn thủ công cho từng người, bạn có thể thiết lập để hệ thống tự động chăm sóc khách hàng theo đúng thời điểm và nội dung đã định sẵn, giúp tăng tỷ lệ chuyển đổi và tối ưu hóa nguồn lực.

Để hiểu rõ hơn về cách xây dựng nội dung chăm sóc, mời bạn xem hướng dẫn: [KỊCH BẢN CHĂM SÓC](/vi/kich-ban-cham-soc)

### 1. Các chức năng chính

Thẻ Sequence cung cấp hai thao tác cơ bản để quản lý sự hiện diện của khách hàng trong kịch bản:

#### ➕ Thêm khách hàng vào kịch bản (ADD)

Sử dụng lệnh **ADD** khi bạn muốn khách hàng bắt đầu nhận các tin nhắn/hành động trong một kịch bản chăm sóc cụ thể.

<img src="./ui-remarketing/sequence_img_44bd96b9.png" alt="5.3.14.33. SEQUENCE" />

Khi chọn **ADD**, bạn có hai tùy chọn về thời gian kích hoạt:

* **NOW (Ngay lập tức):** Kịch bản bám đuổi sẽ khởi chạy ngay khi thẻ Sequence được kích hoạt.

* **AT (Hẹn giờ):** Kịch bản sẽ chỉ bắt đầu chạy vào một ngày hoặc khung giờ chính xác mà bạn cài đặt.

<img src="./ui-remarketing/sequence_img_debbaf93.png" alt="5.3.14.33. SEQUENCE" />

#### ➖ Xóa khách hàng khỏi kịch bản (REMOVE)

Sử dụng lệnh **REMOVE** để dừng toàn bộ lộ trình chăm sóc đối với một khách hàng. Điều này cực kỳ quan trọng để tránh việc gửi những tin nhắn không còn phù hợp (ví dụ: khách đã mua hàng nhưng vẫn nhận được tin nhắn thúc giục mua hàng).

### ⚠️ Lưu ý quan trọng về vận hành

Để đảm bảo hệ thống hoạt động chính xác và tránh trùng lặp nội dung, bạn cần tuân thủ quy tắc sau:

**Một khách hàng không thể được ADD vào một kịch bản nếu họ đang tồn tại trong kịch bản đó.**

Nếu bạn muốn thay đổi thời gian chạy hoặc khởi động lại kịch bản cho khách hàng, bạn **bắt buộc** phải: `REMOVE (Xóa khách hàng ra khỏi kịch bản hiện tại)` → `ADD (Thêm lại khách hàng vào kịch bản)`.

### 💡 Ví dụ ứng dụng thực tế Use case

Để giúp bạn dễ hình dung, dưới đây là 3 kịch bản phổ biến khi sử dụng thẻ Sequence:

**Trường hợp 1: Chào mừng khách hàng mới (Sử dụng ADD NOW)**

* **Luồng:** Khách hàng nhấn "Bắt đầu" → Hệ thống dùng thẻ **Sequence (ADD NOW)** → Khách hàng nhận ngay tin nhắn chào mừng và tài liệu giới thiệu sản phẩm.

**Trường hợp 2: Nhắc lịch hẹn/Tái khám (Sử dụng ADD AT)**

* **Luồng:** Khách hàng mua liệu trình chăm sóc da → Nhân viên cài đặt thẻ **Sequence (ADD AT)** vào ngày thứ 25 kể từ ngày mua → Đến đúng ngày 25, hệ thống tự động gửi tin nhắn nhắc khách hàng đặt lịch hẹn tái khám.

**Trường hợp 3: Ngừng bám đuổi khi đã chốt đơn (Sử dụng REMOVE)**

* **Luồng:** Khách hàng đang trong kịch bản "Thúc đẩy mua hàng" → Khách hàng chuyển trạng thái sang "Đã thanh toán" → Hệ thống dùng thẻ **Sequence (REMOVE)** → Khách hàng ngừng nhận các tin nhắn chào mời, tránh gây phiền phức và tạo trải nghiệm chuyên nghiệp.
