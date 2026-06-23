import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faPlus,
  faTrash,
  faBell,
  faEdit,
  faGraduationCap,
  faCalendarPlus,
} from '@fortawesome/free-solid-svg-icons';

export default function AdminView({ activeTab, setActiveTab }) {
  const [teachers, setTeachers] = useState([
    { id: 'T1', name: 'Deacon Yohannes', course: 'Dogmatic Theology', active: true },
    { id: 'T2', name: 'Kesis Welde Semayat', course: 'Liturgy responses', active: true },
    { id: 'T3', name: 'Tirfe Seyoum', course: 'Old Testament Studies', active: true },
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Parish Retreat Scheduled for Sene 26', text: 'All class attendees are invited to the upcoming spiritual retreat at Debre Berhan.', date: 'Today' },
    { id: 2, title: 'Mid-Term Liturgy exams on Hamle 19', text: 'Make sure to review Yaredic Geez chants responses.', date: '2 days ago' },
  ]);

  // Form states
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherCourse, setNewTeacherCourse] = useState('Dogmatic Theology');
  const [showAddTeacher, setShowAddTeacher] = useState(false);

  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnText, setNewAnnText] = useState('');

  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!newTeacherName.trim()) return;

    const nt = {
      id: `T${teachers.length + 1}`,
      name: newTeacherName,
      course: newTeacherCourse,
      active: true,
    };

    setTeachers([...teachers, nt]);
    setNewTeacherName('');
    setShowAddTeacher(false);
  };

  const handleDeleteTeacher = (id) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const handlePublishAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnText.trim()) return;

    const na = {
      id: announcements.length + 1,
      title: newAnnTitle,
      text: newAnnText,
      date: 'Just now',
    };

    setAnnouncements([na, ...announcements]);
    setNewAnnTitle('');
    setNewAnnText('');
  };

  return (
    <div className="space-y-6">
      {activeTab === 'dashboard' && (
        <>
          {/* Admin Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-custom-orange shadow-inner">
                <FontAwesomeIcon icon={faUserTie} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{teachers.length}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Staff Teachers</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-inner">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">12</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Grades Modules</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 shadow-inner">
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">16</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Total Courses</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shadow-inner">
                <FontAwesomeIcon icon={faBell} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{announcements.length}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Announcements</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between min-h-[250px]">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2">
                  System Audit Logs
                </h3>
                <ul className="space-y-3 mt-4 text-xs">
                  <li className="flex justify-between text-gray-400">
                    <span>Teacher "Deacon Yohannes" updated Grade 7 curriculum.</span>
                    <span className="text-[10px] font-bold text-gray-600">10m ago</span>
                  </li>
                  <li className="flex justify-between text-gray-400">
                    <span>Admin added teacher "Kesis Welde Semayat" to roster.</span>
                    <span className="text-[10px] font-bold text-gray-600">2h ago</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2 font-serif">
                  Quick Actions
                </h3>
                <div className="space-y-3 mt-4">
                  <button
                    onClick={() => setActiveTab('teachers')}
                    className="w-full py-2.5 bg-gray-850 hover:bg-gray-800 text-gray-300 text-xs font-bold rounded-xl border border-gray-800 transition-colors cursor-pointer"
                  >
                    Manage Roster Teachers
                  </button>
                  <button
                    onClick={() => setActiveTab('announcements')}
                    className="w-full py-2.5 bg-gray-850 hover:bg-gray-800 text-gray-300 text-xs font-bold rounded-xl border border-gray-800 transition-colors cursor-pointer"
                  >
                    Publish Urgent Announcement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'teachers' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-850 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Sunday School Teachers Roster</h3>
              <p className="text-xs text-gray-400 mt-0.5">Manage credentials and courses assigned to teachers.</p>
            </div>
            {!showAddTeacher && (
              <button
                onClick={() => setShowAddTeacher(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Teacher
              </button>
            )}
          </div>

          {showAddTeacher && (
            <form onSubmit={handleAddTeacher} className="bg-gray-950 p-5 rounded-xl border border-gray-850 space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Add Teacher Account</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Teacher Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Deacon Ayalew"
                    value={newTeacherName}
                    onChange={e => setNewTeacherName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Primary Course Assign</label>
                  <select
                    value={newTeacherCourse}
                    onChange={e => setNewTeacherCourse(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  >
                    <option value="Dogmatic Theology">Dogmatic Theology</option>
                    <option value="Liturgy responses">Liturgy responses</option>
                    <option value="Old Testament Studies">Old Testament Studies</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-custom-orange text-white text-xs font-bold rounded-lg cursor-pointer">Save Teacher</button>
                <button type="button" onClick={() => setShowAddTeacher(false)} className="px-4 py-2 bg-gray-800 text-gray-400 text-xs font-bold rounded-lg cursor-pointer">Cancel</button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto rounded-xl border border-gray-850">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950 text-gray-400 text-xs font-extrabold border-b border-gray-850">
                  <th className="p-4">Staff ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Course Assignment</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850 text-xs">
                {teachers.map(t => (
                  <tr key={t.id} className="hover:bg-gray-850 transition-colors">
                    <td className="p-4 text-gray-400 font-bold">{t.id}</td>
                    <td className="p-4 text-white font-medium">{t.name}</td>
                    <td className="p-4 text-gray-300">{t.course}</td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold rounded-md">
                        Active
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDeleteTeacher(t.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove Teacher"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Creator */}
          <form onSubmit={handlePublishAnnouncement} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4 lg:col-span-1 h-fit">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2">
              Create Announcement
            </h3>

            <div>
              <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Title</label>
              <input
                required
                type="text"
                placeholder="e.g. Easter Procession Details"
                value={newAnnTitle}
                onChange={e => setNewAnnTitle(e.target.value)}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Details</label>
              <textarea
                required
                rows={4}
                placeholder="Enter details for students and parents..."
                value={newAnnText}
                onChange={e => setNewAnnText(e.target.value)}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Publish Announcement
            </button>
          </form>

          {/* List */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 lg:col-span-2 space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2">
              Published Bulletins
            </h3>
            <div className="space-y-4 divide-y divide-gray-850">
              {announcements.map(a => (
                <div key={a.id} className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">{a.title}</h4>
                    <span className="text-[10px] text-gray-500 font-bold">{a.date}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'grades' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2 mb-4">
            Curriculum Modules Editor (Grade 1 - 12)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(g => (
              <div
                key={g}
                className="bg-gray-950 border border-gray-850 p-4 rounded-xl text-center hover:border-custom-orange transition-colors cursor-pointer flex flex-col justify-between gap-3"
              >
                <div>
                  <h4 className="text-white font-bold text-sm">Grade {g}</h4>
                  <p className="text-[10px] text-gray-500 mt-1 font-semibold">3 Courses Active</p>
                </div>
                <button className="py-1 px-2.5 bg-gray-900 border border-gray-800 hover:border-transparent hover:bg-custom-orange text-[9px] font-extrabold text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer">
                  Configure
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
