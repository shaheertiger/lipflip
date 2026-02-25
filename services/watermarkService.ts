/**
 * Adds a repeating diagonal watermark to an image using HTML Canvas.
 * Returns a watermarked image as a data URL.
 */
export function addWatermark(imageDataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Draw the original image
      ctx.drawImage(img, 0, 0);

      // Configure watermark style
      const fontSize = Math.max(24, Math.min(img.width, img.height) * 0.06);
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.lineWidth = 1;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Rotate and tile the watermark diagonally
      const text = 'LIPFLIP PREVIEW';
      const spacingX = fontSize * 12;
      const spacingY = fontSize * 5;

      ctx.save();
      ctx.translate(img.width / 2, img.height / 2);
      ctx.rotate(-Math.PI / 6); // -30 degrees

      const diagonal = Math.sqrt(img.width ** 2 + img.height ** 2);
      const startX = -diagonal;
      const startY = -diagonal;

      for (let y = startY; y < diagonal; y += spacingY) {
        for (let x = startX; x < diagonal; x += spacingX) {
          ctx.fillText(text, x, y);
          ctx.strokeText(text, x, y);
        }
      }
      ctx.restore();

      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.onerror = () => reject(new Error('Failed to load image for watermarking'));
    img.src = imageDataUrl;
  });
}
