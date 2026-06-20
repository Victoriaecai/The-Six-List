const API_KEY = import.meta.env.VITE_PREDICTHQ_API_KEY
const BASE_URL = 'https://api.predicthq.com/v1/events'

export async function fetchPredictHQEvents({ search, category, date }) {
    const params = new URLSearchParams({
        within: '10km@43.6532,-79.3832',
        country: 'CA',
        limit: 50,
        sort: 'start',
    })

    if (search) params.append('q', search)
    if (category) params.append('category', category)
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

        params.append('start.gte', start.toISOString())
        params.append('start.lte', end.toISOString())
    }

    console.log(`${BASE_URL}?${params}`)

    const res = await fetch(`${BASE_URL}?${params}`, {
        headers: {
        'Authorization': `Bearer ${API_KEY}`
        }
    })
    const data = await res.json()
    return (data.results || []).map(event => ({
    id: event.id,
    name: event.title,
    dates: { start: { localDate: event.start_local?.split('T')[0] } },
    images: [{ url: null }],
    url: `https://www.google.com/search?q=${encodeURIComponent(event.title + ' Toronto')}`,
    classifications: [{ segment: { name: event.category } }],
    _embedded: { 
      venues: [{ 
        name: event.entities?.find(e => e.type === 'venue')?.name || 'Toronto' 
      }] 
    },
    source: 'predicthq'
  }))
}