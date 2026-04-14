import { useInView } from "react-intersection-observer"
import "../../page.scss"


const Cineocchio = () => {
    const [heroTextRef, inViewHeroText] = useInView({ threshold: .1, triggerOnce: false })
    const [heroDescrRef, inViewHeroDescr] = useInView({ threshold: .1, triggerOnce: false })

    return(
        <div className="page audiovisivamente__page" id="audiovisivamente__cineocchio">
            <section className="heroAudio">
                <h1 ref={heroTextRef} className={`heroTitle ${inViewHeroText ? "inView" : ""} `} >Cineocchio</h1>
                <div ref={heroDescrRef} className={`${inViewHeroDescr ? "inView" : "" } hero_desc_wrapper`}>
                    <p className="col-12" lang="it">
                        Anche al di là dei  banchi di scuola: le classi quinte dell’IC Japigia I Verga sono scese in strada con telecamere, microfoni e una missione speciale! I ragazzi si sono trasformati in una vera troupe cinematografica per creare una mappatura audiovisiva del quartiere Japigia. 
                        Volti, storie, suoni e angoli segreti: tutto finirà in un documentario partecipato unico nel suo genere, nato per stringere un legame ancora più forte tra la scuola, i cittadini e il territorio.
                    </p>
                    <p className="col-12" lang="it">
                        Il set itinerante ha toccato tappe incredibili:
                    </p>
                    <p className="col-12" lang="it">
                        Missione Green all’Orto Gentile: Tra un seme e un raccolto, 
                        i nostri piccoli reporter hanno scoperto il cuore verde di Bari, 
                        esplorando la magia degli orti urbani e la bellezza del coltivare insieme.
                    </p>
                    <p className="col-12" lang="it"> 
                        "Mini-Assessori" in Regione: Dalle aule scolastiche alla Sala Consiliare! 
                        I bambini hanno preso d'assalto la Regione Puglia per capire come nascono le leggi. 
                        Non sono mancate le grandi interviste: un faccia a faccia con il Presidente del Consiglio Regionale Toni Matarrelli e il Segretario Generale Mimma Gattulli. 
                        Chi ha detto che la politica è una cosa "da grandi"?
                    </p>
                    <p className="col-12" lang="it"> 
                        Futuro in corso al Parco della Rinascita: 
                        Occhi puntati sulla trasformazione della città! La troupe ha esplorato l’area dell’Ex Fibronit, 
                        dove il cemento sta lasciando il posto al verde. 
                        Qui hanno intervistato la Vicesindaca Giovanna Iacovone e l'Assessora Elda Perlino, scoprendo come nasce un parco che profuma di futuro.
                    </p>
                </div>
            </section>

        </div>
    )
}

export default Cineocchio