import { useState, useEffect } from 'react';

export interface PictureSlideProps {
  images: string[];
  slideInterval: number;
}

const PictureSlide = ({ images, slideInterval }: PictureSlideProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTime = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide < images.length - 1 ? prevSlide + 1 : 0));
    }, slideInterval);

    return () => clearInterval(slideTime);
  }, [images.length, slideInterval]);

  return (
    <div className="picture-slide-container  overflow-hidden w-full max-w-[500px] my-0 mx-auto">
      <div
        className="picture-slide flex transition-transform duration-[1s] delay-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Slide ${index}`}
            className={`image   ${index === currentSlide ? 'active' : ''}}  `}
          />
        ))}
      </div>
    </div>
  );
};

export default PictureSlide;
