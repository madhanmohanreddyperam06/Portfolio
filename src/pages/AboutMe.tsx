import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  GraduationCap,
  Trophy,
  Award,
  BookOpen,
  FileText,
  MapPin,
  Mail,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Calendar,
  Code,
  Github,
  Linkedin,
  Flame,
  User,
  Download
} from 'lucide-react';
import meta from '../data/meta.json';

const RESUME_URL = '/Peram_Madhan_Mohan_Reddy_Resume_.pdf';
const GITHUB_URL = 'https://github.com/madhanmohanreddyperam06';
const LINKEDIN_URL = 'https://www.linkedin.com/in/madhan-mohan-reddy-peram-63181b253';
const LEETCODE_URL = 'https://leetcode.com/u/madhanmohanreddyperam06/';
const EMAIL = 'madhanmohanreddyperam06@gmail.com';

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  description: string;
  highlights: string[];
  icon: typeof GraduationCap;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'btech',
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Kalasalingam Academy of Research and Education',
    location: 'Tamil Nadu, India',
    period: '2022 — 2026',
    score: '8.25',
    scoreLabel: 'CGPA (out of 10)',
    description:
      'Pursuing an intensive Computer Science curriculum focusing on core software engineering principles, distributed systems, full-stack application development, and machine learning.',
    highlights: [
      'Core Subjects: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks',
      'Specialized in Java, Python, Spring Boot, React, and Relational Database Systems',
      'Author of an IEEE research paper on Machine Learning assistants'
    ],
    icon: GraduationCap,
  },
  {
    id: 'xii',
    degree: 'Higher Secondary Education (Class XII)',
    institution: 'Narayana Junior College',
    location: 'Andhra Pradesh, India',
    period: '2020 — 2022',
    score: '84.20%',
    scoreLabel: 'Aggregate Percentage',
    description:
      'Completed rigorous pre-university curriculum with focus on Mathematics, Physics, and Chemistry (MPC), building strong mathematical modeling and analytical reasoning skills.',
    highlights: [
      'Advanced Mathematics, Calculus & Analytical Geometry',
      'Strong logical deduction and structured problem-solving foundation'
    ],
    icon: BookOpen,
  },
  {
    id: 'x',
    degree: 'Secondary School Certificate (Class X)',
    institution: 'Swamy Vivekananda E.M High School',
    location: 'Andhra Pradesh, India',
    period: '2019 — 2020',
    score: '99.33%',
    scoreLabel: 'Top Distinction',
    description:
      'Graduated with near-perfect academic distinction (99.33%), demonstrating consistent commitment to academic discipline, analytical excellence, and teamwork.',
    highlights: [
      'Ranked among top performers across the academic cohort',
      'Consistent academic awards in mathematics and physical sciences'
    ],
    icon: Award,
  },
];

interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'publication' | 'competition' | 'certification';
  badge: string;
  summary: string;
  details: string;
}

const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ieee-paper',
    title: 'IEEE Research Paper Publication: Smart College Helpdesk Assistant',
    issuer: 'ICISS 2026 · IEEE Conference',
    year: '2026',
    category: 'publication',
    badge: 'Research Publication',
    summary:
      'Authored and published research paper titled "Smart College Helpdesk Assistant using Machine Learning" at the 8th International Conference on Intelligent Sustainable Systems.',
    details:
      'Engineered an ML-driven conversational assistant architecture resolving student grievances, query routing, and institutional FAQ automation with natural language classification.',
  },
  {
    id: 'ibm-hackathon',
    title: 'National Finalist — Expert Labs National Hackathon 2025',
    issuer: 'IBM',
    year: '2025',
    category: 'competition',
    badge: 'National Finalist',
    summary:
      'Selected as a National Finalist in IBM’s flagship Expert Labs National Hackathon among thousands of participating teams across India.',
    details:
      'Designed and presented an enterprise-grade prototype under strict evaluation criteria covering scalability, real-world utility, and clean architectural design.',
  },
  {
    id: 'oracle-ai',
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle University',
    year: '2025',
    category: 'certification',
    badge: 'Industry Certification',
    summary:
      'Demonstrated foundational proficiency in Artificial Intelligence, Large Language Models, Cloud Machine Learning workflows, and OCI cloud services.',
    details:
      'Validates understanding of generative AI architectures, model tuning, prompt engineering paradigms, and cloud infrastructure deployment.',
  },
  {
    id: 'udemy-python',
    title: 'Full Stack Python Development — Real World Applications',
    issuer: 'Udemy',
    year: '2024',
    category: 'certification',
    badge: 'Professional Training',
    summary:
      'Comprehensive full-stack engineering certification covering Flask, REST APIs, frontend integration, and database operations.',
    details:
      'Built end-to-end applications demonstrating clean code organization, RESTful endpoint design, and authentication flows.',
  },
  {
    id: 'sql-simplilearn',
    title: 'SQL for Data Analysis Professional Certification',
    issuer: 'Simplilearn',
    year: '2024',
    category: 'certification',
    badge: 'Database Analytics',
    summary:
      'Hands-on training in complex queries, window functions, relational database schema optimization, indexing, and joins.',
    details:
      'Applied analytical SQL transformations across PostgreSQL and MySQL database engines with performance-first query design.',
  },
  {
    id: 'codechef-dbms',
    title: 'Database Management Systems Certification',
    issuer: 'CodeChef',
    year: '2024',
    category: 'certification',
    badge: 'Core CS Skills',
    summary:
      'In-depth validation of DBMS fundamentals including ACID compliance, ER modeling, normalization forms, and transaction isolation.',
    details:
      'Strengthened theoretical foundation for scalable database architectures and backend microservice communication.',
  },
];

