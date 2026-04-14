import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type NavMode = "prev" | "next" | "both" | "portrait-both-desktop-prev" | "portrait-both-desktop-next" | "auto-inverted";

const PageNavButtons = ({ index, isPortrait, mode = "auto", label }: {
    index?: number
    isPortrait: boolean
    mode?: NavMode | "auto"
    label?: string
}) => {
    let showPrev: boolean
    let showNext: boolean

    switch (mode) {
        case "prev":
            showPrev = true
            showNext = false
            break
        case "next":
            showPrev = false
            showNext = true
            break
        case "both":
            showPrev = true
            showNext = true
            break
        case "portrait-both-desktop-prev":
            showPrev = true
            showNext = isPortrait
            break
        case "portrait-both-desktop-next":
            showPrev = isPortrait
            showNext = true
            break
        case "auto-inverted":
            showPrev = isPortrait || (index ?? 0) % 2 !== 0
            showNext = isPortrait || (index ?? 0) % 2 === 0
            break
        case "auto":
        default:
            // index-based logic for image pages
            showPrev = isPortrait || (index ?? 0) % 2 === 0
            showNext = isPortrait || (index ?? 0) % 2 !== 0
            break
    }

    if (isPortrait) return null

    return (
        <>
            {showPrev && (
                <button className="flipHint scrolling _previous" aria-hidden="true" tabIndex={-1}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            )}
            {showNext && (
                <button
                    className={`flipHint scrolling _next${label ? " flipHint--sfoglia" : ""}`}
                    aria-hidden="true"
                    tabIndex={-1}
                >
                    {label && <span className="flipHint__label">{label}</span>}
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            )}
        </>
    )
}

export default PageNavButtons