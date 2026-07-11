const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');
const readline = require('readline');

// The Page Definitions and exact replacements for ALL 19 pages including HERO IMAGES/VIDEOS!
const pageMappings = {
  'index': {
    file: 'index.html',
    items: [
      {
        key: 'index-hero-eyebrow',
        search: '<p class="eyebrow reveal" data-cms="hero-eyebrow">AI-Automation Hub cho Sales & Marketing</p>',
        replace: '<p class="eyebrow reveal" data-cms="index-hero-eyebrow">AI-Automation Hub cho Sales & Marketing</p>',
        value: 'AI-Automation Hub cho Sales & Marketing'
      },
      {
        key: 'index-hero-title',
        search: '<h1 class="reveal" data-cms="hero-title">Nền tảng AI-Automation giúp doanh nghiệp tăng trưởng mạnh mẽ</h1>',
        replace: '<h1 class="reveal" data-cms="index-hero-title">Nền tảng AI-Automation giúp doanh nghiệp tăng trưởng mạnh mẽ</h1>',
        value: 'Nền tảng AI-Automation giúp doanh nghiệp tăng trưởng mạnh mẽ'
      },
      {
        key: 'index-hero-sub',
        search: '<p class="hero-subtitle reveal" data-cms="hero-sub">',
        replace: '<p class="hero-subtitle reveal" data-cms="index-hero-sub">',
        value: 'Siêu ứng dụng hỗ trợ, chăm sóc và bán hàng đa kênh. Smax.ai hợp nhất hội thoại, dữ liệu khách hàng, đơn hàng và automation thành một hệ thống vận hành gọn gàng.'
      },
      {
        key: 'index-hero-video',
        search: '<video src="https://smax.ai/vi/media/Smax-AI-0eEoQ.webm" autoplay loop muted playsinline class="hero-video"></video>',
        replace: '<video data-cms-img="index-hero-video" src="https://smax.ai/vi/media/Smax-AI-0eEoQ.webm" autoplay loop muted playsinline class="hero-video"></video>',
        value: 'https://smax.ai/vi/media/Smax-AI-0eEoQ.webm'
      },
      {
        key: 'index-val-card-title-1',
        search: '<h3>Đa kênh mạnh mẽ</h3>',
        replace: '<h3 data-cms="index-val-card-title-1">Đa kênh mạnh mẽ</h3>',
        value: 'Đa kênh mạnh mẽ'
      },
      {
        key: 'index-val-card-desc-1',
        search: '<p>Kết nối Facebook, Zalo, Website, TikTok, Email, SMS và nhiều nền tảng khác.</p>',
        replace: '<p data-cms="index-val-card-desc-1">Kết nối Facebook, Zalo, Website, TikTok, Email, SMS và nhiều nền tảng khác.</p>',
        value: 'Kết nối Facebook, Zalo, Website, TikTok, Email, SMS và nhiều nền tảng khác.'
      },
      {
        key: 'index-val-card-title-2',
        search: '<h3>AI thông minh</h3>',
        replace: '<h3 data-cms="index-val-card-title-2">AI thông minh</h3>',
        value: 'AI thông minh'
      },
      {
        key: 'index-val-card-desc-2',
        search: '<p>AI tư vấn, phân tích hội thoại, tạo nội dung và hỗ trợ vận hành.</p>',
        replace: '<p data-cms="index-val-card-desc-2">AI tư vấn, phân tích hội thoại, tạo nội dung và hỗ trợ vận hành.</p>',
        value: 'AI tư vấn, phân tích hội thoại, tạo nội dung và hỗ trợ vận hành.'
      },
      {
        key: 'index-val-card-title-3',
        search: '<h3>Tăng trưởng bền vững</h3>',
        replace: '<h3 data-cms="index-val-card-title-3">Tăng trưởng bền vững</h3>',
        value: 'Tăng trưởng bền vững'
      },
      {
        key: 'index-val-card-desc-3',
        search: '<p>Tối ưu chi phí, nâng cao hiệu suất và tăng giá trị vòng đời khách hàng.</p>',
        replace: '<p data-cms="index-val-card-desc-3">Tối ưu chi phí, nâng cao hiệu suất và tăng giá trị vòng đời khách hàng.</p>',
        value: 'Tối ưu chi phí, nâng cao hiệu suất và tăng giá trị vòng đời khách hàng.'
      },
      {
        key: 'index-modules-eyebrow',
        search: '<p class="eyebrow">Hệ sinh thái sản phẩm</p>',
        replace: '<p class="eyebrow" data-cms="index-modules-eyebrow">Hệ sinh thái sản phẩm</p>',
        value: 'Hệ sinh thái sản phẩm'
      },
      {
        key: 'index-modules-title',
        search: '<h2>Các phân hệ tính năng của Smax.ai</h2>',
        replace: '<h2 data-cms="index-modules-title">Các phân hệ tính năng của Smax.ai</h2>',
        value: 'Các phân hệ tính năng của Smax.ai'
      },
      {
        key: 'index-modules-desc',
        search: '<p>Một hệ sinh thái kết nối xuyên suốt hoạt động Sales, Marketing và Customer Service.</p>',
        replace: '<p data-cms="index-modules-desc">Một hệ sinh thái kết nối xuyên suốt hoạt động Sales, Marketing và Customer Service.</p>',
        value: 'Một hệ sinh thái kết nối xuyên suốt hoạt động Sales, Marketing và Customer Service.'
      },
      {
        key: 'index-cta-title',
        search: '<h2>Bắt đầu tự động hóa kinh doanh của bạn ngay hôm nay</h2>',
        replace: '<h2 data-cms="index-cta-title">Bắt đầu tự động hóa kinh doanh của bạn ngay hôm nay</h2>',
        value: 'Bắt đầu tự động hóa kinh doanh của bạn ngay hôm nay'
      },
      {
        key: 'index-cta-desc',
        search: '<p class="cta-subtitle reveal">Gia nhập cùng hơn 10.000+ doanh nghiệp đang bứt phá tăng trưởng bằng giải pháp AI-Automation toàn diện từ Smax.ai.</p>',
        replace: '<p class="cta-subtitle reveal" data-cms="index-cta-desc">Gia nhập cùng hơn 10.000+ doanh nghiệp đang bứt phá tăng trưởng bằng giải pháp AI-Automation toàn diện từ Smax.ai.</p>',
        value: 'Gia nhập cùng hơn 10.000+ doanh nghiệp đang bứt phá tăng trưởng bằng giải pháp AI-Automation toàn diện từ Smax.ai.'
      }
    ]
  },
  'ecommerce': {
    file: 'ecommerce.html',
    items: [
      {
        key: 'ecom-hero-badge',
        search: '<span>Ứng dụng AI cho E-commerce &amp; Bán lẻ</span>',
        replace: '<span data-cms="ecom-hero-badge">Ứng dụng AI cho E-commerce &amp; Bán lẻ</span>',
        value: 'Ứng dụng AI cho E-commerce & Bán lẻ'
      },
      {
        key: 'ecom-hero-title',
        search: '<h1>\n              Ứng dụng AI-Automation <span class="highlight">cho E-commerce &amp; Bán lẻ</span>\n            </h1>',
        replace: '<h1 data-cms="ecom-hero-title">\n              Ứng dụng AI-Automation <span class="highlight">cho E-commerce &amp; Bán lẻ</span>\n            </h1>',
        value: 'Ứng dụng AI-Automation cho E-commerce & Bán lẻ'
      },
      {
        key: 'ecom-hero-sub',
        search: '<p class="hero-sub">',
        replace: '<p class="hero-sub" data-cms="ecom-hero-sub">',
        value: 'Xây dựng kênh bán hàng riêng, sở hữu dữ liệu khách hàng và tăng doanh thu từ mọi cuộc hội thoại. Tự động hóa bán hàng, tăng tỷ lệ mua lại và giảm phụ thuộc vào sàn thương mại điện tử.'
      },
      {
        key: 'ecom-hero-img',
        search: '<img src="asset smax/ecommerce-v2/hero-ecommerce-map.webp" alt="Bản đồ tự động hóa bán lẻ Smax" />',
        replace: '<img data-cms-img="ecom-hero-img" src="asset smax/ecommerce-v2/hero-ecommerce-map.webp" alt="Bản đồ tự động hóa bán lẻ Smax" />',
        value: 'asset smax/ecommerce-v2/hero-ecommerce-map.webp'
      },
      {
        key: 'ecom-challenges-title',
        search: '<h2 class="section-title">Những thách thức kìm hãm tăng trưởng E-commerce</h2>',
        replace: '<h2 class="section-title" data-cms="ecom-challenges-title">Những thách thức kìm hãm tăng trưởng E-commerce</h2>',
        value: 'Những thách thức kìm hãm tăng trưởng E-commerce'
      },
      {
        key: 'ecom-challenges-desc',
        search: '<p class="section-desc">\n                Doanh nghiệp E-commerce ngày càng chịu áp lực lớn về chi phí quảng cáo, mất dữ liệu khách hàng vào tay bên thứ ba, và khó giữ chân người mua hàng quay lại.\n              </p>',
        replace: '<p class="section-desc" data-cms="ecom-challenges-desc">\n                Doanh nghiệp E-commerce ngày càng chịu áp lực lớn về chi phí quảng cáo, mất dữ liệu khách hàng vào tay bên thứ ba, và khó giữ chân người mua hàng quay lại.\n              </p>',
        value: 'Doanh nghiệp E-commerce ngày càng chịu áp lực lớn về chi phí quảng cáo, mất dữ liệu khách hàng vào tay bên thứ ba, và khó giữ chân người mua hàng quay lại.'
      },
      {
        key: 'ecom-cta-title',
        search: '<h2>Bắt đầu tăng trưởng doanh thu E-commerce cùng Smax.ai</h2>',
        replace: '<h2 data-cms="ecom-cta-title">Bắt đầu tăng trưởng doanh thu E-commerce cùng Smax.ai</h2>',
        value: 'Bắt đầu tăng trưởng doanh thu E-commerce cùng Smax.ai'
      },
      {
        key: 'ecom-cta-desc',
        search: 'Tham gia cùng hơn hàng chục nghìn shop online, thương hiệu bán lẻ lớn đã số hóa quy trình bán hàng và chăm sóc khách hàng tự động.',
        replace: 'Tham gia cùng hơn hàng chục nghìn shop online, thương hiệu bán lẻ lớn đã số hóa quy trình bán hàng và chăm sóc khách hàng tự động.',
        value: 'Tham gia cùng hơn hàng chục nghìn shop online, thương hiệu bán lẻ lớn đã số hóa quy trình bán hàng và chăm sóc khách hàng tự động.'
      }
    ]
  },
  'education': {
    file: 'education.html',
    items: [
      {
        key: 'edu-hero-badge',
        search: '<span>Ứng dụng AI cho Ngành Giáo dục &amp; Đào tạo</span>',
        replace: '<span data-cms="edu-hero-badge">Ứng dụng AI cho Ngành Giáo dục &amp; Đào tạo</span>',
        value: 'Ứng dụng AI cho Ngành Giáo dục & Đào tạo'
      },
      {
        key: 'edu-hero-title',
        search: '<h1>\n              Ứng dụng AI-Automation <span class="highlight">cho Ngành Giáo dục</span>\n            </h1>',
        replace: '<h1 data-cms="edu-hero-title">\n              Ứng dụng AI-Automation <span class="highlight">cho Ngành Giáo dục</span>\n            </h1>',
        value: 'Ứng dụng AI-Automation cho Ngành Giáo dục'
      },
      {
        key: 'edu-hero-sub',
        search: '<p class="hero-sub">',
        replace: '<p class="hero-sub" data-cms="edu-hero-sub">',
        value: 'Tự động hóa tuyển sinh và nâng cao trải nghiệm học viên. Tối ưu toàn bộ hành trình từ tư vấn khóa học, quản lý học viên đến chăm sóc phụ huynh.'
      },
      {
        key: 'edu-hero-img',
        search: '<img src="asset smax/education-v2/hero-education-map.webp" alt="Bản đồ tự động hóa hành trình tuyển sinh và chăm sóc học viên Smax" />',
        replace: '<img data-cms-img="edu-hero-img" src="asset smax/education-v2/hero-education-map.webp" alt="Bản đồ tự động hóa hành trình tuyển sinh và chăm sóc học viên Smax" />',
        value: 'asset smax/education-v2/hero-education-map.webp'
      },
      {
        key: 'edu-challenges-title',
        search: '<h2 class="section-title">Những thách thức kìm hãm tuyển sinh &amp; vận hành đào tạo</h2>',
        replace: '<h2 class="section-title" data-cms="edu-challenges-title">Những thách thức kìm hãm tuyển sinh &amp; vận hành đào tạo</h2>',
        value: 'Những thách thức kìm hãm tuyển sinh & vận hành đào tạo'
      },
      {
        key: 'edu-challenges-desc',
        search: '<p class="section-desc">\n                Các cơ sở giáo dục, trung tâm đào tạo đang đối mặt với chi phí thu hút học viên mới tăng cao, tỷ lệ chuyển đổi tư vấn thấp, và khó khăn trong việc gắn kết phụ huynh học sinh.\n              </p>',
        replace: '<p class="section-desc" data-cms="edu-challenges-desc">\n                Các cơ sở giáo dục, trung tâm đào tạo đang đối mặt với chi phí thu hút học viên mới tăng cao, tỷ lệ chuyển đổi tư vấn thấp, và khó khăn trong việc gắn kết phụ huynh học sinh.\n              </p>',
        value: 'Các cơ sở giáo dục, trung tâm đào tạo đang đối mặt với chi phí thu hút học viên mới tăng cao, tỷ lệ chuyển đổi tư vấn thấp, và khó khăn trong việc gắn kết phụ huynh học sinh.'
      },
      {
        key: 'edu-cta-title',
        search: '<h2>Bắt đầu nâng tầm tuyển sinh và đào tạo cùng Smax.ai</h2>',
        replace: '<h2 data-cms="edu-cta-title">Bắt đầu nâng tầm tuyển sinh và đào tạo cùng Smax.ai</h2>',
        value: 'Bắt đầu nâng tầm tuyển sinh và đào tạo cùng Smax.ai'
      },
      {
        key: 'edu-cta-desc',
        search: 'Tham gia cùng hàng nghìn trung tâm Anh ngữ, trường mầm non và các học viện lớn đã tự động hóa quy trình chăm sóc học viên.',
        replace: 'Tham gia cùng hàng nghìn trung tâm Anh ngữ, trường mầm non và các học viện lớn đã tự động hóa quy trình chăm sóc học viên.',
        value: 'Tham gia cùng hàng nghìn trung tâm Anh ngữ, trường mầm non và các học viện lớn đã tự động hóa quy trình chăm sóc học viên.'
      }
    ]
  },
  'realestate': {
    file: 'realestate.html',
    items: [
      {
        key: 'estate-hero-badge',
        search: '<span>Ứng dụng AI cho Bất động sản</span>',
        replace: '<span data-cms="estate-hero-badge">Ứng dụng AI cho Bất động sản</span>',
        value: 'Ứng dụng AI cho Bất động sản'
      },
      {
        key: 'estate-hero-title',
        search: '<h1>\n              Ứng dụng AI-Automation <span class="highlight">cho Bất động sản</span>\n            </h1>',
        replace: '<h1 data-cms="estate-hero-title">\n              Ứng dụng AI-Automation <span class="highlight">cho Bất động sản</span>\n            </h1>',
        value: 'Ứng dụng AI-Automation cho Bất động sản'
      },
      {
        key: 'estate-hero-sub',
        search: '<p class="hero-sub">',
        replace: '<p class="hero-sub" data-cms="estate-hero-sub">',
        value: 'Giới thiệu dự án, tự động hóa phễu thu lead chất lượng từ quảng cáo, xếp lịch tư vấn và nhắc lịch hẹn đi xem căn hộ mẫu (site visit).'
      },
      {
        key: 'estate-hero-img',
        search: '<img src="asset smax/realestate/hero-dashboard.png" alt="Smax Real Estate AI Dashboard Mockup" />',
        replace: '<img data-cms-img="estate-hero-img" src="asset smax/realestate/hero-dashboard.png" alt="Smax Real Estate AI Dashboard Mockup" />',
        value: 'asset smax/realestate/hero-dashboard.png'
      },
      {
        key: 'estate-challenges-title',
        search: '<h2 class="section-title">Những thách thức kìm hãm đột phá doanh số Bất động sản</h2>',
        replace: '<h2 class="section-title" data-cms="estate-challenges-title">Những thách thức kìm hãm đột phá doanh số Bất động sản</h2>',
        value: 'Những thách thức kìm hãm đột phá doanh số Bất động sản'
      },
      {
        key: 'estate-challenges-desc',
        search: '<p class="section-desc">\n                Doanh nghiệp và môi giới bất động sản đang chịu chi phí quảng cáo tìm lead quá đắt đỏ, tỷ lệ lead ảo cao, và gặp khó khăn trong việc nhắc lịch khách hàng đi xem dự án.\n              </p>',
        replace: '<p class="section-desc" data-cms="estate-challenges-desc">\n                Doanh nghiệp và môi giới bất động sản đang chịu chi phí quảng cáo tìm lead quá đắt đỏ, tỷ lệ lead ảo cao, và gặp khó khăn trong việc nhắc lịch khách hàng đi xem dự án.\n              </p>',
        value: 'Doanh nghiệp và môi giới bất động sản đang chịu chi phí quảng cáo tìm lead quá đắt đỏ, tỷ lệ lead ảo cao, và gặp khó khăn trong việc nhắc lịch khách hàng đi xem dự án.'
      },
      {
        key: 'estate-cta-title',
        search: '<h2>Bắt đầu số hóa phễu bán hàng Bất động sản cùng Smax.ai</h2>',
        replace: '<h2 data-cms="estate-cta-title">Bắt đầu số hóa phễu bán hàng Bất động sản cùng Smax.ai</h2>',
        value: 'Bắt đầu số hóa phễu bán hàng Bất động sản cùng Smax.ai'
      },
      {
        key: 'estate-cta-desc',
        search: 'Tham gia cùng các chủ đầu tư, sàn phân phối và hàng vạn môi giới chuyên nghiệp đã tự động hóa phễu tư vấn dự án.',
        replace: 'Tham gia cùng các chủ đầu tư, sàn phân phối và hàng vạn môi giới chuyên nghiệp đã tự động hóa phễu tư vấn dự án.',
        value: 'Tham gia cùng các chủ đầu tư, sàn phân phối và hàng vạn môi giới chuyên nghiệp đã tự động hóa phễu tư vấn dự án.'
      }
    ]
  },
  'service': {
    file: 'service.html',
    items: [
      {
        key: 'service-hero-badge',
        search: '<span>Ứng dụng AI cho Spa &amp; Phòng khám</span>',
        replace: '<span data-cms="service-hero-badge">Ứng dụng AI cho Spa &amp; Phòng khám</span>',
        value: 'Ứng dụng AI cho Spa & Phòng khám'
      },
      {
        key: 'service-hero-title',
        search: '<h1>\n              Ứng dụng AI-Automation <span class="highlight">cho Spa &amp; Phòng khám</span>\n            </h1>',
        replace: '<h1 data-cms="service-hero-title">\n              Ứng dụng AI-Automation <span class="highlight">cho Spa &amp; Phòng khám</span>\n            </h1>',
        value: 'Ứng dụng AI-Automation cho Spa & Phòng khám'
      },
      {
        key: 'service-hero-sub',
        search: '<p class="hero-sub">',
        replace: '<p class="hero-sub" data-cms="service-hero-sub">',
        value: 'Tự động hóa đặt lịch hẹn, tự động gửi nhắc lịch liệu trình/tái khám qua Zalo ZBS (ZNS) và quản lý chăm sóc khách hàng sau điều trị hiệu quả.'
      },
      {
        key: 'service-hero-img',
        search: '<img src="asset smax/service/hero-dashboard.png" alt="Smax Service AI Dashboard Mockup" />',
        replace: '<img data-cms-img="service-hero-img" src="asset smax/service/hero-dashboard.png" alt="Smax Service AI Dashboard Mockup" />',
        value: 'asset smax/service/hero-dashboard.png'
      },
      {
        key: 'service-challenges-title',
        search: '<h2 class="section-title">Những thách thức trong vận hành Spa &amp; Phòng khám</h2>',
        replace: '<h2 class="section-title" data-cms="service-challenges-title">Những thách thức trong vận hành Spa &amp; Phòng khám</h2>',
        value: 'Những thách thức trong vận hành Spa & Phòng khám'
      },
      {
        key: 'service-challenges-desc',
        search: '<p class="section-desc">\n                Các cơ sở dịch vụ làm đẹp và y tế thường xuyên gặp tình trạng khách đặt hẹn nhưng bùng lịch (no-show), khó khăn trong việc nhắc nhở khách hàng theo đúng liệu trình và chăm sóc thủ công quá tải.\n              </p>',
        replace: '<p class="section-desc" data-cms="service-challenges-desc">\n                Các cơ sở dịch vụ làm đẹp và y tế thường xuyên gặp tình trạng khách đặt hẹn nhưng bùng lịch (no-show), khó khăn trong việc nhắc nhở khách hàng theo đúng liệu trình và chăm sóc thủ công quá tải.\n              </p>',
        value: 'Các cơ sở dịch vụ làm đẹp và y tế thường xuyên gặp tình trạng khách đặt hẹn nhưng bùng lịch (no-show), khó khăn trong việc nhắc nhở khách hàng theo đúng liệu trình và chăm sóc thủ công quá tải.'
      },
      {
        key: 'service-cta-title',
        search: '<h2>Tự động hóa đặt lịch và chăm sóc khách hàng cùng Smax.ai</h2>',
        replace: '<h2 data-cms="service-cta-title">Tự động hóa đặt lịch và chăm sóc khách hàng cùng Smax.ai</h2>',
        value: 'Tự động hóa đặt lịch và chăm sóc khách hàng cùng Smax.ai'
      },
      {
        key: 'service-cta-desc',
        search: 'Tham gia cùng hàng nghìn spa, thẩm mỹ viện và phòng khám đã nâng cao hiệu suất đặt hẹn thành công.',
        replace: 'Tham gia cùng hàng nghìn spa, thẩm mỹ viện và phòng khám đã nâng cao hiệu suất đặt hẹn thành công.',
        value: 'Tham gia cùng hàng nghìn spa, thẩm mỹ viện và phòng khám đã nâng cao hiệu suất đặt hẹn thành công.'
      }
    ]
  },
  'fb': {
    file: 'fb.html',
    items: [
      {
        key: 'fb-hero-badge',
        search: '<span>Ứng dụng AI cho ngành F&amp;B</span>',
        replace: '<span data-cms="fb-hero-badge">Ứng dụng AI cho ngành F&amp;B</span>',
        value: 'Ứng dụng AI cho ngành F&B'
      },
      {
        key: 'fb-hero-title',
        search: '<h1>\n              Ứng dụng AI-Automation <span class="highlight">cho ngành F&amp;B</span>\n            </h1>',
        replace: '<h1 data-cms="fb-hero-title">\n              Ứng dụng AI-Automation <span class="highlight">cho ngành F&amp;B</span>\n            </h1>',
        value: 'Ứng dụng AI-Automation cho ngành F&B'
      },
      {
        key: 'fb-hero-sub',
        search: '<p class="hero-sub">',
        replace: '<p class="hero-sub" data-cms="fb-hero-sub">',
        value: 'Tự động hóa phễu đặt bàn trước, gọi món tại bàn qua FnB Selling Page (E-menu) kết nối trực tiếp nhà bếp và xây dựng hệ thống tích điểm Loyalty giữ chân khách hàng.'
      },
      {
        key: 'fb-hero-img',
        search: '<img src="asset smax/fb/hero-dashboard.png" alt="Smax F&B AI Dashboard Mockup" />',
        replace: '<img data-cms-img="fb-hero-img" src="asset smax/fb/hero-dashboard.png" alt="Smax F&B AI Dashboard Mockup" />',
        value: 'asset smax/fb/hero-dashboard.png'
      },
      {
        key: 'fb-challenges-title',
        search: '<h2 class="section-title">Những thách thức kìm hãm lợi nhuận ngành F&amp;B</h2>',
        replace: '<h2 class="section-title" data-cms="fb-challenges-title">Những thách thức kìm hãm lợi nhuận ngành F&amp;B</h2>',
        value: 'Những thách thức kìm hãm lợi nhuận ngành F&B'
      },
      {
        key: 'fb-challenges-desc',
        search: '<p class="section-desc">\n                Các nhà hàng, quán cafe đang đối mặt với chi phí mặt bằng và nhân sự tăng cao, quy trình order thủ công dễ nhầm lẫn vào giờ cao điểm, và thiếu công cụ tích điểm Loyalty để khách hàng quay lại.\n              </p>',
        replace: '<p class="section-desc" data-cms="fb-challenges-desc">\n                Các nhà hàng, quán cafe đang đối mặt với chi phí mặt bằng và nhân sự tăng cao, quy trình order thủ công dễ nhầm lẫn vào giờ cao điểm, và thiếu công cụ tích điểm Loyalty để khách hàng quay lại.\n              </p>',
        value: 'Các nhà hàng, quán cafe đang đối mặt với chi phí mặt bằng và nhân sự tăng cao, quy trình order thủ công dễ nhầm lẫn vào giờ cao điểm, và thiếu công cụ tích điểm Loyalty để khách hàng quay lại.'
      },
      {
        key: 'fb-cta-title',
        search: '<h2>Số hóa vận hành và bứt phá doanh số nhà hàng cùng Smax.ai</h2>',
        replace: '<h2 data-cms="fb-cta-title">Số hóa vận hành và bứt phá doanh số nhà hàng cùng Smax.ai</h2>',
        value: 'Số hóa vận hành và bứt phá doanh số nhà hàng cùng Smax.ai'
      },
      {
        key: 'fb-cta-desc',
        search: 'Tham gia cùng hàng nghìn thương hiệu F&B, quán cafe đã nâng cao năng suất phục vụ và chăm sóc khách hàng tự động.',
        replace: 'Tham gia cùng hàng nghìn thương hiệu F&B, quán cafe đã nâng cao năng suất phục vụ và chăm sóc khách hàng tự động.',
        value: 'Tham gia cùng hàng nghìn thương hiệu F&B, quán cafe đã nâng cao năng suất phục vụ và chăm sóc khách hàng tự động.'
      }
    ]
  },
  'agency': {
    file: 'agency.html',
    items: [
      {
        key: 'agency-hero-badge',
        search: '<span>Ứng dụng AI cho Agency &amp; Tư vấn</span>',
        replace: '<span data-cms="agency-hero-badge">Ứng dụng AI cho Agency &amp; Tư vấn</span>',
        value: 'Ứng dụng AI cho Agency & Tư vấn'
      },
      {
        key: 'agency-hero-title',
        search: '<h1>\n              Ứng dụng AI-Automation <span class="highlight">cho Agency &amp; Tư vấn</span>\n            </h1>',
        replace: '<h1 data-cms="agency-hero-title">\n              Ứng dụng AI-Automation <span class="highlight">cho Agency &amp; Tư vấn</span>\n            </h1>',
        value: 'Ứng dụng AI-Automation cho Agency & Tư vấn'
      },
      {
        key: 'agency-hero-sub',
        search: '<p class="hero-sub">',
        replace: '<p class="hero-sub" data-cms="agency-hero-sub">',
        value: 'Tự động hóa phễu thu lead B2B, phân bổ lead nóng xoay vòng cho sales tức thì và đo lường báo cáo hiệu quả quảng cáo FMM thời gian thực.'
      },
      {
        key: 'agency-hero-img',
        search: '<img src="asset smax/agency/hero-dashboard.png" alt="Smax Agency AI Dashboard Mockup" />',
        replace: '<img data-cms-img="agency-hero-img" src="asset smax/agency/hero-dashboard.png" alt="Smax Agency AI Dashboard Mockup" />',
        value: 'asset smax/agency/hero-dashboard.png'
      },
      {
        key: 'agency-challenges-title',
        search: '<h2 class="section-title">Những thách thức trong vận hành Agency &amp; Tư vấn B2B</h2>',
        replace: '<h2 class="section-title" data-cms="agency-challenges-title">Những thách thức trong vận hành Agency &amp; Tư vấn B2B</h2>',
        value: 'Những thách thức trong vận hành Agency & Tư vấn B2B'
      },
      {
        key: 'agency-challenges-desc',
        search: '<p class="section-desc">\n                Các công ty Agency và tư vấn dịch vụ đang gặp khó khăn do thời gian liên hệ khách hàng quá lâu làm nguội lead quảng cáo, phân bổ lead thủ công không công bằng, và thiếu báo cáo chuyển đổi quảng cáo tức thời.\n              </p>',
        replace: '<p class="section-desc" data-cms="agency-challenges-desc">\n                Các công ty Agency và tư vấn dịch vụ đang gặp khó khăn do thời gian liên hệ khách hàng quá lâu làm nguội lead quảng cáo, phân bổ lead thủ công không công bằng, và thiếu báo cáo chuyển đổi quảng cáo tức thời.\n              </p>',
        value: 'Các công ty Agency và tư vấn dịch vụ đang gặp khó khăn do thời gian liên hệ khách hàng quá lâu làm nguội lead quảng cáo, phân bổ lead thủ công không công bằng, và thiếu báo cáo chuyển đổi quảng cáo tức thời.'
      },
      {
        key: 'agency-cta-title',
        search: '<h2>Bứt phá tỷ lệ chốt lead B2B cùng Smax.ai</h2>',
        replace: '<h2 data-cms="agency-cta-title">Bứt phá tỷ lệ chốt lead B2B cùng Smax.ai</h2>',
        value: 'Bứt phá tỷ lệ chốt lead B2B cùng Smax.ai'
      },
      {
        key: 'agency-cta-desc',
        search: 'Tham gia cùng hàng trăm agency hàng đầu và doanh nghiệp B2B đã tự động hóa phễu tiếp nhận thông tin khách hàng.',
        replace: 'Tham gia cùng hàng trăm agency hàng đầu và doanh nghiệp B2B đã tự động hóa phễu tiếp nhận thông tin khách hàng.',
        value: 'Tham gia cùng hàng trăm agency hàng đầu và doanh nghiệp B2B đã tự động hóa phễu tiếp nhận thông tin khách hàng.'
      }
    ]
  },
  'tich-hop': {
    file: 'tich-hop.html',
    items: [
      {
        key: 'tichhop-hero-title',
        search: '<h1 class="integrations-title">\n            Tích hợp linh hoạt với mọi ứng dụng <span class="blue-highlight">Marketing & Sales</span> của bạn\n          </h1>',
        replace: '<h1 class="integrations-title" data-cms="tichhop-hero-title">\n            Tích hợp linh hoạt với mọi ứng dụng <span class="blue-highlight">Marketing & Sales</span> của bạn\n          </h1>',
        value: 'Tích hợp linh hoạt với mọi ứng dụng Marketing & Sales của bạn'
      },
      {
        key: 'tichhop-hero-sub',
        search: '<p class="integrations-sub">\n            Kết nối liền mạch với hơn 50+ ứng dụng và sàn thương mại hàng đầu để tự động hóa toàn diện quy trình bán hàng, kho vận và chăm sóc khách hàng của bạn.\n          </p>',
        replace: '<p class="integrations-sub" data-cms="tichhop-hero-sub">\n            Kết nối liền mạch với hơn 50+ ứng dụng và sàn thương mại hàng đầu để tự động hóa toàn diện quy trình bán hàng, kho vận và chăm sóc khách hàng của bạn.\n          </p>',
        value: 'Kết nối liền mạch với hơn 50+ ứng dụng và sàn thương mại hàng đầu để tự động hóa toàn diện quy trình bán hàng, kho vận và chăm sóc khách hàng của bạn.'
      }
    ]
  },
  'crm-sync': {
    file: 'crm-sync.html',
    items: [
      {
        key: 'crm-hero-badge',
        search: '<span>CRM, Orders &amp; Ecom Automation Đọc thêm</span>',
        replace: '<span data-cms="crm-hero-badge">CRM, Orders &amp; Ecom Automation Đọc thêm</span>',
        value: 'CRM, Orders & Ecom Automation Đọc thêm'
      },
      {
        key: 'crm-hero-title',
        search: '<h1>\n              Đồng bộ dữ liệu CRM &amp; Đơn hàng <span class="highlight">toàn diện, tự động</span>\n            </h1>',
        replace: '<h1 data-cms="crm-hero-title">\n              Đồng bộ dữ liệu CRM &amp; Đơn hàng <span class="highlight">toàn diện, tự động</span>\n            </h1>',
        value: 'Đồng bộ dữ liệu CRM & Đơn hàng toàn diện, tự động'
      },
      {
        key: 'crm-hero-sub',
        search: '<p class="hero-sub">\n              Kết nối Smax với CRM/POS để tự động hóa quy trình lên đơn, cập nhật trạng thái giao vận và kích hoạt kịch bản chăm sóc khách hàng đa kênh lập tức.\n            </p>',
        replace: '<p class="hero-sub" data-cms="crm-hero-sub">\n              Kết nối Smax với CRM/POS để tự động hóa quy trình lên đơn, cập nhật trạng thái giao vận và kích hoạt kịch bản chăm sóc khách hàng đa kênh lập tức.\n            </p>',
        value: 'Kết nối Smax với CRM/POS để tự động hóa quy trình lên đơn, cập nhật trạng thái giao vận và kích hoạt kịch bản chăm sóc khách hàng đa kênh lập tức.'
      },
      {
        key: 'crm-hero-img',
        search: '<img\n                  src="asset smax/hero-crm-sync-v2.webp"\n                  alt="Giao diện Smax CRM đồng bộ đơn hàng, khách hàng và tồn kho với CRM, POS và sàn thương mại điện tử"\n                  width="1600"\n                  height="720"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        replace: '<img data-cms-img="crm-hero-img"\n                  src="asset smax/hero-crm-sync-v2.webp"\n                  alt="Giao diện Smax CRM đồng bộ đơn hàng, khách hàng và tồn kho với CRM, POS và sàn thương mại điện tử"\n                  width="1600"\n                  height="720"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        value: 'asset smax/hero-crm-sync-v2.webp'
      }
    ]
  },
  'partnership': {
    file: 'partnership.html',
    items: [
      {
        key: 'partner-hero-badge',
        search: '<span>ĐỐI TÁC SMAX Đồng hành bứt phá công nghệ Automation</span>',
        replace: '<span data-cms="partner-hero-badge">ĐỐI TÁC SMAX Đồng hành bứt phá công nghệ Automation</span>',
        value: 'ĐỐI TÁC SMAX Đồng hành bứt phá công nghệ Automation'
      },
      {
        key: 'partner-hero-title',
        search: '<h1>\n              Chương trình Đối tác <span class="highlight">Smax.ai</span>\n            </h1>',
        replace: '<h1 data-cms="partner-hero-title">\n              Chương trình Đối tác <span class="highlight">Smax.ai</span>\n            </h1>',
        value: 'Chương trình Đối tác Smax.ai'
      },
      {
        key: 'partner-hero-sub',
        search: '<p class="hero-sub">\n              Hợp tác phát triển cùng nền tảng AI-Automation hàng đầu. Cùng mang giải pháp tối ưu quy trình bán hàng, marketing và CSKH đến hàng triệu doanh nghiệp.\n            </p>',
        replace: '<p class="hero-sub" data-cms="partner-hero-sub">\n              Hợp tác phát triển cùng nền tảng AI-Automation hàng đầu. Cùng mang giải pháp tối ưu quy trình bán hàng, marketing và CSKH đến hàng triệu doanh nghiệp.\n            </p>',
        value: 'Hợp tác phát triển cùng nền tảng AI-Automation hàng đầu. Cùng mang giải pháp tối ưu quy trình bán hàng, marketing và CSKH đến hàng triệu doanh nghiệp.'
      },
      {
        key: 'partner-hero-img',
        search: '<img src="asset smax/partnership/hero-dashboard.png" alt="Smax Partner Portal Dashboard Mockup" />',
        replace: '<img data-cms-img="partner-hero-img" src="asset smax/partnership/hero-dashboard.png" alt="Smax Partner Portal Dashboard Mockup" />',
        value: 'asset smax/partnership/hero-dashboard.png'
      }
    ]
  },
  'livechat': {
    file: 'livechat.html',
    items: [
      {
        key: 'livechat-hero-badge',
        search: '<span>NEW Unified Chat Sales Platform Đọc thêm</span>',
        replace: '<span data-cms="livechat-hero-badge">NEW Unified Chat Sales Platform Đọc thêm</span>',
        value: 'NEW Unified Chat Sales Platform Đọc thêm'
      },
      {
        key: 'livechat-hero-title',
        search: '<h1>\n              Quản lý hội thoại đa kênh &amp; tối ưu doanh thu bán hàng <span class="highlight">với GenAI</span>\n            </h1>',
        replace: '<h1 data-cms="livechat-hero-title">\n              Quản lý hội thoại đa kênh &amp; tối ưu doanh thu bán hàng <span class="highlight">với GenAI</span>\n            </h1>',
        value: 'Quản lý hội thoại đa kênh & tối ưu doanh thu bán hàng với GenAI'
      },
      {
        key: 'livechat-hero-sub',
        search: '<p class="hero-sub">\n              Smax Livechat hợp nhất hội thoại từ các kênh đã kết nối về một màn hình, hỗ trợ lọc, tìm kiếm, phân công và phản hồi khách hàng tập trung.\n            </p>',
        replace: '<p class="hero-sub" data-cms="livechat-hero-sub">\n              Smax Livechat hợp nhất hội thoại từ các kênh đã kết nối về một màn hình, hỗ trợ lọc, tìm kiếm, phân công và phản hồi khách hàng tập trung.\n            </p>',
        value: 'Smax Livechat hợp nhất hội thoại từ các kênh đã kết nối về một màn hình, hỗ trợ lọc, tìm kiếm, phân công và phản hồi khách hàng tập trung.'
      },
      {
        key: 'livechat-hero-img',
        search: '<img\n                  src="asset smax/hero-livechat-suite/hero-livechat-v2.webp"\n                  alt="Giao diện Smax Livechat hợp nhất hội thoại đa kênh, hồ sơ khách hàng và AI gợi ý trả lời"\n                  width="1600"\n                  height="900"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        replace: '<img data-cms-img="livechat-hero-img"\n                  src="asset smax/hero-livechat-suite/hero-livechat-v2.webp"\n                  alt="Giao diện Smax Livechat hợp nhất hội thoại đa kênh, hồ sơ khách hàng và AI gợi ý trả lời"\n                  width="1600"\n                  height="900"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        value: 'asset smax/hero-livechat-suite/hero-livechat-v2.webp'
      }
    ]
  },
  'chatbot': {
    file: 'chatbot.html',
    items: [
      {
        key: 'chatbot-hero-badge',
        search: '<span>NEW Visual Drag &amp; Drop Chatbot Đọc thêm</span>',
        replace: '<span data-cms="chatbot-hero-badge">NEW Visual Drag &amp; Drop Chatbot Đọc thêm</span>',
        value: 'NEW Visual Drag & Drop Chatbot Đọc thêm'
      },
      {
        key: 'chatbot-hero-title',
        search: '<h1>\n              Tự động hóa tiếp thị &amp; bán hàng đa kênh <span class="highlight">với Smax Chatbot</span>\n            </h1>',
        replace: '<h1 data-cms="chatbot-hero-title">\n              Tự động hóa tiếp thị &amp; bán hàng đa kênh <span class="highlight">với Smax Chatbot</span>\n            </h1>',
        value: 'Tự động hóa tiếp thị & bán hàng đa kênh với Smax Chatbot'
      },
      {
        key: 'chatbot-hero-sub',
        search: '<p class="hero-sub">\n              Smax Chatbot giúp doanh nghiệp thiết lập kịch bản trả lời tự động, gửi tin hàng loạt chăm sóc khách hàng cũ và bứt phá doanh số vượt trội trên đa nền tảng.\n            </p>',
        replace: '<p class="hero-sub" data-cms="chatbot-hero-sub">\n              Smax Chatbot giúp doanh nghiệp thiết lập kịch bản trả lời tự động, gửi tin hàng loạt chăm sóc khách hàng cũ và bứt phá doanh số vượt trội trên đa nền tảng.\n            </p>',
        value: 'Smax Chatbot giúp doanh nghiệp thiết lập kịch bản trả lời tự động, gửi tin hàng loạt chăm sóc khách hàng cũ và bứt phá doanh số vượt trội trên đa nền tảng.'
      },
      {
        key: 'chatbot-hero-img',
        search: '<img\n                  src="asset smax/hero-livechat-suite/hero-chatbot-v2.webp"\n                  alt="Giao diện Smax Chatbot với luồng bình luận, gửi tin, thu số điện thoại và chuyển nhân viên"\n                  width="1600"\n                  height="900"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        replace: '<img data-cms-img="chatbot-hero-img"\n                  src="asset smax/hero-livechat-suite/hero-chatbot-v2.webp"\n                  alt="Giao diện Smax Chatbot với luồng bình luận, gửi tin, thu số điện thoại và chuyển nhân viên"\n                  width="1600"\n                  height="900"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        value: 'asset smax/hero-livechat-suite/hero-chatbot-v2.webp'
      }
    ]
  },
  'genai': {
    file: 'genai.html',
    items: [
      {
        key: 'genai-hero-badge',
        search: '<span>NEW Smax GenAI Platform Đọc thêm</span>',
        replace: '<span data-cms="genai-hero-badge">NEW Smax GenAI Platform Đọc thêm</span>',
        value: 'NEW Smax GenAI Platform Đọc thêm'
      },
      {
        key: 'genai-hero-title',
        search: '<h1>\n              Đưa trí tuệ nhân tạo GenAI vào <span class="highlight">Vận Hành Doanh Nghiệp</span>\n            </h1>',
        replace: '<h1 data-cms="genai-hero-title">\n              Đưa trí tuệ nhân tạo GenAI vào <span class="highlight">Vận Hành Doanh Nghiệp</span>\n            </h1>',
        value: 'Đưa trí tuệ nhân tạo GenAI vào Vận Hành Doanh Nghiệp'
      },
      {
        key: 'genai-hero-sub',
        search: '<p class="hero-sub">\n              Smax GenAI giúp doanh nghiệp cấu hình Prompt, quản lý Knowledge, nhận diện ý định và triển khai các trợ lý AI chuyên biệt trong quy trình chăm sóc khách hàng.\n            </p>',
        replace: '<p class="hero-sub" data-cms="genai-hero-sub">\n              Smax GenAI giúp doanh nghiệp cấu hình Prompt, quản lý Knowledge, nhận diện ý định và triển khai các trợ lý AI chuyên biệt trong quy trình chăm sóc khách hàng.\n            </p>',
        value: 'Smax GenAI giúp doanh nghiệp cấu hình Prompt, quản lý Knowledge, nhận diện ý định và triển khai các trợ lý AI chuyên biệt trong quy trình chăm sóc khách hàng.'
      },
      {
        key: 'genai-hero-img',
        search: '<img\n                  src="asset smax/hero-livechat-suite/hero-genai-v2.webp"\n                  alt="Giao diện Smax GenAI kết nối kho tri thức, hiểu ý định và gợi ý sản phẩm"\n                  width="1600"\n                  height="900"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        replace: '<img data-cms-img="genai-hero-img"\n                  src="asset smax/hero-livechat-suite/hero-genai-v2.webp"\n                  alt="Giao diện Smax GenAI kết nối kho tri thức, hiểu ý định và gợi ý sản phẩm"\n                  width="1600"\n                  height="900"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        value: 'asset smax/hero-livechat-suite/hero-genai-v2.webp'
      }
    ]
  },
  'insight': {
    file: 'insight.html',
    items: [
      {
        key: 'insight-hero-badge',
        search: '<span>NEW Smax AI Insight Engine Đọc thêm</span>',
        replace: '<span data-cms="insight-hero-badge">NEW Smax AI Insight Engine Đọc thêm</span>',
        value: 'NEW Smax AI Insight Engine Đọc thêm'
      },
      {
        key: 'insight-hero-title',
        search: '<h1>\n              Thấu hiểu khách hàng qua <span class="highlight">Mọi Cuộc Hội Thoại</span>\n            </h1>',
        replace: '<h1 data-cms="insight-hero-title">\n              Thấu hiểu khách hàng qua <span class="highlight">Mọi Cuộc Hội Thoại</span>\n            </h1>',
        value: 'Thấu hiểu khách hàng qua Mọi Cuộc Hội Thoại'
      },
      {
        key: 'insight-hero-sub',
        search: '<p class="hero-sub">\n              Smax AI Insight phân tích nội dung sau khi phiên hội thoại đóng, trích xuất dữ liệu theo cột tùy chỉnh và biến kết quả thành báo cáo hoặc hành động tự động.\n            </p>',
        replace: '<p class="hero-sub" data-cms="insight-hero-sub">\n              Smax AI Insight phân tích nội dung sau khi phiên hội thoại đóng, trích xuất dữ liệu theo cột tùy chỉnh và biến kết quả thành báo cáo hoặc hành động tự động.\n            </p>',
        value: 'Smax AI Insight phân tích nội dung sau khi phiên hội thoại đóng, trích xuất dữ liệu theo cột tùy chỉnh và biến kết quả thành báo cáo hoặc hành động tự động.'
      },
      {
        key: 'insight-hero-img',
        search: '<img\n                src="asset smax/hero-livechat-suite/hero-insight-v2.webp"\n                alt="Giao diện Smax AI Insight phân tích nhu cầu, ý định mua, cảm xúc và cảnh báo rời bỏ"\n                width="1600"\n                height="900"\n                loading="eager"\n                fetchpriority="high"\n                decoding="async"\n              />',
        replace: '<img data-cms-img="insight-hero-img"\n                src="asset smax/hero-livechat-suite/hero-insight-v2.webp"\n                alt="Giao diện Smax AI Insight phân tích nhu cầu, ý định mua, cảm xúc và cảnh báo rời bỏ"\n                width="1600"\n                height="900"\n                loading="eager"\n                fetchpriority="high"\n                decoding="async"\n              />',
        value: 'asset smax/hero-livechat-suite/hero-insight-v2.webp'
      }
    ]
  },
  'marketing': {
    file: 'marketing.html',
    items: [
      {
        key: 'marketing-hero-badge',
        search: '<span>LEAD GEN Social Comment & Lead Collection Đọc thêm</span>',
        replace: '<span data-cms="marketing-hero-badge">LEAD GEN Social Comment & Lead Collection Đọc thêm</span>',
        value: 'LEAD GEN Social Comment & Lead Collection Đọc thêm'
      },
      {
        key: 'marketing-hero-title',
        search: '<h1>\n              Tự động hóa phễu thu Lead &amp; <span class="highlight">Chăm sóc bám đuổi đa kênh</span>\n            </h1>',
        replace: '<h1 data-cms="marketing-hero-title">\n              Tự động hóa phễu thu Lead &amp; <span class="highlight">Chăm sóc bám đuổi đa kênh</span>\n            </h1>',
        value: 'Tự động hóa phễu thu Lead & Chăm sóc bám đuổi đa kênh'
      },
      {
        key: 'marketing-hero-sub',
        search: '<p class="hero-sub">\n              Kết nối Smax với comment bài viết quảng cáo, quét mã QR, Facebook Lead Ads và bong bóng chat website để tự động gửi tin nhắn thu hút và kích hoạt bám đuổi khách hàng lập tức.\n            </p>',
        replace: '<p class="hero-sub" data-cms="marketing-hero-sub">\n              Kết nối Smax với comment bài viết quảng cáo, quét mã QR, Facebook Lead Ads và bong bóng chat website để tự động gửi tin nhắn thu hút và kích hoạt bám đuổi khách hàng lập tức.\n            </p>',
        value: 'Kết nối Smax với comment bài viết quảng cáo, quét mã QR, Facebook Lead Ads và bong bóng chat website để tự động gửi tin nhắn thu hút và kích hoạt bám đuổi khách hàng lập tức.'
      },
      {
        key: 'marketing-hero-img',
        search: '<img\n                  src="asset smax/hero-livechat-suite/hero-marketing-v2.webp"\n                  alt="Giao diện Smax Marketing tự động phản hồi bình luận, gửi tin, thu lead và phân loại khách hàng"\n                  width="1600"\n                  height="900"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        replace: '<img data-cms-img="marketing-hero-img"\n                  src="asset smax/hero-livechat-suite/hero-marketing-v2.webp"\n                  alt="Giao diện Smax Marketing tự động phản hồi bình luận, gửi tin, thu lead và phân loại khách hàng"\n                  width="1600"\n                  height="900"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        value: 'asset smax/hero-livechat-suite/hero-marketing-v2.webp'
      }
    ]
  },
  'gamification': {
    file: 'gamification.html',
    items: [
      {
        key: 'gamification-hero-badge',
        search: '<span>HOT Viral Marketing Campaign Đọc thêm</span>',
        replace: '<span data-cms="gamification-hero-badge">HOT Viral Marketing Campaign Đọc thêm</span>',
        value: 'HOT Viral Marketing Campaign Đọc thêm'
      },
      {
        key: 'gamification-hero-title',
        search: '<h1>\n              Bùng nổ tương tác &amp; Thu hút khách hàng <span class="highlight">với Smax Gamification</span>\n            </h1>',
        replace: '<h1 data-cms="gamification-hero-title">\n              Bùng nổ tương tác &amp; Thu hút khách hàng <span class="highlight">với Smax Gamification</span>\n            </h1>',
        value: 'Bùng nổ tương tác & Thu hút khách hàng với Smax Gamification'
      },
      {
        key: 'gamification-hero-sub',
        search: '<p class="hero-sub">\n              Tạo Vòng quay may mắn, Puzzle Game và Game Mở Quà; cấu hình quà, lượt chơi, bản ghi dữ liệu rồi kết nối trò chơi vào luồng chatbot.\n            </p>',
        replace: '<p class="hero-sub" data-cms="gamification-hero-sub">\n              Tạo Vòng quay may mắn, Puzzle Game và Game Mở Quà; cấu hình quà, lượt chơi, bản ghi dữ liệu rồi kết nối trò chơi vào luồng chatbot.\n            </p>',
        value: 'Tạo Vòng quay may mắn, Puzzle Game và Game Mở Quà; cấu hình quà, lượt chơi, bản ghi dữ liệu rồi kết nối trò chơi vào luồng chatbot.'
      },
      {
        key: 'gamification-hero-img',
        search: '<img\n                  src="asset smax/gamification/hero-gamification-smax-v2.webp"\n                  alt="Giao diện Smax Gamification với thư viện vòng quay, luồng bình luận và voucher trúng thưởng"\n                  width="1600"\n                  height="900"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        replace: '<img data-cms-img="gamification-hero-img"\n                  src="asset smax/gamification/hero-gamification-smax-v2.webp"\n                  alt="Giao diện Smax Gamification với thư viện vòng quay, luồng bình luận và voucher trúng thưởng"\n                  width="1600"\n                  height="900"\n                  loading="eager"\n                  fetchpriority="high"\n                  decoding="async"\n                />',
        value: 'asset smax/gamification/hero-gamification-smax-v2.webp'
      }
    ]
  },
  'remarketing': {
    file: 'remarketing.html',
    items: [
      {
        key: 'remarketing-hero-title',
        search: '<h2>\nSmax.ai giúp doanh nghiệp quản lý <span class="gradient-text-1">Broadcast &amp; Sequence</span>, chăm sóc khách hàng <span class="underline-effect">đa kênh</span> và lựa chọn <span class="gradient-text-2">đúng hình thức gửi</span> cho từng tệp\n</h2>',
        replace: '<h2 data-cms="remarketing-hero-title">\nSmax.ai giúp doanh nghiệp quản lý <span class="gradient-text-1">Broadcast &amp; Sequence</span>, chăm sóc khách hàng <span class="underline-effect">đa kênh</span> và lựa chọn <span class="gradient-text-2">đúng hình thức gửi</span> cho từng tệp\n</h2>',
        value: 'Smax.ai giúp doanh nghiệp quản lý Broadcast & Sequence, chăm sóc khách hàng đa kênh và lựa chọn đúng hình thức gửi cho từng tệp'
      },
      {
        key: 'remarketing-hero-sub',
        search: '<a href="#cta" class="pure-typo-cta-btn">Bắt đầu chăm sóc khách hàng của bạn ngay bây giờ</a>',
        replace: '<a href="#cta" class="pure-typo-cta-btn" data-cms="remarketing-hero-sub">Bắt đầu chăm sóc khách hàng của bạn ngay bây giờ</a>',
        value: 'Bắt đầu chăm sóc khách hàng của bạn ngay bây giờ'
      },
      {
        key: 'remarketing-features-title',
        search: '<h2>Các tính năng vượt trội của Smax Remarketing</h2>',
        replace: '<h2 data-cms="remarketing-features-title">Các tính năng vượt trội của Smax Remarketing</h2>',
        value: 'Các tính năng vượt trội của Smax Remarketing'
      },
      {
        key: 'remarketing-features-sub',
        search: '<p>Thiết lập chiến dịch theo kênh, bộ lọc, nội dung, lịch gửi và quy tắc vận hành tương ứng.</p>',
        replace: '<p data-cms="remarketing-features-sub">Thiết lập chiến dịch theo kênh, bộ lọc, nội dung, lịch gửi và quy tắc vận hành tương ứng.</p>',
        value: 'Thiết lập chiến dịch theo kênh, bộ lọc, nội dung, lịch gửi và quy tắc vận hành tương ứng.'
      }
    ]
  },
  'blog': {
    file: 'blog.html',
    items: [
      {
        key: 'blog-hero-title',
        search: '<h1 style="font-size: 38px; font-weight: 900; color: var(--ink); margin-bottom: 16px; letter-spacing: -0.02em;">Tin tức &amp; Blog công nghệ</h1>',
        replace: '<h1 data-cms="blog-hero-title" style="font-size: 38px; font-weight: 900; color: var(--ink); margin-bottom: 16px; letter-spacing: -0.02em;">Tin tức &amp; Blog công nghệ</h1>',
        value: 'Tin tức & Blog công nghệ'
      },
      {
        key: 'blog-hero-title-fallback',
        search: '<h1 style="font-size: 38px; font-weight: 900; color: var(--ink); margin-bottom: 16px; letter-spacing: -0.02em;">Tin tức & Blog công nghệ</h1>',
        replace: '<h1 data-cms="blog-hero-title" style="font-size: 38px; font-weight: 900; color: var(--ink); margin-bottom: 16px; letter-spacing: -0.02em;">Tin tức & Blog công nghệ</h1>',
        value: 'Tin tức & Blog công nghệ'
      }
    ]
  },
  'blog-detail': {
    file: 'blog-detail.html',
    items: [
      {
        key: 'blogdetail-hero-title',
        search: '<h1 class="detail-title">Cách SmaxAI giúp tăng trưởng doanh thu 200% nhờ tự động hóa hành trình khách hàng</h1>',
        replace: '<h1 class="detail-title" data-cms="blogdetail-hero-title">Cách SmaxAI giúp tăng trưởng doanh thu 200% nhờ tự động hóa hành trình khách hàng</h1>',
        value: 'Cách SmaxAI giúp tăng trưởng doanh thu 200% nhờ tự động hóa hành trình khách hàng'
      }
    ]
  }
};

