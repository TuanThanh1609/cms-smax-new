# 2. HƯỚNG DẪN XÂY DỰNG KỊCH BẢN BOT COMMENT &amp; TỰ ĐỘNG BÁM ĐUỔI

*Nguồn: [docs.smax.ai/vi/huong-dan-xay-dung-kich-ban-bot-comment-tu-dong-bam-duoi](http://docs.smax.ai/vi/huong-dan-xay-dung-kich-ban-bot-comment-tu-dong-bam-duoi)*

# Hướng Dẫn Xây Dựng Kịch Bản Bot Comment & Tự Động Bám Đuổi

Trong môi trường bán hàng online, tốc độ phản hồi là yếu tố then chốt quyết định tỷ lệ chốt đơn. Việc xây dựng kịch bản **Bot Comment** và **Tự động bám đuổi (Follow-up)** giúp doanh nghiệp không bỏ sót bất kỳ khách hàng tiềm năng nào, đồng thời tối ưu hóa nguồn lực nhân sự.

## 1. Tại sao bạn cần Bot Comment & Tự động bám đuổi?

Thay vì phản hồi thủ công từng bình luận, hệ thống tự động hóa giúp bạn:

* **Phản hồi tức thì:** Khách hàng nhận được câu trả lời ngay khi vừa comment, tạo ấn tượng chuyên nghiệp.

* **Chuyển đổi nhanh chóng:** Điều hướng khách hàng từ bình luận công khai sang tin nhắn riêng (Inbox) để tư vấn sâu hơn.

* **Nuôi dưỡng khách hàng:** Tự động nhắc nhở những khách hàng chưa phản hồi, tăng tỷ lệ chuyển đổi mà không gây phiền hà.

## 2. Use case: Quy trình vận hành thực tế

**Ngữ cảnh:** Một shop thời trang chạy chiến dịch quảng cáo cho bộ sưu tập mới.

* **Bước 1 (Kích hoạt):** Khách hàng comment: *"Giá bao nhiêu shop?"* hoặc *"Quan tâm"*.

* **Bước 2 (Bot Comment):** Bot tự động trả lời bình luận: *"Chào bạn, Shop đã gửi chi tiết bảng giá và size vào Inbox, bạn kiểm tra nhé! ❤️"*

* **Bước 3 (Bot Inbox):** Ngay lập tức, Bot gửi tin nhắn riêng: *"Chào [Tên khách hàng], đây là chi tiết sản phẩm bạn quan tâm... [Hình ảnh/Giá/Link]".*

* **Bước 4 (Bám đuổi):** Nếu sau 4 giờ khách hàng không phản hồi, Bot tự động gửi tin nhắn: *"Bạn còn thắc mắc nào về size hay màu sắc không? Shop đang có ưu đãi giảm 10% nếu bạn chốt đơn trong hôm nay đó ạ!"*

## 3. Hướng dẫn chi tiết xây dựng kịch bản

### Bước 1: Thiết lập điều kiện kích hoạt (Trigger)

Bạn cần xác định những từ khóa hoặc hành động nào của khách hàng sẽ khởi động Bot.

* **Theo từ khóa:** Thiết lập danh sách từ khóa phổ biến (Ví dụ: *giá, bao nhiêu, tư vấn, ship...*).

* **Theo tất cả comment:** Phản hồi mọi bình luận xuất hiện trên bài viết.

### Bước 2: Xây dựng nội dung phản hồi bình luận

Nội dung comment nên ngắn gọn, thân thiện và có lời kêu gọi hành động (CTA) rõ ràng để khách hàng kiểm tra Inbox.

* **Mẹo:** Sử dụng biến `[Tên khách hàng]` để tăng tính cá nhân hóa.

### Bước 3: Thiết lập luồng tin nhắn tự động (Inbox Flow)

Đây là nơi bạn cung cấp giá trị cho khách hàng. Hãy đảm bảo:

* Cung cấp đúng thông tin khách hàng đang tìm kiếm.

* Sử dụng hình ảnh/video minh họa sinh động.

* Đặt câu hỏi mở để khuyến khích khách hàng tương tác tiếp.

### Bước 4: Cấu hình kịch bản bám đuổi (Follow-up)

Thiết lập các mốc thời gian gửi tin nhắn nhắc nhở dựa trên trạng thái của khách hàng.

* **Mốc 1 (Sau 2-4 giờ):** Nhắc nhở nhẹ nhàng hoặc cung cấp thêm giá trị.

* **Mốc 2 (Sau 24 giờ):** Tạo sự khan hiếm hoặc đưa ra ưu đãi giới hạn để thúc đẩy chốt đơn.

## 4. Lưu ý để tối ưu hiệu quả

* **Tránh spam:** Không nên đặt tần suất bám đuổi quá dày đặc (ví dụ: gửi 3 tin nhắn/ngày) khiến khách hàng cảm thấy bị làm phiền.

* **Kiểm tra kịch bản:** Luôn dùng tài khoản cá nhân để đóng vai khách hàng, chạy thử toàn bộ luồng từ Comment → Inbox → Follow-up trước khi triển khai thực tế.

* **Kết hợp phễu chuyển đổi:** Sau khi khách hàng đã quan tâm, bạn có thể điều hướng họ đến một trang đích chuyên nghiệp để thu thập thông tin hoặc thanh toán.

*Tham khảo thêm:* [3.15. LANDING PAGE](/vi/landing-page) để tối ưu bước cuối cùng của phễu bán hàng.
