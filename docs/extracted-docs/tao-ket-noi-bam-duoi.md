# 9.2.1. TẠO &amp; KẾT NỐI BÁM ĐUỔI

*Nguồn: [docs.smax.ai/vi/tao-ket-noi-bam-duoi](http://docs.smax.ai/vi/tao-ket-noi-bam-duoi)*

**Hướng dẫn thiết lập và kết nối Luồng bám đuổi (Follow-up) cho Chatbot**

Tính năng **Bám đuổi (Follow-up)** là công cụ mạnh mẽ giúp bạn tự động "nhắc nhở" khách hàng khi họ im lặng trong quá trình tương tác. Thay vì bỏ lỡ những khách hàng tiềm năng, hệ thống sẽ tự động gửi tin nhắn theo kịch bản định sẵn để thúc đẩy họ hoàn thành mục tiêu (như để lại số điện thoại hoặc chốt đơn hàng).

# 1. Tạo kịch bản bám đuổi

Để bắt đầu, bạn cần xây dựng một "kịch bản bám đuổi" (nội dung và điều kiện gửi) trước khi gắn nó vào chatbot.

Tại tab **Kịch bản**, bấm chọn **Thêm mới**.

<img src="./ui-marketing/tao-ket-noi-bam-duoi_img_483a54c9.png" alt="9.2.1. TẠO & KẾT NỐI BÁM ĐUỔI" />

### Chi tiết cấu hình cài đặt

<img src="./ui-marketing/tao-ket-noi-bam-duoi_img_1daefd47.png" alt="9.2.1. TẠO & KẾT NỐI BÁM ĐUỔI" />Cài đặt bám đuổi

Để kịch bản vận hành chính xác, bạn cần lưu ý các nhóm cài đặt sau:

#### A. Thông tin cơ bản

* **(1) Tên**: Đặt tên dễ nhớ (Ví dụ: *Bám đuổi lấy SĐT - Sản phẩm A*).

* **(2) Mô tả**: Ghi chú mục đích của kịch bản để dễ quản lý.

* **(3) Nền tảng áp dụng**: Chọn nền tảng bạn muốn triển khai (Facebook, Zalo, v.v.).

#### B. Logic kích hoạt và Theo dõi

* **(4) Loại bám đuổi**: Xác định thời điểm hệ thống bắt đầu đếm thời gian để gửi tin bám đuổi:

*Đếm ngay khi khách hàng được thêm vào luồng bám đuổi*: Kích hoạt ngay lập tức.

* *Đếm khi tin nhắn bất kỳ của page được gửi đi*: Bắt đầu đếm sau khi Page gửi một tin nhắn bất kỳ.

* *Đếm khi tin nhắn của page có chứa keyword*: Chỉ bắt đầu đếm khi Page gửi tin nhắn chứa từ khóa cụ thể.

* **(5) Xử lý khi khách hàng nhắn tin lại**: Quyết định hành động của Bot khi khách hàng phản hồi trong lúc đang bị bám đuổi:

*Theo dõi lại từ đầu và vẫn gửi tin đã gửi*: Reset lại luồng, gửi lại cả những tin đã gửi trước đó.

* *Theo dõi lại từ đầu nhưng bỏ qua tin bám đuổi đã gửi*: Reset luồng nhưng không gửi lại những tin khách đã nhận.

* *Theo dõi lại từ đầu nhưng bỏ qua tin + thời gian bám đuổi của tin đó*: Tối ưu nhất để tránh gây phiền cho khách.

#### C. Điều kiện kết thúc (Thoát luồng)

* **(6) Hệ thống bám đuổi thành công khi**: Khi đạt điều kiện này, Bot sẽ ngừng bám đuổi và coi như mục tiêu đã hoàn thành:

Khách gửi tin nhắn kèm số điện thoại.

* Tin nhắn khách/page chứa từ khóa định sẵn.

* Khi đơn hàng được tạo thành công trên hệ thống.

* **(7) Hệ thống sẽ ngừng bám đuổi khi**: Dừng luồng bám đuổi ngay lập tức (không tính là thành công) khi tin nhắn khách/page chứa từ khóa cụ thể.

#### D. Phản hồi và Lịch trình

* **(8) Bám đuổi thành công thì gửi**: Gửi một block tin nhắn chúc mừng hoặc xác nhận khi đạt điều kiện ở mục (6).

* **(9) Bám đuổi thất bại thì gửi**: Gửi một block tin nhắn cuối cùng khi toàn bộ các bước bám đuổi đã chạy hết mà khách vẫn không phản hồi.

* **(10) Step (Bước bám đuổi)**: Thiết lập nội dung và thời gian gửi cho từng tin nhắn:

*Gửi bất kỳ lúc nào*: Tin nhắn được gửi 24/24.

* *Gửi trong khoảng thời gian*: Chỉ gửi trong khung giờ cài đặt (Ví dụ: 8h - 22h). Nếu rơi vào giờ nghỉ, hệ thống sẽ đợi đến khung giờ tiếp theo mới gửi.

Sau khi hoàn thành, chọn **Lưu** để hoàn tất.

# 💡 Ví dụ ứng dụng thực tế Use case

Để bạn dễ hình dung, hãy tham khảo 2 kịch bản phổ biến sau:

**Case 1: Thu thập số điện thoại để tư vấn (Lead Generation)**

* **Luồng chính:** Khách hỏi giá → Bot báo giá → Khách im lặng.

* **Cài đặt bám đuổi:**

*Loại bám đuổi:* Đếm ngay khi thêm vào luồng.

* *Step 1 (Sau 2 giờ):* "Em thấy mình đang quan tâm sản phẩm A, anh/chị để lại SĐT em gọi tư vấn kỹ hơn nhé!"

* *Điều kiện thành công:* Tin nhắn khách hàng kèm số điện thoại.

* *Kết quả:* Khi khách gửi SĐT → Bot ngừng bám đuổi → Gửi block "Cảm ơn, nhân viên sẽ gọi cho bạn ngay".

**Case 2: Thúc đẩy chốt đơn hàng (Abandoned Cart)**

* **Luồng chính:** Khách chọn sản phẩm → Bot gửi link thanh toán → Khách chưa thanh toán.

* **Cài đặt bám đuổi:**

*Step 1 (Sau 24 giờ):* "Đơn hàng của bạn vẫn đang chờ, mình tặng bạn mã giảm giá 5% nếu chốt đơn ngay bây giờ nhé!"

* *Điều kiện thành công:* Khi đơn hàng được tạo.

* *Kết quả:* Khách dùng mã giảm giá và đặt hàng → Bot ngừng bám đuổi.

# 2. Kết nối kịch bản bám đuổi với Chatbot

Sau khi đã có kịch bản, bạn cần gắn nó vào một vị trí cụ thể trong luồng chatbot của mình.

Truy cập **module Bot-Auto**, chọn **Thư viện block**.

<img src="./ui-marketing/tao-ket-noi-bam-duoi_img_39067bbd.png" alt="9.2.1. TẠO & KẾT NỐI BÁM ĐUỔI" />

Trong thư viện block, chọn block bạn muốn thêm chức năng bám đuổi.

<img src="./ui-marketing/tao-ket-noi-bam-duoi_img_988903f9.png" alt="9.2.1. TẠO & KẾT NỐI BÁM ĐUỔI" />

Kéo thả **thẻ chức năng Follow Up** vào luồng. Tại đây, bạn cấu hình 3 tùy chọn:

* **Bộ lọc**: Chỉ áp dụng bám đuổi cho một nhóm khách hàng nhất định (Ví dụ: Chỉ bám đuổi khách hàng mới).

* **Chọn luồng bám đuổi**: Chọn kịch bản bạn đã tạo ở Phần 1.

* **Hành động khi có luồng bám đuổi khác đang chạy**:

*Chạy luồng bám đuổi này*: Dừng luồng cũ và bắt đầu chạy luồng mới từ đ��u.

* *Giữ lại luồng bám đuổi đang chạy*: Ưu tiên luồng cũ, bỏ qua luồng mới này.

<img src="./ui-marketing/tao-ket-noi-bam-duoi_img_5796fae0.png" alt="9.2.1. TẠO & KẾT NỐI BÁM ĐUỔI" />

**Lưu ý cuối cùng:** Hãy cân nhắc khoảng cách thời gian giữa các **Step** hợp lý. Việc gửi tin nhắn quá dồn dập sẽ khiến khách hàng cảm thấy bị làm phiền và dễ dẫn đến việc bị chặn (block) Page.
