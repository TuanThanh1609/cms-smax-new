import React from 'react';
import { IntegrationShowcase, Integration } from '@/components/ui/integration-showcase';

// Dữ liệu các kết nối của Smax.ai
const integrationsData: Integration[] = [
  {
    name: 'Facebook',
    description: 'Tự động phản hồi bình luận, gửi tin nhắn và quản lý bài viết.',
    iconSrc: 'https://img.icons8.com/color/96/facebook-new.png',
  },
  {
    name: 'Zalo OA',
    description: 'Gửi tin nhắn CSKH tự động, thông báo ZNS và quản lý khách hàng quan tâm.',
    iconSrc: 'asset smax/integration-icons/zalo.svg',
  },
  {
    name: 'Zalo cá nhân',
    description: 'Hỗ trợ nhắn tin chăm sóc khách hàng tự động qua tài khoản cá nhân.',
    iconSrc: 'asset smax/integration-icons/zalo.svg',
  },
  {
    name: 'Website Livechat',
    description: 'Tích hợp widget livechat thông minh, kết nối trực tiếp với Smax AI.',
    iconSrc: 'https://img.icons8.com/color/96/globe--v1.png',
  },
  {
    name: 'Haravan / Shopify',
    description: 'Đồng bộ sản phẩm, tồn kho và đơn hàng tự động từ website bán hàng.',
    iconSrc: 'https://img.icons8.com/color/96/shopify.png',
  },
  {
    name: 'Sàn TMĐT',
    description: 'Kết nối Shopee, Lazada, TikTok Shop để đồng bộ đơn và tự động hóa phễu chat.',
    iconSrc: 'https://img.icons8.com/color/96/online-store.png',
  },
  {
    name: 'KiotViet / Sapo / Nhanh',
    description: 'Đồng bộ thông tin khách hàng và lịch sử mua sắm từ hệ thống POS bán lẻ.',
    iconSrc: 'https://img.icons8.com/color/96/shop.png',
  },
  {
    name: 'Google Sheets',
    description: 'Tự động xuất thông tin lead, đơn hàng và báo cáo thời gian thực.',
    iconSrc: 'https://img.icons8.com/color/96/google-sheets.png',
  },
  {
    name: 'Lark Suite',
    description: 'Đồng bộ thông báo vận hành, giao việc tự động cho đội ngũ nội bộ.',
    iconSrc: 'https://cdn.simpleicons.org/larksuite/00D2C4',
  },
  {
    name: 'n8n Automation',
    description: 'Xây dựng các kịch bản tự động hóa sâu, kết nối hơn 400 ứng dụng.',
    iconSrc: 'https://cdn.simpleicons.org/n8n/FF6C37',
  },
  {
    name: 'CRM / ERP',
    description: 'Đồng bộ dữ liệu khách hàng 360 độ và lịch sử giao tiếp tức thời.',
    iconSrc: 'https://img.icons8.com/color/96/database.png',
  },
  {
    name: 'API / Webhook',
    description: 'Mở rộng khả năng kết nối không giới hạn với mọi hệ thống của bạn.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/webhooks.svg',
  },
];

const IntegrationShowcaseDemo = () => {
  return (
    <div className="w-full bg-background">
      <IntegrationShowcase
        title="Kết nối mạnh mẽ với các ~nền tảng~"
        subtitle="Smax.ai tích hợp sâu với hơn 200 ứng dụng giao tiếp, bán hàng và tự động hóa dữ liệu để vận hành trơn tru."
        illustrationSrc="https://tally.so/images/demo/v2/strategy.png"
        illustrationAlt="A person working on a checklist"
        integrations={integrationsData}
      />
    </div>
  );
};

export default IntegrationShowcaseDemo;
