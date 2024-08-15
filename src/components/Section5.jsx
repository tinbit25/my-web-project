import React, { useState } from 'react';
import churchImage1 from '../assets/images/images.jpg';
import churchImage2 from '../assets/images/depositphotos_188631174-stock-photo-gondar-ethiopia-january-interior-painted.webp';
import churchImage3 from '../assets/images/photo_2022-11-01_16-26-07.jpg'
import churchImage4 from '../assets/images/photo_2023-10-28_09-58-21.jpg'
import churchImage5 from '../assets/images/photo_2023-01-21_08-49-02.jpg'

function Section5() {
  const images = [
    { src: churchImage1, title: "Bible Study Sessions" },
    { src: churchImage2, title: "Sunday School Practice" },
    { src: churchImage3, title: "Community Outreach Programs" },
    { src: churchImage4, title: "Arts and Crafts" },
    { src: churchImage5, title: "Interactive Religious Lessons" },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const getVisibleImageCount = () => {
    if (window.innerWidth >= 1024) return 4; 
    if (window.innerWidth >= 768) return 2; 
    return 1; 
  };

  const visibleImages = images.slice(startIndex, startIndex + getVisibleImageCount());

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - getVisibleImageCount() + images.length) % images.length);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + getVisibleImageCount()) % images.length);
  };

  return (
    <div className="section5 p-12 bg-white mt-5 mb-10">
      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute top-1/2 transform -translate-y-1/2 text-gray-800 font-bold text-4xl rounded-full hover:bg-gray-600"
          style={{ marginLeft: '-2.5rem' }}
        >
          &lt;
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-transform transform duration-500 ease-in-out">
          {visibleImages.map((image, index) => (
            <div key={index} className="pic flex flex-col items-center border border-gray-400 shadow-md p-4 transition-transform transform hover:scale-95 hover:brightness-75">
              <a href="#" className="text-center">
                <img src={image.src} alt={image.title} className="w-full h-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Learn more <i className="fas fa-chevron-right"></i>
                </a>
              </a>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-800 font-bold text-4xl rounded-full hover:bg-gray-600 transition-colors z-10"
          style={{ marginRight: '-2.5rem' }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Section5;
