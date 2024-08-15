import React from 'react';

function Section2() {
  return (
    <div className="my-25 flex flex-col md:flex-row bg-gray-800 p-12 md:p-16 justify-between text-white text-2xl text-center">
  <div className=" font-bold text-4xl">Upcoming Spiritual Gathering</div>
  <div className="p-5 md:w-1/2 md:mr-4">
    <a href="#" className="block border border-white p-8 hover:border-orange-500 hover:text-orange-500">Sunday School Youth Retreat</a>
  </div>
  <div className=" p-5 md:w-1/2 md:ml-4">
    <a href="#" className="block border border-white p-8 hover:border-orange-500 hover:text-orange-500"> Mezmur Workshop</a>
  </div>
</div>

  );
}

export default Section2;
