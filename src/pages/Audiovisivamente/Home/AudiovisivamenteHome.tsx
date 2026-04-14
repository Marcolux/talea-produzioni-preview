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


            {/* <section className="section top">
                <div className="content">
                <h2>Top Content</h2>
                </div>
            </section>

            <div className="image-gap" />

            <section className="section bottom">
                <div className="content">
                <h2>Bottom Content</h2>
                </div>
            </section> */}
        </div>
    )
}

export default AudiovisivamenteHome