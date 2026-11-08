import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Home from './pages/Home';

const ShepherEdCaseStudy = lazy(() => import('./pages/ShepherEdCaseStudy'));
const NoteList = lazy(() => import('./pages/notes/NoteList'));
const AboutMe = lazy(() => import('./pages/AboutMe'));

import { ThemeProvider } from './contexts/ThemeContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait for React to render the DOM before finding the element
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-[var(--bg-base)]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-studies/shephered" element={<ShepherEdCaseStudy />} />
            <Route path="/principles" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/notes" element={<NoteList />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
