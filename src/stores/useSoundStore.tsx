import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import { NarrationConfig } from '@/lib/data'

type SoundPack = 'varzea' | 'arena' | 'street'

interface SoundSettings {
  masterEnabled: boolean
  volume: number
  silentInMatches: boolean
  activePack: SoundPack
  notificationSoundsEnabled: boolean
}

interface SoundStore extends SoundSettings {
  setMasterEnabled: (enabled: boolean) => void
  setVolume: (volume: number) => void
  setSilentInMatches: (enabled: boolean) => void
  setActivePack: (pack: SoundPack) => void
  setNotificationSoundsEnabled: (enabled: boolean) => void
  playSound: (category: SoundCategory, context?: string) => void
  playNarration: (config: NarrationConfig) => void
  playTone: (type: 'weather' | 'engagement' | 'system') => void
  initAudio: () => void
  isPlayingNarration: boolean
}

type SoundCategory =
  | 'like_football'
  | 'like_basketball'
  | 'like_volleyball'
  | 'like_futsal'
  | 'like_tennis'
  | 'like_workout'
  | 'like_partner'
  | 'like_generic'
  | 'notification_invite'
  | 'notification_checkin'
  | 'notification_uber'
  | 'notification_points'
  | 'notification_store'

let audioCtx: AudioContext | null = null
const getAudioCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioCtx
}

