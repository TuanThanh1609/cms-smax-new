# 5.3.14.35. JSONAPI

*Nguồn: [docs.smax.ai/vi/jsonapi](http://docs.smax.ai/vi/jsonapi)*

# Hướng dẫn sử dụng thẻ JsonAPI

Thẻ **JsonAPI** là một công cụ mạnh mẽ cho phép SmaxAi kết nối và "trao đổi dữ liệu" với các phần mềm, nền tảng bên thứ ba thông qua giao thức API.

Thay vì chỉ hoạt động trong nội bộ SmaxAi, thẻ này giúp bạn tự động hóa việc lấy dữ liệu từ hệ thống khác hoặc gửi dữ liệu từ chatbot sang các ứng dụng quản lý.

### 💡 Khi nào bạn nên sử dụng thẻ JsonAPI?

Bạn hãy sử dụng thẻ này khi muốn thực hiện các kịch bản như:

* **Tra cứu thông tin tự động (GET):** Tự động lấy trạng thái đơn hàng từ website bán hàng, tra cứu số dư tài khoản, hoặc lấy thông tin thời tiết để trả lời khách hàng.

* **Đẩy dữ liệu sang hệ thống khác (POST/PUT):** Tự động lưu thông tin khách hàng từ chatbot vào Google Sheets, CRM, hoặc cập nhật trạng thái đơn hàng trên hệ thống quản lý.

* **Xóa dữ liệu (DELETE):** Yêu cầu hệ thống bên thứ ba xóa một bản ghi cụ thể.

**Lưu ý quan trọng:** Để cấu hình chính xác, bạn cần có tài liệu API (API Documentation) của nền tảng mà bạn muốn kết nối để biết chính xác URL, phương thức và các tham số yêu cầu.

### 🛠 Hướng dẫn cấu hình chi tiết

#### Bước 1: Chọn phương thức và nhập URL

Đầu tiên, bạn cần xác định mục đích của cuộc gọi API để chọn phương thức phù hợp:

* **GET:** Lấy dữ liệu về.

* **POST:** Gửi dữ liệu mới lên.

* **PUT:** Cập nhật dữ liệu đã có.

* **DELETE:** Xóa dữ liệu.

<img src="./ui-tich-hop/jsonapi_img_e0b23b64.png" alt="5.3.14.35. JSONAPI" />

Sau khi chọn phương thức, hãy nhập đường dẫn API vào ô **Nhập URL**.

<img src="./ui-tich-hop/jsonapi_img_01cf7a06.png" alt="5.3.14.35. JSONAPI" />

#### Bước 2: Thiết lập Headers (Tiêu đề)

Headers là nơi chứa các thông tin xác thực hoặc định nghĩa loại dữ liệu để hệ thống bên kia chấp nhận yêu cầu của bạn.

* **Ví dụ phổ biến:** `Authorization` (để xác thực quyền truy cập/API Key), `Content-Type` (định dạng dữ liệu).

<img src="./ui-tich-hop/jsonapi_img_60d77e93.png" alt="5.3.14.35. JSONAPI" />

#### Bước 3: Cấu hình Body (Nội dung gửi đi)

*Phần này chỉ áp dụng cho phương thức **POST** và **PUT**.* SmaxAi hỗ trợ 2 loại định dạng dữ liệu phổ biến:

**Trường hợp 1: Dạng multipart/form-data (PARAMS)** Sử dụng khi bạn muốn gửi dữ liệu theo dạng cặp **Tên (Key)** và **Giá trị (Value)**.

* **Cách làm:** Chọn Body là **PARAMS** → Nhập Tên và Giá trị tương ứng.

<img src="./ui-tich-hop/jsonapi_img_3d7066dd.png" alt="5.3.14.35. JSONAPI" />

**Trường hợp 2: Dạng JSON** Sử dụng khi hệ thống yêu cầu gửi một chuỗi mã JSON phức tạp.

* **Cách làm:** Chọn Body là **JSON** → Nhập toàn bộ mã JSON vào ô Body.

<img src="./ui-tich-hop/jsonapi_img_84533eee.png" alt="5.3.14.35. JSONAPI" />

### 🧪 Kiểm thử và Lưu trữ dữ liệu

#### 1. Chạy thử API

Để đảm bảo API hoạt động đúng trước khi triển khai cho khách hàng, bạn hãy:

* Chọn **Page** (Fanpage) đang kết nối.

* Nhập **PID** của tài khoản Facebook muốn dùng để test.

* Nhấn **Chạy thử API**.

<img src="./ui-tich-hop/jsonapi_img_4b32bf46.png" alt="5.3.14.35. JSONAPI" />

#### 2. Lưu giá trị trả về vào Thuộc tính (Attribute)

Sau khi API gọi thành công, hệ thống sẽ trả về một chuỗi dữ liệu (Response). Để sử dụng dữ liệu này trong kịch bản chatbot, bạn cần lưu nó vào một thuộc tính của SmaxAi.

* **Đường dẫn JSON (JSON Path):** Là địa chỉ dẫn tới giá trị cụ thể trong chuỗi dữ liệu trả về. (Ví dụ: Nếu API trả về `{"customer": {"name": "Nguyễn Văn A"}}`, đường dẫn để lấy tên sẽ là `customer.name`).

* **Cách làm:** Nhập đường dẫn JSON → Chọn thuộc tính tương ứng trên SmaxAi để lưu giá trị đó.

<img src="./ui-tich-hop/jsonapi_img_5ae1cf44.png" alt="5.3.14.35. JSONAPI" />
