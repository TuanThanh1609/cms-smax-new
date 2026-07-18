# 9.2. BÁM ĐUỔI

*Nguồn: [docs.smax.ai/vi/bam-duoi](http://docs.smax.ai/vi/bam-duoi)*

Trong quá trình tư vấn, việc khách hàng im lặng sau khi nhận báo giá hoặc thông tin sản phẩm là điều thường xuyên xảy ra. Module **Bám đuổi** được thiết kế để giúp bạn tự động hóa việc nhắc nhở khách hàng, đảm bảo không bỏ sót bất kỳ cơ hội chốt đơn nào mà không cần nhân viên phải ghi nhớ và nhắn tin thủ công cho từng người.

## 1. Module Bám đuổi là gì?

Module **Bám đuổi** cho phép bạn thiết lập các kịch bản (luồng) tin nhắn tự động. Hệ thống sẽ theo dõi cuộc hội thoại và tự động gửi tin nhắn đến khách hàng nếu họ không phản hồi trong một khoảng thời gian nhất định mà bạn đã cài đặt trước.

<img src="./ui-marketing/bam-duoi_img_e6b107c1.png" alt="9.2. BÁM ĐUỔI" />

## 2. Khi nào nên sử dụng tính năng Bám đuổi?

Bạn nên áp dụng luồng bám đuổi trong các trường hợp sau:

* **Sau khi gửi báo giá:** Khách hàng xem giá nhưng chưa phản hồi.

* **Khi khách hàng đang phân vân:** Khách hỏi nhiều về tính năng nhưng im lặng ở bước chốt đơn.

* **Nhắc nhở hoàn tất đơn hàng:** Khách đã chọn sản phẩm nhưng chưa cung cấp địa chỉ giao hàng.

* **Tái tương tác:** Khách hàng từng quan tâm nhưng đã ngưng tương tác trong một thời gian ngắn.

## 3. Ví dụ kịch bản ứng dụng thực tế Use case

Để đạt hiệu quả cao nhất, bạn không nên gửi tin nhắn hối thúc mà hãy gửi những giá trị bổ sung. Dưới đây là 2 kịch bản mẫu:

### Kịch bản 1: Nhắc nhở khéo léo sau báo giá

* **Bước 1:** Nhân viên gửi báo giá cho khách.

* **Bước 2 (Cài đặt bám đuổi):** Nếu sau **4 giờ** khách không phản hồi → Hệ thống tự động gửi: *"Anh/chị ơi, không biết mức giá em gửi có phù hợp với ngân sách của mình không ạ? Nếu cần điều chỉnh, anh/chị cứ bảo em nhé!"*

### Kịch bản 2: Tạo sự khan hiếm để thúc đẩy chốt đơn

* **Bước 1:** Khách hàng quan tâm sản phẩm nhưng chưa chốt.

* **Bước 2 (Cài đặt bám đuổi):** Nếu sau **24 giờ** khách không phản hồi → Hệ thống tự động gửi: *"Em kiểm tra lại kho thì mẫu này hiện chỉ còn đúng 2 sản phẩm cuối cùng. Em giữ chỗ cho anh/chị nhé hay mình muốn xem mẫu khác ạ?"*

## 4. Lưu ý để bám đuổi hiệu quả

Để tránh việc khách hàng cảm thấy bị làm phiền hoặc đánh dấu spam, bạn cần lưu ý:

* **Thời gian chờ hợp lý:** Không nên bám đuổi quá dồn dập (ví dụ: cứ 30 phút gửi 1 tin). Hãy giãn cách thời gian tùy theo mức độ cấp bách của sản phẩm.

* **Nội dung tự nhiên:** Soạn tin nhắn như một lời hỏi thăm, hỗ trợ thay vì chỉ tập trung vào việc bán hàng.

* **Điểm dừng:** Luồng bám đuổi sẽ tự động dừng ngay khi khách hàng phản hồi hoặc khi nhân viên chăm sóc khách hàng can thiệp trực tiếp vào cuộc chat.
