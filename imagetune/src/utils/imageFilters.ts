import { EnhancementSettings } from "@/components/Controls";

/**
 * Applies a convolution kernel to image data.
 * @param src The source ImageData.
 * @param dst The destination Uint8ClampedArray to write to.
 * @param kernel The convolution kernel (e.g., a 3x3 matrix).
 */
const applyKernel = (src: ImageData, dst: Uint8ClampedArray, kernel: number[]) => {
    const srcData = src.data;
    const width = src.width;
    const height = src.height;
    const side = Math.round(Math.sqrt(kernel.length));
    const halfSide = Math.floor(side / 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;
            for (let cy = 0; cy < side; cy++) {
                for (let cx = 0; cx < side; cx++) {
                    const scy = Math.min(height - 1, Math.max(0, y + cy - halfSide));
                    const scx = Math.min(width - 1, Math.max(0, x + cx - halfSide));

                    const srcOffset = (scy * width + scx) * 4;
                    const wt = kernel[cy * side + cx];

                    r += srcData[srcOffset] * wt;
                    g += srcData[srcOffset + 1] * wt;
                    b += srcData[srcOffset + 2] * wt;
                }
            }
            const dstOffset = (y * width + x) * 4;
            dst[dstOffset] = r;
            dst[dstOffset + 1] = g;
            dst[dstOffset + 2] = b;
            dst[dstOffset + 3] = srcData[dstOffset + 3]; // Keep original alpha
        }
    }
};


export const applyEnhancements = (
  image: HTMLImageElement,
  settings: EnhancementSettings
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    console.error("Canvas context not available");
    return canvas;
  }

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const { brightness, contrast, saturate, sharpness } = settings;

  // Apply CSS filters first
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Now, apply sharpness if needed
  if (sharpness > 0) {
    const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const sharpenedData = new Uint8ClampedArray(originalImageData.data.length);

    const sharpenKernel = [
        0, -1, 0,
       -1,  5, -1,
        0, -1, 0
    ];

    applyKernel(originalImageData, sharpenedData, sharpenKernel);

    // Blend the sharpened image with the original based on the sharpness amount
    const blendAmount = sharpness / 100;
    const blendedData = new Uint8ClampedArray(originalImageData.data.length);

    for (let i = 0; i < originalImageData.data.length; i += 4) {
        // Linear interpolation: blended = original * (1 - alpha) + sharpened * alpha
        blendedData[i] = originalImageData.data[i] * (1 - blendAmount) + sharpenedData[i] * blendAmount;
        blendedData[i + 1] = originalImageData.data[i + 1] * (1 - blendAmount) + sharpenedData[i + 1] * blendAmount;
        blendedData[i + 2] = originalImageData.data[i + 2] * (1 - blendAmount) + sharpenedData[i + 2] * blendAmount;
        blendedData[i + 3] = originalImageData.data[i + 3]; // Alpha
    }

    // Put the blended data back onto the canvas
    ctx.putImageData(new ImageData(blendedData, canvas.width, canvas.height), 0, 0);
  }

  return canvas;
};
