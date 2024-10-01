import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Hero() {
  return (
    <section className="text-center text-white py-24 px-5 bg-cover bg-center m-3">
      <h1 className="text-4xl mb-5 font-bold text-center">እንኳን ወደ ኢትዮጵያ ኦርቶዶካስ ሰ/ትምህርት ቤት በደህና መጡ</h1>
      {/* <p className="text-xl mb-8">Nurturing young minds in the heart of our community.</p> */}
      <a href="#" className="inline-block border border-white font-bold py-2 px-4 text-white transition-colors duration-300 hover:bg-orange-500 hover:border-orange-500 mb-20">
      ዝርዝር መረጃ <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
      </a>
    </section>
  );
}

export default Hero;