const rootDir = path.resolve(__dirname, '..');
let dbRows = [];

// 1. Inject data-cms / data-cms-img tags into HTML files
console.log('⚡ [Bootstrap CMS] Scanning and tagging local HTML files (with Image tags)...');
Object.keys(pageMappings).forEach(pageKey => {
  const mapping = pageMappings[pageKey];
  const filePath = path.join(rootDir, mapping.file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ File not found: ${mapping.file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updateCount = 0;

  mapping.items.forEach(item => {
    if (content.includes(item.search)) {
      content = content.replace(item.search, item.replace);
      updateCount++;
    }
    // Collect the database rows to insert
    dbRows.push({
      page_name: pageKey,
      content_key: item.key,
      content_value: item.value
    });
  });

  if (updateCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Injected ${updateCount} tags in ${mapping.file}`);
  } else {
    console.log(`ℹ️ No tags injected in ${mapping.file} (Already tagged or matches missing)`);
  }
});

// 2. Ask user for Supabase URL and Key
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const defaultUrl = process.env.SUPABASE_URL || '';
const defaultKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log('\n======================================================');
console.log('⚡ ĐỒNG BỘ DỮ LIỆU LÊN SUPABASE DATABASE (TẤT CẢ CÁC TRANG)');
console.log('======================================================');

rl.question(`Nhập Supabase URL [${defaultUrl}]: `, (inputUrl) => {
  const urlVal = inputUrl.trim() || defaultUrl;
  
  rl.question(`Nhập Supabase Anon Key hoặc Service Role Key [${defaultKey ? 'Đã có key trong env' : ''}]: `, (inputKey) => {
    const keyVal = inputKey.trim() || defaultKey;
    
    if (!urlVal || !keyVal) {
      console.log('❌ Lỗi: Cần cung cấp đầy đủ URL và Key để đồng bộ dữ liệu!');
      rl.close();
      process.exit(1);
    }
    
    syncToSupabase(urlVal, keyVal);
  });
});

function syncToSupabase(supabaseUrl, supabaseKey) {
  console.log(`\n🚀 Đang gửi ${dbRows.length} thuộc tính nội dung lên Supabase...`);
  
  const targetUrl = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/site_content?on_conflict=content_key`;
  const parsedUrl = url.parse(targetUrl);

  
  const bodyData = JSON.stringify(dbRows);
  
  const headers = {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'resolution=merge-duplicates', // PostgREST upsert
    'Content-Length': Buffer.byteLength(bodyData)
  };
  
  const reqOptions = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
    method: 'POST',
    headers: headers
  };
  
  const req = https.request(reqOptions, (res) => {
    let body = '';
    res.on('data', (chunk) => {
      body += chunk.toString('utf8');
    });
    res.on('end', () => {
      rl.close();
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`\n🎉 THÀNH CÔNG! Đã khởi tạo và đồng bộ thành công ${dbRows.length} khóa nội dung lên Supabase.`);
        console.log('👉 Bây giờ bạn có thể mở /admin.html để chỉnh sửa đầy đủ các phần trên tất cả các trang!');
      } else {
        console.error(`\n❌ Thất bại: HTTP ${res.statusCode}`);
        console.error('Phản hồi lỗi:', body);
      }
    });
  });
  
  req.on('error', (e) => {
    rl.close();
    console.error('\n❌ Lỗi kết nối:', e.message);
  });
  
  req.write(bodyData);
  req.end();
}
