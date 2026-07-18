const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCodexImageGen(prompt, outputPath) {
  return new Promise((resolve) => {
    console.log(`\n[Codex ImageGen] Starting image generation for: ${path.basename(outputPath)}`);
    console.log(`[Codex ImageGen] Destination: ${outputPath}`);

    const absoluteOutputPath = path.resolve(outputPath);
    const fullPrompt = `${prompt}\n\n` +
      `CRITICAL INSTRUCTIONS:\n` +
      `1. Use the 'imagegen' skill (specifically the built-in 'image_gen' tool) to create this image.\n` +
      `2. Once generated, copy or move the final image file from your internal generated directory ` +
      `directly to this exact local path: ${absoluteOutputPath}\n` +
      `3. Make sure to overwrite any existing file at that path.\n` +
      `4. Confirm once the file has been successfully written to the destination.`;

    // Run codex exec with model gpt-5.4, --full-auto and --skip-git-repo-check
    // Escape double quotes in prompt for command line safety
    const escapedPrompt = fullPrompt.replace(/"/g, '\\"').replace(/\n/g, ' ');
    const cmd = `codex exec --model gpt-5.4 --full-auto --skip-git-repo-check "${escapedPrompt}"`;

    const child = exec(cmd);

    child.stdout.on('data', (data) => {
      // Print progress in real-time
      const lines = data.split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          console.log(`  [Codex] ${line.trim()}`);
        }
      });
    });

    child.stderr.on('data', (data) => {
      const lines = data.split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          console.error(`  [Codex Error] ${line.trim()}`);
        }
      });
    });

    child.on('close', (code) => {
      if (code === 0) {
        if (fs.existsSync(outputPath)) {
          console.log(`[Codex ImageGen] SUCCESS! Image successfully created at: ${outputPath}`);
          resolve(true);
        } else {
          console.log(`[Codex ImageGen] WARNING: Codex finished but file was not found at ${outputPath}`);
          resolve(false);
        }
      } else {
        console.log(`[Codex ImageGen] ERROR: Codex exec failed with exit code ${code}`);
        resolve(false);
      }
    });
  });
}

