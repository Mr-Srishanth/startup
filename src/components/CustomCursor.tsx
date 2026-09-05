import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotsRef = useRef<(HTMLDivElement & { x: number; y: number })[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const coords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const circles = dotsRef.current;
    
    // Initialize custom x/y properties
    circles.forEach(circle => {
      if (circle) {
        circle.x = coords.x;
        circle.y = coords.y;
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    let animationFrameId: number;

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
        if (!circle) return;
        circle.style.transform = `translate(${x - 12}px, ${y - 12}px) scale(${(circles.length - index) / circles.length})`;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        if (nextCircle) {
          // The lower the multiplier, the more "lag" and fluidity the snake has
          x += (nextCircle.x - x) * 0.25;
          y += (nextCircle.y - y) * 0.25;
        }
      });

      animationFrameId = requestAnimationFrame(animateCircles);
    }
    
    animateCircles();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-[99999] mix-blend-difference overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            ref={el => { if(el) dotsRef.current[i] = el as any; }}
            className={`absolute top-0 left-0 w-6 h-6 rounded-full bg-white will-change-transform ${
              isHovering && i === 0 ? 'bg-transparent border border-white !w-16 !h-16 -ml-5 -mt-5 transition-all duration-300' : ''
            }`}
            style={{ opacity: isHovering && i !== 0 ? 0 : 1, transition: 'opacity 0.2s ease' }}
          />
        ))}
      </div>
    </>
  );
}
