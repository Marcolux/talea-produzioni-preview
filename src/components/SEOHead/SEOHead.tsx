import { Helmet } from 'react-helmet-async'

const SITE_NAME    = 'Talea Produzioni'
const SITE_URL     = 'https://www.taleaproduzioni.it' // ← update when domain is live
const DEFAULT_IMG  = `${SITE_URL}/loghi/logo_talea-letter.png`

type Props = {
    title?: string          // page-specific portion, e.g. "Servizi"
    description?: string
    canonicalPath?: string  // e.g. "/servizi"
    ogImage?: string
    noIndex?: boolean
}

const SEOHead = ({
    title,
    description = 'Talea Produzioni: moltiplicazioni creative nella produzione e post-produzione audiovisiva e musicale. Raccontiamo storie attraverso linguaggi innovativi.',
    canonicalPath = '/',
    ogImage = DEFAULT_IMG,
    noIndex = false,
}: Props) => {

    const fullTitle  = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Produzione Audiovisiva e Musicale`
    const canonical  = `${SITE_URL}${canonicalPath}`

    return (
        <Helmet>
            {/* ── Core ─────────────────────────────────────── */}
            <html lang="it" />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            {noIndex && <meta name="robots" content="noindex, nofollow" />}

            {/* ── Open Graph ───────────────────────────────── */}
            <meta property="og:type"        content="website" />
            <meta property="og:site_name"   content={SITE_NAME} />
            <meta property="og:title"       content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url"         content={canonical} />
            <meta property="og:image"       content={ogImage} />
            <meta property="og:image:width"  content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale"      content="it_IT" />

            {/* ── Twitter / X Card ─────────────────────────── */}
            <meta name="twitter:card"        content="summary_large_image" />
            <meta name="twitter:title"       content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image"       content={ogImage} />
        </Helmet>
    )
}

export default SEOHead
