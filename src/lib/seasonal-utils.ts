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

export function getSeasonalTheme(date: Date = new Date()): SeasonalTheme {
  const month = date.getMonth() // 0-11
  const day = date.getDate()
  const year = date.getFullYear()

  // New Year (Commemorative): Jan 1 - Jan 6
  // Using 'commemorative' for New Year festivities
  if (month === 0 && day <= 6) return 'commemorative'

  // Carnival: Roughly February (Feb 1 - Feb 28/29)
  // In a real app, this would calculate Ash Wednesday, but for this scope we use a fixed window
  if (month === 1) return 'carnival'

  // Easter: Roughly late March to mid April
  // Fixed window for demonstration: March 20 - April 20
  if ((month === 2 && day >= 20) || (month === 3 && day <= 20)) return 'easter'

  // World Cup: June/July in years like 2026, 2030 (year % 4 === 2)
  // Next World Cup is 2026. Approx dates: June 11 to July 19
  if (year % 4 === 2) {
    if (
      (month === 5 && day >= 11) || // June 11+
      month === 6 || // All of July (simplified for safe overlap)
      (month === 7 && day <= 19) // Up to mid July (simplified)
    ) {
      return 'world-cup'
    }
  }

  // Christmas: Dec 1 - Dec 31
  if (month === 11) return 'christmas'

  // Default: No seasonal theme
  return null
}
