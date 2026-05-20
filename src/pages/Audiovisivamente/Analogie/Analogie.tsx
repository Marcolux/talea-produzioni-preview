import { useInView } from "react-intersection-observer"
import Carousel from "../../../components/Carousel/Carousel"
import "../../page.scss"
import "./analogie.scss"
import "./negative-carousel.scss"


const Analogie = () => {
    const [heroAnalogieRef, inViewHeroText] = useInView({ threshold: 0, triggerOnce: false })
    const [heroDescrRef, inViewHeroDescr] = useInView({ threshold: 0, triggerOnce: false })

    return(
        <div className="page audiovisivamente__page" id="audiovisivamente__analogie">
            <section className="heroAudio">
                <h1 ref={heroAnalogieRef} className={`heroTitle ${inViewHeroText ? "inView" : ""} `} >Analogie</h1>
                <div ref={heroDescrRef} className={`${inViewHeroDescr ? "inView" : "" } hero_desc_wrapper`}>
                    <p className="col-12" lang="it">
                        Cosa succede quando i bambini osservano la città attraverso l'obiettivo di una macchina fotografica analogica?
                         Le classi quarte dei plessi San Francesco e Don Orione - Istituto Comprensivo Japigia I Verga -  in collaborazione con Zic Zic Edizioni, 
                         hanno partecipato ad un’uscita sul territorio dedicata alla riscoperta del paesaggio urbano. 
                        L’uso della tecnologia analogica è diventato un pretesto per fermarsi, 
                        osservare i dettagli e riflettere sullo spazio che abitiamo, 
                        per allenare uno sguardo più attento e consapevole sulla realtà circostante e farne un racconto visivo autentico.
                    </p>
                    <p className="col-12" lang="it">
                        In una fase successiva, il testimone è passato alle classi della scuola dell'infanzia. 
                        I più piccoli hanno reinterpretato gli scatti realizzati dalle compagne e 
                        compagni più grandi attraverso attività artistiche e la manipolazione analogica di colori e forme. 
                        Questo processo di rielaborazione ha trasformato le immagini della città in opere inedite, 
                        fondendo l'osservazione realistica del territorio con la creatività dei più piccoli.
                    </p>
                </div>
            </section>
            <Carousel id="quarte_imgs" className="film_carousel" type="multi-folder" addingFullScreen={true}></Carousel>
        </div>
    )
}

export default Analogie