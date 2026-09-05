import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TextReveal } from '../components/TextReveal';
import { PageTransition } from '../components/PageTransition';
import { WebGLCarousel } from '../components/WebGLCarousel';
import { getProjectBySlug, projects } from '../data/projects';
import { useSEO } from '../hooks/useSEO';

export function CaseStudy() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug || '');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Cinematic Scroll: Horizontal Section
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });
  const xMovement = useTransform(horizontalProgress, [0, 1], ["0%", "-60%"]);

  // Cinematic Scroll: Footer Scale
  const footerRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  const footerScale = useTransform(footerProgress, [0, 1], [0.8, 1]);
  const footerY = useTransform(footerProgress, [0, 1], [100, 0]);

  if (!project) return <div className="text-white pt-40 px-24 text-4xl">Project Not Found.</div>;

  useSEO({
    title: project.title,
    description: project.challenge,
    image: project.heroImage
  });

  // Find next project
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <PageTransition />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5, delay: 0.5 } }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="min-h-screen text-white bg-black relative z-10 selection:bg-white selection:text-black"
        ref={containerRef}
      >
        {/* Navigation */}
        <nav className="fixed w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
          <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-zinc-400 transition-colors uppercase tracking-widest text-sm font-bold cursor-pointer">
            <ArrowLeft className="w-5 h-5" /> Back
          </Link>
          <div className="text-xl font-bold tracking-tighter">STUDIO<span className="text-zinc-500">.</span></div>
        </nav>

        {/* Hero Section (Parallax) */}
        <div className="relative h-screen overflow-hidden flex items-end pb-24 px-6 md:px-24">
          <motion.div 
            style={{ y: y1, opacity }}
            className="absolute inset-0 z-0 bg-zinc-900 border-b border-white/10 flex items-center justify-center overflow-hidden"
          >
            {/* Real Project Cover Image */}
            <img src={project.heroImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="text-[30vw] font-black text-white/5 tracking-tighter select-none z-0 absolute">{project.title[0]}</div>
          </motion.div>
          
          <div className="relative z-10 w-full">
            <TextReveal text={project.title} className="text-6xl md:text-[12vw] font-black tracking-tighter leading-[0.8] mb-8" />
          </div>
        </div>

        {/* Project Meta */}
        <div className="bg-black relative z-20 pt-24 px-6 md:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/20 pt-12">
            <div>
              <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">Client</h4>
              <p className="text-xl font-medium">{project.client}</p>
            </div>
            <div>
              <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">Role</h4>
              <p className="text-xl font-medium">{project.role}</p>
            </div>
            <div>
              <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">Timeline</h4>
              <p className="text-xl font-medium">{project.timeline}</p>
            </div>
            <div>
              <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">Live</h4>
              <a href={project.liveUrl} className="inline-flex items-center gap-2 text-xl font-medium hover:text-zinc-400 transition-colors cursor-pointer">
                Visit Site <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* The Challenge - Cinematic Horizontal Scroll */}
        <div ref={horizontalRef} className="h-[300vh] bg-black relative z-20">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-t border-white/10">
            <div className="absolute top-24 left-6 md:left-24">
              <TextReveal text="The Objective." className="text-4xl font-bold" delay={0.2} />
            </div>
            
            <motion.div 
              style={{ x: xMovement }} 
              className="flex items-center w-[250vw] md:w-[200vw] px-6 md:px-24 whitespace-nowrap"
            >
              <h2 className="text-[10vw] md:text-[8vw] font-black tracking-tighter leading-none text-zinc-400">
                <span className="text-white">We were approached to completely shatter the industry standard.</span> {project.challenge} {project.challenge}
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-black relative z-20 pb-40">
           <WebGLCarousel images={project.gallery} />
        </div>

        {/* Next Project Footer - Cinematic Scale Reveal */}
        <div className="bg-black relative z-20 overflow-hidden">
          <motion.div style={{ scale: footerScale, y: footerY }} className="origin-bottom">
            <Link 
              ref={footerRef}
              to={`/case-study/${nextProject.slug}`} 
              onClick={() => window.scrollTo(0,0)} 
              className="block bg-white text-black relative py-40 px-6 md:px-24 group cursor-pointer hover:bg-zinc-200 transition-colors duration-500 rounded-t-[3rem]"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="font-bold uppercase tracking-widest mb-6">Next Project</p>
                  <h2 className="text-6xl md:text-[10vw] font-black tracking-tighter leading-none group-hover:pl-8 transition-all duration-500">
                    {nextProject.title}
                  </h2>
                </div>
                <ArrowUpRight className="w-16 h-16 md:w-32 md:h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-12 md:mt-0" />
              </div>
            </Link>
          </motion.div>
        </div>
        
      </motion.div>
    </>
  );
}
