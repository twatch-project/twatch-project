import { useState, useEffect } from 'react';

export interface PictureSlideProps {
  images: string[];
  slideInterval: number;
}

const PictureSlide = ({ images, slideInterval }: PictureSlideProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // const nextSlide = () => {
  //   setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  // };

  // useEffect(() => {
  //   const slideTimer = setTimeout(nextSlide, slideInterval);

  //   return () => {
  //     clearTimeout(slideTimer);
  //   };
  // }, [currentSlide, slideInterval]);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      // setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
      setCurrentSlide((prevSlide) => (prevSlide < images.length - 1 ? prevSlide + 1 : 0));
      // setCurrentSlide((prevSlide) => (prevSlide < images.length - 1 ? prevSlide + 1 : 0));
    }, slideInterval);

    return () => clearInterval(slideTimer);
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
            // alt={`Slide ${index + 1}`}
            alt={`Slide ${index}`}
            // className="slide-image w-full h-auto m-[20px] object-cover"
            className={`image object-contain   ${index === currentSlide ? 'active' : ''}}  `}
          />
        ))}
      </div>
    </div>
  );
};

export default PictureSlide;
