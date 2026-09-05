import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { soundEngine } from '../utils/audio';
import { SoundToggle } from './SoundToggle';

const menuLinks = [
  { title: 'Index', href: '/' },
  { title: 'Work', href: '#work' },
  { title: 'Agency', href: '#agency' },
  { title: 'Pricing', href: '#pricing' },
  { title: 'Contact', href: '#contact' },
];

export function MenuOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    soundEngine.playImpact();
  };

  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at calc(100% - 3rem) 3rem)',
      transition: {
        type: 'spring',
        damping: 40,
        stiffness: 400,
        restDelta: 2
      }
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 3rem) 3rem)',
      transition: {
        type: 'spring',
        damping: 40,
        stiffness: 50,
        restDelta: 2
      }
    }
  };

  const linkContainerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const linkVariants = {
    closed: { y: 50, opacity: 0, rotate: 5 },
    open: { 
      y: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    }
  };

  return (
    <>
      {/* Header / Toggle Button */}
      <nav className="fixed w-full p-6 flex justify-between items-center z-[100] mix-blend-difference text-white pointer-events-auto">
        <div className="text-xl font-bold tracking-tighter">STUDIO<span className="text-zinc-500">.</span></div>
        <div className="flex items-center gap-4">
          <SoundToggle />
          <MagneticButton onClick={toggleMenu} className="text-sm uppercase tracking-widest font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer">
            {isOpen ? 'Close' : 'Menu'}
          </MagneticButton>
        </div>
      </nav>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[90] bg-zinc-900 flex flex-col justify-center items-center pointer-events-auto"
          >
            <motion.ul 
              variants={linkContainerVariants}
              className="flex flex-col items-center gap-6"
            >
              {menuLinks.map((link, i) => (
                <motion.li key={i} variants={linkVariants} className="overflow-hidden">
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        setIsOpen(false);
                        setTimeout(() => {
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }, 500);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white hover:text-zinc-400 transition-colors cursor-pointer"
                  >
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* Bottom Footer in Menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute bottom-12 w-full px-12 flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500"
            >
              <span>Los Angeles / London</span>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white cursor-pointer">Instagram</a>
                <a href="#" className="hover:text-white cursor-pointer">Twitter</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
