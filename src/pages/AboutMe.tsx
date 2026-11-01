import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  GraduationCap,
  Award,
  BookOpen,
  MapPin,
  Mail,
  Code,
  Github,
  Linkedin,
  User
} from 'lucide-react';
import meta from '../data/meta.json';

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
    degree: 'Bachelor of Technology',
    institution: 'Kalasalingam Academy of Research and Education',
    location: 'Tamil Nadu, India',
    period: '2022 — 2026',
    score: '8.25',
    scoreLabel: 'CGPA (out of 10)',
    description:
      'Pursuing an intensive Computer Science & Engineering curriculum focusing on Artificial Intelligence & Machine Learning.',
    highlights: [
      'Core Subjects: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks',
      'Specialized in Java, Python and Relational Database Management Systems',
      'Author of an IEEE research paper on Machine Learning assistants'
    ],
    icon: GraduationCap,
  },
  {
    id: 'xii',
    degree: 'Higher Secondary Education',
    institution: 'Narayana Junior College',
    location: 'Andhra Pradesh, India',
    period: '2020 — 2022',
    score: '84.2 / 100%',
    scoreLabel: '',
    description:
      'Completed rigorous pre-university curriculum with focus on Mathematics, Physics and Chemistry with building strong mathematical modeling and analytical reasoning skills.',
    highlights: [
      'Advanced Mathematics, Calculus & Analytical Geometry',
      'Strong logical deduction and structured problem-solving foundation'
    ],
    icon: BookOpen,
  },
  {
    id: 'x',
    degree: 'Secondary School Education',
    institution: 'Swamy Vivekananda E.M & T.M High School',
    location: 'Andhra Pradesh, India',
    period: '2019 — 2020',
    score: '99.33 / 100%',
    scoreLabel: '',
    description:
      'Graduated with near-perfect academic distinction (99.33%), demonstrating consistent commitment to academic discipline, analytical excellence and teamwork.',
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
  const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

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
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-medium">
              Profile
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-1">
              About Me
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Profile Picture / Portrait Frame */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative group">
                {/* Decorative rotating accent glow ring */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--accent)]/40 via-emerald-500/20 to-[var(--accent)]/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="relative w-52 h-64 sm:w-60 sm:h-72 rounded-2xl overflow-hidden border border-[var(--border-bright)] bg-[#0d0d10] flex items-center justify-center shadow-xl">
                  {!profileImgError ? (
                    <img
                      src="/Final.png"
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
                Computer Science graduate passionate about crafting robust software systems, performant backend architectures, and clean user interfaces. Hands-on experience across <strong className="text-[var(--text-primary)]">Java, JavaScript, Python, Flask, FastAPI, React and SQL databases</strong>.
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
        </section>

        {/* Mobile separator */}
        <div className="md:hidden h-[3px] bg-[var(--accent)] mx-6 mb-24" />

        {/* ======================= EDUCATION SECTION ======================= */}
        <section id="education" className="mb-0">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-medium">
              Academic Background
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-1">
              Education & Qualifications
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative', paddingBottom: '2rem' }}>
            {/* Desktop centre spine */}
            <div
              className="absolute hidden md:block"
              aria-hidden="true"
              style={{ left: '50%', top: 0, bottom: 0, width: 1, transform: 'translateX(-50%)', background: 'var(--border)' }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, var(--accent), color-mix(in srgb, var(--accent) 30%, transparent))',
                  transform: 'scaleY(1)',
                  transformOrigin: 'top center',
                }}
              />
            </div>

            {/* Mobile left spine */}
            <div
              className="absolute md:hidden"
              aria-hidden="true"
              style={{ left: 0, top: 0, bottom: 0, width: 1, background: 'var(--border)' }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, var(--accent), color-mix(in srgb, var(--accent) 30%, transparent))',
                  transform: 'scaleY(1)',
                  transformOrigin: 'top center',
                }}
              />
            </div>

            {EDUCATION_DATA.map((edu, i) => {
              const isLeft = i % 2 === 0;
              const IconComp = edu.icon;
              const idx = String(i + 1).padStart(2, '0');

              return (
                <div
                  key={edu.id}
                  style={{ position: 'relative', paddingBottom: i < EDUCATION_DATA.length - 1 ? 'clamp(56px, 8vh, 100px)' : 0 }}
                >
                  {/* Desktop bilateral layout */}
                  <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 56px 1fr' }}>
                    {/* Left slot */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '3rem' }}>
                      {isLeft && (
                        <div style={{ maxWidth: 300, width: '100%' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div
                              style={{
                                fontFamily: 'Menlo, monospace',
                                fontSize: '10px',
                                letterSpacing: '0.16em',
                                color: 'var(--accent)',
                                marginBottom: '0.5rem',
                              }}
                            >
                              {edu.period}
                            </div>

                            <div
                              aria-hidden="true"
                              className="font-display"
                              style={{
                                fontSize: 'clamp(52px, 7vw, 88px)',
                                fontWeight: 900,
                                letterSpacing: '-0.04em',
                                color: 'var(--accent)',
                                opacity: 0.12,
                                lineHeight: 1,
                                marginBottom: '-0.12em',
                                userSelect: 'none',
                                pointerEvents: 'none',
                              }}
                            >
                              {edu.period.split('—')[0].trim()}
                            </div>

                            <div style={{ display: 'flex', marginBottom: '0.75rem', justifyContent: 'flex-end' }}>
                              <span
                                style={{
                                  fontSize: '9px',
                                  fontFamily: 'Menlo, monospace',
                                  letterSpacing: '0.12em',
                                  color: 'var(--accent)',
                                  textTransform: 'uppercase',
                                  padding: '3px 8px',
                                  border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                                  borderRadius: '2px',
                                }}
                              >
                                {edu.degree.split(' in ')[0]}
                              </span>
                            </div>

                            <h3
                              className="font-display"
                              style={{
                                fontSize: 'clamp(18px, 2.2vw, 26px)',
                                fontWeight: 600,
                                letterSpacing: '-0.02em',
                                color: 'var(--text-primary)',
                                marginBottom: '0.625rem',
                              }}
                            >
                              {edu.institution}
                            </h3>

                            <p
                              style={{
                                fontSize: 'clamp(13px, 1vw, 15px)',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                maxWidth: 280,
                              }}
                            >
                              {edu.description}
                            </p>

                            <div style={{ marginTop: '1rem' }}>
                              <span className="text-sm font-mono text-[var(--accent)]">
                                {edu.score}
                              </span>
                              <span className="text-xs text-[var(--text-tertiary)] ml-2">
                                {edu.scoreLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Centre — dot */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 12 }}>
                      {/* Connector line */}
                      <div
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          top: 17,
                          height: 1,
                          width: 64,
                          background: 'var(--border-bright)',
                          ...(isLeft
                            ? { right: 'calc(50% + 5px)', transformOrigin: 'right center' }
                            : { left: 'calc(50% + 5px)', transformOrigin: 'left center' }),
                          transform: 'scaleX(1)',
                          transition: 'transform 0.5s ease 0.3s',
                        }}
                      />

                      {/* Dot */}
                      <div
                        aria-hidden="true"
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: '50%',
                          background: 'var(--bg-base)',
                          border: `2px solid var(--accent)`,
                          boxShadow: '0 0 0 5px color-mix(in srgb, var(--accent) 12%, transparent), 0 0 0 10px color-mix(in srgb, var(--accent) 5%, transparent)',
                          position: 'relative',
                          zIndex: 2,
                          flexShrink: 0,
                        }}
                      />
                    </div>

                    {/* Right slot */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '3rem' }}>
                      {!isLeft && (
                        <div style={{ maxWidth: 300, width: '100%' }}>
                          <div style={{ textAlign: 'left' }}>
                            <div
                              style={{
                                fontFamily: 'Menlo, monospace',
                                fontSize: '10px',
                                letterSpacing: '0.16em',
                                color: 'var(--accent)',
                                marginBottom: '0.5rem',
                              }}
                            >
                              {edu.period}
                            </div>

                            <div
                              aria-hidden="true"
                              className="font-display"
                              style={{
                                fontSize: 'clamp(52px, 7vw, 88px)',
                                fontWeight: 900,
                                letterSpacing: '-0.04em',
                                color: 'var(--accent)',
                                opacity: 0.12,
                                lineHeight: 1,
                                marginBottom: '-0.12em',
                                userSelect: 'none',
                                pointerEvents: 'none',
                              }}
                            >
                              {edu.period.split('—')[0].trim()}
                            </div>

                            <div style={{ display: 'flex', marginBottom: '0.75rem', justifyContent: 'flex-start' }}>
                              <span
                                style={{
                                  fontSize: '9px',
                                  fontFamily: 'Menlo, monospace',
                                  letterSpacing: '0.12em',
                                  color: 'var(--accent)',
                                  textTransform: 'uppercase',
                                  padding: '3px 8px',
                                  border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                                  borderRadius: '2px',
                                }}
                              >
                                {edu.degree.split(' in ')[0]}
                              </span>
                            </div>

                            <h3
                              className="font-display"
                              style={{
                                fontSize: 'clamp(18px, 2.2vw, 26px)',
                                fontWeight: 600,
                                letterSpacing: '-0.02em',
                                color: 'var(--text-primary)',
                                marginBottom: '0.625rem',
                              }}
                            >
                              {edu.institution}
                            </h3>

                            <p
                              style={{
                                fontSize: 'clamp(13px, 1vw, 15px)',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                maxWidth: 280,
                              }}
                            >
                              {edu.description}
                            </p>

                            <div style={{ marginTop: '1rem' }}>
                              <span className="text-sm font-mono text-[var(--accent)]">
                                {edu.score}
                              </span>
                              <span className="text-xs text-[var(--text-tertiary)] ml-2">
                                {edu.scoreLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile single-column layout */}
                  <div className="md:hidden" style={{ paddingLeft: '2rem', position: 'relative' }}>
                    {/* Mobile dot */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: -5,
                        top: 18,
                        width: 11,
                        height: 11,
                        borderRadius: '50%',
                        background: 'var(--bg-base)',
                        border: '2px solid var(--accent)',
                        boxShadow: '0 0 0 4px color-mix(in srgb, var(--accent) 10%, transparent)',
                        zIndex: 2,
                      }}
                    />

                    <div>
                      <div
                        style={{
                          fontFamily: 'Menlo, monospace',
                          fontSize: '10px',
                          letterSpacing: '0.16em',
                          color: 'var(--accent)',
                          marginBottom: '0.4rem',
                        }}
                      >
                        {edu.period}
                      </div>

                      <div
                        aria-hidden="true"
                        className="font-display"
                        style={{
                          fontSize: 'clamp(44px, 10vw, 60px)',
                          fontWeight: 900,
                          letterSpacing: '-0.04em',
                          color: 'var(--accent)',
                          opacity: 0.15,
                          lineHeight: 1,
                          marginBottom: '-0.05em',
                          userSelect: 'none',
                        }}
                      >
                        {edu.period.split('—')[0].trim()}
                      </div>

                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '9px',
                          fontFamily: 'Menlo, monospace',
                          letterSpacing: '0.12em',
                          color: 'var(--accent)',
                          textTransform: 'uppercase',
                          padding: '3px 8px',
                          border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                          borderRadius: '2px',
                          marginBottom: '0.75rem',
                        }}
                      >
                        {edu.degree.split(' in ')[0]}
                      </span>

                      <h3
                        className="font-display"
                        style={{
                          fontSize: 'clamp(17px, 4.5vw, 22px)',
                          fontWeight: 600,
                          letterSpacing: '-0.02em',
                          color: 'var(--text-primary)',
                          marginBottom: '0.5rem',
                          display: 'block',
                        }}
                      >
                        {edu.institution}
                      </h3>

                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
                        {edu.description}
                      </p>

                      <div style={{ marginTop: '1rem' }}>
                        <span className="text-sm font-mono text-[var(--accent)]">
                          {edu.score}
                        </span>
                        <span className="text-xs text-[var(--text-tertiary)] ml-2">
                          {edu.scoreLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mobile separator after Education */}
        <div className="md:hidden h-[3px] bg-[var(--accent)] mx-6 mb-24" />

        {/* ======================= ACHIEVEMENTS & CERTIFICATIONS ======================= */}
        <section id="achievements" className="mb-0">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-medium">
              Recognitions & Milestones
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-1">
              Achievements & Certifications
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
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

          {/* Achievement Cards - How I Work Style */}
          <div>
            {filteredAchievements.map((item, i) => {
              const num = String(i + 1).padStart(2, '0');
              const isHovered = !isMobile && hoveredAchievement === i;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => { if (!isMobile) setHoveredAchievement(i); }}
                  onMouseLeave={() => { if (!isMobile) setHoveredAchievement(null); }}
                  style={{
                    position: 'relative',
                    padding: `clamp(3rem, 6vh, 5rem) 5vw`,
                    overflow: 'hidden',
                    cursor: 'default',
                  }}
                >
                  {/* Left accent strip — hover only */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '2px',
                      background: 'linear-gradient(to bottom, var(--accent), color-mix(in srgb, var(--accent) 15%, transparent))',
                      boxShadow: isHovered ? '0 0 18px color-mix(in srgb, var(--accent) 50%, transparent)' : 'none',
                      transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'top',
                      transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                    }}
                  />

                  {/* Top rule */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: isHovered
                        ? 'linear-gradient(to right, var(--accent) 0%, color-mix(in srgb, var(--accent) 18%, transparent) 25%, #1a1a22 60%)'
                        : '#1a1a22',
                      transform: 'scaleX(1)',
                      transformOrigin: 'left',
                      transition: 'background 0.35s ease',
                    }}
                  />

                  {/* Subtle hover background glow */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(ellipse 70% 100% at 0% 50%, color-mix(in srgb, var(--accent) 4%, transparent) 0%, transparent 70%)',
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Massive watermark numeral */}
                  <div
                    aria-hidden="true"
                    className="font-display"
                    style={{
                      position: 'absolute',
                      right: isMobile ? '0%' : '4%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontWeight: 900,
                      fontSize: isMobile ? 'clamp(120px, 40vw, 220px)' : 'clamp(140px, 20vw, 320px)',
                      lineHeight: 1,
                      letterSpacing: '-0.07em',
                      color: isHovered ? 'var(--accent)' : 'var(--text-primary)',
                      opacity: isHovered ? 0.1 : 0.07,
                      transition: 'opacity 0.4s ease, color 0.4s ease',
                      userSelect: 'none',
                      pointerEvents: 'none',
                      zIndex: 0,
                    }}
                  >
                    {num}
                  </div>

                  {/* Content layout */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'clamp(140px, 18%, 220px) 1fr',
                      gap: isMobile ? '1.5rem' : 'clamp(2rem, 4vw, 6rem)',
                      alignItems: 'center',
                      minHeight: isMobile ? undefined : 'clamp(10rem, 18vh, 16rem)',
                    }}
                  >
                    {/* Left: badge + counter */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'row' : 'column',
                        alignItems: isMobile ? 'center' : 'flex-start',
                        gap: isMobile ? '1rem' : '0.75rem',
                      }}
                    >
                      {/* Category badge */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontFamily: 'Menlo, monospace',
                          fontSize: '9px',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: isHovered ? 'var(--accent)' : '#2e2e3a',
                          border: `1px solid ${isHovered ? 'color-mix(in srgb, var(--accent) 35%, transparent)' : 'rgba(255,255,255,0.05)'}`,
                          padding: '4px 8px',
                          borderRadius: '2px',
                          transition: 'color 0.35s ease, border-color 0.35s ease',
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: isHovered ? 'var(--accent)' : 'transparent',
                            border: isHovered ? 'none' : '1px solid #3a3a44',
                            flexShrink: 0,
                            transition: 'background 0.35s ease, border-color 0.35s ease',
                          }}
                        />
                        {item.badge}
                      </div>

                      {/* Year counter */}
                      <div
                        style={{
                          fontFamily: 'Menlo, monospace',
                          fontSize: '11px',
                          color: isHovered ? 'var(--accent)' : '#252530',
                          letterSpacing: '0.08em',
                          transition: 'color 0.35s ease',
                        }}
                      >
                        {item.year}
                      </div>
                    </div>

                    {/* Right: title + description */}
                    <div>
                      <h3
                        className="font-display"
                        style={{
                          fontWeight: 700,
                          fontSize: 'clamp(20px, 2.5vw, 32px)',
                          letterSpacing: '-0.03em',
                          color: 'var(--text-primary)',
                          lineHeight: 1.1,
                          margin: '0 0 clamp(0.875rem, 1.5vh, 1.25rem) 0',
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Accent underline — hover only */}
                      <div
                        aria-hidden="true"
                        style={{
                          height: '1px',
                          background: 'linear-gradient(to right, color-mix(in srgb, var(--accent) 40%, transparent), transparent 65%)',
                          width: isHovered ? '55%' : '0%',
                          marginBottom: 'clamp(0.875rem, 1.5vh, 1.25rem)',
                          transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />

                      <p
                        style={{
                          fontSize: 'clamp(13px, 1vw, 15px)',
                          color: isHovered ? '#b0b0ba' : 'var(--text-secondary)',
                          lineHeight: 1.8,
                          margin: 0,
                          maxWidth: '520px',
                          transition: 'color 0.35s ease',
                        }}
                      >
                        {item.summary}
                      </p>

                      <div style={{ marginTop: '1rem' }}>
                        <p className="text-xs font-semibold text-[var(--text-secondary)]">
                          Issued by: <span className="text-[var(--text-primary)]">{item.issuer}</span>
                        </p>
                      </div>

                      <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)/70' }}>
                        <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                          {item.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div
              aria-hidden="true"
              style={{
                margin: '0 5vw',
                height: '1px',
                backgroundColor: '#1a1a22',
              }}
            />
          </div>
        </section>

        {/* Mobile separator */}
        <div className="md:hidden h-[3px] bg-[var(--accent)] mx-6 mb-24" />

        {/* ======================= BOTTOM BANNER & CTA ======================= */}
        <section className="mb-0">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-medium">
              Contact
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-1">
              Let's Work Together
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              Looking for software development engineering (SDE) roles, full-stack development, and innovative tech teams.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider bg-[var(--accent)] text-[var(--bg-base)] hover:opacity-90 transition-opacity shadow-sm"
              >
                <Mail size={14} />
                <span>Send an Email</span>
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider border border-[var(--border-bright)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                <ArrowLeft size={14} />
                <span>Return to Portfolio</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

