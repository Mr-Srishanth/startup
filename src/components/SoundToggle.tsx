import { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted);

  const toggleSound = () => {
    if (isMuted) {
      soundEngine.init();
      setIsMuted(false);
    } else {
      soundEngine.mute();
      setIsMuted(true);
    }
    soundEngine.playTick();
  };

  return (
    <button
      onClick={toggleSound}
      onMouseEnter={() => soundEngine.playTick()}
      className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer mix-blend-difference text-white"
    >
      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      Sound
    </button>
  );
}
