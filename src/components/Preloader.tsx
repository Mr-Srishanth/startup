import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GRID_SIZE = 20;
const TOTAL_BLOCKS = GRID_SIZE * GRID_SIZE;
const BLOCKS = Array.from({ length: TOTAL_BLOCKS });

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setPhase('exiting'), 400); // Linger at 100%
          setTimeout(() => setPhase('done'), 2500); // Wait for full explosion
          return 100;
        }
        return p + Math.floor(Math.random() * 10) + 1;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[999999] pointer-events-none" style={{ perspective: 1000 }}>
      {/* Voxel Explosion Grid */}
      <div 
        className="absolute inset-0 grid w-full h-full" 
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, 
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` 
        }}
      >
        {BLOCKS.map((_, i) => {
          const col = i % GRID_SIZE;
          const row = Math.floor(i / GRID_SIZE);
          // Calculate distance from center for ripple effect
          const dist = Math.sqrt(Math.pow(col - GRID_SIZE/2, 2) + Math.pow(row - GRID_SIZE/2, 2));
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, z: 0 }}
              animate={phase === 'exiting' ? {
                opacity: 0,
                scale: 0,
                rotateX: (Math.random() - 0.5) * 720,
                rotateY: (Math.random() - 0.5) * 720,
                z: Math.random() * 800 + 200, // Fly aggressively towards camera
              } : {}}
              transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: dist * 0.05 // Ripple outwards from center
              }}
              className="bg-black w-full h-full"
            />
          );
        })}
      </div>

      {/* Content Overlay - Violent Scale Wipe */}
      <motion.div 
        animate={phase === 'exiting' ? { 
          opacity: 0, 
          scale: 3, 
          filter: 'blur(20px)' 
        } : { 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(0px)' 
        }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 flex flex-col justify-end p-12 md:p-24 text-white mix-blend-difference"
      >
        <div className="flex justify-between items-end w-full">
          <div className="text-sm font-bold uppercase tracking-widest">
            Loading Experience
          </div>
          <div className="text-[20vw] font-black tracking-tighter leading-none flex items-baseline">
            {progress}<span className="text-[10vw]">%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
