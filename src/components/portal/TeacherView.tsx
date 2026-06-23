'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList,
  faBookOpen,
  faPlus,
  faUser,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

const STUDENTS_MOCK = [
  { id: 'S1', name: 'Tinbit Elias' },
  { id: 'S2', name: 'Ephrem Samuel' },
  { id: 'S3', name: 'Ayalew Kassahun' },
  { id: 'S4', name: 'Saba Tilahun' },
  { id: 'S5', name: 'Martha Desta' },
];

interface TeacherViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TeacherView({ activeTab }: TeacherViewProps) {
  const [attendance, setAttendance] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('teacher_attendance');
      if (saved) return JSON.parse(saved);
    }
    return STUDENTS_MOCK.reduce((acc, student) => {
      acc[student.id] = 'present';
      return acc;
    }, {} as Record<string, string>);
  });

  const [studentsMarks, setStudentsMarks] = useState([
    { id: 'S1', name: 'Tinbit Elias', theology: 85, history: 92 },
    { id: 'S2', name: 'Ephrem Samuel', theology: 78, history: 80 },
    { id: 'S3', name: 'Ayalew Kassahun', theology: 90, history: 88 },
  ]);

  // Upload lessons state
  const [uploadGrade, setUploadGrade] = useState('7');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadFile, setUploadFile] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  // Quiz builder state
  const [quizTitle, setQuizTitle] = useState('');
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizType, setQuizType] = useState('mc');
  const [quizMessage, setQuizMessage] = useState('');

  const handleSaveAttendance = () => {
    localStorage.setItem('teacher_attendance', JSON.stringify(attendance));
    alert('Weekly Attendance saved successfully!');
  };

  const handleMarkGrade = (studentId: string, course: 'theology' | 'history', mark: string) => {
    setStudentsMarks((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return { ...s, [course]: parseInt(mark, 10) || 0 };
        }
        return s;
      })
    );
  };

  const handleUploadLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;
    setUploadMessage(`Successfully uploaded lesson "${uploadTitle}" to Grade ${uploadGrade}!`);
    setUploadTitle('');
    setUploadFile('');
    setTimeout(() => setUploadMessage(''), 3000);
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTitle.trim() || !quizQuestion.trim()) return;
    setQuizMessage(`Successfully added quiz "${quizTitle}" with your custom questions!`);
    setQuizTitle('');
    setQuizQuestion('');
    setTimeout(() => setQuizMessage(''), 3050);
  };

  return (
    <div className="space-y-6 text-gray-100">
      {activeTab === 'dashboard' && (
        <>
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <FontAwesomeIcon icon={faUser} size="lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">24</h3>
                <p className="text-xs text-gray-400 mt-0.5">Active Students</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                <FontAwesomeIcon icon={faClipboardList} size="lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">92%</h3>
                <p className="text-xs text-gray-400 mt-0.5">Average Attendance</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-custom-orange">
                <FontAwesomeIcon icon={faBookOpen} size="lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">4</h3>
                <p className="text-xs text-gray-400 mt-0.5">Assigned Courses</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Upload Panel */}
            <form onSubmit={handleUploadLesson} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2">
                <FontAwesomeIcon icon={faUpload} className="text-custom-orange mr-2" /> Upload Study Lesson (PDF)
              </h3>

              {uploadMessage && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl p-3 text-xs font-semibold">
                  {uploadMessage}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Target Grade</label>
                  <select
                    value={uploadGrade}
                    onChange={(e) => setUploadGrade(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2 text-xs text-white focus:outline-none"
                  >
                    <option value="5">Grade 5</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="10">Grade 10</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Target Course</label>
                  <select className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2 text-xs text-white focus:outline-none">
                    <option>Bible Studies</option>
                    <option>Church History</option>
                    <option>Liturgy & Mezmur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Lesson Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Chapter 4 - Liturgy Origins"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-white focus:outline-none placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1 font-semibold">
                  Resource Link / File Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. /documents/sample.pdf"
                  value={uploadFile}
                  onChange={(e) => setUploadFile(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-white focus:outline-none placeholder-gray-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer font-semibold"
              >
                Publish Lesson Materials
              </button>
            </form>

            {/* Quick Quiz Builder */}
            <form onSubmit={handleCreateQuiz} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2">
                <FontAwesomeIcon icon={faPlus} className="text-custom-orange mr-2" /> Interactive Quiz Builder
              </h3>

              {quizMessage && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl p-3 text-xs font-semibold">
                  {quizMessage}
                </div>
              )}

              <div>
                <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Quiz Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Church History Mid-term Assessment"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-white focus:outline-none placeholder-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Question Type</label>
                  <select
                    value={quizType}
                    onChange={(e) => setQuizType(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2 text-xs text-white focus:outline-none"
                  >
                    <option value="mc">Multiple Choice</option>
                    <option value="tf">True / False</option>
                    <option value="fib">Fill in Blank</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Grade Level</label>
                  <select className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2 text-xs text-white focus:outline-none">
                    <option>Grade 7</option>
                    <option>Grade 8</option>
                    <option>Grade 10</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Question Description</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. In what year did St. Frumentius arrive in Axum?"
                  value={quizQuestion}
                  onChange={(e) => setQuizQuestion(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-white focus:outline-none placeholder-gray-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer font-semibold"
              >
                Add Question to Exam
              </button>
            </form>
          </div>
        </>
      )}

      {activeTab === 'attendance' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-850 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Sunday School Attendance Sheet</h3>
              <p className="text-xs text-gray-400 mt-0.5">Please mark attendance for the current Sunday Assembly.</p>
            </div>
            <span className="text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-xl">
              Date: Sunday
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-850">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950 text-gray-400 text-xs font-extrabold border-b border-gray-850">
                  <th className="p-4">Student Name</th>
                  <th className="p-4 text-center">Present</th>
                  <th className="p-4 text-center">Late</th>
                  <th className="p-4 text-center">Absent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850 text-xs">
                {STUDENTS_MOCK.map((st) => (
                  <tr key={st.id} className="hover:bg-gray-850 transition-colors">
                    <td className="p-4 text-white font-medium">{st.name}</td>
                    <td className="p-4 text-center">
                      <input
                        type="radio"
                        name={`att_${st.id}`}
                        checked={attendance[st.id] === 'present'}
                        onChange={() => setAttendance({ ...attendance, [st.id]: 'present' })}
                        className="text-custom-orange focus:ring-custom-orange h-4 w-4 bg-gray-900 border-gray-800"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="radio"
                        name={`att_${st.id}`}
                        checked={attendance[st.id] === 'late'}
                        onChange={() => setAttendance({ ...attendance, [st.id]: 'late' })}
                        className="text-yellow-500 focus:ring-yellow-500 h-4 w-4 bg-gray-900 border-gray-800"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="radio"
                        name={`att_${st.id}`}
                        checked={attendance[st.id] === 'absent'}
                        onChange={() => setAttendance({ ...attendance, [st.id]: 'absent' })}
                        className="text-red-500 focus:ring-red-500 h-4 w-4 bg-gray-900 border-gray-800"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleSaveAttendance}
              className="px-5 py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-500/10 cursor-pointer font-semibold"
            >
              Save Weekly Attendance
            </button>
          </div>
        </div>
      )}

      {activeTab === 'gradebook' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Sunday School Grade Book</h3>
            <p className="text-xs text-gray-400 mt-0.5">View and record student exam marks.</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-850">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950 text-gray-400 text-xs font-extrabold border-b border-gray-850">
                  <th className="p-4">Student</th>
                  <th className="p-4">Dogmatic Theology</th>
                  <th className="p-4">Church History</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850 text-xs">
                {studentsMarks.map((sm) => (
                  <tr key={sm.id} className="hover:bg-gray-850 transition-colors">
                    <td className="p-4 text-white font-medium">{sm.name}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={sm.theology}
                        onChange={(e) => handleMarkGrade(sm.id, 'theology', e.target.value)}
                        className="w-16 bg-gray-950 border border-gray-800 text-white p-2 rounded text-center text-xs focus:ring-1 focus:ring-custom-orange"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={sm.history}
                        onChange={(e) => handleMarkGrade(sm.id, 'history', e.target.value)}
                        className="w-16 bg-gray-950 border border-gray-800 text-white p-2 rounded text-center text-xs focus:ring-1 focus:ring-custom-orange"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
