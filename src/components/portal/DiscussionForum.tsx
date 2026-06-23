'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faPlus,
  faUser,
  faSearch,
  faReply,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

interface Reply {
  id: number;
  author: string;
  authorRole: string;
  content: string;
  date: string;
  verified: boolean;
}

interface Thread {
  id: number;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  content: string;
  replies: Reply[];
}

const INITIAL_THREADS: Thread[] = [
  {
    id: 1,
    title: 'What is the theological meaning of Kidan?',
    category: 'Theology',
    author: 'Tinbit Elias',
    authorRole: 'student',
    date: '2 hours ago',
    content: 'Can someone explain the difference between the Old Covenant (Kidan) and New Covenant in EOTC theology?',
    replies: [
      {
        id: 1,
        author: 'Deacon Yohannes',
        authorRole: 'teacher',
        content: 'Excellent question, Tinbit. In EOTC, "Kidan" (Covenant) signifies the holy promise between God and humanity. The Old Covenant was sealed through the Law, while the New Covenant is fulfilled and sealed by the blood of Christ. We also refer to "Kidane Mihret" (Covenant of Mercy) granted through the intercession of the Holy Virgin.',
        date: '1 hour ago',
        verified: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Tips for memorizing the Qidase responses?',
    category: 'Liturgy',
    author: 'Ephrem Samuel',
    authorRole: 'student',
    date: 'Yesterday',
    content: 'I am practicing the responses for the Liturgy of St. John Chrysostom. Any audio recordings or tips to match the vocal mode (Geez)?',
    replies: [
      {
        id: 1,
        author: 'Ayalew Kassahun',
        authorRole: 'student',
        content: 'Try listening to the Deacons chanting recordings in our Media Center! Also practicing after class on Sundays helped me lot.',
        date: 'Yesterday',
        verified: false,
      },
    ],
  },
];

interface DiscussionForumProps {
  role: string;
}

export default function DiscussionForum({ role }: DiscussionForumProps) {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Theology');
  const [newContent, setNewContent] = useState('');

  const [replyText, setReplyText] = useState('');

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newThread: Thread = {
      id: threads.length + 1,
      title: newTitle,
      category: newCategory,
      author: role === 'teacher' ? 'Deacon Yohannes' : 'Tinbit Elias',
      authorRole: role,
      date: 'Just now',
      content: newContent,
      replies: [],
    };

    setThreads([newThread, ...threads]);
    setNewTitle('');
    setNewContent('');
    setShowCreateForm(false);
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;

    const newReply: Reply = {
      id: activeThread.replies.length + 1,
      author: role === 'teacher' ? 'Deacon Yohannes' : 'Tinbit Elias',
      authorRole: role,
      content: replyText,
      date: 'Just now',
      verified: role === 'teacher',
    };

    const updatedThreads = threads.map(t => {
      if (t.id === activeThread.id) {
        return { ...t, replies: [...t.replies, newReply] };
      }
      return t;
    });

    setThreads(updatedThreads);
    setActiveThread({ ...activeThread, replies: [...activeThread.replies, newReply] });
    setReplyText('');
  };

  const filteredThreads = threads.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Forum Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faComments} className="text-custom-orange" />
            Discussion Forum
          </h2>
          <p className="text-xs text-gray-400 mt-1">Ask questions, share knowledge, and study EOTC doctrines together.</p>
        </div>
        {!activeThread && !showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-500/10 cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} />
            Ask Question
          </button>
        )}
      </div>

      {activeThread ? (
        /* Thread Detail View */
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden p-6 space-y-6">
          <button
            onClick={() => setActiveThread(null)}
            className="text-xs text-orange-400 hover:underline cursor-pointer flex items-center gap-1.5"
          >
            ← Back to all questions
          </button>

          {/* Original Post */}
          <div className="border-b border-gray-800 pb-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-gray-850 text-gray-300 rounded-full border border-gray-800">
                {activeThread.category}
              </span>
              <span className="text-xs text-gray-500">{activeThread.date}</span>
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">{activeThread.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{activeThread.content}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <FontAwesomeIcon icon={faUser} className="text-gray-600" />
              <span>Posted by <strong className="text-gray-300">{activeThread.author}</strong> ({activeThread.authorRole})</span>
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Replies ({activeThread.replies.length})</h4>
            <div className="space-y-4">
              {activeThread.replies.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No replies yet. Be the first to answer!</p>
              ) : (
                activeThread.replies.map(r => (
                  <div key={r.id} className={`p-4 rounded-xl border flex flex-col gap-2 ${
                    r.verified ? 'bg-orange-500/5 border-orange-500/20' : 'bg-gray-850 border-gray-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <strong className="text-white">{r.author}</strong>
                        {r.authorRole === 'teacher' && (
                          <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 bg-custom-orange text-white rounded">
                            Teacher
                          </span>
                        )}
                        {r.verified && (
                          <span className="text-[10px] text-orange-400 font-semibold flex items-center gap-1">
                            <FontAwesomeIcon icon={faCheckCircle} /> Verified Answer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500">{r.date}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{r.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add Reply Form */}
          <form onSubmit={handlePostReply} className="space-y-4 pt-4 border-t border-gray-800">
            <textarea
              required
              rows={3}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Write your answer..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-500/10 cursor-pointer"
            >
              <FontAwesomeIcon icon={faReply} />
              Post Answer
            </button>
          </form>
        </div>
      ) : showCreateForm ? (
        /* Create Question Form */
        <form onSubmit={handleCreateThread} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">New Question Thread</h3>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="text-xs text-gray-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 font-bold mb-1">Question Category</label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
              >
                <option value="Theology">Theology</option>
                <option value="Liturgy">Liturgy</option>
                <option value="Church History">Church History</option>
                <option value="Scriptures">Scriptures</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 font-bold mb-1">Title / Question Summary</label>
            <input
              required
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="e.g. What is the meaning of Holy Communion?"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 font-bold mb-1">Detailed Description</label>
            <textarea
              required
              rows={5}
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="Provide background context for your question..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-500/10 cursor-pointer"
          >
            Submit Question
          </button>
        </form>
      ) : (
        /* Threads List View */
        <div className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-gray-900/50 p-4 rounded-xl border border-gray-850">
            <div className="relative w-full md:max-w-xs">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
              <input
                type="text"
                placeholder="Search forum..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-950 border border-gray-850 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>
            <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto">
              {['All', 'Theology', 'Liturgy', 'Church History', 'Scriptures'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-gray-800 border-gray-700 text-white shadow-sm'
                      : 'bg-transparent border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Threads List */}
          <div className="grid grid-cols-1 gap-3">
            {filteredThreads.length === 0 ? (
              <div className="text-center text-gray-500 bg-gray-900 border border-gray-800 rounded-2xl py-12">
                <p className="text-sm">No discussions found matching filters.</p>
              </div>
            ) : (
              filteredThreads.map(t => (
                <div
                  key={t.id}
                  onClick={() => setActiveThread(t)}
                  className="bg-gray-900 hover:bg-gray-850 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 bg-gray-800 text-gray-400 rounded-md border border-gray-750">
                        {t.category}
                      </span>
                      <span className="text-xs text-gray-500">Posted by {t.author} · {t.date}</span>
                    </div>
                    <h4 className="font-bold text-white text-base leading-snug group-hover:text-custom-orange transition-colors">
                      {t.title}
                    </h4>
                    <p className="text-gray-400 text-xs line-clamp-1 max-w-xl">{t.content}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2 text-xs font-bold text-gray-400">
                    <div className="px-3 py-1.5 bg-gray-950 border border-gray-850 rounded-xl">
                      {t.replies.length} replies
                    </div>
                    {t.replies.some(r => r.verified) && (
                      <span className="text-orange-400 text-base" title="Has teacher response">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
