import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

function MagneticLetter({ char, delay }: { char: string, delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  const springConfig = { damping: 15, stiffness: 250, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const rotate = useSpring(0, springConfig);

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const distX = e.clientX - centerX;
          const distY = e.clientY - centerY;
          const dist = Math.sqrt(distX * distX + distY * distY);

          // Repulsion radius
          const maxDist = 120;
          if (dist < maxDist) {
            const force = Math.pow((maxDist - dist) / maxDist, 2); // Non-linear force for snappy feel
            const pushX = (distX / dist) * -60 * force;
            const pushY = (distY / dist) * -60 * force;
            x.set(pushX);
            y.set(pushY);
            rotate.set(pushX * 0.5); // Slight tilt on push
          } else {
            // Snap back
            if (x.get() !== 0) x.set(0);
            if (y.get() !== 0) y.set(0);
            if (rotate.get() !== 0) rotate.set(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, rotate]);

  // Entrance animation configuration
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 200,
        mass: 1,
      },
    },
    hidden: {
      opacity: 0,
      y: 100,
      rotate: 5,
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={child}
      style={{ display: "inline-block", x, y, rotate }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

interface MagneticTypographyProps {
  text: string;
  className?: string;
  delay?: number;
}

export function MagneticTypography({ text, className = '', delay = 0 }: MagneticTypographyProps) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay * i },
    }),
  };

  return (
    <motion.div
      style={{ overflow: "visible", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} style={{ display: 'inline-flex', marginRight: '0.25em', paddingBottom: "0.1em" }}>
          {word.split('').map((char, charIdx) => (
             <MagneticLetter key={charIdx} char={char} delay={0} />
          ))}
        </span>
      ))}
    </motion.div>
  );
}
