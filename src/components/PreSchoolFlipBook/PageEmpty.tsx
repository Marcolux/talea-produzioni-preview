import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef } from "react"
const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith("/") ? "" : "/"}${p}`

const PageEmpty = forwardRef<HTMLDivElement, { visible?: boolean; section?: string }>(
    ({ visible = true, section }, ref) => {
        return (
            <div
                ref={ref}
                className={`scrapbookPage${section ? ` pageEmpty--${section}` : ""}`}
                style={visible ? undefined : { visibility: "hidden" }}
            >
                <div className="scrapbookPage__paper">
                    <div 
                        className="logo_wrapper flex col-12 flex-fillSpace flex-alignItems-center flex-justifyContent-center" 
                        style={{height: '100%'}}
                    >
                        <img
                            src={withPublicUrl('/loghi/avorio_caldo_trasparente (1).png')}
                            alt={'Audiovisivamente'}
                            className="scrapbookPhoto"
                            style={{maxWidth: '600px', height: 'auto', filter: 'drop-shadow(1px 4px 2px rgba(26, 26, 26, 0.335))'}}
                        />
                    </div>
                    <button className="flipHint scrolling _previous" aria-hidden="true" tabIndex={-1}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </div>
            </div>
        )
    }
)
export default PageEmpty