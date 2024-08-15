import React from 'react';
import churchImage from '../assets/images/photo_2023-02-22_15-44-45.jpg'; 
function Section3() {
  return (
    <div className="section3 flex flex-col md:flex-row items-center p-6 md:p-12 bg-gray-100">
      <div className="relative md:w-1/2">
        <img
          src={churchImage}
          alt="Church Image"
          className="w-full h-auto rounded-md shadow-md mb-10"
        />
      </div>
      <div className="rtnote md:w-1/2 md:ml-8 mt-6 md:mt-0 md:pt-4 md:border-t-4 md:border-olivedrab">
        <h2 className="text-3xl font-bold mb-4">
          The Sacred Origins
        </h2>
        <p className="text-lg text-gray-700">
          The Ethiopian Orthodox Tewahedo Church is steeped in a sacred history that reaches back to the earliest days of Christianity. As one of the oldest Christian denominations in the world, its roots are deeply entwined with the spiritual and cultural identity of Ethiopia. For centuries, the Church has been a beacon of faith, preserving the ancient traditions, liturgies, and teachings that continue to guide the faithful on their spiritual journey.
        </p>
      </div>
    </div>
  );
}

export default Section3;
