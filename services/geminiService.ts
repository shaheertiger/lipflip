import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set in the environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Converts a File object to a Base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the Data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Generates a "lip flip" version of the provided image using Gemini.
 */
export const generateLipFlip = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash-image';
    // Updated prompt for softer, more aesthetically pleasing results
    const prompt = "Professional aesthetic visualization: Render a delicate and hyper-realistic 'lip flip' procedure on the person in this photo. Gently rotate the upper vermilion border outward to create a fuller, softer appearance without adding artificial volume or 'duck lip' projection. Maintain the natural cupid's bow shape. Ensure the lips look hydrated and soft. The goal is a 'your lips but better' natural glow-up. Keep skin texture, lighting, and pore details 100% original. High resolution output.";

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    // Extract the image from the response
    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }

    throw new Error("No image data found in the response.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate lip flip image.");
  }
};