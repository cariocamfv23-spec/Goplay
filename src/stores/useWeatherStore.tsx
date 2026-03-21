import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WeatherCondition } from '@/lib/data'
import useSoundStore from './useSoundStore'

export interface WeatherAlert {
  id: string
  title: string
  message: string
  type: WeatherCondition
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: string
  active: boolean
}

interface WeatherPreferences {
  enabled: boolean
  storm: boolean
  heavyRain: boolean
  intenseCold: boolean
  extremeHeat: boolean
}

interface WeatherState {
  preferences: WeatherPreferences
  activeAlerts: WeatherAlert[]
  currentLocation: string

  toggleAll: (enabled: boolean) => void
  toggleType: (
    type: keyof Omit<WeatherPreferences, 'enabled'>,
    enabled: boolean,
  ) => void
  addAlert: (alert: WeatherAlert) => void
  dismissAlert: (id: string) => void
  clearAlerts: () => void
  checkWeather: () => void
}

const SAMPLE_ALERTS: Partial<WeatherAlert>[] = [
  {
    type: 'storm',
    title: 'DEFESA CIVIL: ALERTA DE TEMPESTADE',
    message:
      'Previsão de tempestade severa com raios e rajadas de vento para sua região nas próximas horas. Evite áreas abertas.',
    severity: 'critical',
  },
  {
    type: 'rainy',
    title: 'DEFESA CIVIL: CHUVAS INTENSAS',
    message:
      'Risco de alagamentos e deslizamentos devido ao grande volume de chuva. Se estiver em área de risco, busque abrigo.',
    severity: 'high',
  },
  {
    type: 'sunny',
    title: 'DEFESA CIVIL: ONDA DE CALOR',
    message:
      'Temperaturas perigosamente elevadas. Hidrate-se constantemente e evite exposição direta ao sol entre 10h e 16h.',
    severity: 'high',
  },
]

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      preferences: {
        enabled: true,
        storm: true,
        heavyRain: true,
        intenseCold: true,
        extremeHeat: true,
      },
      activeAlerts: [],
      currentLocation: 'São Paulo, SP',

      toggleAll: (enabled) =>
        set((state) => ({
          preferences: { ...state.preferences, enabled },
        })),

      toggleType: (type, enabled) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            [type]: enabled,
          },
        })),

      addAlert: (alert) => {
        set((state) => ({
          activeAlerts: [alert, ...state.activeAlerts],
        }))
        useSoundStore.getState().playTone('weather')
      },

      dismissAlert: (id) =>
        set((state) => ({
          activeAlerts: state.activeAlerts.filter((a) => a.id !== id),
        })),

      clearAlerts: () => set({ activeAlerts: [] }),

      checkWeather: () => {
        const { preferences, activeAlerts } = get()

        if (!preferences.enabled) return

        const randomAlert =
          SAMPLE_ALERTS[Math.floor(Math.random() * SAMPLE_ALERTS.length)]

        let shouldShow = true
        if (randomAlert.type === 'storm' && !preferences.storm)
          shouldShow = false
        if (randomAlert.type === 'rainy' && !preferences.heavyRain)
          shouldShow = false
        if (randomAlert.type === 'sunny' && !preferences.extremeHeat)
          shouldShow = false

        if (shouldShow) {
          const hasExisting = activeAlerts.some(
            (a) => a.type === randomAlert.type && a.active,
          )

          if (!hasExisting) {
            const newAlert: WeatherAlert = {
              id: `alert-${Date.now()}`,
              title: randomAlert.title!,
              message: randomAlert.message!,
              type: randomAlert.type as WeatherCondition,
              severity: randomAlert.severity as any,
              timestamp: new Date().toISOString(),
              active: true,
            }
            set({ activeAlerts: [newAlert, ...activeAlerts] })
            useSoundStore.getState().playTone('weather')
          }
        }
      },
    }),
    {
      name: 'goplay-weather-storage',
      partialize: (state) => ({
        preferences: state.preferences,
        activeAlerts: [],
        currentLocation: state.currentLocation,
      }),
    },
  ),
)
