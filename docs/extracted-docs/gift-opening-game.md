# 9.5. GIFT OPENING GAME

*Nguồn: [docs.smax.ai/vi/gift-opening-game](http://docs.smax.ai/vi/gift-opening-game)*

Module **Gift Opening Game** giúp doanh nghiệp tăng tương tác, thu hút khách hàng tiềm năng và thúc đẩy doanh số thông qua hình thức "Mở hộp quà may mắn" ngay trên Messenger. Thay vì tặng mã giảm giá một cách thông thường, việc cho phép khách hàng tự tay chọn quà sẽ kích thích sự tò mò, tạo tâm lý hào hứng và khiến món quà trở nên giá trị hơn trong mắt họ.

## 1. Kích hoạt module

Để bắt đầu triển khai minigame, bạn cần kích hoạt module trong hệ thống theo các bước sau:

* Truy cập vào mục **Extend Modules**.

* Tìm kiếm module **Gift Box**

* Chọn **Active**.

Sau khi kích hoạt, module sẽ xuất hiện tại menu bên trái màn hình để bạn dễ dàng quản lý.

<img src="./ui-gamification/gift-opening-game_img_ab1786bb.png" alt="9.5. GIFT OPENING GAME" /> <img src="./ui-gamification/gift-opening-game_img_7a89bb8d.png" alt="9.5. GIFT OPENING GAME" />

## 2. Tổng quan giao diện quản lý

Giao diện quản lý của Gift Opening Game được chia thành 2 khu vực chính:

* **Open Gift:** Nơi lưu trữ và quản lý tất cả các minigame bạn đã tạo. Tại đây, bạn có thể sao chép, chỉnh sửa hoặc xóa các game hiện có. <img src="./ui-gamification/gift-opening-game_img_559696b5.png" alt="9.5. GIFT OPENING GAME" />

* **Templates (Mẫu có sẵn):** Thư viện các mẫu game được thiết kế sẵn về giao diện và hiệu ứng. Bạn có thể xem trước và kích hoạt nhanh để tiết kiệm thời gian thiết lập. <img src="./ui-gamification/gift-opening-game_img_19679329.png" alt="9.5. GIFT OPENING GAME" />

## 3. Hướng dẫn tạo mới minigame

Tùy vào nhu cầu và nguồn lực về thiết kế, bạn có thể chọn một trong hai cách khởi tạo sau:

### Cách 1: Sử dụng mẫu có sẵn (Triển khai nhanh)

Phù hợp cho doanh nghiệp muốn vận hành chiến dịch ngay lập tức mà không cần thiết kế cầu kỳ.

* **Thao tác:** Vào **Templates** → Chọn mẫu ưng ý → Nhấn **Active**. <img src="./ui-gamification/gift-opening-game_img_c5f5c43a.png" alt="9.5. GIFT OPENING GAME" />

### Cách 2: Tạo minigame trống (Tùy biến thương hiệu)

Phù hợp khi bạn có bộ nhận diện thương hiệu riêng (màu sắc, hình ảnh đặc thù) hoặc ý tưởng thiết kế độc đáo.

* **Thao tác:** Vào **Open Gift** → Chọn **Thêm mới**. <img src="./ui-gamification/gift-opening-game_img_dcf8d3a9.png" alt="9.5. GIFT OPENING GAME" />

**⚠️ Lưu ý:** Khi tạo game trống, bạn sẽ cần tự chuẩn bị các tài nguyên như: Hình ảnh hộp quà, âm thanh hiệu ứng và danh sách quà tặng. Hãy đảm bảo hình ảnh có kích thước đồng nhất để game hiển thị đẹp nhất.    <img src="./ui-gamification/gift-opening-game_img_c164172a.png" alt="9.5. GIFT OPENING GAME" />

## 4. Cấu hình chi tiết minigame

Khi nhấn chỉnh sửa một game, giao diện sẽ bao gồm 3 phần: **Menu cài đặt**, **Tùy chọn chi tiết** và **Bản xem trước (Preview)** giúp bạn theo dõi thay đổi theo thời gian thực.

<img src="./ui-gamification/gift-opening-game_img_5ea5bcb1.png" alt="9.5. GIFT OPENING GAME" />

### Chi tiết các menu cài đặt:

MenuChức năng chínhHướng dẫn chi tiết**Cấu hình thông báo**Cài đặt nội dung nút bấm, màu sắc và thiết lập lưu thông tin lượt chơi vào thuộc tính khách hàng.Xem chi tiết**Thiết kế game**Tải lên hình ảnh hộp quà, âm thanh mở quà và số lượng hộp quà hiển thị trên màn hình.Xem chi tiết**Chỉnh sửa quà**Thiết lập danh sách quà tặng và cài đặt tỷ lệ trúng thưởng cho từng loại quà.Xem chi tiết**Cấu hình nội dung**Soạn thảo nội dung cho nút "Luật chơi" và thông báo chúc mừng khi khách nhận được quà.Xem chi tiết**Địa chỉ URL**Cung cấp đường dẫn trực tiếp để chơi game. Bạn có thể dùng link này để gửi cho khách hoặc tích hợp vào luồng chatbot.-**Bản ghi dữ liệu**Theo dõi lịch sử chơi và quản lý danh sách khách hàng đã trúng quà.-

## 5. Chiến lược ứng dụng thực tế Use case

Để Gift Opening Game không chỉ là một trò chơi mà trở thành công cụ tạo ra doanh thu, bạn có thể áp dụng các kịch bản sau:

### Kịch bản 1: Thu thập Lead (Số điện thoại/Email)

* **Mục tiêu:** Xây dựng tệp khách hàng tiềm năng.

* **Cách triển khai:** Thiết lập chatbot yêu cầu khách cung cấp SĐT/Email trước → Sau khi khách cung cấp, chatbot gửi link "Mở hộp quà" như một phần thưởng cho việc để lại thông tin.

* **Kết quả:** Thu thập dữ liệu khách hàng một cách tự nhiên, không gây khó chịu.

### Kịch bản 2: Thúc đẩy doanh số (Upsell/Cross-sell)

* **Mục tiêu:** Tăng tỷ lệ chốt đơn.

* **Cách triển khai:** Quà tặng là các mã giảm giá (Voucher 10%, 20%, 50k...). Ngay khi khách mở trúng voucher, chatbot sẽ gửi kèm link sản phẩm đang khuyến mãi kèm lời nhắn: *"Chúc mừng bạn! Hãy dùng mã này để mua [Sản phẩm A] với giá ưu đãi ngay nhé!"*.

* **Kết quả:** Chuyển đổi từ sự hào hứng khi trúng quà sang hành vi mua hàng ngay lập tức.

### Kịch bản 3: Tri ân khách hàng cũ (Loyalty)

* **Mục tiêu:** Tăng tỷ lệ quay lại và gắn kết thương hiệu.

* **Cách triển khai:** Gửi tin nhắn hàng loạt cho khách hàng cũ vào dịp Lễ/Tết với nội dung: *"Quà tặng đặc biệt dành riêng cho khách hàng thân thiết, mời bạn mở quà!"*.

* **Kết quả:** Khách hàng cảm thấy được quan tâm, tăng điểm chạm tích cực với thương hiệu.

### Kịch bản 4: Tăng tương tác Fanpage (Viral)

* **Mục tiêu:** Lan tỏa thương hiệu.

* **Cách triển khai:** Yêu cầu khách hàng chia sẻ bài viết hoặc mời bạn bè tham gia trước khi nhận quyền mở quà.

* **Kết quả:** Tăng lượt tiếp cận tự nhiên cho Fanpage thông qua hành động của khách hàng.
