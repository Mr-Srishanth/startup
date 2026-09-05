import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { soundEngine } from '../utils/audio';
import { LiquidReelCanvas } from './LiquidReelCanvas';

export function CinematicReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Expand the height of the video container from 0% to 100% as you scroll through the section
  const height = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "100%"]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.3, 0.8], [1.2, 1]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Trigger a deep bass drone when the slit starts to open (around 0.3)
      if (latest > 0.3 && latest < 0.35) {
        soundEngine.playImpact();
      }
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-black z-20">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background text that gets revealed / hidden */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference z-20"
        >
          <h2 className="text-[15vw] font-black uppercase tracking-tighter text-white leading-none">
            The Reel
          </h2>
        </motion.div>

        {/* The physical slit that opens up */}
        <motion.div 
          style={{ height }}
          className="relative w-full max-w-7xl mx-auto overflow-hidden bg-zinc-900 border-y border-white/20 z-10 flex items-center justify-center cursor-pointer group"
        >
          <motion.div style={{ scale }} className="absolute inset-0 w-full h-full">
            <LiquidReelCanvas imageUrl="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
               <button 
                 onMouseEnter={() => soundEngine.playTick()}
                 className="w-32 h-32 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-md bg-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500 text-white font-bold tracking-widest uppercase pointer-events-none"
               >
                 Play
               </button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Top & Bottom physical letterbox bars (architectural aesthetic) */}
        <div className="absolute top-0 w-full h-12 border-b border-white/10 bg-black z-30 flex items-center justify-between px-6 font-mono text-xs text-zinc-500 uppercase">
          <span>Sys.Reel_v2.0</span>
          <span>[ UNLOCKING ]</span>
        </div>
        <div className="absolute bottom-0 w-full h-12 border-t border-white/10 bg-black z-30 flex items-center justify-between px-6 font-mono text-xs text-zinc-500 uppercase">
          <span>Global Network</span>
          <span>Status: Standby</span>
        </div>
      </div>
    </section>
  );
}
