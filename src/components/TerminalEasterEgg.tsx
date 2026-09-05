import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECRET_CODE = 'studio';

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: '===============================================' },
    { type: 'output', text: ' STUDIO MAINFRAME OS v1.0.0 (God Tier Edition) ' },
    { type: 'output', text: '===============================================' },
    { type: 'output', text: 'SYSTEM OVERRIDE ENGAGED.' },
    { type: 'output', text: 'Welcome to the Creative Engineering Mainframe.' },
    { type: 'output', text: 'Type "help" for a list of commands.' }
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Konami Code Listener
  useEffect(() => {
    let typed = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) return; // Terminal handles its own input when open
      typed += e.key.toLowerCase();
      if (typed.length > SECRET_CODE.length) {
        typed = typed.slice(-SECRET_CODE.length);
      }
      if (typed === SECRET_CODE) {
        setIsOpen(true);
        typed = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Keep focus on input and scroll to bottom
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
     if (isOpen && inputRef.current) {
       inputRef.current.focus();
     }
     if (containerRef.current) {
       containerRef.current.scrollTop = containerRef.current.scrollHeight;
     }
  }, [isOpen, history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', text: `> ${input}` } as const];
    
    if (cmd === 'help') {
      newHistory.push({ type: 'output', text: 'AVAILABLE COMMANDS:' });
      newHistory.push({ type: 'output', text: '- about   : Discover our true nature' });
      newHistory.push({ type: 'output', text: '- contact : Get the direct line' });
      newHistory.push({ type: 'output', text: '- source  : Access classified repository data' });
      newHistory.push({ type: 'output', text: '- theme   : [color] Override global system colors' });
      newHistory.push({ type: 'output', text: '- clear   : Purge terminal logs' });
      newHistory.push({ type: 'output', text: '- exit    : Return to visual interface' });
    } else if (cmd === 'about') {
      newHistory.push({ type: 'output', text: 'We are an elite cartel of creative engineers. We build the impossible.' });
    } else if (cmd === 'contact') {
      newHistory.push({ type: 'output', text: 'INITIATING SECURE LINE... (Ping us at godtier@studio.com)' });
    } else if (cmd === 'source') {
      newHistory.push({ type: 'output', text: 'ACCESS DENIED. THIS ARCHITECTURE IS CLASSIFIED.' });
    } else if (cmd.startsWith('theme ')) {
      const color = cmd.replace('theme ', '').trim();
      document.body.style.backgroundColor = color;
      newHistory.push({ type: 'output', text: `SYSTEM THEME OVERRIDDEN: ${color.toUpperCase()}` });
      newHistory.push({ type: 'output', text: 'WARNING: VISUAL INTEGRITY COMPROMISED.' });
    } else if (cmd === 'clear') {
       setHistory([]);
       setInput('');
       return;
    } else if (cmd === 'exit') {
       setIsOpen(false);
       setInput('');
       return;
    } else {
      newHistory.push({ type: 'output', text: `Command not found: ${cmd}` });
    }
    
    setHistory(newHistory);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-md text-[#00ff00] font-mono p-6 md:p-12 overflow-y-auto"
          onClick={() => inputRef.current?.focus()}
          ref={containerRef}
        >
          <div className="max-w-4xl mx-auto w-full">
            {history.map((line, i) => (
              <div key={i} className={`mb-2 ${line.type === 'input' ? 'text-white' : 'text-[#00ff00] drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]'}`}>
                {line.text}
              </div>
            ))}
            <form onSubmit={handleCommand} className="flex mt-4">
              <span className="text-white mr-4 font-bold">{'>'}</span>
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-white font-bold tracking-widest uppercase"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
