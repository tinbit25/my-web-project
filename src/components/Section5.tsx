'use client';

import React, { useState, useEffect } from 'react';

export default function Section5() {
  const images = [
    { src: '/images/images.jpg', title: 'Bible Study Sessions' },
    {
      src: '/images/depositphotos_188631174-stock-photo-gondar-ethiopia-january-interior-painted.webp',
      title: 'Sunday School Practice',
    },
    { src: '/images/photo_2022-11-01_16-26-07.jpg', title: 'Community Outreach Programs' },
    { src: '/images/photo_2023-10-28_09-58-21.jpg', title: 'Arts and Crafts' },
    { src: '/images/photo_2023-01-21_08-49-02.jpg', title: 'Interactive Religious Lessons' },
  ];

  const [visibleCount, setVisibleCount] = useState(4);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const getVisibleImageCount = () => {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 2;
      return 1;
    };

    setVisibleCount(getVisibleImageCount());

    const handleResize = () => {
      setVisibleCount(getVisibleImageCount());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute visible images with wrap-around cyclic logic
  const visibleImages = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleImages.push(images[(startIndex + i) % images.length]);
  }

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="section5 p-12 bg-white mt-5 mb-10 text-gray-900">
      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute top-1/2 transform -translate-y-1/2 text-gray-800 font-bold text-4xl rounded-full hover:bg-gray-200 w-12 h-12 flex items-center justify-center cursor-pointer z-10"
          style={{ marginLeft: '-2.5rem' }}
        >
          &lt;
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-transform transform duration-500 ease-in-out">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className="pic flex flex-col items-center border border-gray-300 shadow-md p-4 transition-all duration-350 hover:scale-98 hover:brightness-95 bg-gray-50 rounded-xl"
            >
              <div className="text-center w-full">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-sm font-bold mb-2 text-gray-900 h-10 flex items-center justify-center">
                  {image.title}
                </h3>
                <span className="text-blue-600 hover:text-blue-800 text-xs font-semibold">
                  Learn more &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-800 font-bold text-4xl rounded-full hover:bg-gray-200 w-12 h-12 flex items-center justify-center transition-colors z-10 cursor-pointer"
          style={{ marginRight: '-2.5rem' }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
