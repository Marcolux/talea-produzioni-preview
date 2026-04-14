import { useState, useEffect, useRef } from "react"
import { Evoluzione, ImageKey } from "../Evoluzioni"

const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith("/") ? "" : "/"}${p}`

const IMAGE_CYCLE: ImageKey[] = ["original", "drawing", "aiBest", "aiWorst"]
const CYCLE_INTERVAL = 1800

interface EvoluzioneThumbnailProps {
  evoluzione: Evoluzione
  activeFilter: ImageKey
  onClick: () => void
}

const EvoluzioneThumbnail = ({ evoluzione, activeFilter, onClick }: EvoluzioneThumbnailProps) => {
  const defaultKeyRef = useRef<ImageKey>(activeFilter)
  const [currentKey, setCurrentKey] = useState<ImageKey>(activeFilter)
  const [isHovering, setIsHovering] = useState(false)
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const cycleIndexRef = useRef(0)

  // Keep ref in sync and reset image immediately when filter changes
  useEffect(() => {
    defaultKeyRef.current = activeFilter
    if (!isHovering) setCurrentKey(activeFilter)
  }, [activeFilter, isHovering])

  const startCycle = () => {
    setIsHovering(true)
    cycleIndexRef.current = IMAGE_CYCLE.indexOf(defaultKeyRef.current)
    cycleRef.current = setInterval(() => {
      cycleIndexRef.current = (cycleIndexRef.current + 1) % IMAGE_CYCLE.length
      setCurrentKey(IMAGE_CYCLE[cycleIndexRef.current])
    }, CYCLE_INTERVAL)
  }

  const stopCycle = () => {
    setIsHovering(false)
    if (cycleRef.current) clearInterval(cycleRef.current)
    setCurrentKey(defaultKeyRef.current)
  }

  useEffect(() => {
    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current)
    }
  }, [])

  const image = evoluzione.images[currentKey]
  const fallback = Object.values(evoluzione.images).find(img => img !== null)

  if (!fallback) return null

  return (
    <button
      className="evoluzione-thumb"
      onClick={onClick}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
      aria-label={`Apri evoluzione di ${evoluzione.child ?? evoluzione.subject}`}
    >
      <div className="evoluzione-thumb__img-wrap">

        {IMAGE_CYCLE.map(key => {
          const img = evoluzione.images[key] ?? fallback
          return (
            <img
              key={key}
              src={withPublicUrl(img.thumb)}
              alt={img.alt}
              className={`evoluzione-thumb__img ${currentKey === key ? "evoluzione-thumb__img--active" : ""}`}
              loading="lazy"
            />
          )
        })}

        <div className="evoluzione-thumb__indicators">
          {IMAGE_CYCLE.map(key => (
            <span
              key={key}
              className={`evoluzione-thumb__dot ${currentKey === key ? "evoluzione-thumb__dot--active" : ""}`}
            />
          ))}
        </div>
      </div>
    </button>
  )
}

export default EvoluzioneThumbnail