import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Section1() {
  return (
    <div className="my-5 bg-white flex flex-col py-10 px-6 gap-6 md:flex-row md:py-16 md:px-12 md:gap-12">
      <div className="left border-b-4 border-orange-500 pb-6 md:border-r-4 md:border-b-0 md:pb-0 md:pr-12">
        <h2 className="font-bold text-3xl md:text-5xl mb-4 md:mb-10">The History and Origins</h2>
        <p className="text-base text-black text-opacity-75 leading-8 p-7 mb-5 md:text-3xl md:leading-10">
        The Debre Birhan university Sunday school is a vibrant cornerstone of spiritual education, 
        nurturing faith and knowledge through a tradition that has flourished for centuries.
         Deeply rooted in Ethiopia's rich cultural heritage, it serves as a vital link between generations,
         imparting timeless values, scripture, and spiritual wisdom to the youth.</p>

      </div>
      <div className="right flex flex-col justify-between md:items-start ml-20 p-0">
      <h2 className="font-bold text-5xl mb-7 md:mb-0 whitespace-nowrap">Join Us</h2>
<a href="#" className="whitespace-nowrap text-white bg-[#302929] border border-transparent font-bold py-2 px-5 rounded hover:bg-[#ff7200] hover:border-[#ff7200] transition duration-300">
  Discover More <FontAwesomeIcon icon={faChevronRight} />
</a>

      </div>
    </div>
  );
}

export default Section1;
