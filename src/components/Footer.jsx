import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 lg:py-12 px-4 lg:px-8 border-b-2 border-gray-600">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        <div className="footer-column space-y-4">
          <h3 className="text-lg font-semibold">About</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-white hover:text-orange-500">History</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Saintly Monastics of Jordanville</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Abbots</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Church Life</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Daily Life</a></li>
          </ul>
        </div>
        <div className="footer-column space-y-4">
          <h3 className="text-lg font-semibold">Media</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-white hover:text-orange-500">News</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Virtual Tour</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Photos</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Videos</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Monastery & Seminary Projects</a></li>
          </ul>
        </div>
        <div className="footer-column space-y-4">
          <h3 className="text-lg font-semibold">Visit</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-white hover:text-orange-500">Contact</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Visitor Info</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Directions</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Map of the Monasteries</a></li>
          </ul>
        </div>
        <div className="footer-column space-y-4">
          <h3 className="text-lg font-semibold">Resource</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-white hover:text-orange-500">Questions & Answers</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Parish Directory</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Orthodox Links</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Service Texts</a></li>
          </ul>
        </div>
        <div className="footer-column space-y-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-white hover:text-orange-500">Contact Information</a></li>
            <li><a href="#" className="text-white hover:text-orange-500">Monasteries Driving Direction</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        {/* Example social icons */}
        <a href="#" className="text-white hover:text-orange-500"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="text-white hover:text-orange-500"><i className="fab fa-twitter"></i></a>
        <a href="#" className="text-white hover:text-orange-500"><i className="fab fa-instagram"></i></a>
      </div>
      <p className="text-center mt-6">© 2024 Gbi Gubae</p>
    </footer>
  );
}

export default Footer;
