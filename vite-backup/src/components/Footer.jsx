import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { CalendarModal, StudentPortalModal } from './Modals';

function Footer({ onEnterPortal }) {
  const [showCalendar, setShowCalendar] = useState(false);

  const linkClass = 'text-gray-300 hover:text-orange-400 transition-colors text-sm cursor-pointer';
  const btnLinkClass = 'text-gray-300 hover:text-orange-400 transition-colors text-sm cursor-pointer bg-transparent border-0 p-0 text-left';

  return (
    <>
      <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 lg:px-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand Column */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold text-white">Gbi Gubae</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sunday School of the Ethiopian Orthodox Tewahedo Church, Debre Berhan — nurturing faith and knowledge for future generations.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"
                className="text-gray-400 hover:text-blue-500 transition-colors text-2xl">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram"
                className="text-gray-400 hover:text-blue-400 transition-colors text-2xl">
                <FontAwesomeIcon icon={faTelegram} />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"
                className="text-gray-400 hover:text-red-500 transition-colors text-2xl">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"
                className="text-gray-400 hover:text-pink-500 transition-colors text-2xl">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className={linkClass}>Home</a></li>
              <li><a href="#courses" className={linkClass}>Course Materials</a></li>
              <li><button onClick={() => setShowCalendar(true)} className={btnLinkClass}>Academic Calendar</button></li>
              <li><button onClick={onEnterPortal} className={btnLinkClass}>Student Portal</button></li>
              <li><a href="#about" className={linkClass}>About Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white border-b border-gray-700 pb-2">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#courses" className={linkClass}>PDF Study Guides</a></li>
              <li><a href="#courses" className={linkClass}>Theology Materials</a></li>
              <li><a href="#courses" className={linkClass}>Scripture Studies</a></li>
              <li><a href="#courses" className={linkClass}>Liturgy & Mezmur</a></li>
              <li><a href="#gallery" className={linkClass}>Photo Gallery</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white border-b border-gray-700 pb-2">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">📍 Debre Berhan, Ethiopia</li>
              <li>
                <a href="mailto:info@gbigubae.et" className={linkClass}>
                  ✉️ info@gbigubae.et
                </a>
              </li>
              <li>
                <a href="tel:+251111234567" className={linkClass}>
                  📞 +251 111 234 567
                </a>
              </li>
              <li>
                <a href="https://t.me/gbigubae" target="_blank" rel="noreferrer" className={linkClass}>
                  💬 Telegram Channel
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-screen-xl mx-auto border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Gbi Gubae — Ethiopian Orthodox Tewahedo Church Sunday School</p>
          <p className="text-gray-600 text-xs">Built with ❤️ for the community</p>
        </div>
      </footer>

      {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} />}
    </>
  );
}

export default Footer;
