'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardCheck,
  faEnvelope,
  faCalendarAlt,
  faComments,
  faPaperPlane,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

interface Message {
  id: number;
  sender: string;
  text: string;
  date: string;
}

interface ParentViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ParentView({ activeTab, setActiveTab }: ParentViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Deacon Yohannes', text: 'Tinbit did exceptionally well on her recent Christology quiz. Keep up the encouragement at home!', date: 'Yesterday' }
  ]);
  const [newMessageText, setNewMessageText] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const msg: Message = {
      id: messages.length + 1,
      sender: 'Parent (Mulugeta Elias)',
      text: newMessageText,
      date: 'Just now',
    };

    setMessages([...messages, msg]);
    setNewMessageText('');
    setMsgSent(true);
    setTimeout(() => setMsgSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      {activeTab === 'dashboard' && (
        <>
          {/* Child Profile summary */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 flex items-center justify-center font-bold text-white text-xl">
                T
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">Tinbit Elias</h3>
                <p className="text-xs text-gray-400 mt-0.5">Enrolled Student · Grade 7 Class</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab('student-progress')}
                className="px-4 py-2 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                View Performance Cards
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 shadow-inner">
                <FontAwesomeIcon icon={faClipboardCheck} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">92%</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Attendance Rate</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-custom-orange shadow-inner">
                <FontAwesomeIcon icon={faComments} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">85%</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Course Exam Average</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-inner">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Hamle 19</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Next Mid-term Exam</p>
              </div>
            </div>
          </div>

          {/* Teacher comments feed */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2 mb-4">
              Teacher Consultations &amp; Comments
            </h3>
            <div className="space-y-4">
              {messages.map(m => (
                <div key={m.id} className="p-4 rounded-xl bg-gray-950 border border-gray-850 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <strong className="text-white">{m.sender}</strong>
                    <span className="text-gray-500 font-bold">{m.date}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Direct message sender */}
            <form onSubmit={handleSendMessage} className="space-y-3 mt-6 pt-6 border-t border-gray-850">
              <h4 className="text-xs font-bold text-white">Send Message to Class Teacher</h4>

              {msgSent && (
                <p className="text-xs text-green-400 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faCheckCircle} /> Message sent to Deacon Yohannes.
                </p>
              )}

              <div className="flex gap-2">
                <input
                  required
                  type="text"
                  placeholder="Ask the teacher about lesson progress, homework, or attendance..."
                  value={newMessageText}
                  onChange={e => setNewMessageText(e.target.value)}
                  className="flex-1 bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <FontAwesomeIcon icon={faPaperPlane} /> Send
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {activeTab === 'student-progress' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-xs text-orange-400 hover:underline cursor-pointer"
          >
            ← Back to Parent Dashboard
          </button>

          <div>
            <h3 className="text-base font-bold text-white">Syllabus Grade Report Card</h3>
            <p className="text-xs text-gray-400 mt-0.5">Academic records for child &quot;Tinbit Elias&quot;.</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-850">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950 text-gray-400 text-xs font-extrabold border-b border-gray-850">
                  <th className="p-4">Syllabus Subject</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Assigned Teacher</th>
                  <th className="p-4 text-center">Score Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850 text-xs">
                <tr className="hover:bg-gray-850 transition-colors">
                  <td className="p-4 text-white font-medium">Dogmatic Theology</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold rounded">
                      Passing
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">Deacon Yohannes</td>
                  <td className="p-4 text-center text-white font-bold">85 / 100</td>
                </tr>
                <tr className="hover:bg-gray-850 transition-colors">
                  <td className="p-4 text-white font-medium">Church History</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold rounded">
                      Passing
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">Deacon Yohannes</td>
                  <td className="p-4 text-center text-white font-bold">92 / 100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
