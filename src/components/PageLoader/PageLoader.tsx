import './PageLoader.scss'

const PageLoader = () => {
    return (
        <div className="page-loader">
            <img
                src={`${process.env.PUBLIC_URL}/loghi/logo_webHD_0005_orange_circle_just_logo.png`}
                alt="Talea Produzioni"
                className="page-loader__logo"
            />
        </div>
    )
}

export default PageLoader
