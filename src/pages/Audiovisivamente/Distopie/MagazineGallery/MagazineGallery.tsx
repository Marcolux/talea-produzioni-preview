import React from "react"

export type MagPair = {
    images: [string, string]  // exactly 2 images per pair
    direction?: "normal" | "reverse"
}

interface MagazineGalleryProps {
    images?: string[]          // auto-pairs sequentially if provided
    pairs?: MagPair[]          // manual pairing — overrides images
    inView: boolean
}

const MagazineGallery = ({ images, pairs: manualPairs, inView }: MagazineGalleryProps) => {
    const pairs: MagPair[] = manualPairs ?? (
        Array.from({ length: Math.ceil((images ?? []).length / 2) }, (_, i) => ({
            images: [(images ?? [])[i * 2], (images ?? [])[i * 2 + 1]] as [string, string],
            direction: i % 2 === 0 ? "normal" : "reverse"
        }))
    )

    return (
        <div className={`magGallery ${inView ? "inView" : ""}`}>
            {pairs.map((pair, pairIdx) => (
                <div
                    key={pairIdx}
                    className={`magGallery__pair pair--${pair.direction ?? (pairIdx % 2 === 0 ? "normal" : "reverse")}`}
                >
                    {pair.images.filter(Boolean).map((src, imgIdx) => {
                        const n = pairIdx * 2 + imgIdx + 1
                        return (
                            <div
                                key={imgIdx}
                                className="magGallery__item"
                                style={{ '--delay': `${(pairIdx * 2 + imgIdx) * 0.08}s` } as React.CSSProperties}
                            >
                                <span className="magGallery__num">{String(n).padStart(2, '0')}</span>
                                <img src={src} alt={`foto ${n}`} loading="lazy" />
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default MagazineGallery
