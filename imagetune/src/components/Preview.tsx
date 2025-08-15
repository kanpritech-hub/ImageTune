'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PreviewProps {
  image: File;
  afterImage: string | null;
}

const Preview = ({ image, afterImage }: PreviewProps) => {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setBeforeImage(objectUrl);

      // Clean up the object URL on component unmount
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  return (
    <div className="space-y-4">
      <div className="bg-gray-700 aspect-video rounded-lg flex items-center justify-center overflow-hidden relative">
        <h3 className="absolute top-4 left-4 text-lg font-bold bg-black bg-opacity-50 px-2 py-1 rounded z-10">Before</h3>
        {beforeImage ? (
          <Image
            src={beforeImage}
            alt="Image before enhancement"
            layout="fill"
            objectFit="contain"
          />
        ) : (
          <p>Loading preview...</p>
        )}
      </div>
       <div className="bg-gray-700 aspect-video rounded-lg flex items-center justify-center overflow-hidden relative">
        <h3 className="absolute top-4 left-4 text-lg font-bold bg-black bg-opacity-50 px-2 py-1 rounded z-10">After</h3>
        {afterImage ? (
          <Image
            src={afterImage}
            alt="Image after enhancement"
            layout="fill"
            objectFit="contain"
          />
        ) : (
          <p>Adjust controls to see preview</p>
        )}
      </div>
    </div>
  );
};

export default Preview;
