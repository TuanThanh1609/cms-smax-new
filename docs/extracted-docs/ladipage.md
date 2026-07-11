# 3.24. LADIPAGE

*Nguồn: [docs.smax.ai/vi/ladipage](http://docs.smax.ai/vi/ladipage)*

# Hướng Dẫn Kết Nối Landing Page Với SmaxAi Qua API

Việc kết nối Landing Page với SmaxAi cho phép bạn tự động hóa quy trình thu thập thông tin khách hàng (Lead). Thay vì phải nhập liệu thủ công, mọi thông tin khách hàng điền trên form sẽ được truyền trực tiếp về SmaxAi, từ đó kích hoạt Bot tự động nhắn tin chăm sóc khách hàng ngay lập tức.

### 💡 Use case thực tế: Tự động gửi Voucher cho khách hàng

**Kịch bản:** Bạn chạy quảng cáo dẫn khách về Landing Page để đăng ký nhận Voucher giảm giá 20%.

* Khách hàng điền Tên và Số điện thoại vào form trên Landing Page → Nhấn **Submit**.

* SmaxAi nhận dữ liệu qua API → Tự động gửi một tin nhắn Messenger: *"Chào [Tên], Smax đã nhận được đăng ký của bạn. Đây là mã Voucher 20% dành riêng cho bạn: SMX20!"*

* Thông tin SĐT của khách được lưu vào hệ thống để bạn dễ dàng theo dõi và chăm sóc sau này.

## Giai đoạn 1: Cài đặt Form trên Landing Page

Để SmaxAi biết chính xác ai là người vừa điền form, bạn cần tạo 2 trường thông tin định danh ẩn là `pid` và `page_pid`.

**Bước 1: Thêm trường định danh** Tại form nhập thông tin, ngoài các trường bạn muốn thu thập (Tên, SĐT, Email...), hãy thêm 2 trường mới với cấu hình sau:

**Trường pid:**

* Kiểu: Nhập chữ

* Tên lấy dữ liệu: `pid`

* Chữ gợi nhắc: `pid`

<img src="./ui-tich-hop/ladipage_img_a82900d7.png" alt="3.24. LADIPAGE" />   <img src="./ui-tich-hop/ladipage_img_56f9841c.png" alt="3.24. LADIPAGE" />

**Trường page_pid:**

* Kiểu: Nhập chữ

* Tên lấy dữ liệu: `page_pid`

* Chữ gợi nhắc: `page_pid`

<img src="./ui-tich-hop/ladipage_img_f1574c56.png" alt="3.24. LADIPAGE" />

**Bước 2: Xuất bản và kiểm tra URL** Sau khi tạo xong, bạn xuất bản Landing Page và copy đường dẫn (URL) của trang.

<img src="./ui-tich-hop/ladipage_img_303c2174.png" alt="3.24. LADIPAGE" />

Để kiểm tra việc truyền dữ liệu, bạn hãy thêm đoạn mã sau vào sau URL: `?pid=fb1111111111&page_pid=fb22222222`

<img src="./ui-tich-hop/ladipage_img_5a3e9e79.png" alt="3.24. LADIPAGE" />

Nếu 2 trường `pid` và `page_pid` tự động hiển thị giá trị như hình trên là bạn đã cài đặt đúng.

**Bước 3: Ẩn trường định danh** Vì 2 trường này chỉ dùng để Bot gọi API, bạn không nên để khách hàng nhìn thấy. Hãy chọn **Ẩn phần tử** cho trường `pid` và `page_pid`.

<img src="./ui-tich-hop/ladipage_img_7d2badce.png" alt="3.24. LADIPAGE" />

## Giai đoạn 2: Cài đặt SmaxAi (Điểm tiếp nhận dữ liệu)

Bây giờ, bạn cần tạo một "cổng" trên SmaxAi để tiếp nhận dữ liệu gửi về từ Landing Page.

**Bước 1: Tạo Trigger Bot API** Truy cập module **Bot → Auto** → Chọn **Tạo mới trigger** → Chọn **Trigger Bot API**.

<img src="./ui-tich-hop/ladipage_img_48ab23a5.png" alt="3.24. LADIPAGE" />   <img src="./ui-tich-hop/ladipage_img_2e3610b9.png" alt="3.24. LADIPAGE" />

**Bước 2: Cấu hình phản hồi** Chọn **API Token** và **Khách hàng hệ thống** như hình. Sau đó, tạo một Block nội dung để gửi cho khách hàng ngay khi họ nhấn Submit trên Landing Page.

<img src="./ui-tich-hop/ladipage_img_7e4542b9.png" alt="3.24. LADIPAGE" />

**Bước 3: Lấy thông tin API** Nhấn **Lưu** để tạo trigger. Hệ thống sẽ cung cấp cho bạn một đoạn mã API bao gồm **API URL** và **API Request Header**. Hãy lưu lại thông tin này.

<img src="./ui-tich-hop/ladipage_img_e3ebce1e.png" alt="3.24. LADIPAGE" />

## Giai đoạn 3: Kết nối và Ánh xạ dữ liệu (Mapping)

Đây là bước quan trọng nhất để "nối" dữ liệu từ Landing Page sang SmaxAi.

**Bước 1: Tạo liên kết API trên Landing Page** Quay lại Landing Page → Chọn **Lưu data trong form** → Chọn **Thêm**.

<img src="./ui-tich-hop/ladipage_img_f63c5209.png" alt="3.24. LADIPAGE" />   <img src="./ui-tich-hop/ladipage_img_2ec2c67d.png" alt="3.24. LADIPAGE" />

Chọn **Tạo liên kết mới** → Chọn **API**.

<img src="./ui-tich-hop/ladipage_img_385a7be9.png" alt="3.24. LADIPAGE" />

**Bước 2: Cấu hình thông số API**

* **Tên tài khoản:** Đặt tên tùy ý để dễ quản lý.

* **API URL & API Request header:** Copy chính xác từ Trigger Bot API đã tạo ở Giai đoạn 2.

* **Content-type:** Chọn `application/json`.

<img src="./ui-tich-hop/ladipage_img_81685f87.png" alt="3.24. LADIPAGE" />

**Bước 3: Ánh xạ trường dữ liệu (Mapping)** Bạn cần khai báo cho hệ thống biết trường nào trên Landing Page sẽ tương ứng với trường nào trên SmaxAi.

**1. Hai trường bắt buộc (để định danh kh��ch hàng):**

* Tên lấy dữ liệu: `pid` → Tên gửi api: `customer.pid`

* Tên lấy dữ liệu: `page_pid` → Tên gửi api: `customer_pid`

<img src="./ui-tich-hop/ladipage_img_68a0ba64.png" alt="3.24. LADIPAGE" />

**2. Các trường thông tin tùy chỉnh (Custom Attribute):** Để lưu thông tin (SĐT, Email, Địa chỉ...) vào SmaxAi, bạn sử dụng cú pháp: `[Tên lấy dữ liệu landing page]` → `attrs.[tên attribute smaxai]`

**Lưu ý quan trọng:** Không sử dụng system attribute mặc định của hệ thống, chỉ sử dụng **Custom Attribute**.

<img src="./ui-tich-hop/ladipage_img_c05a60ae.png" alt="3.24. LADIPAGE" />

**Ví dụ cụ thể:** Bạn muốn lưu số điện thoại từ Landing Page vào attribute `sodienthoai` trên SmaxAi:

* Tên lấy dữ liệu trên Landing Page là: `phone`

* Tên attribute trên SmaxAi là: `sodienthoai` → Cấu hình: `phone` → `attrs.sodienthoai`

<img src="./ui-tich-hop/ladipage_img_ae41dd60.png" alt="3.24. LADIPAGE" />   <img src="./ui-tich-hop/ladipage_img_1a421277.png" alt="3.24. LADIPAGE" />

Sau khi hoàn tất, nhấn **Lưu** để cập nhật form.

## Giai đoạn 4: Nhúng Landing Page vào Messenger và Kiểm tra

Để khách hàng truy cập Landing Page mà vẫn giữ được định danh `pid`, bạn cần nhúng link vào Bot theo cách sau:

**Bước 1: Tạo Block dẫn link** Tạo một Block mới, sử dụng thẻ Text và thêm nút bấm để khách hàng mở Landing Page.

<img src="./ui-tich-hop/ladipage_img_fb492a4b.png" alt="3.24. LADIPAGE" />

**Bước 2: Cấu hình URL động** Copy URL của Landing Page và dán vào nút bấm. Quan trọng nhất, bạn phải thêm đoạn mã sau vào cuối URL: `?pid={{pid}}&page_pid={{page_pid}}`

<img src="./ui-tich-hop/ladipage_img_c816dde6.png" alt="3.24. LADIPAGE" />

**Bước 3: Test vận hành**

* Gửi Block này cho chính bạn để test.

* Nhấn nút → Mở Landing Page → Điền thông tin → Nhấn **Submit**.

* Kiểm tra xem Bot có gửi tin nhắn phản hồi về Messenger hay không.

Để điều chỉnh nội dung tin nhắn phản hồi, bạn quay lại phần cài đặt Trigger Bot API và chỉnh sửa Block gửi cho khách hàng.

<img src="./ui-tich-hop/ladipage_img_7a7174f2.png" alt="3.24. LADIPAGE" />   <img src="./ui-tich-hop/ladipage_img_5ca34878.png" alt="3.24. LADIPAGE" />
