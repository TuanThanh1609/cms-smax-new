const TOKEN_AI_GENERATIONS_ENDPOINT = 'https://token.ai.vn/v1/images/generations';
const TOKEN_AI_CHAT_ENDPOINT = 'https://token.ai.vn/v1/chat/completions';
const TOKEN_AI_MODEL = 'gpt-image-2';
const REFERENCE_ANALYSIS_MODEL = 'gpt-4.1-mini';
const ALLOWED_SIZES = new Set(['1024x1024', '1024x1536', '1536x1024', '1536x864', '864x1536']);
const SIZE_ALIASES = {
  '16:9': '1536x864',
  '9:16': '864x1536'
};
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

function inferImageContentType(value) {
  const extension = value.split('?')[0].split('#')[0].split('.').pop()?.toLowerCase();
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
  if (extension === 'webp') return 'image/webp';
  if (extension === 'gif') return 'image/gif';
  return 'image/png';
}

async function readReferenceImage(reference, index) {
  const source = reference.url;
  const dataMatch = /^data:(image\/(?:png|jpe?g|webp|gif));base64,(.+)$/i.exec(source);
  if (dataMatch) {
    const contentType = dataMatch[1].toLowerCase().replace('jpg', 'jpeg');
    const buffer = Buffer.from(dataMatch[2], 'base64');
    if (!buffer.length || buffer.length > MAX_SOURCE_BYTES) {
      throw new Error('Ảnh tham chiếu có dung lượng không hợp lệ hoặc quá lớn.');
    }
    return {
      buffer,
      contentType
    };
  }

  const imageResponse = await fetch(source, {
    signal: AbortSignal.timeout(60000)
  });
  if (!imageResponse.ok) {
    throw new Error(`Không thể tải ảnh tham chiếu (HTTP ${imageResponse.status}).`);
  }

  const buffer = Buffer.from(await imageResponse.arrayBuffer());
  if (!buffer.length || buffer.length > MAX_SOURCE_BYTES) {
    throw new Error('Ảnh tham chiếu có dung lượng quá lớn.');
  }

  const headerContentType = imageResponse.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  const contentType = /^image\/(?:png|jpeg|webp|gif)$/.test(headerContentType || '')
    ? headerContentType
    : inferImageContentType(source);

  return {
    buffer,
    contentType
  };
}

function extractChatText(chatPayload) {
  const content = chatPayload?.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content.trim();
  if (Array.isArray(content)) {
    return content
      .map(part => typeof part === 'string' ? part : (part?.text || part?.content || ''))
      .join('\n')
      .trim();
  }
  return '';
}

async function analyzeReferenceImages(referenceEntries, prompt, tokenAiApiKey) {
  const references = await Promise.all(referenceEntries.map((reference, index) => (
    readReferenceImage(reference, index)
  )));
  const content = [{
    type: 'text',
    text: `Phân tích ${references.length} ảnh tham chiếu theo đúng thứ tự. Mục tiêu ảnh của người dùng: ${prompt.slice(0, 3500)}. Mô tả bằng tiếng Việt, ngắn gọn nhưng cụ thể: logo/wordmark và hình dáng, màu sắc chính, đối tượng, bố cục, phong cách, chi tiết cần giữ. Không tự sáng tạo thêm nội dung không nhìn thấy trong ảnh.`
  }];

  references.forEach((reference, index) => {
    content.push({
      type: 'text',
      text: `Ảnh tham chiếu số ${index + 1}${referenceEntries[index].name ? ` (${referenceEntries[index].name})` : ''}:`
    });
    content.push({
      type: 'image_url',
      image_url: {
        url: `data:${reference.contentType};base64,${reference.buffer.toString('base64')}`
      }
    });
  });

  const analysisResponse = await fetch(TOKEN_AI_CHAT_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenAiApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: REFERENCE_ANALYSIS_MODEL,
      messages: [
        {
          role: 'system',
          content: 'Bạn là trợ lý phân tích hình ảnh cho CMS. Hãy quan sát ảnh đính kèm và trả về mô tả trực quan bằng tiếng Việt để một model tạo ảnh khác có thể tái hiện đúng nhận diện, logo, màu sắc và bố cục.'
        },
        { role: 'user', content }
      ],
      max_tokens: 1200
    }),
    signal: AbortSignal.timeout(120000)
  });

  const responseText = await analysisResponse.text();
  let analysisPayload = null;
  try {
    analysisPayload = JSON.parse(responseText);
  } catch (_) {
    analysisPayload = null;
  }
  if (!analysisResponse.ok) {
    const upstreamMessage = analysisPayload?.error?.message || analysisPayload?.message;
    throw new Error(upstreamMessage || `Không thể đọc ảnh tham chiếu (HTTP ${analysisResponse.status}).`);
  }

  const analysis = extractChatText(analysisPayload);
  if (!analysis) {
    throw new Error('Model không trả về mô tả cho ảnh tham chiếu.');
  }
  return analysis.slice(0, 6000);
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
    const sizeAlias = Object.prototype.hasOwnProperty.call(SIZE_ALIASES, requestedSize)
      ? SIZE_ALIASES[requestedSize]
      : '';
    const size = sizeAlias || (ALLOWED_SIZES.has(requestedSize) ? requestedSize : '1024x1024');
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

    const referenceEntries = rawReferenceImages.map(reference => {
      if (typeof reference === 'string') return { url: reference, name: '' };
      return {
        url: reference?.url,
        name: typeof reference?.name === 'string' ? reference.name.trim().slice(0, 120) : ''
      };
    });
    const referenceImages = referenceEntries.map(reference => reference.url);

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

    const referenceInstruction = referenceImages.length
      ? `\n\nHƯỚNG DẪN ẢNH THAM CHIẾU BẮT BUỘC: Có ${referenceImages.length} ảnh tham chiếu được đính kèm theo đúng thứ tự người dùng chọn. Phải thực sự xem và sử dụng các ảnh này để giữ đúng logo, nhận diện thương hiệu, đối tượng, màu sắc và phong cách; không được bỏ qua, thay bằng biểu tượng chung chung hoặc tự nghĩ ra logo khác. Nếu có ảnh logo Smax, giữ đúng hình dáng và màu xanh navy/cam của logo, không viết lại logo bằng chữ.`
      : '';
    let providerPrompt = `${prompt}${referenceInstruction}\n\nNỀN KỸ THUẬT BẮT BUỘC: Toàn bộ vùng nền phải là một màu phẳng, đồng nhất #FF00FF (magenta chroma), phủ kín đến bốn mép ảnh, không gradient, không đổ bóng lên nền, không texture. Tuyệt đối không dùng màu #FF00FF trong chủ thể hoặc chi tiết cần giữ lại. Không tạo khung viền.`;

    if (referenceEntries.length) {
      const referenceAnalysis = await analyzeReferenceImages(referenceEntries, prompt, tokenAiApiKey);
      providerPrompt += `\n\nPHÂN TÍCH ẢNH THAM CHIẾU ĐỂ BÁM SÁT: ${referenceAnalysis}`;
    }

    const providerPayload = {
      model: TOKEN_AI_MODEL,
      prompt: providerPrompt,
      n: 1,
      size,
      quality: 'high',
      output_format: 'png'
    };
    const generationResponse = await fetch(TOKEN_AI_GENERATIONS_ENDPOINT, {
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
