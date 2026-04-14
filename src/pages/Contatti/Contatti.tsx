import { useEffect, useRef, useState } from "react"
import Dropdown from "../../components/DropdownSelect/DropdownSelect"
import emailjs from "@emailjs/browser"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import "../page.scss"
import "./contatti.scss"

emailjs.init("o69p_GM3kd5oX3hnI")

const Contatti = () => {
    const nameRef = useRef<HTMLInputElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const honeypotRef = useRef<HTMLInputElement | null>(null)

    const [name, setName] = useState("")
    const [subject, setSubject] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [sent, setSent] = useState(false)
    const [showErrors, setShowErrors] = useState(false)

    const maxMessageLength = 600

    // Auto-focus first name on mount
    useEffect(() => { nameRef.current?.focus() }, [])

    // Auto-hide success message after a few seconds
    useEffect(() => {
        if (!sent) return
        const t = setTimeout(() => setSent(false), 3000)
        return () => clearTimeout(t)
    }, [sent])

    const isEmailValid = email.trim().length > 0 && /\S+@\S+\.\S+/.test(email)

    const isFormValid = Boolean(
        name.trim() &&
        subject.trim() &&
        message.trim() &&
        isEmailValid
    )

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Honeypot check
        if (honeypotRef.current?.value) {
            console.warn("Bot detected")
            return
        }

        if (!isFormValid || isSubmitting) {
            setShowErrors(true)  
            // Scroll to form if invalid to help the user
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
            return
        }

        try {
            setIsSubmitting(true)
            const templateParams = {
                form_name: name,
                email_address: email,
                project_type: subject,
                message: message
            }
            
            await emailjs.send(
                "service_x0umwzb",
                "template_1viir1c",
                templateParams
            )

            setSent(true)

            // Reset fields
            setName("")
            setSubject("")
            setEmail("")
            setMessage("")
            setShowErrors(false)
            nameRef.current?.focus()

        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="page" id="ContactPage">
            <h1 className="page_sub-headers-vr">Scrivici per informazioni sui nostri servizi. </h1>

            <p className="page_paragraphText col-9 text-center fontSize20">
                Pronti a dare vita alla tua visione? Raccontaci qualcosa sul tuo progetto e iniziamo a creare insieme qualcosa di indimenticabile.
            </p>

            <form
                id="contactForm"
                ref={formRef}
                method="post"
                className="col-12 flex flex-column flex-justifyContent-center mt-35"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="flex flex-alignItems-center oneRow">

                    <div className="hp-wrap hide" aria-hidden="true">
                        <label htmlFor="company">Co</label>
                        <input
                            ref={honeypotRef}
                            type="text"
                            id="company"
                            name="company"
                            autoComplete="off"
                            tabIndex={-1}
                        />
                    </div>

                    {/* Name */}
                    <div className="field flex flex-column col-12">
                        <div className="flex flex-column col-12">
                            <label htmlFor="form_name" className="mb-5">
                                Nome:
                            </label>
                            <input
                                placeholder="Nome Completo"
                                ref={nameRef}
                                className={`inputText ${showErrors && name === '' ? "inputError" : ""}`}
                                type="text"
                                id="form_name"
                                name="form_name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-12 errorTextDiv">
                            {showErrors && !name && (
                                <small className="errorText fontSize15">
                                    Inserisci un nome.
                                </small>
                            )}
                        </div>
                    </div>

                    {/* Email Address */}

                    <div className="field flex flex-column col-12">
                        <div className="flex flex-column col-12">
                            <label htmlFor="email_address" className="mb-5">
                                Email:
                            </label>
                            <input
                                placeholder="you@youremail.com"
                                className={`inputText ${ showErrors && !isEmailValid ? "inputError" : "" }`}
                                type="email"
                                id="email_address"
                                name="email_address"
                                onChange={(e) => setEmail(e.target.value)}
                                title="Inserisci un indirizzo email valido"
                                value={email}
                                required
                            />
                        </div>
                        <div className="col-12 errorTextDiv">
                            {showErrors && !isEmailValid && (
                                <small className="errorText fontSize15">
                                    Inserisci un indirizzo email valido.
                                </small>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-alignItems-center oneRow col-12">
                    <div className="field flex flex-column col-6">
                        {/* Servizio:*/}
                        <Dropdown
                            classNameButton={`inputText ${showErrors && !subject ? "inputError" : ""}`}
                            classNameWrapper={`${showErrors && !subject ? "fieldError" : ""}`}
                            id="project_type"
                            customIcon={<FontAwesomeIcon icon={faAngleDown} />}
                            label="Servizio:"
                            name="project_type"
                            onChange={(value) => setSubject(value)}
                            placeholder="Seleziona un Servizio"
                            value={subject}
                            options={[
                                { value: "Audio mix e post-produzione", label: "Audio mix e post-produzione" },
                                { value: "Montaggio e post-produzione", label: "Montaggio e post-produzione" },
                                { value: "Composizione di colonne sonore", label: "Composizione di colonne sonore" },
                                { value: "Scrittura e sviluppo creativo", label: "Scrittura e sviluppo creativo" },
                                { value: "Podcast", label: "Podcast" },
                                { value: "Noleggio drone con operatore", label: "Noleggio drone con operatore" },
                            ]}
                        />
                        <div className="col-12 errorTextDiv">
                            {showErrors && !subject && (
                                <small className="errorText fontSize15">
                                    Seleziona un Servizio.
                                </small>
                            )}
                        </div>
                    </div>

                </div>


                {/* Messaggio */}
                <div className="flex flex-column">
                    <label htmlFor="message" className="mb-5">
                        Messaggio:
                    </label>
                    <textarea
                        rows={5}
                        className={`inputText p-5 ${ showErrors && !message ? "inputError" : "" }`}
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value.slice(0, maxMessageLength)) }
                        required
                    />
                    <div className="flex flex-column-md-down flex-alignItems-start-md-down flex-alignItems-center flex-justifyContent-spaceBetween">
                        <div className="flex flex-justifyContent-spaceBetween mt-5">
                            <small> {message.length}/{maxMessageLength} characters </small>
                        </div>

                        <div>
                            {showErrors && !message && (
                                <small className="errorText fontSize15">
                                    Scrivi un messaggio prima di inviare.
                                </small>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit + Status */}
                <div className="field flex flex-column flex-justifyContent-center flex-alignItems-center">
                    <button
                        type="submit"
                        className="primary_btn py-10"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Invio in Corso..." : "Invia Messaggio"}
                    </button>

                    <p
                        id="messageSent"
                        className={`fontSize16 my-0 messageSent ${ sent ? "show" : "hide" }`}
                        role="status"
                        aria-live="polite"
                    >
                        Message Inviato! Grazie!
                    </p>
                </div>
                <div className="col-12 flex flex-justifyContent-center">
                    <p>Ci faremo sentire in un paio di giorni!</p>
                </div>
            </form>
        </div>
    )
}

export default Contatti