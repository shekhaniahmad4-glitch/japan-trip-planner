// Robust Dual-Engine Text-to-Speech for Authentic Japanese Audio
let activeAudio = null
let utteranceRef = null

export function speakJapanese(text, onStart, onEnd) {
  try {
    // 1. Stop any currently playing audio
    if (activeAudio) {
      try {
        activeAudio.pause()
        activeAudio.currentTime = 0
      } catch (e) {}
      activeAudio = null
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel()
      } catch (e) {}
    }

    if (onStart) onStart()

    // 2. High-quality Japanese Native Audio stream
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(text)}`
    const audio = new Audio(ttsUrl)
    activeAudio = audio

    let hasEnded = false
    const handleEnd = () => {
      if (hasEnded) return
      hasEnded = true
      activeAudio = null
      if (onEnd) onEnd()
    }

    audio.onended = handleEnd

    audio.onerror = () => {
      // If network audio fails, fallback to browser SpeechSynthesis
      fallbackSpeechSynthesis(text, onStart, handleEnd)
    }

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        fallbackSpeechSynthesis(text, onStart, handleEnd)
      })
    }
  } catch (err) {
    fallbackSpeechSynthesis(text, onStart, onEnd)
  }
}

function fallbackSpeechSynthesis(text, onStart, onEnd) {
  if (!('speechSynthesis' in window)) {
    if (onEnd) onEnd()
    return
  }

  try {
    window.speechSynthesis.resume()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.85
    utterance.volume = 1.0

    // Match Japanese voice
    const voices = window.speechSynthesis.getVoices()
    const jaVoice = voices.find(v =>
      v.lang.toLowerCase().includes('ja') ||
      v.name.toLowerCase().includes('japanese') ||
      v.name.toLowerCase().includes('japan')
    )
    if (jaVoice) {
      utterance.voice = jaVoice
    }

    utterance.onstart = () => {
      if (onStart) onStart()
    }

    utterance.onend = () => {
      utteranceRef = null
      if (onEnd) onEnd()
    }

    utterance.onerror = () => {
      utteranceRef = null
      if (onEnd) onEnd()
    }

    // Retain reference to prevent Chromium garbage collection
    utteranceRef = utterance
    window.speechSynthesis.speak(utterance)
  } catch (e) {
    if (onEnd) onEnd()
  }
}
