import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';
import meta from '../data/meta.json';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Profile',   href: '/about' },
  { label: 'Journey',    href: '#journey' },
  { label: 'LeetCode',   href: '#leetcode' },
  { label: 'Experience', href: '#experience' },
  { label: 'Toolkit',    href: '#toolkit' },
  { label: 'Work',       href: '#projects' },
];

const DESKTOP_SECTIONS = [
  { num: '01', label: 'Profile',              href: '/about',       isRoute: true },
  { num: '02', label: 'Journey',              href: '#journey',     isRoute: false },
  { num: '03', label: 'LeetCode Analytics',   href: '#leetcode',    isRoute: false },
  { num: '04', label: 'Experience',          href: '#experience',  isRoute: false },
  { num: '05', label: 'Toolkit',              href: '#toolkit',     isRoute: false },
  { num: '06', label: 'Work & Projects',      href: '#projects',    isRoute: false },
  { num: '07', label: 'Principles',           href: '/principles',  isRoute: true },
  { num: '08', label: "Let's Talk",           href: '#contact',     isRoute: false },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        window.location.href = '/' + href;
        return;
      }
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  // Scroll progress + active section tracking
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Scroll progress bar
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      if (progressRef.current) {
        progressRef.current.style.width = `${Math.min((scrollTop / maxScroll) * 100, 100)}%`;
      }

      // Active section detection
      const sections = ['journey', 'leetcode', 'experience', 'toolkit', 'projects'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll and listen for Escape key when desktop menu is expanded
  useEffect(() => {
    if (desktopMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDesktopMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [desktopMenuOpen]);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="scroll-progress-bar"
        aria-hidden="true"
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300 ${
          desktopMenuOpen || mobileOpen
            ? 'bg-[var(--bg-base)] border-b border-[var(--border)]'
            : scrolled
              ? 'bg-[var(--bg-base)]/90 backdrop-blur-md border-b border-[var(--border)]/40 md:bg-transparent md:backdrop-blur-none md:border-transparent'
              : ''
        }`}
      >
        <div className="container-layout flex items-center justify-between gap-4">

          {/* Logo / Monogram */}
          <a
            href="/"
            className="group flex items-center gap-3 shrink-0"
            onClick={e => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                setDesktopMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <span className="font-display font-bold text-[var(--text-primary)] text-sm tracking-tight">
              Madhan DEV
            </span>
          </a>

          {/* Desktop Right: Theme Toggle + Desktop Hamburger Button */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            <button
              onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
              className="w-9 h-9 flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
              aria-label={desktopMenuOpen ? "Close menu" : "Open menu"}
              title={desktopMenuOpen ? "Close menu (ESC)" : "Navigation Menu"}
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                {desktopMenuOpen ? (
                  <>
                    <path d="M1 1L17 11" />
                    <path d="M17 1L1 11" />
                  </>
                ) : (
                  <>
                    <line x1="0" y1="1" x2="18" y2="1" />
                    <line x1="0" y1="6" x2="18" y2="6" />
                    <line x1="0" y1="11" x2="18" y2="11" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Right: Theme Toggle + Hamburger */}
          <div className="md:hidden ml-auto flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button
              className="w-9 h-9 flex items-center justify-center text-[var(--text-primary)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                {mobileOpen
                  ? <><path d="M1 1L17 11"/><path d="M17 1L1 11"/></>
                  : <><line x1="0" y1="1" x2="18" y2="1"/><line x1="0" y1="6" x2="18" y2="6"/><line x1="0" y1="11" x2="18" y2="11"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-[30rem] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="container-layout pt-4 pb-6 flex flex-col gap-1.5 border-t border-[var(--border)] mt-4">
            {NAV_LINKS.map(link => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border-b border-[var(--border)]/40"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border-b border-[var(--border)]/40"
                  onClick={(e) => {
                    setMobileOpen(false);
                    handleScroll(e, link.href);
                  }}
                >
                  {link.label}
                </a>
              )
            ))}

            <a
              href="#contact"
              className="mt-2 py-3 text-sm font-medium text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors"
              onClick={(e) => {
                setMobileOpen(false);
                handleScroll(e, '#contact');
              }}
            >
              Let's Talk →
            </a>
          </div>
        </div>
      </nav>

      {/* Fullscreen Desktop Menu Overlay */}
      <div
        className={`hidden md:flex fixed inset-0 z-40 bg-[var(--bg-base)]/98 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          desktopMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Ambient subtle glow */}
        <div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 7%, transparent) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="container-layout w-full h-full pt-28 pb-10 flex flex-col justify-between relative z-10 overflow-y-auto">
          {/* Main Content Area */}
          <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center my-auto">
            {/* Left: Sections List */}
            <div className="col-span-6 pr-4">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] mb-4 block">
                Index / Navigation
              </span>
              <div className="divide-y divide-[var(--border)]/30">
                {DESKTOP_SECTIONS.map((sec) => {
                  const isCurrent = sec.isRoute
                    ? window.location.pathname === sec.href
                    : activeSection === sec.href.slice(1);

                  return sec.isRoute ? (
                    <Link
                      key={sec.label}
                      to={sec.href}
                      onClick={() => setDesktopMenuOpen(false)}
                      className="group flex items-baseline justify-between py-3.5 transition-all duration-300"
                    >
                      <div className="flex items-baseline gap-5">
                        <span className="font-mono text-xs text-[var(--accent)]/70 group-hover:text-[var(--accent)] transition-colors">
                          {sec.num}
                        </span>
                        <span
                          className={`text-2xl lg:text-3xl font-display font-semibold tracking-tight transition-all duration-300 ${
                            isCurrent
                              ? 'text-[var(--accent)] translate-x-2'
                              : 'text-[var(--text-primary)] group-hover:text-[var(--accent)] group-hover:translate-x-3'
                          }`}
                        >
                          {sec.label}
                        </span>
                      </div>
                      <span className="text-sm font-mono text-[var(--accent)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </Link>
                  ) : (
                    <a
                      key={sec.label}
                      href={sec.href}
                      onClick={(e) => {
                        setDesktopMenuOpen(false);
                        handleScroll(e, sec.href);
                      }}
                      className="group flex items-baseline justify-between py-3.5 transition-all duration-300"
                    >
                      <div className="flex items-baseline gap-5">
                        <span className="font-mono text-xs text-[var(--accent)]/70 group-hover:text-[var(--accent)] transition-colors">
                          {sec.num}
                        </span>
                        <span
                          className={`text-2xl lg:text-3xl font-display font-semibold tracking-tight transition-all duration-300 ${
                            isCurrent
                              ? 'text-[var(--accent)] translate-x-2'
                              : 'text-[var(--text-primary)] group-hover:text-[var(--accent)] group-hover:translate-x-3'
                          }`}
                        >
                          {sec.label}
                        </span>
                      </div>
                      <span className="text-sm font-mono text-[var(--accent)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right: Info / Direct Links with generous area & larger typography */}
            <div className="col-span-6 pl-8 lg:pl-12 border-l border-[var(--border)]/40 flex flex-col justify-between py-2 space-y-7">
              <div>
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[var(--accent)] block mb-2">
                  Identity
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-[var(--text-primary)] font-display">
                  Peram Madhan Mohan Reddy
                </h3>
                <p className="text-sm lg:text-base text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                  Developer · Cuddapah, Andhra Pradesh, India
                </p>
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[var(--accent)] block mb-2">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:madhanmohanreddyperam06@gmail.com"
                  className="text-base lg:text-lg font-mono text-[var(--accent)] hover:underline block break-all tracking-wide"
                >
                  madhanmohanreddyperam06@gmail.com
                </a>
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[var(--accent)] block mb-2.5">
                  Social Profiles
                </span>
                <div className="flex flex-col gap-2.5 text-sm lg:text-base">
                  <a
                    href="https://github.com/madhanmohanreddyperam06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center justify-between group"
                  >
                    <span>GitHub</span>
                    <span className="text-xs font-mono text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/madhan-mohan-reddy-peram-63181b253"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center justify-between group"
                  >
                    <span>LinkedIn</span>
                    <span className="text-xs font-mono text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                  <a
                    href="https://leetcode.com/u/madhanmohanreddyperam06/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center justify-between group"
                  >
                    <span>LeetCode</span>
                    <span className="text-xs font-mono text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                  <a
                    href="https://www.hackerrank.com/profile/h99220041310"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center justify-between group"
                  >
                    <span>HackerRank</span>
                    <span className="text-xs font-mono text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/Peram_Madhan_Mohan_Reddy_Resume_.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded text-sm font-semibold uppercase tracking-wider bg-[var(--accent)] text-[var(--bg-base)] hover:opacity-90 transition-opacity shadow-sm"
                >
                  <span>Download Resume (PDF)</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer note inside fullscreen menu */}
          <div className="pt-4 border-t border-[var(--border)]/30 flex items-center justify-between text-[11px] text-[var(--text-tertiary)]">
            <span className="font-mono">Press ESC or click any section to close</span>
            <span>© {new Date().getFullYear()} Peram Madhan Mohan Reddy</span>
          </div>
        </div>
      </div>
    </>
  );
}
