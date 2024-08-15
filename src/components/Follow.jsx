import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Follow() {
  return (
    <section className="bg-gray-800 py-10 px-4 flex justify-end items-center gap-4">
      <p className="text-white text-lg font-semibold mr-4">FOLLOW US</p>
      <a href="https://facebook.com" className="text-white hover:text-blue-600 transition-colors">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href="https://twitter.com" className="text-white hover:text-blue-400 transition-colors">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a href="https://instagram.com" className="text-white hover:text-pink-500 transition-colors">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </section>
  );
}

export default Follow;
