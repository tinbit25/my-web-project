import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faTimes,
  faFilePdf,
  faBookOpen,
  faChevronRight,
  faChevronLeft,
  faChurch,
  faBook,
  faCross,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

const CATEGORIES = [
  { id: 'all', label: 'All Courses', icon: faBookOpen },
  { id: 'theology', label: 'Theology', amharic: 'ነገረ መለኮት', icon: faCross },
  { id: 'history', label: 'Church History', amharic: 'የቤተክርስቲያን ታሪክ', icon: faChurch },
  { id: 'liturgy', label: 'Liturgy', amharic: 'ሥርዓተ አምልኮ', icon: faStar },
  { id: 'scriptures', label: 'Scriptures', amharic: 'መጽሐፍ ቅዱስ', icon: faBook },
];

const COURSES = [
  {
    id: 1,
    title: 'Dogmatic Theology - Introduction',
    amharic: 'ዶግማቲክ ነገረ-መለኮት ክፍል ፩',
    category: 'theology',
    description: 'An introduction to the core doctrines of the Ethiopian Orthodox Tewahedo Church.',
    chapters: [
      { id: 1, title: 'Chapter 1 - The Holy Trinity', file: '/documents/sample.pdf' },
      { id: 2, title: 'Chapter 2 - The Nature of Christ', file: '/documents/sample.pdf' },
      { id: 3, title: 'Chapter 3 - The Holy Spirit', file: '/documents/sample.pdf' },
    ],
  },
  {
    id: 2,
    title: 'Dogmatic Theology - Advanced',
    amharic: 'ዶግማቲክ ነገረ-መለኮት ክፍል ፪',
    category: 'theology',
    description: 'Advanced study of EOTC doctrines, including Christology and Mariology.',
    chapters: [
      { id: 1, title: 'Chapter 1 - Christology', file: '/documents/sample.pdf' },
      { id: 2, title: 'Chapter 2 - Mariology', file: '/documents/sample.pdf' },
    ],
  },
  {
    id: 3,
    title: 'History of the Ethiopian Orthodox Church',
    amharic: 'የኢትዮጵያ ኦርቶዶክስ ቤተ ክርስቲያን ታሪክ',
    category: 'history',
    description: 'From the baptism of the Ethiopian Eunuch to the modern church, a deep-dive into the church\'s long history.',
    chapters: [
      { id: 1, title: 'Chapter 1 - Apostolic Origins', file: '/documents/sample.pdf' },
      { id: 2, title: 'Chapter 2 - The Aksumite Era', file: '/documents/sample.pdf' },
      { id: 3, title: 'Chapter 3 - The Medieval Period', file: '/documents/sample.pdf' },
      { id: 4, title: 'Chapter 4 - The Modern Church', file: '/documents/sample.pdf' },
    ],
  },
  {
    id: 4,
    title: 'Liturgy and Sacraments',
    amharic: 'ቅዳሴና ምሥጢራተ ቤተ ክርስቲያን',
    category: 'liturgy',
    description: 'An overview of the Divine Liturgy (Qidase) and the seven sacraments of the Church.',
    chapters: [
      { id: 1, title: 'Chapter 1 - The Divine Liturgy', file: '/documents/sample.pdf' },
      { id: 2, title: 'Chapter 2 - Baptism and Chrismation', file: '/documents/sample.pdf' },
      { id: 3, title: 'Chapter 3 - Holy Communion', file: '/documents/sample.pdf' },
    ],
  },
  {
    id: 5,
    title: 'Mezmur & Church Music',
    amharic: 'ዜማ እና የቤተ ክርስቲያን ሙዚቃ',
    category: 'liturgy',
    description: 'Study of traditional Zema (chant) and the hymnography of the EOTC including Deggwa.',
    chapters: [
      { id: 1, title: 'Chapter 1 - Origins of Zema', file: '/documents/sample.pdf' },
      { id: 2, title: 'Chapter 2 - The Three Musical Modes', file: '/documents/sample.pdf' },
    ],
  },
  {
    id: 6,
    title: 'Old Testament Studies',
    amharic: 'ብሉይ ኪዳን ጥናት',
    category: 'scriptures',
    description: 'A comprehensive study of the Old Testament canon including books unique to the EOTC.',
    chapters: [
      { id: 1, title: 'Chapter 1 - The Torah', file: '/documents/sample.pdf' },
      { id: 2, title: 'Chapter 2 - The Prophets', file: '/documents/sample.pdf' },
      { id: 3, title: 'Chapter 3 - The Writings', file: '/documents/sample.pdf' },
    ],
  },
  {
    id: 7,
    title: 'New Testament Studies',
    amharic: 'አዲስ ኪዳን ጥናት',
    category: 'scriptures',
    description: 'A deep study of the Gospels, Epistles, and Revelations as understood by the EOTC tradition.',
    chapters: [
      { id: 1, title: 'Chapter 1 - The Four Gospels', file: '/documents/sample.pdf' },
      { id: 2, title: 'Chapter 2 - Acts of the Apostles', file: '/documents/sample.pdf' },
      { id: 3, title: 'Chapter 3 - The Epistles', file: '/documents/sample.pdf' },
    ],
  },
];

