const fs = require('fs');
const path = require('path');

// 1. Đọc cấu trúc từ livechat.html để trích xuất header, footer, style cơ bản
const livechatHtml = fs.readFileSync('livechat.html', 'utf8');

const mainStart = livechatHtml.indexOf('<main id="top">');
const mainEnd = livechatHtml.indexOf('</main>');

if (mainStart === -1 || mainEnd === -1) {
  console.error('Could not parse livechat.html structure');
  process.exit(1);
}

// Trích xuất head và tail
const headPart = livechatHtml.substring(0, mainStart);
const tailPart = livechatHtml.substring(mainEnd + 7);

// Thiết lập nội dung main cho gamification.html
const gamificationMainContent = `
      <main id="top">
        <!-- Hero Section -->
        <section class="premium-hero">
          <div class="hero-grid-bg"></div>
          <div class="container">
            <div class="announcement-badge">
              <span class="announcement-tag">HOT</span>
              <span>Viral Marketing Campaign</span>
              <a href="https://docs.smax.ai" target="_blank" class="announcement-link">
                <span>Đọc thêm</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <h1>
              Bùng nổ tương tác &amp; Thu hút khách hàng <span class="highlight">với Smax Gamification</span>
            </h1>
            <p class="hero-sub">
              Tạo minigame, vòng quay may mắn và các chương trình tích điểm đổi quà trực tiếp trong chat để kích thích mua sắm, bùng nổ tương tác và bứt phá doanh số vượt trội.
            </p>
            <div class="hero-actions">
              <a class="btn btn-dark" href="#cta" style="background: var(--primary-navy, #0F1835); border-color: var(--primary-navy, #0F1835);">
                Đăng ký tư vấn
              </a>
              <a class="btn btn-soft" href="https://docs.smax.ai" target="_blank" style="border: 1px solid rgba(15, 24, 53, 0.15); background: transparent; color: var(--primary-navy, #0F1835);">
                Trải nghiệm miễn phí
              </a>
            </div>

            <!-- Browser Mockup displaying the Gamification config screenshot -->
            <div class="hero-mockup-wrapper">
              <div class="browser-header">
                <div class="browser-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="browser-address">smax.ai/gamification/luckywheel</div>
              </div>
              <div class="browser-content">
                <img src="asset smax/module-feature-images/gamification/lucky-wheel.webp" alt="Smax Gamification Configuration Workspace" />
              </div>
            </div>
          </div>
        </section>

        <!-- Social Proof Section -->
        <section class="logo-wall-section" style="padding-top: 80px;">
          <div class="container">
            <div class="logo-wall-title">Bùng nổ chiến dịch Viral cùng các thương hiệu lớn</div>
            <!-- Infinite Carousel row -->
            <div class="hero-carousel-wrapper">
              <div class="carousel-fade-left"></div>
              <div class="carousel-fade-right"></div>
              <div class="carousel-scroll-row row-1">
                <div class="carousel-icon-card"><img src="asset smax/integration-icons/facebook.svg" alt="Facebook Messenger" /></div>
                <div class="carousel-icon-card"><img src="asset smax/integration-icons/zalo.svg" alt="Zalo OA" /></div>
                <div class="carousel-icon-card"><img src="asset smax/integration-icons/tiktok.svg" alt="TikTok" /></div>
                <div class="carousel-icon-card"><img src="asset smax/integration-icons/instagram.svg" alt="Instagram Direct" /></div>
                <div class="carousel-icon-card"><img src="asset smax/integration-icons/shopee.svg" alt="Shopee" /></div>
                <!-- Loop -->
                <div class="carousel-icon-card"><img src="asset smax/integration-icons/facebook.svg" alt="Facebook Messenger" /></div>
                <div class="carousel-icon-card"><img src="asset smax/integration-icons/zalo.svg" alt="Zalo OA" /></div>
                <div class="carousel-icon-card"><img src="asset smax/integration-icons/tiktok.svg" alt="TikTok" /></div>
                <div class="carousel-icon-card"><img src="asset smax/integration-icons/instagram.svg" alt="Instagram Direct" /></div>
                <div class="carousel-icon-card"><img src="asset smax/integration-icons/shopee.svg" alt="Shopee" /></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Key Metrics Section -->
        <section class="metrics-section">
          <div class="container">
            <div class="metrics-grid">
              <div class="metric-card">
                <div class="metric-value">+300%</div>
                <div class="metric-label">Tương tác Fanpage tự nhiên</div>
                <div class="metric-desc">Kích thích khách hàng comment bài viết để nhận link chơi game nhận quà độc quyền.</div>
              </div>
              <div class="metric-card">
                <div class="metric-value"><span class="coral">-60%</span></div>
                <div class="metric-label">Chi phí thu thập khách tiềm năng</div>
                <div class="metric-desc">Cơ chế Viral Loop khuyến khích chia sẻ game giúp thu về lượng lớn dữ liệu Lead miễn phí.</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">+35%</div>
                <div class="metric-label">Tỷ lệ quy đổi đơn hàng từ mã quà tặng</div>
                <div class="metric-desc">Tự động gửi mã giảm giá độc nhất kích thích khách hàng hoàn thành giao dịch tại cửa hàng.</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Bento Grid Section (Gamification Intent & CSAT) -->
        <section class="smax-bento-section">
          <div class="container">
            <div class="section-header">
              <h2>Trải nghiệm Gamification cá nhân hóa trong Chat</h2>
              <p>Trải nghiệm chiến dịch minigame mượt mà nhờ sự kết hợp giữa luồng kịch bản tự động và cơ chế trả thưởng thời gian thực.</p>
            </div>

            <div class="bento-features-grid">
              <!-- Tile 1 (Full Width): Visual game simulation -->
              <div class="bento-item full-width">
                <div class="bento-info narrow">
                  <div class="bento-icon blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                  <h3>Trải nghiệm chơi game và nhận quà liền mạch ngay tại giao diện chat</h3>
                  <p class="desc">
                    Khách hàng chỉ cần bình luận trên bài viết để kích hoạt chatbot tự động gửi tin nhắn kèm link game. Khách hàng click quay thưởng, nhận quà và mã giảm giá được đồng bộ gửi trực tiếp vào inbox.
                  </p>
                </div>
                <!-- CSS Simulated iPhone Mockup -->
                <div class="iphone-wrapper">
                  <div class="iphone-island"></div>
                  <div class="iphone-screen">
                    <div class="chat-msg customer">
                      #quaythuong
                      <div class="chat-tag neutral">Trigger: Comment Keyword</div>
                    </div>
                    <div class="chat-msg supporter">
                      Chúc mừng bạn! Hãy bấm vào link bên dưới để tham gia Vòng quay may mắn mừng sinh nhật Smax nhé! 🎁
                      <div style="margin-top: 8px;"><button class="btn btn-dark" style="padding: 6px 12px; font-size: 11px; width: 100%;">Quay Thưởng Ngay 🎡</button></div>
                    </div>
                    <div class="chat-msg customer">
                      Mình vừa quay trúng mã giảm giá 100k!
                    </div>
                    <div class="chat-msg supporter">
                      Tuyệt vời! Smax gửi bạn mã giảm giá độc quyền của bạn: [SMAX100K]. Mã áp dụng cho đơn hàng từ 500k và có hạn dùng trong 3 ngày tới ạ!
                      <div class="chat-tag positive">Status: Voucher Delivered</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tile 2: Reward Stats Chart -->
              <div class="bento-item bg-orange">
                <div class="bento-info">
                  <div class="bento-icon orange">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-8m0 0V4m0 8h8m-8 0H4"></path></svg>
                  </div>
                  <h3>Thống kê quà tặng được phân phối</h3>
                  <p class="desc">
                    Hệ thống tự động thống kê số lượng quà tặng đã phát ra thời gian thực giúp bạn kiểm soát ngân sách chiến dịch khuyến mãi một cách chặt chẽ.
                  </p>
                </div>
                <!-- CSS Flat Horizontal Bar Chart -->
                <div class="bento-chart-container">
                  <div class="chart-row-label">Quà tặng đã phát ra</div>
                  <div class="bar-item">
                    <div class="bar-label-group">
                      <span>Mã giảm giá 20%</span>
                      <span>85%</span>
                    </div>
                    <div class="bar-track"><div class="bar-fill" style="width: 85%;"></div></div>
                  </div>
                  <div class="bar-item">
                    <div class="bar-label-group">
                      <span>Mã giảm giá 100k</span>
                      <span>60%</span>
                    </div>
                    <div class="bar-track"><div class="bar-fill" style="width: 60%;"></div></div>
                  </div>
                  <div class="bar-item">
                    <div class="bar-label-group">
                      <span>Voucher miễn phí vận chuyển</span>
                      <span>40%</span>
                    </div>
                    <div class="bar-track"><div class="bar-fill" style="width: 40%;"></div></div>
                  </div>
                </div>
              </div>

              <!-- Tile 3: Conversion Rate -->
              <div class="bento-item bg-green">
                <div class="bento-info">
                  <div class="bento-icon green">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  </div>
                  <h3>Kết quả sử dụng quà tặng mua hàng</h3>
                  <p class="desc">
                    Hơn 35% khách hàng trúng mã giảm giá đã nhanh chóng áp dụng mã để mua hàng ngay trong ngày, thúc đẩy chuyển đổi doanh số bán hàng thần tốc.
                  </p>
                </div>
                <!-- CSS Donut Chart & Legend -->
                <div class="bento-donut-container">
                  <div class="donut-graphic" style="background: conic-gradient(#12B76A 0% 35%, #4277FF 35% 80%, #FA6E5B 80% 100%);">
                    <div class="donut-text" style="font-size: 11px;">35% Mua</div>
                  </div>
                  <div class="donut-donut-legend donut-legend">
                    <div class="legend-item">
                      <div class="legend-color green"></div>
                      <span>Mua hàng ngay (35%)</span>
                    </div>
                    <div class="legend-item">
                      <div class="legend-color blue"></div>
                      <span>Lưu mã dùng sau (45%)</span>
                    </div>
                    <div class="legend-item">
                      <div class="legend-color red"></div>
                      <span>Hết hạn (20%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Stacked Sticky Cards Section -->
        <section class="stacked-cards-section">
          <div class="container">
            <div class="section-header">
              <h2>Tính năng cốt lõi của Smax Gamification</h2>
              <p>Khám phá bộ phân hệ thiết lập minigame, quản lý quà tặng và thống kê hiệu quả chuyển đổi chiến dịch.</p>
            </div>

            <div class="stacked-container">
              <!-- Card 1: Vòng quay may mắn -->
              <div class="stacked-card">
                <div class="stacked-card-copy">
                  <span class="stacked-card-meta">01 / LUCKY WHEEL</span>
                  <h2>Thiết lập Vòng quay may mắn dễ dàng</h2>
                  <p>
                    Giao diện thiết kế vòng quay trực quan cho phép bạn tự tùy chỉnh số lượng ô giải thưởng, tải lên hình ảnh quà tặng, cài đặt tỷ lệ trúng thưởng chính xác cho từng phần quà và giới hạn số lượt quay của mỗi khách hàng.
                  </p>
                  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <span class="ai-chip" style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.25);">Tùy chỉnh ô quà tặng</span>
                    <span class="ai-chip" style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.25);">Cấu hình tỷ lệ trúng</span>
                  </div>
                </div>
                <div class="stacked-card-media">
                  <img src="asset smax/module-feature-images/gamification/lucky-wheel.webp" alt="Giao diện vòng quay may mắn chatbot" />
                </div>
              </div>

              <!-- Card 2: Viral Loop Sharing -->
              <div class="stacked-card">
                <div class="stacked-card-copy">
                  <span class="stacked-card-meta">02 / VIRAL LOOP</span>
                  <h2>Cơ chế chia sẻ nhận thêm lượt quay</h2>
                  <p>
                    Tạo các thử thách kích thích tính lan truyền tự nhiên: Khách hàng chia sẻ game cho bạn bè hoặc tag 3 người bạn vào bài viết để nhận thêm lượt quay thưởng miễn phí. Giúp thương hiệu tiếp cận thêm hàng triệu khách hàng mới với chi phí 0đ.
                  </p>
                  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <span class="ai-chip" style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.25);">Chia sẻ nhận lượt quay</span>
                    <span class="ai-chip" style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.25);">Viral tự nhiên đa kênh</span>
                  </div>
                </div>
                <div class="stacked-card-media">
                  <img src="asset smax/ai-insight/automation-setup.webp" alt="Thiết lập kịch bản viral chia sẻ nhận lượt quay" />
                </div>
              </div>

              <!-- Card 3: Kho quà & Phát Voucher tự động -->
              <div class="stacked-card">
                <div class="stacked-card-copy">
                  <span class="stacked-card-meta">03 / COUPON DEPLOYER</span>
                  <h2>Quản lý kho quà &amp; Phát Voucher thông minh</h2>
                  <p>
                    Tích hợp trực tiếp với hệ thống POS cửa hàng của bạn để nhập kho mã giảm giá độc quyền. Chatbot tự động bốc và phát mã duy nhất cho khách khi trúng thưởng, đồng thời tự động cập nhật số lượng quà còn lại thời gian thực.
                  </p>
                  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <span class="ai-chip" style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.25);">Mã giảm giá độc nhất</span>
                    <span class="ai-chip" style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.25);">Đồng bộ kho POS trực tiếp</span>
                  </div>
                </div>
                <div class="stacked-card-media">
                  <img src="asset smax/ai-insight/tu-dong-gui-bao-cao.webp" alt="Hệ thống tự động phát voucher và quản lý kho quà" />
                </div>
              </div>

              <!-- Card 4: Thống kê hiệu quả chuyển đổi game -->
              <div class="stacked-card">
                <div class="stacked-card-copy">
                  <span class="stacked-card-meta">04 / ANALYTICS HUB</span>
                  <h2>Báo cáo hiệu quả &amp; Danh sách trúng thưởng</h2>
                  <p>
                    Hệ thống thống kê chi tiết số lượng khách tham gia chơi game, danh sách khách hàng trúng thưởng các giải lớn, tỷ lệ quy đổi mã quà tặng thành đơn hàng thành công giúp bạn đo lường hiệu suất ROI chiến dịch chính xác.
                  </p>
                  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <span class="ai-chip" style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.25);">Danh sách trúng thưởng</span>
                    <span class="ai-chip" style="background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.25);">Báo cáo tỷ lệ quy đổi ROI</span>
                  </div>
                </div>
                <div class="stacked-card-media">
                  <img src="asset smax/module-feature-images/gamification/minigame-report.webp" alt="Báo cáo phân tích hiệu quả chiến dịch minigame" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Showcase Section (Viral Loop) -->
        <section class="ai-showcase-section">
          <div class="container">
            <div class="ai-showcase-grid">
              <div class="ai-showcase-copy">
                <h2>Cơ chế phân nhóm &amp; Tự động hóa trao giải</h2>
                <p>
                  Hệ thống tự động phân loại khách hàng trúng các loại giải thưởng khác nhau, gắn thẻ tag phễu chăm sóc remarketing và gửi kịch bản chúc mừng tự động hóa vào inbox khách hàng thời gian thực.
                </p>
                <div class="ai-feature-chips">
                  <span class="ai-chip active">Giải đặc biệt (iPhone)</span>
                  <span class="ai-chip">Giải khuyến khích (Voucher 100k)</span>
                  <span class="ai-chip">Quà tri ân (Ebook)</span>
                  <span class="ai-chip">Mã freeship</span>
                  <span class="ai-chip">Lượt quay miễn phí</span>
                </div>
              </div>
              <div class="ai-showcase-media">
                <div class="mockup-wrapper">
                  <img src="asset smax/module-feature-images/gamification/minigame-report.webp" alt="Màn hình quản lý trao giải minigame Smax" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Reports & Conversion Funnels Section (Interactive Tabs) -->
        <section class="reports-hub-section">
          <div class="container">
            <div class="section-header">
              <h2>Đo lường hiệu quả phễu Minigame</h2>
              <p>Hệ thống thống kê chi tiết tỷ lệ chuyển đổi từ số người click chơi game, số mã voucher phát ra và doanh thu thu về từ voucher.</p>
            </div>

            <!-- Tab Buttons -->
            <div class="reports-tab-container">
              <button class="report-tab-btn active" data-report-tab="performance">Báo cáo lượt chơi</button>
              <button class="report-tab-btn" data-report-tab="activity">Báo cáo phát quà</button>
              <button class="report-tab-btn" data-report-tab="conversion">Doanh thu quy đổi</button>
            </div>

            <!-- Tab Panel 1 -->
            <div class="report-panel active" id="panel-performance">
              <div class="mockup-wrapper">
                <img src="asset smax/ai-insight/bao-cao-tu-van-chot-don.webp" alt="Báo cáo lượt chơi minigame chi tiết" />
              </div>
            </div>

            <!-- Tab Panel 2 -->
            <div class="report-panel" id="panel-activity">
              <div class="mockup-wrapper">
                <img src="asset smax/ai-insight/bao-cao-cham-soc-sau-mua.webp" alt="Báo cáo phát quà tặng và voucher tự động" />
              </div>
            </div>

            <!-- Tab Panel 3 -->
            <div class="report-panel" id="panel-conversion">
              <div class="mockup-wrapper">
                <img src="asset smax/ai-insight/bao-cao-ket-qua-chot-don.webp" alt="Báo cáo doanh số đơn hàng chuyển đổi từ voucher minigame" />
              </div>
            </div>
          </div>
        </section>

        <!-- Case Study Section (Success Stories) -->
        <section class="casestudy-section">
          <div class="container">
            <div class="section-header">
              <h2>Khách hàng thành công cùng Smax Gamification</h2>
              <p>Khám phá cách thức các thương hiệu hàng đầu bùng nổ chiến dịch viral thu hút triệu khách hàng tiềm năng.</p>
            </div>

            <div class="casestudy-card">
              <div class="casestudy-quote">
                <div class="casestudy-quote-mark">“</div>
                <p>
                  Chiến dịch Vòng quay may mắn kỷ niệm sinh nhật thương hiệu kết hợp chatbot Smax.ai của chúng tôi đã mang lại kết quả bùng nổ ngoài mong đợi. Trong vòng 7 ngày, fanpage thu hút hơn 120.000 lượt tham gia chơi game, thu thập 45.000 số điện thoại khách hàng tiềm năng mới và tỷ lệ khách hàng áp dụng mã voucher trúng thưởng để chốt đơn đạt 38% tại hệ thống cửa hàng.
                </p>
                <div class="casestudy-author">
                  <div class="author-info">
                    <h4>PHẠM KHÁNH LY</h4>
                    <p>Giám đốc Vận hành - Mắt Việt Group</p>
                  </div>
                </div>
              </div>
              <div class="casestudy-metrics">
                <div>
                  <div class="cs-metric-num">+120K</div>
                  <div class="cs-metric-label">Lượt chơi trong 7 ngày</div>
                  <div class="cs-metric-desc">Tự động xử lý trả lời và trao thưởng lập tức cho hàng trăm nghìn khách cùng lúc.</div>
                </div>
                <div>
                  <div class="cs-metric-num">38%</div>
                  <div class="cs-metric-label">Tỷ lệ sử dụng voucher chốt đơn</div>
                  <div class="cs-metric-desc">Kích thích nhu cầu mua sắm và tạo ra doanh thu kỷ lục cho chiến dịch offline.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq-section">
          <div class="container">
            <div class="section-header">
              <h2>Câu hỏi thường gặp về Smax Gamification</h2>
              <p>Mọi giải đáp về thiết kế game, tích hợp chatbot và chính sách trao thưởng trên Smax Gamification.</p>
            </div>

            <div class="faq-container">
              <!-- Item 1 -->
              <div class="faq-item">
                <button class="faq-trigger" type="button">
                  <span>Trò chơi minigame hiển thị như thế nào trên điện thoại?</span>
                  <div class="faq-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
                <div class="faq-content">
                  <div class="faq-content-inner">
                    Các trò chơi minigame của Smax được tối ưu hóa hiển thị 100% trên thiết bị di động. Game sẽ mở dưới dạng Webview mượt mà ngay bên trong ứng dụng Messenger hoặc Zalo của khách hàng mà không bắt buộc họ phải tải ứng dụng ngoài hoặc chuyển sang trình duyệt độc lập.
                  </div>
                </div>
              </div>

              <!-- Item 2 -->
              <div class="faq-item">
                <button class="faq-trigger" type="button">
                  <span>Làm thế nào để chatbot tự động gửi game cho khách hàng comment?</span>
                  <div class="faq-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
                <div class="faq-content">
                  <div class="faq-content-inner">
                    Bạn chỉ cần thiết lập một Trigger bình luận (Comment Trigger) trên bài viết lựa chọn và cài đặt từ khóa tương ứng (ví dụ: #quayso, #nhanqua). Khi khách bình luận đúng cú pháp, Smax sẽ tự động inbox và gửi đường link chơi game riêng biệt cho từng khách hàng.
                  </div>
                </div>
              </div>

              <!-- Item 3 -->
              <div class="faq-item">
                <button class="faq-trigger" type="button">
                  <span>Tôi có thể cài đặt giới hạn số quà tặng lớn (như iPhone) để không bị trúng bừa bãi không?</span>
                  <div class="faq-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
                <div class="faq-content">
                  <div class="faq-content-inner">
                    Hoàn toàn được. Smax hỗ trợ hệ thống cài đặt tỷ lệ trúng thưởng thông minh và giới hạn tổng số lượng giải thưởng phát ra cho từng phần quà. Ví dụ: Bạn có thể cài đặt chỉ phát tối đa 1 giải đặc biệt iPhone trong suốt chiến dịch và bot sẽ tự động đóng giải thưởng này khi số lượng chạm giới hạn, chuyển tỷ lệ trúng sang các quà tặng khác.
                  </div>
                </div>
              </div>

              <!-- Item 4 -->
              <div class="faq-item">
                <button class="faq-trigger" type="button">
                  <span>Các mã giảm giá voucher phát ra có bị trùng lặp không?</span>
                  <div class="faq-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
                <div class="faq-content">
                  <div class="faq-content-inner">
                    Không. Bạn có thể tải lên kho mã giảm giá được tạo sẵn từ hệ thống POS hoặc website của bạn (mỗi mã là độc nhất). Chatbot Smax sẽ tự động bốc ngẫu nhiên một mã trong kho phát cho khách hàng trúng giải và đánh dấu mã đó đã được sử dụng để không phát lại cho người sau.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Final CTA Section (Đồng bộ trang chủ) -->
        <section class="final-cta" id="cta">
          <div class="container cta-inner">
            <h2>Bắt đầu chiến dịch Viral bùng nổ ngay hôm nay</h2>
            <p>
              Thu hút hàng triệu lượt tương tác, bùng nổ dữ liệu khách hàng tiềm năng và tối ưu hóa chuyển đổi mua sắm tự động cùng Smax Gamification.
            </p>
            <div class="cta-actions">
              <a class="btn btn-dark" href="#top">Dùng thử miễn phí</a>
              <a class="btn btn-soft" href="index.html#cta">Đặt lịch hẹn tư vấn</a>
            </div>
          </div>
        </section>
      </main>
`;

