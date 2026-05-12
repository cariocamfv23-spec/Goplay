export interface Sticker {
  id: string
  number: number
  name: string
  country: string
  position: string
  flag: string
  image: string
  rarity: 'common' | 'rare' | 'legendary'
}

const countriesData = [
  { name: 'Brasil', flag: '🇧🇷', color: 'green' },
  { name: 'USA', flag: '🇺🇸', color: 'blue' },
  { name: 'México', flag: '🇲🇽', color: 'green' },
  { name: 'Argentina', flag: '🇦🇷', color: 'blue' },
  { name: 'França', flag: '🇫🇷', color: 'blue' },
  { name: 'Espanha', flag: '🇪🇸', color: 'red' },
  { name: 'Alemanha', flag: '🇩🇪', color: 'black' },
  { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'white' },
]

const positions = ['ATA', 'MEI', 'VOL', 'ZAG', 'LAT', 'GOL']

const names = [
  'J. Silva',
  'R. Santos',
  'T. Adams',
  'P. Gomez',
  'L. Messi',
  'K. Mbappé',
  'A. Griezmann',
  'V. Júnior',
  'E. Haaland',
  'J. Bellingham',
  'H. Kane',
  'C. Pulisic',
  'G. Ochoa',
  'R. Jiménez',
  'A. Di María',
  'O. Dembélé',
  'Pedri',
  'Gavi',
  'T. Kroos',
  'J. Musiala',
  'B. Saka',
  'P. Foden',
  'N. Neymar',
  'R. Rodrygo',
  'W. McKennie',
  'T. Weah',
  'E. Álvarez',
  'S. Giménez',
  'E. Fernández',
  'J. Álvarez',
]

export const mockStickers: Sticker[] = Array.from({ length: 40 }).map(
  (_, i) => {
    const number = i + 1
    const countryIndex = Math.floor(i / 5)
    const country = countriesData[countryIndex]
    const position = positions[i % positions.length]
    const name = names[i % names.length]

    return {
      id: `stk-${number}`,
      number,
      name,
      country: country.name,
      position,
      flag: country.flag,
      image: `https://img.usecurling.com/p/300/400?q=soccer%20player%20${country.name}&color=${country.color}&dpr=2&seed=${i}`,
      rarity: number % 5 === 0 ? 'rare' : 'common',
    }
  },
)
