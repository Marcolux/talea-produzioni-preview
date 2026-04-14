import './servizi_single_card.scss'
import { useInView } from "react-intersection-observer"

type Props = {
    title: string
    description?: React.ReactNode
    url: string
    leftRight: string
    withPublicUrl: (p: string) => string
}
export type SingleServiziCard = {
    title: string
    description?: React.ReactNode
    nameInURL: string
    leftRight?: string
}
const ServiziSingleCard = ({ title, description, url, leftRight, withPublicUrl }: Props) => {
   
    const [ref, inView] = useInView({
        threshold: 0.4,
        triggerOnce: false, // set true if you want it only once
    })

    return(
        <article
            ref={ref}
            className={`${leftRight} card_article ${inView ? "inView" : ""}`}
        >
            <div className={"card my-40"} tabIndex={0}>
                {/* <div className="vignette" /> */}
                <img src={withPublicUrl(url)} alt={title} />
                <div className="grain" />
                <div className='overlay' />
                <div className="descCenter">
                    {description ? (
                        <p className="desc" lang='it'>
                        {description}
                        </p>
                    ) : null}
                </div>
                <div className="titleBlock">
                    <h2 className="title font-sanmarino">{title}</h2>

                </div>
            </div>
        </article>
    )
}

export default ServiziSingleCard