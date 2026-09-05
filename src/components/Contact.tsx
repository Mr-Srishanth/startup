export function Contact() {
  return (
    <section className="py-32 px-6 border-t border-white/10 relative z-20 bg-transparent" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">Let's build.</h2>
        <p className="text-xl text-zinc-400 mb-16">Ready to upgrade your digital presence? Send us a brief and we'll get back to you within 24 hours.</p>
        
        <form className="max-w-2xl mx-auto space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Name</label>
              <input type="text" className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white transition-colors" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Email</label>
              <input type="email" className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white transition-colors" placeholder="john@company.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Project Details</label>
            <textarea rows={4} className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white transition-colors resize-none" placeholder="Tell us about your goals..."></textarea>
          </div>
          <button className="w-full bg-white text-black font-bold uppercase tracking-widest py-5 rounded-xl hover:scale-[1.02] transition-transform">
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}
