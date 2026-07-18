# 5.2.13.1. CREATE CHAT WIDGET

*Nguồn: [docs.smax.ai/vi/create-chat-widget](http://docs.smax.ai/vi/create-chat-widget)*

# Hướng dẫn Cài đặt Khung Chat Website & Trang Landing Chat SmaxAi

Để tối ưu tỷ lệ chuyển đổi và hỗ trợ khách hàng ngay lập tức, SmaxAi cung cấp giải pháp nhúng khung chat trực tiếp vào Website hoặc tạo trang Landing Chat chuyên dụng. Tùy vào mục tiêu kinh doanh, bạn hãy lựa chọn một trong ba hình thức triển khai dưới đây.

## 1. Lựa chọn hình thức Chat phù hợp

Trước khi cài đặt, hãy xác định nhu cầu của bạn để chọn loại hình mang lại hiệu quả cao nhất:

Loại hìnhĐặc điểmKịch bản ứng dụng Use case**Plugin**Một khung chat nhỏ nằm ở góc website hiện có.**Shop bán hàng/Web công ty:** Bạn muốn hỗ trợ khách hàng ngay khi họ đang xem sản phẩm hoặc tìm hiểu dịch vụ.**Landing**Một trang web đơn giản, chỉ chứa khung chat.**Chạy Ads (Facebook, TikTok):** Bạn muốn khách bấm vào link quảng cáo là có thể chat ngay, không cần chờ tải website phức tạp.**Form**Khung chat yêu cầu khách điền thông tin trước khi bắt đầu.**Bất động sản, Bảo hiểm, B2B:** Bạn cần thu thập SĐT, Email để lọc khách hàng tiềm năng trước khi nhân viên tư vấn.

## 2. Quy trình thiết lập chi tiết

### Bước 1: Tạo lời chào tự động (Welcome Message)

Đây là "điểm chạm" đầu tiên giúp dẫn dắt khách hàng khi họ vừa truy cập vào website hoặc trang chat.

* Truy cập vào công cụ **Bot-Auto**.

* Chọn kênh **Website** đã kết nối.

* Nhấn **Tạo mới trigger**.

<img src="./ui-marketing/create-chat-widget_img_fd02fb69.png" alt="5.2.13.1. CREATE CHAT WIDGET" />

* Tại danh sách tùy chọn, chọn **Website Welcome**.

### Bước 2: Cấu hình ngôn ngữ hiển thị

Bạn có thể tùy chỉnh ngôn ngữ để phù hợp với đối tượng khách hàng mục tiêu:

* Hệ thống mặc định là **English (tiếng Anh)**.

* Để sử dụng tiếng Việt hoặc ngôn ngữ khác, nhấn chọn **Add Language**.

### Bước 3: Tùy chỉnh giao diện và trải nghiệm khách hàng

Hãy biến khung chat thành một phần nhận diện thương hiệu của doanh nghiệp bạn.

#### 3.1. Tùy chỉnh diện mạo (Global Style & Plugin)

Bạn có thể thay đổi màu sắc chủ đạo, kiểu ô nhập tin nhắn, câu chào mừng và vị trí hiển thị (trái/phải) để đảm bảo tính thẩm mỹ và không che mất nội dung quan trọng trên website.

<img src="./ui-marketing/create-chat-widget_img_ddedf343.png" alt="5.2.13.1. CREATE CHAT WIDGET" />

#### 3.2. Thiết lập Câu hỏi gợi ý

Thay vì để khách hàng tự nhập, hãy đưa ra các lựa chọn sẵn có để dẫn dắt họ đến mục tiêu bạn muốn.

* **Mẹo:** Hãy đặt 3-5 câu hỏi mà khách hàng thường xuyên hỏi nhất.

* **Ví dụ:** *"Tôi muốn xem bảng giá"*, *"Tư vấn cho tôi gói phù hợp"*, *"Kiểm tra tình trạng đơn hàng"*.

<img src="./ui-marketing/create-chat-widget_img_4b065017.png" alt="5.2.13.1. CREATE CHAT WIDGET" />

#### 3.3. Kích hoạt Menu cố định

Tùy chọn này tạo ra một nút bấm mở menu nhanh nằm cạnh khung chat, giúp khách hàng truy cập nhanh các mục quan trọng mà không cần gõ phím.

<img src="./ui-marketing/create-chat-widget_img_bda74b6e.png" alt="5.2.13.1. CREATE CHAT WIDGET" />

#### 3.4. Cấu hình thu thập thông tin (Chỉ dành cho loại Form)

Nếu bạn chọn hình thức **Website Form**, hãy thiết lập các trường thông tin bắt buộc tại phần **Yêu cầu thông tin** để lọc khách hàng tiềm năng (Ví dụ: Họ tên, Số điện thoại, Email).

<img src="./ui-marketing/create-chat-widget_img_3dbf6677.png" alt="5.2.13.1. CREATE CHAT WIDGET" />

## 3. Triển khai thực tế

Sau khi hoàn tất các tùy chỉnh, nhấn **Lưu** để hệ thống khởi tạo lời chào.

<img src="./ui-marketing/create-chat-widget_img_6711e85a.png" alt="5.2.13.1. CREATE CHAT WIDGET" />

Tùy vào loại hình bạn chọn, hãy thực hiện theo hướng dẫn tương ứng:

### Trường hợp 1: Đối với Plugin và Form (Nhúng vào Website)

Bạn cần sao chép đoạn mã script mà hệ thống cung cấp và dán vào mã nguồn website.

<img src="./ui-marketing/create-chat-widget_img_339e5818.png" alt="5.2.13.1. CREATE CHAT WIDGET" />

💡 **Dành cho người không rành kỹ thuật:** Hãy copy đoạn script này và gửi cho kỹ thuật viên quản trị website của bạn với yêu cầu: *"Dán đoạn mã này vào ngay trước thẻ đóng* `*</body>*` *của website"*.

### Trường hợp 2: Đối với Landing Page Chat

Bạn không cần cài đặt code. Chỉ cần sao chép đường dẫn (URL) mà Smax cung cấp và gắn vào nút bấm trên các chiến dịch quảng cáo hoặc gửi trực tiếp cho khách hàng.

<img src="./ui-marketing/create-chat-widget_img_8e97e01e.png" alt="5.2.13.1. CREATE CHAT WIDGET" />

## 4. Các bước tối ưu tiếp theo

Để khung chat thực sự mang lại doanh thu, bạn không nên dừng lại ở việc cài đặt giao diện. Hãy tham khảo các bước nâng cao sau:

* **Tự động hóa trả lời:** Cấu hình bộ não AI để trả lời tự động các câu hỏi gợi ý thông qua tài liệu về [/doc/ai-chatbot-gLEgL1h4qW](/vi/ai-chatbot) và [/vi/genai](/vi/genai).

* **Theo dõi khách hàng:** Thiết lập bám đuổi để không bỏ lỡ khách hàng tiềm năng đã truy cập web tại [[Tao ket noi bam duoi](/vi/tao-ket-noi-bam-duoi)](/vi/tao-ket-noi-bam-duoi).

* **Kiểm tra quyền hạn:** Xem chi tiết các tính năng hỗ trợ theo từng gói dịch vụ tại [[Goi cuoc](/vi/goi-cuoc)](/vi/goi-cuoc).
