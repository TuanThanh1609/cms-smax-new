# Hướng dẫn viết Prompt tạo ảnh (Prompting Best Practices)

Tài liệu này chứa các nguyên tắc viết prompt để đạt chất lượng ảnh tối ưu khi sử dụng công cụ tạo ảnh.

## Cấu trúc Prompt tiêu chuẩn
Nên viết prompt theo thứ tự cấu trúc rõ ràng:
`Bối cảnh/Nền (Scene/Backdrop) -> Chủ thể chính (Subject) -> Chi tiết quan trọng (Key details) -> Ràng buộc (Constraints) -> Mục đích sử dụng (Output intent).`
- Khai báo rõ mục đích sử dụng (ví dụ: làm ảnh nền website, ảnh mockup UI, ảnh minh họa game) để AI tự điều chỉnh mức độ chi tiết và phong cách cho phù hợp.
- Với các yêu cầu phức tạp, hãy chia nhỏ thành các dòng có nhãn thay vì viết một đoạn văn dài.

## Chính sách về mức độ chi tiết (Specificity)
- Nếu yêu cầu của người dùng đã rất chi tiết, hãy chuẩn hóa nó thành một bản đặc tả rõ ràng mà không tự ý thêm thắt các yếu tố sáng tạo không liên quan.
- Nếu yêu cầu chung chung, hãy bổ sung thêm các chi tiết thẩm mỹ một cách tinh tế nếu nó cải thiện đáng kể chất lượng ảnh đầu ra.
- Đối với phong cách tả thực (photorealism), hãy thêm từ khóa `photorealistic` kèm theo các mô tả chi tiết bề mặt thực tế (lỗ chân lông, nếp nhăn, sớ vải, vân gỗ, các chi tiết hao mòn tự nhiên).

## Bố cục và sắp xếp (Composition and Layout)
- Xác định góc chụp và góc nhìn (close-up, wide-angle, top-down) và vị trí đặt máy ảnh nếu cần.
- Nếu ảnh cần có không gian trống để chèn chữ hoặc thành phần giao diện (UI), hãy chỉ định rõ khoảng trống tiêu cực (ví dụ: `generative negative space on the right side for UI overlay`).
- Tránh tự ý quyết định bố cục trái/phải trừ khi layout xung quanh yêu cầu.

## Ràng buộc và điểm bất biến (Constraints and Invariants)
- Khai báo rõ những gì **không được thay đổi** (ví dụ: `keep background unchanged`).
- Khi chỉnh sửa ảnh, viết rõ: `change only X; keep Y unchanged` và nhắc lại các yếu tố bất biến này trong mọi lượt chỉnh sửa tiếp theo để tránh sai lệch tích lũy.

## Chữ trong hình ảnh (Text in Images)
- Đặt văn bản cần hiển thị trong dấu ngoặc kép hoặc VIẾT HOA và chỉ định rõ kiểu chữ (font style, kích thước, màu sắc, vị trí).
- Đánh vần các từ lạ từng chữ cái một nếu cần độ chính xác cao.
- Yêu cầu render chính xác từng ký tự và không thêm các ký tự thừa.

## Sử dụng ảnh tham chiếu và ảnh đầu vào
- Đánh nhãn rõ ràng từng ảnh tham chiếu theo thứ tự và vai trò (ví dụ: `Image 1: edit target`, `Image 2: style reference`).
- Nếu người dùng cung cấp ảnh chỉ để lấy phong cách/bố cục mà không yêu cầu sửa đổi trực tiếp ảnh đó, hãy coi đó là tạo ảnh mới có tham chiếu (`generation with references`).
- Nếu người dùng yêu cầu giữ lại ảnh cũ và thay đổi một số phần, hãy xử lý theo luồng chỉnh sửa (`edit`).
- Khi ghép ảnh, mô tả rõ cách tương tác (ví dụ: `place the subject from Image 2 into Image 1`).

## Lặp lại có chủ đích (Iterate deliberately)
- Bắt đầu với một prompt cơ bản rõ ràng, sau đó thực hiện các chỉnh sửa nhỏ từng bước một.
- Lặp lại các ràng buộc quan trọng trong mỗi bước chỉnh sửa để giữ tính nhất quán.
