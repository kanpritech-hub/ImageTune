'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import Upload from './Upload';
import Preview from './Preview';
import Controls, { EnhancementSettings } from './Controls';
import { applyEnhancements } from '@/utils/imageFilters';
import { exportImage } from '@/utils/imageExport';
import { upscaleImage } from '@/utils/imageResize';

const defaultSettings: EnhancementSettings = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  sharpness: 0, // Sharpness will be 0-100
};

const Editor = () => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<EnhancementSettings>(defaultSettings);
  const [outputFormat, setOutputFormat] = useState('image/png');
  const [scale, setScale] = useState(1);

  // This will hold the data URL of the processed image
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/gif', 'image/tiff'];
    if (file && validTypes.includes(file.type)) {
      setImage(file);
      setSettings(defaultSettings); // Reset settings on new image
      setError(null);
    } else {
      setError('Invalid file type. Please upload an image.');
    }
  };

  const handleSettingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const handleDownload = () => {
    if (!image) {
      alert('No image to download.');
      return;
    }

    const imageElement = new Image();
    imageElement.crossOrigin = "anonymous";
    imageElement.src = URL.createObjectURL(image);
    imageElement.onload = () => {
      // Get the canvas with all enhancements applied
      let finalCanvas = applyEnhancements(imageElement, settings);

      // Apply upscaling if the scale factor is greater than 1
      if (scale > 1) {
        finalCanvas = upscaleImage(finalCanvas, scale);
      }

      // Generate a filename
      const originalName = image.name.split('.').slice(0, -1).join('.');
      const fileExtension = outputFormat.split('/')[1];
      const fileName = `${originalName}-tuned.${fileExtension}`;

      // Export the image
      exportImage(finalCanvas, outputFormat, fileName);
    };
    imageElement.onerror = () => {
      alert('Failed to load image for download.');
    }
  };

  useEffect(() => {
    if (!image) return;
    setIsProcessing(true);

    // Use a timeout to allow the UI to update to the processing state before blocking the main thread
    const timer = setTimeout(() => {
      const imageElement = new Image();
      imageElement.crossOrigin = "anonymous";
      imageElement.src = URL.createObjectURL(image);
      imageElement.onload = () => {
        const processedCanvas = applyEnhancements(imageElement, settings);
        setAfterImage(processedCanvas.toDataURL());
        setIsProcessing(false);
      };
      imageElement.onerror = () => {
        setError("Failed to process image.");
        setIsProcessing(false);
      }
    }, 50); // A small delay

    return () => clearTimeout(timer);
  }, [image, settings]);

  return (
    <div className="main-work-area my-12 w-full max-w-7xl px-4">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {!image ? (
        <div className="max-w-xl mx-auto">
          <Upload onImageUpload={handleImageUpload} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Preview image={image} afterImage={afterImage} isProcessing={isProcessing} />
          </div>
          <div>
            <Controls
              settings={settings}
              scale={scale}
              isProcessing={isProcessing}
              onSettingChange={handleSettingChange}
              onDownload={handleDownload}
              onFormatChange={setOutputFormat}
              onScaleChange={setScale}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
