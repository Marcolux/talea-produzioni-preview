import { useInView } from "react-intersection-observer"
import "../../page.scss"
import { useEffect, useRef } from "react"
import { sharedLogic } from "../../../general_services/shared_logic"
import './cineocchio.scss'


const Cineocchio = () => {
    const [heroTextRef, inViewHeroText] = useInView({ threshold: .1, triggerOnce: true })
    const [heroDescrRef, inViewHeroDescr] = useInView({ threshold: .1, triggerOnce: true })

    const videoCortoRef = useRef<HTMLVideoElement>(null)
    const POSTER_CORTO = sharedLogic.withPublicUrl('/immagini-pagine/audiovisivamente/distopie/cortometraggio-lenoci/distopie-poster.jpg') as string

    useEffect(() => {
        const video = videoCortoRef.current
        if (!video) return
        const onPlay = () => {
            if (!('mediaSession' in navigator)) return
            navigator.mediaSession.metadata = new MediaMetadata({
                title: 'Cineocchio — Cortometraggio',
                artist: 'Talea Produzioni',
                artwork: [{ src: POSTER_CORTO, sizes: '512x512', type: 'image/jpeg' }],
            })
        }
        video.addEventListener('play', onPlay)
        return () => video.removeEventListener('play', onPlay)
    }, [])

    return(
        <div className="page audiovisivamente__page" id="audiovisivamente__cineocchio">
            <section className="heroAudio">
                <h1 ref={heroTextRef} className={`heroTitle ${inViewHeroText ? "inView" : ""} `} >Cineocchio</h1>
                <div ref={heroDescrRef} className={`${inViewHeroDescr ? "inView" : "" } hero_desc_wrapper`}>
                    <p className="col-12" lang="it">
                        Anche al di là dei  banchi di scuola: le classi quinte dell’IC Japigia I Verga sono scese in strada con telecamere, 
                        microfoni e una missione speciale! I ragazzi si sono trasformati in una vera troupe cinematografica per creare una mappatura audiovisiva del quartiere Japigia. 
                        Volti, storie, suoni e angoli segreti confluiscono in un documentario partecipato unico nel suo genere, 
                        nato per stringere un legame ancora più forte tra la scuola, i cittadini e il territorio.
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
                        Qui hanno  l'Assessora al Clima, alla Transizione Ecologica e all'Ambiente Elda Perlino e Vincenzo Brescia, 
                        "Presidente del comitato Cittadini Fibronit, 
                        scoprendo come nasce un parco che profuma di futuro.
                    </p>
                </div>
                
                <video
                    ref={videoCortoRef}
                    playsInline
                    webkit-playsinline
                    controls
                    preload="metadata"
                    poster={POSTER_CORTO}
                    crossOrigin="anonymous"
                    id="videoCorto_cineocchio"
                >
                    <source src="https://pub-3e8f1f8594254c93a49fb4e5bef03ab0.r2.dev/MASTER_70126_ILCINEOCCHO.mp4" type="video/mp4"/>
                </video>
            </section>

        </div>
    )
}

export default Cineocchio

function withPublicUrl(arg0: string) {
    throw new Error("Function not implemented.")
}
