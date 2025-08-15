'use client';

import { ChangeEvent } from "react";

interface FormatSelectProps {
    onChange: (format: string) => void;
}

const FormatSelect = ({ onChange }: FormatSelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  }

  return (
    <div>
      <label htmlFor="format" className="block text-sm font-medium text-gray-300 mb-2">
        Output Format
      </label>
      <select
        id="format"
        name="format"
        onChange={handleChange}
        className="block w-full bg-gray-600 border border-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-kanpri-blue focus:border-kanpri-blue sm:text-sm"
      >
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/webp">WEBP</option>
        <option value="image/bmp">BMP</option>
      </select>
    </div>
  );
};

export default FormatSelect;
