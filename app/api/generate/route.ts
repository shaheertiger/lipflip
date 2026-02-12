import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 60;

const API_KEY = process.env.GEMINI_API_KEY;
const MAX_RETRIES = 2;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseGeminiError(error: unknown): { message: string; retryable: boolean; retryAfterMs?: number } {
  const errorStr = error instanceof Error ? error.message : String(error);

  // Quota / billing error (limit: 0 means billing not enabled for image gen)
  if (errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('429') || errorStr.includes('quota')) {
    if (errorStr.includes('limit: 0')) {
      return {
        message: 'Your Gemini API key does not have image generation quota. Please enable billing at https://aistudio.google.com/apikey and ensure your project has the Gemini API enabled with a paid plan.',
        retryable: false,
      };
    }
    // Transient rate limit — extract retry delay if present
    const retryMatch = errorStr.match(/retry(?:Delay)?[:\s"]*(\d+)/i);
    const retryAfterMs = retryMatch ? parseInt(retryMatch[1], 10) * 1000 : 5000;
    return {
      message: 'Rate limited by Gemini API. Retrying...',
      retryable: true,
      retryAfterMs: Math.min(retryAfterMs, 30000),
    };
  }

  // Safety filter
  if (errorStr.includes('SAFETY') || errorStr.includes('blocked')) {
    return {
      message: 'The image was blocked by safety filters. Please try a different photo.',
      retryable: false,
    };
  }

  return { message: errorStr || 'Failed to generate lip flip image.', retryable: false };
}

async function callGemini(ai: GoogleGenAI, base64Image: string, mimeType: string) {
  const prompt =
    "Professional aesthetic visualization: Render a delicate and hyper-realistic 'lip flip' procedure on the person in this photo. Gently rotate the upper vermilion border outward to create a fuller, softer appearance without adding artificial volume or 'duck lip' projection. Maintain the natural cupid's bow shape. Ensure the lips look hydrated and soft. The goal is a 'your lips but better' natural glow-up. Keep skin texture, lighting, and pore details 100% original. High resolution output.";

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    ],
    config: {
      responseModalities: ['IMAGE', 'TEXT'],
    },
  });

  if (response.candidates && response.candidates.length > 0) {
    const parts = response.candidates[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'Server configuration error: API key not set.' },
      { status: 500 }
    );
  }

  try {
    const { base64Image, mimeType } = await request.json();

    if (!base64Image || !mimeType) {
      return NextResponse.json(
        { error: 'Missing required fields: base64Image, mimeType' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    let lastError: unknown = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const imageData = await callGemini(ai, base64Image, mimeType);

        if (imageData) {
          return NextResponse.json({ imageData });
        }

        return NextResponse.json(
          { error: 'No image data found in the response.' },
          { status: 502 }
        );
      } catch (error: unknown) {
        lastError = error;
        const parsed = parseGeminiError(error);

        if (!parsed.retryable || attempt === MAX_RETRIES) {
          console.error(`Gemini API Error (attempt ${attempt + 1}):`, error);
          return NextResponse.json({ error: parsed.message }, { status: 500 });
        }

        console.warn(`Gemini rate limited (attempt ${attempt + 1}), retrying in ${parsed.retryAfterMs}ms...`);
        await sleep(parsed.retryAfterMs!);
      }
    }

    // Should not reach here, but just in case
    const parsed = parseGeminiError(lastError);
    return NextResponse.json({ error: parsed.message }, { status: 500 });
  } catch (error: unknown) {
    let message = 'Failed to generate lip flip image.';
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
