import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 60;

const API_KEY = process.env.GOOGLE_API_KEY;

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
    const model = 'gemini-2.5-flash-image';
    const prompt =
      "Professional aesthetic visualization: Render a delicate and hyper-realistic 'lip flip' procedure on the person in this photo. Gently rotate the upper vermilion border outward to create a fuller, softer appearance without adding artificial volume or 'duck lip' projection. Maintain the natural cupid's bow shape. Ensure the lips look hydrated and soft. The goal is a 'your lips but better' natural glow-up. Keep skin texture, lighting, and pore details 100% original. High resolution output.";

    const response = await ai.models.generateContent({
      model,
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
            return NextResponse.json({ imageData: part.inlineData.data });
          }
        }
      }
    }

    return NextResponse.json(
      { error: 'No image data found in the response.' },
      { status: 502 }
    );
  } catch (error: unknown) {
    let message = 'Failed to generate lip flip image.';
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'object' && error !== null) {
      message = JSON.stringify(error);
    } else if (typeof error === 'string') {
      message = error;
    }
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
