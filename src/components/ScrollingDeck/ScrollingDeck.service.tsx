import { useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { DeckCard, SingleCard } from "./DeckCard"

type ScrollingDeckServiceProps = {cards: SingleCard[]}

export const ScrollingDeckService = ({cards}: ScrollingDeckServiceProps) =>{

    // const opacity = useTransform(progress, [0,1],[0,1])
    // 1- Get the scroll progress
    const ref = useRef<HTMLElement>(null)
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    })
    // 2- Convert progress into an active index (i.e. 0 -> 5 for 6 cards)
    const index = useTransform(scrollYProgress,[0,1], [0,cards.length - 1])
    const perCard = 40 // try 45–70
    
    return (
        <section
            ref={ref}
            style={{height:`${cards.length * perCard}dvh`}}
        >
            <div
                
                style={{position: "sticky", top: 50, height:"80dvh", width: "100%", padding: "50px",}}
            >
                {
                    cards.map((singleCard, i) => {
                        return(
                            <DeckCard card={singleCard} cardIndex={i} motionIndex={index}></DeckCard>
                        )
                    })
                }
            </div>
        </section>
    )
} 