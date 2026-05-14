import PreschoolFlipBook from "../../../components/PreSchoolFlipBook/PreschoolFlipBook"
import "../../page.scss"
import "./homepage.scss"
import { collezione_immagini } from "./collezione_immagini"

const AudiovisivamenteHome = () => {
    return(
        <div className="page audiovisivamente__page" id="audiovisivamente__home" lang="it">
            <section className="heroAudio flex-column">
                <PreschoolFlipBook images={collezione_immagini} />
            </section>
        </div>
    )
}

export default AudiovisivamenteHome