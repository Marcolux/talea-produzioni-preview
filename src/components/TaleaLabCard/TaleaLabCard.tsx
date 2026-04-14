import "./talealabcard.scss"
import { useEffect, useMemo, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

type Props = {
  title: string
  images: string[] // ✅ array now
  leftRight: string
  cardDescription: string
  withPublicUrl: (p: string) => string
  intervalMs?: number
}

const TaleaLabSingleCard = ({
    title,
    images,
    leftRight,
    cardDescription,
    withPublicUrl,
    intervalMs = 3000,
}: Props) => {

    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: false,
    })

    const slides = useMemo(
        () => images.map((p) => withPublicUrl(p)),
        [images, withPublicUrl]
    )

    const [idx, setIdx] = useState(0)
    const timerRef = useRef<number | null>(null)
    const [isPaused, setIsPaused] = useState(false)

    // Keep index valid if images change
    useEffect(() => {
        setIdx(0)
    }, [slides.length])

    // Autoplay only when in view + not paused + more than 1 slide
    useEffect(() => {
        if (!inView || isPaused || slides.length <= 1) return

        timerRef.current = window.setInterval(() => {
        setIdx((i) => (i + 1) % slides.length)
        }, intervalMs)

        return () => {
        if (timerRef.current) window.clearInterval(timerRef.current)
        timerRef.current = null
        }
    }, [inView, isPaused, slides.length, intervalMs])

    return (
        <article
            ref={ref}
            className={`${leftRight} talea_lab_card ${inView ? "inView_talea_lab_card" : ""}`}
        >
            <div
                className="lab_carousel"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className="lab_carousel_track"
                    style={{ transform: `translateX(-${idx * 100}%)` }}
                >
                {slides.map((src, i) => (
                    <img
                        key={src + i}
                        className="lab_carousel_img"
                        src={src}
                        alt={`Foto Cine Lab ${title} - ${i + 1}`}
                        loading={i === 0 ? "eager" : "lazy"}
                        draggable={false}
                    />
                ))}
                </div>

                {slides.length > 1 && (
                    <div className="lab_carousel_dots" aria-label="carousel dots">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`lab_dot ${i === idx ? "is-active" : ""}`}
                                onClick={() => setIdx(i)}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="lab_card_text_wrapper">
                <p className="lab_card_title" lang="it">
                    <span>{title}</span>
                </p>
                <p className="lab_card_description" lang="it">{cardDescription}</p>
            </div>
        </article>
    )
}

export default TaleaLabSingleCard