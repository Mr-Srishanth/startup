import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { soundEngine } from '../utils/audio';
import { useRef } from 'react';

// Duplicate projects to simulate a larger archive for the grid
const archiveProjects = [...projects, ...projects, ...projects].map((p, i) => ({
  ...p,
  id: `archive-${i}`,
  index: String(i + 1).padStart(2, '0')
}));

export function ArchiveGrid() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [4, -4]);

  return (
    <section className="py-32 px-6 border-t border-white/10 relative z-10 bg-transparent" id="work">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">The Archive.</h2>
            <p className="text-zinc-500 font-mono mt-4 max-w-md">
              A comprehensive index of our digital engineering. Hover to decode visual assets.
            </p>
          </div>
          <div className="font-mono text-sm text-zinc-500 text-right">
            [INDEX_COUNT: {archiveProjects.length}]<br/>
            [SYS_STATUS: ONLINE]
          </div>
        </div>

        {/* The Strict Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 relative z-10">
          {archiveProjects.map((project) => (
            <motion.div style={{ skewY: skewVelocity }} key={project.id} className="origin-center">
              <Link 
                to={`/case-study/${project.slug}`} 
                onMouseEnter={() => soundEngine.playImpact()}
                className="group relative block aspect-square border-b border-r border-white/10 p-6 md:p-8 overflow-hidden cursor-pointer bg-black transition-colors duration-500"
              >
              {/* Typography / Data Layer */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10 text-white transition-opacity duration-500 mix-blend-difference pointer-events-none group-hover:opacity-0">
                <div className="flex justify-between items-start font-mono text-xs md:text-sm">
                  <span>[{project.index}]</span>
                  <span className="uppercase text-right">{project.timeline}</span>
                </div>
                
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight uppercase leading-none mb-2">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest">
                    {project.category}
                  </p>
                </div>
              </div>

              {/* Reveal Image Layer */}
              <div 
                className="absolute inset-0 z-0"
              >
                <img 
                  src={project.heroImage} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
