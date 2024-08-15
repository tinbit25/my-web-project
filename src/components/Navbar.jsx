
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="relative">
      {/* Large screen menu */}
      <div className="hidden lg:flex justify-center items-center space-x-6  p-5">
        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="text-white font-bold border border-white rounded py-2 px-3 hover:bg-custom-purple transition-colors duration-300">HOME</a>
          </li>
          <li>
            <a href="#courses" className="text-white font-bold border border-white rounded py-2 px-3 hover:bg-custom-purple transition-colors duration-300">COURSES</a>
          </li>
          <li>
            <a href="#calendar" className="text-white font-bold border border-white rounded py-2 px-3 hover:bg-custom-purple transition-colors duration-300">CALENDAR</a>
          </li>
          <li>
            <a href="#student-portal" className="text-white font-bold border border-white rounded py-2 px-3 hover:bg-custom-purple transition-colors duration-300">STUDENT PORTAL</a>
          </li>
          <li>
            <a href="#contact" className="text-white font-bold border border-white rounded py-2 px-3 hover:bg-custom-purple transition-colors duration-300">CONTACT</a>
          </li>
        </ul>
      </div>

      {/* Small screen menu button */}
      <div className="lg:hidden flex justify-end p-5">
        <button onClick={toggleMenu} className="menu-btn">
          <FontAwesomeIcon icon={faBars} size="2x" className="text-white" />
        </button>
      </div>

      {/* Small screen menu */}
      <div
        className={`fixed top-0 left-0 w-1/2 h-full bg-gray-800 bg-opacity-90 p-6 transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <ul className="space-y-6">
          <li>
            <a href="#home" className="text-white font-bold block border-b border-gray-500 py-2 px-3">HOME</a>
          </li>
          <li>
            <a href="#courses" className="text-white font-bold block border-b border-gray-500 py-2 px-3">COURSES</a>
          </li>
          <li>
            <a href="#calendar" className="text-white font-bold block border-b border-gray-500 py-2 px-3">CALENDAR</a>
          </li>
          <li>
            <a href="#student-portal" className="text-white font-bold block border-b border-gray-500 py-2 px-3">STUDENT PORTAL</a>
          </li>
          <li>
            <a href="#contact" className="text-white font-bold block border-b border-gray-500 py-2 px-3">CONTACT</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
