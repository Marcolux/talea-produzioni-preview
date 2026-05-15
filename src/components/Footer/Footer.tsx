import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import './footer.scss'

const Footer = () => {
    const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith('/') ? '' : '/'}${p}`
    const page = useLocation().pathname
    const pageDark = page === '/'
    const noSplatter = page !== '/'
    const audiovisivamente = page.includes('audiovisivamente')
    return (
        <div className={pageDark ? 'footer darkFt' : 'footer'}>
            <img
                id='footer_splatter'
                src={withPublicUrl('/varie/footer-splatter.png')}
                alt='Footer Talea Splash'
                className={noSplatter ? 'hide' : ''}
            />
            <div id='footerContentWrapper' className={audiovisivamente ? 'footer_aud' : ''}>
                <div className="logoWrapper">
                    {
                        audiovisivamente
                        ?
                        <img
                            id='logoFooter'
                            src={withPublicUrl('/loghi/logo_webHD_0006_black_just_logo.png')}
                            alt='Talea Non Circolare'
                        />
                        :
                        <img
                            id='logoFooter'
                            src={withPublicUrl('/loghi/logo_webHD_0005_orange_circle_just_logo 1.png')}
                            alt='Talea Non Circolare'
                        />
                    }
                </div>
                <div id="footer_text_wrapper">
                    <p className='my-0 footer-brand-name'>TALEA</p>
                    <div className='flex flex-column my-15'>
                        <p className="my-0">Via S. Hahnemann – n° 2 A/5 , 70126 – BARI (BA) ITALY / P.I. 08399410722</p>
                        <p className="my-0">info@taleaproduzioni.it +39.3287597221 / +39.3495636427</p>
                    </div>
                    <div className='flex flex-column' id='seguici_wrapper'>
                        <p className="my-0">Seguici</p>
                        <div className="mt-15" id='footer_links'>
                            <a href="https://www.facebook.com/taleaproduzioni" target="_blank" rel="noreferrer" className="social_icon_wrap" aria-label="Facebook">
                                <FontAwesomeIcon icon={faFacebookF as any} />
                            </a>
                            <a href="https://www.instagram.com/taleaproduzioni" target="_blank" rel="noreferrer" className="social_icon_wrap" aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagram as any} />
                            </a>
                            <a href="https://www.youtube.com/@taleaproduzioni" target="_blank" rel="noreferrer" className="social_icon_wrap" aria-label="YouTube">
                                <FontAwesomeIcon icon={faYoutube as any} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <p id="footer_credits">Sito creato da <a href="https://blackdahliacreative.com/" target="_blank" rel="noreferrer">Black Dahlia Creative</a></p>
        </div>
    )
}

export default Footer
