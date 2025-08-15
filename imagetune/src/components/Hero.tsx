import UploadButton from "./UploadButton";

const Hero = () => {
  return (
    <section className="hero py-20 text-center">
      <h2 className="text-5xl font-display mb-4">
        Tune Your Images to Perfection
      </h2>
      <p className="text-lg text-gray-400 mb-8">
        Enhance, upscale, and convert your images with the power of AI.
      </p>
      <UploadButton />
    </section>
  );
};

export default Hero;
