# 9.4. LUCKY WHEEL

*Nguồn: [docs.smax.ai/vi/lucky-wheel](http://docs.smax.ai/vi/lucky-wheel)*

## 🎯 Ứng dụng thực tế

Trước khi bắt đầu cài đặt, bạn có thể tham khảo các kịch bản triển khai hiệu quả sau:

* **Thu thập thông tin khách hàng:** Yêu cầu khách hàng để lại Số điện thoại/Email → Tặng lượt quay thưởng → Nhận Voucher giảm giá → Sales liên hệ tư vấn.

* **Kích cầu mua sắm:** Khách hàng hoàn tất đơn hàng trên 500k → Tặng 1 lượt quay → Trúng quà tặng kèm cho đơn hàng tiếp theo.

## 1. Kích hoạt module

Để bắt đầu sử dụng, bạn cần kích hoạt module trong hệ thống:

* Truy cập vào mục **Extend Modules**.

* Tìm kiếm module **Lucky Wheel**.

* Chọn **Active**.

Sau khi kích hoạt thành công, module sẽ xuất hiện tại danh sách menu phía bên trái màn hình.

<img src="./ui-gamification/lucky-wheel_img_ab1dac33.png" alt="9.4. LUCKY WHEEL" />

## 2. Tổng quan quản lý

Giao diện quản lý của Lucky Wheel được chia thành 2 khu vực chính:

* **Lucky Wheel:** Nơi quản lý tất cả các minigame bạn đã tạo. Tại đây, bạn có thể dễ dàng sao chép, chỉnh sửa hoặc xóa các game hiện có. <img src="./ui-gamification/lucky-wheel_img_93e5f8d3.png" alt="9.4. LUCKY WHEEL" />

* **Templates:** Thư viện các mẫu vòng quay có sẵn. Bạn có thể xem trước giao diện và kích hoạt nhanh để sử dụng mà không cần thiết kế từ đầu.

* <img src="./ui-gamification/lucky-wheel_img_ce04197f.png" alt="9.4. LUCKY WHEEL" />

## 3. Tạo mới minigame

Bạn có thể khởi tạo minigame theo 2 cách tùy vào nhu cầu:

### Cách 1: Sử dụng mẫu có sẵn (Nhanh chóng)

Phù hợp cho những bạn muốn triển khai nhanh, không yêu cầu tùy chỉnh sâu về thiết kế.

* Mở tab **Templates** → Chọn **Active** tại mẫu minigame bạn muốn sử dụng. <img src="./ui-gamification/lucky-wheel_img_818fa954.png" alt="9.4. LUCKY WHEEL" />

### Cách 2: Tự thiết kế từ đầu (Tùy chỉnh cao)

Phù hợp khi bạn có bộ nhận diện thương hiệu riêng hoặc yêu cầu đặc thù về quà tặng.

* Mở tab **Lucky Wheel** → Chọn **Thêm mới**. <img src="./ui-gamification/lucky-wheel_img_a72b8792.png" alt="9.4. LUCKY WHEEL" />

*Lưu ý: Minigame tạo theo cách này sẽ khởi tạo ở trạng thái trống, bạn cần tự cấu hình nội dung và hình ảnh.*   <img src="./ui-gamification/lucky-wheel_img_51452939.png" alt="9.4. LUCKY WHEEL" />

## 4. Hướng dẫn cấu hình chi tiết

Giao diện chỉnh sửa bao gồm 3 phần: **Menu cài đặt**, **Tùy chọn chi tiết** và **Bản xem trước (Preview)**.

### 🛠 Các menu cài đặt chính:

MenuChức năng chi tiết**Cấu hình vòng quay**Cài đặt nội dung nút bấm, thông báo, màu sắc và lưu kết quả vào thuộc tính (attribute) của chatbot.**Thiết kế vòng quay**Tải lên hình ảnh vòng quay, âm thanh hiệu ứng và số lượng ô quà.**Chỉnh sửa quà**Thiết lập tên quà tặng và **tỉ lệ trúng** cho mỗi ô.**Cấu hình nội dung**Soạn thảo nội dung cho nút "Luật chơi" và mô tả chi tiết phần quà.**Địa chỉ URL**Đường dẫn trực tiếp để truy cập minigame từ luồng bot và ngooài luồng bot.**Bản ghi dữ liệu**Theo dõi lịch sử quay thưởng và nhận quà của từng khách hàng.

\
