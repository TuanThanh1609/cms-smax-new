const templatesData = [
  // 1. Tương tác (Interaction)
  {
    id: 1,
    tab: 'interaction',
    platform: 'facebook',
    title: 'Trả lời quảng cáo - Bám đuổi khách hàng',
    description: 'Tự động phản hồi bình luận, gửi tin nhắn Messenger để lấy SĐT và bám đuổi khách hàng tiềm năng.',
    author: 'Phan Hoàng Đa',
    rating: 5,
    image: 'template/212e373e-52a6-44d2-95a0-64cae1697d95.png',
    type: 'Kịch bản',
    industries: ['ecommerce', 'fb', 'service', 'realestate', 'agency']
  },
  {
    id: 2,
    tab: 'interaction',
    platform: 'zalo',
    title: 'Zalo OA - Chào mừng & Tặng quà thành viên',
    description: 'Kịch bản chào mừng tự động khi người dùng quan tâm OA, tự động phát mã giảm giá mua hàng.',
    author: 'Nguyễn Văn A',
    rating: 5,
    image: 'template/3899ce62-8ff6-4694-be67-28aa0c79a9de.png',
    type: 'Kịch bản',
    industries: ['ecommerce', 'fb', 'service']
  },
  {
    id: 3,
    tab: 'interaction',
    platform: 'whatsapp',
    title: 'WhatsApp - Khảo sát lọc nhu cầu tự động',
    description: 'Hỏi đáp tương tác qua nút bấm WhatsApp để phân loại khách hàng trước khi chia cho sale.',
    author: 'Trần Thị B',
    rating: 5,
    image: 'template/49ea4f00-e528-4d06-b469-45487daa8f1d.png',
    type: 'Kịch bản',
    industries: ['education', 'realestate', 'service', 'agency']
  },
  {
    id: 4,
    tab: 'interaction',
    platform: 'instagram',
    title: 'Instagram - Tặng Voucher tự động qua Direct Message',
    description: 'Tự động gửi kịch bản nhận mã giảm giá/voucher ngay khi khách nhắn tin trực tiếp trên Instagram.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/20260626-161645.jpg',
    type: 'Kịch bản',
    industries: ['ecommerce', 'fb']
  },
  // 2. Chăm sóc (Care)
  {
    id: 5,
    tab: 'care',
    platform: 'facebook',
    title: 'CSKH - Khảo sát mức độ hài lòng CSAT',
    description: 'Tự động nhắn tin hỏi thăm và xin đánh giá sao sau khi đơn hàng được ghi nhận thành công.',
    author: 'Lê Hoàng C',
    rating: 5,
    image: 'template/4da725c3-f78e-4fc8-aefa-9c4ee43608b7.png',
    type: 'Kịch bản',
    industries: ['ecommerce', 'fb', 'service', 'realestate', 'agency']
  },
  {
    id: 6,
    tab: 'care',
    platform: 'zalo',
    title: 'Zalo ZNS - Nhắc lịch hẹn tự động trước 2h',
    description: 'Gửi tin nhắn Zalo thông báo thời gian hẹn và thu thập xác nhận tham dự của khách hàng.',
    author: 'Phạm Minh D',
    rating: 5,
    image: 'template/57fc10fc-8a11-458c-9d90-221b75ea768c.png',
    type: 'Kịch bản',
    industries: ['education', 'realestate', 'service', 'fb']
  },
  {
    id: 7,
    tab: 'care',
    platform: 'whatsapp',
    title: 'WhatsApp - Chăm sóc khách cũ định kỳ',
    description: 'Chạy chiến dịch gửi tin nhắn hàng loạt theo mẫu đăng ký trước của WhatsApp để remarketing.',
    author: 'Vũ Hoàng E',
    rating: 4.8,
    image: 'template/ad518338-41d0-41da-a586-3c731891f833.png',
    type: 'Kịch bản',
    industries: ['ecommerce', 'service']
  },
  // 3. Meta Business AI
  {
    id: 8,
    tab: 'meta',
    platform: 'facebook',
    title: 'AI Agent - Tư vấn bán hàng thời trang',
    description: 'AI đọc bảng thông tin sản phẩm để tư vấn chọn kích thước, kiểm tra kho và chốt đơn.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/c1ec3299-ce9f-4133-9449-f9ff4011f4a6.png',
    type: 'Meta Business AI',
    industries: ['ecommerce', 'fb']
  },
  {
    id: 9,
    tab: 'meta',
    platform: 'whatsapp',
    title: 'AI Agent - Trợ lý hỗ trợ kỹ thuật khách hàng',
    description: 'AI tích hợp tài liệu hướng dẫn sử dụng để giải đáp mọi thắc mắc kỹ thuật của khách hàng.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/fcc5e1de-f822-47c0-9d95-7c33bd729ef2.png',
    type: 'Meta Business AI',
    industries: ['education', 'service', 'realestate', 'agency']
  },
  {
    id: 10,
    tab: 'meta',
    platform: 'zalo',
    title: 'AI Agent - Trợ lý Y tế & Hẹn khám bác sĩ',
    description: 'AI trả lời các thông tin sức khỏe cơ bản và hướng dẫn khách đăng ký lịch khám phù hợp.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/20260626-161628.jpg',
    type: 'Meta Business AI',
    industries: ['service', 'education']
  },
  // 4. Vận hành (Operations)
  // SAPO (4)
  {
    id: 11,
    tab: 'operations',
    platform: 'sapo',
    title: 'Sapo - Xác nhận đơn hàng mới',
    description: 'Tự động nhắn tin qua Messenger chào mừng và gửi thông tin chi tiết hóa đơn khi có đơn hàng mới từ Sapo.',
    author: 'Nghĩa Đắc',
    rating: 5,
    image: 'template/sapo/8c592561-a737-49cd-a833-49d3c5714516.png',
    type: 'Kịch bản',
    industries: ['ecommerce', 'fb']
  },
  {
    id: 12,
    tab: 'operations',
    platform: 'sapo',
    title: 'Sapo - Cập nhật trạng thái Đang vận chuyển',
    description: 'Tự động thông báo mã vận đơn và link hành trình đơn hàng ngay khi chuyển đối tác giao nhận trên Sapo.',
    author: 'Nghĩa Đắc',
    rating: 5,
    image: 'template/sapo/ae7ad2d5-4a66-46f1-97b2-913ba1ba3a9b.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 13,
    tab: 'operations',
    platform: 'sapo',
    title: 'Sapo - Xác nhận Giao hàng thành công',
    description: 'Nhắn tin CSKH tự động gửi lời cảm ơn và tặng voucher ưu đãi khi shipper báo giao thành công trên hệ thống Sapo.',
    author: 'Nghĩa Đắc',
    rating: 5,
    image: 'template/sapo/dbfc5584-defd-407f-a0a4-8609cf69db23.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 14,
    tab: 'operations',
    platform: 'sapo',
    title: 'Sapo - Thông báo Giao hàng thất bại',
    description: 'Tự động gửi tin nhắn nhắc khách hàng hoặc liên hệ lại để xếp lịch giao lại khi đơn hàng Sapo bị hoàn/giao lỗi.',
    author: 'Nghĩa Đắc',
    rating: 4.8,
    image: 'template/sapo/72943889-e0c1-4db0-bc00-b96792c51105.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  // HARAVAN (4)
  {
    id: 15,
    tab: 'operations',
    platform: 'haravan',
    title: 'Haravan - Xác nhận đơn hàng mới',
    description: 'Khi khách chốt đơn trên Haravan, tự động gửi tin nhắn tổng hợp chi tiết đơn hàng qua Zalo/Messenger.',
    author: 'Nghĩa Đắc',
    rating: 5,
    image: 'template/haravan/cf95d1af-b47c-499f-918c-23dc1db6757a.png',
    type: 'Kịch bản',
    industries: ['ecommerce', 'fb']
  },
  {
    id: 16,
    tab: 'operations',
    platform: 'haravan',
    title: 'Haravan - Cập nhật trạng thái Đang vận chuyển',
    description: 'Gửi mã vận đơn và thông tin nhà vận chuyển cho khách ngay khi đơn hàng chuyển trạng thái gửi hàng trên Haravan.',
    author: 'Nghĩa Đắc',
    rating: 5,
    image: 'template/haravan/f14624dc-1815-48e4-8cd0-326df636a349.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 17,
    tab: 'operations',
    platform: 'haravan',
    title: 'Haravan - Xác nhận Giao hàng thành công',
    description: 'Gửi tin nhắn cảm ơn và khảo sát nhanh mức độ hài lòng về sản phẩm/dịch vụ khi đơn Haravan giao thành công.',
    author: 'Nghĩa Đắc',
    rating: 5,
    image: 'template/haravan/eab1e45b-b81b-4b96-8604-4d82b48dd4a1.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 18,
    tab: 'operations',
    platform: 'haravan',
    title: 'Haravan - Thông báo Giao hàng thất bại',
    description: 'Tự động gửi thông tin báo đơn hàng gặp sự cố giao nhận để khách hàng chủ động phối hợp nhận lại.',
    author: 'Nghĩa Đắc',
    rating: 4.8,
    image: 'template/haravan/50e6fa52-6ff8-4cac-bae7-c0250207a2b9.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  // KIOTVIET (4)
  {
    id: 19,
    tab: 'operations',
    platform: 'kiotviet',
    title: 'KiotViet - Xác nhận đơn hàng mới',
    description: 'Nhận tín hiệu đơn hàng mới tạo trên KiotViet và gửi tin nhắn tự động thông báo đơn thành công.',
    author: 'Nghĩa Đắc',
    rating: 5,
    image: 'template/kiotviet/86ac62bd-38eb-4db3-b217-538cbedb1bb9.png',
    type: 'Kịch bản',
    industries: ['ecommerce', 'fb']
  },
  {
    id: 20,
    tab: 'operations',
    platform: 'kiotviet',
    title: 'KiotViet - Cập nhật trạng thái Đang vận chuyển',
    description: 'Tự động đồng bộ trạng thái giao vận từ KiotViet để gửi tin nhắn thông báo lộ trình đơn hàng cho khách.',
    author: 'Nghĩa Đắc',
    rating: 5,
    image: 'template/kiotviet/414f954c-3590-4a34-b0fc-412d31c67aca.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 21,
    tab: 'operations',
    platform: 'kiotviet',
    title: 'KiotViet - Xác nhận Giao hàng thành công',
    description: 'Nhắn tin cảm ơn, cộng điểm thành viên hoặc tặng quà tri ân sau khi đơn hàng KiotViet hoàn tất giao.',
    author: 'Nghĩa Đắc',
    rating: 5,
    image: 'template/kiotviet/e79e9e96-71e1-4ce3-8cff-e4b9a06f6639.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 22,
    tab: 'operations',
    platform: 'kiotviet',
    title: 'KiotViet - Thông báo Giao hàng không thành công',
    description: 'Hệ thống tự động thông báo đơn lỗi giao nhận trên KiotViet và hướng dẫn khách hàng cách xử lý nhanh chóng.',
    author: 'Nghĩa Đắc',
    rating: 4.8,
    image: 'template/kiotviet/ffcd0cb6-14c6-4bc2-ae20-56983a69cd61.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  // NHANH.VN (4)
  {
    id: 23,
    tab: 'operations',
    platform: 'nhanh',
    title: 'Nhanh.vn - Xác nhận đơn hàng mới',
    description: 'Khi có đơn hàng mới trên Nhanh.vn, tự động gửi tin nhắn xác nhận đơn kèm liên kết kiểm tra thông tin.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/nhanh/f2a3dab9-3eb4-4c64-abd9-2f3e26e630e2.png',
    type: 'Kịch bản',
    industries: ['ecommerce', 'fb']
  },
  {
    id: 24,
    tab: 'operations',
    platform: 'nhanh',
    title: 'Nhanh.vn - Cập nhật trạng thái Đang vận chuyển',
    description: 'Gửi tin nhắn cập nhật trạng thái đơn hàng bắt đầu được giao đến khách kèm số điện thoại shipper trên Nhanh.vn.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/nhanh/28d3def5-8ac3-4679-9aa3-dee74200977c.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 25,
    tab: 'operations',
    platform: 'nhanh',
    title: 'Nhanh.vn - Xác nhận Giao hàng thành công',
    description: 'Tự động gửi lời cảm ơn và mã giảm giá cho đơn hàng tiếp theo ngay khi shipper cập nhật giao thành công trên Nhanh.vn.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/nhanh/0e6a6e2a-7e27-443d-9d2b-58b6c4d3b3bf.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 26,
    tab: 'operations',
    platform: 'nhanh',
    title: 'Nhanh.vn - Thông báo Giao hàng không thành công',
    description: 'Gửi tin nhắn cảnh báo đơn giao lỗi hoặc bị hoàn trên Nhanh.vn, hỗ trợ khách hàng liên hệ lại với shipper.',
    author: 'Smax Product Team',
    rating: 4.9,
    image: 'template/nhanh/84190a29-f41a-494b-8620-650453cc634a.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  // POSCAKE (8)
  {
    id: 27,
    tab: 'operations',
    platform: 'poscake',
    title: 'PosCake - Xác nhận đơn hàng mới',
    description: 'Đồng bộ tức thời hóa đơn mới từ PosCake và tự động nhắn tin cảm ơn khách hàng qua Zalo/Facebook.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/pos/a48ab30a-8ac2-406e-bc01-637380c820cc.png',
    type: 'Kịch bản',
    industries: ['ecommerce', 'fb', 'service']
  },
  {
    id: 28,
    tab: 'operations',
    platform: 'poscake',
    title: 'PosCake - Cập nhật trạng thái Đang vận chuyển',
    description: 'Tự động cập nhật tiến độ vận chuyển đơn hàng từ PosCake lên Messenger/SMS để khách tiện theo dõi.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/pos/3db88776-662c-43aa-92a1-3c5c1259d168.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 29,
    tab: 'operations',
    platform: 'poscake',
    title: 'PosCake - Xác nhận Giao hàng thành công',
    description: 'Gửi lời cảm ơn, khảo sát sao và tích lũy điểm thưởng thành viên tự động sau khi đơn PosCake giao thành công.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/pos/8a826d13-9b7d-4e93-b068-4e1a268cf16e.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 30,
    tab: 'operations',
    platform: 'poscake',
    title: 'PosCake - Thông báo Giao hàng thất bại',
    description: 'Hệ thống tự động phát hiện đơn giao thất bại trên PosCake và gửi kịch bản CSKH hỗ trợ giao lại.',
    author: 'Smax Product Team',
    rating: 4.8,
    image: 'template/pos/0f34fc6f-5cc2-48ea-9d74-4ebd633f6645.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 31,
    tab: 'operations',
    platform: 'poscake',
    title: 'PosCake Mini - Xác nhận đơn hàng mới (Giao diện phẳng)',
    description: 'Giải pháp xác nhận đơn hàng mới gọn nhẹ, trực quan cho các cửa hàng nhỏ dùng PosCake.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/pos/0602d009-1967-48b9-88f8-c2f609a9bbb7.png',
    type: 'Kịch bản',
    industries: ['ecommerce', 'fb']
  },
  {
    id: 32,
    tab: 'operations',
    platform: 'poscake',
    title: 'PosCake Mini - Cập nhật trạng thái Đang vận chuyển (Giao diện phẳng)',
    description: 'Kịch bản theo dõi đơn giản, tự động nhắn tin hành trình đơn hàng tối giản cho khách qua Messenger.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/pos/8756fdf1-4cb5-4828-86ca-5b14758bf3dd.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 33,
    tab: 'operations',
    platform: 'poscake',
    title: 'PosCake Mini - Giao hàng thành công (Giao diện phẳng)',
    description: 'Tự động gửi tin nhắn báo giao hàng thành công kèm hóa đơn điện tử cho khách hàng từ PosCake.',
    author: 'Smax Product Team',
    rating: 5,
    image: 'template/pos/4e75c54f-f154-4481-94e3-8d8d9e951af1.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  },
  {
    id: 34,
    tab: 'operations',
    platform: 'poscake',
    title: 'PosCake Mini - Giao hàng thất bại (Giao diện phẳng)',
    description: 'Tự động gửi thông tin sự cố giao hàng và mẫu đăng ký nhận lại hàng dành cho đơn PosCake.',
    author: 'Smax Product Team',
    rating: 4.8,
    image: 'template/pos/ec9879f3-5e42-48d6-a64e-238b6b138672.png',
    type: 'Kịch bản',
    industries: ['ecommerce']
  }
];

// Helper mapping to yield custom flows and features for the preview modal
function getTemplateFeatures(item) {
  if (item.tab === 'interaction') {
    return [
      "Tự động phản hồi bình luận sau 3 giây",
      "Gửi tin nhắn cá nhân hóa qua Messenger/Zalo",
      "Thu thập thông tin số điện thoại tự động",
      "Gắn tag phân nhóm khách hàng mục tiêu"
    ];
  } else if (item.tab === 'care') {
    return [
      "Gửi tin nhắn nhắc hẹn/chăm sóc tự động",
      "Tích hợp khảo sát sao hài lòng khách hàng CSAT",
      "Phát voucher giảm giá tự động tri ân",
      "Lọc nhóm khách hàng cũ theo mức độ hài lòng"
    ];
  } else if (item.tab === 'meta') {
    return [
      "AI Agent đọc hiểu file thông tin/bảng giá sản phẩm",
      "Tự động tư vấn chốt đơn theo thời gian thực 24/7",
      "Giao tiếp thông minh tự nhiên như nhân viên thật",
      "Tự động gửi link đặt hàng & liên kết đơn hàng"
    ];
  } else {
    // Operations
    if (item.title.includes('Mới') || item.title.includes('mới')) {
      return [
        "Đồng bộ đơn hàng thời gian thực qua Webhook API",
        "Tự động gửi tin nhắn xác nhận hóa đơn",
        "Xác minh thông tin địa chỉ giao nhận",
        "Giảm tỷ lệ boom đơn & hủy đơn cho chủ cửa hàng"
      ];
    } else if (item.title.includes('chuyển') || item.title.includes('Chuyển')) {
      return [
        "Đồng bộ trạng thái vận đơn tự động",
        "Gửi mã vận đơn & đường dẫn tra cứu hành trình",
        "Gửi số điện thoại liên hệ shipper giao nhận",
        "Cảnh báo khách hàng chuẩn bị nhận hàng"
      ];
    } else if (item.title.includes('công') || item.title.includes('Công')) {
      return [
        "Gửi tin nhắn cảm ơn sau khi giao thành công",
        "Tự động cộng điểm thưởng thành viên",
        "Phát mã giảm giá ưu đãi cho đơn hàng sau",
        "Khảo sát nhanh chất lượng dịch vụ vận chuyển"
      ];
    } else {
      return [
        "Phát hiện đơn lỗi giao hàng/hoàn đơn lập tức",
        "Tự động liên hệ khách hàng hỏi lý do & xếp lịch",
        "Cập nhật thời gian hẹn giao lại từ phản hồi khách",
        "Giảm tối đa tỷ lệ hoàn hàng cho shop"
      ];
    }
  }
}

function getTemplateSteps(item) {
  if (item.tab === 'interaction') {
    return [
      "Khách hàng bình luận vào bài viết hoặc gửi tin nhắn",
      "Hệ thống Smax tự động Like, phản hồi bình luận công khai & gửi tin nhắn Messenger sau 3s",
      "Chatbot gửi kịch bản tặng quà/tư vấn và yêu cầu khách nhập SĐT",
      "Khách cung cấp SĐT, hệ thống tự động ghi nhận và đồng bộ CRM"
    ];
  } else if (item.tab === 'care') {
    return [
      "Kích hoạt sự kiện gửi chăm sóc định kỳ hoặc nhắc lịch hẹn",
      "Hệ thống tự động gửi tin nhắn mẫu Zalo ZNS/WhatsApp/Messenger",
      "Khách hàng bấm phản hồi hoặc chọn đánh giá sao chất lượng phục vụ",
      "Lưu điểm CSAT và chuyển tiếp nhân sự hỗ trợ lập tức nếu đánh giá thấp"
    ];
  } else if (item.tab === 'meta') {
    return [
      "Khách hàng nhắn tin hỏi thông tin sản phẩm, size, giá cả",
      "Smax AI Agent phân tích ý định khách hàng và truy vấn kho tri thức cấu hình sẵn",
      "AI phản hồi tự nhiên, giải đáp cặn kẽ và khéo léo đề xuất chốt đơn hàng",
      "Hệ thống ghi nhận đơn, xuất link hóa đơn và gửi cho khách hoàn tất thanh toán"
    ];
  } else {
    // Operations
    const platformName = item.platform === 'poscake' ? 'PosCake' : item.platform === 'kiotviet' ? 'KiotViet' : item.platform === 'nhanh' ? 'Nhanh.vn' : item.platform === 'haravan' ? 'Haravan' : 'Sapo';
    
    if (item.title.includes('Mới') || item.title.includes('mới')) {
      return [
        `Khách đặt đơn hàng mới thành công trên cửa hàng ${platformName}`,
        `Webhook của ${platformName} đẩy thông tin hóa đơn tức thời về Smax.ai`,
        "Smax.ai tự động gửi tin nhắn Messenger/Zalo xác nhận thông tin đơn hàng & số điện thoại",
        "Khách hàng bấm xác nhận thông tin đơn hàng là chính xác"
      ];
    } else if (item.title.includes('chuyển') || item.title.includes('Chuyển')) {
      return [
        `Chủ shop đóng gói và giao shipper trên hệ thống quản lý ${platformName}`,
        "Trạng thái vận chuyển đổi thành 'Đang giao hàng', kích hoạt webhook",
        "Smax.ai tự động nhắn mã vận đơn và link tra cứu hành trình cho khách",
        "Khách hàng theo dõi vận đơn trực quan và chuẩn bị nhận hàng"
      ];
    } else if (item.title.includes('công') || item.title.includes('Công')) {
      return [
        `Shipper giao hàng thành công và cập nhật hoàn tất trên ${platformName}`,
        "Smax.ai phát hiện thay đổi và kích hoạt kịch bản giao thành công",
        "Gửi tin nhắn cảm ơn, tặng điểm thành viên và mã voucher tri ân",
        "Lưu trữ dữ liệu hành vi mua sắm để triển khai phễu remarketing tiếp theo"
      ];
    } else {
      return [
        `Đơn hàng giao thất bại (khách thuê bao, shipper không liên lạc được) báo về ${platformName}`,
        "Hệ thống Smax.ai kích hoạt quy trình cứu đơn tự động",
        "Gửi tin nhắn hỏi lý do lỗi hẹn và nút bấm để khách chọn giờ giao lại",
        "Khách xác nhận hẹn lại, cập nhật thông tin vận đơn tự động"
      ];
    }
  }
}

// Global SVG platform icons builder helper
function getPlatformIcon(platform) {
  if (platform === 'facebook') {
    return `<svg class="p-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
  } else if (platform === 'instagram') {
    return `<svg class="p-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
  } else if (platform === 'whatsapp') {
    return `<svg class="p-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 2.766 1.498 4.776 1.499 5.568 0 10.104-4.516 10.107-10.076.002-2.695-1.043-5.228-2.946-7.133C16.63 1.54 14.111.493 11.424.492 5.86 .492 1.326 5.008 1.323 10.569c-.001 2.083.548 3.325 1.503 4.887l-1.003 3.66 3.766-.988z"/></svg>`;
  } else if (platform === 'zalo') {
    return `<svg class="p-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 5.92 2 10.763c0 2.923 1.637 5.513 4.184 7.085l-1.127 3.38c-.12.36.212.678.528.5L9.62 20.08c.767.147 1.56.223 2.38.223 5.523 0 10-3.92 10-8.763S17.523 2 12 2z"/></svg>`;
  } else if (platform === 'telegram') {
    return `<svg class="p-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.29 7.71l-1.87 8.78c-.14.63-.51.78-1.04.48l-2.85-2.1-1.37 1.32c-.15.15-.28.28-.57.28l.2-2.88 5.24-4.73c.23-.2-.05-.32-.35-.12l-6.48 4.08-2.79-.87c-.61-.19-.62-.61.13-.9l10.9-4.2c.5-.19.95.11.8.86z"/></svg>`;
  } else if (platform === 'sapo') {
    return `<svg class="p-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="3" ry="3"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>`;
  } else if (platform === 'kiotviet') {
    return `<svg class="p-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
  } else if (platform === 'haravan') {
    return `<svg class="p-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/></svg>`;
  } else if (platform === 'nhanh') {
    return `<svg class="p-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
  } else if (platform === 'poscake') {
    return `<svg class="p-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8l4 4-4 4M8 12h8"/></svg>`;
  }
  return `<svg class="p-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>`;
}

document.addEventListener("DOMContentLoaded", () => {
  // DOM Nodes Selection
  const gridContainer = document.getElementById("templates-container");
  const emptyState = document.getElementById("templates-empty");
  const resultsCountSpan = document.querySelector("#results-count span");
  const searchInput = document.getElementById("template-search");
  const sortSelect = document.getElementById("template-sort");
  const resetFiltersBtn = document.getElementById("btn-reset-filters");

  // Sidebar elements
  const sidebar = document.getElementById("templates-sidebar");
  const mobileFilterToggle = document.getElementById("mobile-filter-toggle");
  const sidebarCloseBtn = document.getElementById("sidebar-close-btn");

  // Inputs selection
  const categoryRadios = document.querySelectorAll("input[name='category']");
  const platformCheckboxes = document.querySelectorAll("input[name='platform']");
  const industryCheckboxes = document.querySelectorAll("input[name='industry']");

  // Active filter tags row
  const activeTagsContainer = document.getElementById("active-tags-container");

  // Modal elements
  const modalOverlay = document.getElementById("template-modal-overlay");
  const modalClose = document.getElementById("modal-close-btn");
  const modalImg = document.getElementById("modal-template-image");
  const modalTitle = document.getElementById("modal-template-title");
  const modalRatingVal = document.getElementById("modal-rating-val");
  const modalRatingStars = document.getElementById("modal-rating-stars");
  const modalAuthor = document.getElementById("modal-template-author");
  const modalDesc = document.getElementById("modal-template-desc");
  const modalPlatformBadge = document.getElementById("modal-platform-badge");
  const modalFeaturesList = document.getElementById("modal-features-list");
  const modalFlowSteps = document.getElementById("modal-flow-steps");
  const btnInstall = document.getElementById("btn-install-script");
  const modalLoader = document.getElementById("modal-loader");
  const loaderStatus = document.getElementById("loader-status");

  // Toast Container
  const toastContainer = document.getElementById("toast-container");

  // State Management
  let currentFilters = {
    category: 'all',
    platforms: [],
    industries: [],
    search: '',
    sort: 'newest'
  };

  let activeTemplate = null;

  // Filter & Render logic
  const renderStoreTemplates = () => {
    if (!gridContainer) return;

    // 1. Filter dataset
    let filtered = templatesData.filter(item => {
      // Category filter (single select)
      if (currentFilters.category !== 'all' && item.tab !== currentFilters.category) {
        return false;
      }

      // Platforms filter (multi-select)
      if (currentFilters.platforms.length > 0 && !currentFilters.platforms.includes(item.platform)) {
        return false;
      }

      // Industries filter (multi-select)
      if (currentFilters.industries.length > 0) {
        const hasMatchingIndustry = item.industries.some(ind => currentFilters.industries.includes(ind));
        if (!hasMatchingIndustry) return false;
      }

      // Search query filter
      if (currentFilters.search) {
        const query = currentFilters.search.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(query);
        const descMatch = item.description.toLowerCase().includes(query);
        const authorMatch = item.author.toLowerCase().includes(query);
        const platformMatch = item.platform.toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !authorMatch && !platformMatch) return false;
      }

      return true;
    });

    // 2. Sort dataset
    if (currentFilters.sort === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (currentFilters.sort === 'popular') {
      // view logic simulated by id formula
      filtered.sort((a, b) => {
        const viewsA = (a.id * 17) % 100;
        const viewsB = (b.id * 17) % 100;
        return viewsB - viewsA;
      });
    } else if (currentFilters.sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (currentFilters.sort === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Update count indicator
    resultsCountSpan.innerText = filtered.length;

    // Clear grid
    gridContainer.innerHTML = "";

    if (filtered.length === 0) {
      emptyState.style.display = "flex";
      gridContainer.style.display = "none";
    } else {
      emptyState.style.display = "none";
      gridContainer.style.display = "grid";

      filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "template-card is-visible";
        card.setAttribute("data-id", item.id);
        
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
          starsHtml += `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
        }

        const displayName = item.platform === 'poscake' ? 'PosCake' : item.platform === 'kiotviet' ? 'KiotViet' : item.platform === 'nhanh' ? 'Nhanh.vn' : item.platform === 'haravan' ? 'Haravan' : item.platform === 'sapo' ? 'Sapo' : item.platform;

        card.innerHTML = `
          <div class="template-card-image-wrapper">
            <span class="template-access-badge public">PUBLIC</span>
            <img src="${item.image}" alt="${item.title}" class="template-card-image" loading="lazy">
          </div>
          <div class="template-card-content">
            <h3>${item.title}</h3>
            <div class="template-rating-author">
              <div class="template-stars">${starsHtml}</div>
              <span class="template-author">By ${item.author}</span>
            </div>
            <p>${item.description}</p>
            <div class="template-card-footer">
              <div class="template-platform-tag">
                ${getPlatformIcon(item.platform)}
                <span class="template-platform-name">${displayName}</span>
              </div>
              <span class="template-type-tag">${item.type}</span>
            </div>
          </div>
          <div class="template-card-hover-overlay">
            <button class="btn-template-detail">Chi tiết</button>
          </div>
        `;

        // Click actions
        card.addEventListener("click", (e) => {
          // If the user clicks the chi tiết button or any area of the card
          openDetailModal(item);
        });

        gridContainer.appendChild(card);
      });
    }

    renderActiveTags();
  };

  // Render filter tags dynamically
  const renderActiveTags = () => {
    if (!activeTagsContainer) return;

    let tagsHtml = "";
    let hasFilters = false;

    // Check category
    if (currentFilters.category !== 'all') {
      hasFilters = true;
      const label = document.querySelector(`input[name='category'][value='${currentFilters.category}']`).nextElementSibling.innerText;
      tagsHtml += `
        <span class="active-tag">
          Loại: ${label}
          <button class="active-tag-close" data-filter-type="category" data-val="${currentFilters.category}" aria-label="Xóa bộ lọc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </span>
      `;
    }

    // Platforms
    currentFilters.platforms.forEach(plat => {
      hasFilters = true;
      const label = document.querySelector(`input[name='platform'][value='${plat}']`).nextElementSibling.innerText;
      tagsHtml += `
        <span class="active-tag">
          Nền tảng: ${label}
          <button class="active-tag-close" data-filter-type="platform" data-val="${plat}" aria-label="Xóa bộ lọc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </span>
      `;
    });

    // Industries
    currentFilters.industries.forEach(ind => {
      hasFilters = true;
      const label = document.querySelector(`input[name='industry'][value='${ind}']`).nextElementSibling.innerText;
      tagsHtml += `
        <span class="active-tag">
          Ngành: ${label}
          <button class="active-tag-close" data-filter-type="industry" data-val="${ind}" aria-label="Xóa bộ lọc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </span>
      `;
    });

    if (currentFilters.search) {
      hasFilters = true;
      tagsHtml += `
        <span class="active-tag">
          Tìm kiếm: "${currentFilters.search}"
          <button class="active-tag-close" data-filter-type="search" aria-label="Xóa bộ lọc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </span>
      `;
    }

    if (hasFilters) {
      tagsHtml += `<button class="btn-clear-all" id="btn-clear-all-filters">Xóa tất cả bộ lọc</button>`;
      activeTagsContainer.innerHTML = tagsHtml;
      activeTagsContainer.style.display = "flex";
      
      // Bind tag click events
      activeTagsContainer.querySelectorAll(".active-tag-close").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const filterType = btn.getAttribute("data-filter-type");
          const val = btn.getAttribute("data-val");

          if (filterType === 'category') {
            currentFilters.category = 'all';
            document.querySelector(`input[name='category'][value='all']`).checked = true;
          } else if (filterType === 'platform') {
            currentFilters.platforms = currentFilters.platforms.filter(p => p !== val);
            document.querySelector(`input[name='platform'][value='${val}']`).checked = false;
          } else if (filterType === 'industry') {
            currentFilters.industries = currentFilters.industries.filter(i => i !== val);
            document.querySelector(`input[name='industry'][value='${val}']`).checked = false;
          } else if (filterType === 'search') {
            currentFilters.search = '';
            searchInput.value = '';
          }
          renderStoreTemplates();
        });
      });

      // Bind Clear All Click
      document.getElementById("btn-clear-all-filters")?.addEventListener("click", resetAllFilters);
    } else {
      activeTagsContainer.style.display = "none";
      activeTagsContainer.innerHTML = "";
    }
  };

  // Reset Filters to defaults
  const resetAllFilters = () => {
    currentFilters = {
      category: 'all',
      platforms: [],
      industries: [],
      search: '',
      sort: sortSelect ? sortSelect.value : 'newest'
    };

    // Reset UI Inputs
    const defaultCat = document.querySelector("input[name='category'][value='all']");
    if (defaultCat) defaultCat.checked = true;
    if (platformCheckboxes) platformCheckboxes.forEach(cb => cb.checked = false);
    if (industryCheckboxes) industryCheckboxes.forEach(cb => cb.checked = false);
    if (searchInput) searchInput.value = "";

    renderStoreTemplates();
  };

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", resetAllFilters);
  }

  // Bind Input Changes
  categoryRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      currentFilters.category = e.target.value;
      renderStoreTemplates();
    });
  });

  platformCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      currentFilters.platforms = Array.from(platformCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      renderStoreTemplates();
    });
  });

  industryCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      currentFilters.industries = Array.from(industryCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      renderStoreTemplates();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentFilters.search = e.target.value.trim();
      renderStoreTemplates();
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        currentFilters.search = e.target.value.trim();
        renderStoreTemplates();
      }
    });
  }

  const searchBtn = document.querySelector(".search-btn");
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      currentFilters.search = searchInput.value.trim();
      renderStoreTemplates();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentFilters.sort = e.target.value;
      renderStoreTemplates();
    });
  }

  // Mobile Filter Drawer Handlers
  if (mobileFilterToggle && sidebar) {
    mobileFilterToggle.addEventListener("click", () => {
      sidebar.classList.add("is-open");
    });
  }

  if (sidebarCloseBtn && sidebar) {
    sidebarCloseBtn.addEventListener("click", () => {
      sidebar.classList.remove("is-open");
    });
  }

  // Close Mobile sidebar when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 980) {
      if (sidebar && sidebar.classList.contains("is-open") && !sidebar.contains(e.target) && e.target !== mobileFilterToggle && !mobileFilterToggle.contains(e.target)) {
        sidebar.classList.remove("is-open");
      }
    }
  });

  // Detailed Modal Functions
  const openDetailModal = (item) => {
    activeTemplate = item;

    // Fill elements
    modalImg.src = item.image;
    modalImg.alt = item.title;
    modalTitle.innerText = item.title;
    modalRatingVal.innerText = item.rating.toFixed(1);
    modalAuthor.innerText = `By ${item.author}`;
    modalDesc.innerText = item.description;

    const displayName = item.platform === 'poscake' ? 'PosCake' : item.platform === 'kiotviet' ? 'KiotViet' : item.platform === 'nhanh' ? 'Nhanh.vn' : item.platform === 'haravan' ? 'Haravan' : item.platform === 'sapo' ? 'Sapo' : item.platform;
    modalPlatformBadge.innerHTML = `
      ${getPlatformIcon(item.platform)}
      <span>${displayName}</span>
    `;

    // Fill stars
    let starsHtml = "";
    const ratingFloor = Math.floor(item.rating);
    for (let i = 0; i < 5; i++) {
      if (i < ratingFloor) {
        starsHtml += `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      } else {
        starsHtml += `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      }
    }
    modalRatingStars.innerHTML = starsHtml;

    // Fill features list
    const features = getTemplateFeatures(item);
    modalFeaturesList.innerHTML = "";
    features.forEach(feat => {
      const li = document.createElement("li");
      li.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${feat}</span>
      `;
      modalFeaturesList.appendChild(li);
    });

    // Fill steps list
    const steps = getTemplateSteps(item);
    modalFlowSteps.innerHTML = "";
    steps.forEach((step, i) => {
      const stepItem = document.createElement("div");
      stepItem.className = "flow-step-item";
      stepItem.innerHTML = `
        <div class="flow-step-number">${i + 1}</div>
        <div class="flow-step-content">${step}</div>
      `;
      modalFlowSteps.appendChild(stepItem);
    });

    // Show modal
    modalOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden"; // Disable scroll background
  };

  const closeDetailModal = () => {
    modalOverlay.classList.remove("is-active");
    document.body.style.overflow = "";
    activeTemplate = null;
  };

  if (modalClose) {
    modalClose.addEventListener("click", closeDetailModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeDetailModal();
      }
    });
  }

  // Toast creation logic
  const showToast = (title, message) => {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">&times;</button>
    `;

    toastContainer.appendChild(toast);

    // Active animation delay
    setTimeout(() => {
      toast.classList.add("is-active");
    }, 50);

    // Close handler
    const closeBtn = toast.querySelector(".toast-close");
    closeBtn.addEventListener("click", () => {
      toast.classList.remove("is-active");
      setTimeout(() => {
        toast.remove();
      }, 400);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.remove("is-active");
        setTimeout(() => {
          toast.remove();
        }, 400);
      }
    }, 5000);
  };

  // Mock installation sequence
  if (btnInstall) {
    btnInstall.addEventListener("click", () => {
      if (!activeTemplate) return;

      modalLoader.classList.add("is-active");
      
      const statuses = [
        "Đang kết nối cổng API...",
        "Đang tạo luồng kịch bản kịch bản mẫu...",
        "Đang đồng bộ dữ liệu với tài khoản Smax của bạn...",
        "Đang xác minh cấu hình luồng..."
      ];

      let progress = 0;
      loaderStatus.innerText = statuses[0];

      const interval = setInterval(() => {
        progress++;
        if (progress < statuses.length) {
          loaderStatus.innerText = statuses[progress];
        } else {
          clearInterval(interval);
          
          // Complete mock install
          modalLoader.classList.remove("is-active");
          closeDetailModal();

          // Show Success Toast
          showToast(
            "Cài đặt kịch bản thành công!",
            `Kịch bản "${activeTemplate.title}" đã được thêm vào sơ đồ Automation Map của bạn.`
          );
        }
      }, 500);
    });
  }

  // Initial trigger render
  renderStoreTemplates();

  // Check URL params or Hash to open detail modal automatically
  const checkUrlParamsAndOpenModal = () => {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("id") || window.location.hash.replace("#template-", "");
    if (templateId) {
      const parsedId = parseInt(templateId, 10);
      const template = templatesData.find(item => item.id === parsedId);
      if (template) {
        // Smooth delay to ensure full render before showing modal
        setTimeout(() => {
          openDetailModal(template);
        }, 150);
      }
    }
  };
  
  checkUrlParamsAndOpenModal();

  // Intercept homepage card detail clicks to open inline modals instead of redirecting
  const initHomepageCardClicks = () => {
    const homepageDetailButtons = document.querySelectorAll(".templates-slider-wrapper .btn-template-detail");
    homepageDetailButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const urlStr = btn.getAttribute("href");
        if (urlStr && urlStr.includes("id=")) {
          e.preventDefault();
          const templateId = parseInt(urlStr.split("id=")[1], 10);
          const template = templatesData.find(item => item.id === templateId);
          if (template) {
            openDetailModal(template);
          }
        }
      });
    });
  };
  
  initHomepageCardClicks();
});
