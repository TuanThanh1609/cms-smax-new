import subprocess
import os
import sys
import json

def run_codex_imagegen(prompt: str, output_path: str):
    """
    Calls Codex CLI 'codex exec' to generate an image using the 'imagegen' skill.
    Moves the generated file to the desired output_path.
    """
    print(f"\n[Codex ImageGen] Starting image generation for: {os.path.basename(output_path)}")
    print(f"[Codex ImageGen] Destination: {output_path}")
    
    # Structure the prompt to guide the Codex Agent to use the imagegen skill 
    # and move the resulting file to our target output path.
    full_prompt = (
        f"{prompt}\n\n"
        f"CRITICAL INSTRUCTIONS:\n"
        f"1. Use the 'imagegen' skill (specifically the built-in 'image_gen' tool) to create this image.\n"
        f"2. Once generated, copy or move the final image file from your internal generated directory "
        f"directly to this exact local path: {os.path.abspath(output_path)}\n"
        f"3. Make sure to overwrite any existing file at that path.\n"
        f"4. Confirm once the file has been successfully written to the destination."
    )
    
    # We run 'codex exec' with the prompt. 
    # We use --model gpt-5.4 to override the outdated default model in config.
    # We use --full-auto to avoid prompt approvals blocks.
    # Added --skip-git-repo-check to allow running outside trusted Git repos.
    cmd = ["codex", "exec", "--model", "gpt-5.4", "--full-auto", "--skip-git-repo-check", full_prompt]
    
    try:
        # Launching the process and piping outputs to display real-time progress
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding='utf-8',
            bufsize=1
        )
        
        # Read output line by line as it is printed by Codex
        for line in process.stdout:
            print(f"  [Codex] {line.strip()}")
            
        process.wait()
        
        if process.returncode == 0:
            if os.path.exists(output_path):
                print(f"[Codex ImageGen] SUCCESS! Image successfully created at: {output_path}")
                return True
            else:
                print(f"[Codex ImageGen] WARNING: Codex finished successfully but the file was not found at {output_path}.")
                return False
        else:
            print(f"[Codex ImageGen] ERROR: Codex exec failed with exit code {process.returncode}")
            return False
            
    except Exception as e:
        print(f"[Codex ImageGen] EXCEPTION occurred: {str(e)}")
        return False

