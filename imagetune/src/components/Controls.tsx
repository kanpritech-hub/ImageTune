'use client';

import { ChangeEvent } from 'react';
import FormatSelect from "./FormatSelect";
import DownloadButton from "./DownloadButton";

// A simple reusable slider component
const Slider = ({ name, label, value, onChange }: { name: string; label: string; value: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void; }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <input
      type="range"
      id={name}
      name={name}
      min="0"
      max="200"
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-kanpri-cyan"
    />
  </div>
);

// This is a placeholder type. It will be defined more robustly later.
export type EnhancementSettings = {
    brightness: number;
    contrast: number;
    saturate: number;
    sharpness: number;
};

interface ControlsProps {
    settings: EnhancementSettings;
    scale: number;
    onSettingChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onDownload: () => void;
    onFormatChange: (format: string) => void;
    onScaleChange: (scale: number) => void;
}

const UpscaleSelect = ({ onChange }: { onChange: (e: ChangeEvent<HTMLSelectElement>) => void }) => (
    <div>
        <label htmlFor="scale" className="block text-sm font-medium text-gray-300 mb-2">
            Resolution Upscale
        </label>
        <select
            id="scale"
            name="scale"
            onChange={onChange}
            className="block w-full bg-gray-600 border border-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-kanpri-blue focus:border-kanpri-blue sm:text-sm"
        >
            <option value="1">1x (Original)</option>
            <option value="2">2x</option>
            <option value="4">4x</option>
        </select>
    </div>
);

const Controls = ({ settings, scale, onSettingChange, onDownload, onFormatChange, onScaleChange }: ControlsProps) => {
    const handleScaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onScaleChange(parseInt(e.target.value, 10));
    }

    return (
        <div className="p-8 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-display mb-6 text-center">Controls</h3>
            <div className="space-y-6">
                <Slider name="brightness" label="Brightness" value={settings.brightness} onChange={onSettingChange} />
                <Slider name="contrast" label="Contrast" value={settings.contrast} onChange={onSettingChange} />
                <Slider name="saturate" label="Saturation" value={settings.saturate} onChange={onSettingChange} />
                <Slider name="sharpness" label="Sharpness" value={settings.sharpness} onChange={onSettingChange} />

                <div className="pt-6 border-t border-gray-700 space-y-6">
                    <UpscaleSelect onChange={handleScaleChange} />
                    <FormatSelect onChange={onFormatChange} />
                </div>

                <div className="pt-6">
                    <DownloadButton onClick={onDownload} />
                </div>
            </div>
        </div>
    );
};

export default Controls;
