import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { transitionStore } from '../utils/store';

export function PageTransition() {
  const columns = 5;

  const anim = {
    initial: { top: 0 },
    enter: (i: number) => ({
      top: "100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i }
    }),
    exit: (i: number) => ({
      top: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i }
    })
  };

  useEffect(() => {
    transitionStore.setTransitioning(true);
    const timeout = setTimeout(() => {
      transitionStore.setTransitioning(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
      transitionStore.setTransitioning(false);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none flex w-screen h-screen">
      {[...Array(columns)].map((_, i) => (
        <motion.div
          key={i}
          custom={columns - i}
          variants={anim}
          initial="initial"
          animate="enter"
          exit="exit"
          className="relative w-full h-full bg-white border-r border-black/10"
        />
      ))}
    </div>
  );
}
