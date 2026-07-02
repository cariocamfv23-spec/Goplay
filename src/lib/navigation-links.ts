export interface FieldLocation {
  address: string
  lat?: number
  lng?: number
  name?: string
}

export type TransportApp = 'google-maps' | 'waze' | 'uber' | '99-taxi'

export function getGoogleMapsUrl(loc: FieldLocation): string {
  if (loc.lat != null && loc.lng != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address)}`
}

export function getWazeUrl(loc: FieldLocation): string {
  if (loc.lat != null && loc.lng != null) {
    return `https://waze.com/ul?ll=${loc.lat}%2C${loc.lng}&navigate=yes`
  }
  return `https://waze.com/ul?q=${encodeURIComponent(loc.address)}&navigate=yes`
}

export function getUberUrl(loc: FieldLocation): string {
  const action = 'setDestination'
  if (loc.lat != null && loc.lng != null) {
    const dest = `{"latitude":${loc.lat},"longitude":${loc.lng},"nickname":"${encodeURIComponent(loc.name || 'Destination')}","formatted_address":"${encodeURIComponent(loc.address)}"}`
    return `https://m.uber.com/ul/?action=${action}&pickup=my_location&dropoff=${dest}`
  }
  return `https://m.uber.com/ul/?action=${action}&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(loc.address)}`
}

export function get99TaxiUrl(loc: FieldLocation): string {
  if (loc.lat != null && loc.lng != null) {
    return `https://99app.com/pax-99-hailing-app://?daddr=${loc.lat},${loc.lng}`
  }
  return `https://99app.com/pax-99-hailing-app://?daddr=${encodeURIComponent(loc.address)}`
}

export function getTransportUrl(app: TransportApp, loc: FieldLocation): string {
  switch (app) {
    case 'google-maps':
      return getGoogleMapsUrl(loc)
    case 'waze':
      return getWazeUrl(loc)
    case 'uber':
      return getUberUrl(loc)
    case '99-taxi':
      return get99TaxiUrl(loc)
  }
}
