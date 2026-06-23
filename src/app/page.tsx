import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Section1 from '@/components/Section1';
import Courses from '@/components/Courses';
import Section3 from '@/components/Section3';
import Section4 from '@/components/Section4';
import Section5 from '@/components/Section5';
import Footer from '@/components/Footer';
import Follow from '@/components/Follow';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debre Berhan Unity Churches Sunday School Portal',
  description:
    'Learning management and information portal for Grades 1-12 of Tsbase Debre Selam Medhanealem, Debre Mehret Kidus Mikael, Debre Hail Kidus Gabriel, and Abune Tekle Haymanot Unity Churches Sunday School.',
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      {/* Hero with background */}
      <div
        id="home"
        className="bg-cover bg-center bg-no-repeat mb-10 w-full"
        style={{ backgroundImage: `url('/images/2054021.webp')` }}
      >
        <Header />
        <Hero />
      </div>

      {/* History & Origins */}
      <div id="about" className="w-full">
        <Section1 />
      </div>

      {/* Course Materials Portal */}
      <div className="w-full">
        <Courses />
      </div>

      {/* Sacred Origins */}
      <div className="w-full">
        <Section3 />
      </div>

      {/* Voices of Faith */}
      <div className="w-full">
        <Section4 />
      </div>

      {/* Gallery / Image Carousel */}
      <div id="gallery" className="w-full">
        <Section5 />
      </div>

      {/* Footer, Follow */}
      <div className="w-full">
        <Footer />
        <Follow />
      </div>
    </div>
  );
}
