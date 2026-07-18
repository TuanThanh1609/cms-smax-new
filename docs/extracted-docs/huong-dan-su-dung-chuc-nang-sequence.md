# HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE

*Nguồn: [docs.smax.ai/vi/huong-dan-su-dung-chuc-nang-sequence](http://docs.smax.ai/vi/huong-dan-su-dung-chuc-nang-sequence)*

# Hướng Dẫn Xây Dựng Kịch Bản Sequence Bám Đuổi Trên SmaxAI

Trong kinh doanh, không phải khách hàng nào cũng chốt đơn ngay lần đầu tiên. **Sequence bám đuổi** là công cụ mạnh mẽ giúp bạn tự động gửi các tin nhắn chăm sóc theo một lộ trình thời gian định sẵn, nhằm nhắc nhở, cung cấp thêm giá trị và thúc đẩy khách hàng ra quyết định mua hàng mà không cần vận hành thủ công.

## 🎯 Tư duy xây dựng kịch bản bám đuổi hiệu quả

Trước khi bắt tay vào cài đặt, bạn cần xác định rõ:

* **Điểm chạm kích hoạt:** Khi nào khách hàng bắt đầu vào Sequence? (Ví dụ: Sau khi hỏi giá nhưng không mua, sau khi đăng ký tư vấn...).

* **Mục tiêu từng bước:** Mỗi tin nhắn gửi đi phải có một mục đích rõ ràng (Tặng quà → Chứng minh chất lượng → Tạo sự khan hiếm).

* **Khoảng thời gian hợp lý:** Tránh gửi quá dồn dập gây phiền hà (Spam).

### 💡 Ví dụ thực tế Use case

**Kịch bản cho Shop Mỹ phẩm (Khi khách quan tâm sản phẩm nhưng chưa chốt đơn):**

* **Sau 1 giờ:** Gửi Voucher giảm giá 10% để kích thích mua hàng.

* **Sau 2 giờ:** Gửi hình ảnh/video feedback của khách hàng đã dùng sản phẩm để tạo niềm tin.

* **Sau 3 giờ:** Gửi danh sách các sản phẩm bán chạy nhất kèm lời nhắc: *"Ưu đãi chỉ còn hiệu lực trong hôm nay"*.

## 🛠 Quy trình triển khai chi tiết

### Bước 1: Xây dựng các khối nội dung (Block)

Trước khi tạo luồng tự động, bạn cần chuẩn bị sẵn các nội dung tin nhắn sẽ gửi cho khách.

* Truy cập **Thư viện block** trong module **Bot-Auto** để tạo các block nội dung.

<img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_ab7cb87d.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

* Tạo lần lượt các block theo kịch bản đã lập:

**Block 1:** Nội dung tặng voucher. <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_c994db8d.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

* **Block 2:** Nội dung gửi ảnh feedback và nhắc nhở khuyến mãi. <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_3ea5483f.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

* **Block 3:** Nội dung gửi album các sản phẩm khuyến mãi. <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_a95e484b.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

### Bước 2: Thiết lập luồng Sequence (Kịch bản chăm sóc)

Đây là bước "lập trình" thời gian gửi cho các khối nội dung trên.

* Vào mục **Kịch bản chăm sóc** trong module **Bot-Auto** → Chọn tạo Sequence mới.

<img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_f4282467.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

* **Cấu hình chi tiết cho Sequence:**

**Chọn Page:** Chọn Fanpage áp dụng kịch bản này. <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_1f015486.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

* **Thêm bước bám đuổi:** Nhấn **New Step** để thêm một mốc thời gian gửi tin. <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_2b71d72d.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

* **Cài đặt thời gian gửi:**

**Thời gian chờ:** Hệ thống hỗ trợ 4 đơn vị: `Second` (Giây), `Minute` (Phút), `Hour` (Giờ), `Day` (Ngày).

* *Lưu ý:* Nếu để **0 Second**, tin nhắn sẽ được gửi ngay lập tức (Immediate).

* **Khung giờ gửi (Between):** Giúp tin nhắn chỉ gửi trong khoảng thời gian bạn chọn (Ví dụ: 8h - 22h). Nếu thời điểm gửi rơi vào ngoài khung giờ này, hệ thống sẽ tự động dời sang khung giờ tương ứng của ngày hôm sau. <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_6ed0a52f.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

* **Gán nội dung:** Chọn Block tương ứng cho bước bám đuổi đó. Lặp lại thao tác cho các bước tiếp theo. <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_a0b3fa82.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

* **Kích hoạt:** Bật trạng thái hoạt động của bước bám đuổi và nhấn **Save** để lưu. <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_0bf14319.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

**Kết quả:** Hệ thống sẽ hiển thị một **Mindmap** (Sơ đồ tư duy) giúp bạn dễ dàng theo dõi toàn bộ luồng gửi và thời gian của Sequence.   <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_2b0dae63.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

### Bước 3: Kích hoạt Sequence cho khách hàng

Để đưa khách hàng vào luồng bám đuổi, bạn cần một "điểm chạm" để kích hoạt.

* **Tạo Block kích hoạt:** Vào Thư viện block → Tạo block mới → Thêm thẻ **Sequence** → Chọn Sequence bạn vừa tạo ở Bước 2. <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_40b49f42.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

* **Thiết lập gửi nhanh:** Để nhân viên vận hành dễ dàng đưa khách vào Sequence, hãy cài đặt mẫu gửi nhanh:

Vào **Cài đặt** → **Block** → **Thêm mới**. <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_2008ac9b.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

* Chọn block chứa thẻ Sequence vừa tạo, đặt mã trả lời nhanh và mô tả → Nhấn **Lưu**. <img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_a0b6e43d.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />

## 🧪 Kiểm tra và Tối ưu kịch bản

Để đảm bảo kịch bản vận hành chính xác, bạn hãy thực hiện test như sau:

* Vào phần **Livechat** → Chọn Facebook.

* Trong ô nhập tin nhắn, gõ ký tự `\` → Chọn mẫu block gửi nhanh đã tạo ở Bước 3 → Nhấn **Enter**.

* Theo dõi xem các tin nhắn bám đuổi có gửi đi đúng thời gian đã cài đặt hay không.

**💡 Mẹo nhỏ:** Khi test, bạn nên chỉnh thời gian chờ xuống còn **10-20 giây** để kiểm tra nhanh luồng chạy, thay vì phải chờ 1-2 tiếng.

<img src="./ui-remarketing/huong-dan-su-dung-chuc-nang-sequence_img_1cc910e1.png" alt="HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG SEQUENCE" />
