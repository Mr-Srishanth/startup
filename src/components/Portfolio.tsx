import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { WebGLImageCard } from './WebGLImageCard';
import { projects } from '../data/projects';

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="py-20 px-6 text-white bg-transparent" id="work">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-24">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">Selected Work.</h2>
          <button className="hidden md:flex items-center gap-2 hover:text-zinc-400 transition-colors uppercase tracking-widest text-sm font-semibold">
            View All <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-y-32 gap-x-12">
          {projects.map((project, i) => {
            const yOffset = useTransform(scrollYProgress, [0, 1], [0, i % 2 === 0 ? -150 : 150]);
            
            return (
              <motion.div 
                key={project.id}
                style={{ y: yOffset }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
                className={`group cursor-pointer block ${i % 2 !== 0 ? 'mt-16' : ''}`}
              >
                <Link to={`/case-study/${project.slug}`} className="block w-full group/card cursor-pointer">
                  <div className={`aspect-[4/5] w-full rounded-3xl border border-white/10 relative overflow-hidden mb-8 transition-transform duration-700 group-hover/card:scale-[0.98]`}>
                    
                    {/* The WebGL Image Shader */}
                    <div className="absolute inset-0 pointer-events-auto">
                       <WebGLImageCard imageUrl={project.heroImage} />
                    </div>
                    <div className="absolute inset-0 bg-black/40 group-hover/card:bg-transparent transition-colors duration-700 pointer-events-none" />

                    <div className="w-full flex justify-between items-start opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-10 absolute top-8 left-0 px-8 pointer-events-none">
                      <span className="bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{project.category}</span>
                      <div className="bg-white/10 p-4 rounded-full backdrop-blur-md">
                        <ArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-white/20 pt-6">
                    <h3 className="text-3xl font-bold tracking-tight group-hover/card:px-4 transition-all duration-300">{project.title}</h3>
                    <p className="text-zinc-500 font-medium uppercase tracking-widest text-sm">{String(i + 1).padStart(2, '0')}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
