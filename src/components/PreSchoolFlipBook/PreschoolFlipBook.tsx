import { useEffect, useRef, useState } from "react"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PageNavButtons from "./PageNavButton"
import PolaroidPic from "./PolaroidPic"
import HTMLFlipBook from "react-pageflip"
import "./preschoolFlipBook.scss"
import PageEmpty from "./PageEmpty"

type ScrapbookImage = {
    src: string
    alt: string
    caption?: string
    rotation?: string
    tapeColor?: "pink" | "blue" | "yellow" | "green"
    sectionName: string
}

interface PreschoolFlipBookProps {
    images: ScrapbookImage[]
    id?: string
    className?: string
}

const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith("/") ? "" : "/"}${p}`

const PreschoolFlipBook = ({ images, id, className = "" }: PreschoolFlipBookProps) => {
    const bookRef = useRef<any>(null)
    const [isPortrait, setIsPortrait] = useState(() => window.innerWidth < 768)
    const [, setCurrentPage] = useState(0)
    
    const [dims, setDims] = useState(() => {
        const mobile = window.innerWidth < 768
        return {
            width: mobile
                ? Math.round(window.innerWidth * 0.95)
                : Math.round(window.innerWidth * 0.47),
            height: mobile
                ? Math.round(window.innerHeight * 0.85)
                : Math.round(window.innerHeight - 140)
        }
    })

    useEffect(() => {
        const calculate = () => {
            const mobile = window.innerWidth < 768

            setIsPortrait(mobile)
            setDims({
                width: mobile
                    ? Math.round(window.innerWidth * 0.95)        // full width single page
                    : Math.round(window.innerWidth * 0.45),       // half width for two pages
                height: mobile
                    ? Math.round(window.innerHeight * 0.85)
                    : Math.round(window.innerHeight - 140)
            })
        }

        calculate()
        window.addEventListener('resize', calculate)
        return () => window.removeEventListener('resize', calculate)
    }, [])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') bookRef.current?.pageFlip()?.flipNext()
            if (e.key === 'ArrowLeft')  bookRef.current?.pageFlip()?.flipPrev()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])
    
    const pages = [
        // TUTTI I LOGHI
        <div key="all_logos" className="scrapbookPage" id="all_logos">
            <div className="scrapbookPage__paper">
                <div id="loghi_progetto_wrapper">
                    <div className="loghi_row ideata_row">
                        <span className="loghi_label">Iniziativa ideata e realizzata da</span>
                        <img className="logo_talea" src={withPublicUrl('/loghi/logo_webHD_0006_black_just_logo.png')} alt="Logo Talea" />
                    </div>
                    <div id="divider_min_logo">
                        <div className="loghi_divider"/>
                            <span className="loghi_label mb-10">Partner di progetto</span>
                            <div id="loghi_partners">
                                <img className="logo_partner" src={withPublicUrl('/immagini-pagine/audiovisivamente/homepage/loghi-partners/partner/logo alta def. trasparente.jpg')} alt="Alta Def" />
                                <img className="logo_partner" src={withPublicUrl('/immagini-pagine/audiovisivamente/homepage/loghi-partners/logonuovo2025.png')} alt="Logo 2025" />
                                <img className="logo_partner" src={withPublicUrl('/immagini-pagine/audiovisivamente/homepage/loghi-partners/partner/Logotipo-Ufficiale-Politecnico-di-Bari-1.png')} alt="Politecnico di Bari" />
                                <img className="logo_partner" src={withPublicUrl('/immagini-pagine/audiovisivamente/homepage/loghi-partners/logo ZICZIC- nero.png')} alt="Zic Zic Edizioni" />
                                <img className="logo_partner" src={withPublicUrl('/immagini-pagine/audiovisivamente/homepage/loghi-partners/partner/pugliarte_logo_2020-since-2010.png')} alt="Pugliarte" />
                                <img className="logo_partner" src={withPublicUrl('/immagini-pagine/audiovisivamente/homepage/loghi-partners/partner/cinema-splendor300x130-1.png')} alt="Cinema Splendor" />
                            </div>
                        <div className="loghi_divider" />
                    </div>
                    <div className="flex flex-column" id="partners_wrapper">
                        <div className="loghi_row mic_row flex flex-column flex-alignItems-center">
                            <img className="logo_cips col-12" src={withPublicUrl('/immagini-pagine/audiovisivamente/homepage/loghi-partners/loghi_progetto.webp')} alt="CIPS - MIC - MIM" />
                            <p className="mic_text">
                                Iniziativa realizzata nell'ambito del Piano Nazionale Cinema e Immagini per la Scuola promosso da MIC e MIM — 
                                <a href="https://www.cinemaperlascuola.istruzione.it" target="_blank" rel="noreferrer">www.cinemaperlascuola.istruzione.it</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        // FRONT COVER PAGE
        <div key="cover" className="coverPage">
            <div className="coverPage__inner" id="home_intro">
                <div id="home_description_wrapper">
                    <h2 className="coverKicker my-0">AudiovisivaMENTE</h2>
                    <p className="coverSubtitle my-30">Spazi Ecologici e Digitali</p>
                    <p className="home_description my-0">
                        Il progetto Audiovisivamente integra educazione ambientale, civica e digitale,
                        utilizzando il linguaggio audiovisivo come strumento di apprendimento trasversale.
                    </p>
                    <p className="home_description">
                        L'obiettivo è sviluppare consapevolezza critica e competenze digitali tra gli studenti di ogni ordine e grado,
                        esplorando il legame tra spazio ecologico e digitale in un'ottica di sostenibilità e cittadinanza attiva.
                    </p>
                </div>
                <PageNavButtons isPortrait={isPortrait} mode="portrait-both-desktop-next" label="Sfoglia" />
            </div>
        </div>,

        // EMPTY PAGE (mobile only)
        ...(!isPortrait ? [<PageEmpty key="empty-1" section="general" />] : []),

        // ANALOGIE SECTION
        <div key="analogie-section" className="scrapbookPage">
            <div className="scrapbookPage__paper">
                <div className="pageTitDesc flex flex-column flex-alignItems-center flex-justifyContent-center">
                    <p className="pageTitle">ANALOGIE</p>
                    <p className="home_description my-0">
                        È un'esplorazione urbana analogica condotta da Silvia Tarantini e Angela Lilia Cavallo,
                        della casa editrice Zic Zic con i bambini e le bambine delle classi IV dell'Istituto Comprensivo Japigia I Verga di Bari.
                    </p>
                    <p className="home_description">
                        Equipaggiati di macchinette fotografiche analogiche,  i bambini hanno attraversato la periferia, il mercato rionale di Japigia,
                        le zone delle case popolari, fino alla spiaggia di Pane e Pomodoro alla ricerca di qualcosa che catturasse la loro attenzione, ridisegnando i margini del loro quartiere
                    </p>
                </div>
                <PageNavButtons isPortrait={isPortrait} mode="portrait-both-desktop-next" />
            </div>
        </div>,

        // ANALOGIE IMAGES
        ...images.filter(img => img.sectionName === 'analogie').map((image, index) => (
            <div className="scrapbookPage" key={`analogie-${image.src}-${index}`}>
                <div className="scrapbookPage__paper">
                    <PolaroidPic image={image} />
                    <PageNavButtons index={index} isPortrait={isPortrait} />
                </div>
            </div>
        )),

        // EMPTY PAGE (mobile only)
        ...(!isPortrait ? [<PageEmpty key="empty-2" section="general" />] : []),

        // SCUOLA DELL'INFANZIA SECTION
        <div key="infanzia-section" className="scrapbookPage">
            <div className="scrapbookPage__paper">
                <div className="pageTitDesc flex flex-column flex-alignItems-center flex-justifyContent-center">
                    <p className="home_description my-0">
                        Le fotografie analogiche scattate dai bambini delle Scuole Primarie Don Orione e San Francesco, come in una piccola staffetta,
                        sono arrivate nelle mani dei bambini della Scuola dell'Infanzia San Francesco.
                    </p>
                    <p className="home_description">
                        Le nostre esperte ZicZic, per l'occasione hanno ricreato una camera ottica artigianale,
                        mostrando ai bambini come funziona una rudimentale macchina fotografica e creando dei giochi per allenare gli occhi nel riconoscere le immagini.
                    </p>
                </div>
                <PageNavButtons isPortrait={isPortrait} mode="portrait-both-desktop-next" />
            </div>
        </div>,
        // SCUOLA DELL'INFANZIA PICTURES
        ...images.filter(img => img.sectionName === 'scuolaInfanzia').map((image, index) => (
            <div className="scrapbookPage" key={`infanzia-${image.src}-${index}`}>
                <div className="scrapbookPage__paper">
                    <PolaroidPic image={image} />
                    <PageNavButtons index={index} isPortrait={isPortrait} />
                </div>
            </div>
        )),

        // EMPTY PAGE (mobile only)
        ...(!isPortrait ? [<PageEmpty key="empty-3" section="general" />] : []),

        // SCUOLA SUPERIORE SECTION
        <div key="superiore-section" className="scrapbookPage">
            <div className="scrapbookPage__paper">
                <div className="pageTitDesc flex flex-column flex-alignItems-center flex-justifyContent-center">
                    <p className="home_description my-0">
                        A partire dagli scatti fotografici analogici realizzati dalla scuola primaria e dalla rielaborazione artistica realizzata dalla scuola dell'infanzia,
                        gli studenti dell'IIstituto Tecnico Economico e Tecnologico Statale Lenoci Euclide, interrogando l'Intelligenza Artificiale hanno generato nuove immagini che raccontano due possibili scenari futuri.
                    </p>
                    <p className="home_description">
                        Il laboratorio è stato guidato da Dario Mattia - Docente compositore, sound designer e ricercatore presso il Conservatorio "Duni" di Matera e referente scientifico del progetto AudiovisivaMente.
                    </p>
                </div>
                <PageNavButtons isPortrait={isPortrait} mode="portrait-both-desktop-next" />
            </div>
        </div>,
        // SCUOLA SUPERIORE PICTURES
        ...images.filter(img => img.sectionName === 'scuolaSuperiore').map((image, index) => (
            <div className="scrapbookPage" key={`superiore-${image.src}-${index}`}>
                <div className="scrapbookPage__paper">
                    <PolaroidPic image={image} />
                    <PageNavButtons index={index} isPortrait={isPortrait}/>
                </div>
            </div>
        )),

        // EMPTY PAGE (mobile only)
        ...(!isPortrait ? [<PageEmpty key="empty-4" section="general" />] : []),

        // CINEOCCHIO SECTION
        <div key="cineocchio-section" className="scrapbookPage">
            <div className="scrapbookPage__paper">
                <div className="pageTitDesc flex flex-column flex-alignItems-center flex-justifyContent-center">
                    <p className="pageTitle">IL CINEOCCHIO</p>
                    <p className="pageSubTitle"> MAPPATURA AUDIOVISIVA DEL QUARTIERE</p>
                    <p className="home_description my-0">
                        Le classi quinte della scuola primaria dell'Istituto Comprensivo Japigia I Verga di Bari partecipano a delle uscite sul territorio creando una mappatura audiovisiva delle attività storiche, dei volti, delle voci, degli spazi del quartiere.
                    </p>
                    <p className="home_description">
                        L'esito di questa azione è la realizzazione di un breve documentario partecipato sul quartiere Japigia di Bari, con l'obiettivo di fortificare la relazione scuola - territorio e persone.
                    </p>
                </div>
                <PageNavButtons isPortrait={isPortrait} mode="portrait-both-desktop-next" />
            </div>
        </div>,
        // CINEOCCHIO PICTURES
        ...images.filter(img => img.sectionName === 'cineocchio').map((image, index) => (
            <div className="scrapbookPage" key={`cineocchio-${image.src}-${index}`}>
                <div className="scrapbookPage__paper">
                    <PolaroidPic image={image} />
                    <PageNavButtons index={index} isPortrait={isPortrait}/>
                </div>
            </div>
        )),

        // EMPTY PAGE (mobile only)
        ...(!isPortrait ? [<PageEmpty key="empty-5" section="general" />] : []),


        // ECO VIRTUAL TOUR SECTION
        <div key="eco-section" className="scrapbookPage">
            <div className="scrapbookPage__paper">
                <div className="pageTitDesc flex flex-column flex-alignItems-center flex-justifyContent-center">
                    <p className="pageTitle">ECO VIRTUAL TOUR</p>
                    <p className="home_description my-0">
                        Esplorare la natura in un cammino immersivo fatto di suoni, immagini e parole.
                        Due classi della scuola secondaria di I° grado dell'@Istituto Comprensivo Japigia 1 Verga hanno esplorato la riserva naturale di Costa Ripagnola insieme a Alessandro De Luisi, guida turistica e presidente dell'Associazione Pugliarte e i professionisti dell'Associazione Talea, Cristina D'Eredità, Dario Mattia e Paola Sarappa.
                    </p>
                    <p className="home_description">
                        Con microfoni, registratori e telecamere alla mano, attraverso l'applicazione della tecnologia audiovisiva 360° i ragazzi hanno captato tutta l'essenza del luogo.
                    </p>
                </div>
                <PageNavButtons isPortrait={isPortrait} mode="portrait-both-desktop-next" />
            </div>
        </div>,
        // ECO VIRTUAL TOUR PICTURES
        ...images.filter(img => img.sectionName === 'ecoVirtualTour').map((image, index) => (
            <div className="scrapbookPage" key={`eco-${image.src}-${index}`}>
                <div className="scrapbookPage__paper">
                    <PolaroidPic image={image} />
                    <PageNavButtons index={index} isPortrait={isPortrait} />
                </div>
            </div>
        )),



        // EMPTY PAGE (mobile only)
        ...(!isPortrait ? [<PageEmpty key="empty-6" section="general" />] : []),

        // CINEMA ED AMBIENTE SECTION
        <div key="cinema-section" className="scrapbookPage">
            <div className="scrapbookPage__paper">
                <div className="pageTitDesc flex flex-column flex-alignItems-center flex-justifyContent-center">
                    <p className="pageTitle">Cinema e Ambiente</p>
                    <p className="home_description my-0">
                        Una rassegna cinematografica che esplora le tematiche della cittadinanza attiva  attraverso una selezione di film,
                        per promuovere un dialogo costruttivo sulle sfide che il nostro pianeta si trova ad affrontare
                    </p>
                </div>
                <PageNavButtons isPortrait={isPortrait} mode="portrait-both-desktop-next" />
            </div>
        </div>,
        // CINEMA ED AMBIENTE FOTO
        ...images.filter(img => img.sectionName === 'cinemaAmbiente').map((image, index) => (
            <div className="scrapbookPage" key={`cinema-${image.src}-${index}`}>
                <div className="scrapbookPage__paper">
                    <PolaroidPic image={image} />
                    <PageNavButtons index={index} isPortrait={isPortrait} />
                </div>
            </div>
        )),

        // BACK COVER
        <div key="back-cover" className="page backPage">
            <div className="backPage__inner">
            </div>
        </div>
    ]

    return (
        <div className={`preschoolFlipBookWrap ${className}`} id={id}>
            <HTMLFlipBook
                ref={bookRef}
                width={dims.width}
                height={dims.height}
                size="stretch"
                minWidth={dims.width}
                maxWidth={dims.width}
                minHeight={400}
                maxHeight={dims.height}
                maxShadowOpacity={0.35}
                showCover={false}
                mobileScrollSupport={true}
                className={`${isPortrait ? "smallScreen" : ""} preschoolBook`}
                startPage={0}
                drawShadow={true}
                flippingTime={400}
                usePortrait={isPortrait}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={false}
                disableFlipByClick={false}
                onFlip={(e: any) => setCurrentPage(e.data)}
                style={isPortrait
                    ? { position: "relative", margin: "0 auto" }
                    : { position: "absolute", inset: "0", margin: "0 auto" }
                }
            >
                {pages}
            </HTMLFlipBook>
            {isPortrait && (
                <div className="mobileBookNav">
                    <button
                        className="mobileBookNav__btn"
                        onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
                        aria-label="Pagina precedente"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        className="mobileBookNav__btn"
                        onClick={() => bookRef.current?.pageFlip()?.flipNext()}
                        aria-label="Pagina successiva"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default PreschoolFlipBook