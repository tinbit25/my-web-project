'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearchMinus,
  faSearchPlus,
  faBookmark,
  faHighlighter,
  faTimes,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';

interface PDFReaderProps {
  file: string;
  title: string;
  chapterId: string;
  onClose: () => void;
}

export default function PDFReader({ file, title, chapterId, onClose }: PDFReaderProps) {
  const [zoom, setZoom] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Sync bookmark state with localStorage
  useEffect(() => {
    const bookmarkKey = `bookmark_${chapterId}`;
    setIsBookmarked(localStorage.getItem(bookmarkKey) === 'true');

    const progressKey = `progress_${chapterId}`;
    const savedProgress = localStorage.getItem(progressKey);
    if (savedProgress) {
      setProgress(parseInt(savedProgress, 10));
    }
  }, [chapterId]);

  const toggleBookmark = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    localStorage.setItem(`bookmark_${chapterId}`, nextState ? 'true' : 'false');
  };

  const handleSaveProgress = (percentage: number) => {
    setProgress(percentage);
    localStorage.setItem(`progress_${chapterId}`, percentage.toString());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-2 md:p-6">
      <div className="relative bg-gray-900 rounded-2xl shadow-2xl w-full h-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden border border-gray-800 animate-fade-in text-gray-100">
        {/* PDF Header / Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 bg-gray-850 border-b border-gray-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
              <FontAwesomeIcon icon={faFilePdf} size="lg" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm md:text-base tracking-wide">
                {title || 'PDF Study Guide'}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Reading Progress: {progress}%</p>
            </div>
          </div>

          {/* Interactive controls */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-gray-950 border border-gray-850 rounded-xl p-1 gap-1">
              <button
                onClick={() => setZoom((z) => Math.max(50, z - 10))}
                className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <FontAwesomeIcon icon={faSearchMinus} className="text-xs" />
              </button>
              <span className="text-xs text-gray-300 font-bold px-2 w-12 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(200, z + 10))}
                className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Zoom In"
              >
                <FontAwesomeIcon icon={faSearchPlus} className="text-xs" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={toggleBookmark}
              className={`p-2.5 rounded-xl border transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                isBookmarked
                  ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                  : 'bg-gray-950 border-gray-850 text-gray-400 hover:text-white'
              }`}
              title="Bookmark Page"
            >
              <FontAwesomeIcon icon={faBookmark} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            {/* Mock Highlighter */}
            <button
              onClick={() => setIsHighlighted(!isHighlighted)}
              className={`p-2.5 rounded-xl border transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                isHighlighted
                  ? 'bg-custom-orange/20 border-custom-orange/30 text-custom-orange'
                  : 'bg-gray-950 border-gray-850 text-gray-400 hover:text-white'
              }`}
              title="Toggle Highlighter"
            >
              <FontAwesomeIcon icon={faHighlighter} />
              <span>{isHighlighted ? 'Highlight On' : 'Highlight'}</span>
            </button>

            {/* Save Reading Progress Dropdown */}
            <select
              value={progress}
              onChange={(e) => handleSaveProgress(parseInt(e.target.value, 10))}
              className="bg-gray-950 border border-gray-850 text-gray-300 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none"
            >
              <option value="0">0% Read</option>
              <option value="25">25% Read</option>
              <option value="50">50% Read</option>
              <option value="75">75% Read</option>
              <option value="100">100% Completed</option>
            </select>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:static p-2.5 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-all cursor-pointer"
            aria-label="Close reader"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Viewport Frame */}
        <div className="flex-1 bg-gray-950 p-4 md:p-6 overflow-auto flex justify-center items-start">
          <div
            className="w-full h-full max-w-5xl transition-all duration-300 relative rounded-xl border border-gray-800 bg-white shadow-xl overflow-hidden"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
            }}
          >
            {/* Mock highlighter overlay */}
            {isHighlighted && (
              <div className="absolute inset-0 bg-yellow-300/10 pointer-events-none mix-blend-multiply border-2 border-dashed border-yellow-400/40 z-10" />
            )}

            <iframe
              src={file || '/documents/sample.pdf'}
              title={title}
              className="w-full h-full border-0 bg-white"
              style={{ minHeight: '65vh' }}
            />
          </div>
        </div>

        {/* Action bar */}
        <div className="px-6 py-3.5 bg-gray-850 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
          <p>Mock document viewer is fully persistent via local storage.</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <p className="font-bold text-gray-300">Autosaved session</p>
          </div>
        </div>
      </div>
    </div>
  );
}