def main():
    # Define target directory for output images
    output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "asset smax")
    os.makedirs(output_dir, exist_ok=True)
    
    # Define the 4 flow images to generate
    # Prompts are carefully updated to replicate the official Smax UI/UX builder layout, block styles and connection lines.
    jobs = [
        {
            "filename": "social_chat_flow.png",
            "prompt": (
                "Create a premium high-resolution website interface capture of the Smax.ai chatbot workflow builder. "
                "The layout must strictly match Smax's official editor UI/UX shown in the reference: "
                "Background: very light greyish-blue surface (#F5F6FA) with a clean grid. "
                "Block layout: 3 rounded rectangular blocks arranged horizontally, connected by smooth peach-colored routing lines (#FA6E5B with 0.6 opacity) with small node-connection dots. "
                "Each block must have a dark-navy title bar (#0F1835) at the top, a clean white body container below with thin grey borders, and rounded corners (radius 16px). "
                "Block 1 Title: 'OTP-ZaloCaNhan' (dark navy header with small icons). Body: contains a yellow warning banner at the top with text 'Block này có thể dùng cho Bot...', followed by a card 'Messenger Text' (with a small blue Messenger icon and text 'Chào {{facebook.name}}...'). "
                "Block 2 Title: 'OTP-ZaloCaNhan-ThuPhone' (dark navy header). Body: contains card 'Messenger User Input' (blue icon) and card 'Messenger Text' (with text 'Mình đã nhận được số điện thoại...'). "
                "Block 3 Title: 'OTP-ZaloCaNhan-GuiOTP' (dark navy header). Body: contains card 'Find/Add ZaloUser' (black/blue search icon), card 'If not found' (split layout), a yellow block button 'Tạo 1 dãy số ngẫu nhiên 4 ch...', card 'Set Attributes' (setting gear icon), and card 'Mess To Zalo User' (chat icon). "
                "Overall aesthetic: clean, premium B2B SaaS dashboard layout, crisp Vietnamese typography, sharp elements, professional SaaS mockup."
            )
        },
        {
            "filename": "ecommerce_retail_flow.png",
            "prompt": (
                "Create a premium high-resolution website interface capture of the Smax.ai chatbot workflow builder. "
                "The layout must strictly match Smax's official editor UI/UX shown in the reference: "
                "Background: very light greyish-blue surface (#F5F6FA) with a clean grid. "
                "Block layout: 3 rounded rectangular blocks arranged horizontally, connected by smooth peach-colored routing lines (#FA6E5B with 0.6 opacity) with small node-connection dots. "
                "Each block must have a dark-navy title bar (#0F1835) at the top, a clean white body container below with thin grey borders, and rounded corners (radius 16px). "
                "Block 1 Title: 'Order-Webhook' (dark navy header). Body: contains card 'New Order Trigger' (with TikTok/Shopee icons), and a text card 'Đồng bộ dữ liệu khách hàng'. "
                "Block 2 Title: 'POS-Sync' (dark navy header). Body: contains card 'KiotViet Sync' (green icon) and card 'Check Inventory' (inventory database icon, checking product quantities). "
                "Block 3 Title: 'Notify-Customer' (dark navy header). Body: contains card 'Create Invoice' (success green icon), card 'Zalo ZNS Notify' (blue Zalo icon with text 'Gửi tin nhắn xác nhận đơn hàng...'). "
                "Overall aesthetic: clean, premium B2B SaaS dashboard layout, crisp Vietnamese typography, sharp elements, professional SaaS mockup."
            )
        },
        {
            "filename": "data_sync_crm_flow.png",
            "prompt": (
                "Create a premium high-resolution website interface capture of the Smax.ai chatbot workflow builder. "
                "The layout must strictly match Smax's official editor UI/UX: "
                "Background: very light greyish-blue surface (#F5F6FA) with a clean grid. "
                "Block layout: 3 rounded rectangular blocks arranged horizontally, connected by smooth peach-colored routing lines (#FA6E5B with 0.6 opacity) with small node-connection dots. "
                "Each block must have a dark-navy title bar (#0F1835) at the top, a clean white body container below with thin grey borders, and rounded corners (radius 16px). "
                "Block 1 Title: 'Lead-Form' (dark navy header). Body: contains card 'Google Sheets Form Trigger' (green sheets icon), and a text card 'Nhận thông tin đăng ký'. "
                "Block 2 Title: 'HubSpot-CRM' (dark navy header). Body: contains card 'HubSpot Contact Sync' (orange HubSpot icon) and card 'Create Deal Stage' (progress bar icon, setting deal stage to new lead). "
                "Block 3 Title: 'Internal-Notification' (dark navy header). Body: contains card 'Lark Message Sync' (teal Lark icon), card 'Slack Alert' (slack icon with text 'Thông báo có Lead mới cho đội Sales...'). "
                "Overall aesthetic: clean, premium B2B SaaS dashboard layout, crisp Vietnamese typography, sharp elements, professional SaaS mockup."
            )
        },
        {
            "filename": "advanced_ai_systems_flow.png",
            "prompt": (
                "Create a premium high-resolution website interface capture of the Smax.ai chatbot workflow builder. "
                "The layout must strictly match Smax's official editor UI/UX: "
                "Background: very light greyish-blue surface (#F5F6FA) with a clean grid. "
                "Block layout: 3 rounded rectangular blocks arranged horizontally, connected by smooth peach-colored routing lines (#FA6E5B with 0.6 opacity) with small node-connection dots. "
                "Each block must have a dark-navy title bar (#0F1835) at the top, a clean white body container below with thin grey borders, and rounded corners (radius 16px). "
                "Block 1 Title: 'Webhook-Trigger' (dark navy header). Body: contains card 'n8n/Make Webhook' (orange/red webhook icon), and a text card 'Lắng nghe dữ liệu hệ thống'. "
                "Block 2 Title: 'Smax-AI-Agent' (dark navy header). Body: contains card 'Intent Classifier' (AI brain icon) and card 'Context analyzer' (GPT-5/Gemini chat bubble icon with text 'Phân tích ngữ cảnh hội thoại...'). "
                "Block 3 Title: 'API-Router' (dark navy header). Body: contains card 'Custom API Request' (purple code brackets icon), card 'Condition Router' (split layout routing to different bot branches). "
                "Overall aesthetic: clean, premium B2B SaaS dashboard layout, crisp Vietnamese typography, sharp elements, professional SaaS mockup."
            )
        }
    ]
    
    print("=== SMAX.AI FLOW IMAGES GENERATOR ===")
    print(f"Target directory: {output_dir}")
    
    success_count = 0
    for job in jobs:
        output_path = os.path.join(output_dir, job["filename"])
        success = run_codex_imagegen(job["prompt"], output_path)
        if success:
            success_count += 1
            
    print(f"\n=== GENERATION SUMMARY ===")
    print(f"Successfully generated: {success_count}/{len(jobs)} images.")

if __name__ == "__main__":
    main()
