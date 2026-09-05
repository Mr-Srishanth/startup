export function Footer() {
  return (
    <div 
      className="relative h-[100vh] bg-black text-white overflow-hidden clip-path-footer"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="fixed bottom-0 h-[100vh] w-full flex flex-col justify-between p-12 md:p-24 pb-8 z-0">
        
        <div className="flex justify-between items-start relative z-10 pt-12 md:pt-24">
          <div className="max-w-md">
            <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-none">Let's build<br/>something<br/>impossible.</h3>
            <p className="text-zinc-500 font-medium">We partner with ambitious brands to create digital experiences that define the future.</p>
          </div>
          
          <div className="flex gap-16 text-sm font-bold uppercase tracking-widest text-zinc-400">
            <ul className="space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer"><a href="#">Instagram</a></li>
              <li className="hover:text-white transition-colors cursor-pointer"><a href="#">Twitter</a></li>
              <li className="hover:text-white transition-colors cursor-pointer"><a href="#">LinkedIn</a></li>
            </ul>
            <ul className="space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer"><a href="#">Work</a></li>
              <li className="hover:text-white transition-colors cursor-pointer"><a href="#">Agency</a></li>
              <li className="hover:text-white transition-colors cursor-pointer"><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center relative z-10 pointer-events-none">
          <h1 className="text-[15vw] leading-none font-black tracking-tighter text-white/90">
            STUDIO.
          </h1>
          <div className="w-full flex justify-between items-center border-t border-white/20 pt-6 mt-12 text-xs font-bold uppercase tracking-widest text-zinc-600">
            <span>Ac 2026 Studio Inc.</span>
            <span>All Rights Reserved.</span>
            <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
