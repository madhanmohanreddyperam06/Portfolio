import { useEffect, useState } from 'react';
import meta from '../data/meta.json';

const OWNER = meta.name;

/**
 * Cinematic Spotlight Loader
 * Dramatic spotlight effect with dramatic reveal
 * Duration: ~4s total
 */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { onComplete(); return; }

    // Animate spotlight intensity
    let progress = 0;
    const animate = () => {
      progress += 0.005;
      if (progress <= 1) {
        setIntensity(Math.sin(progress * Math.PI) * 100);
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    const exitTimer = setTimeout(() => setExiting(true), 5500);
    const doneTimer = setTimeout(onComplete, 6000);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[var(--bg-base)] flex items-center justify-center overflow-hidden"
      style={{
        opacity: exiting ? 0 : 1,
        transition: 'opacity 600ms ease-out',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      <style>{`
        @keyframes spotlight-sweep {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100vw) rotate(45deg); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px color-mix(in srgb, var(--accent) 20%, transparent); }
          50% { text-shadow: 0 0 60px color-mix(in srgb, var(--accent) 50%, transparent); }
        }
        @keyframes curtain-rise {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .spotlight-sweep {
          animation: spotlight-sweep 2s ease-in-out forwards;
        }
        .text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }
        .curtain-rise {
          animation: curtain-rise 1s ease-out 1.5s forwards;
        }
        .fade-in {
          animation: fade-in 1s ease-out 1.5s forwards;
        }
      `}</style>

      {/* Top curtain */}
      <div
        className="curtain-rise absolute top-0 left-0 right-0 h-1/2 bg-[var(--bg-base)] z-20"
        style={{ opacity: 0 }}
      />

      {/* Bottom curtain */}
      <div
        className="curtain-rise absolute bottom-0 left-0 right-0 h-1/2 bg-[var(--bg-base)] z-20"
        style={{ opacity: 0, animationDelay: '1.5s' }}
      />

      {/* Spotlight beam */}
      <div
        className="spotlight-sweep absolute top-0 left-0 w-[200px] h-[200%]"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent)/30, transparent)',
          opacity: 0,
          animationDelay: '0.5s',
        }}
      />

      {/* Central glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, color-mix(in srgb, var(--accent) ${intensity * 0.3}%, transparent) 0%, transparent 70%)`,
        }}
      />

      {/* Main content */}
      <div className="relative z-30 text-center fade-in" style={{ opacity: 0 }}>
        <h1
          className="text-glow text-3xl md:text-6xl font-bold tracking-tight"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
          }}
        >
          {OWNER}
        </h1>

        {/* Dramatic divider */}
        <div
          className="mt-8 mx-auto h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          style={{ width: '200px' }}
        />
      </div>
    </div>
  );
}
