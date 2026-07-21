'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faChalkboardTeacher,
  faUserFriends,
  faTimes,
  faCheckCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

interface RegisterModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RegisterModal({ onClose, onSuccess }: RegisterModalProps) {
  const [role, setRole] = useState<'student' | 'teacher' | 'parent'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [amharicName, setAmharicName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [dob, setDob] = useState('');
  const [baptismName, setBaptismName] = useState('');

  // Role Specific Fields
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [gradeNumber, setGradeNumber] = useState('7');
  const [subjects, setSubjects] = useState('Dogmatic Theology');
  const [assignedGrades, setAssignedGrades] = useState('7');
  const [qualification, setQualification] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('2');
  const [biography, setBiography] = useState('');
  const [childrenEmails, setChildrenEmails] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const payload = {
        role,
        firstName,
        lastName,
        amharicName,
        email,
        username,
        password,
        phone,
        address,
        gender,
        dob,
        baptismName,
        // Role specific
        parentName,
        parentPhone,
        gradeNumber,
        subjects: subjects.split(',').map(s => s.trim()),
        assignedGrades: assignedGrades.split(',').map(g => g.trim()),
        qualification,
        yearsOfExperience,
        biography,
        childrenEmails: childrenEmails.split(',').map(c => c.trim()).filter(Boolean),
      };

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      setSuccessMsg(data.message);
      setLoading(false);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gray-850 px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg">Account Registration</h3>
            <p className="text-xs text-gray-400 mt-0.5">Debre Berhan Sunday School Portal</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Role selector tabs */}
          <div className="grid grid-cols-3 gap-2 bg-gray-950 p-1.5 rounded-2xl border border-gray-850">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                role === 'student' ? 'bg-custom-orange text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faGraduationCap} /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                role === 'teacher' ? 'bg-custom-orange text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faChalkboardTeacher} /> Teacher
            </button>
            <button
              type="button"
              onClick={() => setRole('parent')}
              className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                role === 'parent' ? 'bg-custom-orange text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faUserFriends} /> Parent
            </button>
          </div>

          {successMsg ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 text-3xl mx-auto">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <h4 className="text-white font-bold text-lg">Registration Submitted</h4>
              <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">{successMsg}</p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Close & Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Shared Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">First Name (English)</label>
                  <input
                    required
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Tinbit"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Last Name (English)</label>
                  <input
                    required
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Elias"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Full Name (Amharic)</label>
                  <input
                    type="text"
                    value={amharicName}
                    onChange={e => setAmharicName(e.target.value)}
                    placeholder="ትእቢት ኤልያስ"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Baptism Name (optional)</label>
                  <input
                    type="text"
                    value={baptismName}
                    onChange={e => setBaptismName(e.target.value)}
                    placeholder="Haile Mariam"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="user@eotc.edu"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Password</label>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+251 911 000 000"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value as any)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Role-Specific Workflows */}
              {role === 'student' && (
                <div className="space-y-3 pt-2 border-t border-gray-850">
                  <span className="text-[10px] uppercase font-extrabold text-orange-400">Student Profile Fields</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Grade Level</label>
                      <select
                        value={gradeNumber}
                        onChange={e => setGradeNumber(e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white"
                      >
                        {[5, 6, 7, 8, 9, 10, 11, 12].map(g => (
                          <option key={g} value={g}>Grade {g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Parent Name</label>
                      <input
                        type="text"
                        value={parentName}
                        onChange={e => setParentName(e.target.value)}
                        placeholder="Elias Tekle"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Parent Phone</label>
                      <input
                        type="text"
                        value={parentPhone}
                        onChange={e => setParentPhone(e.target.value)}
                        placeholder="+251 911 222 333"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {role === 'teacher' && (
                <div className="space-y-3 pt-2 border-t border-gray-850">
                  <span className="text-[10px] uppercase font-extrabold text-blue-400">Teacher Roster Credentials</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Subjects (comma separated)</label>
                      <input
                        type="text"
                        value={subjects}
                        onChange={e => setSubjects(e.target.value)}
                        placeholder="Dogmatic Theology, Liturgy"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Qualification</label>
                      <input
                        type="text"
                        value={qualification}
                        onChange={e => setQualification(e.target.value)}
                        placeholder="Theology Degree / Deaconal Ordination"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {role === 'parent' && (
                <div className="space-y-3 pt-2 border-t border-gray-850">
                  <span className="text-[10px] uppercase font-extrabold text-pink-400">Parent Student Link</span>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Child Student Email(s)</label>
                    <input
                      type="text"
                      value={childrenEmails}
                      onChange={e => setChildrenEmails(e.target.value)}
                      placeholder="student@eotc.edu"
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-custom-orange hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : null}
                Complete Registration
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
