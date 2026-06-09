function FilterBar({ onCategoryChange, onDateChange }) {
    const months = []
    const today = new Date()

    for (let i = 0; i < 6; i++) {
        const month = new Date(today.getFullYear(), today.getMonth() + i)
        months.push(month)
    }

    return (
        <div className="filter-bar">
        <select onChange={e => onCategoryChange(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Arts & Theatre">Arts & Theatre</option>
            <option value="Family">Family</option>
            <option value="Comedy">Comedy</option>
        </select>

        <select onChange={e => onDateChange(e.target.value)}>
            <option value="">Any Date</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            {months.map(month => (
                /* value is the month in YYYY-MM format, displayed as "Month Year" */ 
                <option value={month.toISOString().split('T')[0]} key={month.toISOString()}>
                    {month.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </option>
            ))}
        </select>
        </div>
    )
}

export default FilterBar