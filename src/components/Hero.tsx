import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBookOpen, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
  return (
    <section className="text-center text-white py-20 md:py-32 px-5">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-orange-300 mb-6">
        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
        Ethiopian Orthodox Tewahedo Church — Debre Berhan
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-3 drop-shadow-lg">
        እንኳን ወደ ሰ/ት/ቤት በደህና መጡ
      </h1>
      <p className="text-lg md:text-xl text-orange-300 font-semibold mb-3">
        Welcome to Our Sunday School Portal
      </p>
      <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
        Access Grade 1–12 course materials, liturgical hymns, quizzes, teacher tools, and the full church learning system — all in one place.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <Link
          href="/login"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-7 rounded-xl shadow-xl shadow-orange-900/40 transition-all duration-300 hover:scale-105 text-sm"
        >
          <FontAwesomeIcon icon={faGraduationCap} />
          Enter Student Portal
        </Link>
        <a
          href="#courses"
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white font-bold py-3 px-7 rounded-xl transition-all duration-300 text-sm"
        >
          <FontAwesomeIcon icon={faBookOpen} />
          Browse Course Materials
          <FontAwesomeIcon icon={faChevronRight} className="text-xs opacity-70" />
        </a>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-3 text-xs">
        {['Grade 1–12 Curriculum', 'PDF Study Guides', 'Liturgical Hymns', 'Online Quizzes', 'Church Calendar', 'Student Dashboard'].map((f) => (
          <span key={f} className="bg-black/30 border border-white/15 text-white/80 px-3 py-1.5 rounded-full font-semibold">
            {f}
          </span>
        ))}
      </div>
    </section>
  );
}
