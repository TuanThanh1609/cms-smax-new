# 9.4.1. CẤU HÌNH VÒNG QUAY

*Nguồn: [docs.smax.ai/vi/cau-hinh-vong-quay](http://docs.smax.ai/vi/cau-hinh-vong-quay)*

# Hướng dẫn Cấu hình Vòng quay May mắn

**Cấu hình Vòng quay** không chỉ là thiết lập kỹ thuật, mà là nơi bạn xây dựng trải nghiệm khách hàng. Việc tùy chỉnh chính xác các thông báo, nút bấm và thuộc tính sẽ giúp tăng tỷ lệ chuyển đổi và tạo sự hưng phấn cho người chơi.

<img src="./ui-khac/cau-hinh-vong-quay_img_6f6c053e.png" alt="9.4.1. CẤU HÌNH VÒNG QUAY" />

## 1. Cấu hình thông báo

* 
Thông báo số lượt còn lại

**Cách thiết lập:** Nhập nội dung thông báo và sử dụng biến `{TURN_NUMBER}` để hệ thống tự động hiển thị số lượt thực tế của khách hàng.

**Ví dụ:** *"Bạn còn {TURN_NUMBER} lượt quay, thử vận may ngay thôi!"*

<img src="./ui-khac/cau-hinh-vong-quay_img_f57d8540.png" alt="9.4.1. CẤU HÌNH VÒNG QUAY" />

* 
Loại pop-up khi nhận quà

Mặc định

<img src="./ui-khac/cau-hinh-vong-quay_img_1ff97450.png" alt="9.4.1. CẤU HÌNH VÒNG QUAY" />

Khi chọn loại **Mặc định** sẽ có thêm phần **Tiêu đề khi nhận quà** và **Mô tả khi nhận quà** <img src="./ui-khac/cau-hinh-vong-quay_img_c94f8101.png" alt="9.4.1. CẤU HÌNH VÒNG QUAY" />

* 
Hình ảnh

<img src="./ui-khac/cau-hinh-vong-quay_img_b888d37a.png" alt="9.4.1. CẤU HÌNH VÒNG QUAY" />

* 
Nút chơi tiếp: Tùy chọn này cho phép khách hàng tiếp tục quay (nếu còn lượt chơi)<img src="./ui-khac/cau-hinh-vong-quay_img_bb25f010.png" alt="9.4.1. CẤU HÌNH VÒNG QUAY" />

* 
Nút đóng: đóng pop-up nhận quà<img src="./ui-khac/cau-hinh-vong-quay_img_b9872ba6.png" alt="9.4.1. CẤU HÌNH VÒNG QUAY" />

* 
Thông báo khi hết lượt:

Nội dung hiển thị khi khách hàng không còn lượt chơi. Đừng chỉ thông báo "Hết lượt", hãy tận dụng để điều hướng khách hàng sang một hành động khác.

**Mẹo:** Bạn có thể nhập nội dung mời khách hàng chia sẻ game để nhận thêm lượt hoặc mời họ xem các sản phẩm mới.

* 
**Lưu ý:** Bạn có thể nhập nội dung vào ô văn bản và bỏ qua ô biểu tượng nếu không cần thiết.<img src="./ui-khac/cau-hinh-vong-quay_img_cd47196c.png" alt="9.4.1. CẤU HÌNH VÒNG QUAY" />

\

* 
Tùy chỉnh màu sắc băn bản

Thay đổi màu chữ của thông báo trúng quà và thông báo số lượt để đồng bộ với bộ nhận diện thương hiệu của bạn, giúp giao diện chuyên nghiệp hơn.

<img src="./ui-khac/cau-hinh-vong-quay_img_bb6a433a.png" alt="9.4.1. CẤU HÌNH VÒNG QUAY" />

## 2. Quản lý dữ liệu (Lưu vào thuộc tính)

Đây là phần quan trọng nhất để vận hành Minigame. Việc lưu thông tin vào thuộc tính chatbot giúp bạn biết chính xác **ai đã trúng quà gì** để thực hiện chăm sóc sau đó.

**Các thông tin cần lưu:**

* Số lượt còn lại, tổng số lượt đã nhận.

* Tên quà tặng, hình ảnh quà tặng.

**Lưu ý quan trọng:** Bạn cần cấu hình lưu đầy đủ tất cả các thông tin này vào thuộc tính. Nếu thiếu, minigame có thể hoạt động không ổn định hoặc bạn sẽ không thể truy xuất dữ liệu khách hàng trúng thưởng.

<img src="./ui-khac/cau-hinh-vong-quay_img_25826668.png" alt="9.4.1. CẤU HÌNH VÒNG QUAY" />

* 
Gửi block:

Chỉ hoạt động khi webview chạy độc lập. Được sử dụng cho luồng out bot

<img src="./ui-khac/cau-hinh-vong-quay_img_0443db45.png" alt="9.4.1. CẤU HÌNH VÒNG QUAY" />

\
