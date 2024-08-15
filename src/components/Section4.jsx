import React from 'react';
import churchImage from '../assets/images/photo_2023-01-21_08-49-02.jpg'; 

function Section4() {
  return (
    <div className="section4 flex flex-col md:flex-row items-center p-6 md:p-12 bg-gray-100">
      <div className="ltnote md:w-1/2 mb-6 md:mb-0 md:pt-4 md:border-t-4 md:border-olivedrab">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Voices of Faith</h2>
        <blockquote className="text-lg text-gray-700">
          <p className="mb-2">"The Sunday school has been a beacon of spiritual growth for my child. The teachings are rooted in tradition and have strengthened our family's bond with the church."</p>
          <cite className="block text-sm text-gray-600">- A Grateful Parent</cite>
        </blockquote>
      </div>
      <div className="img-container md:w-1/2">
        <img src={churchImage} alt="Student Testimonial" className="w-full h-auto rounded-md shadow-md" />
      </div>
    </div>
  );
}

export default Section4;
