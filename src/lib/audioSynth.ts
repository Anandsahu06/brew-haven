// Web Audio API Ambient Cafe Sound Synthesizer

class AudioSynthEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;

  // Sound nodes
  private rainGain: GainNode | null = null;
  private steamGain: GainNode | null = null;
  private cozyGain: GainNode | null = null;

  private rainNoiseNode: AudioBufferSourceNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startSoundscape() {
    this.initContext();
    if (this.isPlaying || !this.ctx || !this.masterGain) return;

    this.isPlaying = true;

    // 1. Create Rain Sound (Filtered Noise)
    const bufferSize = this.ctx.sampleRate * 2;
    const rainBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const rainOutput = rainBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      rainOutput[i] = Math.random() * 2 - 1;
    }

    this.rainNoiseNode = this.ctx.createBufferSource();
    this.rainNoiseNode.buffer = rainBuffer;
    this.rainNoiseNode.loop = true;

    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

    this.rainNoiseNode.connect(rainFilter);
    rainFilter.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);
    this.rainNoiseNode.start();

    // 2. Create Cozy Warm Harmonic Warmth (Sine drone with chorus effect)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 note
    osc2.frequency.setValueAtTime(164.81, this.ctx.currentTime); // E3 fifth

    this.cozyGain = this.ctx.createGain();
    this.cozyGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    const warmFilter = this.ctx.createBiquadFilter();
    warmFilter.type = 'lowpass';
    warmFilter.frequency.setValueAtTime(350, this.ctx.currentTime);

    osc1.connect(warmFilter);
    osc2.connect(warmFilter);
    warmFilter.connect(this.cozyGain);
    this.cozyGain.connect(this.masterGain);

    osc1.start();
    osc2.start();
  }

  public stopSoundscape() {
    if (!this.isPlaying || !this.ctx) return;
    if (this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.ctx && this.ctx.state === 'running') {
          this.ctx.suspend();
        }
        this.isPlaying = false;
      }, 500);
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, volume));
      this.masterGain.gain.setValueAtTime(clamped * 0.5, this.ctx.currentTime);
    }
  }

  public toggleSteamBurst() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Create realistic short espresso steam valve hiss
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const steamNode = this.ctx.createBufferSource();
    steamNode.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3000, this.ctx.currentTime);
    filter.Q.setValueAtTime(2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    steamNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    steamNode.start(now);
    steamNode.stop(now + 1.5);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioSynth = new AudioSynthEngine();
