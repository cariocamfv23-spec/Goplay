/**
 * Returns a high-quality Unsplash-powered image URL based on the sport modality.
 * Uses the img.usecurling.com proxy for optimized delivery.
 */
export const getSportCoverImage = (sport?: string) => {
  const s = sport?.toLowerCase() || ''

  // Detailed mapping for high-fidelity sports imagery
  if (s.includes('futebol') || s.includes('soccer')) {
    return 'https://img.usecurling.com/p/1200/600?q=soccer%20stadium%20night%20lights&color=blue&dpr=2'
  }
  if (s.includes('futsal')) {
    return 'https://img.usecurling.com/p/1200/600?q=futsal%20court%20indoor%20professional&color=blue&dpr=2'
  }
  if (s.includes('basquete') || s.includes('basketball')) {
    return 'https://img.usecurling.com/p/1200/600?q=basketball%20arena%20court&color=orange&dpr=2'
  }
  if (s.includes('vôlei') || s.includes('volleyball')) {
    return 'https://img.usecurling.com/p/1200/600?q=volleyball%20court%20indoor&color=yellow&dpr=2'
  }
  if (s.includes('tênis') || s.includes('tennis')) {
    return 'https://img.usecurling.com/p/1200/600?q=tennis%20court%20clay&color=orange&dpr=2'
  }
  if (s.includes('surf') || s.includes('surfing')) {
    return 'https://img.usecurling.com/p/1200/600?q=surfing%20ocean%20wave&color=cyan&dpr=2'
  }
  if (s.includes('skate')) {
    return 'https://img.usecurling.com/p/1200/600?q=skate%20park%20concrete&color=gray&dpr=2'
  }
  if (s.includes('jiu') || s.includes('bjj') || s.includes('judo')) {
    return 'https://img.usecurling.com/p/1200/600?q=martial%20arts%20tatami&color=black&dpr=2'
  }
  if (s.includes('boxe') || s.includes('boxing') || s.includes('mma')) {
    return 'https://img.usecurling.com/p/1200/600?q=boxing%20ring%20dark&color=red&dpr=2'
  }
  if (s.includes('crossfit') || s.includes('funcional')) {
    return 'https://img.usecurling.com/p/1200/600?q=gym%20weights%20dark&color=black&dpr=2'
  }
  if (
    s.includes('academia') ||
    s.includes('fitness') ||
    s.includes('bodybuilding')
  ) {
    return 'https://img.usecurling.com/p/1200/600?q=gym%20workout%20dark&color=black&dpr=2'
  }
  if (s.includes('bike') || s.includes('ciclismo') || s.includes('cycling')) {
    return 'https://img.usecurling.com/p/1200/600?q=road%20cycling%20forest&color=green&dpr=2'
  }
  if (
    s.includes('corrida') ||
    s.includes('running') ||
    s.includes('atletismo')
  ) {
    return 'https://img.usecurling.com/p/1200/600?q=running%20track%20stadium&color=red&dpr=2'
  }
  if (s.includes('natação') || s.includes('swimming')) {
    return 'https://img.usecurling.com/p/1200/600?q=swimming%20pool%20lanes&color=cyan&dpr=2'
  }
  if (s.includes('futevôlei') || s.includes('beach')) {
    return 'https://img.usecurling.com/p/1200/600?q=beach%20volleyball%20sand&color=yellow&dpr=2'
  }

  // Fallback for unknown sports
  return 'https://img.usecurling.com/p/1200/600?q=stadium%20lights%20night&color=blue&dpr=2'
}
