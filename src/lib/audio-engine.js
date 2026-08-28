// Web Audio API Synthesizer for Japan Soundscapes & Station Melodies
class JapanAudioEngine {
  constructor() {
    this.ctx = null
    this.currentTrack = null
    this.isPlaying = false
    this.volume = 0.4
    this.intervalId = null
    this.gainNode = null
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      this.ctx = new AudioContext()
      this.gainNode = this.ctx.createGain()
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime)
      this.gainNode.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  setVolume(val) {
    this.volume = val
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(val, this.ctx.currentTime)
    }
  }

  // Play click / interaction SFX (Retro 8-bit coin)
  playCoinSFX() {
    try {
      this.init()
      const t = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(987.77, t) // B5
      osc.frequency.setValueAtTime(1318.51, t + 0.08) // E6

      gain.gain.setValueAtTime(this.volume * 0.3, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(t)
      osc.stop(t + 0.35)
    } catch (e) {
      // AudioContext blocked
    }
  }

  // Play Yamanote Line Departure Chime (Authentic "Seseragi / Spring" melody)
  playStationJingle() {
    try {
      this.init()
      const notes = [
        { f: 523.25, d: 0.15 }, // C5
        { f: 659.25, d: 0.15 }, // E5
        { f: 783.99, d: 0.15 }, // G5
        { f: 1046.50, d: 0.3 }, // C6
        { f: 880.00, d: 0.15 }, // A5
        { f: 783.99, d: 0.15 }, // G5
        { f: 659.25, d: 0.35 }, // E5
        { f: 587.33, d: 0.15 }, // D5
        { f: 659.25, d: 0.15 }, // E5
        { f: 783.99, d: 0.2 },  // G5
        { f: 1046.50, d: 0.5 }  // C6
      ]

      let curTime = this.ctx.currentTime + 0.05
      notes.forEach(({ f, d }) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(f, curTime)

        // Add soft bell harmonic
        const harmonic = this.ctx.createOscillator()
        const hGain = this.ctx.createGain()
        harmonic.type = 'sine'
        harmonic.frequency.setValueAtTime(f * 2, curTime)

        gain.gain.setValueAtTime(this.volume * 0.4, curTime)
        gain.gain.exponentialRampToValueAtTime(0.001, curTime + d * 1.5)

        hGain.gain.setValueAtTime(this.volume * 0.15, curTime)
        hGain.gain.exponentialRampToValueAtTime(0.001, curTime + d * 1.2)

        osc.connect(gain)
        harmonic.connect(hGain)
        gain.connect(this.ctx.destination)
        hGain.connect(this.ctx.destination)

        osc.start(curTime)
        harmonic.start(curTime)
        osc.stop(curTime + d * 1.5)
        harmonic.stop(curTime + d * 1.2)

        curTime += d
      })
    } catch (e) {
      console.error(e)
    }
  }

  // Play Zen Garden Wind Chimes (Procedural pentatonic chimes)
  startZenChimes() {
    this.stopAmbience()
    this.init()
    this.isPlaying = true
    this.currentTrack = 'zen'

    const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51]

    const triggerChime = () => {
      if (!this.isPlaying || this.currentTrack !== 'zen') return
      const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)]
      const t = this.ctx.currentTime

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, t)

      gain.gain.setValueAtTime(this.volume * 0.25, t)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.5)

      osc.connect(gain)
      gain.connect(this.gainNode)

      osc.start(t)
      osc.stop(t + 2.5)

      const nextDelay = 800 + Math.random() * 2200
      this.intervalId = setTimeout(triggerChime, nextDelay)
    }

    triggerChime()
  }

  // Play Rainy Tokyo Night Lo-Fi
  startRainAmbience() {
    this.stopAmbience()
    this.init()
    this.isPlaying = true
    this.currentTrack = 'rain'

    // Generate brown / pink rain noise buffer
    const bufferSize = this.ctx.sampleRate * 2
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let lastOut = 0.0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      data[i] = (lastOut + (0.02 * white)) / 1.02
      lastOut = data[i]
      data[i] *= 3.5 // boost gain
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, this.ctx.currentTime)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.gainNode)

    noise.start()
    this.activeNoise = noise

    // Occasional water droplets
    const triggerDrop = () => {
      if (!this.isPlaying || this.currentTrack !== 'rain') return
      const t = this.ctx.currentTime
      const dropOsc = this.ctx.createOscillator()
      const dropGain = this.ctx.createGain()
      dropOsc.type = 'sine'
      const startF = 1200 + Math.random() * 600
      dropOsc.frequency.setValueAtTime(startF, t)
      dropOsc.frequency.exponentialRampToValueAtTime(300, t + 0.08)

      dropGain.gain.setValueAtTime(this.volume * 0.15, t)
      dropGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08)

      dropOsc.connect(dropGain)
      dropGain.connect(this.gainNode)
      dropOsc.start(t)
      dropOsc.stop(t + 0.08)

      this.intervalId = setTimeout(triggerDrop, 400 + Math.random() * 1200)
    }

    triggerDrop()
  }

  stopAmbience() {
    this.isPlaying = false
    this.currentTrack = null
    if (this.intervalId) {
      clearTimeout(this.intervalId)
      this.intervalId = null
    }
    if (this.activeNoise) {
      try {
        this.activeNoise.stop()
        this.activeNoise.disconnect()
      } catch (e) {}
      this.activeNoise = null
    }
  }
}

export const audioEngine = new JapanAudioEngine()
