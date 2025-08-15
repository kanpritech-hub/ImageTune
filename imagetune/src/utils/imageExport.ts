/**
 * Triggers a browser download for a canvas content.
 * @param canvas The canvas element to download.
 * @param format The desired image format (e.g., 'image/png', 'image/jpeg').
 * @param fileName The name of the file to be downloaded.
 */
export const exportImage = (canvas: HTMLCanvasElement, format: string, fileName: string) => {
  // Get the blob from the canvas
  canvas.toBlob((blob) => {
    if (!blob) {
      console.error('Failed to create blob from canvas.');
      alert('Error: Could not export image.');
      return;
    }

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Append to body, click, and then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the object URL
    URL.revokeObjectURL(url);
  }, format);
};
