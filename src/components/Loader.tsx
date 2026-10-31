import { useEffect, useState } from 'react';
import meta from '../data/meta.json';

const OWNER = meta.name;

/**
 * Letter Reveal Loader
 * Elegant letter-by-letter text reveal with blur effect
 * Total runtime ~4s
 */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { onComplete(); return; }

    // Type effect
    let index = 0;
    const textInterval = setInterval(() => {
      if (index <= OWNER.length) {
        setText(OWNER.slice(0, index));
        index++;
      } else {
        clearInterval(textInterval);
      }
    }, 180);

    const exitTimer = setTimeout(() => setExiting(true), 3500);
    const doneTimer = setTimeout(onComplete, 4000);
    return () => {
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
      className="fixed inset-0 z-[100] bg-[var(--bg-base)] flex items-center justify-center"
      style={{
        opacity: exiting ? 0 : 1,
        transition: 'opacity 500ms ease-out',
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
        .cursor {
          animation: cursor-blink 0.8s infinite;
        }
        .blur-in {
          animation: blur-in 0.3s ease-out forwards;
        }
      `}</style>

      <div className="text-center">
        <h1
          className="blur-in text-3xl md:text-5xl font-bold tracking-tight"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          <span className="text-[var(--text-primary)]">{whitePart}</span>
          <span className="text-[var(--accent)] blur-in" style={{ animationDelay: '0.1s' }}>{coloredPart}</span>
          <span className="cursor text-[var(--accent)]">|</span>
        </h1>
      </div>
    </div>
  );
}
