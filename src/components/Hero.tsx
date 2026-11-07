import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hero from '../data/hero.json';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ started = false }: { started?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const hasGlitchedRef = useRef(false);
  const [play, setPlay] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

  const { name, role, location } = hero;

  // Trigger entrance only after the loader finishes (`started` flips true)
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setPlay(true), 150);
    return () => clearTimeout(t);
  }, [started]);

  // Staggered entrance
  useEffect(() => {
    if (!play || !contentRef.current) return;
    const els = contentRef.current.querySelectorAll<HTMLElement>('[data-hero-anim]');
    gsap.fromTo(
      els,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.09,
        onComplete: () => setEntranceDone(true),
      }
    );
  }, [play]);

  // Trigger glitch shortly after entrance completes
  useEffect(() => {
    if (!entranceDone || !nameRef.current || hasGlitchedRef.current) return;
    hasGlitchedRef.current = true;
    const el = nameRef.current;
    const t = window.setTimeout(() => el.classList.add('is-glitching'), 350);
    return () => window.clearTimeout(t);
  }, [entranceDone]);

  // Chevron scroll fade
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=200',
      scrub: true,
      onUpdate: (self) => {
        if (chevronRef.current) {
          chevronRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 5));
        }
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-end pt-28 pb-16 md:pb-20"
    >
      <div className="hero-text-scrim" aria-hidden="true" />

      <div
        ref={contentRef}
        className="container-layout w-full relative z-10 pb-8 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="max-w-[820px] translate-y-3 md:translate-y-6">

          {/* Name */}
          <h1
            data-hero-anim
            className="font-display font-bold tracking-[-0.02em] leading-[0.95] whitespace-nowrap"
            style={{
              opacity: 0,
              fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
            }}
          >
            <span
              ref={nameRef}
              className="glitch"
              data-text="Madhan DEV"
            >
              <span className="text-white [html[data-theme='light']_&]:text-[#0a0a0c]">Madhan</span>{' '}
              <span className="text-[#DC143C]">DEV</span>
            </span>
          </h1>

          {/* Role */}
          <div
            data-hero-anim
            className="mt-4 md:mt-5"
            style={{ opacity: 0 }}
          >
            <span className="text-[var(--accent)] text-[11px] md:text-[13px] font-bold uppercase tracking-[0.3em]">
              {role}
            </span>
          </div>
        </div>

        {/* Right down side corner: "LET'S TALK" only text with underline (no button) */}
        <div
          data-hero-anim
          className="self-end md:self-end pb-1 shrink-0"
          style={{ opacity: 0 }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-display text-sm md:text-base font-medium tracking-wide uppercase underline underline-offset-4 decoration-1 text-[var(--text-primary)] hover:text-[#DC143C] hover:decoration-[#DC143C] transition-colors duration-200 cursor-pointer"
          >
            LET'S TALK
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={chevronRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-tertiary)] pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-[var(--text-tertiary)]" />
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 1l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}