export default function AboutMe() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'publication' | 'competition' | 'certification'>('all');
  const [expandedEdu, setExpandedEdu] = useState<string>('btech');
  const [profileImgError, setProfileImgError] = useState(false);

  // Filter achievements
  const filteredAchievements = ACHIEVEMENTS_DATA.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-black font-body relative pb-24">
      <Helmet>
        <title>About Me | Madhan Mohan Reddy Peram</title>
        <meta
          name="description"
          content="Learn more about Madhan Mohan Reddy Peram — Computer Science Graduate, Developer, and researcher based in Cuddapah, Andhra Pradesh, India."
        />
      </Helmet>

      {/* Top Floating Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 backdrop-blur-md bg-[var(--bg-base)]/80 border-b border-[var(--border)]/60 flex items-center justify-between">
        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>About Me</span>
        </div>
      </header>

      {/* Background ambient lighting */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 7%, transparent) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <main className="container-layout pt-32 relative z-10 max-w-5xl mx-auto">
        {/* ======================= HERO / PROFILE SECTION ======================= */}
        <section className="mb-20">
          <div className="p-8 md:p-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]/70 backdrop-blur-md shadow-2xl relative overflow-hidden">
            {/* Top decorative badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.2em] border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]">
                <Sparkles size={12} />
                Software Developer · B.Tech CSE (2022–2026)
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-[var(--accent)] text-[var(--bg-base)] hover:opacity-90 transition-opacity shadow-sm"
                >
                  <Download size={13} />
                  <span>Resume (PDF)</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Profile Picture / Portrait Frame */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative group">
                  {/* Decorative rotating accent glow ring */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--accent)]/40 via-emerald-500/20 to-[var(--accent)]/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />

                  <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border border-[var(--border-bright)] bg-[#0d0d10] flex items-center justify-center shadow-xl">
                    {!profileImgError ? (
                      <img
                        src="/profile.jpg"
                        alt={meta.name}
                        onError={() => setProfileImgError(true)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      /* Fallback Monogram Avatar if profile.jpg is not yet uploaded */
                      <div className="flex flex-col items-center justify-center text-center p-6 w-full h-full bg-gradient-to-br from-[#121216] to-[#08080a]">
                        <div className="w-20 h-20 rounded-full border border-[var(--border-bright)] bg-[var(--bg-elevated)] flex items-center justify-center mb-3">
                          <User size={36} className="text-[var(--accent)]" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                          MMR
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mt-1">
                          Profile Portrait
                        </span>
                      </div>
                    )}

                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[var(--accent)]" />
                    <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[var(--accent)]" />
                  </div>
                </div>
              </div>

              {/* Identity & Bio Summary */}
              <div className="md:col-span-8 space-y-4 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[var(--text-primary)] leading-tight">
                  Peram Madhan Mohan Reddy
                </h1>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-[var(--accent)]" />
                    Cuddapah, Andhra Pradesh, India
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} className="text-[var(--accent)]" />
                    {EMAIL}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed pt-2">
                  Computer Science graduate passionate about crafting robust software systems, performant backend architectures, and clean user interfaces. Hands-on experience across <strong className="text-[var(--text-primary)]">Java, Python, Spring Boot, Flask, React, and SQL databases</strong>.
                </p>

                {/* Social pill links */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all"
                  >
                    <Linkedin size={14} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={LEETCODE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all"
                  >
                    <Code size={14} />
                    <span>LeetCode</span>
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                  >
                    <Mail size={14} />
                    <span>Get In Touch</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-[var(--border)]">
              <div className="p-4 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border)]/70 text-center">
                <span className="block text-2xl md:text-3xl font-bold font-mono text-[var(--accent)]">
                  8.25
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[var(--text-tertiary)] mt-1 block">
                  B.Tech CGPA
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border)]/70 text-center">
                <span className="block text-2xl md:text-3xl font-bold font-mono text-[var(--text-primary)]">
                  1 IEEE
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[var(--text-tertiary)] mt-1 block">
                  Research Paper
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border)]/70 text-center">
                <span className="block text-2xl md:text-3xl font-bold font-mono text-[var(--text-primary)]">
                  IBM Finalist
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[var(--text-tertiary)] mt-1 block">
                  National Hackathon
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-base)]/60 border border-[var(--border)]/70 text-center">
                <span className="block text-2xl md:text-3xl font-bold font-mono text-emerald-400">
                  99.33%
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[var(--text-tertiary)] mt-1 block">
                  SSC Record
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= DETAILED BIO & PHILOSOPHY ======================= */}
        <section className="mb-24">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-medium">
              Background & Vision
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-1">
              About Myself
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>
                Hello! I am <strong className="text-[var(--text-primary)]">Madhan Mohan Reddy Peram</strong>, a software developer and computer science student from Cuddapah, Andhra Pradesh. My journey in technology started with a fascination for algorithmic thinking and has evolved into building complete, scalable web and backend applications.
              </p>
              <p>
                Throughout my undergraduate studies at Kalasalingam Academy of Research and Education, I have maintained a strong focus on core Computer Science tenets: Object-Oriented Design, Data Structures, Relational Database Normalization, and the Software Development Life Cycle (SDLC).
              </p>
              <p>
                Whether architecting multi-role Doctor Appointment booking engines with Flask and PostgreSQL or building layered enterprise E-commerce backend systems with Java and Spring Boot, I prioritize <strong className="text-[var(--text-primary)]">clean code separation, transactional integrity, and maintainable API contracts</strong>.
              </p>
              <p>
                Beyond standard development, I actively engage in research and competitive problem solving. I authored an IEEE conference paper on machine learning college assistants and achieved finalist status in the IBM Expert Labs National Hackathon.
              </p>
            </div>

            {/* Core Pillars / Strengths Cards */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                    <Code size={18} />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    Backend & API Architecture
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Skilled in designing RESTful endpoints, DTO patterns, role-based access control (RBAC), and transactional database operations with Spring Boot & Flask.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 size={18} />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    Rigorous Problem Solving
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Consistent practice on LeetCode across Java and Python, focusing on optimal time & space complexities for real-world scenarios.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    Continuous Learning & Innovation
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Certified in Oracle Cloud AI Foundations with active curiosity in applying generative AI and machine learning to everyday productivity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= EDUCATION SECTION ======================= */}
        <section id="education" className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[var(--border)]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-medium">
                Academic Background
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-1">
                Education & Qualifications
              </h2>
            </div>
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
              2019 — Present
            </span>
          </div>

          <div className="space-y-4">
            {EDUCATION_DATA.map((edu) => {
              const isSelected = expandedEdu === edu.id;
              const IconComp = edu.icon;
              return (
                <div
                  key={edu.id}
                  onClick={() => setExpandedEdu(edu.id)}
                  className={`p-6 md:p-8 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--accent)] bg-[var(--bg-elevated)] shadow-lg'
                      : 'border-[var(--border)] bg-[var(--bg-elevated)]/50 hover:border-[var(--border-bright)]'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[var(--accent)] text-[var(--bg-base)]'
                            : 'bg-[var(--bg-base)] text-[var(--text-secondary)] border border-[var(--border)]'
                        }`}
                      >
                        <IconComp size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-[var(--accent)] mt-0.5 font-medium">
                          {edu.institution}
                        </p>
                        <span className="text-xs text-[var(--text-tertiary)] mt-1 block">
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-start md:items-end justify-between md:justify-center border-t md:border-t-0 pt-3 md:pt-0 border-[var(--border)]">
                      <span className="text-xs uppercase tracking-wider font-mono px-2.5 py-1 rounded bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-secondary)]">
                        {edu.period}
                      </span>
                      <div className="text-right mt-1">
                        <span className="text-xl md:text-2xl font-bold font-mono text-[var(--accent)]">
                          {edu.score}
                        </span>
                        <span className="text-[10px] text-[var(--text-tertiary)] block">
                          {edu.scoreLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {isSelected && (
                    <div className="mt-6 pt-5 border-t border-[var(--border)]/70 space-y-4">
                      <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                        {edu.description}
                      </p>
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold block">
                          Key Highlights & Focus Areas:
                        </span>
                        <ul className="space-y-1.5">
                          {edu.highlights.map((h, i) => (
                            <li key={i} className="text-xs sm:text-sm text-[var(--text-secondary)] flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================= ACHIEVEMENTS & CERTIFICATIONS ======================= */}
        <section id="achievements" className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-[var(--border)]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-medium">
                Recognitions & Milestones
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-1">
                Achievements & Certifications
              </h2>
            </div>

            {/* Interactive Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'Publications', value: 'publication' },
                { label: 'Competitions', value: 'competition' },
                { label: 'Certifications', value: 'certification' },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value as any)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat.value
                      ? 'bg-[var(--accent)] text-[var(--bg-base)] shadow-sm'
                      : 'border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredAchievements.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] flex flex-col justify-between hover:border-[var(--accent)]/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                      {item.badge}
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)] font-mono">{item.year}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs font-semibold text-[var(--text-secondary)] mb-3">
                    Issued by: <span className="text-[var(--text-primary)]">{item.issuer}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border)]/70 text-xs text-[var(--text-tertiary)] leading-relaxed">
                  {item.details}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================= BOTTOM BANNER & CTA ======================= */}
        <section className="p-8 md:p-12 rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--bg-elevated)] to-[var(--bg-base)] text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-semibold">
              Open to Opportunities
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
              Let's Build Impactful Software Together
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Looking for software development engineering (SDE) roles, full-stack development, and innovative tech teams.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href={`mailto:${EMAIL}`}
                className="px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider bg-[var(--accent)] text-[var(--bg-base)] hover:opacity-90 transition-opacity shadow-sm"
              >
                Send an Email
              </a>
              <Link
                to="/"
                className="px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider border border-[var(--border-bright)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                Return to Portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

