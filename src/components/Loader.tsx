import { useEffect, useState } from 'react';
import meta from '../data/meta.json';

const OWNER = meta.name.toUpperCase();

/**
 * Cinematic Anamorphic Film Reveal Loader
 * Minimal, ultra-refined, filmic widescreen reveal.
 * Duration: ~1.8s total
 */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'ignite' | 'focus' | 'reveal'>('ignite');

  useEffect(() => {
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    // Choreographed cinematic timeline
    const t1 = setTimeout(() => setPhase('focus'), 250);   // Horizontal light ignites, name resolves
    const t2 = setTimeout(() => setPhase('reveal'), 1500);  // Widescreen curtains expand open
    const t3 = setTimeout(onComplete, 2100);               // Unmount and hand off to Hero

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const isExiting = phase === 'reveal';

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#050507] overflow-hidden select-none pointer-events-none"
      style={{
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 550ms cubic-bezier(0.4, 0, 0.2, 1) 350ms',
      }}
    >
      <style>{`
        @keyframes lens-flare {
          0% { transform: scaleX(0); opacity: 0; }
          40% { opacity: 0.9; }
          100% { transform: scaleX(1); opacity: 0.4; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.25; filter: blur(30px); }
          50% { opacity: 0.6; filter: blur(45px); }
        }
      `}</style>

      {/* Top Film Shutter / Letterbox Curtain */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#050507] z-20 border-b border-[var(--border)]/40 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
        }}
      />

      {/* Bottom Film Shutter / Letterbox Curtain */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050507] z-20 border-t border-[var(--border)]/40 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: isExiting ? 'translateY(100%)' : 'translateY(0)',
        }}
      />

      {/* Center Cinematic Stage (Between Shutters) */}
      <div className="relative z-30 flex flex-col items-center justify-center w-full h-full px-6">
        {/* Soft Anamorphic Glow */}
        <div
          className="absolute w-[600px] max-w-[90vw] h-24 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 30%, transparent) 0%, transparent 70%)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />

        {/* Razor-thin Anamorphic Light Beam */}
        <div
          className="w-full max-w-[480px] h-[1px] mb-8 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)',
            animation: 'lens-flare 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        />

        {/* Subtitle / Eyebrow */}
        <p
          className="text-[10px] md:text-[11px] uppercase tracking-[0.45em] text-[var(--accent)] font-medium mb-3 transition-all duration-700"
          style={{
            opacity: phase === 'ignite' ? 0 : 0.85,
            transform: phase === 'ignite' ? 'translateY(6px)' : 'translateY(0)',
            transitionDelay: '150ms',
          }}
        >
          A Portfolio By
        </p>

        {/* Cinematic Title — Optical Blur-to-Focus Reveal */}
        <h1
          className="text-2xl sm:text-3xl md:text-5xl font-normal uppercase text-[var(--text-primary)] text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            letterSpacing: '0.28em',
            opacity: phase === 'ignite' ? 0 : 1,
            filter: phase === 'ignite' ? 'blur(16px)' : 'blur(0px)',
            transform: phase === 'ignite' ? 'scale(0.95)' : 'scale(1)',
            textShadow: '0 0 35px rgba(212, 255, 79, 0.15)',
          }}
        >
          {OWNER}
        </h1>

        {/* Lower Film Telemetry / Coordinates */}
        <div
          className="mt-6 flex items-center gap-3 text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-[var(--text-tertiary)] transition-all duration-700"
          style={{
            opacity: phase === 'ignite' ? 0 : 0.6,
            transform: phase === 'ignite' ? 'translateY(-6px)' : 'translateY(0)',
            transitionDelay: '300ms',
          }}
        >
          <span>DEVELOPER</span>
          <span className="w-1 h-1 rounded-full bg-[var(--accent)]/50" />
          <span>ANDHRA PRADESH, IN</span>
        </div>
      </div>
    </div>
  );
}
