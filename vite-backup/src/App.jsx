import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Section1 from './components/Section1';
import Section3 from './components/Section3';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import Courses from './components/Courses';
import Footer from './components/Footer';
import Follow from './components/Follow';
import PortalLayout from './components/portal/PortalLayout';
import LoginScreen from './components/portal/LoginScreen';
import bgImage from './assets/images/2054021.webp';

const App = () => {
  const [view, setView] = useState('website');   // 'website' | 'login' | 'portal'
  const [portalRole, setPortalRole] = useState('student');

  const handleEnterPortal = () => setView('login');

  const handleLogin = (role) => {
    setPortalRole(role);
    setView('portal');
  };

  if (view === 'portal') {
    return (
      <PortalLayout
        initialRole={portalRole}
        onExit={() => setView('website')}
      />
    );
  }


  return (
    <div>
      {/* Hero with background */}
      <div
        id="home"
        className="bg-cover bg-center bg-no-repeat mb-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Header onEnterPortal={handleEnterPortal} />
        <Hero onEnterPortal={handleEnterPortal} />
      </div>

      {/* History & Origins */}
      <div id="about">
        <Section1 />
      </div>

      {/* Course Materials Portal */}
      <Courses />

      {/* Sacred Origins */}
      <Section3 />

      {/* Voices of Faith */}
      <Section4 />

      {/* Gallery / Image Carousel */}
      <div id="gallery">
        <Section5 />
      </div>

      {/* Footer, Follow */}
      <Footer onEnterPortal={handleEnterPortal} />
      <Follow />

      {/* Login Screen Overlay */}
      {view === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onClose={() => setView('website')}
        />
      )}
    </div>
  );
};

export default App;

