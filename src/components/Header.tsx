import React from 'react';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="flex flex-col xl:flex-row justify-between items-center p-5 mb-5 bg-black bg-opacity-65 gap-4">
      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 m-3 text-center md:text-left gap-3">
        <img
          src="/images/photo_2023-11-28_22-58-13.jpg"
          alt="Logo"
          className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-lg"
        />
        <div className="text-sm md:text-base font-bold text-white leading-relaxed text-center md:text-left max-w-2xl">
          የደ/ብርሃን ጠባሴ ደ/ሰላም መድኃኔዓለም፣ ደ/ም/ ቅ/ሚካኤል፣ ደ/ኃ/ቅ/ገብርኤል <br className="hidden md:inline" />
          እና አቡነ ተክለ ሃይማኖት አንድነት አብያተ ክርስቲያናት ሰ/ት/ቤት
        </div>
      </div>
      <Navbar />
    </header>
  );
}
