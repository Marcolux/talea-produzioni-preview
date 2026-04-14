import React, { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import styles from "./ServicesScrollDeck.module.scss";

export type Service = {
  title: string;
  image: string; // URL or import
};

type Props = {
  services: Service[];
};

export default function ServicesScrollDeck({ services }: Props) {
  const wrapRef = useRef<HTMLElement | null>(null);

  const pages = services.length;
  const wrapperHeightVh = pages * 110;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const idx = useTransform(p, [0, 1], [0, pages - 1]);

  const cards = useMemo(
    () => services.map((s, i) => ({ ...s, i })),
    [services]
  );

  return (
    <section
      ref={wrapRef as unknown as React.RefObject<HTMLElement>}
      className={styles.wrap}
      style={{ height: `${wrapperHeightVh}vh` }}
    >
      <div className={styles.sticky}>
        <div className={styles.vignette} />
        <div className={styles.grain} />

        <div className={styles.dots}>
          {services.map((_, i) => (
            <Dot key={i} i={i} idx={idx} />
          ))}
        </div>

        <div className={styles.deck}>
          {cards.map((card) => (
            <DeckCard key={`${card.title}-${card.i}`} card={card} idx={idx} total={pages} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Dot({ i, idx }: { i: number; idx: MotionValue<number> }) {
  const opacity = useTransform(idx, [i - 0.6, i, i + 0.6], [0.25, 1, 0.25]);
  const scale = useTransform(idx, [i - 0.6, i, i + 0.6], [1, 1.6, 1]);

  return <motion.div className={styles.dot} style={{ opacity, scale }} />;
}

function DeckCard({
  card,
  idx,
  total,
}: {
  card: Service & { i: number };
  idx: MotionValue<number>;
  total: number;
}) {
  const i = card.i;

  const dist = useTransform(idx, (v) => v - i);

  const scale = useTransform(dist, [-1.5, 0, 1.5], [0.92, 1, 0.88]);
  const y = useTransform(dist, [-1.5, 0, 1.5], [40, 0, -30]);
  const opacity = useTransform(dist, [-2, -0.4, 0, 0.6, 2], [0, 0.55, 1, 0.25, 0]);
  const blur = useTransform(dist, [-1.5, 0, 1.5], [10, 0, 14]);
  const zIndex = useTransform(dist, (d) => Math.round(1000 - Math.abs(d) * 100));

  const titleY = useTransform(dist, [-0.4, 0, 0.4], [18, 0, -12]);
  const titleOpacity = useTransform(dist, [-0.6, 0, 0.6], [0, 1, 0]);

  
  return (
    <motion.div className={styles.card} style={{ opacity, scale, y, zIndex }}>
      <motion.img
        className={styles.img}
        src={card.image}
        alt={card.title}
        style={{ filter: useTransform(blur, (b) => `blur(${b}px)`) }}
      />
      <div className={styles.overlay} />

      <motion.div className={styles.titleBlock} style={{ opacity: titleOpacity, y: titleY }}>
        <div className={styles.kicker}>
          SERVICE {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div className={styles.title}>{card.title}</div>
      </motion.div>
    </motion.div>
  );
}
