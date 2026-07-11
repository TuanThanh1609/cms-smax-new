# 5.2.1.14. MESSENGER API FUM

*Nguồn: [docs.smax.ai/vi/messenger-api-fum](http://docs.smax.ai/vi/messenger-api-fum)*

Trigger Messenger API FUM sử dụng để gửi tin Utility Message tới khách hàng của bạn mà không cần thao tác trực tiếp trên SmaxAI, bạn có thể tích hợp API vào bất cứ nơi nào (CRM, Google Sheet, LarkBase,…) để gọi API gửi tin

Lưu ý: Để gọi được API từ CRM, Sheet, LarkBase,… trước tiên bạn cần đồng bộ được page_pid và pid (định danh khách hàng trên page) của khách hàng từ SmaxAI lên các nền tảng đó trước

<img src="./ui-tich-hop/messenger-api-fum_img_9d103d83.png" alt="5.2.1.14. MESSENGER API FUM" />

Để sử dụng trigger, đầu tiên bạn cần đặt tên (1) và chọn kênh sẽ áp dụng trigger (2)

<img src="./ui-tich-hop/messenger-api-fum_img_d13c9eda.png" alt="5.2.1.14. MESSENGER API FUM" />

Tại phần API Token (3), bạn nên chọn API Token, hạn chế sử dụng Biz Token để tránh lộ thông tin và bị mất thông tin ngoài ý muốn

<img src="./ui-tich-hop/messenger-api-fum_img_13696cbb.png" alt="5.2.1.14. MESSENGER API FUM" />

Tiếp theo, chọn mẫu FUM sẽ gửi tại phần (4), nếu bạn chưa từng sử dụng tính năng FUM, vui lòng tham khảo trước [tại đây](/vi/messenger-api-fum)

<img src="./ui-tich-hop/messenger-api-fum_img_cb4b9c43.png" alt="5.2.1.14. MESSENGER API FUM" />

<img src="./ui-tich-hop/messenger-api-fum_img_813eebe5.png" alt="5.2.1.14. MESSENGER API FUM" />

Sau khi tạo xong trigger, bạn sẽ nhận được 1 API với các thông tin:

* Post API: endpoint url của api

* Headers: bao gồm token để gọi api

* Body: thông tin cần truyền khi gọi api. Ví dụ:

Để gọi api, bạn cần truyền đủ các thông tin vào body, bao gồm:

* customer_id: pid của khách hàng mà bạn đã có trên CRM, Google Sheet, LarkBase,…

* component_parameters: các biến trong mẫu tin FUM của bạn, ví dụ mẫu sau có 3 biến {{1}}, {{2}}, {{3}} và 1 biến {{1}} nằm trong button

<img src="./ui-tich-hop/messenger-api-fum_img_cb26dc21.png" alt="5.2.1.14. MESSENGER API FUM" />

Body bạn cần truyền vào cũng sẽ cần đầy đủ 3 biến trong nội dung tin nhắn và 1 biến trong button

javascript`{
  "customer_id": "customer_id",
  "page_id": "116096711383804",
  "template_id": "26476101635362790",
  "component_parameters": [
    {
      "type": "body",
      "parameters": [
        "value of {{1}}",
        "value of {{2}}",
        "value of {{3}}"
      ]
    },
    {
      "type": "buttons",
      "parameters": [
        {
          "type": "URL",
          "url": "value {{1}} of url"
        }
      ]
    }
  ]
}`
