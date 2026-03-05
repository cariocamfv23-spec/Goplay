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
]

function detectLanguage(text: string) {
  if (!text) return 'pt'
  const lowerText = text.toLowerCase()
  const words = lowerText.match(/\b\w+\b/g) || []
  const enCount = words.filter((w) => enWords.includes(w)).length

  if (enCount >= 2) return 'en'
  return 'pt'
}

function mockTranslateText(text: string): string {
  if (!text) return text
  let translated = text
  translated = translated.replace(
    /Great win yesterday! Hard work pays off./gi,
    'Grande vitória de ontem! O trabalho duro compensa.',
  )
  translated = translated.replace(/Amazing skills/gi, 'Habilidades incríveis')
  translated = translated.replace(/Unbelievable shot/gi, 'Chute inacreditável')
  translated = translated.replace(
    /Dunk Contest Winner/gi,
    'Vencedor do Torneio de Enterradas',
  )
  translated = translated.replace(
    /Jumped from the free throw line! Zero gravity confirmed on center court./gi,
    'Saltou da linha de lance livre! Gravidade zero confirmada na quadra central.',
  )

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

  useEffect(() => {
    const combined = texts.join(' ')
    setLanguage(detectLanguage(combined))
    setIsTranslated(false)
    setTranslatedTexts([])
  }, [texts.join('')])

  const toggleTranslation = async (e?: React.MouseEvent) => {
    e?.stopPropagation()
    e?.preventDefault()
    if (isTranslated) {
      setIsTranslated(false)
    } else {
      if (translatedTexts.length === 0) {
        setIsLoading(true)
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
