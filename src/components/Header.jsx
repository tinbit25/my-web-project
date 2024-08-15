import React from 'react';
import logoImage from '../assets/images/photo_2023-11-28_22-58-13.jpg';
import Navbar from './Navbar';

function Header() {
  return (
    <header className="flex justify-between items-center p-5 mb-5 bg-black bg-opacity-50">
      <div className="flex items-center space-x-4 m-3">
        <img src={logoImage} alt="Logo" className="h-13 w-16 object-cover" />
        <div className="text-3xl font-bold text-white">የደብረ ብርሀን ግቢ ጉባኤ</div>
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
