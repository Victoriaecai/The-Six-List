function EventCard({ name, date, location, image, category}) {
  return (
    <div className="event-card">
      <div className="event-card-image">  {/* thumbnail image for event */}
        <img src={image} alt={name} />
      </div>
      <div className="event-card-info">
        <span className="event-category">{category}</span>
        <h2 className="event-name">{name}</h2>
        <p className="event-date">{date}</p>
        <p className="event-location">{location}</p>
      </div>
    </div>
  )
}

export default EventCard