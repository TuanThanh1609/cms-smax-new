# 3.25. WEBCAKE

*Nguồn: [docs.smax.ai/vi/webcake](http://docs.smax.ai/vi/webcake)*

# Tích hợp Webcake với SmaxAI: Tự động đồng bộ thông tin khách hàng

Khi khách hàng điền form trên Landing Page (Webcake), thay vì để họ tự nhắn tin cho Bot và bạn phải hỏi lại những thông tin họ vừa cung cấp, bạn có thể sử dụng tính năng **Truyền dữ liệu qua Ref Link**.

Tính năng này giúp SmaxAI "nhận diện" ngay lập tức tên, số điện thoại, nhu cầu... của khách hàng ngay khi họ vừa nhấn gửi form, từ đó tạo ra trải nghiệm chăm sóc cá nhân hóa và chuyên nghiệp hơn.

### 💡 Ví dụ thực tế

Bạn chạy quảng cáo cho sản phẩm chăm sóc da. Trên Webcake, khách hàng điền form và chọn tình trạng da là **"Da dầu"**.

* **Nếu không tích hợp:** Khách nhấn gửi form → Chuyển sang Messenger → Bot chào: *"Chào bạn, bạn cần tư vấn gì ạ?"* → Bạn lại phải hỏi: *"Bạn thuộc loại da nào?"* (Khách sẽ cảm thấy phiền vì phải trả lời 2 lần).

* **Khi tích hợp:** Khách nhấn gửi form → Chuyển sang Messenger → Bot chào: *"Chào [Tên khách], Smax thấy bạn đang gặp vấn đề về **Da dầu**, đây là liệu trình phù hợp nhất cho bạn..."* → **Kết quả:** Khách hàng ấn tượng và tỷ lệ chốt đơn cao hơn.

### Hướng dẫn chi tiết các bước thực hiện

#### Bước 1: Lấy ID các trường dữ liệu trên Webcake

Để SmaxAI biết cần lấy thông tin nào, bạn cần copy ID của các trường (field) trong form Webcake.

* Nhấn vào trường muốn truyền dữ liệu → **Thiết Kế** → **Cài Đặt Trường** → **Copy ID trường**.

* **Ví dụ:** Nếu bạn muốn lấy 3 thông tin: Họ tên, Số điện thoại, Địa chỉ → Bạn sẽ có 3 ID tương ứng là `full_name`, `phone_number`, `address`.

<img src="./ui-tich-hop/webcake_img_46e12ff5.png" alt="3.25. WEBCAKE" />

#### Bước 2: Tạo liên kết tham chiếu (Ref Link) trên SmaxAI

Tại bước này, bạn sẽ tạo một "cổng đón" để nhận dữ liệu từ Webcake gửi về.

**Thao tác thực hiện:**

* Truy cập module **Bot - Auto** → **Kịch bản** → **Tạo trigger Messenger Ref Link**.

<img src="./ui-tich-hop/webcake_img_5c479bd5.png" alt="3.25. WEBCAKE" />

* Đặt tên cho liên kết để dễ quản lý, sau đó bật tùy chọn **Truyền dữ liệu qua ref link**.

<img src="./ui-tich-hop/webcake_img_0ea5fec5.png" alt="3.25. WEBCAKE" />

* Tại cột **Thuộc tính**, nhấn **Select attribute** → chọn **Thêm mới**.

<img src="./ui-tich-hop/webcake_img_2ac4328c.png" alt="3.25. WEBCAKE" />

* Đặt tên cho thuộc tính để lưu dữ liệu gửi về.

*Ví dụ:* Với ID `full_name` từ Webcake, bạn đặt tên thuộc tính lưu trữ là `hoten`.

**Lưu ý quan trọng:** Không đặt tên thuộc tính trùng với các thuộc tính hệ thống của SmaxAI. Xem danh sách các thuộc tính hệ thống **[tại đây](https://tailieu.smax.ai/module-cai-dat/thuoc-tinh#id-2.1_-thuoc-tinh-he-thong)**.

<img src="./ui-tich-hop/webcake_img_6785a34d.png" alt="3.25. WEBCAKE" />

* Tại cột **Giá trị**, nhập ID trường của Webcake vào trong ngoặc nhọn `{{ }}`.

*Ví dụ:* Nhập `{{full_name}}`.

<img src="./ui-tich-hop/webcake_img_dc65f2d0.png" alt="3.25. WEBCAKE" />

* Lặp lại thao tác tương tự cho các trường còn lại (Số điện thoại, Địa chỉ...).

<img src="./ui-tich-hop/webcake_img_b95f2ec8.png" alt="3.25. WEBCAKE" />

* Nhấn **Lưu** để tạo trigger → Chọn **Copy Liên Kết tham chiếu**.

<img src="./ui-tich-hop/webcake_img_4f63589f.png" alt="3.25. WEBCAKE" />

Bạn sẽ nhận được một đường link có dạng: `https://m.me/116096711383804?ref=webcake|hoten:{{full_name}}|sodienthoai:{{phone_number}}|diachi:{{address}}`

#### Bước 3: Kết nối Ref Link vào Webcake

Cuối cùng, bạn gắn đường link vừa copy vào form Webcake để kích hoạt luồng dữ liệu.

* Tại Webcake, vào phần **Cài đặt form** → **Nâng Cao** → **Mở Thêm Ứng Dụng** → **Others**.

* Dán (Paste) đường link tham chiếu đã copy ở Bước 2 vào đây.

<img src="./ui-tich-hop/webcake_img_051fe095.png" alt="3.25. WEBCAKE" />

### Kết quả đạt được

Khi khách hàng nhấn xác nhận gửi form trên Webcake → Họ sẽ được điều hướng tự động về SmaxAI → Toàn bộ thông tin (Họ tên, SĐT, Địa chỉ...) sẽ được tự động điền vào các thuộc tính tương ứng trong hồ sơ khách hàng trên Bot.

Giờ đây, bạn có thể dùng các thông tin này để Bot chào hỏi và tư vấn chính xác nhu cầu của khách hàng!
