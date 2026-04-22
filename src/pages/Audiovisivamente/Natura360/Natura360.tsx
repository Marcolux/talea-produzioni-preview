import { useInView } from "react-intersection-observer"
import { useEffect, useRef, useState } from "react"
import "../../page.scss"
import "./natura360.scss"

const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith("/") ? "" : "/"}${p}`
const VIDEO_SRC_1 = 'https://res.cloudinary.com/drdrs6pdq/video/upload/v1776826474/Talea/VID_20260303_104052_00_037_sjtwjy.mp4'
const VIDEO_SRC_2 = 'https://res.cloudinary.com/drdrs6pdq/video/upload/v1776138605/Audiovisivamente/Clip_2_-_video_360_oay93b.mp4'
const POSTER_SRC  = withPublicUrl('/immagini-pagine/audiovisivamente/natura360/poster.jpg')

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'a-scene':     any
            'a-videosphere': any
            'a-camera':    any
        }
    }
}
let playerCount = 0
const Player360 = ({ src }: { src: string }) => {
    const [videoId] = useState(() => `video360_${++playerCount}`)
    const [playing, setPlaying] = useState(false)
    const [paused, setPaused]   = useState(false)
    const [progress, setProgress] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        require('aframe')
    }, [])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        const onTimeUpdate = () => setProgress(video.currentTime / video.duration * 100)
        video.addEventListener('timeupdate', onTimeUpdate)
        return () => video.removeEventListener('timeupdate', onTimeUpdate)
    }, [playing])

    const handlePlay = () => {
        videoRef.current?.play()
        setPlaying(true)
        setPaused(false)
    }

    const togglePause = () => {
        const video = videoRef.current
        if (!video) return
        if (video.paused) { video.play(); setPaused(false) }
        else              { video.pause(); setPaused(true) }
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current
        if (!video) return
        video.currentTime = (Number(e.target.value) / 100) * video.duration
    }

    const toggleFullscreen = () => {
        const el = containerRef.current
        if (!el) return
        if (!document.fullscreenElement) {
            el.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    useEffect(() => {
        const onFsChange = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener('fullscreenchange', onFsChange)
        return () => document.removeEventListener('fullscreenchange', onFsChange)
    }, [])

    return (
        <div className="player360" ref={containerRef}>
            <video
                ref={videoRef}
                id={videoId}
                src={src}
                poster={POSTER_SRC}
                preload="none"
                crossOrigin="anonymous"
                // loop
                style={{ display: 'none' }}
            />

            {!playing && (
                <button
                    className="player360__playBtn"
                    onClick={handlePlay}
                    style={{ backgroundImage: `url(${POSTER_SRC})` }}
                >
                    <span className="player360__playIcon">▶</span>
                    <span className="player360__playLabel">Guarda il Virtual Tour 360° Possiamo metter cio' che vogliamo</span>
                </button>
            )}

            {playing && (
                <a-scene embedded vr-mode-ui="enabled: true" className="player360__scene">
                    <a-videosphere src={`#${videoId}`} rotation="0 -90 0" />
                    <a-camera look-controls="reverseMouseDrag: false" />
                </a-scene>
            )}

            {playing && (
                <div className="player360__controls">
                    <button className="player360__controls__btn" onClick={togglePause}>
                        {paused ? '▶' : '⏸'}
                    </button>
                    <input
                        className="player360__controls__seek"
                        type="range"
                        min={0} max={100}
                        value={progress}
                        onChange={handleSeek}
                    />
                </div>
            )}
        </div>
    )
}

const Natura360 = () => {
    const [heroTextRef, inViewHeroText] = useInView({ threshold: .1, triggerOnce: false })
    const [heroDescrRef, inViewHeroDescr] = useInView({ threshold: .1, triggerOnce: false })

    return (
        <div className="page audiovisivamente__page" id="audiovisivamente__eco_virtual_tour">
            <section className="heroAudio">
                <h1 ref={heroTextRef} className={`heroTitle ${inViewHeroText ? "inView" : ""}`}>360° Eco Virtual Tour</h1>
                <div ref={heroDescrRef} className={`${inViewHeroDescr ? "inView" : ""} hero_desc_wrapper`}>
                    <p className="col-12" lang="it">
                        Cosa succede quando l'esplorazione della natura incontra la tecnologia più avanzata?
                        Zaino in spalla e visori pronti, per le studentesse e gli studenti della scuola secondaria di I grado
                        dell'IC Japigia I Verga la missione è iniziata nel cuore di una riserva naturale.
                    </p>
                    <p className="col-12" lang="it">
                        Accompagnati dalle guide esperte di Pugliarte, i ragazzi hanno esplorato sentieri e biodiversità, ma non si sono limitati a guardare.
                        Supportati dai professionisti dell'Associazione Talea, hanno letteralmente "catturato" l'ambiente circostante utilizzando la tecnologia audiovisiva a 360°.
                        Non una semplice foto, ma un'immersione totale tra suoni e immagini della natura!
                    </p>
                </div>
            </section>
            <section className="natura360__player">
                <p className="natura360__label">Versione Nuova con Audio</p>
                <Player360 src={VIDEO_SRC_1} />
            </section>
            <section className="natura360__player">
                <p className="natura360__label">Versione Senza Audio</p>
                <Player360 src={VIDEO_SRC_2} />
            </section>
            <section className="natura360__player">
                <p className="natura360__label">Versione YouTube</p>
                <iframe
                    className="natura360__youtube"
                    src="https://www.youtube.com/embed/7o52k3npQpw?enablejsapi=1&webxr=1"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; xr-spatial-tracking"
                    allowFullScreen
                    title="360° Eco Virtual Tour — YouTube"
                />
            </section>
        </div>
    )
}

export default Natura360
