import "../page.scss" 
import "./HomePage.scss"
import './Wave Separator.svg' 
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import FlippingCardCK from "../../components/FlippingCardCK/FlippingCardCK";

const HomePage = () => {
    const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith('/') ? '' : '/'}${p}`
    const [heroVideoRef, inViewVideoHero] = useInView({ threshold: .1, triggerOnce: false })
    const [heroRef, inViewHero] = useInView({ threshold: .1, triggerOnce: false })
    const [taleaDefRef, inView] = useInView({ threshold: .5, triggerOnce: false })
    const [germogliRef, inViewGermogli] = useInView({ threshold: .1, triggerOnce: false })

    const videoRef = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        if (inViewVideoHero && videoRef.current) {
            const video = videoRef.current

            video.pause()                   // stop if already playing
            video.currentTime = 0           // rewind
            video.play().catch(() => {})    // play safely (prevents console warning)
        }
    }, [inViewVideoHero])

    return(
        <div className="page" id="homePage">
            <div id="heroAniWrapper">
                <div 
                    id="videoWrapper"
                    ref={(el) => {
                        heroVideoRef(el)
                    }}
                    className={inViewVideoHero ? 'inView' : '' }
                >
                    <video
                        autoPlay
                        muted
                        playsInline
                        webkit-playsinline
                        preload="metadata"
                        crossOrigin="anonymous"
                        ref={videoRef}
                    >
                        <source src={'https://res.cloudinary.com/drdrs6pdq/video/upload/v1776179653/Talea/animazione_talea_short.mp4'} type="video/mp4"/>
                    </video>
                </div>

                <h1 ref={heroRef} className={inViewHero ? "font-sanmarino inView": "font-sanmarino"} >La creatività è un atto generativo</h1>
            </div>
            <div id="homepage_transition" className="">

                <div className="waveMask mt-40"/>
                <h1 ref={taleaDefRef} className={`font-sanmarino ${inView ? " inView" : ""}` }>
                    <span>[ta-lè-a] o [tà-le-a]</span> 
                    <span>Emettere radici e generare nuove visioni</span>
                </h1>

                <p lang="it">
                    Moltiplicazioni creative nell’ambito della produzione e post-produzione audiovisiva e musicale.
                    Ci ispiriamo a storie di persone, culture e paesaggi, con una spiccata attenzione nella ricerca di linguaggi innovativi e sorprendenti.
                </p>

            </div>
            <div id="homepage_germogli">
                <h1 ref={germogliRef} className={`font-sanmarino ${inViewGermogli ? " inView" : "" }`}>
                    <span>Germogli</span>
                </h1>
                <div className={'flex flex-wrap col-12 p-50 mt-50 flex-justifyContent-center'} id="all_cards_wrapper">

                    <FlippingCardCK 
                        id="talea_home_card_1" 
                        imgSrc={withPublicUrl(`/immagini-pagine/homepage/HOME_NEWS_IRINA_COVER.jpg`)}
                        imgAlt={`IRINA COVER front`}
                        overlayText={
                            <img
                                src={withPublicUrl(`/immagini-pagine/homepage/HOME_NEWS_IRINA_PRIZE_white.svg`)}
                                alt={`IRINA COVER back`}
                            />
                        }
                        backText={
                            <div className="flex flex-column backText">
                                <h3 className="backTitle primaryColor">
                                    IRINA HALE 
                                    <span className="backSubtitle primaryColor">
                                        - L'artista bambina -
                                    </span>
                                </h3>
                                <p className="backMeta" lang="it">
                                    2023 · 29 min · Regia: Cristina D'Eredità
                                </p>
                                <p className="backDescription" lang="it">
                                    Per Irina Hale dedicarsi all'arte è un’esigenza. 
                                    La storia della sua famiglia attraversa il Novecento, dall'Ottobre Rosso
                                    alla Seconda guerra mondiale fino alle rivoluzioni culturali e sociali
                                    del secolo scorso per arrivare alla contemporaneità, che lei rappresenta
                                    nelle sue opere con vivissimo fervore politico.
                                    <br/>
                                    <br/>
                                    Irina ha scelto come casa un trullo nella Valle d’Itria, in Puglia,
                                    lontana da tutti, eppure profondamente coinvolta in quel mondo che
                                    ha sempre osservato con lo sguardo innocente di una bambina.
                                </p>
                            </div>
                        }
                        cardTitle=""
                    />

                    <FlippingCardCK 
                        id="talea_home_card_2" 
                        imgSrc={withPublicUrl(`/immagini-pagine/homepage/HOME_NEWS_SOLE_COVER.jpg`)} 
                        imgAlt={`NEWS SOLE COVER front`}
                        overlayText={
                            <img
                                src={withPublicUrl(`/immagini-pagine/homepage/HOME_NEWS_SOLE_PRIZE_white.svg`)}
                                alt={`NEWS SOLE COVER front`}
                                className="horizontal_card_img"
                            />
                        }
                        backText={
                            <div className="flex flex-column backText">
                                <h3 className="backTitle primaryColor">
                                    SOTTO LO STESSO SOLE
                                </h3>
                                <p className="backMeta" lang="it">
                                    2019 · 12 min · Regia: Cristina D'Eredità
                                </p>
                                <p className="backDescription" lang="it">
                                    Pochi mesi dopo la caduta del muro di Berlino, Mariantonietta Bagliato, di padre italiano e madre cecoslovacca, 
                                    percorre un lungo viaggio in auto con tutta la famiglia sino ad arrivare in Germania. 
                                    Delle vecchie immagini VHS, tratte dall’archivio di famiglia, documentano il momento storico. 
                                    La madre, Ivana, ripercorre con la memoria gli anni del la repressione vissuti a Praga, 
                                    la sua fuga per amore a Bari e l’inaspettata notizia della caduta del regime nel 1989. 
                                    Il viaggio a Berlino è un evento intimo e familiare che incrocia la memoria storica di un’epoca segnata dalla repressione.
                                </p>
                            </div>
                        }
                        cardTitle=""
                    />
                    <FlippingCardCK 
                        id="talea_home_card_5" 
                        imgSrc={withPublicUrl(`/immagini-pagine/homepage/Strings.webp`)} 
                        imgAlt="Sounds from Human Collective Intelligence"
                        overlayText=""
                        backText={
                            <div className="flex flex-column backText">
                                <h3 className="backTitle primaryColor">
                                    STRINGS
                                </h3>
                                <p className="backMeta meta_strings" lang="it">
                                    Realizzato da Dario Mattia · Supervisione Prof. Fabrizio Festa, docente del conservatorio E. Duni di Matera
                                </p>
                                <p className="backDescription" lang="it">
                                    Sounds from human collective intelligence.
                                    Il progetto esplora l'intelligenza collettiva trasformando l'interazione umana in un'esperienza multisensoriale. 
                                    Grazie a un dispositivo innovativo dotato di sensori biometrici, vengono catturati gli stati d'animo risultanti dall'interazione di un gruppo di persone.
                                </p>
                            </div>
                        }
                        cardTitle="Sounds from Human Collective Intelligence"
                    />
                    <FlippingCardCK 
                        id="talea_home_card_3" 
                        imgSrc={withPublicUrl(`/immagini-pagine/homepage/HOME_NEWS_META_COVER.jpg`)} 
                        imgAlt="META Talea"
                        overlayText={
                            <img
                                src={withPublicUrl(`/immagini-pagine/homepage/Meta_awards_white.png`)}
                                alt={`NEWS META COVER back`}
                            />
                        }
                        backText={
                            <div className="flex flex-column backText">
                                <h3 className="backTitle primaryColor">
                                    META
                                </h3>
                                <p className="backMeta meta_strings" lang="it"></p>
                                <p className="backDescription" lang="it">
                                    Tracce in movimento è una trasposizione sonora e visiva di paesaggi, percorsi naturalistici, artistici e storici. Un’opera multimediale immersiva, in cui convergono idee artistiche, musicali e visive insieme ai dubbi e alle preoccupazioni legate all'emergenza climatica, in questo momento storico.
                                    Il progetto META - Tracce in movimento nasce da un’idea di Dario Mattia in collaborazione con il dipartimento di Musica elettronica del Conservatorio Duni di Matera, diretto dal Maestro Fabrizio Festa, e la casa di produzione di audiovisivi Talea Produzioni.
                                </p>
                            </div>
                        }
                        cardTitle=""
                    />

                </div>
            </div>
            {/* <h1>HOME PAGE</h1> */}
        </div>
    )
}

export default HomePage