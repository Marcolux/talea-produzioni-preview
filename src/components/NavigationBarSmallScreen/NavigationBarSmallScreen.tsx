import { NavLink, useLocation } from "react-router-dom";
import './navigation-bar-small-screen.scss'
import { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";

const NavigationBarSmallScreen = () => {
    const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith('/') ? '' : '/'}${p}`
    const [isExpanded, setIsExpanded] = useState(false)
    const [taleaAudio, setTaleaAudio] = useState<'talea' | 'audiovisivamente'>('talea')
    
    const { pathname } = useLocation()

    useEffect(() => {
        if (pathname.includes('audiovisivamente')) {
            setTaleaAudio('audiovisivamente')
        } else {
            setTaleaAudio('talea')
        }
    }, [pathname])

    const toggleLogic = () => setIsExpanded(prev => !prev)
    const closeMenu = () => setIsExpanded(false)

    const transitions = useTransition(isExpanded, {
        from: { opacity: 0, height: '0dvh', width: '0vw' },
        enter: { opacity: 1, height: '100dvh', width: '100vw' },
        leave: { opacity: 0, height: '0dvh', width: '0vw' },
        config: { duration: 200 },
    })

    return (
        <div 
            id="smallScreenWrapper" 
            className={taleaAudio === 'audiovisivamente' ? 'audiovisivamenteNav' : ''}
        >
            <button
                className={isExpanded ? 'hambContainer open' : 'hambContainer'}
                onClick={toggleLogic}
                aria-label={isExpanded ? 'Chiudi menu' : 'Apri menu'}
                aria-expanded={isExpanded}
            >
                <div className={isExpanded ? 'hamburger-menu openHam' : 'hamburger-menu'}>
                    <div className="bar" id="bar1"></div>
                    <div className="bar" id="bar2"></div>
                    <div className="bar" id="bar3"></div>
                </div>
            </button>

            {transitions((style, condition) =>
                condition ? (
                    <animated.div style={style} id="smallScreenMenu">
                        <div className='navBarSm'>
                            {taleaAudio === 'talea' ? (
                                <>
                                    <NavLink className="navLinksSmScreen logoNav" to={'/'} end onClick={closeMenu}>
                                        <img src={withPublicUrl('/loghi/logo_talea-letter.png')} alt='Talea' />
                                    </NavLink>
                                    <NavLink className="navLinksSmScreen" to={'/servizi'} onClick={closeMenu}>
                                        <p>Servizi</p>
                                    </NavLink>
                                    <NavLink className="navLinksSmScreen" to={'/talea-lab'} onClick={closeMenu}>
                                        <p>Talea Lab</p>
                                    </NavLink>
                                    <NavLink className="navLinksSmScreen" to={'/contatti'} onClick={closeMenu}>
                                        <p>Contatti</p>
                                    </NavLink>
                                    {/* <NavLink className="navLinksSmScreen audioviLogoNav" to={'/audiovisivamente'} onClick={closeMenu}>
                                        <img src={withPublicUrl('/loghi/AVM_orange.png')} alt='Audiovisivamente' />
                                    </NavLink> */}
                                </>
                            ) : (
                                <>
                                    <NavLink className="navLinksSmScreen logoNav" to={'/audiovisivamente'} end onClick={closeMenu}>
                                        <img src={withPublicUrl('/loghi/Verde_oliva_tenue_trasparente.png')} alt='Audiovisivamente' />
                                    </NavLink>
                                    <NavLink className="navLinksSmScreen" to={"/audiovisivamente/analogie"} onClick={closeMenu}>
                                        Analogie
                                    </NavLink>
                                    <NavLink className="navLinksSmScreen" to={"/audiovisivamente/evoluzione"} onClick={closeMenu}>
                                        Evoluzioni
                                    </NavLink>
                                    <NavLink className="navLinksSmScreen" to={"/audiovisivamente/cineocchio"} onClick={closeMenu}>
                                        Cineocchio
                                    </NavLink>
                                    <NavLink className="navLinksSmScreen" to={"/audiovisivamente/distopie"} onClick={closeMenu}>
                                        Distopie
                                    </NavLink>
                                    <NavLink className="navLinksSmScreen" to={"/audiovisivamente/natura-360"} onClick={closeMenu}>
                                        360° Eco Virtual Tour
                                    </NavLink>
                                    <NavLink 
                                        className="navLinksSmScreen" 
                                        to={'/'} 
                                        onClick={() => { setTaleaAudio('talea'); closeMenu(); }}
                                    >
                                        ← Torna a Talea
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </animated.div>
                ) : null
            )}
        </div>
    )
}

export default NavigationBarSmallScreen