import { useInView } from "react-intersection-observer"
import MagazineGallery from "./MagazineGallery/MagazineGallery"
import "../../page.scss"
import './distopie.scss'

const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith("/") ? "" : "/"}${p}`

const aiImages = [
    '9.webp','10.webp','03.webp','4.webp','5.webp',
    '6.webp','7.webp','08.webp','01.webp','02.webp'
].map(image_url => withPublicUrl(`/immagini-pagine/audiovisivamente/distopie/AI-lenoci/${image_url}`))

const filmImages = [
    '1.webp','2.webp','3.webp','4.webp','5.webp',
    '6.webp','7.webp','8.webp','9.webp','10.webp'
].map(image_url => withPublicUrl(`/immagini-pagine/audiovisivamente/distopie/cortometraggio-lenoci/${image_url}`))



const Distopie = () => {
    const [heroTextRef, inViewHeroText] = useInView({ threshold: .1, triggerOnce: false })
    const [heroTextRefBot, inViewHeroTextBot] = useInView({ threshold: .1, triggerOnce: false })
    const [heroDescrRef, inViewHeroDescr] = useInView({ threshold: .1, triggerOnce: false })
    const [heroDescrRef2, inViewHeroDescr2] = useInView({ threshold: .1, triggerOnce: false })
    const [topRef, inViewTop] = useInView({ threshold: 0, triggerOnce: true })
    const [bottomRef, inViewBottom] = useInView({ threshold: 0, triggerOnce: true })

    return (
        <div className="page audiovisivamente__page" id="audiovisivamente__distopie">
            <section className="heroAudio">
                <h1 ref={heroTextRef} className={`heroTitle ${inViewHeroText ? "inView" : ""}`}>Distopie</h1>
            </section>

            <section className="section top">
                <div ref={heroDescrRef} className={`content hero_desc_wrapper ${inViewHeroDescr ? "inView" : ""}`}>
                    <p lang="it">
                        Nicole Novielli - Docente del Dipartimento di Informatica dell'Università di Bari -
                        ha condotto gli studenti e i docenti dell'Istituto Tecnico Economico e Tecnologico Statale Lenoci Euclide
                        in un viaggio completo nel mondo dell'intelligenza artificiale, tra storia, funzionamento e utilizzi strategici
                        in ambito audiovisivo, per comprendere meglio una delle tecnologie più rilevanti del nostro tempo,
                        che sta indubbiamente modificando il nostro presente e i nostri futuri scenari.
                    </p>
                </div>
                <div ref={topRef}>
                    <MagazineGallery images={aiImages} inView={inViewTop} />
                </div>
            </section>

            <div className="image-gap">
                <img
                    src={withPublicUrl('/loghi/avorio_caldo_trasparente (1).png')}
                    alt={'Audiovisivamente'}
                    className="scrapbookPhoto"
                    style={{maxWidth: '600px', height: 'auto', filter: 'drop-shadow(1px 4px 2px rgba(26, 26, 26, 0.335))'}}
                />
            </div>

            <section className="section bottom">
                <div ref={heroDescrRef2} className={`content hero_desc_wrapper ${inViewHeroDescr2 ? "inView" : ""}`}>
                    <p lang="it">
                        Le studentesse dell'Istituto Tecnico Economico e Tecnologico Statale Lenoci Euclide,
                        in un percorso formativo coinvolgente e super creativo, guidato dal regista Antonio Palumbo
                        hanno appreso le basi della produzione filmica e si sono subito messe alla prova con la realizzazione
                        di un cortometraggio sull'uso sconsiderato dell'Intelligenza Artificiale.
                    </p>
                </div>
                <div ref={bottomRef}>
                    <MagazineGallery images={filmImages} inView={inViewBottom} />
                </div>
            </section>
            <section className="section top"></section>

            <div className="image-gap">
                <img
                    src={withPublicUrl('/loghi/avorio_caldo_trasparente (1).png')}
                    alt={'Audiovisivamente'}
                    className="scrapbookPhoto"
                    style={{maxWidth: '600px', height: 'auto', filter: 'drop-shadow(1px 4px 2px rgba(26, 26, 26, 0.335))'}}
                />
            </div>

            <section className="section bottom heroAudio pb-40">
                <h1 ref={heroTextRefBot} className={`heroTitle ${inViewHeroTextBot ? "inView" : ""}`}>Cortometraggio</h1>

                <video
                    playsInline
                    webkit-playsinline
                    controls
                    preload="metadata"
                    poster={withPublicUrl('/immagini-pagine/audiovisivamente/distopie/cortometraggio-lenoci/distopie-poster.jpg')}
                    crossOrigin="anonymous"
                    id="videoCorto"
                >
                    <source src="https://pub-3e8f1f8594254c93a49fb4e5bef03ab0.r2.dev/MASTER_LOVE%20BOT.mp4" type="video/mp4"/>
                </video>
            </section>
        </div>
    )
}

export default Distopie
