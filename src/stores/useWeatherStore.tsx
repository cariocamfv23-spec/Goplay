import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WeatherCondition } from '@/lib/data'

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
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      preferences: {
        enabled: true,
        storm: true,
        heavyRain: true,
        intenseCold: true,
        extremeHeat: true,
      },
      activeAlerts: [
        {
          id: 'alert-mock-1',
          title: 'Alerta de Tempestade Severa',
          message:
            'Há previsão de tempestade com raios para a região da Arena Central nas próximas 2 horas. Recomenda-se suspender atividades ao ar livre.',
          type: 'storm',
          severity: 'critical',
          timestamp: new Date().toISOString(),
          active: true,
        },
      ],
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

      addAlert: (alert) =>
        set((state) => ({
          activeAlerts: [alert, ...state.activeAlerts],
        })),

      dismissAlert: (id) =>
        set((state) => ({
          activeAlerts: state.activeAlerts.filter((a) => a.id !== id),
        })),

      clearAlerts: () => set({ activeAlerts: [] }),
    }),
    {
      name: 'goplay-weather-storage',
    },
  ),
)
