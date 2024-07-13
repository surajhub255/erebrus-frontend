import React from 'react';


const images = [
  { src: '/loop1.png', name: 'Image 1', height: 120, width: 100 },
  { src: '/loop2.png', name: 'Image 2', height: 100, width: 150 },
  { src: '/loop3.png', name: 'Image 3', height: 130, width: 150 },
  { src: '/loop4.png', name: 'Image 4', height: 110, width: 150 },
  { src: '/loop5.png', name: 'Image 5', height: 90, width: 200 },
  { src: '/loop6.png', name: 'Image 6', height: 120, width: 200 },
  { src: '/loop7.png', name: 'Image 7', height: 100, width: 150 },
  { src: '/loop8.png', name: 'Image 8', height: 130, width: 100 },
  { src: '/loop9.png', name: 'Image 9', height: 110, width: 100 },
  { src: '/loop10.png', name: 'Image 10', height: 90, width: 100 }
];

const Carousel = () => {
  return (
    <div className="slider1">
      <div className="slide-track">
        {images.concat(images).map((image, index) => (
          <div className="slide1" key={index}>
            <img 
              src={image.src} 
              height={image.height} 
              width={image.width} 
              alt={image.name} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;