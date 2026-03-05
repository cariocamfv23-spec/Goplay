import { useState, useEffect } from 'react'

const enWords = [
  'the',
  'is',
  'and',
  'to',
  'in',
  'of',
  'that',
  'it',
  'for',
  'on',
  'with',
  'great',
  'awesome',
  'game',
  'play',
  'match',
  'win',
  'yesterday',
  'hard',
  'work',
  'pays',
  'off',
  'unbelievable',
  'shot',
  'skills',
  'dunk',
  'contest',
  'winner',
  'jumped',
  'from',
  'free',
  'throw',
  'line',
  'zero',
  'gravity',
  'confirmed',
  'center',
  'court',
  'football',
  'soccer',
  'amazing',
  'field',
  'today',
]

function detectLanguage(text: string) {
  if (!text) return 'pt'
  const lowerText = text.toLowerCase()
  const words = lowerText.match(/\b\w+\b/g) || []
  const enCount = words.filter((w) => enWords.includes(w)).length

  // If we find 2 or more English keywords, consider it English
  if (enCount >= 2) return 'en'
  return 'pt'
}

function mockTranslateText(text: string): string {
  if (!text) return text
  let translated = text

  // High-fidelity mock translations for specific feed content
  const translations: Record<string, string> = {
    'Great win yesterday! Hard work pays off.':
      'Grande vitória ontem! O trabalho duro compensa.',
    'Amazing skills on the field today!':
      'Habilidades incríveis em campo hoje!',
    'Dunk Contest Winner': 'Vencedor do Torneio de Enterradas',
    'Jumped from the free throw line! Zero gravity confirmed on center court.':
      'Saltou da linha de lance livre! Gravidade zero confirmada na quadra central.',
    'Match Highlights': 'Melhores Momentos',
    'Training Session': 'Sessão de Treino',
  }

  for (const [en, pt] of Object.entries(translations)) {
    // Escape regex characters and replace globally while ignoring case
    const regex = new RegExp(en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    translated = translated.replace(regex, pt)
  }

  // Fallback for unknown text to simulate translation behavior
  if (translated === text) {
    translated = `(Traduzido) ${text}`
  }

  return translated
}

export function useTranslation(texts: string[]) {
  const [isTranslated, setIsTranslated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [translatedTexts, setTranslatedTexts] = useState<string[]>([])
  const [language, setLanguage] = useState('pt')

  const textsJoined = texts.join(' ')

  useEffect(() => {
    setLanguage(detectLanguage(textsJoined))
    setIsTranslated(false)
    setTranslatedTexts([])
  }, [textsJoined])

  const toggleTranslation = async (e?: React.MouseEvent) => {
    e?.stopPropagation()
    e?.preventDefault()

    if (isTranslated) {
      setIsTranslated(false)
    } else {
      if (translatedTexts.length === 0) {
        setIsLoading(true)
        // Simulate real API latency for better UX feel
        await new Promise((res) => setTimeout(res, 600))
        setTranslatedTexts(texts.map(mockTranslateText))
        setIsLoading(false)
      }
      setIsTranslated(true)
    }
  }

  return {
    language,
    isTranslated,
    isLoading,
    toggleTranslation,
    translatedTexts,
  }
}
