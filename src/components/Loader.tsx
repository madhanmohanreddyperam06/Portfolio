import { useEffect, useState } from 'react';
import meta from '../data/meta.json';

const OWNER = meta.name;
const ROLE = meta.role;

/**
 * Cinematic Spotlight Loader
 * Dramatic spotlight effect with dramatic reveal
 * Duration: ~6s total
 */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [intensity, setIntensity] = useState(0);
  const [roleText, setRoleText] = useState('');
  const [showMadhanDev, setShowMadhanDev] = useState(false);
  const [crimsonIndex, setCrimsonIndex] = useState(0); // 0 = none, 1 = D, 2 = DE, 3 = DEV

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

    // Type "Developer" after delay
    const typeTimer = setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= ROLE.length) {
          setRoleText(ROLE.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);
    }, 2000);

    const exitTimer = setTimeout(() => setExiting(true), 5500);
    const doneTimer = setTimeout(onComplete, 6000);

    // Switch to "Madhan DEV" at 3.5 seconds
    const switchTimer = setTimeout(() => setShowMadhanDev(true), 3500);

    // Animate DEV crimson letter by letter starting at 3.8 seconds
    const devCrimsonTimers: NodeJS.Timeout[] = [];
    ['D', 'DE', 'DEV'].forEach((target, i) => {
      const timer = setTimeout(() => setCrimsonIndex(i + 1), 3800 + (i * 400));
      devCrimsonTimers.push(timer);
    });

    return () => {
      clearTimeout(typeTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      clearTimeout(switchTimer);
      devCrimsonTimers.forEach(t => clearTimeout(t));
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



      {/* Main content */}
      <div className="relative z-30 text-center fade-in" style={{ opacity: 0 }}>
        <h1
          className="text-3xl md:text-6xl font-bold tracking-tight"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
          }}
        >
          {showMadhanDev ? (
            <>
              Madhan{' '}
              <span>
                <span style={{ color: crimsonIndex >= 1 ? 'var(--accent)' : 'var(--text-primary)' }}>D</span>
                <span style={{ color: crimsonIndex >= 2 ? 'var(--accent)' : 'var(--text-primary)' }}>E</span>
                <span style={{ color: crimsonIndex >= 3 ? 'var(--accent)' : 'var(--text-primary)' }}>V</span>
              </span>
            </>
          ) : (
            OWNER
          )}
        </h1>

        {/* Dramatic divider */}
        <div
          className="mt-8 mx-auto h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          style={{ width: '200px' }}
        />

        {/* Typing role */}
        <p
          className="mt-6 text-sm md:text-base uppercase tracking-[0.3em] text-[var(--accent)]"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
          }}
        >
          {roleText}
        </p>
      </div>
    </div>
  );
}
