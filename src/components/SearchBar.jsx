function SearchBar({ onSearch }) {

    const handleInputChange = (e) => {
        onSearch(e.target.value)
    }

    return (
        <input 
            type="text" 
            placeholder="Search events..." 
            onChange={handleInputChange}
        />
    )
}