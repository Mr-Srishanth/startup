export function Pricing() {
  return (
    <section className="py-40 px-6 border-t border-white/10 relative z-20 bg-transparent" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">Investment.</h2>
            <p className="text-xl text-zinc-400 font-medium">Clear, transparent pricing for world-class engineering. No hidden fees, no retainers.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Pro Tier */}
          <div className="group p-12 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/5 transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-8 mb-8">
                <h3 className="text-4xl font-bold tracking-tight">The Build</h3>
                <span className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">Standard</span>
              </div>
              <div className="flex items-baseline gap-2 mb-12">
                <span className="text-6xl font-black tracking-tighter">$15k</span>
                <span className="text-zinc-500 font-medium">/project</span>
              </div>
              
              <ul className="space-y-6 text-zinc-400 font-medium mb-16">
                <li className="flex items-center gap-4"><div className="w-2 h-2 bg-white rounded-full" /> Custom Awwwards-tier Design</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 bg-white rounded-full" /> React / Next.js Development</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 bg-white rounded-full" /> Framer Motion Animations</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 bg-white rounded-full" /> Basic WebGL Integration</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 bg-white rounded-full" /> CMS Setup</li>
              </ul>
            </div>
            <button className="w-full py-6 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
              Start Project
            </button>
          </div>

          {/* Elite Tier */}
          <div className="group p-12 rounded-[2rem] border border-white bg-white text-black hover:scale-[1.02] transition-transform duration-500 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-black/10 pb-8 mb-8">
                <h3 className="text-4xl font-bold tracking-tight">The Experience</h3>
                <span className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full">Unlimited</span>
              </div>
              <div className="flex items-baseline gap-2 mb-12">
                <span className="text-6xl font-black tracking-tighter">$50k</span>
                <span className="text-zinc-500 font-medium">/project</span>
              </div>
              
              <ul className="space-y-6 text-black/70 font-medium mb-16">
                <li className="flex items-center gap-4"><div className="w-2 h-2 bg-black rounded-full" /> Everything in Standard</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 bg-black rounded-full" /> Full Custom Shader Pipeline</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 bg-black rounded-full" /> Physics-based Interactions</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 bg-black rounded-full" /> Infinite WebGL Scroll Depth</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 bg-black rounded-full" /> 24/7 Priority Support</li>
              </ul>
            </div>
            <button className="w-full py-6 rounded-full bg-black text-white font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors duration-300">
              Apply Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
