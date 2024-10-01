import React from 'react';
import logoImage from '../assets/images/photo_2023-11-28_22-58-13.jpg';
import Navbar from './Navbar';

function Header() {
  return (
    <header className="flex justify-between items-center p-5 mb-5 bg-black bg-opacity-50">
      <div className="flex items-center space-x-4 m-3">
        <img src={logoImage} alt="Logo" className="h-13 w-16 object-cover" />
        <div className="text-1xl font-bold text-white">የደ/ብርሃን ጠባሴ ደ/ሰላም መድኃኔዓለም፣ደ/ም/ ቅ/ሚካኤል፣ደ/ኃ/ቅ/ገብርኤል <br></br>እና አቡነ ተክለ ሃይማኖት አንድነት አብያተ ክርስቲያናት ሰ/ት/ቤት

        </div>
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
