/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * Cyber Soundboard & Web Audio API Synthesizer
 */

class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.ambientEnabled = false;
    this.masterVolume = 0.5;

    // Ambient Drone Nodes
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneGain = null;
    this.droneFilter = null;
    this.lfo = null;

    // Load preferences
    const savedSfx = localStorage.getItem('knowyourscam_sfx') || localStorage.getItem('guardianspace_sfx');
    if (savedSfx !== null) this.sfxEnabled = savedSfx === 'true';

    const savedVol = localStorage.getItem('knowyourscam_vol') || localStorage.getItem('guardianspace_vol');
    if (savedVol !== null) this.masterVolume = parseFloat(savedVol);
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Futuristic Beep / Chirp
  playClick() {
    if (!this.sfxEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(1750, now + 0.06);

      gain.gain.setValueAtTime(0.22 * this.masterVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio click error:', e);
    }
  }

  // Success Cyber Harmonic Chime
  playSuccess() {
    if (!this.sfxEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 cyber arpeggio

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.25 * this.masterVolume, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.45);
      });
    } catch (e) {
      console.warn('Audio success error:', e);
    }
  }

  // Error Glitch Sawtooth Buzz
  playError() {
    if (!this.sfxEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.22);

      gain.gain.setValueAtTime(0.3 * this.masterVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {
      console.warn('Audio error error:', e);
    }
  }

  // Pulse Whoosh (for hover or card drop)
  playWhoosh() {
    if (!this.sfxEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);

      gain.gain.setValueAtTime(0.18 * this.masterVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.17);
    } catch (e) {
      console.warn('Audio whoosh error:', e);
    }
  }

  // Radar Alert Tone
  playAlert() {
    if (!this.sfxEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [0, 0.14].forEach((offset) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now + offset);
        gain.gain.setValueAtTime(0.2 * this.masterVolume, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + offset);
        osc.stop(now + offset + 0.11);
      });
    } catch (e) {
      console.warn('Audio alert error:', e);
    }
  }

  // Ambient Hypnotic Cyber Drone (Sub-bass + Filtered Harmonic)
  toggleAmbientDrone(forceState = null) {
    this.initContext();
    if (!this.ctx) return false;

    if (forceState !== null) {
      this.ambientEnabled = forceState;
    } else {
      this.ambientEnabled = !this.ambientEnabled;
    }

    if (this.ambientEnabled) {
      this.startDrone();
    } else {
      this.stopDrone();
    }

    return this.ambientEnabled;
  }

  startDrone() {
    if (!this.ctx) return;
    if (this.droneOsc1) this.stopDrone();

    const now = this.ctx.currentTime;

    // Filter
    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(220, now);

    // Master Drone Gain
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.linearRampToValueAtTime(0.12 * this.masterVolume, now + 2.5);

    // Sub-oscillator 1 (55Hz - A1)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(55, now);

    // Harmonic oscillator 2 (110Hz - A2 with detune)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(110.4, now);

    // Subtle LFO modulation for cosmic swell
    this.lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    this.lfo.frequency.setValueAtTime(0.18, now); // Slow 5.5s cycle
    lfoGain.gain.setValueAtTime(60, now);

    this.lfo.connect(lfoGain);
    lfoGain.connect(this.droneFilter.frequency);

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneFilter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);

    this.droneOsc1.start(now);
    this.droneOsc2.start(now);
    this.lfo.start(now);
  }

  stopDrone() {
    if (this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.001, now + 1.2);
      setTimeout(() => {
        try {
          if (this.droneOsc1) { this.droneOsc1.stop(); this.droneOsc1.disconnect(); this.droneOsc1 = null; }
          if (this.droneOsc2) { this.droneOsc2.stop(); this.droneOsc2.disconnect(); this.droneOsc2 = null; }
          if (this.lfo) { this.lfo.stop(); this.lfo.disconnect(); this.lfo = null; }
        } catch (e) {}
      }, 1300);
    }
  }

  setVolume(val) {
    this.masterVolume = Math.max(0, Math.min(1, parseFloat(val)));
    localStorage.setItem('knowyourscam_vol', this.masterVolume);
    if (this.droneGain && this.ctx && this.ambientEnabled) {
      this.droneGain.gain.setValueAtTime(0.12 * this.masterVolume, this.ctx.currentTime);
    }
  }

  toggleSFX(forceState = null) {
    if (forceState !== null) {
      this.sfxEnabled = forceState;
    } else {
      this.sfxEnabled = !this.sfxEnabled;
    }
    localStorage.setItem('knowyourscam_sfx', this.sfxEnabled);
    return this.sfxEnabled;
  }
}

// Global instance
window.cyberAudio = new CyberAudioEngine();

