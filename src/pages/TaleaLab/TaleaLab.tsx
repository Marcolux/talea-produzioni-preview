import { useInView } from "react-intersection-observer"
import TaleaLabSingleCard from "../../components/TaleaLabCard/TaleaLabCard"
import GalleryLightbox from "../../components/GalleryLightbox/GalleryLightbox"
import "../page.scss"
import './talea-lab.scss'
import { Link } from "react-router-dom"

const TaleaLab = () => {

    const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith('/') ? '' : '/'}${p}`
    const [heroTextRef, inViewHeroText] = useInView({ threshold: .5, triggerOnce: true })
    const [pageDescTextRef, inViewPageDesc] = useInView({ threshold: .5, triggerOnce: false })
    const [pageDescTextRefFatto, inViewPageDescFatto] = useInView({ threshold: .5, triggerOnce: false })

    const images = [
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_1.jpg"), alt: "Sunset" },
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_2.png"), alt: "Mountains" },
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_3.png"), alt: "City lights" },
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_4.png"), alt: "City lights" },
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_5.png"), alt: "City lights" },
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_6.png"), alt: "City lights" },
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_7.png"), alt: "City lights" },
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_8.png"), alt: "City lights" },
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_9.png"), alt: "City lights" },
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_10.png"), alt: "City lights" },
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_11.jpg"), alt: "City lights" },
        { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_12.jpg"), alt: "City lights" },
        // { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_13.jpg"), alt: "City lights" },
        // { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_15.jpeg"), alt: "City lights" },
        // { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_16.jpeg"), alt: "City lights" },
        // { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_17.jpeg"), alt: "City lights" },
        // { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_18.jpeg"), alt: "City lights" },
        // { src: withPublicUrl("immagini-pagine/talea-lab/ritmicitta_19.jpeg"), alt: "City lights" },
    ]

    return(
        <>
            <div className="bg-layer"  style={{background: `url(${withPublicUrl('/varie/urbis_15.jpeg')})`}}></div>
            <div className="page p-0" id="talea_lab">
                <div className="flex" id="heroWrapperTaleaLab">
                    <video
                        autoPlay
                        muted
                        playsInline
                        webkit-playsinline
                        loop
                        preload="metadata"
                        poster={withPublicUrl('/varie/clip_lab-musica_1.jpg')}
                        crossOrigin="anonymous"
                    >
                        <source src={withPublicUrl('/varie/clip_lab-musica_1.mp4')} type="video/mp4"/>
                    </video>
                    <h1 ref={heroTextRef} className={inViewHeroText ? "font-sanmarino pageTitle inView": "font-sanmarino pageTitle"}>Talea Lab</h1>
                    <div className='overlay' />
                </div>
                <div id="talea_lab_sect" className="">

                    <h1 ref={pageDescTextRef} className={ inViewPageDesc ? "font-sanmarino inView" : "font-sanmarino" }>
                        Generare un impatto positivo sulle nuove generazioni
                    </h1>

                    <p className="tale_lab_descr_text" lang="it">Talea è attiva nell’ambito dell’educazione e della formazione, organizza attività e laboratori per ragazze e ragazzi, in particolar modo in situazioni di povertà educativa. Collaboriamo con istituzioni e associazioni, per ideare e realizzare percorsi artistici, cinematografici e musicali rivolti a studenti, docenti ed adulti della comunità educante.</p>
                    <p className="tale_lab_descr_text" lang="it">Crediamo nella collaborazione e nella contaminazione tra persone con differenti background culturali e questo approccio è lo stesso utilizzato dal nostro team multidisciplinare. Nei nostri laboratori trasmettiamo le competenze necessarie per utilizzare il linguaggio dell’arte, della musica e degli audiovisivi, per innovare e migliorare il presente.</p>
                    <p className="tale_lab_descr_text" lang="it">Talea ogni anno sperimenta nuovi laboratori e attività tematizzate. Tutti i laboratori sono completamente personalizzabili in base alle fasce d’età e al livello di apprendimento.</p>
                </div>
                {/* <div className="waveMask my-40"/> */}

                <div id="talea_lab_attivita">
                    <TaleaLabSingleCard 
                        title="Cine Lab"
                        images={[
                            "/immagini-pagine/talea-lab/labs-pics/cinelab 1.webp", 
                            "/immagini-pagine/talea-lab/labs-pics/cinelab 2.webp", 
                            "/immagini-pagine/talea-lab/labs-pics/cinelab 3.webp",
                            "/immagini-pagine/talea-lab/labs-pics/cinelab 4.webp",
                            "/immagini-pagine/talea-lab/labs-pics/cinelab 5.webp",
                        ]} 
                        cardDescription="Il cinema è un potente strumento di conoscenza della realtà. Stimola lo sguardo, affina il gusto estetico, sviluppa e favorisce il senso critico, il dialogo e il confronto. I nostri percorsi di didattica del cinema per ragazze e ragazzi hanno proprio l’obiettivo di far comprendere e sperimentare il processo creativo alla base del racconto cinematografico e il ruolo dei mestieri del cinema. Tutti i laboratori sono arricchiti da attività pratiche a seconda dei differenti livelli e contesti di intervento."
                        leftRight="left"
                        withPublicUrl={withPublicUrl}
                    />
                    <TaleaLabSingleCard 
                        title="Music Lab"
                        images={[
                            "/immagini-pagine/talea-lab/labs-pics/musiclab 1.webp", 
                            "/immagini-pagine/talea-lab/labs-pics/musiclab 2.jpeg", 
                            "/immagini-pagine/talea-lab/labs-pics/musiclab 3.jpeg",
                            "/immagini-pagine/talea-lab/labs-pics/musiclab 4.jpeg",
                        ]} 
                        cardDescription="Abbiamo sviluppato delle esperienze musicali che si basano sul concetto di musica di insieme. Le opzioni sono molteplici, è infatti possibile realizzare laboratori de ensemble corali, laboratori di percussioni e ritmi dal mondo o laboratori di produzione musicale, durante i quali il gruppo lavora come se si trovasse in un studio di registrazione, con lo scopo di produrre un brano inedito. Curiosità e divertimento per stimolare l’accrescimento delle capacità musicali."
                        leftRight="right"
                        withPublicUrl={withPublicUrl}
                    />
                    <TaleaLabSingleCard 
                        title="Soundscaping"
                        images={[
                            "/immagini-pagine/talea-lab/labs-pics/", 
                            "/immagini-pagine/talea-lab/labs-pics/", 
                            "/immagini-pagine/talea-lab/labs-pics/",
                        ]} 
                        cardDescription="Delle passeggiate sonore, un percorso tecnico-artistico che ha come obiettivo la composizione e produzione musicale a partire dai suoni della città, per valorizzare aspetti identitari significativi attraverso la scoperta del paesaggio sonoro. Il suono, un potente attivatore di immagini ed emozioni, ci permette di viaggiare molto molto lontano e di riscoprire ciò che è prossimo."
                        leftRight="left"
                        withPublicUrl={withPublicUrl}
                    />
                    <TaleaLabSingleCard 
                        title="Art Lab"
                        images={[
                            "/immagini-pagine/talea-lab/labs-pics/artlab 0.webp", 
                            "/immagini-pagine/talea-lab/labs-pics/artlab 1.webp", 
                            "/immagini-pagine/talea-lab/labs-pics/artlab 2.webp",
                            "/immagini-pagine/talea-lab/labs-pics/artlab 3.webp",
                            "/immagini-pagine/talea-lab/labs-pics/artlab 4.webp",
                            "/immagini-pagine/talea-lab/labs-pics/artlab 5.webp",
                        ]} 
                        cardDescription="Proponiamo percorsi laboratoriali per bambini/e e ragazzi/e con diverse finalità artistiche: alfabetizzazione e avvicinamento alla fotografia, rielaborazione artistica e multimediale; percorsi di costruzione di maschere e oggetti di scena; workshop di trucco scenico ed effetti speciali di make-up per il teatro e per il cinema. Tutti i laboratori sono strutturati in base agli obiettivi finali e ai differenti contesti di intervento."
                        leftRight="right"
                        withPublicUrl={withPublicUrl}
                    />
                    <Link className="primary_btn py-10" to="/contatti">
                        <span> Organizza il tuo laboratorio</span>
                    </Link>
                </div>
                {/* <ScrollingSec/> */}

                <div  className={"pageTransition_lab inView"}></div>
                <div className="cosa_abbiamo_fatto_lab p-50" >
                    <h1 ref={pageDescTextRefFatto} className={ inViewPageDescFatto ? "font-sanmarino inView" : "font-sanmarino" }>
                        Cosa abbiamo fatto
                    </h1>
                    <div className="flex p-30 col-12 flex-justifyContent-center ritmiincitta_wrapper">
                        <div id="ritmicitta_images_wrapper" className="col-5 flex ">
                            <GalleryLightbox images={images} />
                        </div>
                        <div id="ritmicitta_text" className="col-6 flex flex-column p-50">

                            <h1 ref={pageDescTextRefFatto} className={`font-sanmarino ${ inViewPageDescFatto ?  "inView" : "" }`}>
                                Ritmiincittà
                            </h1>
                            <p lang="it">Ritmincittà è un progetto socio-culturale realizzato tra giugno 2020 e giugno 2022 risultato vincitore dell’avviso pubblico per l’individuazione di proposte progettuali per la creazione di servizi di prossimità presso le aree urbane della Città di Bari a forte rischio di marginalità in attuazione dell’intervento Asse 3, Azione 3.3.1 – Progetto BA3.3.1.g “Urbis” del PON Metro 2014 – 2020. Il target delle attività sono stati giovani baresi di età compresa tra i 14 e 35 anni, in condizioni di disagio economico e sociale dei quartieri Libertà e San Nicola. Sono stati realizzati 3 laboratori artistici: percussioni, danza e realizzazione di costumi e maschere, con il supporto di un servizio di counselling psicologico e di documentazione audiovisiva. Le attività si sono concluse con l’organizzazione di un Carnevale, un momento di festa, una sfilata colorata che ha portato per le strade del quartiere i ragazzi che hanno avuto la possibilità di condividere all’interno del loro contesto di riferimento il lavoro svolto durante il progetto. Ritmincittà si è inserito nel contesto globale di una politica di prevenzione, formazione ed empowerement, per coltivare i valori etici ed estetici, in stretta relazione con il fare musica. Talea ha dato il suo contributo per “Laboratorio di percussioni” per il progetto “Bullismo: violenza fra pari” del III municipio del Comune di Bari”</p>
                            <Link className="primary_btn py-10 col-12" to="https://www.youtube.com/watch?v=vryQb71fX3w" target="_blank" style={{minWidth: '100%'}}>
                                <span>Guarda il video</span>
                            </Link>
                            <div id="loghi_footer_ritmi" className="flex">
                                <img src={withPublicUrl('/immagini-pagine/talea-lab/loghi-footer.png')} alt="Ritmicitta Collaborazioni" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default TaleaLab