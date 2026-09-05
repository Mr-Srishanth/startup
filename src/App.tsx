import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { GlobalCanvas } from './components/GlobalCanvas';
import { Preloader } from './components/Preloader';
import { TerminalEasterEgg } from './components/TerminalEasterEgg';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/:slug" element={<CaseStudy />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Preloader />
        <GlobalCanvas />
        <CustomCursor />
        <TerminalEasterEgg />
        <AnimatedRoutes />
      </SmoothScroll>
    </BrowserRouter>
  );
}
