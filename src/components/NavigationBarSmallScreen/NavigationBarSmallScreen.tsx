import { Link } from "react-router-dom";
import './navigation-bar-small-screen.scss'
import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";

const NavigationBarSmallScreen = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const toggleLogic = () => {
        setIsExpanded(prevState => !prevState)
    }
    const transitions = useTransition(isExpanded, {
        from: { opacity: 0, height: '0%', width: '0%' },
        enter: { opacity: 1, height: '100%', width: '100%' },
        leave: { opacity: 0, height: '0%', width: '0%' },
        config: { duration: 200 },
    })

    return (
        <>
            <div className='hambContainer' onClick={toggleLogic}>
                <div className={isExpanded  ? 'hamburger-menu openHam':'hamburger-menu'}>
                    <div className="bar" id="bar1"></div>
                    <div className="bar" id="bar2"></div>
                    <div className="bar" id="bar3"></div>
                </div>
            </div>
            
            {transitions((style, item) =>
                item ? (
                    <animated.div style={style} id="smallScreenMenu">
                        <div className='navBarSm'>
                            <Link className="navLinks" onClick={toggleLogic} to={'/'}><p>Home Page</p></Link>
                            <Link className="navLinks" onClick={toggleLogic} to={'/Carousels'}><p>Carousels</p></Link>
                            <Link className="navLinks" onClick={toggleLogic} to={'/page_2'}><p>Page 2</p></Link>
                        </div>
                    </animated.div>
                ) : null
            )}
            
        </>
    )
}

export default NavigationBarSmallScreen