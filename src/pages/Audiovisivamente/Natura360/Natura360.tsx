import { useInView } from "react-intersection-observer"
import Player360 from "./Player360"
import "../../page.scss"
import "./natura360.scss"

const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith("/") ? "" : "/"}${p}`
const VIDEO_SRC_7 = 'https://pub-3e8f1f8594254c93a49fb4e5bef03ab0.r2.dev/Costa%20Ripagnola%20-%20Video%201.mp4'
const POSTER_SRC  = withPublicUrl('/immagini-pagine/audiovisivamente/natura360/poster.jpg')

const Natura360 = () => {
    const [heroTextRef, inViewHeroText] = useInView({ threshold: .1, triggerOnce: true })
    const [heroDescrRef, inViewHeroDescr] = useInView({ threshold: .1, triggerOnce: true })

    return (
        <div className="page audiovisivamente__page" id="audiovisivamente__eco_virtual_tour">
            <section className="heroAudio">
                <h1 ref={heroTextRef} className={`heroTitle ${inViewHeroText ? "inView" : ""}`}>360° Eco Virtual Tour</h1>
                <div ref={heroDescrRef} className={`${inViewHeroDescr ? "inView" : ""} hero_desc_wrapper`}>
                    <p className="col-12" lang="it">
                        Cosa succede quando l'esplorazione della natura incontra la tecnologia più avanzata?
                        Zaino in spalla e visori pronti, per le studentesse e gli studenti della scuola secondaria di I grado
                        dell'IC Japigia I Verga la missione è iniziata nel cuore di una riserva naturale.
                    </p>
                    <p className="col-12" lang="it">
                        Accompagnati da Alessandro De Luisi  guida accreditata dell'ass. Pugliarte, i ragazzi hanno esplorato sentieri e biodiversità, ma non si sono limitati a guardare.
                        Supportati dai professionisti dell'Associazione Talea, hanno letteralmente "catturato" l'ambiente circostante utilizzando la tecnologia audiovisiva a 360°.
                        Non una semplice foto, ma un'immersione totale tra suoni e immagini della natura!
                    </p>
                </div>
            </section>

            <section className="natura360__player">
                {/* <p className="natura360__label">ECO-VIRTUAL-TOUR</p> */}
                <Player360 src={VIDEO_SRC_7} POSTER_SRC={POSTER_SRC} videoId="video360_1" />
            </section>
        </div>
    )
}

export default Natura360
