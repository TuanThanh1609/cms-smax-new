# III. HƯỚNG DẪN GỬI FMM

*Nguồn: [docs.smax.ai/vi/iii-huong-dan-gui-fmm](http://docs.smax.ai/vi/iii-huong-dan-gui-fmm)*

# HƯỚNG DẪN GỬI TIN NHẮN FACEBOOK MARKETING MESSAGES (FMM)

Facebook Marketing Messages (FMM) là công cụ mạnh mẽ cho phép bạn gửi tin nhắn quảng bá đến khách hàng ngay cả khi họ không tương tác với Page trong 24 giờ qua. Đây là giải pháp tối ưu để triển khai các chiến dịch khuyến mãi, thông báo sản phẩm mới hoặc tái tương tác với tệp khách hàng cũ mà không lo vi phạm chính sách của Meta.

## 📋 CHUẨN BỊ TRƯỚC KHI GỬI

Để chiến dịch FMM vận hành mượt mà, bạn cần đảm bảo đã hoàn tất các điều kiện sau:

* **Tạo tệp khách hàng:** Đã thực hiện các bước tạo tệp tại **Phần II**.

* **Cấp quyền:** Tài khoản quảng cáo đã được cấp quyền và bật tùy chọn *"Tự động gửi lời mời trong tương lai"*.

* **Ngân sách:** Có sẵn số dư trong tài khoản quảng cáo Facebook.

## 🚀 QUY TRÌNH TRIỂN KHAI (3 GIAI ĐOẠN)

### Giai đoạn 1: Thiết lập Đối tượng & Ngân sách

**Bước 1: Truy cập tính năng** Vào module **Bot-Auto** → Chọn **Broadcast & Re-marketing** → Chọn loại **Facebook Marketing Messages (FMM)**.

<img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_f5b9c114.png" alt="III. HƯỚNG DẪN GỬI FMM" />

**Bước 2: Chọn Fanpage** Chọn đúng Page bạn muốn gửi tin. *Lưu ý: Phải chọn đúng Page đã tạo tệp khách hàng ở Phần II.*

<img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_4a31c7b2.png" alt="III. HƯỚNG DẪN GỬI FMM" />

**Bước 3: Lựa chọn Nguồn khách hàng** Bạn có 3 lựa chọn tùy theo mục tiêu chiến dịch:

Nguồn khách hàngĐặc điểmHình ảnh minh họa**Khách hàng từ quảng cáo**Tệp do Meta tự tạo khi bạn bật *"Tự động gửi lời mời trong tương lai"* lúc cấp quyền tài khoản quảng cáo.<img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_4f6034ee.png" alt="III. HƯỚNG DẪN GỬI FMM" />**Khách hàng từ tệp Audience**Tệp bạn upload từ file Excel/Google Sheet hoặc tệp lọc khách hàng đã tạo ở Phần II.<img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_d8b4bc54.png" alt="III. HƯỚNG DẪN GỬI FMM" />**Khách hàng từ tệp Topic**Những khách hàng đã chủ động đăng ký nhận tin qua tính năng Marketing Message. [Xem hướng dẫn tạo topic tại đây](https://youtu.be/uEv7m538nyA?si=dQZkWcEqKiBD-359)<img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_83c8172f.png" alt="III. HƯỚNG DẪN GỬI FMM" />

**Bước 4: Kiểm tra số lượng khách hàng** Sau khi chọn nguồn, số lượng khách nhận tin sẽ hiển thị tại mục **Tổng khách hàng**.

<img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_2a258028.png" alt="III. HƯỚNG DẪN GỬI FMM" />

**⚠️ Lưu ý quan trọng về hiển thị số lượng:**

* **Với tệp Quảng cáo:** Nếu không hiển thị số lượng, có nghĩa là Page chưa bật tính năng tự động thu thập tệp. Bạn cần cấp lại quyền tài khoản quảng cáo để Meta thu thập lại.

* **Với tệp Audience:** Meta chỉ hiển thị số lượng với các tệp được **mapping** (kết nối dữ liệu giữa Smax và Meta) trên 100 khách hàng (ưu tiên trên 300 khách). Các tệp dưới 100 khách sẽ không hiển thị số lượng nhưng vẫn có thể gửi được.

* **Với tệp Topic:** Nếu bạn chưa xây dựng luồng mời khách đăng ký Topic, nguồn này sẽ trống.

**Bước 5: Thiết lập Tài khoản quảng cáo & Ngân sách**

* **Tài khoản:** Chọn đúng tài khoản đã dùng để tạo tệp ở Phần II.

* **Ngân sách:** Chi phí mỗi tin FMM dao động từ 200-300đ.

**Công thức tính an toàn:** $	ext{Ngân sách} = 	ext{Số lượng khách hàng} 	imes 400	ext{đ}$.

* *Việc tính dư ra 100đ/tin giúp đảm bảo chiến dịch không bị dừng đột ngột do hết tiền trước khi gửi hết tệp.*

<img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_6e48ee5a.png" alt="III. HƯỚNG DẪN GỬI FMM" />

### Giai đoạn 2: Biên tập Nội dung tin nhắn

**Bước 6: Chỉnh sửa nội dung** Nhấn nút **Cập nhật** để thiết kế tin nhắn.

<img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_b829aaba.png" alt="III. HƯỚNG DẪN GỬI FMM" />

**Chi tiết các thành phần nội dung:**

* **Tiêu đề (Tối đa 80 ký tự):** Nội dung thu hút, có thể chứa thông tin bán hàng. <img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_4a1c9c64.png" alt="III. HƯỚNG DẪN GỬI FMM" />

* **Tiêu đề phụ (Tối đa 250 ký tự):** Mô tả chi tiết hơn về ưu đãi hoặc giá trị khách hàng nhận được. <img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_1ad5374a.png" alt="III. HƯỚNG DẪN GỬI FMM" />

* **Hình ảnh/Video:**

**Hình ảnh:** Upload ảnh đơn hoặc chọn **Thêm mới** để tạo album cuộn ngang (tăng tỷ lệ tương tác). <img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_4bd6c33e.png" alt="III. HƯỚNG DẪN GỬI FMM" /> <img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_ebbc71dc.png" alt="III. HƯỚNG DẪN GỬI FMM" /> <img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_92e0d93f.png" alt="III. HƯỚNG DẪN GỬI FMM" />

* **Video:** Kích thước tối thiểu $1280 	imes 720$. <img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_e6f9533c.png" alt="III. HƯỚNG DẪN GỬI FMM" />

* **Hành động mặc định:** Chèn link (Website, Messenger, Facebook) để khách hàng được chuyển hướng ngay khi click vào bất kỳ đâu trong tin nhắn. <img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_6973c6bf.png" alt="III. HƯỚNG DẪN GỬI FMM" />

* **Danh sách nút bấm:**

**Web URL:** Mở đường link trang web.

* **Go to block:** Kích hoạt một kịch bản chatbot có sẵn trong Smax. <img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_0be32d33.png" alt="III. HƯỚNG DẪN GỬI FMM" />

**Cuối cùng, nhấn Lưu để hoàn tất nội dung.**   <img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_8a2af9d2.png" alt="III. HƯỚNG DẪN GỬI FMM" />

💡 **Use case: Mẫu nội dung chuyển đổi cao cho chiến dịch Flash Sale**

* **Tiêu đề:** ⚡ [FLASH SALE 50%] - Chỉ dành riêng cho chị Lan!

* **Tiêu đề phụ:** Ưu đãi lớn nhất năm cho bộ sưu tập Váy Hoa mùa hè. Chỉ áp dụng trong 24h tới. Đừng bỏ lỡ!

* **Hình ảnh:** Album 3-5 mẫu váy bán chạy nhất.

* **Nút bấm:** [Xem mẫu & Đặt hàng ngay] → Dẫn về Web URL hoặc Go to block tư vấn size.

### Giai đoạn 3: Kích hoạt Chiến dịch

**Bước 7: Lưu nháp** Nhấn **Lưu nháp broadcast** để hệ thống ghi nhận toàn bộ thiết lập.

<img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_6d05264d.png" alt="III. HƯỚNG DẪN GỬI FMM" />

**Bước 8: Tạo chiến dịch quảng cáo** Sau khi lưu nháp, nút **Create Message Campaign** sẽ xuất hiện. Nhấn vào đây để Meta khởi tạo chiến dịch.

<img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_36ed0b62.png" alt="III. HƯỚNG DẪN GỬI FMM" />

**Bước 9: Chạy Broadcast** Khi chiến dịch đã tạo thành công, nhấn **Lưu & Chạy broadcast** để bắt đầu gửi tin nhắn đến khách hàng.

<img src="./ui-remarketing/iii-huong-dan-gui-fmm_img_8c6dbbf0.png" alt="III. HƯỚNG DẪN GỬI FMM" />
