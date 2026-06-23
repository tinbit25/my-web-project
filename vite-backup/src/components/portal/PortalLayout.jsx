import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faChalkboardTeacher,
  faUserShield,
  faUserTie,
  faUserFriends,
  faSignOutAlt,
  faBell,
  faBookOpen,
  faBook,
  faMusic,
  faVideo,
  faCalendarAlt,
  faComments,
  faChartBar,
  faClipboardList,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';

import StudentView from './StudentView';
import TeacherView from './TeacherView';
import AdminView from './AdminView';
import SuperAdminView from './SuperAdminView';
import ParentView from './ParentView';
import SharedLibrary from './SharedLibrary';
import MezmurModule from './MezmurModule';
import MediaCenter from './MediaCenter';
import DiscussionForum from './DiscussionForum';
import EventsModule from './EventsModule';

const ROLES = [
  { id: 'student', name: 'Student', icon: faGraduationCap, color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  { id: 'teacher', name: 'Teacher', icon: faChalkboardTeacher, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  { id: 'admin', name: 'Admin', icon: faUserShield, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
  { id: 'superadmin', name: 'Super Admin', icon: faUserTie, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  { id: 'parent', name: 'Parent', icon: faUserFriends, color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' },
];

export default function PortalLayout({ onExit, initialRole = 'student' }) {
  const [activeRole, setActiveRole] = useState(initialRole);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New Dogmatic Theology PDF uploaded for Grade 7', unread: true },
    { id: 2, text: 'Exam reminder: Mid-terms scheduled for Hamle 19', unread: true },
    { id: 3, text: 'Liturgical reminder: Fast of the Apostles ends Sene 29', unread: false },
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  // Sidebar links based on role
  const getSidebarLinks = () => {
    const common = [
      { id: 'library', name: 'Digital Library', icon: faBook },
      { id: 'mezmur', name: 'Mezmur Lyrics & Audio', icon: faMusic },
      { id: 'media', name: 'Media Center', icon: faVideo },
      { id: 'events', name: 'Events & Activities', icon: faCalendarAlt },
      { id: 'forum', name: 'Discussion Forum', icon: faComments },
    ];

    switch (activeRole) {
      case 'student':
        return [
          { id: 'dashboard', name: 'Student Dashboard', icon: faChartBar },
          { id: 'curriculum', name: 'Grade Curriculum', icon: faGraduationCap },
          ...common,
        ];
      case 'teacher':
        return [
          { id: 'dashboard', name: 'Teacher Dashboard', icon: faChartBar },
          { id: 'attendance', name: 'Mark Attendance', icon: faClipboardList },
          { id: 'gradebook', name: 'Grade Book', icon: faBookOpen },
          ...common,
        ];
      case 'admin':
        return [
          { id: 'dashboard', name: 'Admin Dashboard', icon: faChartBar },
          { id: 'teachers', name: 'Manage Staff', icon: faUserFriends },
          { id: 'grades', name: 'Manage Curriculum', icon: faFolderOpen },
          { id: 'announcements', name: 'Announcements', icon: faBell },
          ...common,
        ];
      case 'superadmin':
        return [
          { id: 'dashboard', name: 'System Overview', icon: faChartBar },
          { id: 'churches', name: 'Manage Parishes', icon: faFolderOpen },
          { id: 'reports', name: 'System Reports', icon: faBookOpen },
          ...common,
        ];
      case 'parent':
        return [
          { id: 'dashboard', name: 'Parent Dashboard', icon: faChartBar },
          { id: 'student-progress', name: 'Child Performance', icon: faGraduationCap },
          ...common,
        ];
      default:
        return common;
    }
  };

  // Safe navigation if active tab doesn't exist in new role
  const handleRoleChange = (role) => {
    setActiveRole(role);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    // Shared modules
    if (activeTab === 'library') return <SharedLibrary />;
    if (activeTab === 'mezmur') return <MezmurModule />;
    if (activeTab === 'media') return <MediaCenter />;
    if (activeTab === 'events') return <EventsModule />;
    if (activeTab === 'forum') return <DiscussionForum role={activeRole} />;

    // Role specific content
    switch (activeRole) {
      case 'student':
        return <StudentView activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'teacher':
        return <TeacherView activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'admin':
        return <AdminView activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'superadmin':
        return <SuperAdminView activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'parent':
        return <ParentView activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <div className="text-white p-6">Under Construction</div>;
    }
  };

  const activeLinks = getSidebarLinks();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-gray-900 border-b border-gray-800 h-16 flex items-center justify-between px-6 z-30 sticky top-0">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
            G
          </div>
          <div>
            <h1 className="font-bold text-sm md:text-base text-white tracking-wide leading-none">Gbi Gubae</h1>
            <p className="text-[10px] text-orange-400 mt-1 uppercase font-semibold tracking-wider">Sunday School Portal</p>
          </div>
        </div>

        {/* Middle: Role Testing Hub */}
        <div className="hidden lg:flex items-center gap-2 bg-gray-950 p-1 rounded-xl border border-gray-800">
          <span className="text-xs text-gray-400 px-3 font-semibold">Demo Role:</span>
          {ROLES.map(r => (
            <button
              key={r.id}
              onClick={() => handleRoleChange(r.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                activeRole === r.id
                  ? 'bg-custom-orange text-white border-transparent shadow-md shadow-orange-500/20'
                  : 'bg-transparent text-gray-400 border-transparent hover:text-white hover:bg-gray-850'
              }`}
            >
              <FontAwesomeIcon icon={r.icon} />
              {r.name}
            </button>
          ))}
        </div>

        {/* Right Side: Notifications & Exit */}
        <div className="flex items-center gap-4">
          {/* Mobile Role Quick Selector Dropdown */}
          <div className="lg:hidden relative">
            <select
              value={activeRole}
              onChange={e => handleRoleChange(e.target.value)}
              className="bg-gray-950 text-gray-200 border border-gray-800 rounded-lg py-1.5 px-3 text-xs font-semibold focus:outline-none"
            >
              <option value="student">Student Role</option>
              <option value="teacher">Teacher Role</option>
              <option value="admin">Admin Role</option>
              <option value="superadmin">Super Admin Role</option>
              <option value="parent">Parent Role</option>
            </select>
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
              aria-label="View notifications"
            >
              <FontAwesomeIcon icon={faBell} size="sm" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-custom-orange rounded-full ring-2 ring-gray-900" />
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-850 border-b border-gray-800">
                  <span className="font-bold text-xs text-white">Notifications ({unreadCount} new)</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[10px] text-orange-400 hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-gray-850">
                  {notifications.length === 0 ? (
                    <p className="text-gray-500 text-xs py-6 text-center">No notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="p-3 hover:bg-gray-850 transition-colors">
                        <p className={`text-xs leading-normal ${n.unread ? 'text-white font-medium' : 'text-gray-400'}`}>
                          {n.text}
                        </p>
                        <span className="text-[9px] text-gray-500 block mt-1.5">Just now</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Exit / Sign Out */}
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-3 py-2 bg-red-650 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-red-900/10 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="hidden sm:inline">Back to Site</span>
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col justify-between hidden md:flex z-20">
          <div className="p-4 flex-1">
            {/* Sidebar Active Role Profile */}
            <div className="mb-6 bg-gray-950 p-3 rounded-xl border border-gray-850 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center border border-orange-500/30">
                <FontAwesomeIcon
                  icon={ROLES.find(r => r.id === activeRole)?.icon || faGraduationCap}
                  className="text-custom-orange"
                />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Active Role</p>
                <p className="text-sm font-bold text-white capitalize">{activeRole}</p>
              </div>
            </div>

            {/* Navigation Lists */}
            <ul className="space-y-1">
              {activeLinks.map(l => (
                <li key={l.id}>
                  <button
                    onClick={() => setActiveTab(l.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                      activeTab === l.id
                        ? 'bg-custom-orange/10 border-custom-orange/20 text-custom-orange shadow-inner shadow-orange-500/5'
                        : 'bg-transparent text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-850'
                    }`}
                  >
                    <FontAwesomeIcon icon={l.icon} className="w-4 h-4" />
                    <span>{l.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={onExit}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-850 hover:bg-gray-800 text-gray-300 hover:text-white rounded-xl text-sm font-bold border border-gray-800 transition-colors"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-400" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Scrolling Content Canvas */}
        <main className="flex-1 overflow-y-auto bg-gray-950 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Footer Tab Bar */}
      <div className="md:hidden bg-gray-900 border-t border-gray-800 h-16 flex items-center justify-around z-30 sticky bottom-0">
        {activeLinks.slice(0, 4).map(l => (
          <button
            key={l.id}
            onClick={() => setActiveTab(l.id)}
            className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${
              activeTab === l.id ? 'text-custom-orange' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <FontAwesomeIcon icon={l.icon} className="text-lg" />
            <span className="text-[9px] font-semibold">{l.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
