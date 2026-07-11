# 8.5.21. FUNC.VN - FACEBOOK USER

*Nguồn: [docs.smax.ai/vi/funcvn-facebook-user](http://docs.smax.ai/vi/funcvn-facebook-user)*

# Hướng dẫn kết nối Func.vn với SmaxAI để gửi tin nhắn ngoài 24h

Bạn có bao giờ gặp tình trạng khách hàng nhắn tin cho Page, nhưng sau 24h bạn không thể phản hồi được nữa do chính sách của Meta? Để giải quyết vấn đề này, SmaxAI tích hợp với **Func.vn** — giải pháp giúp bạn chủ động gửi tin nhắn cho khách hàng ngay cả khi đã quá khung giờ 24h.

### ⚠️ Điều kiện bắt buộc

Để tính năng này hoạt động, tài khoản Facebook cá nhân mà bạn kết nối vào Func.vn **phải có quyền Quản trị viên (Admin) hoặc Biên tập viên (Editor)** trên Fanpage đó.

## Phần 1: Tạo tài khoản Func.vn

**Bước 1:** Truy cập [func.vn](https://func.vn) và chọn **Signup**.

<img src="./ui-tich-hop/funcvn-facebook-user_img_7254695c.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

**Bước 2:** Nhập địa chỉ email của bạn và chọn **Submit**.

<img src="./ui-tich-hop/funcvn-facebook-user_img_c71f5660.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

Hệ thống sẽ hiển thị thông báo yêu cầu bạn kiểm tra email để kích hoạt tài khoản.

<img src="./ui-tich-hop/funcvn-facebook-user_img_b774042c.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

**Bước 3:** Mở email đăng ký, tìm thư từ Func.vn và nhấn vào đường link kích hoạt.

* **Lưu ý:** Nếu không thấy email trong Hộp thư đến, bạn vui lòng kiểm tra thêm trong mục **Thư rác (Spam)**.

<img src="./ui-tich-hop/funcvn-facebook-user_img_e6c4ae50.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

<img src="./ui-tich-hop/funcvn-facebook-user_img_4deeb15f.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

**Bước 4:** Hoàn tất thông tin cá nhân và chọn **Sign up** để chính thức tạo tài khoản.

<img src="./ui-tich-hop/funcvn-facebook-user_img_ca146d92.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

## Phần 2: Kết nối tài khoản Facebook User vào Func

Để gửi được tin nhắn, Func cần một "đại diện" (tài khoản Facebook cá nhân) để thực hiện lệnh gửi.

**Bước 1:** Tại giao diện chính của Func, chọn mục **Tài khoản**.

<img src="./ui-tich-hop/funcvn-facebook-user_img_519213ff.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

**Bước 2:** Chọn **New Account** để bắt đầu kết nối tài khoản Facebook mới.

<img src="./ui-tich-hop/funcvn-facebook-user_img_5b124cdb.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

**Bước 3:** Chọn **Facebook User**. Một trình duyệt ảo sẽ xuất hiện, bạn hãy đăng nhập tài khoản Facebook của mình theo hướng dẫn trên màn hình.

<img src="./ui-tich-hop/funcvn-facebook-user_img_5f278558.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

**Bước 4:** Sau khi đăng nhập thành công, tài khoản Facebook sẽ hiển thị trong danh sách **My accounts**.

<img src="./ui-tich-hop/funcvn-facebook-user_img_4c1dded8.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

**Bước 5:** Nhấn chọn tài khoản vừa kết nối → Vào phần **Settings** → Copy mã **API token**. Đây là mã định danh để SmaxAI có thể điều khiển Func gửi tin.

<img src="./ui-tich-hop/funcvn-facebook-user_img_a92a49f8.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

## Phần 3: Tích hợp Func.vn vào SmaxAI

**Bước 1:** Tại SmaxAI, vào module **Cài đặt** → chọn **Tích hợp** → nhấn **Thêm mới**.

<img src="./ui-tich-hop/funcvn-facebook-user_img_ed522b57.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

**Bước 2:** Cấu hình thông tin kết nối:

* **Nền tảng:** Chọn **Func.vn**.

* **Account token:** Dán mã API token bạn đã copy ở Phần 2 vào đây.

<img src="./ui-tich-hop/funcvn-facebook-user_img_02286686.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

<img src="./ui-tich-hop/funcvn-facebook-user_img_e26fa2cf.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

**Bước 3:** Chọn Fanpage mà tài khoản Facebook User (đã kết nối với Func) có quyền Admin/Biên tập viên.

<img src="./ui-tich-hop/funcvn-facebook-user_img_47b1b10f.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

Cuối cùng, nhấn **Lưu** để hoàn tất tích hợp.

## Phần 4: Hướng dẫn vận hành thực tế

### 1. Gửi tin ngoài 24h trong Livechat

**Khi nào sử dụng?** Khi bạn đang chat trực tiếp với khách nhưng phát hiện cuộc hội thoại đã quá 24h và không thể gửi tin nhắn thông thường.

* **Ví dụ:** Khách hỏi giá sản phẩm vào thứ Hai, nhưng đến thứ Tư bạn mới có hàng về. Bạn muốn nhắn tin thông báo cho khách nhưng Facebook đã khóa khung chat.

**Cách thực hiện:** Trong khung chat, tại phần **Select Message Tag**, hãy chọn **DIRECT MESSENGER BY FUNC.VN**.

<img src="./ui-tich-hop/funcvn-facebook-user_img_9ba25002.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

*Mẹo: Bạn có thể nhấn vào ảnh đại diện khách hàng ở khung bên phải để xem chi tiết Profile.*

<img src="./ui-tich-hop/funcvn-facebook-user_img_fdef7225.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

### 2. Gửi tin ngoài 24h bằng Chatbot (Tự động)

**Khi nào sử dụng?** Khi bạn muốn thiết lập kịch bản tự động chăm sóc khách hàng cũ, gửi mã giảm giá hoặc thông báo định kỳ cho những người đã lâu không tương tác.

* **Ví dụ:** Gửi tin nhắn chúc mừng sinh nhật khách hàng hoặc gửi mã Voucher giảm giá cho toàn bộ khách hàng đã từng nhắn tin từ tháng trước.

**Cách thực hiện:** Trong kịch bản Chatbot, bạn **không được dùng** thẻ Text hoặc Image thông thường. Thay vào đó, hãy sử dụng các thẻ chuyên biệt:

* **Messenger Text By Func**: Để gửi tin nhắn văn bản.

* **Messenger Image By Func**: Để gửi hình ảnh.

<img src="./ui-tich-hop/funcvn-facebook-user_img_41944363.png" alt="8.5.21. FUNC.VN - FACEBOOK USER" />

**💡 Lưu ý quan trọng:** Việc gửi tin nhắn ngoài 24h thông qua tài khoản cá nhân có thể bị Facebook đánh dấu là Spam nếu bạn gửi với số lượng quá lớn trong thời gian ngắn. Hãy chia nhỏ tệp khách hàng và gửi với nội dung hữu ích để bảo vệ tài khoản.
