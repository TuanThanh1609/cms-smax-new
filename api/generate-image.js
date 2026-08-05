const TOKEN_AI_ENDPOINT = 'https://token.ai.vn/v1/images/generations';
const TOKEN_AI_MODEL = 'gpt-image-2';
const ALLOWED_SIZES = new Set(['1024x1024', '1024x1536', '1536x1024', '16:9', '9:16']);
const MAX_PROMPT_LENGTH = 8000;
const MAX_REFERENCE_IMAGES = 4;
const MAX_REFERENCE_URL_LENGTH = 4096;
const MAX_SOURCE_BYTES = 24 * 1024 * 1024;
const MAX_RESPONSE_BYTES = 4 * 1024 * 1024;

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

function sendPng(response, imageBuffer, size) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'image/png');
  response.setHeader('Content-Length', imageBuffer.length);
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Image-Size', size);
  response.setHeader('X-Image-Model', TOKEN_AI_MODEL);
  response.end(imageBuffer);
}

function isValidReferenceImage(value) {
  return typeof value === 'string' && (
    /^https?:\/\//i.test(value) ||
    /^data:image\/(?:png|jpe?g|webp|gif);base64,/i.test(value)
  );
}

async function verifyCmsSession(request) {
  const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
  const authorization = request.headers.authorization || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Máy chủ chưa có cấu hình xác thực CMS.');
  }

  if (!authorization.startsWith('Bearer ')) {
    return false;
  }

  const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: authorization
    },
    signal: AbortSignal.timeout(15000)
  });

  return authResponse.ok;
}

async function readGeneratedImage(generationPayload) {
  const firstImage = generationPayload?.data?.[0];
  if (!firstImage) {
    throw new Error('Dịch vụ AI không trả về dữ liệu ảnh.');
  }

  const encoded = firstImage.b64_json || firstImage.base64 || firstImage.image_base64;
  if (encoded) {
    const cleanBase64 = encoded.includes(',') ? encoded.split(',').pop() : encoded;
    return Buffer.from(cleanBase64, 'base64');
  }

  if (firstImage.url) {
    const imageResponse = await fetch(firstImage.url, {
      signal: AbortSignal.timeout(60000)
    });
    if (!imageResponse.ok) {
      throw new Error(`Không thể tải ảnh AI vừa tạo (HTTP ${imageResponse.status}).`);
    }

    const contentLength = Number(imageResponse.headers.get('content-length') || 0);
    if (contentLength > MAX_SOURCE_BYTES) {
      throw new Error('Ảnh AI trả về có dung lượng quá lớn.');
    }

    return Buffer.from(await imageResponse.arrayBuffer());
  }

  throw new Error('Dịch vụ AI không trả về URL hoặc dữ liệu Base64 hợp lệ.');
}

