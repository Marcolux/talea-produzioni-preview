import { useLocation } from "react-router-dom";
import './navigation-bar.scss'
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
    const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith('/') ? '' : '/'}${p}`
    const [taleaAudio, setTaleaAudio]  = useState<'talea' | 'audiovisivamente'>('talea')
    const location = useLocation().pathname
    console.log(location)
    if (location.includes('audiovisivamente') && taleaAudio === 'talea') {
        setTaleaAudio('audiovisivamente')
    }


    return (
        <div className="flex flex-alignItems-center flex-justifyContent-center navBar" id={taleaAudio === 'talea' ? 'talea_navbar' : 'audiovisivamente_navbar'}>
            {
                taleaAudio === 'talea'
                ?
                <>
                    {/* Talea path */}
                    <div className="logoWrapper">
                        <NavLink className="navLinks" to={'/'}>
                            <img 
                                src={withPublicUrl('/loghi/logo_talea-letter.png')}
                                alt='Talea'
                                className="taleaLogo_nav"
                            />
                        </NavLink>
                    </div>
                    <div className="mainLinksWrapper flex flex-justifyContent-center flex-alignItems-center">
                        <NavLink className="navLinks" to={'/servizi'}><p>Servizi</p></NavLink>
                        <NavLink className="navLinks" to={'/talea-lab'}><p>Talea Lab</p></NavLink>
                        <NavLink className="navLinks" to={'/contatti'}><p>Contatti</p></NavLink>
                    </div>
                    <div 
                        className="logoWrapper" 
                        onClick={() => {
                            setTaleaAudio('audiovisivamente')
                        }}
                    >
                        {/* <NavLink className="navLinks" to={'/audiovisivamente'}><p>Audiovisivamente</p></NavLink> */}
                        <NavLink className="navLinks flex flex-column flex-justifyContent-center flex-alignItems-center" to={'/audiovisivamente'}>
                            <img 
                                src={withPublicUrl('/loghi/AVM_orange.png')}
                                alt='Audiovisivamente'
                            />
                            <p className="font-journal fontSize20">Audiovisivamente</p>
                        </NavLink>
                    </div>
                
                </>
                :
                <>
                    {/* Audiovisivamente Path */}

                    <NavLink className="navLinks logoWrapper logo_link_audiovi logoNav" to={'/audiovisivamente'} end>
                        <img 
                            src={withPublicUrl('/loghi/Verde_oliva_tenue_trasparente.png')}
                            alt='Talea'
                        />
                        {/* <p className="font-journal fontSize20">Audiovisivamente</p> */}
                    </NavLink>

                    <div className="mainLinksWrapper flex flex-justifyContent-center flex-alignItems-center">
                        <NavLink className={`navLinks`} to={"/audiovisivamente/analogie"}>Analogie</NavLink>
                        <NavLink className={`navLinks`} to={"/audiovisivamente/evoluzione"}>Evoluzioni</NavLink>
                        <NavLink className={`navLinks`} to={"/audiovisivamente/cineocchio"}>Cineocchio</NavLink>
                        <NavLink className={`navLinks`} to={"/audiovisivamente/distopie"}>Distopie</NavLink>
                        <NavLink className={`navLinks`} to={"/audiovisivamente/natura-360"}>360° Eco Virtual Tour</NavLink>
                    </div>

                    <NavLink className={`navLinks logoNav logoWrapper`} to={'/'} onClick={() => {setTaleaAudio('talea')}}>
                        <img 
                            className="taleaLogo_nav"
                            src={withPublicUrl('/loghi/talea_bk.png')}
                            alt='Talea'
                        />
                    </NavLink>
                </>
            }

        </div>
        // <Route path="/servizi" element={<Servizi/>} />
        // <Route path="/talea-hub" element={<TaleaHub/>} />
        // <Route path="/talea-lab" element={<TaleaLab/>} />
        // <Route path="/contatti" element={<Contatti/>} />
    )
}

export default NavigationBar