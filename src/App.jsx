import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import Footer from './components/Footer';
import Follow from './components/Follow';
import bgImage from './assets/images/2054021.webp'; 
const App = () => {
  return (
    <div>
      
      <div
        className="bg-cover bg-center bg-no-repeat mb-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Header />
        <Hero />
      </div>

      {/* Sections without the background image */}
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Footer />
      <Follow />
    </div>
  );
}

export default App;