async function main() {
  const outputDir = path.join(__dirname, 'asset smax');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const jobs = [
    {
      filename: 'social_chat_flow.png',
      prompt: "Create a premium high-resolution website interface capture of the Smax.ai chatbot workflow builder. The layout must strictly match Smax's official editor UI/UX shown in the reference image: Background: very light greyish-blue surface (#F5F6FA) with a clean grid. Block layout: 3 rounded rectangular blocks arranged horizontally, connected by smooth peach-colored routing lines (#FA6E5B with 0.6 opacity) with small node-connection dots. Each block must have a dark-navy title bar (#0F1835) at the top, a clean white body container below with thin grey borders, and rounded corners (radius 16px). Block 1 Title: 'OTP-ZaloCaNhan' (dark navy header with small icons). Body: contains a yellow warning banner at the top with text 'Block này có thể dùng cho Bot...', followed by a card 'Messenger Text' (with a small blue Messenger icon and text 'Chào {{facebook.name}}...'). Block 2 Title: 'OTP-ZaloCaNhan-ThuPhone' (dark navy header). Body: contains card 'Messenger User Input' (blue icon) and card 'Messenger Text' (with text 'Mình đã nhận được số điện thoại...'). Block 3 Title: 'OTP-ZaloCaNhan-GuiOTP' (dark navy header). Body: contains card 'Find/Add ZaloUser' (black/blue search icon), card 'If not found' (split layout), a yellow block button 'Tạo 1 dãy số ngẫu nhiên 4 ch...', card 'Set Attributes' (setting gear icon), and card 'Mess To Zalo User' (chat icon). Overall aesthetic: clean, premium B2B SaaS dashboard layout, crisp Vietnamese typography, sharp elements, professional SaaS mockup."
    },
    {
      filename: 'ecommerce_retail_flow.png',
      prompt: "Create a premium high-resolution website interface capture of the Smax.ai chatbot workflow builder. The layout must strictly match Smax's official editor UI/UX shown in the reference image: Background: very light greyish-blue surface (#F5F6FA) with a clean grid. Block layout: 3 rounded rectangular blocks arranged horizontally, connected by peach-colored routing lines (#FA6E5B with 0.6 opacity) with small node-connection dots. Each block must have a dark-navy title bar (#0F1835) at the top, a clean white body container below with thin grey borders, and rounded corners (radius 16px). Block 1 Title: 'Order-Webhook' (dark navy header). Body: contains card 'New Order Trigger' (with TikTok/Shopee icons), and a text card 'Đồng bộ dữ liệu khách hàng'. Block 2 Title: 'POS-Sync' (dark navy header). Body: contains card 'KiotViet Sync' (green icon) and card 'Check Inventory' (inventory database icon, checking product quantities). Block 3 Title: 'Notify-Customer' (dark navy header). Body: contains card 'Create Invoice' (success green icon), card 'Zalo ZNS Notify' (blue Zalo icon with text 'Gửi tin nhắn xác nhận đơn hàng...'). Overall aesthetic: clean, premium B2B SaaS dashboard layout, crisp Vietnamese typography, sharp elements, professional SaaS mockup."
    },
    {
      filename: 'data_sync_crm_flow.png',
      prompt: "Create a premium high-resolution website interface capture of the Smax.ai chatbot workflow builder. The layout must strictly match Smax's official editor UI/UX shown in the reference image: Background: very light greyish-blue surface (#F5F6FA) with a clean grid. Block layout: 3 rounded rectangular blocks arranged horizontally, connected by peach-colored routing lines (#FA6E5B with 0.6 opacity) with small node-connection dots. Each block must have a dark-navy title bar (#0F1835) at the top, a clean white body container below with thin grey borders, and rounded corners (radius 16px). Block 1 Title: 'Lead-Form' (dark navy header). Body: contains card 'Google Sheets Form Trigger' (green sheets icon), and a text card 'Nhận thông tin đăng ký'. Block 2 Title: 'HubSpot-CRM' (dark navy header). Body: contains card 'HubSpot Contact Sync' (orange HubSpot icon) and card 'Create Deal Stage' (progress bar icon, setting deal stage to new lead). Block 3 Title: 'Internal-Notification' (dark navy header). Body: contains card 'Lark Message Sync' (teal Lark icon), card 'Slack Alert' (slack icon with text 'Thông báo có Lead mới cho đội Sales...'). Overall aesthetic: clean, premium B2B SaaS dashboard layout, crisp Vietnamese typography, sharp elements, professional SaaS mockup."
    },
    {
      filename: 'advanced_ai_systems_flow.png',
      prompt: "Create a premium high-resolution website interface capture of the Smax.ai chatbot workflow builder. The layout must strictly match Smax's official editor UI/UX shown in the reference image: Background: very light greyish-blue surface (#F5F6FA) with a clean grid. Block layout: 3 rounded rectangular blocks arranged horizontally, connected by peach-colored routing lines (#FA6E5B with 0.6 opacity) with small node-connection dots. Each block must have a dark-navy title bar (#0F1835) at the top, a clean white body container below with thin grey borders, and rounded corners (radius 16px). Block 1 Title: 'Webhook-Trigger' (dark navy header). Body: contains card 'n8n/Make Webhook' (orange/red webhook icon), and a text card 'Lắng nghe dữ liệu hệ thống'. Block 2 Title: 'Smax-AI-Agent' (dark navy header). Body: contains card 'Intent Classifier' (AI brain icon) and card 'Context analyzer' (GPT-5/Gemini chat bubble icon with text 'Phân tích ngữ cảnh hội thoại...'). Block 3 Title: 'API-Router' (dark navy header). Body: contains card 'Custom API Request' (purple code brackets icon), card 'Condition Router' (split layout routing to different bot branches). Overall aesthetic: clean, premium B2B SaaS dashboard layout, crisp Vietnamese typography, sharp elements, professional SaaS mockup."
    }
  ];

  console.log('=== SMAX.AI FLOW IMAGES GENERATOR (NODE.JS) ===');
  console.log(`Target directory: ${outputDir}`);

  let successCount = 0;
  for (const job of jobs) {
    const outputPath = path.join(outputDir, job.filename);
    const success = await runCodexImageGen(job.prompt, outputPath);
    if (success) {
      successCount++;
    }
  }

  console.log(`\n=== GENERATION SUMMARY ===`);
  console.log(`Successfully generated: ${successCount}/${jobs.length} images.`);
}

main();
