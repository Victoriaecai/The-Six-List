function EventCard({ name, date, location, image, category, link, source}) {
  return (
    <div className="event-card">
      <div className="event-card-image">  {/* thumbnail image for event */}
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="image-placeholder">{category}</div>
        )}
      </div>
      <div className="event-card-info">
        <span className="event-category">{category}</span>
        <h2 className="event-name">{name}</h2>
        <p className="event-date">{new Date(date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        <p className="event-location">{location}</p>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {source === 'predicthq' ? 'Learn More' : 'Get Tickets'}
          </a>
        )}
      </div>
    </div>
  )
}

export default EventCard