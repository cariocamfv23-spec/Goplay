export interface Sticker {
  id: string
  number: number
  name: string
  country: string
  image: string
  rarity: 'common' | 'rare' | 'legendary'
}

const countries = [
  'Brasil',
  'Argentina',
  'França',
  'Alemanha',
  'Inglaterra',
  'Espanha',
  'Portugal',
  'Itália',
]

export const mockStickers: Sticker[] = Array.from({ length: 40 }).map(
  (_, i) => {
    const number = i + 1
    const countryIndex = Math.floor(i / 5)
    const country = countries[countryIndex]
    const colors = [
      'green',
      'blue',
      'red',
      'black',
      'white',
      'orange',
      'red',
      'blue',
    ]

    return {
      id: `stk-${number}`,
      number,
      name: `Figurinha ${number}`,
      country,
      image: `https://img.usecurling.com/p/300/400?q=soccer%20player%20${country}&color=${colors[countryIndex]}&dpr=2`,
      rarity: number % 5 === 0 ? 'rare' : 'common',
    }
  },
)
