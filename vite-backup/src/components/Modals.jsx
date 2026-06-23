import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCalendarAlt,
  faUser,
  faLock,
  faGraduationCap,
  faBook,
  faCheckCircle,
  faStar,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

/* ── Shared backdrop ───────────────────────────────── */
function Backdrop({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>
  );
}

/* ── Calendar Modal ────────────────────────────────── */
const CALENDAR_EVENTS = [
  { date: 'Sene 26 (Jul 3)', type: 'Feast', label: 'ጥምቀተ ጸሐይ (Tsom)' },
  { date: 'Hamle 19 (Jul 26)', type: 'Exam', label: 'Mid-Term Exams — All Grades' },
  { date: 'Nehasse 1 (Aug 7)', type: 'Feast', label: 'ቅዱስ ሩፋኤል (St. Rufael)' },
  { date: 'Nehasse 16 (Aug 22)', type: 'Feast', label: 'ቅዱስ ሚካኤል (St. Michael)' },
  { date: 'Meskerem 1 (Sep 11)', type: 'Holiday', label: 'Ethiopian New Year — ዕንቁጣጣሽ' },
  { date: 'Meskerem 17 (Sep 27)', type: 'Feast', label: 'Meskel (Finding of the True Cross)' },
  { date: 'Tikimt 10 (Oct 20)', type: 'Exam', label: 'Final Exams — All Grades' },
  { date: 'Hidar 21 (Nov 30)', type: 'Feast', label: 'ቅዱስ ኪዳነ ምሕረት (Kidane Mihret)' },
  { date: 'Tahsas 29 (Jan 7)', type: 'Feast', label: 'Christmas — ጌና (Genna)' },
  { date: 'Tir 11 (Jan 19)', type: 'Feast', label: 'Timkat — ጥምቀት (Epiphany)' },
];

const typeColors = {
  Feast: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  Exam: 'bg-red-100 text-red-800 border border-red-300',
  Holiday: 'bg-green-100 text-green-800 border border-green-300',
};

export function CalendarModal({ onClose }) {
  return (
    <Backdrop onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-custom-orange text-xl" />
            <div>
              <h2 className="text-white font-bold text-lg">Academic Calendar</h2>
              <p className="text-gray-400 text-sm">ካሌንደር — 2016/2017 E.C.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2 transition-colors">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Event List */}
        <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
          {CALENDAR_EVENTS.map((ev, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="text-center w-24 flex-shrink-0">
                <p className="text-xs font-bold text-gray-500">{ev.date.split('(')[0].trim()}</p>
                <p className="text-xs text-gray-400">{ev.date.match(/\((.+)\)/)?.[1]}</p>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-sm font-medium">{ev.label}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${typeColors[ev.type]}`}>
                {ev.type}
              </span>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t text-xs text-gray-400 text-center flex-shrink-0">
          All dates follow the Ethiopian Orthodox liturgical calendar.
        </div>
      </div>
    </Backdrop>
  );
}

/* ── Student Portal Modal ──────────────────────────── */
const MOCK_STUDENT = {
  name: 'Tinbit Elias',
  grade: 'Grade 5',
  id: 'SS-2024-0198',
  courses: [
    { title: 'Dogmatic Theology', progress: 72 },
    { title: 'Church History', progress: 55 },
    { title: 'Old Testament Studies', progress: 88 },
  ],
  attendance: 92,
  nextExam: 'July 26, 2025',
};

function Dashboard({ onClose }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-custom-orange flex items-center justify-center text-white font-bold text-lg">
            {MOCK_STUDENT.name[0]}
          </div>
          <div>
            <p className="text-white font-bold">{MOCK_STUDENT.name}</p>
            <p className="text-gray-400 text-xs">{MOCK_STUDENT.grade} · {MOCK_STUDENT.id}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white p-2 transition-colors">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 p-6 space-y-5">
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
            <p className="text-3xl font-bold text-blue-700">{MOCK_STUDENT.attendance}%</p>
            <p className="text-xs text-blue-500 mt-1">Attendance Rate</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
            <div className="flex items-center justify-center gap-1 mb-1">
              <FontAwesomeIcon icon={faBell} className="text-orange-500" />
            </div>
            <p className="text-xs font-semibold text-orange-700">Next Exam</p>
            <p className="text-xs text-orange-500 mt-0.5">{MOCK_STUDENT.nextExam}</p>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div>
          <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
            <FontAwesomeIcon icon={faBook} className="text-custom-orange" />
            Enrolled Courses
          </h3>
          <ul className="space-y-3">
            {MOCK_STUDENT.courses.map((c, i) => (
              <li key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-800">{c.title}</span>
                  <span className="text-xs font-bold text-gray-500">{c.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-custom-orange h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
            Achievements
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Perfect Attendance', 'Top Scorer - OT Studies', 'Scripture Memorization'].map((ach, i) => (
              <span key={i} className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <FontAwesomeIcon icon={faCheckCircle} className="text-yellow-500" />
                {ach}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.trim() && pass.trim()) {
      onLogin();
    } else {
      setError('Please enter your Student ID and Password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Student ID</label>
        <div className="relative">
          <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            value={id}
            onChange={e => setId(e.target.value)}
            type="text"
            placeholder="e.g. SS-2024-0198"
            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-custom-orange"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
        <div className="relative">
          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            value={pass}
            onChange={e => setPass(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-custom-orange"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <p className="text-xs text-gray-400">Hint: enter any text to continue demo</p>
      <button
        type="submit"
        className="w-full bg-gray-900 hover:bg-custom-orange text-white font-bold py-2.5 rounded-lg transition-colors duration-300"
      >
        Sign In
      </button>
    </form>
  );
}

export function StudentPortalModal({ onClose }) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Backdrop onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {!loggedIn ? (
          <>
            {/* Login Header */}
            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faGraduationCap} className="text-custom-orange text-xl" />
                <div>
                  <h2 className="text-white font-bold text-lg">Student Portal</h2>
                  <p className="text-gray-400 text-sm">የተማሪ ፖርታል — Sign in to continue</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white p-2 transition-colors">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <LoginForm onLogin={() => setLoggedIn(true)} />
          </>
        ) : (
          <Dashboard onClose={onClose} />
        )}
      </div>
    </Backdrop>
  );
}
