import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Download } from 'lucide-react';
import experience from '../data/experience.json';

interface ActivePdfModal {
  url: string;
  title: string;
  subtitle: string;
}

type Exp = (typeof experience)[number];

function SplitText({ text, isActive }: { text: string; isActive: boolean }) {
  return (
    <span role="text" aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            opacity: isActive ? 1 : 0,
            filter: isActive ? 'blur(0px)' : 'blur(14px)',
            transform: isActive ? 'translateX(0px) translateY(0px)' : 'translateX(-30px) translateY(4px)',
            transition: isActive
              ? `opacity 0.65s ease ${i * 0.038}s, filter 0.65s ease ${i * 0.038}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.038}s`
              : 'opacity 0.2s ease, filter 0.2s ease, transform 0.2s ease',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

function Typewriter({
  text,
  isActive,
  delay = 0,
}: {
  text: string;
  isActive: boolean;
  delay?: number;
}) {
  const [shown, setShown] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itvRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (itvRef.current) clearInterval(itvRef.current);

    if (!isActive) {
      setShown('');
      return;
    }

    let idx = 0;
    timerRef.current = setTimeout(() => {
      itvRef.current = setInterval(() => {
        idx++;
        setShown(text.slice(0, idx));
        if (idx >= text.length && itvRef.current) clearInterval(itvRef.current);
      }, 34);
    }, delay * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (itvRef.current) clearInterval(itvRef.current);
    };
  }, [isActive, text, delay]);

  const done = shown.length >= text.length;

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{shown}</span>
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '2px',
          height: '0.85em',
          background: 'var(--accent)',
          marginLeft: '1px',
          verticalAlign: 'text-bottom',
          opacity: done ? 0 : 1,
          transition: done ? 'opacity 0.4s ease 0.6s' : 'none',
        }}
      />
    </span>
  );
}

function DesktopChapter({
  exp,
  isActive,
  onOpenCredential,
}: {
  exp: Exp;
  isActive: boolean;
  onOpenCredential?: (url: string, title: string, subtitle: string) => void;
}) {
  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', paddingRight: '8rem' }}>
      <h3
        className="font-display font-bold leading-none"
        style={{
          fontSize: 'clamp(56px, 9vw, 130px)',
          letterSpacing: '-0.035em',
          color: 'var(--text-primary)',
          marginBottom: '1.75rem',
          lineHeight: 0.92,
        }}
      >
        <SplitText text={exp.company} isActive={isActive} />
      </h3>

      <div
        aria-hidden="true"
        style={{
          height: '1px',
          backgroundColor: 'var(--text-primary)',
          opacity: isActive ? 0.14 : 0,
          width: isActive ? '100%' : '0%',
          transition: isActive
            ? 'width 1.05s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 0.45s ease 0.2s'
            : 'opacity 0.2s ease',
          marginBottom: '2.5rem',
        }}
      />

      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{
            color: 'var(--accent)',
            fontWeight: 600,
            fontSize: 'clamp(14px, 1.4vw, 20px)',
            letterSpacing: '0.01em',
            marginBottom: '0.45rem',
            minHeight: '1.6em',
          }}
        >
          <Typewriter text={exp.role} isActive={isActive} delay={0.5} />
        </div>
        <div
          style={{
            fontFamily: 'Menlo, monospace',
            fontSize: '10px',
            color: 'var(--text-tertiary)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            opacity: isActive ? 1 : 0,
            transition: isActive ? 'opacity 0.5s ease 1.05s' : 'opacity 0.15s ease',
          }}
        >
          {exp.period}
        </div>
      </div>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: 'clamp(14px, 1.15vw, 17px)',
          lineHeight: 1.85,
          maxWidth: '520px',
          marginBottom: '2.5rem',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(22px)',
          transition: isActive
            ? 'opacity 0.65s ease 0.88s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.88s'
            : 'opacity 0.15s ease, transform 0.15s ease',
        }}
      >
        {exp.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem 2rem' }}>
        {exp.highlights.map((hl, j) => (
          <div
            key={j}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateX(0)' : 'translateX(-20px)',
              transition: isActive
                ? `opacity 0.45s ease ${1.0 + j * 0.09}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${1.0 + j * 0.09}s`
                : 'opacity 0.15s ease, transform 0.15s ease',
            }}
          >
            <span style={{ color: 'var(--accent)', fontSize: '10px', lineHeight: 1, flexShrink: 0 }}>→</span>
            {hl}
          </div>
        ))}
      </div>

      {/* Action Links: Credential & View Application */}
      <div
        style={{
          marginTop: '2.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(14px)',
          transition: isActive
            ? 'opacity 0.5s ease 1.25s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.25s'
            : 'opacity 0.15s ease',
        }}
      >
        <button
          type="button"
          onClick={() =>
            onOpenCredential?.(
              (exp as any).credentialUrl || '/ViswamAI_Certificate.pdf',
              exp.role,
              exp.company
            )
          }
          className="text-[var(--text-primary)] underline underline-offset-4 decoration-1 decoration-[var(--text-primary)] hover:opacity-80 transition-opacity duration-200 cursor-pointer text-xs font-semibold bg-transparent border-0 p-0 inline-flex items-center gap-1"
        >
          <span>CREDENTIAL</span>
        </button>

        <span className="text-[var(--text-tertiary)] select-none text-xs" aria-hidden="true">
          |
        </span>

        <a
          href={(exp as any).applicationUrl || 'https://viswam.ai'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-primary)] underline underline-offset-4 decoration-1 decoration-[var(--text-primary)] hover:opacity-80 transition-opacity duration-200 cursor-pointer text-xs font-semibold inline-flex items-center gap-1"
        >
          <span>VIEW APPLICATION</span>
        </a>
      </div>
    </div>
  );
}

