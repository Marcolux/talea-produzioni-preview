type ScrapbookImage = {
    src: string
    alt: string
    caption?: string
    rotation?: string
    tapeColor?: "pink" | "blue" | "yellow" | "green"
    sectionName: string
}

const PolaroidPic = ({image}: {image: ScrapbookImage}) => {
    const withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith("/") ? "" : "/"}${p}`
    
    return (
        <div
            className={`photoCard tape-${image.tapeColor || "pink"}`}
            style={{ rotate: image.rotation || "0deg" }}
        >
            <span className="photoTape photoTape--topLeft" />
            <span className="photoTape photoTape--topRight" />
            <img
                src={withPublicUrl(image.src)}
                alt={image.alt}
                className="scrapbookPhoto"
            />
            {image.caption && (
                <p className="photoCaption">{image.caption}</p>
            )}
        </div>
    )
}

export default PolaroidPic