# 2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI

*Nguồn: [docs.smax.ai/vi/huong-dan-tich-hop-lark-smaxai](http://docs.smax.ai/vi/huong-dan-tich-hop-lark-smaxai)*

# Hướng dẫn Tích hợp Lark Base với SmaxAI: Tự động hóa quy trình chăm sóc khách hàng

Việc kết nối Lark Base với SmaxAI giúp doanh nghiệp loại bỏ các thao tác thủ công, chuyển đổi dữ liệu tức thì từ bảng quản lý sang hành động chăm sóc khách hàng tự động. Thay vì phải copy-paste số điện thoại để kết bạn Zalo hay gửi tin nhắn, hệ thống sẽ tự động thực hiện ngay khi trạng thái khách hàng thay đổi trên Lark.

## 🚀 Các kịch bản ứng dụng thực tế (Use Cases)

Trước khi bắt đầu cài đặt, bạn có thể tham khảo các kịch bản mà doanh nghiệp thường áp dụng:

* **Tự động kết bạn Zalo:** Khi trạng thái khách hàng trên Lark Base chuyển sang "Tiềm năng" → SmaxAI tự động gửi lời mời kết bạn Zalo.

* **Thông báo tức thì cho Sales:** Khi có một dòng dữ liệu mới (Lead) đổ về Lark Base → SmaxAI gửi tin nhắn thông báo cho nhân viên phụ trách qua Zalo/Facebook.

* **Chăm sóc sau bán hàng:** Khi trạng thái đơn hàng trên Lark chuyển thành "Đã giao hàng" → SmaxAI tự động gửi tin nhắn khảo sát mức độ hài lòng.

## 🛠 Hướng dẫn cài đặt chi tiết

Để tích hợp thành công, bạn cần thực hiện qua 3 giai đoạn: Kết nối kênh → Tạo điểm kích hoạt (Trigger) → Thiết lập kịch bản.

### Giai đoạn 1: Tạo Automation Channel (Kết nối Lark với SmaxAI)

Đây là bước thiết lập "đường truyền" để SmaxAI và Lark có thể nhận diện nhau.

* Tại màn hình **Nhắn tin**, chọn **Thêm Kênh** → Chọn kênh **Lark** → Chọn **Kết nối với tài khoản Lark**.

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_7d17c50b.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />  <img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_6be0fee1.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

* Chọn **Tạo Kênh Kết Nối Mới**, đặt tên cho kênh để dễ quản lý và nhấn **Lưu**.

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_d3512b82.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />  <img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_9980894a.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

* Tích chọn kênh vừa tạo, sau đó chọn **Thêm 1 kênh vào biz**.

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_f074a1c2.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

### Giai đoạn 2: Tạo Trigger Bot API (Điểm kích hoạt kịch bản)

Trigger Bot API đóng vai trò là một "địa chỉ" nhận lệnh. Khi Lark gửi một yêu cầu đến địa chỉ này, SmaxAI sẽ biết cần phải chạy kịch bản nào.

* Truy cập module **Bot - Auto** → Chọn **Kịch bản** → Chọn channel **Lark** vừa tạo ở Giai đoạn 1.

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_11c93bb5.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

* Nhấn dấu **(+)** để tạo một Trigger Bot API mới.

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_47994a44.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />  <img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_dff8aeb4.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

* **Cấu hình Trigger:**

Giữ nguyên các cài đặt mặc định.

* Tại phần **Dẫn tới Block**: Lựa chọn Block mà bạn muốn kịch bản bắt đầu chạy khi API được gọi.

* Nhấn **Lưu**.

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_ffb3e7ec.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

**Kết quả:** Sau bước này, bạn sẽ nhận được một đường dẫn API. Bạn sẽ dùng đường dẫn này để dán vào phần Automation của Lark Base.

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_991dddaf.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

### Giai đoạn 3: Triển khai thực tế (Use Case: Tự động kết bạn Zalo)

Giả sử bạn có một bảng Lark Base gồm 3 cột: **Họ tên**, **Số điện thoại** và **Tag**. Mục tiêu là: Khi cột **Tag** chuyển sang "Tiềm năng" → SmaxAI tự động gửi lời mời kết bạn Zalo tới số điện thoại tương ứng.

#### Bước 1: Cấu hình kịch bản trên SmaxAI

* Trong Block phản hồi của Trigger Bot API, thêm thẻ **Find/Add ZaloUser**.

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_bf69c69d.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

* **Thiết lập thuộc tính:**

Tạo một **Custom Attribute** tên là `{{sdt}}` (định dạng Text) để lưu số điện thoại gửi từ Lark về. Nhập attribute này vào ô **Số điện thoại**.

* Tích chọn: **Nếu tìm thấy user thì Kết bạn** và **Tạo mới khách hàng**.

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_854a72f5.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

#### Bước 2: Cấu hình Automation trên Lark Base

* Tại Lark Base, tạo một Automation mới: **Khi Tag thay đổi thành "Tiềm năng"** → Chọn hành động **Gọi một HTTP request**.

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_3adb4735.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

* Copy toàn bộ thông tin từ **Trigger Bot API** đã tạo ở Giai đoạn 2 và nhập vào Lark.

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_8f1e060c.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

* **Cấu hình phần Body (Dữ liệu gửi đi):**

`customer.pid`: Sử dụng giá trị từ cột **Số điện thoại** trên Lark Base (đây là ID định danh khách hàng trên SmaxAI).

<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_5df60e4c.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

`*   `customer.page_pid`: Lấy chuỗi ký tự (bắt đầu bằng `ctm...`) nằm phía sau đoạn `pid=` trên thanh địa chỉ trình duyệt của bạn.`
<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_275a3279.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

`*   **Phần attr (Thuộc tính bổ sung):**
    *   `field name`: Nhập tên attribute bạn đã đặt trên SmaxAI (ví dụ: `sdt`).
    *   `value`: Chọn giá trị từ cột **Số điện thoại** trên Lark Base.`
<img src="./ui-tich-hop/huong-dan-tich-hop-lark-smaxai_img_a2020482.png" alt="2. HƯỚNG DẪN TÍCH HỢP LARK - SMAXAI" />

* Nhấn **Save and Active** để kích hoạt quy trình.
