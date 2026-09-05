import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  outline?: boolean;
}

function ParallaxText({ children, baseVelocity = 100, outline = false }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="font-black uppercase tracking-tighter text-7xl md:text-[140px] leading-none flex whitespace-nowrap flex-nowrap gap-8" style={{ x }}>
        {[...Array(6)].map((_, i) => (
          <span 
            key={i} 
            className="block"
            style={outline ? { WebkitTextStroke: '2px white', color: 'transparent' } : {}}
          >
            {children} —
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="py-32 border-t border-white/10 relative z-20 bg-transparent flex flex-col gap-6 overflow-hidden">
      <ParallaxText baseVelocity={-2}>Digital Experiences</ParallaxText>
      <ParallaxText baseVelocity={2} outline>Creative Engineering</ParallaxText>
    </section>
  );
}
