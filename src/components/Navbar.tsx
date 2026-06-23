'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CalendarModal } from './Modals';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinkClass =
    'relative group text-white font-semibold text-base xl:text-lg py-2 px-1 hover:text-custom-orange transition-colors duration-300 cursor-pointer bg-transparent border-0';
  const underline =
    'absolute bottom-0 left-0 w-0 h-0.5 bg-custom-orange transition-all duration-300 group-hover:w-full';
  const mobileLinkClass =
    'text-white font-bold block border-b border-gray-700 pb-2 hover:text-custom-orange transition-colors cursor-pointer bg-transparent border-0 w-full text-left';

  return (
    <>
      <nav className="relative">
        {/* Desktop Menu */}
        <div className="hidden lg:flex justify-center items-center p-3">
          <ul className="flex space-x-4 xl:space-x-8 items-center">
            <li>
              <a href="#home" className={navLinkClass}>
                HOME
                <span className={underline} />
              </a>
            </li>
            <li>
              <a href="#courses" className={navLinkClass}>
                COURSES
                <span className={underline} />
              </a>
            </li>
            <li>
              <button className={navLinkClass} onClick={() => setShowCalendar(true)}>
                CALENDAR
                <span className={underline} />
              </button>
            </li>
            <li>
              <Link href="/login" className={navLinkClass}>
                STUDENT PORTAL
                <span className={underline} />
              </Link>
            </li>
            <li>
              <a href="#about" className={navLinkClass}>
                ABOUT
                <span className={underline} />
              </a>
            </li>
          </ul>
        </div>

        {/* Hamburger Button */}
        <div className="lg:hidden flex justify-end p-5">
          <button onClick={toggleMenu} className="menu-btn cursor-pointer" aria-label="Toggle menu">
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              size="2x"
              className="text-white"
            />
          </button>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 left-0 w-64 h-full z-50 bg-gray-900 bg-opacity-98 p-6 shadow-2xl transition-transform duration-300 transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Close button inside drawer */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>

          <div className="mt-2 mb-6">
            <p className="text-custom-orange font-bold text-lg">Menu</p>
          </div>

          <ul className="space-y-4">
            <li>
              <a href="#home" onClick={toggleMenu} className={mobileLinkClass}>
                HOME
              </a>
            </li>
            <li>
              <a href="#courses" onClick={toggleMenu} className={mobileLinkClass}>
                COURSES
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleMenu();
                  setShowCalendar(true);
                }}
                className={mobileLinkClass}
              >
                CALENDAR
              </button>
            </li>
            <li>
              <Link
                href="/login"
                onClick={toggleMenu}
                className={mobileLinkClass}
              >
                STUDENT PORTAL
              </Link>
            </li>
            <li>
              <a href="#about" onClick={toggleMenu} className={mobileLinkClass}>
                ABOUT
              </a>
            </li>
          </ul>
        </div>

        {/* Overlay to close mobile menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 lg:hidden"
            onClick={toggleMenu}
          />
        )}
      </nav>

      {/* Modals */}
      {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} />}
    </>
  );
}
