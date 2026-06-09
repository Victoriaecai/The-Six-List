import { useState, useEffect } from 'react'
import EventCard from './components/EventCard'


function App() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchTorontoEvents().then(events => setEvents(events))
  }, [])

  return (
    <div>
      <h1>The Six List</h1>
      {events.map(event => (
        <EventCard 
          key={event.id}
          name={event.name} 
          date={event.dates.start.localDate}
          location={event._embedded.venues[0].name}
          image={event.images[0].url}
          category={event.classifications[0].segment.name}
        />
      ))}
    </div>
  )
}

export default App