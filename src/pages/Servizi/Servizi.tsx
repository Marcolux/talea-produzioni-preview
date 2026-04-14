import ServiziSingleCard, { SingleServiziCard } from "../../components/ServiziCard/ServiziSingleCard"
import './servizi.scss'
import "../page.scss"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"


const Servizi = () => {
    const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith('/') ? '' : '/'}${p}`
    const services: SingleServiziCard[] = [
        {
            title: "PRODUZIONE ESECUTIVA",
            description: "Gestiamo l’intera filiera produttiva, dall’elaborazione dei budget e la pianificazione della pre-produzione all’organizzazione logistica sul set. Supervisioniamo ogni fase della post-produzione, garantendo il rispetto dei tempi e degli standard tecnici fino alla consegna del master finale. Professionalità esecutiva al servizio di produzioni cinematografiche, televisive e corporate.",
            nameInURL: "immagini-pagine/servizi/produzione_esecutiva.jpg",
            servizio: "Produzione Esecutiva"
        },
        {
            title: "SCRITTURA E SVILUPPO CREATIVO",
            description: "Sviluppiamo contenuti originali partendo dall’analisi del target e degli obiettivi comunicativi. Il nostro servizio include la ricerca documentale, la creazione della struttura narrativa e la scrittura dei testi, fornendo sceneggiature pronte per la fase di pre-produzione. ",
            nameInURL: "immagini-pagine/servizi/scrittura creativa.jpg",
            servizio: "Scrittura e sviluppo creativo"
        },
        {
            title: "PROGETTAZIONE E REALIZZAZIONE PODCAST",
            description: "Realizzazione di contenuti audio e video: dalla ricerca e scrittura creativa alla registrazione e finalizzazione tecnica. Integriamo sound design, musiche e GFX originali per definire un’identità  distintiva e professionale. Forniamo supporto tecnico completo, dalla stesura del piano editoriale al mastering finale pronto per la pubblicazione",
            nameInURL: "immagini-pagine/servizi/podcast.jpg",
            servizio: "Podcast"
        },
        {
            title: "AUDIO MIX E POST PRODUZIONE",
            description: "Offriamo soluzioni di mixaggio e sonorizzazione per documentari, spot e cinema. Ci occupiamo di editing audio, foley e mastering multi-piattaforma, fornendo file pronti per la messa in onda o la distribuzione web.",
            nameInURL: "immagini-pagine/servizi/audio.jpg",
            servizio: "Audio mix e post-produzione"
        },
        {
            title: "MONTAGGIO E POST PRODUZIONE",
            description: "Editing video professionale con gestione di workflow nativi e proxy per ottimizzare i tempi di lavorazione su progetti complessi. Offriamo servizi di color grading, titolazione e mastering in conformità con i codec e i profili richiesti dai distributori. Finalizzazione accurata per garantire la massima resa visiva su web, broadcast e cinema.",
            nameInURL: "immagini-pagine/servizi/servizi_montaggio.jpg",
            servizio: "Montaggio e post-produzione"
        },
        {
            title: "COMPOSIZIONE DI COLONNE SONORE",
            description: "Composizione, arrangiamento e mastering di colonne sonore originali. Sviluppiamo strutture musicali ottimizzate per i diversi formati di distribuzione, curando la gestione della dinamica e dello spettro frequenziale per garantire un ascolto bilanciato e professionale su ogni sistema di riproduzione.",
            nameInURL: "immagini-pagine/servizi/servizi-colonne.jpg",
            servizio: "Composizione di colonne sonore"
        },
        {
            title: "NOLEGGIO DRONE CON OPERATORE",
            description: "Riprese aeree professionali gestite da operatori autorizzati, Riprese fluide e stabilizzate per cinema, documentari e spot.",
            nameInURL: "immagini-pagine/servizi/servizi-drone.jpg",
            servizio: "Noleggio drone con operatore"
        },
        {
            title: "360° Eco-Virtual Tour",
            description: "Progettazione di tour in Realtà Virtuale (VR) e Aumentata (AR) con tecnologia video 360 e audio tridimensionale. Integriamo riprese sferiche e microfoni ambisonici per una ricostruzione spaziale dinamica del suono, ottimizzando la fruizione immersiva tramite visori VR e dispositivi mobili. Un workflow tecnico avanzato per la valorizzazione di percorsi eco-sostenibili attraverso esperienze sensoriali interattive e spazializzate.",
            nameInURL: "immagini-pagine/servizi/servizi-drone.jpg",
            servizio: "360° Eco-Virtual Tour"
        }
    ]
    const [heroTextRef, inViewHeroText] = useInView({ threshold: .1, triggerOnce: false })

    return(
        <div className="page p-0" id="servizi_page">
            <div className="flex" id="heroWrapper">
                <video
                    autoPlay
                    muted
                    playsInline
                    webkit-playsinline
                    loop
                    preload="metadata"
                    poster={withPublicUrl('/varie/talea-hub-1.jpg')}
                    crossOrigin="anonymous"
                >
                    <source src={withPublicUrl('/varie/talea-hub-1.mp4')} type="video/mp4"/>
                </video>
                <h1 ref={heroTextRef} className={`font-sanmarino pageTitle ${inViewHeroText ? "inView": ""}`}>Servizi</h1>
                <div className='overlay'/>
            </div>

            {/* <ScrollingDeckService cards={services} /> */}
            <div className="flex flex-column flex-justifyContent-center flex-alignItems-center" id="all_service_cards">

                {services.map((service, i) => {
                    const leftRight = i%2 ? 'right_card' : 'left_card'
                    return(
                        <ServiziSingleCard
                            title={service.title}
                            description={service.description}
                            url={service.nameInURL}
                            leftRight={leftRight}
                            withPublicUrl={withPublicUrl}
                            servizio={service.servizio}
                        />
                    )
                })}
            </div>


        </div>
    )
}

export default Servizi