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


  useEffect(() => {
    fetchTorontoEvents().then(events => setEvents(events))
  }, [])

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
    return matchesCategory && matchesDate
  })

  return (
    <div>
      <header>
        <h1>The Six List</h1>
        <p>Your hub for the hottest events in Toronto.</p>
      </header>
      <FilterBar 
        onCategoryChange={setCategory}
        onDateChange={setDate}
      />
      <div className="events-grid">
      {filteredEvents.map(event => (
          <EventCard
            /* event data from Ticketmaster API - the .id, .name, etc.. from the JSON */
            key={event.id}
            name={event.name}
            date={event.dates?.start?.localDate}
            location={event._embedded?.venues?.[0]?.name}
            image={event.images?.[0]?.url}
            category={event.classifications?.[0]?.segment?.name}
          />
        ))}
        </div>
    </div>
  )
}


export default App