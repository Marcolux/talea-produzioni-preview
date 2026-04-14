import { ImageKey } from "../Evoluzioni"

interface FilterOption {
  key: ImageKey
  label: string
}

interface FilterSwitchProps {
  filters: FilterOption[]
  active: ImageKey
  onChange: (key: ImageKey) => void
}

const FilterSwitch = ({ filters, active, onChange }: FilterSwitchProps) => {
  return (
    <div className="filter-switch" role="group" aria-label="Filtra per tipo immagine">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-switch__btn ${active === key ? "filter-switch__btn--active" : ""}`}
          onClick={() => onChange(key)}
          aria-pressed={active === key}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default FilterSwitch
