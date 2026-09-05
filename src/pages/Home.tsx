import { ArrowRight, Code, MonitorSmartphone, Zap } from 'lucide-react';
import { ArchiveGrid } from '../components/ArchiveGrid';
import { CinematicReel } from '../components/CinematicReel';
import { MonolithicMask } from '../components/MonolithicMask';
import { Pricing } from '../components/Pricing';
import { Contact } from '../components/Contact';
import { TextReveal } from '../components/TextReveal';
import { MagneticTypography } from '../components/MagneticTypography';
import { MagneticButton } from '../components/MagneticButton';
import { Marquee } from '../components/Marquee';
import { PageTransition } from '../components/PageTransition';
import { TerminalEasterEgg } from '../components/TerminalEasterEgg';
import { Footer } from '../components/Footer';
import { MenuOverlay } from '../components/MenuOverlay';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';

export function Home() {
  useSEO({
    title: 'Creative Engineering',
    description: 'We engineer high-performance, conversion-focused websites for modern brands.',
  });

  return (
    <>
      <PageTransition />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0, y: -50, transition: { duration: 0.5, delay: 0.5 } }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="text-white relative bg-black min-h-screen"
      >
      <MenuOverlay />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden z-10">
        <div className="relative z-10 w-full flex flex-col items-center">
          <MagneticTypography 
            text="We build digital experiences that turn attention into revenue." 
            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] max-w-5xl mix-blend-difference" 
            delay={0.2}
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mix-blend-difference"
          >
            Stop losing clients to slow, boring templates. We engineer high-performance, conversion-focused websites for modern brands.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-12 mx-auto"
          >
            <MagneticButton 
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold transition-colors hover:bg-zinc-200"
            >
              <span>See Our Work</span> <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-40 px-6 border-t border-white/10 relative z-10 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <TextReveal text="The Engine." className="text-5xl font-bold mb-20 justify-start" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <Zap className="w-10 h-10 mb-6 text-white" />
              <h3 className="text-xl font-bold mb-4">High Performance</h3>
              <p className="text-zinc-400">Lightning fast loading times built on React and modern architectures to guarantee flawless UX.</p>
            </div>
            <div className="p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <MonitorSmartphone className="w-10 h-10 mb-6 text-white" />
              <h3 className="text-xl font-bold mb-4">Responsive Design</h3>
              <p className="text-zinc-400">Perfectly crafted interfaces that look premium on every device, from 4K monitors to mobile screens.</p>
            </div>
            <div className="p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <Code className="w-10 h-10 mb-6 text-white" />
              <h3 className="text-xl font-bold mb-4">Conversion Focused</h3>
              <p className="text-zinc-400">We don't just make it look good. We design precise user flows intended to maximize your sales.</p>
            </div>
          </div>
        </div>
      </section>

      <Marquee />
      <CinematicReel />
      <ArchiveGrid />
      <MonolithicMask />
      <Pricing />
      <Contact />

      <Footer />
    </motion.div>
    </>
  );
}
