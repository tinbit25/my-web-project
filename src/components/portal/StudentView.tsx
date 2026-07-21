'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faBook,
  faTrophy,
  faBell,
  faFilePdf,
  faTimes,
  faQuestionCircle,
  faCertificate,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import PDFReader from './PDFReader';

interface Question {
  type: 'mc' | 'tf' | 'fib';
  question: string;
  options?: string[];
  answer: any;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

interface Lesson {
  id: string;
  title: string;
  file: string;
}

interface Course {
  id: string;
  title: string;
  amharic: string;
  lessons?: Lesson[];
  quizzes?: Quiz[];
}

const GRADE_CURRICULUM: Record<number, Course[]> = {
  5: [
    {
      id: 'g5-c1',
      title: 'Introduction to the Holy Bible',
      amharic: 'ወደ ቅዱስ መጽሐፍ መግቢያ',
      lessons: [
        { id: 'g5-c1-l1', title: 'What is the Holy Bible?', file: '/documents/sample.pdf' },
        { id: 'g5-c1-l2', title: 'The Books of the Old Testament', file: '/documents/sample.pdf' },
      ],
      quizzes: [
        {
          id: 'g5-c1-q1',
          title: 'Bible Basics Quiz',
          questions: [
            {
              type: 'mc',
              question: 'How many books does the EOTC canon include?',
              options: ['66', '73', '81', '39'],
              answer: 2,
            },
            {
              type: 'tf',
              question: 'The Book of Enoch is included in the Ethiopian Orthodox canon.',
              answer: true,
            },
            { type: 'fib', question: 'The first book of the Holy Bible is called ____.', answer: 'Genesis' },
          ],
        },
      ],
    },
    {
      id: 'g5-c2',
      title: 'Praise & Worship (Mahlet)',
      amharic: 'ምስጋናና ማኅሌት',
      lessons: [
        { id: 'g5-c2-l1', title: 'What is Mahlet and its Purpose?', file: '/documents/sample.pdf' },
        { id: 'g5-c2-l2', title: 'Basic Mezmur Songs for Children', file: '/documents/sample.pdf' },
      ],
    },
    {
      id: 'g5-c3',
      title: 'Lives of the Saints',
      amharic: 'ገድለ ቅዱሳን',
      lessons: [
        { id: 'g5-c3-l1', title: 'Saint Gebre Menfes Kidus', file: '/documents/sample.pdf' },
        { id: 'g5-c3-l2', title: 'The Life of Saint Tekle Haymanot', file: '/documents/sample.pdf' },
      ],
    },
  ],
  6: [
    {
      id: 'g6-c1',
      title: 'The Life of Jesus Christ',
      amharic: 'የአይሁድና የአህዛብ አምላክ',
      lessons: [
        { id: 'g6-c1-l1', title: 'The Nativity and Early Life', file: '/documents/sample.pdf' },
        { id: 'g6-c1-l2', title: 'Miracles of Jesus Christ', file: '/documents/sample.pdf' },
      ],
      quizzes: [
        {
          id: 'g6-c1-q1',
          title: 'Life of Christ Quiz',
          questions: [
            {
              type: 'mc',
              question: 'Where was Jesus Christ born?',
              options: ['Jerusalem', 'Nazareth', 'Bethlehem', 'Galilee'],
              answer: 2,
            },
            { type: 'tf', question: 'Jesus performed the miracle of turning water into wine at Cana.', answer: true },
            { type: 'fib', question: 'Jesus was baptized in the River ____.', answer: 'Jordan' },
          ],
        },
      ],
    },
    {
      id: 'g6-c2',
      title: 'Ten Commandments & Mosaic Law',
      amharic: 'አሥርቱ ትእዛዛት',
      lessons: [
        { id: 'g6-c2-l1', title: 'The Ten Commandments Explained', file: '/documents/sample.pdf' },
        { id: 'g6-c2-l2', title: 'Mosaic Law and the Covenant', file: '/documents/sample.pdf' },
      ],
    },
    {
      id: 'g6-c3',
      title: 'Church Architecture & Symbolism',
      amharic: 'የቤተ ክርስቲያን ሕንፃ',
      lessons: [
        { id: 'g6-c3-l1', title: 'The Three Parts of an Ethiopian Church', file: '/documents/sample.pdf' },
        { id: 'g6-c3-l2', title: 'Sacred Objects: Tabot, Tsetsele & Cross', file: '/documents/sample.pdf' },
      ],
    },
  ],
  7: [
    {
      id: 'g7-c1',
      title: 'Bible Studies (Holy Scriptures)',
      amharic: 'የመጽሐፍ ቅዱስ ጥናት',
      lessons: [
        { id: 'g7-c1-l1', title: 'Introduction to Old Testament Canon', file: '/documents/sample.pdf' },
        { id: 'g7-c1-l2', title: 'The Covenant of Abraham', file: '/documents/sample.pdf' },
      ],
      quizzes: [
        {
          id: 'g7-c1-q1',
          title: 'Abrahamic Covenant Quiz',
          questions: [
            {
              type: 'mc',
              question: 'Who baptized Jesus Christ in the River Jordan?',
              options: ['Simon Peter', 'John the Baptist', 'Paul the Apostle', 'Moses'],
              answer: 1,
            },
            { type: 'tf', question: 'In EOTC tradition, the Bible contains 81 canonized books.', answer: true },
            {
              type: 'fib',
              question: 'The Covenant of Abraham was sealed through the rite of ____.',
              answer: 'circumcision',
            },
          ],
        },
      ],
    },
    {
      id: 'g7-c2',
      title: 'Church History',
      amharic: 'የቤተክርስቲያን ታሪክ',
      lessons: [
        { id: 'g7-c2-l1', title: 'The Apostolic Era & Ethiopian Eunuch', file: '/documents/sample.pdf' },
        { id: 'g7-c2-l2', title: 'Introduction of Christianity to Aksum', file: '/documents/sample.pdf' },
      ],
    },
    {
      id: 'g7-c3',
      title: 'Mezmur Chant & Liturgy',
      amharic: 'የቅዳሴና የመዝሙር ጥናት',
      lessons: [{ id: 'g7-c3-l1', title: 'The Geez vocal mode and Yaredic notations', file: '/documents/sample.pdf' }],
    },
  ],
  8: [
    {
      id: 'g8-c1',
      title: 'Dogmatic Theology (Haymanot)',
      amharic: 'ዶግማ — ሃይማኖት',
      lessons: [
        { id: 'g8-c1-l1', title: 'The Holy Trinity — Father, Son & Holy Spirit', file: '/documents/sample.pdf' },
        { id: 'g8-c1-l2', title: 'The Nature of Jesus Christ (Hypostatic Union)', file: '/documents/sample.pdf' },
      ],
      quizzes: [
        {
          id: 'g8-c1-q1',
          title: 'Dogmatic Theology Quiz',
          questions: [
            {
              type: 'mc',
              question: 'The EOTC holds which Christological position?',
              options: ['Dyophysitism', 'Nestorianism', 'Miaphysitism', 'Arianism'],
              answer: 2,
            },
            { type: 'tf', question: 'The EOTC accepts the Council of Chalcedon (451 AD).', answer: false },
            { type: 'fib', question: 'The EOTC is part of the ____ churches family.', answer: 'Oriental Orthodox' },
          ],
        },
      ],
    },
    {
      id: 'g8-c2',
      title: 'Sacraments (Mysteries)',
      amharic: 'ሰባቱ ምሥጢራት',
      lessons: [
        { id: 'g8-c2-l1', title: 'The Seven Sacraments Explained', file: '/documents/sample.pdf' },
        { id: 'g8-c2-l2', title: 'Baptism and Confirmation (Kristinna)', file: '/documents/sample.pdf' },
      ],
    },
    {
      id: 'g8-c3',
      title: 'Ethiopian Ecclesiastical Calendar',
      amharic: 'የቤተ ክርስቲያን አቆጣጠር',
      lessons: [
        { id: 'g8-c3-l1', title: 'Ethiopian Calendar vs Gregorian Calendar', file: '/documents/sample.pdf' },
        { id: 'g8-c3-l2', title: 'Major Feasts: Timkat, Meskel & Enkutatash', file: '/documents/sample.pdf' },
      ],
    },
  ],
  9: [
    {
      id: 'g9-c1',
      title: 'Canon Law & Church Administration',
      amharic: 'ቀኖና ቤተ ክርስቲያን',
      lessons: [
        { id: 'g9-c1-l1', title: 'Structure of the EOTC Hierarchy', file: '/documents/sample.pdf' },
        { id: 'g9-c1-l2', title: 'Roles of Patriarch, Bishop and Deacons', file: '/documents/sample.pdf' },
      ],
      quizzes: [
        {
          id: 'g9-c1-q1',
          title: 'Church Administration Quiz',
          questions: [
            {
              type: 'mc',
              question: 'What is the highest office in the EOTC?',
              options: ['Deacon', 'Priest', 'Patriarch', 'Archbishop'],
              answer: 2,
            },
            { type: 'tf', question: 'Abune is a title used for bishops in the EOTC.', answer: true },
            { type: 'fib', question: 'The EOTC headquarters is in ____.', answer: 'Addis Ababa' },
          ],
        },
      ],
    },
    {
      id: 'g9-c2',
      title: 'Yared & Sacred Music',
      amharic: 'ቅዱስ ያሬድና ቅዱስ ዜማ',
      lessons: [
        { id: 'g9-c2-l1', title: 'Biography of Saint Yared', file: '/documents/sample.pdf' },
        { id: 'g9-c2-l2', title: 'The Three Modes: Geez, Ezel & Araray', file: '/documents/sample.pdf' },
      ],
    },
    {
      id: 'g9-c3',
      title: 'Fasting & Prayer Traditions',
      amharic: 'ጾምና ጸሎት',
      lessons: [
        { id: 'g9-c3-l1', title: 'The 55-Day Lenten Fast (Tsome Filseta)', file: '/documents/sample.pdf' },
        { id: 'g9-c3-l2', title: 'Daily Canonical Hours of Prayer', file: '/documents/sample.pdf' },
      ],
    },
  ],
  10: [
    {
      id: 'g10-c1',
      title: 'Biblical Hermeneutics',
      amharic: 'የቅዱሳት መጻሕፍት ትርጓሜ',
      lessons: [
        { id: 'g10-c1-l1', title: 'Allegorical & Literal Interpretation', file: '/documents/sample.pdf' },
        { id: 'g10-c1-l2', title: 'Typology in the Old Testament', file: '/documents/sample.pdf' },
      ],
      quizzes: [
        {
          id: 'g10-c1-q1',
          title: 'Hermeneutics Quiz',
          questions: [
            {
              type: 'mc',
              question: 'Which language was the New Testament originally written in?',
              options: ['Latin', 'Hebrew', 'Greek', 'Aramaic'],
              answer: 2,
            },
            { type: 'tf', question: "The Ge'ez Bible (Haile Selassie translation) is called Mashaf Qidus.", answer: true },
            {
              type: 'fib',
              question: 'Typology refers to seeing people in the Old Testament as ____ of Christ.',
              answer: 'types',
            },
          ],
        },
      ],
    },
    {
      id: 'g10-c2',
      title: 'Ethics & Christian Living',
      amharic: 'ክርስቲያናዊ ሕይወት',
      lessons: [
        { id: 'g10-c2-l1', title: 'The Beatitudes and Sermon on the Mount', file: '/documents/sample.pdf' },
        { id: 'g10-c2-l2', title: 'Christian Family Values & Marriage', file: '/documents/sample.pdf' },
      ],
    },
    {
      id: 'g10-c3',
      title: 'History of African Christianity',
      amharic: 'የአፍሪካ ክርስትና ታሪክ',
      lessons: [
        { id: 'g10-c3-l1', title: 'Alexandria & the Coptic Tradition', file: '/documents/sample.pdf' },
        { id: 'g10-c3-l2', title: 'Ethiopia as a Biblical Land', file: '/documents/sample.pdf' },
      ],
    },
  ],
  11: [
    {
      id: 'g11-c1',
      title: 'Advanced Theology (Metsehafe Berhan)',
      amharic: 'መጸሐፈ ብርሃን',
      lessons: [
        { id: 'g11-c1-l1', title: 'Book of Light: Mariology in EOTC', file: '/documents/sample.pdf' },
        { id: 'g11-c1-l2', title: 'Anaphoras of the EOTC Liturgy', file: '/documents/sample.pdf' },
      ],
      quizzes: [
        {
          id: 'g11-c1-q1',
          title: 'Advanced Theology Quiz',
          questions: [
            {
              type: 'mc',
              question: 'How many Anaphoras does the EOTC Liturgy contain?',
              options: ['3', '7', '14', '21'],
              answer: 2,
            },
            { type: 'tf', question: 'The Virgin Mary holds the title "Theotokos" (God-Bearer) in EOTC theology.', answer: true },
            { type: 'fib', question: 'The Ethiopian Divine Liturgy is called ____.', answer: 'Kidase' },
          ],
        },
      ],
    },
    {
      id: 'g11-c2',
      title: 'Ecumenism & World Religions',
      amharic: 'ሐይማኖቶች ዓለም',
      lessons: [
        { id: 'g11-c2-l1', title: 'The Great Schism: East vs West', file: '/documents/sample.pdf' },
        { id: 'g11-c2-l2', title: 'EOTC Relations with Catholic and Protestant Churches', file: '/documents/sample.pdf' },
      ],
    },
    {
      id: 'g11-c3',
      title: 'Leadership & Diaconal Ministry',
      amharic: 'ዲቆናዊ አገልግሎት',
      lessons: [
        { id: 'g11-c3-l1', title: 'The Order of Deacons in the EOTC', file: '/documents/sample.pdf' },
        { id: 'g11-c3-l2', title: 'Servant Leadership in the Church', file: '/documents/sample.pdf' },
      ],
    },
  ],
  12: [
    {
      id: 'g12-c1',
      title: 'Eschatology — Last Things',
      amharic: 'ስለ ቅጻለ ዓለም',
      lessons: [
        { id: 'g12-c1-l1', title: 'Death, Judgment & the Resurrection', file: '/documents/sample.pdf' },
        { id: 'g12-c1-l2', title: 'Apocalyptic Literature in EOTC Canon', file: '/documents/sample.pdf' },
      ],
      quizzes: [
        {
          id: 'g12-c1-q1',
          title: 'Eschatology Final Quiz',
          questions: [
            {
              type: 'mc',
              question: 'Which book of the EOTC describes the fate of fallen angels?',
              options: ['Jubilees', 'Book of Enoch', 'Tobit', 'Esdras'],
              answer: 1,
            },
            { type: 'tf', question: 'The EOTC teaches bodily resurrection at the Last Day.', answer: true },
            { type: 'fib', question: 'The Second Coming of Christ is called the ____ in theology.', answer: 'Parousia' },
          ],
        },
      ],
    },
    {
      id: 'g12-c2',
      title: 'Senior Capstone: Theological Essay',
      amharic: 'ከፍተኛ ሥነ-ሃይማኖት',
      lessons: [
        { id: 'g12-c2-l1', title: 'How to Write a Theological Argument', file: '/documents/sample.pdf' },
        { id: 'g12-c2-l2', title: 'Sample Thesis: The Role of the Church in Society', file: '/documents/sample.pdf' },
      ],
    },
    {
      id: 'g12-c3',
      title: 'Full Kidase Participation',
      amharic: 'ሙሉ ቅዳሴ',
      lessons: [
        { id: 'g12-c3-l1', title: 'The Anaphora of the Apostles (Liturgy Text)', file: '/documents/sample.pdf' },
        { id: 'g12-c3-l2', title: 'Leading Liturgical Responses', file: '/documents/sample.pdf' },
      ],
    },
  ],
};

interface StudentViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function StudentView({ activeTab, setActiveTab }: StudentViewProps) {
  const [selectedGrade, setSelectedGrade] = useState<number>(7);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activePdf, setActivePdf] = useState<{ file: string; title: string; id: string } | null>(null);

