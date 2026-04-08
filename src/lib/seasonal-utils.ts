/**
 * Utility to determine the current seasonal theme based on the date.
 * Used to apply micro-thematic elements to the main app icon.
 */

export type SeasonalTheme =
  | 'christmas'
  | 'carnival'
  | 'easter'
  | 'world-cup'
  | 'commemorative'
  | null

// Computes exact Easter Sunday date using Meeus/Jones/Butcher algorithm
function getEasterDate(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month, day)
}

export function getSeasonalTheme(date: Date = new Date()): SeasonalTheme {
  const month = date.getMonth() // 0-11
  const day = date.getDate()
  const year = date.getFullYear()

  // New Year (Commemorative): Dec 31 - Jan 6
  if ((month === 11 && day === 31) || (month === 0 && day <= 6))
    return 'commemorative'

  // Carnival: Roughly February 10 to February 28
  if (month === 1 && day >= 10 && day <= 28) return 'carnival'

  // Easter: 7 days before up to Easter day
  const easterDate = getEasterDate(year)
  const easterStart = new Date(easterDate)
  easterStart.setDate(easterDate.getDate() - 7)

  // Reset time portions for accurate date comparison
  const compareDate = new Date(year, month, day)

  if (compareDate >= easterStart && compareDate <= easterDate) {
    return 'easter'
  }

  // World Cup: June/July in years like 2026, 2030 (year % 4 === 2)
  if (year % 4 === 2) {
    if (
      (month === 5 && day >= 11) || // June 11+
      month === 6 || // All of July
      (month === 7 && day <= 19) // Up to mid July
    ) {
      return 'world-cup'
    }
  }

  // Christmas: Dec 15 - Dec 26
  if (month === 11 && day >= 15 && day <= 26) return 'christmas'

  // Default: No seasonal theme
  return null
}
