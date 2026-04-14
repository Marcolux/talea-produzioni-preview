interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Cerca per nome..."
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Cerca evoluzione per nome"
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => onChange("")}
          aria-label="Cancella ricerca"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
