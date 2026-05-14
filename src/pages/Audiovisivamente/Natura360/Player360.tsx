import { useEffect, useRef, useState } from "react"

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'a-scene': any
            'a-videosphere': any
            'a-camera': any
        }
    }
}

const Player360 = ({ src, videoId, POSTER_SRC }: { src: string, videoId: string, POSTER_SRC: string }) => {
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

    useEffect(() => {
        const onFsChange = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener('fullscreenchange', onFsChange)
        return () => document.removeEventListener('fullscreenchange', onFsChange)
    }, [])

    const handlePlay = () => {
        videoRef.current?.play()
        setPlaying(true)
        setPaused(false)
    }

    const togglePause = () => {
        const video = videoRef.current
        if (!video) return
        if (video.paused) { video.play(); setPaused(false) }
        else { video.pause(); setPaused(true) }
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
            el.requestFullscreen().catch(() => {})
        } else {
            document.exitFullscreen()
        }
    }

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
                    <button className="player360__controls__btn player360__controls__fullscreen" onClick={toggleFullscreen} title={isFullscreen ? 'Esci dal fullscreen' : 'Fullscreen'}>
                        {isFullscreen ? '⊡' : '⛶'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Player360
