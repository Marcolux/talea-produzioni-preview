import { Link } from "react-router-dom";
import './navigation-bar.scss'

const NavigationBar = () => {

    return (
        <div className="flex flex-alignItems-center flex-justifyContent-center navBar">
            <Link className="navLinks" to={'/'}><p>Home Page</p></Link>
            <Link className="navLinks" to={'/Carousels'}><p>Carousels</p></Link>
            <Link className="navLinks" to={'/page_2'}><p>Page 2</p></Link>
        </div>
    )
}

export default NavigationBar