function MobileChapter({
  exp,
  isActive,
  onOpenCredential,
}: {
  exp: Exp;
  isActive: boolean;
  onOpenCredential?: (url: string, title: string, subtitle: string) => void;
}) {
  return (
    <div>
      <h3
        className="font-display font-bold leading-none text-[var(--text-primary)]"
        style={{
          fontSize: 'clamp(38px, 12vw, 58px)',
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
        }}
      >
        {exp.company}
      </h3>
      <div
        style={{ height: '1px', backgroundColor: 'var(--text-primary)', opacity: 0.1, marginBottom: '1.25rem' }}
      />
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '14px', marginBottom: '0.3rem' }}>
          {exp.role}
        </div>
        <div
          style={{
            fontFamily: 'Menlo, monospace',
            fontSize: '10px',
            color: 'var(--text-tertiary)',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
          }}
        >
          {exp.period}
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
        {exp.description}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {exp.highlights.map((hl, j) => (
          <div
            key={j}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateX(0)' : 'translateX(-14px)',
              transition: `opacity 0.4s ease ${j * 0.08}s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${j * 0.08}s`,
            }}
          >
            <span style={{ color: 'var(--accent)', fontSize: '10px', flexShrink: 0 }}>→</span>
            {hl}
          </div>
        ))}
      </div>

      {/* Action Links: Credential & View Application */}
      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(12px)',
          transition: isActive
            ? 'opacity 0.5s ease 0.45s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.45s'
            : 'opacity 0.15s ease',
        }}
      >
        <button
          type="button"
          onClick={() =>
            onOpenCredential?.(
              (exp as any).credentialUrl || '/ViswamAI_Certificate.pdf',
              exp.role,
              exp.company
            )
          }
          className="text-[var(--text-primary)] underline underline-offset-4 decoration-1 decoration-[var(--text-primary)] hover:opacity-80 transition-opacity duration-200 cursor-pointer text-xs font-semibold bg-transparent border-0 p-0 inline-flex items-center gap-1"
        >
          <span>CREDENTIAL</span>
        </button>

        <span className="text-[var(--text-tertiary)] select-none text-xs" aria-hidden="true">
          |
        </span>

        <a
          href={(exp as any).applicationUrl || 'https://viswam.ai'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-primary)] underline underline-offset-4 decoration-1 decoration-[var(--text-primary)] hover:opacity-80 transition-opacity duration-200 cursor-pointer text-xs font-semibold inline-flex items-center gap-1"
        >
          <span>VIEW APPLICATION</span>
        </a>
      </div>
    </div>
  );
}

