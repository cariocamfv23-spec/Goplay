import { useEffect } from 'react'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { WeatherAlertBanner } from './WeatherAlertBanner'
import { WeatherAlertDialog } from './WeatherAlertDialog'

export function WeatherAlertManager() {
  const { checkWeather } = useWeatherStore()

  useEffect(() => {
    // Automatically check for weather alerts when the component mounts (app launch/navigation)
    // We use a small delay to simulate network request and ensure smooth UI loading
    const timer = setTimeout(() => {
      checkWeather()
    }, 1000)

    return () => clearTimeout(timer)
  }, [checkWeather])

  return (
    <>
      <WeatherAlertDialog />
      <WeatherAlertBanner />
    </>
  )
}
