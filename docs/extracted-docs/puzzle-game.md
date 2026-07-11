# 9.19. PUZZLE GAME

*Nguồn: [docs.smax.ai/vi/puzzle-game](http://docs.smax.ai/vi/puzzle-game)*

**Module Puzzle Game** là công cụ mạnh mẽ giúp bạn tạo các minigame xếp hình hấp dẫn, nhằm tăng tương tác với khách hàng, thu thập thông tin lead hoặc thúc đẩy doanh số thông qua các phần quà tặng.

## 💡 Ứng dụng thực tế Use case

Để tối ưu hóa hiệu quả của Puzzle Game, bạn có thể áp dụng theo các kịch bản sau:

* **Ra mắt sản phẩm mới:** Sử dụng hình ảnh sản phẩm mới làm mảnh ghép. Khi khách hàng hoàn thành trò chơi, họ sẽ ghi nhớ sâu hơn về diện mạo sản phẩm và nhận được mã giảm giá để mua hàng.

* **Chiến dịch lễ/tết:** Tạo các trò chơi với chủ đề ngày lễ (Trung Thu, Giáng Sinh...). Đây là cách tuyệt vời để tạo không khí vui vẻ và thu hút khách hàng tương tác với thương hiệu.

* **Thu thập dữ liệu khách hàng:** Yêu cầu khách hàng để lại thông tin liên hệ trước hoặc sau khi chơi để nhận quà, giúp bạn xây dựng tệp khách hàng tiềm năng.

# 1. Kích hoạt module

Để bắt đầu, bạn cần kích hoạt module trong hệ thống:

* Truy cập mục **Extend Modules**.

* Tìm module **Puzzle Game** và chọn **Active**.

* Sau khi kích hoạt, hệ thống sẽ tự động truy cập vào module

<img src="./ui-gamification/puzzle-game_img_89234f96.png" alt="9.19. PUZZLE GAME" />

# 2. Tổng quan giao diện

Module Puzzle Game được chia thành 2 khu vực quản lý chính:

* **Puzzle Game:** Nơi lưu trữ tất cả các minigame bạn đã tạo. Tại đây, bạn có thể dễ dàng sao chép, chỉnh sửa hoặc xóa các trò chơi để phù hợp với từng chiến dịch.

<img src="./ui-gamification/puzzle-game_img_ce09a4f6.png" alt="9.19. PUZZLE GAME" />

* **Templates:** Cung cấp các mẫu trò chơi được thiết kế sẵn. Bạn có thể xem trước và kích hoạt nhanh các mẫu này để tiết kiệm thời gian thiết kế.

<img src="./ui-gamification/puzzle-game_img_b019cfb9.png" alt="9.19. PUZZLE GAME" />

# 3. Cách tạo minigame mới

Bạn có thể triển khai trò chơi theo 2 cách tùy vào nhu cầu:

### Cách 1: Sử dụng mẫu có sẵn

Phù hợp cho những bạn muốn triển khai nhanh mà vẫn đảm bảo tính thẩm mỹ.

* Truy cập cửa sổ **Templates** → Chọn mẫu ưng ý → Nhấn **Active** để đưa mẫu này vào danh sách quản lý của bạn.

<img src="./ui-gamification/puzzle-game_img_f100b29f.png" alt="9.19. PUZZLE GAME" />

### Cách 2: Tự thiết kế từ đầu

Phù hợp khi bạn có ý tưởng riêng hoặc muốn đồng bộ tuyệt đối với bộ nhận diện thương hiệu.

* Truy cập cửa sổ **Puzzle Game** → Chọn **Thêm mới** → Tùy chỉnh hình ảnh và quy tắc trò chơi theo ý muốn.

<img src="./ui-gamification/puzzle-game_img_df56ba7a.png" alt="9.19. PUZZLE GAME" />

# 4. Cấu hình chi tiết và Tối ưu

Sau khi tạo trò chơi, bạn sẽ tiến vào giao diện chỉnh sửa. Tại đây, bạn có thể vừa cấu hình vừa xem trước (preview) kết quả hiển thị để đảm bảo trải nghiệm người dùng tốt nhất.

<img src="./ui-gamification/puzzle-game_img_85ca86b5.png" alt="9.19. PUZZLE GAME" />

Để hoàn thiện trò chơi, vui lòng tham khảo các hướng dẫn chi tiết sau:

**Hướng dẫn chi tiết từng bước:**

* [Cấu hình trò chơi](/vi/extend-modules/puzzle-game/cau-hinh-tro-choi): Thiết lập luật chơi, thời gian và điều kiện thắng.

* [Thiết kế trò chơi](/vi/extend-modules/puzzle-game/thiet-ke-tro-choi): Tùy chỉnh hình ảnh, màu sắc và giao diện.

* [Chỉnh sửa quà](/vi/extend-modules/puzzle-game/chinh-sua-qua): Thiết lập phần thưởng hấp dẫn cho người chiến thắng.

* [Địa chỉ URL](/vi/extend-modules/puzzle-game/dia-chi-url): Lấy link trò chơi để gửi cho khách hàng qua Chatbot/Broadcast.

* [Bản ghi dữ liệu](/vi/extend-modules/puzzle-game/ban-ghi-du-lieu): Theo dõi danh sách người chơi và kết quả.
