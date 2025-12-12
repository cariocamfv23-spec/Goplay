import { create } from 'zustand'

export interface Device {
  id: string
  name: string
  type: 'watch' | 'band' | 'chest_strap'
  battery: number
  status: 'connected' | 'disconnected'
}

interface DeviceState {
  connectedDevice: Device | null
  isScanning: boolean
  biometrics: {
    heartRate: number
    steps: number
    calories: number
    spo2: number
  }
  startScan: () => void
  connectDevice: (device: Device) => void
  disconnectDevice: () => void
  updateBiometrics: () => void
}

const useDeviceStore = create<DeviceState>((set, get) => ({
  connectedDevice: null,
  isScanning: false,
  biometrics: {
    heartRate: 72,
    steps: 0,
    calories: 0,
    spo2: 98,
  },

  startScan: () => {
    set({ isScanning: true })
    setTimeout(() => set({ isScanning: false }), 3000)
  },

  connectDevice: (device) => {
    set({
      connectedDevice: { ...device, status: 'connected' },
      isScanning: false,
    })
  },

  disconnectDevice: () => {
    set({ connectedDevice: null })
  },

  // Mock function to simulate varying biometric data
  updateBiometrics: () => {
    const { connectedDevice, biometrics } = get()
    if (!connectedDevice) return

    set({
      biometrics: {
        ...biometrics,
        heartRate: 70 + Math.floor(Math.random() * 80), // Simulate HR 70-150
        calories: biometrics.calories + 1,
        steps: biometrics.steps + Math.floor(Math.random() * 5),
      },
    })
  },
}))

export default useDeviceStore
