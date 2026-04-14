import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useMemo, useState } from "react";

export type GalleryImage = {
  /** Full-size image URL */
  src: string;
  /** Optional thumbnail URL (if omitted, src is used) */
  thumbSrc?: string;
  /** Optional alt/caption text */
  alt?: string;
}

type Props = {
  images: GalleryImage[];
  initialIndex?: number;
}

export default function GalleryLightbox({ images, initialIndex = 0 }: Props) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(() => clampIndex(initialIndex, images.length))

  const hasImages = images?.length > 0

  // Keep index valid if images array changes
  useEffect(() => {
    setIndex((i) => clampIndex(i, images.length))
  }, [images.length])

  const current = useMemo(() => {
    if (!hasImages) return null
    return images[index]
  }, [hasImages, images, index])

  const openAt = (i: number) => {
    setIndex(clampIndex(i, images.length))
    setOpen(true)
  }

  const close = () => setOpen(false)

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  // Keyboard navigation while open
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  if (!hasImages) return null;



  /* ---------- styles (inline so it’s plug-and-play) ---------- */
  const cols = 3; // match your CSS breakpoint plan
  const rows = Math.ceil(images.length / cols);
  
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`, // ✅ stretch rows
    gap: 12,
    height: "80%", // ✅ must have height
    minHeight: 0,
  };
  const thumbBtnStyle: React.CSSProperties = {
    border: "none",
    padding: 0,
    background: "transparent",
    cursor: "pointer",
    overflow: "hidden",
    height: "100%", // ✅ fill the grid cell
  };
  
  const thumbImgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%", // ✅ fill the grid cell
    objectFit: "cover",
    display: "block",
  };
  
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.78)",
    zIndex: 9998,
  }
  
  const contentStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    height: "100dvh",
    display: "flex",
    flexDirection: "column",
    padding: 16,
    outline: "none",
    zIndex: 999999,
  }
  
  const topBarStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 10px",
    color: "white",
  }
  
  const counterStyle: React.CSSProperties = {
    opacity: 0.75,
    fontSize: 13,
  }
  
  const mainStyle: React.CSSProperties = {
    flex: 1,
    minHeight: 0, // ✅ critical so children can shrink in flex layouts
    display: "grid",
    gridTemplateColumns: "60px 1fr 60px",
    alignItems: "center",
    gap: 10,
  }
  
  const imageWrapStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 0,
    height: "100%", // ✅
  }
  
  const bigImgStyle: React.CSSProperties = {
    maxWidth: "100%",
    maxHeight: "100%", // ✅ fits whatever height main area has
    width: "auto",
    height: "auto",
    objectFit: "contain",
    borderRadius: 0,
    userSelect: "none",
    display: "block",
  }
  
  const captionStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    padding: "10px 0 0",
    fontSize: 14,
  }
  
  const iconBtnStyle: React.CSSProperties = {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "white",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
  }
  
  const navBtnStyle: React.CSSProperties = {
    ...iconBtnStyle,
    fontSize: 34,
    lineHeight: "34px",
    padding: "10px 12px",
    justifySelf: "center",
  }

  return (
    <>
      {/* Thumbnails grid */}
      <div style={gridStyle}>
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            onClick={() => openAt(i)}
            style={thumbBtnStyle}
            aria-label={`Open image ${i + 1} of ${images.length}`}
            type="button"
          >
            <img
              src={img.thumbSrc ?? img.src}
              alt={img.alt ?? ""}
              style={thumbImgStyle}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* One modal instance */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay style={overlayStyle} />
          <Dialog.Content style={contentStyle} aria-label="Image viewer">
            {/* Top bar */}
            <div style={topBarStyle}>
              <div style={counterStyle}>
                {index + 1} / {images.length}
              </div>

              <Dialog.Close asChild>
                <button style={iconBtnStyle} aria-label="Close" type="button">
                  ✕
                </button>
              </Dialog.Close>
            </div>

            {/* Main area */}
            <div style={mainStyle}>
              <button onClick={prev} style={navBtnStyle} aria-label="Previous" type="button">
                ‹
              </button>

              <div style={imageWrapStyle}>
                {current && (
                  <img
                    src={current.src}
                    alt={current.alt ?? ""}
                    style={bigImgStyle}
                    draggable={false}
                  />
                )}
              </div>

              <button onClick={next} style={navBtnStyle} aria-label="Next" type="button">
                ›
              </button>
            </div>

            {/* Caption */}
            {current?.alt ? <div style={captionStyle}>{current.alt}</div> : <div style={{ height: 18 }} />}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
  
}

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  if (i < 0) return 0;
  if (i > len - 1) return len - 1;
  return i;
}

