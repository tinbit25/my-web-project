// src/app/signin/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Load Google Font Inter via next/font (optional, but we can import via CSS)

export default function SignInPage() {
  const [email, setEmail] = useState('student@eotc.edu');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      // redirect to student dashboard (example path)
      router.push('/student/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-600 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white/10 backdrop-blur-lg p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-white drop-shadow-md">
          ተማሪ Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-white placeholder-gray-200 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-white placeholder-gray-200 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-center text-sm text-red-300" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Sign In to Portal
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-white/80">
          Ethiopian Orthodox Tewahedo Church — Debre Berhan Sunday School Portal
        </p>
      </div>
    </div>
  );
}
