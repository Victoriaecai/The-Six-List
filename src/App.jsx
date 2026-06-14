import { useState, useEffect } from 'react'
import EventCard from './components/EventCard'
import FilterBar from './components/FilterBar'
import SearchBar from './components/SearchBar'
import { fetchTicketmasterEvents } from './services/ticketmaster'
import { fetchPredictHQEvents } from './services/predicthq'

function App() {
  const [events, setEvents] = useState([])
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  
  useEffect(() => {
    // setLoading(true)
    async function loadEvents() {
        const [ticketmasterEvents, predictHQEvents] = await Promise.all([
          fetchTicketmasterEvents({ search, category, date }),
          fetchPredictHQEvents({ search, category, date })
        ])
        setEvents([...ticketmasterEvents, ...predictHQEvents])
        setLoading(false)
      }
      loadEvents()
  }, [search, category, date]) 

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
        {events.length === 0 ? (
          <p className="no-events">No events found for the selected filters.</p>
        ) : (
          events.map(event => (
              <EventCard
                /* event data from Ticketmaster API - the .id, .name, etc.. from the JSON */
                key={event.id}
                name={event.name}
                date={event.dates?.start?.localDate}
                location={event._embedded?.venues?.[0]?.name}
                image={event.images?.[0]?.url}
                category={event.classifications?.[0]?.segment?.name}
                link={event.url}
              />
            ))
          )}
        </div>
    </div>
  )
}


export default App