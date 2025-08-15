'use client';

interface DownloadButtonProps {
    onClick: () => void;
}

const DownloadButton = ({ onClick }: DownloadButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-kanpri-blue to-kanpri-cyan text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      Download Image
    </button>
  );
};

export default DownloadButton;
