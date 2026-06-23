'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

interface BackdropProps {
  onClose: () => void;
  children: React.ReactNode;
}

function Backdrop({ onClose, children }: BackdropProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </div>
  );
}

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

const typeColors: Record<string, string> = {
  Feast: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  Exam: 'bg-red-100 text-red-800 border border-red-300',
  Holiday: 'bg-green-100 text-green-800 border border-green-300',
};

interface CalendarModalProps {
  onClose: () => void;
}

export function CalendarModal({ onClose }: CalendarModalProps) {
  return (
    <Backdrop onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-custom-orange text-xl" />
            <div>
              <h2 className="text-white font-bold text-lg">Academic Calendar</h2>
              <p className="text-gray-400 text-sm">ካሌንደር — 2018/2019 E.C.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2 transition-colors cursor-pointer">
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
