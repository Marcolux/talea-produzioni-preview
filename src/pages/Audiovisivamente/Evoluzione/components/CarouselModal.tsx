import { useState, useEffect, useCallback } from "react"
import { Evoluzione, ImageKey } from "../Evoluzioni"

const withPublicUrl = (p: string) =>
  `${process.env.PUBLIC_URL}${p.startsWith("/") ? "" : "/"}${p}`

const IMAGE_SEQUENCE: { key: ImageKey; label: string }[] = [
  { key: "original", label: "Foto Originali" },
  { key: "drawing",  label: "Disegni" },
  { key: "aiBest",   label: "AI - Scenari Migliori" },
  { key: "aiWorst",  label: "AI - Scenari Peggiori" },
]

interface CarouselModalProps {
  evoluzione: Evoluzione
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  totalCount: number
  currentIndex: number
}

const CarouselModal = ({
  evoluzione,
  onClose,
  onNext,
  onPrev,
  totalCount,
  currentIndex,
}: CarouselModalProps) => {
  const [imageIndex, setImageIndex] = useState(0)

  // Reset to first image when evoluzione changes
  useEffect(() => {
    setImageIndex(0)
  }, [evoluzione.id])

  const goNextImage = useCallback(() => {
    setImageIndex(i => (i + 1) % IMAGE_SEQUENCE.length)
  }, [])

  const goPrevImage = useCallback(() => {
    setImageIndex(i => (i - 1 + IMAGE_SEQUENCE.length) % IMAGE_SEQUENCE.length)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose()
      if (e.key === "ArrowRight") goNextImage()
      if (e.key === "ArrowLeft")  goPrevImage()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose, goNextImage, goPrevImage])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const { key } = IMAGE_SEQUENCE[imageIndex]
  const image = evoluzione.images[key]
  const fallback = Object.values(evoluzione.images).find(img => img !== null)
  const displayImage = image ?? fallback

  if (!displayImage) return null

  return (
    <div
      className="carousel-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Evoluzione di ${evoluzione.child ?? evoluzione.subject}`}
    >
      {/* Backdrop */}
      <div className="carousel-modal__backdrop" onClick={onClose} />

      <div className="carousel-modal__counter_close_wrapper">
        <span className="carousel-modal__counter">
          {currentIndex + 1} / {totalCount}
        </span>
        <button className="carousel-modal__close" onClick={onClose} aria-label="Chiudi">
          ✕
        </button>
      </div>

      <div className="carousel-modal__container">

        {/* Image area */}
        <div className="carousel-modal__stage">
          <button
            className="carousel-modal__arrow carousel-modal__arrow--prev"
            onClick={goPrevImage}
            aria-label="Immagine precedente"
          >
            ‹
          </button>

          <div className="carousel-modal__img-wrap">
            <img
              key={`${evoluzione.id}-${key}`}
              src={withPublicUrl(displayImage.full)}
              alt={displayImage.alt}
              className="carousel-modal__img"
            />
          </div>

          <button
            className="carousel-modal__arrow carousel-modal__arrow--next"
            onClick={goNextImage}
            aria-label="Immagine successiva"
          >
            ›
          </button>
        </div>

        {/* Evoluzione prev/next */}
        <div className="carousel-modal__nav pb-20">
          <button className="carousel-modal__nav-btn" onClick={onPrev} aria-label="Evoluzione precedente">
            ← Precedente
          </button>
          <button className="carousel-modal__nav-btn" onClick={onNext} aria-label="Evoluzione successiva">
            Successiva →
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarouselModal
