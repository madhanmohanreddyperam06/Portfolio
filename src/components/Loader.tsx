import { useEffect, useState } from 'react';
import meta from '../data/meta.json';

const OWNER = meta.name;

/**
 * Dramatic Zoom Reveal Loader
 * Cinematic zoom effect with scale, blur, and rotation
 * Duration: ~4s total
 */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { onComplete(); return; }

    // Animate scale and opacity
    let progress = 0;
    const animate = () => {
      progress += 0.008;
      if (progress <= 1) {
        setScale(0.5 + progress * 0.5);
        setOpacity(progress);
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    const exitTimer = setTimeout(() => setExiting(true), 3500);
    const doneTimer = setTimeout(onComplete, 4000);
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
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Background rotating element */}
      <div
        className="rotate-slow absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent, var(--accent)/10, transparent, var(--accent)/5, transparent)',
          opacity: 0.5,
        }}
      />

      {/* Central glow */}
      <div
        className="pulse-glow absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 70%)',
        }}
      />

      {/* Main content with zoom effect */}
      <div
        className="relative z-10 text-center float"
        style={{
          transform: `scale(${scale})`,
          opacity,
          transition: 'transform 0.1s linear, opacity 0.1s linear',
        }}
      >
        <h1
          className="text-3xl md:text-6xl font-bold tracking-tight"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            textShadow: '0 0 40px color-mix(in srgb, var(--accent) 30%, transparent)',
          }}
        >
          {OWNER}
        </h1>

        {/* Decorative line */}
        <div
          className="mt-6 mx-auto h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          style={{ width: '200px' }}
        />
      </div>
    </div>
  );
}
