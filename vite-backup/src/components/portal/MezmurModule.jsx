import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMusic,
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faVolumeUp,
  faBookOpen,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const MEZMURS = [
  {
    id: 1,
    title: 'Nere’i Kebrere (ነርኢ ክብርከ)',
    category: 'Kidase',
    lyrics: `ነርኢ ክብርከ ከመ ክብር ዘአሐዱ ዋሕድ ለአቡሁ (፫)
መልዓ ጸጋ ወጽድቅ ሰላም ለኪ (፪)

ትርጉም፦
አንድያ ልጅ ከአባቱ ዘንድ እንደሚያገኘው ክብር ያለውን ክብርህን እናያለን፤ ጸጋንና እውነትን የተሞላህ ነህ፤ ሰላም ለአንተ ይሁን።`,
    duration: '4:15',
  },
  {
    id: 2,
    title: 'Tsome Diyaqon (ጾመ ዲያቆን)',
    category: 'Tsome',
    lyrics: `ጾምሂ ትቀድስ ደዌሂ ትፌውስ (፪)
ጾም ማዕዶተ ሰማይ ጾም ሰረገላ ብርሃን (፪)

ትርጉም፦
ጾም ትቀድሳለች፣ በሽታንም ትፈውሳለች። ጾም ወደ ሰማይ መሻገሪያ ናት፤ ጾም የብርሃን ሰረገላ ናት።`,
    duration: '5:30',
  },
  {
    id: 3,
    title: 'Fasika Yenezeh (ትንሣኤከ ያበራ)',
    category: 'Fasika',
    lyrics: `ትንሣኤከ ያበራ ብርሃን ሆነልን (፪)
ኢየሱስ ክርስቶስ ሞትን ድል አድርጎ ተነሣ (፪)

ትርጉም፦
ትንሣኤህ ያበራልን ብርሃን ሆነልን፤ ኢየሱስ ክርስቶስ ሞትን አሸንፎ ተነሥቷል።`,
    duration: '3:45',
  },
  {
    id: 4,
    title: 'Kidus Michael Yele’ul (ቅዱስ ሚካኤል የልዑል)',
    category: 'Kidus Michael',
    lyrics: `ቅዱስ ሚካኤል መልአከ ሰላም (፪)
ሰዓል ለነ ረዳኤ ኵልነ (፪)

ትርጉም፦
የሰላም መልአክ ቅዱስ ሚካኤል ሆይ፤ ለሁላችንም ረዳት ሆንህ ዘንድ ለምነን።`,
    duration: '6:12',
  },
  {
    id: 5,
    title: 'Kidus Gabriel (ቅዱስ ገብርኤል አብሳሪ)',
    category: 'Kidus Gabriel',
    lyrics: `ቅዱስ ገብርኤል አብሳሪው መልአክ (፪)
አብስረነ ሰላመ አብስረነ ቅዱስ (፪)

ትርጉም፦
አብሳሪው መልአክ ቅዱስ ገብርኤል ሆይ፤ ሰላምን አብስረን፤ ቅድስናን አብስረን።`,
    duration: '4:50',
  }
];

export default function MezmurModule() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [playingSong, setPlayingSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(null); // Song object
  const [progress, setProgress] = useState(30);

  const categories = ['All', 'Kidase', 'Tsome', 'Fasika', 'Kidus Michael', 'Kidus Gabriel'];

  const filtered = MEZMURS.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
                          m.lyrics.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || m.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlaySong = (song) => {
    setPlayingSong(song);
    setIsPlaying(true);
    setProgress(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faMusic} className="text-custom-orange" />
            Mezmur Module
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Listen to traditional Tewahedo chants and explore structured hymn lyrics.
          </p>
        </div>
      </div>

      {/* Main View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Songs & Search Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-850 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:max-w-xs">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
              <input
                type="text"
                placeholder="Search songs or lyrics..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-950 border border-gray-850 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>
            
            <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gray-800 border-gray-700 text-white shadow-sm'
                      : 'bg-transparent border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Songs list */}
          <div className="space-y-2">
            {filtered.map(song => (
              <div
                key={song.id}
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                  playingSong?.id === song.id
                    ? 'bg-orange-500/5 border-orange-500/20'
                    : 'bg-gray-900 border-gray-800 hover:border-gray-750'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlaySong(song)}
                    className="w-9 h-9 rounded-full bg-custom-orange hover:bg-orange-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <FontAwesomeIcon icon={playingSong?.id === song.id && isPlaying ? faPause : faPlay} className="text-xs" />
                  </button>
                  <div>
                    <h4 className="font-bold text-white text-sm">{song.title}</h4>
                    <span className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">{song.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{song.duration}</span>
                  <button
                    onClick={() => setShowLyrics(song)}
                    className="px-3 py-1.5 bg-gray-850 hover:bg-gray-800 border border-gray-850 text-gray-300 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Lyrics
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lyrics drawer side card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 min-h-[300px] flex flex-col">
          {showLyrics ? (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-gray-850 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-base">{showLyrics.title}</h3>
                    <p className="text-xs text-orange-400 font-semibold">{showLyrics.category} Lyrics</p>
                  </div>
                  <button onClick={() => setShowLyrics(null)} className="text-gray-400 hover:text-white">
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className="whitespace-pre-line text-sm text-gray-300 leading-relaxed font-serif py-4 max-h-[350px] overflow-y-auto">
                  {showLyrics.lyrics}
                </div>
              </div>
              <button
                onClick={() => handlePlaySong(showLyrics)}
                className="w-full py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Play Hymn Chants
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 p-6">
              <FontAwesomeIcon icon={faBookOpen} size="2x" className="mb-3 opacity-20 text-orange-400" />
              <p className="text-xs">Click the "Lyrics" button on any hymn to load the lyrics text here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Docked Music Player Bar */}
      {playingSong && (
        <div className="bg-gray-900 border-t border-gray-800 fixed bottom-16 md:bottom-0 left-0 right-0 h-20 flex items-center justify-between px-6 z-40 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-custom-orange">
              <FontAwesomeIcon icon={faMusic} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{playingSong.title}</p>
              <p className="text-[10px] text-gray-500 font-semibold uppercase">{playingSong.category}</p>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex flex-col items-center gap-1.5 flex-1 max-w-md mx-6">
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-white transition-colors cursor-pointer"><FontAwesomeIcon icon={faStepBackward} size="sm" /></button>
              <button
                onClick={handleTogglePlay}
                className="w-8 h-8 rounded-full bg-white text-gray-950 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="xs" />
              </button>
              <button className="text-gray-500 hover:text-white transition-colors cursor-pointer"><FontAwesomeIcon icon={faStepForward} size="sm" /></button>
            </div>

            {/* Slider track */}
            <div className="w-full flex items-center gap-2 text-[10px] text-gray-500 font-bold">
              <span>0:45</span>
              <div className="flex-1 h-1 bg-gray-850 rounded-full overflow-hidden relative cursor-pointer">
                <div className="absolute top-0 bottom-0 left-0 bg-custom-orange" style={{ width: `${progress}%` }} />
              </div>
              <span>{playingSong.duration}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="hidden sm:flex items-center gap-2 text-gray-500">
            <FontAwesomeIcon icon={faVolumeUp} size="sm" />
            <div className="w-20 h-1 bg-gray-850 rounded-full overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-0 bg-gray-400" style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