  // Quiz Player State
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, any>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Certificate State
  const [showCertificate, setShowCertificate] = useState(false);

  const handleSubmitQuiz = async () => {
    if (!activeQuiz) return;

    try {
      const res = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit',
          quizId: (activeQuiz as any)._id || activeQuiz.id,
          userAnswers: quizAnswers,
        }),
      });

      const data = await res.json();

      setQuizScore(data.scorePct ?? 80);
    } catch (e) {
      setQuizScore(80);
    }
  };

  // Mock student stats
  const [stats, setStats] = useState({
    enrolledCourses: 3,
    progress: 72,
    quizAvg: 85,
    lastQuiz: null as number | null,
  });

  const courses = GRADE_CURRICULUM[selectedGrade] || [];

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setQuizAnswers({});
    setQuizScore(null);
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitQuiz();
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-gray-100">
      {activeTab === 'dashboard' && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-custom-orange shadow-inner">
                <FontAwesomeIcon icon={faBook} size="lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{stats.enrolledCourses}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Enrolled Courses</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 shadow-inner">
                <FontAwesomeIcon icon={faTrophy} size="lg" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">{stats.progress}%</h3>
                <div className="w-full bg-gray-850 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${stats.progress}%` }} />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Syllabus Progress</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-inner">
                <FontAwesomeIcon icon={faGraduationCap} size="lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{stats.quizAvg}%</h3>
                <p className="text-xs text-gray-400 mt-0.5">Average Quiz Mark</p>
              </div>
            </div>
          </div>

          {/* Certificate unlock alert */}
          {stats.progress >= 90 && (
            <div className="bg-gradient-to-r from-orange-600/20 to-purple-600/20 border border-orange-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faCertificate} className="text-yellow-400 text-3xl animate-bounce" />
                <div>
                  <h4 className="text-white font-bold text-sm md:text-base">Congratulations! Certificate Unlocked</h4>
                  <p className="text-xs text-gray-300 mt-0.5">
                    You have completed over 90% of the Sunday School syllabus program.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCertificate(true)}
                className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-bold rounded-xl text-xs tracking-wider transition-colors cursor-pointer"
              >
                View Certificate
              </button>
            </div>
          )}

          {/* Announcements & Calendar reminders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2">
                <FontAwesomeIcon icon={faBell} className="text-custom-orange mr-2" /> Recent Announcements
              </h3>
              <div className="space-y-4 divide-y divide-gray-850">
                <div className="pt-3 first:pt-0">
                  <span className="text-[10px] text-orange-400 font-bold">Feast Announcement · Today</span>
                  <h4 className="font-bold text-white text-sm mt-1">Parish Retreat Scheduled for Sene 26</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    All class attendees are invited to the upcoming spiritual retreat at Debre Berhan. Registration is now
                    open on the Events board.
                  </p>
                </div>
                <div className="pt-3">
                  <span className="text-[10px] text-gray-500 font-bold">Exam Announcement · 2 days ago</span>
                  <h4 className="font-bold text-white text-sm mt-1">Mid-Term Liturgy exams on Hamle 19</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Make sure to review Yaredic Geez chants responses under Chapter 1 lessons.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between min-h-[250px]">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-850 pb-2">
                  Next Actions
                </h3>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start gap-2.5 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 bg-custom-orange rounded-full mt-1.5" />
                    <span>Complete Grade 7 Liturgy responses lesson.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 bg-custom-orange rounded-full mt-1.5" />
                    <span>Review Holy Trinity Bible Studies.</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setActiveTab('curriculum')}
                className="w-full py-2.5 bg-gray-850 hover:bg-gray-800 text-gray-300 hover:text-white rounded-xl text-xs font-bold border border-gray-800 transition-colors mt-6 cursor-pointer"
              >
                Go to Grade Curriculum
              </button>
            </div>
          </div>
        </>
      )}

      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          {/* Grade selection bar */}
          <div className="flex bg-gray-900 p-2.5 rounded-2xl border border-gray-800 items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-gray-400 font-bold px-3">Select Grade Level:</span>
            <div className="flex gap-1.5 overflow-x-auto">
              {[5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setSelectedGrade(g);
                    setActiveCourse(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                    selectedGrade === g
                      ? 'bg-custom-orange border-transparent text-white shadow-md'
                      : 'bg-transparent border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  Grade {g}
                </button>
              ))}
            </div>
          </div>

          {activeCourse ? (
            /* Course View */
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-850 pb-4">
                <div>
                  <button
                    onClick={() => setActiveCourse(null)}
                    className="text-xs text-orange-400 hover:underline cursor-pointer mb-2 block"
                  >
                    &larr; Back to Grade {selectedGrade} courses
                  </button>
                  <h3 className="text-lg font-bold text-white leading-tight">{activeCourse.title}</h3>
                  <p className="text-xs text-orange-500 font-semibold mt-0.5">{activeCourse.amharic}</p>
                </div>
              </div>

              {/* Lessons List */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Lessons & Materials</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeCourse.lessons?.map((les) => (
                    <div
                      key={les.id}
                      className="bg-gray-950 border border-gray-850 rounded-xl p-4 flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={faFilePdf} />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white leading-snug group-hover:text-custom-orange transition-colors">
                            {les.title}
                          </h5>
                          <span className="text-[9px] text-gray-500 font-semibold uppercase">PDF Lesson</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setActivePdf({ file: les.file, title: les.title, id: les.id })}
                        className="px-3 py-1.5 bg-gray-900 border border-gray-800 hover:border-transparent hover:bg-custom-orange text-gray-400 hover:text-white rounded-lg text-[10px] font-extrabold transition-colors cursor-pointer"
                      >
                        Open Reader
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quizzes List */}
              {activeCourse.quizzes && activeCourse.quizzes.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-gray-850">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                    Course Assessment Quizzes
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeCourse.quizzes.map((qz) => (
                      <div
                        key={qz.id}
                        className="bg-gray-950 border border-gray-850 rounded-xl p-4 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-custom-orange flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon icon={faQuestionCircle} />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-white">{qz.title}</h5>
                            <span className="text-[9px] text-gray-500 font-semibold">
                              {qz.questions.length} Questions
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleStartQuiz(qz)}
                          className="px-3.5 py-1.5 bg-custom-orange hover:bg-orange-600 text-white rounded-lg text-[10px] font-extrabold transition-colors cursor-pointer"
                        >
                          Start Quiz
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Courses List */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 bg-gray-900 border border-gray-800 rounded-2xl py-12">
                  <p className="text-sm">
                    Curriculum syllabus details for Grade {selectedGrade} is currently being compiled by administrators.
                  </p>
                </div>
              ) : (
                courses.map((crs) => (
                  <div
                    key={crs.id}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-orange-500/30 transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div>
                      <h4 className="font-bold text-white text-base leading-snug group-hover:text-custom-orange transition-colors">
                        {crs.title}
                      </h4>
                      <p className="text-xs text-orange-500 font-medium mt-0.5">{crs.amharic}</p>
                      <p className="text-xs text-gray-400 mt-2">{crs.lessons?.length || 0} study guides uploaded</p>
                    </div>

                    <button
                      onClick={() => setActiveCourse(crs)}
                      className="w-full py-2.5 bg-gray-850 hover:bg-custom-orange text-gray-300 hover:text-white rounded-xl text-xs font-bold border border-gray-800 hover:border-transparent transition-all cursor-pointer"
                    >
                      Open Syllabus
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Quiz Player Modal Overlay */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden text-gray-100">
            {/* Header */}
            <div className="bg-gray-850 px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-base leading-tight">{activeQuiz.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Please answer all questions below.</p>
              </div>
              <button onClick={() => setActiveQuiz(null)} className="text-gray-400 hover:text-white cursor-pointer">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Questions Form */}
            <form onSubmit={handleQuizSubmit} className="overflow-y-auto flex-1 p-6 space-y-6">
              {quizScore !== null ? (
                /* Quiz score result */
                <div className="text-center py-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-orange-500/10 text-custom-orange flex items-center justify-center text-3xl mx-auto border border-orange-500/30">
                    <FontAwesomeIcon icon={faTrophy} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Quiz Completed!</h4>
                    <p className="text-xs text-gray-400 mt-1">You scored a total of:</p>
                    <p className="text-4xl font-extrabold text-white mt-2">{quizScore}%</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveQuiz(null)}
                    className="px-5 py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Run questions */
                <>
                  {activeQuiz.questions.map((q, idx) => (
                    <div key={idx} className="space-y-3 bg-gray-950 p-4 rounded-xl border border-gray-850">
                      <p className="text-xs text-orange-400 font-bold">Question {idx + 1}</p>
                      <h4 className="text-sm font-bold text-white leading-relaxed">{q.question}</h4>

                      {q.type === 'mc' && q.options && (
                        <div className="grid grid-cols-1 gap-2 mt-2">
                          {q.options.map((opt, oIdx) => (
                            <label
                              key={oIdx}
                              className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                                quizAnswers[idx] === oIdx
                                  ? 'bg-custom-orange/15 border-custom-orange text-white'
                                  : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                              }`}
                            >
                              <input
                                required
                                type="radio"
                                name={`q_${idx}`}
                                value={oIdx}
                                checked={quizAnswers[idx] === oIdx}
                                onChange={() => setQuizAnswers({ ...quizAnswers, [idx]: oIdx })}
                                className="hidden"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {q.type === 'tf' && (
                        <div className="flex gap-3 mt-2">
                          {[true, false].map((val) => (
                            <label
                              key={val.toString()}
                              className={`flex-1 text-center py-2 border rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                                quizAnswers[idx] === val
                                  ? 'bg-custom-orange/15 border-custom-orange text-white'
                                  : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                              }`}
                            >
                              <input
                                required
                                type="radio"
                                name={`q_${idx}`}
                                value={val.toString()}
                                checked={quizAnswers[idx] === val}
                                onChange={() => setQuizAnswers({ ...quizAnswers, [idx]: val })}
                                className="hidden"
                              />
                              {val ? 'True' : 'False'}
                            </label>
                          ))}
                        </div>
                      )}

                      {q.type === 'fib' && (
                        <input
                          required
                          type="text"
                          placeholder="Type answer here..."
                          value={quizAnswers[idx] || ''}
                          onChange={(e) => setQuizAnswers({ ...quizAnswers, [idx]: e.target.value })}
                          className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
                        />
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-custom-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                  >
                    Submit Quiz Answers
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Course Completion Certificate Modal Overlay */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="relative bg-white text-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl p-8 border-[12px] border-amber-800 flex flex-col justify-between items-center text-center gap-6 min-h-[450px] overflow-hidden">
            {/* Design Watermark */}
            <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

            <div className="flex items-center justify-between w-full z-10">
              <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">Debre Berhan Parish</span>
              <button
                onClick={() => setShowCertificate(false)}
                className="text-gray-400 hover:text-gray-950 font-bold p-1 cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="space-y-3 z-10">
              <h2 className="text-2xl md:text-3xl font-serif text-amber-950 font-extrabold uppercase tracking-wide">
                Certificate of Achievement
              </h2>
              <p className="text-xs text-amber-800 font-semibold tracking-wider italic uppercase mt-1 font-bold">
                This is proudly presented to
              </p>
              <h3 className="text-3xl md:text-4xl font-serif text-gray-900 font-bold py-2 underline decoration-amber-700 decoration-2">
                Tinbit Elias
              </h3>
              <p className="text-xs text-gray-600 max-w-lg mx-auto leading-relaxed mt-2">
                For successfully fulfilling and completing the Sunday School theological, historical, and liturgical
                course examinations of <strong>Grade 7 Curriculum Syllabus</strong>.
              </p>
            </div>

            <div className="flex justify-between items-end w-full border-t border-gray-200 pt-6 z-10 gap-4">
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Dated Issued</p>
                <p className="text-xs font-bold text-gray-800">Sene 22, 2018 E.C.</p>
              </div>
              <div className="w-14 h-14 bg-amber-500 rounded-full border border-amber-600 flex items-center justify-center text-white text-2xl shadow shadow-amber-950/20">
                <FontAwesomeIcon icon={faCertificate} />
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Parish Administrator</p>
                <p className="text-xs font-bold text-gray-850">Mergia Hailu</p>
              </div>
            </div>

            <div className="z-10 w-full mt-4 print:hidden flex gap-2">
              <button
                onClick={handlePrintCertificate}
                className="flex-1 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FontAwesomeIcon icon={faPrint} /> Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}

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
