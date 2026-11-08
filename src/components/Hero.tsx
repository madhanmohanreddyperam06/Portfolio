import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hero from '../data/hero.json';

gsap.registerPlugin(ScrollTrigger);

const HERO_MOBILE_IMAGES = [
  '/Madhann.jpeg',
  '/Pastel Anime Portrait of a Young Man.png',
];

export default function Hero({ started = false }: { started?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const hasGlitchedRef = useRef(false);
  const [play, setPlay] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Rotate mobile portrait backdrop every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % HERO_MOBILE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      className="relative min-h-[100dvh] flex flex-col justify-end pt-28 pb-16 md:pb-20 overflow-hidden"
    >
      {/* Mobile Translucent Portrait Backdrop (5s alternating slideshow) */}
      <div
        className="md:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {HERO_MOBILE_IMAGES.map((imgSrc, idx) => (
          <img
            key={imgSrc}
            src={imgSrc}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover object-[50%_15%] select-none pointer-events-none transition-opacity duration-1000 ease-in-out ${
              started && activeImgIndex === idx
                ? 'opacity-55 [html[data-theme="light"]_&]:opacity-45'
                : 'opacity-0'
            }`}
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0.2) 80%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0.2) 80%, transparent 98%)',
            }}
          />
        ))}
        {/* Soft bottom vignette to ensure typography contrast */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/80 to-transparent"
        />
      </div>

      <div className="hero-text-scrim hidden md:block" aria-hidden="true" />

      <div
        ref={contentRef}
        className="container-layout w-full relative z-10 pb-8 md:pb-12"
      >
        {/* Upside: Role with thin line bar */}
        <div
          data-hero-anim
          className="mb-3 md:mb-4 flex items-center gap-2.5 sm:gap-3"
          style={{ opacity: 0 }}
        >
          <span
            className="inline-block h-[1px] w-7 sm:w-9 md:w-10 bg-[#DC143C] [html[data-theme='light']_&]:bg-[#0a0a0c] transition-colors duration-300 shrink-0"
            aria-hidden="true"
          />
          <span className="text-[var(--accent)] text-[11px] md:text-[13px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">
            {role}
          </span>
        </div>

        {/* Downside: Name parallel to LET'S TALK */}
        <div className="flex items-baseline justify-between gap-4 w-full">
          {/* Name */}
          <h1
            data-hero-anim
            className="font-display font-bold tracking-[-0.02em] leading-none whitespace-nowrap"
            style={{
              opacity: 0,
              fontSize: 'clamp(2rem, 5.5vw, 5.5rem)',
            }}
          >
            <span
              ref={nameRef}
              className="glitch"
              data-text="Madhan DEV"
            >
              <span className="text-white [html[data-theme='light']_&]:text-[#0a0a0c]">Madhan</span>{' '}
              <span className="text-[#DC143C] [html[data-theme='light']_&]:text-[#0a0a0c]">DEV</span>
            </span>
          </h1>

          {/* Right down side corner: "LET'S TALK" only text with underline (no button) */}
          <div
            data-hero-anim
            className="shrink-0"
            style={{ opacity: 0 }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-display text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase underline underline-offset-4 decoration-1 text-[var(--text-primary)] hover:text-[#DC143C] hover:decoration-[#DC143C] transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              LET'S TALK
            </a>
          </div>
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
