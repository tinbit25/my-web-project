import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBookOpen,
  faFilePdf,
  faTimes,
  faFilter,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import PDFReader from './PDFReader';

const LIBRARY_RESOURCES = [
  {
    id: 'lib-1',
    title: 'Holy Trinity and Creation Studies',
    amharic: 'የእግዚአብሔር አንድነትና ሦስትነት (ሥላሴ)',
    grade: 'Grade 8',
    category: 'Theology',
    type: 'pdf',
    file: '/documents/sample.pdf',
    tags: ['trinity', 'selassie', 'ሥላሴ', 'ፈጣሪ', 'creation'],
    author: 'Deacon Yohannes',
  },
  {
    id: 'lib-2',
    title: 'Divine Liturgy and Hymns',
    amharic: 'ቅዳሴና የክብር መዝሙራት',
    grade: 'Grade 10',
    category: 'Liturgy',
    type: 'pdf',
    file: '/documents/sample.pdf',
    tags: ['liturgy', 'qidase', 'ቅዳሴ', 'hymns', 'mezmur'],
    author: 'Kesis Welde Semayat',
  },
  {
    id: 'lib-3',
    title: 'History of the Aksumite EOTC Era',
    amharic: 'የአክሱም ዘመን የቤተክርስቲያን ታሪክ',
    grade: 'Grade 7',
    category: 'Church History',
    type: 'pdf',
    file: '/documents/sample.pdf',
    tags: ['history', 'aksum', 'ታሪክ', 'eotc'],
    author: 'Deacon Yohannes',
  },
  {
    id: 'lib-4',
    title: 'Grade 5 Scripture Studies - Old Testament',
    amharic: 'የብሉይ ኪዳን ጥናት - የክፍል ፭',
    grade: 'Grade 5',
    category: 'Scriptures',
    type: 'pdf',
    file: '/documents/sample.pdf',
    tags: ['testament', 'bible', 'ብሉይ', 'ኪዳን', 'grade 5'],
    author: 'Tirfe Seyoum',
  },
  {
    id: 'lib-5',
    title: 'Spiritual Ethics and Morality Guidelines',
    amharic: 'መንፈሳዊ ሥነ-ምግባርና ግብረ-ገብነት',
    grade: 'Grade 9',
    category: 'Theology',
    type: 'pdf',
    file: '/documents/sample.pdf',
    tags: ['ethics', 'morality', 'ግብረገብነት', 'conduct'],
    author: 'Deacon Yohannes',
  }
];

export default function SharedLibrary() {
  const [search, setSearch] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePdf, setActivePdf] = useState(null); // { file, title, id }

  const grades = ['All', 'Grade 5', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 12'];
  const categories = ['All', 'Theology', 'Church History', 'Liturgy', 'Scriptures'];

  const filtered = useMemo(() => {
    return LIBRARY_RESOURCES.filter(r => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.amharic.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.tags.some(tag => tag.toLowerCase().includes(q));

      const matchesGrade = selectedGrade === 'All' || r.grade === selectedGrade;
      const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;

      return matchesSearch && matchesGrade && matchesCategory;
    });
  }, [search, selectedGrade, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Library Banner */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faBookOpen} className="text-custom-orange" />
            Digital Library
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Access study guides, liturgical documents, history textbooks, and previous exams.
          </p>
        </div>
        <div className="text-xs text-gray-400">
          Try searching in Amharic like <strong className="text-orange-400 font-bold border border-orange-500/20 px-2 py-0.5 rounded bg-orange-500/5">"ሥላሴ"</strong> or <strong className="text-orange-400 font-bold border border-orange-500/20 px-2 py-0.5 rounded bg-orange-500/5">"ቅዳሴ"</strong>.
        </div>
      </div>

      {/* Filters Panel */}
      <div className="bg-gray-900/50 p-5 rounded-2xl border border-gray-850 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Bar */}
          <div className="relative">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
            <input
              type="text"
              placeholder="Search by topic, teacher, or tags..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xs" />
              </button>
            )}
          </div>

          {/* Grade Selector */}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGraduationCap} className="text-gray-500 text-xs flex-shrink-0" />
            <select
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
            >
              {grades.map(g => (
                <option key={g} value={g}>{g === 'All' ? 'All Grades' : g}</option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="text-gray-500 text-xs flex-shrink-0" />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 bg-gray-900 border border-gray-800 rounded-2xl py-12">
            <FontAwesomeIcon icon={faSearch} size="2x" className="mb-3 opacity-20 text-orange-400" />
            <p className="text-sm">No digital resources match your search parameters.</p>
          </div>
        ) : (
          filtered.map(res => (
            <div
              key={res.id}
              className="bg-gray-900 border border-gray-800 hover:border-orange-500/30 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:shadow-lg transition-all group"
            >
              <div className="space-y-2.5">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-md">
                    {res.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold bg-gray-850 px-2 py-0.5 rounded">
                    {res.grade}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base leading-snug group-hover:text-custom-orange transition-colors">
                    {res.title}
                  </h4>
                  <p className="text-xs text-orange-500 font-medium mt-0.5">{res.amharic}</p>
                </div>
                <p className="text-xs text-gray-400">Teacher: {res.author}</p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-850 pt-4">
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faFilePdf} className="text-red-500" /> PDF Document
                </span>
                <button
                  onClick={() => setActivePdf({ file: res.file, title: res.title, id: res.id })}
                  className="px-3.5 py-1.5 bg-gray-850 hover:bg-custom-orange text-gray-300 hover:text-white rounded-lg text-xs font-bold transition-all border border-gray-800 hover:border-transparent cursor-pointer"
                >
                  Read Online
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PDF Modal Reader trigger */}
      {activePdf && (
        <PDFReader
          file={activePdf.file}
          title={activePdf.title}
          chapterId={activePdf.id}
          onClose={() => setActivePdf(null)}
        />
      )}
    </div>
  );
}
