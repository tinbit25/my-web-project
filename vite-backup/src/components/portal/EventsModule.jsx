import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faUsers,
  faTimes,
  faCheckCircle,
  faChurch,
  faStar,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const EVENTS = [
  {
    id: 1,
    title: 'Spiritual Retreat — Sene 26',
    amharic: 'መንፈሳዊ ጉዞ — ሰኔ ፳፮',
    category: 'Retreat',
    date: 'Sene 26 (July 3, 2026)',
    location: 'Debre Berhan Mountains',
    capacity: 60,
    registered: 38,
    description: 'Annual spiritual youth retreat for all Sunday School students. A three-day program of prayer, fasting, and community building in the highlands.',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Mezmur Vocal Competition',
    amharic: 'የዜማ ውድድር',
    category: 'Competition',
    date: 'Hamle 8 (July 15, 2026)',
    location: 'Main Church Hall',
    capacity: 200,
    registered: 122,
    description: 'Inter-grade Mezmur chant and vocal competition. Students from Grades 5–12 compete in Kidase, Tsome, and Fasika categories.',
    color: 'orange',
  },
  {
    id: 3,
    title: 'Annual Sunday School Graduation',
    amharic: 'ዓመታዊ ምረቃ',
    category: 'Graduation',
    date: 'Nehasse 12 (Aug 18, 2026)',
    location: 'Parish Main Compound',
    capacity: 500,
    registered: 287,
    description: 'Celebration ceremony honouring students completing Grade 12. Certificate presentations, liturgical processions, and cultural festivities.',
    color: 'purple',
  },
  {
    id: 4,
    title: 'Mahlet — Holy Virgin Mary Feast',
    amharic: 'ማኅሌት — ሚያዚያ ፳፩',
    category: 'Mahlet',
    date: 'Miyazia 21 (Apr 29, 2027)',
    location: 'Debre Berhan Maryam Church',
    capacity: 300,
    registered: 64,
    description: 'Overnight Mahlet vigil in honour of the Blessed Virgin Mary. Features choral liturgical hymns, scripture readings, and dawn Qidase.',
    color: 'yellow',
  },
  {
    id: 5,
    title: 'Teachers Professional Development Day',
    amharic: 'የአስተማሪዎች ልማት ቀን',
    category: 'Training',
    date: 'Tikimt 2 (Oct 12, 2026)',
    location: 'Sunday School Administrative Hall',
    capacity: 40,
    registered: 15,
    description: 'Pedagogical training day for all Sunday School teachers covering modern teaching methodologies, curriculum updates, and student welfare.',
    color: 'green',
  },
];

const CATEGORY_COLORS = {
  Retreat:    { bg: 'bg-blue-500/10',   border: 'border-blue-500/30',   text: 'text-blue-400',   badge: 'bg-blue-500/20 text-blue-300' },
  Competition:{ bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300' },
  Graduation: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300' },
  Mahlet:     { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-300' },
  Training:   { bg: 'bg-green-500/10',  border: 'border-green-500/30',  text: 'text-green-400',  badge: 'bg-green-500/20 text-green-300' },
};

export default function EventsModule() {
  const [filter, setFilter] = useState('All');
  const [registering, setRegistering] = useState(null); // event object
  const [regName, setRegName] = useState('');
  const [regGrade, setRegGrade] = useState('Grade 7');
  const [regDone, setRegDone] = useState(false);
  const [events, setEvents] = useState(EVENTS);

  const categories = ['All', ...new Set(EVENTS.map(e => e.category))];

  const filtered = filter === 'All' ? events : events.filter(e => e.category === filter);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName.trim()) return;

    // Increment registered count
    setEvents(prev => prev.map(ev =>
      ev.id === registering.id ? { ...ev, registered: ev.registered + 1 } : ev
    ));
    setRegDone(true);
  };

  const closeModal = () => {
    setRegistering(null);
    setRegName('');
    setRegGrade('Grade 7');
    setRegDone(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-custom-orange" />
            Events & Activities
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Retreats, Competitions, Mahlet vigils, and Graduations — register for upcoming events.
          </p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                filter === cat
                  ? 'bg-custom-orange border-transparent text-white shadow-md'
                  : 'bg-transparent border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(ev => {
          const colors = CATEGORY_COLORS[ev.category] || CATEGORY_COLORS.Retreat;
          const pct = Math.round((ev.registered / ev.capacity) * 100);
          const spotsLeft = ev.capacity - ev.registered;

          return (
            <div
              key={ev.id}
              className={`bg-gray-900 border ${colors.border} rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg transition-all group`}
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                  <FontAwesomeIcon icon={faChurch} className={colors.text} size="lg" />
                </div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${colors.badge}`}>
                  {ev.category}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-1.5 flex-1">
                <h3 className={`font-bold text-white text-base leading-snug group-hover:${colors.text} transition-colors`}>
                  {ev.title}
                </h3>
                <p className={`text-xs font-medium ${colors.text}`}>{ev.amharic}</p>
                <p className="text-gray-400 text-xs leading-relaxed mt-2">{ev.description}</p>
              </div>

              {/* Meta */}
              <div className="space-y-2 text-xs text-gray-400 border-t border-gray-850 pt-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-600 w-4" />
                  <span>{ev.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600 w-4" />
                  <span>{ev.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUsers} className="text-gray-600 w-4" />
                  <span>{ev.registered} / {ev.capacity} registered</span>
                </div>
              </div>

              {/* Capacity bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-gray-850 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      pct >= 90 ? 'bg-red-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span className={pct >= 90 ? 'text-red-400' : 'text-gray-500'}>
                    {pct >= 90 ? 'Almost Full!' : `${spotsLeft} spots left`}
                  </span>
                  <span className="text-gray-600">{pct}% filled</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setRegistering(ev)}
                disabled={spotsLeft <= 0}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  spotsLeft <= 0
                    ? 'bg-gray-850 text-gray-600 cursor-not-allowed border border-gray-800'
                    : `${colors.bg} ${colors.text} border ${colors.border} hover:brightness-125`
                }`}
              >
                {spotsLeft <= 0 ? 'Event Full' : (
                  <>Register for Event <FontAwesomeIcon icon={faArrowRight} className="text-xs" /></>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Registration Modal */}
      {registering && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-gray-850 px-6 py-4 border-b border-gray-800 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-white font-bold text-base">{registering.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-custom-orange" />
                  {registering.date}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors mt-0.5 cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {regDone ? (
              /* Success screen */
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 text-3xl mx-auto">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <h4 className="text-white font-bold text-lg">Registration Confirmed!</h4>
                <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                  <strong className="text-white">{regName}</strong> has been registered for <strong className="text-white">{registering.title}</strong>. You will receive a notification reminder before the event.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Registration form */
              <form onSubmit={handleRegister} className="p-6 space-y-5">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your full name"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">Grade Level</label>
                    <select
                      value={regGrade}
                      onChange={e => setRegGrade(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                    >
                      {[5,6,7,8,9,10,11,12].map(g => (
                        <option key={g} value={`Grade ${g}`}>Grade {g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">Role</label>
                    <select className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange">
                      <option>Student</option>
                      <option>Teacher</option>
                      <option>Parent</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-950 border border-gray-850 rounded-xl p-4 text-xs space-y-1.5">
                  <div className="flex justify-between text-gray-400">
                    <span>Location</span>
                    <span className="text-white font-semibold">{registering.location}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Spots Remaining</span>
                    <span className="text-green-400 font-semibold">{registering.capacity - registering.registered}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                >
                  Confirm My Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