async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { error: 'Chỉ hỗ trợ phương thức POST.' });
  }

  try {
    const hasValidSession = await verifyCmsSession(request);
    if (!hasValidSession) {
      return sendJson(response, 401, { error: 'Phiên đăng nhập CMS không hợp lệ hoặc đã hết hạn.' });
    }

    const tokenAiApiKey = process.env.TOKEN_AI_API_KEY || '';
    if (!tokenAiApiKey) {
      return sendJson(response, 503, {
        error: 'Máy chủ chưa được cấu hình TOKEN_AI_API_KEY.'
      });
    }

    let requestBody = request.body || {};
    if (typeof requestBody === 'string') {
      try {
        requestBody = JSON.parse(requestBody);
      } catch (_) {
        return sendJson(response, 400, { error: 'Nội dung yêu cầu không phải JSON hợp lệ.' });
      }
    }

    const prompt = typeof requestBody.prompt === 'string' ? requestBody.prompt.trim() : '';
    const requestedSize = typeof requestBody.size === 'string' ? requestBody.size : '';
    const size = ALLOWED_SIZES.has(requestedSize) ? requestedSize : '1024x1024';
    const rawReferenceImages = requestBody.referenceImages === undefined
      ? []
      : requestBody.referenceImages;

    if (!Array.isArray(rawReferenceImages)) {
      return sendJson(response, 400, { error: 'Danh sách ảnh tham chiếu không hợp lệ.' });
    }
    if (rawReferenceImages.length > MAX_REFERENCE_IMAGES) {
      return sendJson(response, 400, {
        error: `Chỉ được gửi tối đa ${MAX_REFERENCE_IMAGES} ảnh tham chiếu cho mỗi lần tạo.`
      });
    }

    const referenceImages = rawReferenceImages.map(reference => {
      if (typeof reference === 'string') return reference;
      return reference?.url;
    });

    if (referenceImages.some(url => !isValidReferenceImage(url) || url.length > MAX_REFERENCE_URL_LENGTH)) {
      return sendJson(response, 400, {
        error: 'Ảnh tham chiếu phải là URL công khai hợp lệ và không vượt quá kích thước cho phép.'
      });
    }

    if (!prompt) {
      return sendJson(response, 400, { error: 'Prompt không được để trống.' });
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
      return sendJson(response, 400, {
        error: `Prompt chỉ được dài tối đa ${MAX_PROMPT_LENGTH.toLocaleString('vi-VN')} ký tự.`
      });
    }

    const providerPrompt = `${prompt}\n\nNỀN KỸ THUẬT BẮT BUỘC: Toàn bộ vùng nền phải là một màu phẳng, đồng nhất #FF00FF (magenta chroma), phủ kín đến bốn mép ảnh, không gradient, không đổ bóng lên nền, không texture. Tuyệt đối không dùng màu #FF00FF trong chủ thể hoặc chi tiết cần giữ lại. Không tạo khung viền.`;

    const providerPayload = {
      model: TOKEN_AI_MODEL,
      prompt: providerPrompt,
      n: 1,
      size,
      quality: 'high',
      // Token AI accepts reference_images for GPT Image 2 image-to-image generation.
      output_format: 'png'
    };
    if (referenceImages.length) {
      providerPayload.reference_images = referenceImages;
    }

    const generationResponse = await fetch(TOKEN_AI_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenAiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(providerPayload),
      signal: AbortSignal.timeout(240000)
    });

    const responseText = await generationResponse.text();
    let generationPayload = null;
    try {
      generationPayload = JSON.parse(responseText);
    } catch (_) {
      generationPayload = null;
    }

    if (!generationResponse.ok) {
      const upstreamMessage = generationPayload?.error?.message || generationPayload?.message;
      throw new Error(upstreamMessage || `Dịch vụ tạo ảnh trả về HTTP ${generationResponse.status}.`);
    }

    const sourceBuffer = await readGeneratedImage(generationPayload);
    if (!sourceBuffer.length || sourceBuffer.length > MAX_RESPONSE_BYTES) {
      throw new Error('Ảnh PNG trả về quá lớn để chuyển tới CMS. Hãy thử tỷ lệ ảnh khác.');
    }
    const isPng = sourceBuffer.length >= 8 &&
      sourceBuffer[0] === 0x89 && sourceBuffer[1] === 0x50 &&
      sourceBuffer[2] === 0x4e && sourceBuffer[3] === 0x47;
    if (!isPng) {
      throw new Error('Dịch vụ AI không trả về đúng định dạng PNG đã yêu cầu.');
    }

    return sendPng(response, sourceBuffer, size);
  } catch (error) {
    const timedOut = error?.name === 'TimeoutError' || error?.name === 'AbortError';
    const message = timedOut
      ? 'Quá thời gian chờ tạo ảnh. Vui lòng thử lại.'
      : (error?.message || 'Không thể tạo ảnh lúc này.');
    return sendJson(response, timedOut ? 504 : 500, { error: message });
  }
}

module.exports = handler;
module.exports.config = {
  maxDuration: 300
};
