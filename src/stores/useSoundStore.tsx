import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'

type SoundPack = 'varzea' | 'arena' | 'street'

interface SoundSettings {
  masterEnabled: boolean
  volume: number
  silentInMatches: boolean
  activePack: SoundPack
}

interface SoundStore extends SoundSettings {
  setMasterEnabled: (enabled: boolean) => void
  setVolume: (volume: number) => void
  setSilentInMatches: (enabled: boolean) => void
  setActivePack: (pack: SoundPack) => void
  playSound: (category: SoundCategory, context?: string) => void
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

const useSoundStore = create<SoundStore>()(
  persist(
    (set, get) => ({
      masterEnabled: true,
      volume: 0.8,
      silentInMatches: false,
      activePack: 'varzea',

      setMasterEnabled: (enabled) => set({ masterEnabled: enabled }),
      setVolume: (volume) => set({ volume }),
      setSilentInMatches: (enabled) => set({ silentInMatches: enabled }),
      setActivePack: (pack) => set({ activePack: pack }),

      playSound: (category, context) => {
        const { masterEnabled, volume, activePack } = get()

        if (!masterEnabled) return

        // Check for Silent Mode in Matches (Mock check, assuming we are not in a match for this demo logic unless specified)
        // In a real app, we would check the current route or game state.

        // TTS Fallback for "Sounds" since we don't have real audio files
        // This simulates the auditory experience requested in the User Story
        if ('speechSynthesis' in window) {
          const synth = window.speechSynthesis
          let textToSpeak = ''
          let pitch = 1
          let rate = 1.2

          switch (category) {
            case 'like_football': {
              // Randomize football slang
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
              textToSpeak = 'Splash!'
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
              // Elegant chime simulation via text? Or just a gentle "Parceiro Goplay"
              textToSpeak = 'Parceiro!'
              pitch = 1.2
              break
            case 'notification_invite':
              textToSpeak = 'Convocado!'
              break
            case 'notification_checkin':
              textToSpeak = 'Check-in aprovado!'
              break
            case 'notification_uber': {
              const uberSounds = ['Hoje é só chegar!', 'Uber do brabo tá pago!']
              textToSpeak =
                uberSounds[Math.floor(Math.random() * uberSounds.length)]
              break
            }
            case 'notification_points':
              // Coin sound simulation
              textToSpeak = 'Goplay!'
              pitch = 1.5
              rate = 2
              break
            case 'notification_store':
              textToSpeak = 'Conquista desbloqueada!'
              break
            default:
              // Generic
              break
          }

          if (textToSpeak) {
            // Cancel previous utterances
            synth.cancel()

            const utterance = new SpeechSynthesisUtterance(textToSpeak)
            utterance.volume = volume
            utterance.rate = rate
            utterance.pitch = pitch

            // Try to find a Portuguese voice
            const voices = synth.getVoices()
            const ptVoice = voices.find((v) => v.lang.includes('pt'))
            if (ptVoice) utterance.voice = ptVoice

            synth.speak(utterance)
          }
        }

        // Visual feedback for debugging/demo purposes if sound is muted on system level
        // toast.info(`🔊 ${category}`, { duration: 1000, position: 'bottom-center' })
      },
    }),
    {
      name: 'goplay-sound-storage',
    },
  ),
)

export default useSoundStore
