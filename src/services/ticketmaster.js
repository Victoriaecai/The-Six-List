const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'

export async function fetchTorontoEvents() {
  const res = await fetch(`${BASE_URL}/events.json?city=Toronto&countryCode=CA&size=20&apikey=${API_KEY}`)
  const data = await res.json()
  return data._embedded.events
}