let finalGamificationHtml = headPart + gamificationMainContent + tailPart;

// Cập nhật title của trang gamification.html
const oldTitleTag = '<title>Giải pháp quản trị hội thoại Livechat tích hợp AI | Smax Livechat</title>';
const newTitleTag = '<title>Bùng nổ tương tác &amp; Chiến dịch Viral | Smax Gamification</title>';
if (finalGamificationHtml.includes(oldTitleTag)) {
  finalGamificationHtml = finalGamificationHtml.replace(oldTitleTag, newTitleTag);
}

// Cập nhật các CSS đặc thù thu nhỏ tag ý định (nếu có)
const cssTarget = `      .ai-chip.active, .ai-chip:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.35);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.08);
      }`;

const cssReplacement = `      .ai-chip.active, .ai-chip:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.35);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.08);
      }

      .ai-showcase-copy .ai-chip {
        font-size: 10px !important;
        padding: 4px 10px !important;
        text-transform: none !important;
        letter-spacing: 0.02em !important;
        font-weight: 600 !important;
      }

      /* Định dạng riêng cho thẻ thứ 4 xếp chồng của Gamification */
      .stacked-card:nth-child(4) {
        z-index: 4;
        background: var(--primary-coral, #FA6E5B);
        color: #FFFFFF;
        top: 200px;
      }`;

if (finalGamificationHtml.includes(cssTarget)) {
  finalGamificationHtml = finalGamificationHtml.replace(cssTarget, cssReplacement);
}

// Ghi file gamification.html
fs.writeFileSync('gamification.html', finalGamificationHtml, 'utf8');
console.log('Successfully created gamification.html page!');

// 3. Quét tất cả các file HTML để đổi <a>Gamification</a> thành <a href="gamification.html">Gamification</a>
const htmlFiles = ['index.html', 'livechat.html', 'insight.html', 'genai.html', 'tich-hop.html', 'templates.html', 'chatbot.html', 'gamification.html'];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let fContent = fs.readFileSync(file, 'utf8');
    const oldAnchor = '<a>Gamification</a>';
    const newAnchor = '<a href="gamification.html">Gamification</a>';
    
    if (fContent.includes(oldAnchor)) {
      fContent = fContent.split(oldAnchor).join(newAnchor);
      console.log(`Updated Gamification link in ${file}`);
      fs.writeFileSync(file, fContent, 'utf8');
    }
  }
});
