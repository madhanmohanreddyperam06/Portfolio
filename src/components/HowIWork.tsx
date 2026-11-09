import { useEffect, useRef, useState } from 'react';
import howIWork from '../data/howIWork.json';

const PHASES = ['Discover', 'Architect', 'Execute', 'Handover', 'Deliver'];
const TOTAL = howIWork.length;

interface StepProps {
  step: (typeof howIWork)[number];
  phase: string;
  isRevealed: boolean;
  isMobile: boolean;
}

function Step({ step, phase, isRevealed, isMobile }: StepProps) {
  const num = step.step;

  return (
    <div
      style={{
        position: 'relative',
        padding: `clamp(3rem, 6vh, 5rem) 5vw`,
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Left accent strip — always visible */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(to bottom, var(--accent), color-mix(in srgb, var(--accent) 15%, transparent))',
          boxShadow: '0 0 18px color-mix(in srgb, var(--accent) 50%, transparent)',
          transform: 'scaleY(1)',
          transformOrigin: 'top',
        }}
      />

      {/* Top rule — always visible accent gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(to right, var(--accent) 0%, color-mix(in srgb, var(--accent) 25%, transparent) 35%, var(--border) 70%)',
          transform: `scaleX(${isRevealed ? 1 : 0})`,
          transformOrigin: 'left',
          transition: isRevealed
            ? 'transform 0.95s cubic-bezier(0.16, 1, 0.3, 1), background 0.35s ease'
            : 'background 0.35s ease',
        }}
      />

      {/* Subtle background glow — always visible */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 100% at 0% 50%, color-mix(in srgb, var(--accent) 4%, transparent) 0%, transparent 70%)',
          opacity: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Massive watermark numeral — always visible */}
      <div
        aria-hidden="true"
        className="font-display"
        style={{
          position: 'absolute',
          right: isMobile ? '0%' : '4%',
          top: '50%',
          transform: `translateY(-50%) scale(${isRevealed ? 1 : 0.85})`,
          fontWeight: 900,
          fontSize: isMobile ? 'clamp(120px, 40vw, 220px)' : 'clamp(140px, 20vw, 320px)',
          lineHeight: 1,
          letterSpacing: '-0.07em',
          color: 'var(--accent)',
          opacity: isRevealed ? 0.1 : 0,
          transition: 'opacity 0.4s ease, color 0.4s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
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
        {/* Left: phase badge + counter */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? '1rem' : '0.75rem',
          }}
        >
          {/* Phase badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'Menlo, monospace',
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              border: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)',
              padding: '4px 8px',
              borderRadius: '2px',
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? 'translateX(0)' : 'translateX(-10px)',
              transition: isRevealed
                ? 'opacity 0.45s ease 0.12s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.12s'
                : 'none',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--accent)',
                border: 'none',
                flexShrink: 0,
              }}
            />
            {phase}
          </div>

          {/* Step counter */}
          <div
            style={{
              fontFamily: 'Menlo, monospace',
              fontSize: '11px',
              color: 'var(--accent)',
              letterSpacing: '0.08em',
              opacity: isRevealed ? 1 : 0,
              transition: isRevealed
                ? 'opacity 0.4s ease 0.2s'
                : 'none',
            }}
          >
            {num} / {String(TOTAL).padStart(2, '0')}
          </div>
        </div>

        {/* Right: title + description */}
        <div>
          <h3
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(26px, 3.2vw, 56px)',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              margin: '0 0 clamp(0.875rem, 1.5vh, 1.25rem) 0',
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? 'translateY(0)' : 'translateY(20px)',
              transition: isRevealed
                ? 'opacity 0.6s ease 0.28s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.28s'
                : 'none',
            }}
          >
            {step.title}
          </h3>

          {/* Accent underline — always visible */}
          <div
            aria-hidden="true"
            style={{
              height: '1px',
              background: 'linear-gradient(to right, color-mix(in srgb, var(--accent) 60%, transparent), transparent 70%)',
              width: '55%',
              marginBottom: 'clamp(0.875rem, 1.5vh, 1.25rem)',
            }}
          />

          <p
            style={{
              fontSize: 'clamp(14px, 1.1vw, 16px)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              margin: 0,
              maxWidth: '520px',
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? 'translateY(0)' : 'translateY(12px)',
              transition: isRevealed
                ? 'opacity 0.5s ease 0.45s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.45s'
                : 'none',
            }}
          >
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HowIWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setRevealedSteps(new Set(howIWork.map((_, i) => i)));
      return;
    }
    const cleanups: (() => void)[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setRevealedSteps((prev) => { const n = new Set(prev); n.add(i); return n; });
            obs.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      obs.observe(el);
      cleanups.push(() => obs.disconnect());
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const headerWords = 'How I work.'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="how-i-work"
      className="container-layout section-padding"
      style={{ position: 'relative' }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 'clamp(3.5rem, 7vh, 6rem)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <div className="eyebrow mb-4" style={{ color: 'var(--accent)' }}>
            Process
          </div>
          <h2
            className="font-display"
            aria-label="How I work."
            style={{
              fontWeight: 500,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.3em',
              margin: 0,
            }}
          >
            {headerWords.map((word, i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  opacity: headerVisible ? 1 : 0,
                  transform: headerVisible ? 'translateY(0)' : 'translateY(28px)',
                  transition: `opacity 0.6s ease ${0.08 + i * 0.13}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.08 + i * 0.13}s`,
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Progress dots — track revealed steps */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            paddingBottom: '0.25rem',
            opacity: headerVisible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.4s',
          }}
        >
          {howIWork.map((_, i) => {
            const isRev = revealedSteps.has(i);
            return (
              <div
                key={i}
                aria-hidden="true"
                style={{
                  width: isRev ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: isRev ? 'var(--accent)' : '#3a3a44',
                  boxShadow: isRev ? '0 0 10px color-mix(in srgb, var(--accent) 70%, transparent)' : 'none',
                  transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.35s ease, box-shadow 0.35s ease',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Steps */}
      <div>
        {howIWork.map((step, i) => (
          <div key={i} ref={(el) => { stepRefs.current[i] = el; }}>
            <Step
              step={step}
              phase={PHASES[i]}
              isRevealed={revealedSteps.has(i)}
              isMobile={isMobile}
            />
          </div>
        ))}

        <div
          aria-hidden="true"
          style={{
            height: '1px',
            backgroundColor: '#1a1a22',
            opacity: revealedSteps.size >= TOTAL ? 1 : 0,
            transition: 'opacity 0.6s ease 0.5s',
          }}
        />
      </div>
    </section>
  );
}