function PDFViewerModal({ course, initialChapterIndex, onClose }) {
  const [activeChapter, setActiveChapter] = useState(initialChapterIndex || 0);
  const chapter = course.chapters[activeChapter];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-2 md:p-4">
      <div className="relative bg-gray-900 rounded-xl shadow-2xl w-full h-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-white font-bold text-base md:text-lg leading-tight">{course.title}</h2>
            <p className="text-orange-400 text-sm">{chapter.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700"
            aria-label="Close viewer"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Chapter List */}
          <div className="w-52 md:w-64 bg-gray-800 flex-shrink-0 overflow-y-auto border-r border-gray-700">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider px-4 py-3 border-b border-gray-700">Chapters</p>
            <ul>
              {course.chapters.map((ch, idx) => (
                <li key={ch.id}>
                  <button
                    onClick={() => setActiveChapter(idx)}
                    className={`w-full text-left px-4 py-3 text-sm border-b border-gray-700 transition-colors flex items-start gap-2 ${
                      idx === activeChapter
                        ? 'bg-custom-orange text-white font-semibold'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <FontAwesomeIcon icon={faFilePdf} className="mt-0.5 flex-shrink-0 opacity-70" />
                    <span>{ch.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 flex flex-col bg-gray-950 overflow-hidden">
            {/* Chapter Navigation Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 flex-shrink-0">
              <button
                onClick={() => setActiveChapter(i => Math.max(0, i - 1))}
                disabled={activeChapter === 0}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Previous
              </button>
              <span className="text-gray-400 text-sm">
                {activeChapter + 1} / {course.chapters.length}
              </span>
              <button
                onClick={() => setActiveChapter(i => Math.min(course.chapters.length - 1, i + 1))}
                disabled={activeChapter === course.chapters.length - 1}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            {/* iframe PDF viewer */}
            <iframe
              key={chapter.file + chapter.id}
              src={chapter.file}
              title={chapter.title}
              className="flex-1 w-full h-full border-0"
              style={{ minHeight: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, onOpen }) {
  const categoryColor = {
    theology: 'bg-purple-900 text-purple-200',
    history: 'bg-blue-900 text-blue-200',
    liturgy: 'bg-yellow-900 text-yellow-200',
    scriptures: 'bg-green-900 text-green-200',
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100 group">
      {/* Card Top Bar */}
      <div className={`h-1.5 w-full ${
        course.category === 'theology' ? 'bg-purple-500' :
        course.category === 'history' ? 'bg-blue-500' :
        course.category === 'liturgy' ? 'bg-yellow-500' : 'bg-green-500'
      }`} />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${categoryColor[course.category]}`}>
            {course.category}
          </span>
          <span className="text-gray-400 text-xs">{course.chapters.length} chapters</span>
        </div>

        <h3 className="font-bold text-gray-900 text-base mb-1 leading-snug group-hover:text-custom-orange transition-colors">{course.title}</h3>
        <p className="text-sm text-orange-500 font-medium mb-3">{course.amharic}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{course.description}</p>

        {/* Chapter Previews */}
        <ul className="space-y-1.5 mb-5">
          {course.chapters.slice(0, 3).map((ch, idx) => (
            <li key={ch.id}>
              <button
                onClick={() => onOpen(course, idx)}
                className="flex items-center gap-2 w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                <FontAwesomeIcon icon={faFilePdf} className="text-red-400 flex-shrink-0" />
                {ch.title}
              </button>
            </li>
          ))}
          {course.chapters.length > 3 && (
            <li className="text-xs text-gray-400 pl-5">+ {course.chapters.length - 3} more chapters</li>
          )}
        </ul>

        <button
          onClick={() => onOpen(course, 0)}
          className="mt-auto w-full bg-gray-900 hover:bg-custom-orange text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faBookOpen} />
          Open Course
        </button>
      </div>
    </div>
  );
}

function Courses() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [viewer, setViewer] = useState(null); // { course, chapterIndex }

  const filtered = useMemo(() => {
    return COURSES.filter(c => {
      const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.amharic.includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.chapters.some(ch => ch.title.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <section id="courses" className="py-16 px-4 md:px-10 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Course Materials</h2>
        <p className="text-orange-500 font-semibold text-lg mb-1">የኮርስ ማቴሪያሎች</p>
        <p className="text-gray-500 max-w-xl mx-auto text-sm">
          Browse, search, and read all Sunday School study guides and course PDFs directly in your browser.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8 relative">
        <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses or chapters..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-orange text-sm bg-white"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeCategory === cat.id
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900'
            }`}
          >
            <FontAwesomeIcon icon={cat.icon} />
            {cat.label}
            {cat.amharic && <span className="opacity-60 text-xs">{cat.amharic}</span>}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-16">
          <FontAwesomeIcon icon={faSearch} size="3x" className="mb-4 opacity-30" />
          <p className="text-lg">No courses found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
          {filtered.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onOpen={(course, idx) => setViewer({ course, chapterIndex: idx })}
            />
          ))}
        </div>
      )}

      {/* PDF Viewer Modal */}
      {viewer && (
        <PDFViewerModal
          course={viewer.course}
          initialChapterIndex={viewer.chapterIndex}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}

export default Courses;
