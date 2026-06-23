'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChurch,
  faDownload,
  faFileExport,
  faGlobe,
  faHistory,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

interface ParishData {
  name: string;
  students: number;
  teachers: number;
  admins: number;
  downloads: number;
}

interface ParishMap {
  [key: string]: ParishData;
}

const INITIAL_PARISH_DATA: ParishMap = {
  debre_berhan: { name: 'Debre Berhan Parish', students: 120, teachers: 15, admins: 2, downloads: 450 },
  bole_medhanealem: { name: 'Bole Medhanealem Parish', students: 340, teachers: 28, admins: 4, downloads: 1250 },
  lideta_maryam: { name: 'Lideta Maryam Parish', students: 190, teachers: 18, admins: 3, downloads: 680 },
};

interface SuperAdminViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SuperAdminView({ activeTab, setActiveTab }: SuperAdminViewProps) {
  const [selectedParish, setSelectedParish] = useState('debre_berhan');
  const [parishData, setParishData] = useState<ParishMap>(INITIAL_PARISH_DATA);
  const [parishes, setParishes] = useState(Object.keys(INITIAL_PARISH_DATA));
  const [newParishName, setNewParishName] = useState('');
  const [showAddParish, setShowAddParish] = useState(false);

  const data = parishData[selectedParish] || parishData.debre_berhan;

  const handleAddParish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParishName.trim()) return;

    const key = newParishName.toLowerCase().replace(/\s+/g, '_');
    const newData: ParishData = {
      name: newParishName,
      students: 0,
      teachers: 0,
      admins: 1,
      downloads: 0,
    };
    setParishData(prev => ({ ...prev, [key]: newData }));
    setParishes(prev => [...prev, key]);
    setSelectedParish(key);
    setNewParishName('');
    setShowAddParish(false);
  };

  const handleExportPDF = () => {
    alert('System report data compiled and exported to PDF.');
  };

  return (
    <div className="space-y-6">
      {activeTab === 'dashboard' && (
        <>
          {/* Parish Selector bar */}
          <div className="flex bg-gray-900 p-2.5 rounded-2xl border border-gray-800 items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-gray-400 font-bold px-3">Parish Overview Hub:</span>
            <div className="flex gap-1.5 overflow-x-auto">
              {parishes.map(p => (
                <button
                  key={p}
                  onClick={() => setSelectedParish(p)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                    selectedParish === p
                      ? 'bg-custom-orange border-transparent text-white shadow-md'
                      : 'bg-transparent border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {parishData[p]?.name || p}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-custom-orange shadow-inner">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{data.students}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Students Enrolled</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-inner">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{data.teachers}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Teachers Active</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shadow-inner">
                <FontAwesomeIcon icon={faGlobe} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{data.admins}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Admins Appointed</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 shadow-inner">
                <FontAwesomeIcon icon={faDownload} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{data.downloads}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">PDF Material DLs</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System logs */}
            <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faHistory} className="text-custom-orange" /> System Activity Audit Log
              </h3>
              <ul className="space-y-3.5 mt-4 text-xs">
                <li className="flex justify-between text-gray-400">
                  <span>Parish Admin added new teacher to &quot;Bole Medhanealem&quot;.</span>
                  <span className="text-[10px] text-gray-500 font-bold">25m ago</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <span>Super Admin modified system permissions definitions.</span>
                  <span className="text-[10px] text-gray-500 font-bold">1h ago</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <span>Database backup routine executed successfully.</span>
                  <span className="text-[10px] text-gray-500 font-bold">12h ago</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2">
                  System Tools
                </h3>
                <div className="space-y-3 mt-4">
                  <button
                    onClick={() => setActiveTab('churches')}
                    className="w-full py-2.5 bg-gray-850 hover:bg-gray-800 text-gray-300 text-xs font-bold rounded-xl border border-gray-800 transition-colors cursor-pointer"
                  >
                    Manage Church Parishes
                  </button>
                  <button
                    onClick={() => setActiveTab('reports')}
                    className="w-full py-2.5 bg-gray-850 hover:bg-gray-800 text-gray-300 text-xs font-bold rounded-xl border border-gray-800 transition-colors cursor-pointer"
                  >
                    Analytics &amp; Reports Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'churches' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-850 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Sunday School Parish Registry</h3>
              <p className="text-xs text-gray-400 mt-0.5">Review active administrative links across parish churches.</p>
            </div>
            {!showAddParish && (
              <button
                onClick={() => setShowAddParish(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <FontAwesomeIcon icon={faChurch} /> Add Parish
              </button>
            )}
          </div>

          {showAddParish && (
            <form onSubmit={handleAddParish} className="bg-gray-950 p-5 rounded-xl border border-gray-850 space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Register New Parish</h4>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Parish Church Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Bole Sub-Parish"
                  value={newParishName}
                  onChange={e => setNewParishName(e.target.value)}
                  className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-custom-orange text-white text-xs font-bold rounded-lg cursor-pointer">Register</button>
                <button type="button" onClick={() => setShowAddParish(false)} className="px-4 py-2 bg-gray-800 text-gray-400 text-xs font-bold rounded-lg cursor-pointer">Cancel</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {parishes.map(p => {
              const item = parishData[p];
              return (
                <div key={p} className="bg-gray-950 border border-gray-850 p-5 rounded-2xl flex flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-sm">{item.name}</h4>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase">Parish Registry Node</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 border-t border-b border-gray-850 py-3 my-1">
                    <div>Students: <strong className="text-white">{item.students}</strong></div>
                    <div>Teachers: <strong className="text-white">{item.teachers}</strong></div>
                  </div>
                  <button
                    onClick={() => { setSelectedParish(p); setActiveTab('dashboard'); }}
                    className="w-full py-2 bg-gray-900 border border-gray-800 text-gray-300 text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    View Overview
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-850 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Analytics and Reporting</h3>
              <p className="text-xs text-gray-400 mt-0.5">Visual representation of system metrics.</p>
            </div>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 px-4 py-2 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <FontAwesomeIcon icon={faFileExport} /> Export PDF Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visual analytics chart 1 */}
            <div className="bg-gray-950 border border-gray-850 p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Student Growth Curve (Cumulative)</h4>
              <div className="h-44 bg-gray-900/50 rounded-xl border border-gray-800 flex items-end justify-between p-4 gap-2">
                <div className="w-full bg-orange-500/10 hover:bg-orange-500/20 h-[30%] rounded-t relative group transition-colors">
                  <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">120</div>
                </div>
                <div className="w-full bg-orange-500/10 hover:bg-orange-500/20 h-[45%] rounded-t relative group transition-colors">
                  <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">190</div>
                </div>
                <div className="w-full bg-orange-500/10 hover:bg-orange-500/20 h-[80%] rounded-t relative group transition-colors">
                  <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">340</div>
                </div>
              </div>
              <div className="flex justify-between text-[9px] text-gray-500 font-bold px-2">
                <span>Debre Berhan</span>
                <span>Lideta Maryam</span>
                <span>Bole Medhanealem</span>
              </div>
            </div>

            {/* Visual analytics chart 2 */}
            <div className="bg-gray-950 border border-gray-850 p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">PDF Download Logs by Category</h4>
              <div className="space-y-3.5 pt-2">
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold mb-1">
                    <span>Theology Guides</span>
                    <span>650 DLs</span>
                  </div>
                  <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold mb-1">
                    <span>Church History Books</span>
                    <span>320 DLs</span>
                  </div>
                  <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold mb-1">
                    <span>Liturgical responses</span>
                    <span>480 DLs</span>
                  </div>
                  <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '48%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
