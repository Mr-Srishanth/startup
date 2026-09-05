class AudioEngine {
  ctx: AudioContext | null = null;
  private subOsc: OscillatorNode | null = null;
  private subGain: GainNode | null = null;
  
  // Generative Synth Properties
  private synthOscillator: OscillatorNode | null = null;
  private synthGain: GainNode | null = null;
  private synthFilter: BiquadFilterNode | null = null;
  private pentatonicScale = [130.81, 155.56, 174.61, 196.00, 233.08, 261.63, 311.13, 349.23, 392.00, 466.16, 523.25];
  
  public isMuted: boolean = true;
  droneOsc: OscillatorNode | null = null;
  droneGain: GainNode | null = null;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = false;
    this.startAmbientDrone();
    this.setupGenerativeSynth();
  }

  setupGenerativeSynth() {
    if (!this.ctx || this.synthOscillator) return;
    
    this.synthOscillator = this.ctx.createOscillator();
    this.synthOscillator.type = 'sine';
    
    this.synthFilter = this.ctx.createBiquadFilter();
    this.synthFilter.type = 'lowpass';
    this.synthFilter.frequency.value = 400;

    this.synthGain = this.ctx.createGain();
    this.synthGain.gain.value = 0; // Muted until mouse moves

    this.synthOscillator.connect(this.synthFilter);
    this.synthFilter.connect(this.synthGain);
    this.synthGain.connect(this.ctx.destination);

    this.synthOscillator.start();

    let stopTimeout: any;

    window.addEventListener('mousemove', (e) => {
      if (!this.ctx || this.isMuted) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Map X to pentatonic scale
      const index = Math.floor(x * this.pentatonicScale.length);
      const targetFreq = this.pentatonicScale[Math.min(index, this.pentatonicScale.length - 1)];

      // Map Y to filter cutoff (higher mouse = higher filter)
      const targetCutoff = 200 + (1 - y) * 2000;

      // Glide to new note and cutoff
      this.synthOscillator!.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
      this.synthFilter!.frequency.setTargetAtTime(targetCutoff, this.ctx.currentTime, 0.1);
      
      // Swell volume during movement
      this.synthGain!.gain.setTargetAtTime(0.04, this.ctx.currentTime, 0.1);

      clearTimeout(stopTimeout);
      stopTimeout = setTimeout(() => {
        if (this.ctx && this.synthGain) {
          this.synthGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5); // Fade out
        }
      }, 150);
    });
  }

  mute() {
    this.isMuted = true;
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
    }
    if (this.synthGain && this.ctx) {
      this.synthGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
    }
  }

  playTick() {
    if (this.isMuted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    // High-pitched mechanical glass tick
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playImpact() {
    if (this.isMuted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    // Deep sub-bass thud for menu opens/page transitions
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.4);
    
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  startAmbientDrone() {
    if (!this.ctx || this.droneOsc) return;
    
    this.droneOsc = this.ctx.createOscillator();
    this.droneGain = this.ctx.createGain();
    
    this.droneOsc.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);
    
    this.droneOsc.type = 'sine';
    this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low hum (A1)
    
    this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.droneGain.gain.setTargetAtTime(0.02, this.ctx.currentTime, 2.0);
    
    this.droneOsc.start();
  }

  updateScrollVelocity(velocity: number) {
    if (this.isMuted || !this.ctx || !this.droneOsc || !this.droneGain) return;
    
    // Shift pitch slightly based on scroll speed
    const targetFreq = 55 + Math.abs(velocity) * 5;
    this.droneOsc.frequency.setTargetAtTime(Math.min(targetFreq, 100), this.ctx.currentTime, 0.1);
    
    // Swell volume slightly on scroll
    const targetGain = 0.02 + Math.abs(velocity) * 0.005;
    this.droneGain.gain.setTargetAtTime(Math.min(targetGain, 0.05), this.ctx.currentTime, 0.1);
  }
}

export const soundEngine = new AudioEngine();
