import {motion, MotionValue, useTransform} from "framer-motion"
import styles from './ServicesScrollDeck.module.scss'

export type SingleCard = {
    title: string,
    nameInURL: string
}

type DeckCardProps = {
    card: SingleCard, 
    cardIndex: number, 
    motionIndex: MotionValue
}

export const DeckCard = ({card, cardIndex, motionIndex}: DeckCardProps ) => {

    const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith('/') ? '' : '/'}${p}`
    const distanceFromActiveCard = useTransform(motionIndex, (v: number) => v - cardIndex)

    // const opacity = useTransform(distanceFromActiveCard, [-0.35, 0, 0.35], [0.3, 1, 0.3]);
    const y = useTransform(distanceFromActiveCard, [-0.35, 0, 0.35], [40, 0, -25]);
    // const scale = useTransform(distanceFromActiveCard, [-0.35, 0, 0.35], [0.98, 1, 0.98]);
    // const opacity = useTransform(distanceFromActiveCard, [-0.25, 0, 0.25], [0, 1, 0]);
    const scale = useTransform(distanceFromActiveCard, [-0.25, 0, 0.25], [1.03, 1, 0.97]);

    const isActive = useTransform(distanceFromActiveCard, (d) => Math.abs(d) < 0.4 ? 1 : 0);


    return (
        <motion.article
            style={{opacity: isActive, y, scale, position: "absolute", top: "20dvh", left: "20vw", inset: 0}}
        >
            
            <div className={styles.card}>
                <img src={withPublicUrl(card.nameInURL)} alt={card.title} />
                <div className={styles.overlay}></div>
                <div className={styles.titleBlock}>
                    <h2 className={styles.title}>{card.title}</h2>
                </div>
            </div>
        </motion.article>
    )
}