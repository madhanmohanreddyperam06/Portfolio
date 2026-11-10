import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Download, Loader2, FileText } from 'lucide-react';

export interface ActivePdfModal {
  url: string;
  title: string;
  subtitle?: string;
  issuer?: string;
  badge?: string;
}

interface PdfModalProps {
  pdf: ActivePdfModal | null;
  onClose: () => void;
}

export default function PdfModal({ pdf, onClose }: PdfModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [viewerMode, setViewerMode] = useState<'auto' | 'google' | 'direct'>('auto');

  useEffect(() => {
    if (!pdf) return;
    setIsLoading(true);
    setLoadError(false);

    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [pdf, onClose]);

  if (!pdf || typeof document === 'undefined') return null;

  const isMobile =
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.endsWith('.local'));

  // Absolute URL required for Google Docs Viewer on public deployed domains
  const absoluteUrl =
    typeof window !== 'undefined'
      ? pdf.url.startsWith('http')
        ? pdf.url
        : `${window.location.origin}${pdf.url.startsWith('/') ? '' : '/'}${pdf.url}`
      : pdf.url;

  // Determine iframe source:
  // On mobile deployed URL, standard mobile browsers (Android Chrome, iOS Safari)
  // cannot reliably render raw PDF iframes, so Google Docs Viewer is used.
  // On desktop or localhost, direct native browser PDF rendering is used.
  let iframeSrc = `${encodeURI(pdf.url)}#toolbar=1&navpanes=0&view=FitH`;
  if (viewerMode === 'google' || (viewerMode === 'auto' && isMobile && !isLocalhost)) {
    iframeSrc = `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
  } else if (viewerMode === 'direct') {
    iframeSrc = `${encodeURI(pdf.url)}#toolbar=1&navpanes=0&view=FitH`;
  }

  const badgeText = pdf.badge || 'Certificate';
  const issuerText = pdf.issuer || pdf.subtitle || '';

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-[95vw] sm:w-[90vw] md:w-[86vw] max-w-4xl h-[58vh] sm:h-[66vh] md:h-[68vh] max-h-[560px] min-h-[380px] flex flex-col rounded-xl overflow-hidden border border-[var(--border-bright)] bg-[var(--bg-elevated)] shadow-[0_20px_70px_rgba(0,0,0,0.85)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[var(--border)] bg-[var(--bg-base)] shrink-0">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[#DC143C] font-mono font-medium truncate">
                {badgeText} {issuerText ? `• ${issuerText}` : ''}
              </span>
            </div>
            <h3
              id="pdf-modal-title"
              className="font-display text-sm sm:text-base font-bold text-[var(--text-primary)] truncate"
              title={pdf.title}
            >
              {pdf.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs font-semibold uppercase tracking-wider border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-bright)] transition-colors"
              title="Open PDF directly in new tab / fullscreen"
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">Open</span>
            </a>
            <a
              href={pdf.url}
              download
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs font-semibold uppercase tracking-wider border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-bright)] transition-colors"
              title="Download PDF"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-base)] transition-colors cursor-pointer border border-transparent hover:border-[var(--border)]"
              aria-label="Close PDF Viewer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal PDF Viewer Body */}
        <div className="relative flex-1 w-full bg-[#0d0d10] overflow-hidden flex items-center justify-center">
          {isLoading && !loadError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d10] z-10 gap-3 text-[var(--text-secondary)]">
              <Loader2 size={28} className="animate-spin text-[#DC143C]" />
              <span className="text-xs font-mono tracking-wide">Loading document...</span>
            </div>
          )}

          {loadError ? (
            <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto gap-3">
              <div className="w-12 h-12 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)]">
                <FileText size={24} />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Preview not available in this browser</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Mobile browsers sometimes restrict inline PDF embeds. You can view or download the file directly with full clarity.
              </p>
              <div className="flex items-center gap-3 mt-1">
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-[var(--text-primary)] text-[var(--bg-base)] hover:opacity-90 transition-opacity"
                >
                  <ExternalLink size={13} />
                  <span>Open PDF Document</span>
                </a>
                <a
                  href={pdf.url}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--border-bright)] transition-colors"
                >
                  <Download size={13} />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ) : (
            <iframe
              key={iframeSrc}
              src={iframeSrc}
              className="w-full h-full border-0"
              title={pdf.title}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setLoadError(true);
              }}
            />
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-2.5 text-[11px] text-[var(--text-tertiary)] border-t border-[var(--border)] bg-[var(--bg-base)] flex items-center justify-between shrink-0">
          <span className="hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[10px] font-mono">ESC</kbd> or click outside to close
          </span>

          <div className="flex items-center gap-3 ml-auto text-[11px]">
            {isMobile && !isLocalhost && (
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setViewerMode((prev) => (prev === 'google' ? 'direct' : 'google'));
                }}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline cursor-pointer"
              >
                {viewerMode === 'direct' ? 'Use Google Viewer' : 'Use Direct Viewer'}
              </button>
            )}
            <a
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DC143C] [html[data-theme='light']_&]:text-black hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>Tap here to open directly</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
