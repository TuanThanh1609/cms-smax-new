# 5.2.1.3. MESSENGER REF LINK

*Nguồn: [docs.smax.ai/vi/messenger-ref-link](http://docs.smax.ai/vi/messenger-ref-link)*

# Messenger Ref Link: Kích hoạt kịch bản chatbot qua liên kết

**Messenger Ref Link** là một đường dẫn đặc biệt cho phép kích hoạt chính xác một kịch bản chatbot ngay khi khách hàng nhấp vào.

Thay vì yêu cầu khách hàng phải nhập từ khóa (ví dụ: "Tư vấn", "Báo giá"), Ref Link giúp **"đi tắt"** mọi rào cản, đưa khách hàng vào đúng luồng chăm sóc mà bạn mong muốn một cách tự động và tức thì.

### Ứng dụng thực tế Use case

Để tối ưu tỷ lệ chuyển đổi, bạn có thể sử dụng Ref Link trong các kịch bản sau:

* **Quảng cáo Facebook (Ads):** Bạn chạy 2 mẫu quảng cáo cho 2 sản phẩm khác nhau. Thay vì dùng một lời chào chung, bạn tạo 2 Ref Link riêng biệt. Khách bấm vào quảng cáo sản phẩm A sẽ vào kịch bản tư vấn sản phẩm A, khách bấm vào sản phẩm B sẽ vào kịch bản sản phẩm B.

* **Landing Page/Website:** Đặt Ref Link tại nút *"Nhận ưu đãi ngay"*. Khi khách click, chatbot sẽ tự động gửi mã giảm giá mà khách không cần gõ bất kỳ chữ nào.

* **Email/Tin nhắn Marketing:** Gửi link cho khách hàng cũ để họ quay lại nhận quà hoặc cập nhật thông tin mới nhất.

### Hướng dẫn thiết lập Messenger Ref Link

Để bắt đầu, tại màn hình **Danh sách trigger**, bạn chọn **Messenger Ref Link**.

<img src="./ui-marketing/messenger-ref-link_img_3ec7d2b5.png" alt="5.2.1.3. MESSENGER REF LINK" />

Thực hiện theo 5 bước sau:

#### Bước 1: Thiết lập cơ bản

Đặt **tên trigger** (để bạn dễ quản lý), chọn **kênh áp dụng** và thiết lập **thời gian trigger hoạt động**.

#### Bước 2: Đặt tên liên kết

Đây là tên dùng để quản lý nội bộ, giúp bạn phân biệt các Ref Link khác nhau trong hệ thống.

**Lưu ý:** Mỗi tên liên kết là duy nhất. Bạn không thể đặt trùng tên liên kết giữa các trigger khác nhau.

#### Bước 3: Truyền dữ liệu qua ref link (Tùy chọn)

Bật tùy chọn này nếu bạn muốn hệ thống tự động gán giá trị cho thuộc tính khách hàng ngay khi họ nhấn vào link. Điều này cực kỳ hữu ích để phân loại nguồn khách hàng.

**Ví dụ thực tế:** Thay vì gán tên, bạn có thể gán: `{{nguon_khach}}` = `Facebook_Ads_Thang10`. Khi đó, bạn sẽ biết chính xác khách hàng này đến từ chiến dịch quảng cáo tháng 10 để có kịch bản chăm sóc phù hợp.

<img src="./ui-marketing/messenger-ref-link_img_e464ac04.png" alt="5.2.1.3. MESSENGER REF LINK" />

#### Bước 4: Chọn Block kịch bản

Chọn block (nội dung) mà bạn muốn chatbot gửi cho khách hàng ngay sau khi họ nhấn vào Ref Link.

#### Bước 5: Lưu và Sử dụng

Sau khi nhấn **Lưu**, hệ thống sẽ cung cấp cho bạn một đường dẫn (Ref Link). Bạn chỉ cần copy link này để gắn vào:

* Nút bấm trên Website/Landing page.

* Bài viết trên Fanpage.

* Chiến dịch quảng cáo Facebook.

* Email hoặc tin nhắn SMS marketing.

<img src="./ui-marketing/messenger-ref-link_img_2f507b8b.png" alt="5.2.1.3. MESSENGER REF LINK" />
