import React, {
    useState,
    useRef,
    useEffect,
    MouseEvent as ReactMouseEvent,
    ReactNode,
} from "react"

import "./flipping-card.scss"

type FlippingCardProps = {
    frontContent: ReactNode
    backContent: ReactNode
    frontTrigger?: ReactNode
    backTrigger?: ReactNode
    classNameWrapper?: string
    classNameCard?: string
    closeOnOutsideClick?: boolean
    onFlipChange?: (isFlipped: boolean) => void
    defaultFlipped?: boolean
    id?: string
}

const FlippingCard: React.FC<FlippingCardProps> = ({
    frontContent,
    backContent,
    frontTrigger = "Explore more",
    backTrigger = "✕",
    classNameWrapper,
    classNameCard,
    closeOnOutsideClick = true,
    onFlipChange,
    defaultFlipped = false,
    id
}) => {
    const [isFlipped, setIsFlipped] = useState(defaultFlipped)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const setFlipped = (flipped: boolean) => {
        setIsFlipped(flipped)
        onFlipChange?.(flipped)
    }

    const handleFrontTriggerClick = (
        event: ReactMouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation()
        setFlipped(true)
    }

    const handleBackTriggerClick = (
        event: ReactMouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation()
        setFlipped(false)
    }

    // Close on outside click (if enabled)
    useEffect(() => {
        if (!closeOnOutsideClick) return

        const handleDocumentClick = (event: MouseEvent) => {
            if (!wrapperRef.current) return
            if (!isFlipped) return

            if (!wrapperRef.current.contains(event.target as Node)) {
                setFlipped(false)
            }
        }

        document.addEventListener("mousedown", handleDocumentClick)
        return () => document.removeEventListener("mousedown", handleDocumentClick)
    }, [closeOnOutsideClick, isFlipped])

    return (
        <div
            ref={wrapperRef}
            className={`flipcard-wrapper ${classNameWrapper || ""}`}
            id={ id ? id : ''}
        >
            <div
                className={`flipcard ${isFlipped ? "flipcard--flipped" : ""} ${ classNameCard || "" }`}
            >
                {/* FRONT SIDE */}
                <div className="flipcard__face flipcard__face--front">
                    <div className="flipcard__content">
                        {frontContent}
                    </div>

                    <button
                        type="button"
                        className="flipcard__trigger flipcard__trigger--front"
                        onClick={handleFrontTriggerClick}
                    >
                        {frontTrigger}
                    </button>
                </div>

                {/* BACK SIDE */}
                <div className="flipcard__face flipcard__face--back">
                    <button
                        type="button"
                        className="flipcard__trigger flipcard__trigger--back"
                        onClick={handleBackTriggerClick}
                        aria-label="Flip card back"
                    >
                        {backTrigger}
                    </button>

                    <div className="flipcard__content flipcard__content--back">
                        {backContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlippingCard
