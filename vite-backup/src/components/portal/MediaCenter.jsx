import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVideo,
  faPlay,
  faVolumeUp,
  faImages,
  faMicrophone,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import imgGraduation from '../../assets/images/photo_2023-11-28_22-58-13.jpg';
import imgGathering from '../../assets/images/photo_2023-10-28_09-58-21.jpg';
import imgFeast from '../../assets/images/photo_2023-02-22_15-44-45.jpg';

const VIDEOS = [
  {
    id: 1,
    title: 'The Divine Mysteries (Qidase Explanation)',
    speaker: 'Aba G/Mariam',
    duration: '45 mins',
    category: 'Doctrine',
    url: '#',
  },
  {
    id: 2,
    title: 'Liturgical History of Saint Yared',
    speaker: 'Leke Mezmuran Kassa',
    duration: '32 mins',
    category: 'History',
    url: '#',
  }
];

const AUDIOS = [
  {
    id: 1,
    title: 'Sermon: The Covenant of Mercy (Kidane Mihret)',
    speaker: 'Mergia Hailu',
    duration: '24:12',
    date: 'Hamle 16',
  },
  {
    id: 2,
    title: 'Fast of the Apostles - Spiritual Significance',
    speaker: 'Kesis Welde Semayat',
    duration: '18:50',
    date: 'Sene 20',
  }
];

const PHOTOS = [
  {
    url: imgGraduation,
    title: 'Sunday School Annual Graduation Ceremony',
    description: 'Celebrating our graduates finishing Grade 12 study curricula.',
  },
  {
    url: imgGathering,
    title: 'Spiritual Gathering & Hymn Workshop',
    description: 'Choir practice and vocal techniques for Sunday Liturgy.',
  },
  {
    url: imgFeast,
    title: 'Feast of Saint Michael Liturgical Celebration',
    description: 'Liturgical responses and procession at Debre Berhan Parish.',
  }
];

export default function MediaCenter() {
  const [activeTab, setActiveTab] = useState('video');
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = () => {
    setActiveSlide(prev => (prev + 1) % PHOTOS.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  };

  return (
    <div className="space-y-6">
      {/* Media Center Header */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faVideo} className="text-custom-orange" />
            Media Center
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Browse videos, listen to recorded audio teachings, and view parish photos.
          </p>
        </div>

        {/* Media Selector Tabs */}
        <div className="flex bg-gray-950 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'video' ? 'bg-custom-orange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FontAwesomeIcon icon={faVideo} className="mr-1.5" /> Video Teachings
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'audio' ? 'bg-custom-orange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FontAwesomeIcon icon={faMicrophone} className="mr-1.5" /> Audio Sermons
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'photos' ? 'bg-custom-orange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FontAwesomeIcon icon={faImages} className="mr-1.5" /> Photo Galleries
          </button>
        </div>
      </div>

      {activeTab === 'video' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIDEOS.map(v => (
            <div key={v.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden group">
              {/* Mock Video Player Box */}
              <div className="aspect-video bg-gray-950 relative flex items-center justify-center border-b border-gray-800">
                <div className="w-14 h-14 rounded-full bg-custom-orange/10 text-custom-orange border border-custom-orange/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <FontAwesomeIcon icon={faPlay} size="lg" />
                </div>
                <span className="absolute bottom-3 right-3 text-[10px] bg-black bg-opacity-70 px-2 py-1 rounded text-gray-300 font-bold">
                  {v.duration}
                </span>
              </div>
              <div className="p-5">
                <span className="text-[9px] uppercase font-bold px-2 py-0.5 bg-gray-800 text-gray-400 rounded-md border border-gray-750">
                  {v.category}
                </span>
                <h4 className="font-bold text-white text-base mt-2.5">{v.title}</h4>
                <p className="text-xs text-gray-400 mt-1">Speaker: {v.speaker}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'audio' && (
        <div className="space-y-3">
          {AUDIOS.map(a => (
            <div
              key={a.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-gray-750 transition-colors"
            >
              <div className="flex items-center gap-3">
                <button className="w-9 h-9 rounded-full bg-custom-orange hover:bg-orange-600 text-white flex items-center justify-center transition-colors cursor-pointer">
                  <FontAwesomeIcon icon={faPlay} className="text-xs" />
                </button>
                <div>
                  <h4 className="font-bold text-white text-sm">{a.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Speaker: {a.speaker} · Released {a.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{a.duration}</span>
                <FontAwesomeIcon icon={faVolumeUp} className="text-gray-600 text-sm hidden sm:inline" />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'photos' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-gray-800 aspect-[16/10]">
            <img
              src={PHOTOS[activeSlide].url}
              alt={PHOTOS[activeSlide].title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {/* Slider Navigation overlays */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-65 hover:bg-opacity-80 text-white flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-65 hover:bg-opacity-80 text-white flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="text-center mt-5 max-w-xl">
            <h4 className="text-white font-bold text-lg">{PHOTOS[activeSlide].title}</h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{PHOTOS[activeSlide].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
