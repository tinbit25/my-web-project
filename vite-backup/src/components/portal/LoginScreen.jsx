import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap, faChalkboardTeacher, faUserShield,
  faUserTie, faUserFriends, faEye, faEyeSlash,
  faSpinner, faArrowRight, faTimes,
} from '@fortawesome/free-solid-svg-icons';

const ROLES = [
  {
    id: 'student',
    label: 'Student',
    amharic: 'ተማሪ',
    icon: faGraduationCap,
    color: 'from-green-600 to-emerald-700',
    border: 'border-green-500/40',
    ring: 'ring-green-500/50',
    badge: 'bg-green-500/15 text-green-400',
    demo: { user: 'student@eotc.edu', pass: 'student123' },
    desc: 'Access courses, quizzes & progress',
  },
  {
    id: 'teacher',
    label: 'Teacher',
    amharic: 'አስተማሪ',
    icon: faChalkboardTeacher,
    color: 'from-blue-600 to-indigo-700',
    border: 'border-blue-500/40',
    ring: 'ring-blue-500/50',
    badge: 'bg-blue-500/15 text-blue-400',
    demo: { user: 'teacher@eotc.edu', pass: 'teacher123' },
    desc: 'Upload PDFs, mark attendance & grades',
  },
  {
    id: 'admin',
    label: 'Admin',
    amharic: 'አስተዳዳሪ',
    icon: faUserShield,
    color: 'from-orange-600 to-amber-700',
    border: 'border-orange-500/40',
    ring: 'ring-orange-500/50',
    badge: 'bg-orange-500/15 text-orange-400',
    demo: { user: 'admin@eotc.edu', pass: 'admin123' },
    desc: 'Manage staff, curriculum & announcements',
  },
  {
    id: 'superadmin',
    label: 'Super Admin',
    amharic: 'ከፍተኛ አስተዳዳሪ',
    icon: faUserTie,
    color: 'from-purple-600 to-violet-700',
    border: 'border-purple-500/40',
    ring: 'ring-purple-500/50',
    badge: 'bg-purple-500/15 text-purple-400',
    demo: { user: 'superadmin@eotc.edu', pass: 'super123' },
    desc: 'System-wide oversight & reports',
  },
  {
    id: 'parent',
    label: 'Parent',
    amharic: 'ወላጅ',
    icon: faUserFriends,
    color: 'from-pink-600 to-rose-700',
    border: 'border-pink-500/40',
    ring: 'ring-pink-500/50',
    badge: 'bg-pink-500/15 text-pink-400',
    demo: { user: 'parent@eotc.edu', pass: 'parent123' },
    desc: "Track your child's learning progress",
  },
];

export default function LoginScreen({ onLogin, onClose }) {
  const [step, setStep] = useState('role'); // 'role' | 'credentials'
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setEmail(role.demo.user);
    setPassword(role.demo.pass);
    setError('');
    setStep('credentials');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      onLogin(selectedRole.id);
    }, 1400);
  };

  const handleBack = () => {
    setStep('role');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">

        {/* Decorative gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition-all z-10 cursor-pointer"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xs" />
        </button>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-purple-600 text-white text-2xl font-black shadow-xl shadow-orange-900/30 mb-4">
              G
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {step === 'role' ? 'Sign in to Your Portal' : `Sign in as ${selectedRole?.label}`}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {step === 'role'
                ? 'Select your role to continue to the Sunday School Portal'
                : `Enter your credentials for the ${selectedRole?.amharic} account`}
            </p>
          </div>

          {step === 'role' ? (
            /* Role Selection Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border ${role.border} bg-gray-900 hover:bg-gray-850 transition-all group hover:scale-105 cursor-pointer`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                    <FontAwesomeIcon icon={role.icon} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-white">{role.label}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{role.amharic}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${role.badge}`}>
                    {role.desc.split(' ').slice(0, 3).join(' ')}…
                  </span>
                </button>
              ))}
            </div>
          ) : (
            /* Credentials Form */
            <div className="max-w-md mx-auto">
              {/* Selected Role Badge */}
              <div className={`flex items-center gap-3 p-3 rounded-xl border ${selectedRole.border} bg-gray-900 mb-6`}>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedRole.color} flex items-center justify-center text-white`}>
                  <FontAwesomeIcon icon={selectedRole.icon} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Signing in as</p>
                  <p className="text-sm font-bold text-white">{selectedRole.label} — {selectedRole.amharic}</p>
                </div>
                <button onClick={handleBack} className="ml-auto text-xs text-orange-400 hover:underline cursor-pointer font-semibold">
                  Change
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5 tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-custom-orange placeholder-gray-600"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5 tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 pr-11 text-sm text-white focus:outline-none focus:ring-2 focus:ring-custom-orange placeholder-gray-600"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                    >
                      <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className="text-sm" />
                    </button>
                  </div>
                </div>

                {/* Demo hint */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-gray-500 leading-relaxed">
                  <span className="text-orange-400 font-bold">Demo credentials pre-filled.</span>{' '}
                  Click <strong className="text-white">Sign In</strong> to enter as <span className="text-white">{selectedRole.label}</span>.
                </div>

                {/* Error */}
                {error && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-custom-orange hover:bg-orange-600 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-orange-900/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                      Signing In…
                    </>
                  ) : (
                    <>
                      Sign In to Portal
                      <FontAwesomeIcon icon={faArrowRight} />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Footer note */}
          <p className="text-center text-[10px] text-gray-600 mt-8">
            Ethiopian Orthodox Tewahedo Church — Debre Berhan Sunday School Portal · 2026
          </p>
        </div>
      </div>
    </div>
  );
}