const useSoundStore = create<SoundStore>()(
  persist(
    (set, get) => ({
      masterEnabled: true,
      volume: 0.8,
      silentInMatches: false,
      activePack: 'varzea',
      notificationSoundsEnabled: true,
      isPlayingNarration: false,

      setMasterEnabled: (enabled) => set({ masterEnabled: enabled }),
      setVolume: (volume) => set({ volume }),
      setSilentInMatches: (enabled) => set({ silentInMatches: enabled }),
      setActivePack: (pack) => set({ activePack: pack }),
      setNotificationSoundsEnabled: (enabled) =>
        set({ notificationSoundsEnabled: enabled }),

      initAudio: () => {
        try {
          const ctx = getAudioCtx()
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {})
          }
        } catch (e) {
          console.warn('AudioContext init error:', e)
        }
      },

      playTone: (type) => {
        const { masterEnabled, notificationSoundsEnabled, volume } = get()
        if (!masterEnabled || !notificationSoundsEnabled) return

        try {
          const ctx = getAudioCtx()
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {})
          }

          const t = ctx.currentTime

          const playOsc = (
            freq: number,
            oscType: OscillatorType,
            startTime: number,
            duration: number,
            vol = 0.5,
          ) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.type = oscType
            osc.frequency.setValueAtTime(freq, startTime)

            osc.connect(gain)
            gain.connect(ctx.destination)

            const adjVol = vol * volume
            gain.gain.setValueAtTime(0, startTime)
            gain.gain.linearRampToValueAtTime(adjVol, startTime + 0.02)
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

            osc.start(startTime)
            osc.stop(startTime + duration)
          }

          if (type === 'engagement') {
            // Subtle, professional "ping" or "chime" sound
            playOsc(1046.5, 'sine', t, 0.6, 0.3)
            playOsc(1318.51, 'sine', t + 0.05, 0.8, 0.2)
          } else if (type === 'system') {
            // Neutral informative sound
            playOsc(880, 'triangle', t, 0.3, 0.2)
            playOsc(880, 'triangle', t + 0.15, 0.3, 0.2)
          } else if (type === 'weather') {
            // Distinct, attention-grabbing alert sound for Civil Defense
            for (let i = 0; i < 3; i++) {
              const time = t + i * 0.3
              playOsc(880, 'square', time, 0.15, 0.15)
              playOsc(932.33, 'square', time + 0.15, 0.15, 0.15)
            }
          }
        } catch (e) {
          console.warn('AudioContext error:', e)
        }
      },

      playSound: (category, context) => {
        const { masterEnabled, volume } = get()

        if (!masterEnabled) return

        if ('speechSynthesis' in window) {
          const synth = window.speechSynthesis
          let textToSpeak = ''
          let pitch = 1
          let rate = 1.2

          switch (category) {
            case 'like_football': {
              const footballSounds = [
                'Que isso hein?!',
                'Pega essa maçã!',
                'Humildade passa longe!',
              ]
              textToSpeak =
                footballSounds[
                  Math.floor(Math.random() * footballSounds.length)
                ]
              pitch = 0.8
              break
            }
            case 'like_basketball':
              textToSpeak = 'Cesta perfeita!'
              rate = 1.5
              break
            case 'like_volleyball':
              textToSpeak = 'Bateu bonito!'
              break
            case 'like_futsal':
              textToSpeak = 'Só tapa!'
              rate = 1.3
              break
            case 'like_tennis':
              textToSpeak = 'Na linha!'
              break
            case 'like_workout':
              textToSpeak = 'Brabo demais!'
              pitch = 0.5
              break
            case 'like_partner':
              textToSpeak = 'Parceiro!'
              pitch = 1.2
              break
            case 'notification_invite':
              textToSpeak = 'Convocado!'
              break
            case 'notification_checkin':
              textToSpeak = 'Presença confirmada!'
              break
            case 'notification_uber': {
              const uberSounds = ['Hoje é só chegar!', 'Transporte garantido!']
              textToSpeak =
                uberSounds[Math.floor(Math.random() * uberSounds.length)]
              break
            }
            case 'notification_points':
              textToSpeak = 'Pontos Goplay!'
              pitch = 1.5
              rate = 2
              break
            case 'notification_store':
              textToSpeak = 'Conquista desbloqueada!'
              break
            default:
              break
          }

          if (textToSpeak) {
            synth.cancel()
            const utterance = new SpeechSynthesisUtterance(textToSpeak)
            utterance.volume = volume
            utterance.rate = rate
            utterance.pitch = pitch
            const voices = synth.getVoices()
            const ptVoice = voices.find((v) => v.lang.includes('pt'))
            if (ptVoice) utterance.voice = ptVoice
            synth.speak(utterance)
          }
        }
      },

      playNarration: (config) => {
        const { masterEnabled } = get()
        if (!masterEnabled) return

        if ('speechSynthesis' in window) {
          const synth = window.speechSynthesis
          synth.cancel()

          const utterance = new SpeechSynthesisUtterance(config.text)
          utterance.volume = config.volume

          switch (config.style) {
            case 'varzea':
              utterance.pitch = 0.8
              utterance.rate = 1.4
              break
            case 'professional':
              utterance.pitch = 1.2
              utterance.rate = 1.1
              break
            case 'comedy':
              utterance.pitch = 1.5
              utterance.rate = 1.6
              break
            case 'futuristic':
              utterance.pitch = 0.6
              utterance.rate = 0.9
              break
            case 'influencer':
              utterance.pitch = 1.3
              utterance.rate = 1.3
              break
            case 'tactical':
              utterance.pitch = 0.9
              utterance.rate = 0.9
              break
            case 'emotion':
              utterance.pitch = 1.1
              utterance.rate = 1.0
              break
            case 'gringo':
              utterance.pitch = 1.0
              utterance.rate = 1.0
              utterance.lang = 'en-US'
              break
          }

          const voices = synth.getVoices()
          let targetVoice = voices.find((v) => v.lang.includes('pt'))

          if (config.style === 'gringo') {
            const enVoice = voices.find((v) => v.lang.includes('en'))
            if (enVoice) targetVoice = enVoice
          }

          if (targetVoice) utterance.voice = targetVoice

          utterance.onstart = () => set({ isPlayingNarration: true })
          utterance.onend = () => set({ isPlayingNarration: false })
          utterance.onerror = () => set({ isPlayingNarration: false })

          synth.speak(utterance)
        } else {
          toast.error('Navegador sem suporte a áudio.')
        }
      },
    }),
    {
      name: 'goplay-sound-storage',
    },
  ),
)

export default useSoundStore
