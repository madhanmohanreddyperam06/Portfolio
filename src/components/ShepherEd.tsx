
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Chapter = {
  num: string;
  code: string;
  tag: string;
  name: string;
  full: string;
  description: string;
  keywords: string[];
};

const CHAPTERS: Chapter[] = [
  {
    num: '01',
    code: 'DIP',
    tag: 'Ingestion',
    name: 'Document Intelligence',
    full: 'Industrial Document Intelligence',
    description:
      'The foundation of the platform. Ingests and processes industrial documents including PDFs, DOCX files, spreadsheets, and images through parsing, OCR, layout analysis, table extraction, image extraction, normalization, and structured document processing.',
    keywords: [
      'Document Ingestion',
      'PDF Processing',
      'DOCX Processing',
      'Excel Processing',
      'OCR',
      'PaddleOCR',
      'Layout Analysis',
      'Table Extraction',
      'Image Extraction',
      'Document Metadata',
    ],
  },
  {
    num: '02',
    code: 'Extractor',
    tag: 'Extraction',
    name: 'Knowledge Extraction',
    full: 'Industrial Knowledge Extraction',
    description:
      'Transforms unstructured engineering information into structured industrial knowledge. The extraction layer identifies domain entities and relationships across equipment, components, failures, causes, maintenance, inspections, work orders, regulations, standards, risks, safety, quality, and operational parameters.',
    keywords: [
      '21 Entity Extractors',
      '11 Relationship Extractors',
      'Equipment',
      'Components',
      'Failures',
      'Maintenance',
      'Inspections',
      'Work Orders',
      'Risks',
      'Safety',
      'Quality',
    ],
  },
  {
    num: '03',
    code: 'KGR',
    tag: 'Knowledge',
    name: 'Knowledge Graph',
    full: 'Industrial Knowledge Graph',
    description:
      'Connects extracted industrial entities and relationships into a queryable knowledge graph. Neo4j provides the graph foundation for exploring relationships between equipment, components, failures, maintenance activities, documents, standards, risks, and operational knowledge.',
    keywords: [
      'Neo4j',
      'Knowledge Graph',
      'Entities',
      'Relationships',
      'Graph Queries',
      'Equipment Networks',
      'Failure Analysis',
      'Maintenance Intelligence',
      'Knowledge Synchronization',
    ],
  },
  {
    num: '04',
    code: 'Engine',
    tag: 'Retrieval',
    name: 'Hybrid Retrieval',
    full: 'Hybrid Knowledge Retrieval Engine',
    description:
      'Combines semantic, graph, keyword, and metadata retrieval into a unified evidence pipeline. Qdrant-powered vector search, Neo4j graph retrieval, BM25 keyword search, query analysis, ranking, deduplication, evidence merging, and context construction work together to retrieve relevant industrial knowledge.',
    keywords: [
      'Qdrant',
      'Vector Search',
      'Neo4j Retrieval',
      'BM25',
      'Semantic Search',
      'Graph Search',
      'Metadata Search',
      'Query Expansion',
      'Ranking',
      'Evidence Merging',
      'Context Building',
    ],
  },
  {
    num: '05',
    code: 'RAG',
    tag: 'Intelligence',
    name: 'RAG Generation',
    full: 'Industrial AI & RAG Assistance',
    description:
      'Turns retrieved industrial evidence into grounded AI assistance. The RAG generation layer uses a provider abstraction to combine retrieved context with LLM generation, creating an engineering-focused foundation for intelligent search, investigation, and knowledge-driven assistance.',
    keywords: [
      'RAG',
      'LLM Integration',
      'Gemini',
      'Context Grounding',
      'Evidence-Based Answers',
      'AI Copilot',
      'Engineering Assistance',
      'Knowledge Retrieval',
    ],
  },
  {
    num: '06',
    code: 'SEC',
    tag: 'Security',
    name: 'Enterprise Security',
    full: 'Enterprise RBAC & Authorization',
    description:
      'A permission-driven enterprise security model protects industrial knowledge and platform operations. Six defined roles provide controlled access across documents, extraction, knowledge graphs, retrieval, AI capabilities, analytics, administration, auditing, and system configuration.',
    keywords: [
      'JWT Authentication',
      'RBAC',
      '6 Enterprise Roles',
      'Permission Catalog',
      'Resource Authorization',
      'Audit Logging',
      'User Management',
      'Role Management',
      'Secure APIs',
    ],
  },
];

