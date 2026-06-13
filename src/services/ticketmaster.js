const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'

export async function fetchTicketmasterEvents({ search, category, date }) {
  const params = new URLSearchParams({
    city: 'Toronto',
    countryCode: 'CA',
    size: 200,
    sort: 'date,asc',
    apikey: API_KEY,
  })

  if (search) params.append('keyword', search)
  if (category) params.append('classificationName', category)
  if (date) {
    const today = new Date()
    let start, end
    if (date === 'today') {
      start = new Date(today.setHours(0, 0, 0, 0))
      end = new Date(today.setHours(23, 59, 59, 999))
    } else if (date === 'week') {
      start = new Date(today.setHours(0, 0, 0, 0))
      end = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    } else if (date.includes(today.getFullYear().toString()) || date.includes((today.getFullYear() + 1).toString())) {
      const [year, month] = date.split('-')
      start = new Date(year, month - 1, 1)
      end = new Date(year, month, 0, 23, 59, 59, 999)
    }

    params.append('startDateTime', start.toISOString())
    params.append('endDateTime', end.toISOString())
  }

  const res = await fetch(`${BASE_URL}/events.json?${params}`)
  const data = await res.json()
  // console.log('Ticketmaster API response:', JSON.stringify(data))
  return data._embedded?.events || []
}