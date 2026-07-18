# 8.9. TIN NHẮN MẪU

*Nguồn: [docs.smax.ai/vi/tin-nhan-mau](http://docs.smax.ai/vi/tin-nhan-mau)*

Hướng dẫn sử dụng Tin nhắn mẫu trên SmaxAi

Tin nhắn mẫu giúp bạn và đội ngũ chăm sóc khách hàng phản hồi khách hàng một cách nhanh chóng, chuyên nghiệp và đồng nhất. Thay vì phải gõ đi gõ lại những nội dung giống nhau, bạn chỉ cần gọi ra các mẫu đã soạn sẵn, giúp tối ưu thời gian chốt đơn và nâng cao trải nghiệm khách hàng.

# 1. Tạo nhóm phân loại tin nhắn

Để quản lý hàng trăm mẫu tin nhắn mà không bị nhầm lẫn, bạn nên chia chúng thành các nhóm theo hành trình khách hàng (Ví dụ: Nhóm "Chào hỏi", Nhóm "Tư vấn sản phẩm", Nhóm "Xử lý khiếu nại").

**Bước 1**: Trong cài đặt **Tin nhắn mẫu**, chọn mục **Nhóm**.

<img src="./ui-remarketing/tin-nhan-mau_img_31eb5c8c.png" alt="8.9. TIN NHẮN MẪU" />

**Bước 2**: Chọn **+ Thêm nhóm** để tạo nhóm mới.

<img src="./ui-remarketing/tin-nhan-mau_img_1d7c90b5.png" alt="8.9. TIN NHẮN MẪU" />

**Bước 3**: Đặt tên cho nhóm (Ví dụ: *CSKH_GiaiDapThacMac*) và chọn **Lưu**.

<img src="./ui-remarketing/tin-nhan-mau_img_edb5e1fe.png" alt="8.9. TIN NHẮN MẪU" />

# 2. Tạo tin nhắn mẫu mới

Bạn có thể tạo từng tin nhắn mẫu một cách chi tiết để đảm bảo nội dung truyền tải chính xác nhất.

**Bước 1**: Trong cài đặt **Tin nhắn mẫu**, chọn **Thêm mới**.

<img src="./ui-remarketing/tin-nhan-mau_img_a1868a06.png" alt="8.9. TIN NHẮN MẪU" />

**Bước 2**: Điền đầy đủ các thông tin sau:

* **Tiêu đề tin nhắn**: Tên gợi nhớ để bạn dễ dàng quản lý.

* **Mã trả lời nhanh**: Đây là "phím tắt" để gọi tin nhắn. (Ví dụ: Bạn đặt mã là `gia_ship`, khi chat bạn chỉ cần gõ mã này để gửi nội dung phí vận chuyển).

* **Nhóm tin nhắn**: Chọn nhóm bạn đã tạo ở Mục 1.

* **Loại tin nhắn**: Bạn có thể kết hợp nhiều loại trong một mẫu (Ví dụ: Nội dung văn bản + Sản phẩm hoặc Nội dung văn bản + Block).

* **Nội dung trả lời**: Phần quan trọng nhất. Để tin nhắn tự nhiên và cá nhân hóa, bạn hãy sử dụng các hàm động:

`[=GENDER(anh, chị, bạn)]`: Tự động thay đổi xưng hô theo giới tính khách hàng.

* `{{full name}}`: Tự động lấy họ tên khách hàng.

* `[=RANDOM(text1, text2, text3)]`: Hệ thống sẽ chọn ngẫu nhiên 1 trong các nội dung bạn nhập. *Mẹo: Sử dụng hàm này để tránh bị Facebook/Zalo đánh dấu spam khi gửi cùng một nội dung cho nhiều người.*

* **Hình ảnh**: Tải lên hình ảnh minh họa nếu cần.

**Bước 3**: Sau khi hoàn tất, chọn **Lưu (7)**.

<img src="./ui-remarketing/tin-nhan-mau_img_4752c207.png" alt="8.9. TIN NHẮN MẪU" />

**Ví dụ thực tế:** Thay vì viết: *"Chào bạn, shop gửi bạn bảng giá"*. Hãy viết: *"Chào [=GENDER(anh, chị, bạn)] {{full name}}, [=RANDOM(Smax xin gửi)], [=RANDOM(Shop gửi)] bạn bảng giá chi tiết ạ!"*

# 3. Tạo tin nhắn mẫu hàng loạt bằng file Excel

Nếu bạn có một danh sách dài các câu hỏi thường gặp (FAQ), hãy sử dụng tính năng Import để tiết kiệm thời gian.

**Bước 1**: Trong cài đặt **Tin nhắn mẫu**, chọn **Import Message Template**.

<img src="./ui-remarketing/tin-nhan-mau_img_4b4a9455.png" alt="8.9. TIN NHẮN MẪU" />

**Bước 2**: Chọn nhóm tương ứng và tải file mẫu về máy.

<img src="./ui-remarketing/tin-nhan-mau_img_0dff4e5d.png" alt="8.9. TIN NHẮN MẪU" />

**Bước 3**: Mở file Excel và điền thông tin theo đúng các cột:

* **Cột code**: Mã trả lời nhanh.

* **Cột title**: Tiêu đề tin nhắn.

* **Cột message**: Nội dung trả lời.

* **Cột images**: URL hình ảnh (Bắt buộc phải có định dạng `.png` hoặc `.jpg`).

* **Cột active**: Điền `TRUE` để kích hoạt tin nhắn ngay sau khi nhập.

<img src="./ui-remarketing/tin-nhan-mau_img_bdccc5c5.png" alt="8.9. TIN NHẮN MẪU" />

**Bước 4**: Tải file Excel đã điền lên và chọn **Nhập**.

<img src="./ui-remarketing/tin-nhan-mau_img_5e08e2ad.png" alt="8.9. TIN NHẮN MẪU" />

# 4. Xuất danh sách tin nhắn mẫu

Khi bạn muốn sao lưu dữ liệu hoặc chuyển đổi nội dung sang một tài khoản khác, hãy sử dụng tính năng Export.

Tính năng này cho phép tải toàn bộ danh sách tin nhắn mẫu hiện có trên SmaxAi về máy dưới dạng file Excel.

Trong cài đặt **Tin nhắn mẫu**, chọn **Export**.

<img src="./ui-remarketing/tin-nhan-mau_img_2a260a07.png" alt="8.9. TIN NHẮN MẪU" />

# 5. Quản lý và Chỉnh sửa

Bạn có thể dễ dàng điều chỉnh các tin nhắn mẫu để phù hợp với chiến dịch kinh doanh hiện tại:

* **Sắp xếp**: Chọn biểu tượng di chuyển để thay đổi thứ tự ưu tiên hoặc chuyển tin nhắn sang nhóm khác. <img src="./ui-remarketing/tin-nhan-mau_img_982c2675.png" alt="8.9. TIN NHẮN MẪU" />

* **Chỉnh sửa**: Chọn biểu tượng bút chì để cập nhật lại nội dung hoặc mã trả lời nhanh. <img src="./ui-remarketing/tin-nhan-mau_img_888ddc0f.png" alt="8.9. TIN NHẮN MẪU" />

* **Xóa**: Chọn biểu tượng thùng rác để loại bỏ những mẫu tin nhắn không còn sử dụng. <img src="./ui-remarketing/tin-nhan-mau_img_62ed720a.png" alt="8.9. TIN NHẮN MẪU" />
