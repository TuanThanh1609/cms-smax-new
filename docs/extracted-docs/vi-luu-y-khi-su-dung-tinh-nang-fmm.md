# VI. LƯU Ý KHI SỬ DỤNG TÍNH NĂNG FMM

*Nguồn: [docs.smax.ai/vi/vi-luu-y-khi-su-dung-tinh-nang-fmm](http://docs.smax.ai/vi/vi-luu-y-khi-su-dung-tinh-nang-fmm)*

# VI. LƯU Ý QUAN TRỌNG KHI SỬ DỤNG TÍNH NĂNG FMM

Để chiến dịch FMM vận hành ổn định và đạt hiệu quả tối ưu, quý khách vui lòng đọc kỹ các hướng dẫn về thời gian phân phối, nguyên tắc vận hành và quy trình xử lý sự cố dưới đây.

### 1. Thời gian phân phối quảng cáo

Sau khi khởi tạo thành công chiến dịch FMM trên Smax, quảng cáo sẽ **không hiển thị ngay lập tức**. Meta cần một khoảng thời gian để thực hiện quá trình "Data Mapping" (đối soát và khớp dữ liệu khách hàng).

* **Thời gian chờ dự kiến:** Có thể lên đến **2 - 3 ngày** làm việc.

* **Yếu tố ảnh hưởng:** Thời gian nhanh hay chậm phụ thuộc hoàn toàn vào số lượng dữ liệu bạn tải lên.

**💡 Ví dụ thực tế:**

* **Trường hợp A:** Bạn khởi tạo chiến dịch với tệp dữ liệu nhỏ (vài nghìn khách hàng), Meta đối soát nhanh → Quảng cáo có thể phân phối sau 24h.

* **Trường hợp B:** Bạn khởi tạo chiến dịch với tệp dữ liệu lớn (hàng trăm nghìn khách hàng), Meta cần nhiều thời gian hơn để quét và khớp dữ liệu → Quảng cáo có thể mất 48h - 72h mới bắt đầu phân phối.

### 2. Nguyên tắc vận hành an toàn (Bắt buộc)

Để tránh gây lỗi hệ thống và ảnh hưởng đến tài khoản quảng cáo, quý khách cần tuân thủ nguyên tắc sau:

**TUYỆT ĐỐI KHÔNG** thực hiện chỉnh sửa hoặc xóa chiến dịch FMM trực tiếp trên **Trình quản lý quảng cáo (Ads Manager)** của Meta sau khi đã khởi tạo thành công trên Smax.

**Tại sao không được chỉnh sửa trên Ads Manager?** Chiến dịch FMM được vận hành thông qua cơ chế đồng bộ dữ liệu API giữa Smax và Meta. Khi bạn can thiệp thủ công trên Ads Manager, liên kết đồng bộ này sẽ bị **đứt gãy (break sync)**, dẫn đến các rủi ro:

* Chiến dịch bị dừng phân phối đột ngột.

* Sai lệch dữ liệu báo cáo giữa Smax và Meta.

* Gây ra các sự cố kỹ thuật nghiêm trọng đối với tài khoản quảng cáo.

**Bảng hướng dẫn thao tác:**

Thao tácTh���c hiện trên SmaxThực hiện trên Ads ManagerKhởi tạo chiến dịch✅ Nên làm❌ Không nênChỉnh sửa nội dung/ngân sách✅ Nên làm❌ Tuyệt đối khôngXóa/Tắt chiến dịch✅ Nên làm❌ Tuyệt đối không

### 3. Quy trình xử lý khi chiến dịch không phân phối

Nếu chiến dịch FMM của bạn đã setup thành công trên Smax nhưng vẫn chưa được Meta phân phối, hãy thực hiện theo quy trình 3 bước sau:

**Bước 1: Kiểm tra thời gian chờ** Xác nhận xem chiến dịch đã khởi tạo được quá **3 ngày làm việc** hay chưa. Nếu chưa đủ 3 ngày, vui lòng kiên nhẫn chờ Meta hoàn tất quá trình đối soát dữ liệu.

**Bước 2: Thử khởi tạo lại** Nếu đã quá 3 ngày mà quảng cáo vẫn không chạy, hãy thử khởi tạo thêm một chiến dịch FMM mới từ Smax để kiểm tra xem lỗi có phải do tệp dữ liệu cụ thể của chiến dịch trước đó hay không.

**Bước 3: Liên hệ hỗ trợ kỹ thuật** Nếu cả hai bước trên đều không giải quyết được vấn đề, hãy thông báo cho đội ngũ kỹ thuật của Smax để được kiểm tra chuyên sâu tại đây: 👉 **Chat với hỗ trợ kỹ thuật:** [https://m.me/smax.apps](https://m.me/smax.apps)