export default function Experience() {
  const [activeChapter, setActiveChapter] = useState<number>(-1);
  const [enteredChapters, setEnteredChapters] = useState<Set<number>>(new Set());
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activePdf, setActivePdf] = useState<ActivePdfModal | null>(null);

  useEffect(() => {
    if (!activePdf) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePdf(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener('keydown', onKey);
    };
  }, [activePdf]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      setEnteredChapters(new Set(experience.map((_, i) => i)));
      setActiveChapter(0);
      return;
    }

    const observers: IntersectionObserver[] = [];

    wrapperRefs.current.forEach((el, i) => {
      if (!el) return;

      const threshold = isMobile ? 0.18 : 0.4;

      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveChapter(i);
              setEnteredChapters(prev => {
                if (prev.has(i)) return prev;
                const next = new Set(prev);
                next.add(i);
                return next;
              });
            }
          });
        },
        { threshold }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [isMobile]);

  return (
    <section id="experience" className="relative">
      {/* ── Right-edge vertical chapter indicator (desktop only) ── */}
      <div
        aria-hidden="true"
        className="hidden lg:flex"
        style={{
          position: 'fixed',
          right: '2.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 30,
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'flex-end',
        }}
      >
        {experience.map((_, i) => {
          const isAct = activeChapter === i;
          const isPast = i < activeChapter;
          return (
            <div
              key={i}
              style={{
                height: '2px',
                width: isAct ? '28px' : '8px',
                borderRadius: '1px',
                backgroundColor: isAct ? 'var(--accent)' : isPast ? '#3a3a44' : '#1c1c22',
                boxShadow: isAct ? '0 0 10px 2px color-mix(in srgb, var(--accent) 50%, transparent)' : 'none',
                transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          );
        })}
      </div>

      {/* ── Section header ── */}
      <div
        style={{
          padding: 'clamp(4rem, 8vh, 7rem) 5vw 0',
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="eyebrow mb-4" style={{ color: 'var(--accent)' }}>Experience</div>
        <h2
          className="font-display font-medium text-[var(--text-primary)]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
        >
          Where I've worked.
        </h2>
      </div>

      {/* ── Chapters ── */}
      {experience.map((exp, i) => {
        const isActive = enteredChapters.has(i);

        if (isMobile) {
          return (
            <div
              key={i}
              ref={el => { wrapperRefs.current[i] = el; }}
              style={{
                padding: '3.5rem 5vw',
                borderTop: '1px solid var(--border)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(36px)',
                transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <MobileChapter
                exp={exp}
                isActive={isActive}
                onOpenCredential={(url, title, subtitle) => setActivePdf({ url, title, subtitle })}
              />
            </div>
          );
        }

        return (
          <div
            key={i}
            ref={el => { wrapperRefs.current[i] = el; }}
            style={{ minHeight: '100vh', position: 'relative' }}
          >
            <div
              style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                padding: '0 5vw',
              }}
            >
              <DesktopChapter
                exp={exp}
                isActive={isActive}
                onOpenCredential={(url, title, subtitle) => setActivePdf({ url, title, subtitle })}
              />
            </div>
          </div>
        );
      })}

      <div style={{ height: '5rem' }} />

      {/* ── Credential PDF Viewer Modal Pop-up via Portal ── */}
      {activePdf && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="experience-pdf-modal-title"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md transition-all duration-300"
          onClick={() => setActivePdf(null)}
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] max-h-[900px] flex flex-col rounded-xl overflow-hidden border border-[var(--border-bright)] bg-[var(--bg-elevated)] shadow-[0_20px_70px_rgba(0,0,0,0.85)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[var(--border)] bg-[var(--bg-base)] shrink-0">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest text-[#DC143C] font-mono font-medium">
                    Experience Credential • {activePdf.subtitle}
                  </span>
                </div>
                <h3
                  id="experience-pdf-modal-title"
                  className="font-display text-sm sm:text-base md:text-lg font-bold text-[var(--text-primary)] truncate"
                  title={activePdf.title}
                >
                  {activePdf.title} — {activePdf.subtitle}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activePdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-bright)] transition-colors"
                  title="Open PDF in new tab"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Open</span>
                </a>
                <a
                  href={activePdf.url}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-bright)] transition-colors"
                  title="Download PDF"
                >
                  <Download size={13} />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActivePdf(null)}
                  className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-base)] transition-colors cursor-pointer border border-transparent hover:border-[var(--border)]"
                  aria-label="Close PDF Viewer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal PDF Viewer Body */}
            <div className="relative flex-1 w-full bg-[#121216] overflow-hidden">
              <iframe
                src={`${encodeURI(activePdf.url)}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={activePdf.title}
              />
            </div>

            {/* Modal Footer (Helper hint) */}
            <div className="px-4 sm:px-6 py-2.5 text-[11px] text-[var(--text-tertiary)] border-t border-[var(--border)] bg-[var(--bg-base)] flex items-center justify-between shrink-0">
              <span className="hidden sm:inline">
                Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[10px] font-mono">ESC</kbd> or click outside to close
              </span>
              <a
                href={activePdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DC143C] hover:underline ml-auto"
              >
                Having trouble viewing preview? Click here to open directly
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
