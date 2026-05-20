import { useState, useMemo } from "react"
import evoluzioniData from "./evoluzioni.json"
import EvoluzioneThumbnail from "./components/EvoluzioneThumbnail"
import { useInView } from "react-intersection-observer"
import CarouselModal from "./components/CarouselModal"
import SearchBar from "./components/SearchBar"
import FilterSwitch from "./components/FilterSwitch"
import "./evoluzioniPage.scss"

export type ImageKey = "original" | "drawing" | "aiWorst" | "aiBest"

export interface EvolzioneImage {
  thumb: string
  full: string
  alt: string
}

export interface Evoluzione {
  id: string
  slug: string
  subject: string
  child: string | null
  childSchool: string | null
  childClass: string | null
  preschooler: string | null
  highschoolers: string[]
  highschoolerClass: string | null
  names: string[]
  images: Record<ImageKey, EvolzioneImage | null>
  incomplete?: boolean
  notes: string | null
  rawName: string
}

const FILTERS: { key: ImageKey; label: string }[] = [
  { key: "original", label: "Foto Originali" },
  { key: "drawing",  label: "Disegni" },
  { key: "aiBest",   label: "AI - Scenari Migliori" },
  { key: "aiWorst",  label: "AI - Scenari Peggiori" },
]

const Evoluzioni = () => {
  const [search, setSearch] = useState("")
  const [activeFilter, setFilter] = useState<ImageKey>("original")
  const [modalIndex, setModalIndex] = useState<number | null>(null)

  const [heroTextRef, inViewHeroText] = useInView({ threshold: .1, triggerOnce: true })
  const [heroDescrRef, inViewHeroDescr] = useInView({ threshold: .1, triggerOnce: true })

  const filtered = useMemo(() => {
    const stringToSearch = search.toLowerCase().trim()
    const evoluzioni: Evoluzione[] = evoluzioniData

    if (!stringToSearch) return evoluzioni

    return (evoluzioni).filter(e =>
      e.names.some(name => name.toLowerCase().includes(stringToSearch))
    )
    
  }, [search])

  const openModal = (index: number) => setModalIndex(index)
  const closeModal = () => setModalIndex(null)

  const goNext = () => {
    if (modalIndex === null) return
    setModalIndex((modalIndex + 1) % filtered.length)
  }

  const goPrev = () => {
    if (modalIndex === null) return
    setModalIndex((modalIndex - 1 + filtered.length) % filtered.length)
  }

  return (
    <div className="page audiovisivamente__page" id="audiovisivamente__evoluzioni">

      <div className="heroAudio">

        <h1 ref={heroTextRef} className={`heroTitle ${inViewHeroText ? "inView" : ""} `}>Evoluzioni</h1>
        <div ref={heroDescrRef} className={`${inViewHeroDescr ? "inView" : "" } hero_desc_wrapper`}>
          <p className="col-12" lang="it">
            Le studentesse e gli studenti dell'Istituto Tecnico Economico e Tecnologico Statale Lenoci-Euclide 
            hanno proiettato nel futuro le immagini del presente. 
            Partendo dagli scatti fotografici realizzati dalla scuola primaria, 
            i ragazzi hanno utilizzato l'intelligenza artificiale per generare scenari inediti e mondi distopici.
          </p>
          <p className="col-12" lang="it">
            Un esercizio creativo e tecnologico per visualizzare gli effetti estremi della crisi ambientale e riflettere sulle sfide del nostro tempo.
          </p>
        </div>

        <div className="evoluzioni-page__controls">
          <SearchBar value={search} onChange={setSearch} />
          <FilterSwitch filters={FILTERS} active={activeFilter} onChange={setFilter} />
        </div>

      </div>

      {
        filtered.length === 0   
        ? 
        <p className="evoluzioni-page__empty">Nessun risultato per "{search}"</p>
        : 
        <div className="evoluzioni-page__grid">
          {filtered.map((evoluzione, index) => (
            <EvoluzioneThumbnail
              key={evoluzione.id}
              evoluzione={evoluzione}
              activeFilter={activeFilter}
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      }

      {modalIndex !== null && 
        <CarouselModal
          evoluzione={filtered[modalIndex]}
          onClose={closeModal}
          onNext={goNext}
          onPrev={goPrev}
          totalCount={filtered.length}
          currentIndex={modalIndex}
        />
      }
    </div>
  )
}

export default Evoluzioni
