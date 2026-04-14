import React, { useState, useEffect, useRef } from "react"
import "./FlippingCardCK.scss"

type FlippingCardCKProps = {
  id?: string
  imgSrc: string
  imgAlt?: string
  overlayText: React.ReactNode 
  backText: React.ReactNode
  cardTitle: React.ReactNode
}

const FlippingCardCK: React.FC<FlippingCardCKProps> = ({
    id = "card1",
    imgSrc,
    imgAlt = "Card image",
    overlayText,
    backText,
    cardTitle
}) => {
    const [isPeek, setIsPeek] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)

    const onToggleFlip = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsFlipped((flipState) => !flipState)
        // setIsPeek(false)
    }

    const cardRef = useRef<HTMLElement | null>(null)
    // Click Outside the card will reset the States
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)
            ) {
                setIsFlipped(false)
                setIsPeek(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <article
            className={[
                "flip-card_ck",
                isFlipped ? "is-flipped" : "",
                isPeek ? "peek" : "",
                isFlipped || isPeek ? 'inTransition' : ''
            ].join(" ")}
            tabIndex={0}
            id={id}
            aria-label="Talea Homepage Card"
            onMouseEnter={() => setIsPeek(true)}
            onMouseLeave={() => setIsPeek(false)}
            ref={cardRef}
        >
            <div className="flip-card_ck-inner">
                <div className="flip-card_ck-front">
                    <div className="imgCont">
                        <img src={imgSrc} alt={imgAlt} />
                        <div className="hoverWrapper">
                            <h1
                                className="cardTitle mt-20 mb-0"
                                tabIndex={0}
                            >
                                {cardTitle}
                            </h1>
                            <div className={`hoverOverlayText`} aria-hidden={!isPeek}>
                                <div className="cardText">{overlayText}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flip-card_ck-back py-30 pl-30 pr-10">
                    <div className="cardText my-0">{backText}</div>
                </div>
            </div>
            <button
                className={`flip-toggle p-5 ${isPeek || isFlipped ? "inView" : ""}`}
                aria-label="toggle card"
                aria-expanded={isFlipped}
                aria-controls={id}
                onClick={onToggleFlip}
            >
                <svg
                    className="flip-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path d="M360-200 80-480l280-280 56 56-183 184h647v80H233l184 184-57 56Z" />
                </svg>
            </button>
        </article>
    )
}

export default FlippingCardCK