export default function IndusMind() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Intro
      const introEls = root.querySelectorAll('[data-indus-intro]');

      if (introEls.length > 0) {
        gsap.from(introEls, {
          opacity: 0,
          y: 24,
          duration: reduced ? 0 : 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
        });
      }

      // Chapters
      const chapters = gsap.utils.toArray<HTMLElement>(
        '[data-indus-chapter]'
      );

      chapters.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: reduced ? 0 : 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        });

        const chips = el.querySelectorAll('[data-indus-chip]');

        if (chips.length > 0) {
          gsap.from(chips, {
            opacity: 0,
            y: 8,
            duration: reduced ? 0 : 0.5,
            ease: 'power2.out',
            stagger: 0.04,
            scrollTrigger: {
              trigger: el,
              start: 'top 78%',
              once: true,
            },
          });
        }
      });

      // Progress rail
      const rail = root.querySelector<HTMLElement>(
        '[data-indus-rail]'
      );

      const rightCol = root.querySelector<HTMLElement>(
        '[data-indus-right]'
      );

      if (rail && rightCol) {
        gsap.to(rail, {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: rightCol,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="indusmind"
      className="section-frame section-padding relative"
    >
      <div className="container-layout">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Sticky Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-7">

            <span
              data-indus-intro
              className="eyebrow text-xs font-display tracking-[0.28em] uppercase"
              style={{ color: 'var(--accent)' }}
            >
              Featured Platform
            </span>

            <h2
              data-indus-intro
              className="font-display font-bold text-[var(--text-primary)] leading-[0.9] tracking-tighter text-5xl sm:text-6xl md:text-7xl"
            >
              Building
              <br />
              IndusMind AI
            </h2>

            <p
              data-indus-intro
              className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-md"
            >
              An enterprise-grade industrial knowledge intelligence
              platform designed to transform engineering documents into
              connected, searchable and actionable knowledge.
            </p>

            <p
              data-indus-intro
              className="text-[var(--text-secondary)]/90 text-sm sm:text-base leading-relaxed max-w-md border-l border-[var(--text-primary)]/10 pl-4"
            >
              IndusMind AI combines document intelligence, knowledge
              extraction, graph technology, hybrid retrieval, RAG and
              enterprise authorization into a unified platform for
              industrial knowledge discovery and engineering assistance.
            </p>

            <div
              data-indus-intro
              className="pt-4 flex flex-col items-start gap-5"
            >
              <div className="inline-flex items-center gap-3 py-2.5 px-5 rounded-full border border-[var(--text-primary)]/10 bg-white/[0.04] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                </span>

                <span className="text-[var(--text-primary)] font-display text-[11px] uppercase tracking-[0.2em]">
                  Status · In Active Development
                </span>
              </div>

              <a
                href="https://github.com/madhanmohanreddyperam06/IndusMind-AI.git"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[var(--accent)]/40 text-[var(--text-primary)] rounded-full overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

                <span className="font-display font-medium text-sm tracking-wide uppercase group-hover:text-[var(--accent)] transition-colors">
                  View GitHub
                </span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white/40 group-hover:text-[var(--accent)] transition-all group-hover:translate-x-1"
                >
                  <path
                    d="M2.91669 7H11.0834M11.0834 7L7.00002 2.91667M11.0834 7L7.00002 11.0833"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Scrolling Chapters */}
          <div
            data-indus-right
            className="lg:col-span-7 relative space-y-8 md:space-y-10"
          >

            {/* Progress rail */}
            <div
              aria-hidden
              className="hidden lg:block absolute -left-6 top-2 bottom-2 w-px bg-[var(--text-primary)]/10 overflow-hidden"
            >
              <div
                data-indus-rail
                className="w-full h-full origin-top bg-[var(--accent)]/70"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>

            {CHAPTERS.map((c) => (
              <article
                key={c.code + c.num}
                data-indus-chapter
                className="group relative p-6 sm:p-8 rounded-2xl border border-[var(--text-primary)]/10 bg-white/[0.02] backdrop-blur-md transition-colors duration-500 hover:border-[var(--accent)]/30"
              >
                <div className="flex justify-between items-start gap-4 mb-5">

                  <div className="flex items-baseline gap-4">
                    <span className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)]/15 group-hover:text-[var(--accent)]/40 transition-colors duration-500 leading-none">
                      {c.num}
                    </span>

                    <span className="font-display text-[var(--text-primary)]/60 text-xs sm:text-sm uppercase tracking-[0.22em]">
                      {c.code}
                    </span>
                  </div>

                  <span className="shrink-0 px-2.5 py-1 text-[10px] border border-[var(--accent)]/40 text-[var(--accent)] rounded-full uppercase font-display tracking-[0.18em]">
                    {c.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold uppercase text-[var(--text-primary)] text-xl sm:text-2xl mb-1.5 tracking-tight">
                  {c.full}
                </h3>

                <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base mb-6 max-w-[62ch]">
                  {c.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {c.keywords.map((k) => (
                    <span
                      key={k}
                      data-indus-chip
                      className="text-[10px] sm:text-[11px] text-[var(--text-primary)]/80 font-body uppercase tracking-[0.16em] bg-[var(--text-primary)]/[0.04] border border-[var(--text-primary)]/8 px-2.5 py-1 rounded"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </article>
            ))}

            {/* Closing Statement */}
            <div
              data-indus-chapter
              className="pt-10 mt-2 border-t border-[var(--text-primary)]/10"
            >
              <p className="font-display text-[var(--text-primary)] text-lg sm:text-2xl leading-snug uppercase tracking-tight max-w-2xl">
                Industrial intelligence isn't only about storing
                information. It's about transforming fragmented
                engineering data into{' '}
                <span className="text-[var(--accent)]">
                  connected, searchable and actionable knowledge
                </span>
                .
              </p>

              <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-4 max-w-xl leading-relaxed">
                IndusMind AI is an ongoing engineering platform focused
                on building reliable foundations for industrial
                knowledge intelligence at enterprise scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}