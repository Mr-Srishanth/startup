import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function MonolithicMask() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale the mask exponentially so it flies through
  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 80, 150]);
  
  // Fade out the mask completely at the very end to reveal the pure image
  const opacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 0]);

  // Parallax the image slightly for a cinematic feel
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Cinematic Background Image (The layer we see through the text) */}
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2500&auto=format&fit=crop" 
            alt="Cinematic abstract" 
            className="w-full h-full object-cover"
          />
          {/* A slight dark overlay to keep it readable before zoom */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* The Text Mask Layer */}
        <motion.div 
          style={{ 
            scale, 
            opacity,
            transformOrigin: '50% 50%',
          }}
          className="absolute inset-0 flex items-center justify-center bg-black mix-blend-multiply pointer-events-none"
        >
          {/* 
            By using mix-blend-multiply, the black background stays solid black, 
            while the stark white text acts as a perfectly transparent window.
            The space between "THE" and "VOID" is exactly at 50% 50%, allowing us to fly through it.
          */}
          <h1 className="text-white text-[20vw] md:text-[18vw] font-black tracking-tighter leading-none whitespace-nowrap">
            THE VOID
          </h1>
        </motion.div>
        
        {/* HUD Elements */}
        <div className="absolute bottom-12 w-full flex justify-between px-6 md:px-12 text-xs font-mono text-zinc-500 uppercase tracking-widest pointer-events-none z-20 mix-blend-difference">
          <span>Scroll Velocity</span>
          <span>[ Dive ]</span>
        </div>

      </div>
    </section>
  );
}
