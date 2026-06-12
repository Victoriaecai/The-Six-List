import { useState, useEffect } from 'react'
import EventCard from './components/EventCard'
import FilterBar from './components/FilterBar'
import { fetchTorontoEvents } from './services/ticketmaster'


function App() {
  const today = new Date()
  const [events, setEvents] = useState([])
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [year, month] = date.split('-')

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchTorontoEvents().then(events => { 
      setEvents(events)
      setLoading(false)
    })
  }, []) 

  /* filter events based on category and date selected in FilterBar */
  const filteredEvents = events.filter(event => {

    const matchesCategory = category === '' || 
      event.classifications?.[0]?.segment?.name === category

    const matchesDate = date === '' ||
      (date === 'today' && event.dates?.start?.localDate === today.toISOString().split('T')[0]) ||
      (date === 'week' && new Date(event.dates?.start?.localDate) >= today && new Date(event.dates?.start?.localDate) <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) ||
      (date.includes(today.getFullYear().toString()) || date.includes((today.getFullYear() + 1).toString())) && 
      new Date(event.dates?.start?.localDate) >= today && 
      new Date(event.dates?.start?.localDate).getFullYear() === parseInt(year) &&
      new Date(event.dates?.start?.localDate).getMonth() === parseInt(month) - 1

    const matchesSearch = search === '' || 
      event.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesDate && matchesSearch
  })

  if (loading) {
        return (
          <div>
            <header>
              <h1>The Six List</h1>
              <p>Your hub for the hottest events in Toronto.</p>
            </header>
            <div className="loading">
              Loading events...
            </div>
          </div>
        )
      }


  return (
    <div>
      <header>
        <h1>The Six List</h1>
        <p>Your hub for the hottest events in Toronto.</p>
      </header>
      <div className="search-bar">
        <SearchBar 
          onSearch={setSearch}
        />
      </div>

      <div className="filter-section">
        <p className="filter-label">Filter by</p>
        <FilterBar 
          onCategoryChange={setCategory}
          onDateChange={setDate}
        />
      </div>

      <div className="events-grid">
        {filteredEvents.length === 0 ? (
          <p className="no-events">No events found for the selected filters.</p>
        ) : (
          filteredEvents.map(event => (
              <EventCard
                /* event data from Ticketmaster API - the .id, .name, etc.. from the JSON */
                key={event.id}
                name={event.name}
                date={event.dates?.start?.localDate}
                location={event._embedded?.venues?.[0]?.name}
                image={event.images?.[0]?.url}
                category={event.classifications?.[0]?.segment?.name}
                
              />
            ))
          )}
        </div>
    </div>
  )
}


export default App