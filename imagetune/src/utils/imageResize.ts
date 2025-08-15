/**
 * Upscales a canvas by a given factor using the browser's built-in scaling algorithm.
 * @param sourceCanvas The original canvas to upscale.
 * @param scaleFactor The factor by which to upscale the image (e.g., 2 for 2x).
 * @returns A new canvas element containing the upscaled image.
 */
export const upscaleImage = (sourceCanvas: HTMLCanvasElement, scaleFactor: number): HTMLCanvasElement => {
  // If scale factor is 1 or less, no upscaling is needed.
  if (scaleFactor <= 1) {
    return sourceCanvas;
  }

  const newWidth = sourceCanvas.width * scaleFactor;
  const newHeight = sourceCanvas.height * scaleFactor;

  const upscaledCanvas = document.createElement('canvas');
  upscaledCanvas.width = newWidth;
  upscaledCanvas.height = newHeight;

  const ctx = upscaledCanvas.getContext('2d');

  if (!ctx) {
    console.error('Failed to get 2D context for the upscaling canvas.');
    // Return the original canvas as a fallback.
    return sourceCanvas;
  }

  // Set the image smoothing quality for better results.
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Draw the source canvas onto the new, larger canvas, which performs the scaling.
  ctx.drawImage(sourceCanvas, 0, 0, newWidth, newHeight);

  return upscaledCanvas;
};
