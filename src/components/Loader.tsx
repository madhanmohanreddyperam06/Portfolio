import { useEffect, useState } from 'react';
import meta from '../data/meta.json';

const OWNER = meta.name;

/**
 * Cinematic Letter Reveal Loader
 * Enhanced typewriter effect with cinematic background elements
 * Total runtime ~4s
 */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [text, setText] = useState('');
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { onComplete(); return; }

    // Show background elements after short delay
    const elementsTimer = setTimeout(() => setShowElements(true), 500);

    // Type effect
    let index = 0;
    const textInterval = setInterval(() => {
      if (index <= OWNER.length) {
        setText(OWNER.slice(0, index));
        index++;
      } else {
        clearInterval(textInterval);
      }
    }, 250);

    const exitTimer = setTimeout(() => setExiting(true), 5000);
    const doneTimer = setTimeout(onComplete, 5500);
    return () => {
      clearTimeout(elementsTimer);
      clearInterval(textInterval);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  // Split text into "Madhan " and "DEV" for different colors
  const whitePart = text.split('DEV')[0] || '';
  const coloredPart = text.includes('DEV') ? text.slice(whitePart.length) : '';

  return (
    <div
      className="fixed inset-0 z-[100] bg-[var(--bg-base)] flex items-center justify-center overflow-hidden"
      style={{
        opacity: exiting ? 0 : 1,
        transition: 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      <style>{`
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes blur-in {
          0% { filter: blur(10px); opacity: 0; }
          100% { filter: blur(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-ring {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        @keyframes scan-line {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes vignette-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        .cursor {
          animation: cursor-blink 0.8s infinite;
        }
        .blur-in {
          animation: blur-in 0.3s ease-out forwards;
        }
        .fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .scale-ring {
          animation: scale-ring 3s ease-out infinite;
        }
        .float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        .scan-line {
          animation: scan-line 2.5s linear infinite;
        }
        .vignette-pulse {
          animation: vignette-pulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none vignette-pulse"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, color-mix(in srgb, var(--bg-base) 85%, transparent) 100%)',
        }}
      />

      {/* Animated background rings */}
      {showElements && (
        <>
          <div
            className="scale-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]/20"
            style={{ width: '300px', height: '300px', animationDelay: '0s' }}
          />
          <div
            className="scale-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]/10"
            style={{ width: '450px', height: '450px', animationDelay: '0.5s' }}
          />
          <div
            className="scale-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]/5"
            style={{ width: '600px', height: '600px', animationDelay: '1s' }}
          />
        </>
      )}

      {/* Floating particles */}
      {showElements && (
        <>
          <div
            className="float-particle absolute w-2 h-2 rounded-full bg-[var(--accent)]/30"
            style={{ left: '20%', top: '30%', animationDelay: '0s' }}
          />
          <div
            className="float-particle absolute w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40"
            style={{ left: '80%', top: '25%', animationDelay: '0.5s' }}
          />
          <div
            className="float-particle absolute w-2.5 h-2.5 rounded-full bg-[var(--accent)]/20"
            style={{ left: '15%', top: '70%', animationDelay: '1s' }}
          />
          <div
            className="float-particle absolute w-1 h-1 rounded-full bg-[var(--accent)]/50"
            style={{ left: '85%', top: '65%', animationDelay: '1.5s' }}
          />
        </>
      )}

      {/* Scan line effect */}
      {showElements && (
        <div className="scan-line absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
      )}

      {/* Main content */}
      <div className="relative z-10 text-center">
        <h1
          className="fade-in-up text-3xl md:text-5xl font-bold tracking-tight"
          style={{ fontFamily: "'Times New Roman', Times, serif", opacity: 0 }}
        >
          <span className="text-[var(--text-primary)]">{whitePart}</span>
          <span className="text-[var(--accent)] blur-in" style={{ animationDelay: '0.1s' }}>{coloredPart}</span>
          <span className="cursor text-[var(--accent)]">|</span>
        </h1>

        {/* Subtle progress indicator */}
        {showElements && (
          <div
            className="fade-in-up mt-8 flex items-center justify-center gap-2"
            style={{ opacity: 0, animationDelay: '0.3s' }}
          >
            <div className="w-16 h-[1px] bg-[var(--border)]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
              Loading
            </span>
            <div className="w-16 h-[1px] bg-[var(--border)]" />
          </div>
        )}
      </div>
    </div>
  );
}
