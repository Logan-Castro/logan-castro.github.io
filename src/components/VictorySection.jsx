import { useEffect, useMemo, useRef, useState } from "react";

export default function VictorySection({ title, paragraphs, renderParagraph }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    }, { threshold: 0.35 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const confettiPieces = useMemo(() => {
    const palette = [
      ["var(--accent)", "rgba(255, 186, 73, 0.82)"],
      ["var(--accent-2)", "rgba(0, 191, 165, 0.78)"],
      ["rgba(96, 188, 255, 0.85)", "rgba(173, 215, 255, 0.75)"],
      ["rgba(255, 102, 148, 0.8)", "rgba(255, 189, 105, 0.78)"]
    ];

    return Array.from({ length: 28 }).map((_, index) => {
      const [colorA, colorB] = palette[index % palette.length];
      return {
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 0.9,
        duration: 2.2 + Math.random() * 1.3,
        rotation: (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 60),
        colorA,
        colorB,
        scale: 0.8 + Math.random() * 0.6
      };
    });
  }, []);

  return (
    <section ref={sectionRef} className={`victory-section${isVisible ? " victory-section--visible" : ""}`}>
      <div className="victory-section__confetti" aria-hidden="true">
        {confettiPieces.map((piece, index) => (
          <span
            key={index}
            style={{
              left: piece.left,
              '--delay': `${piece.delay}s`,
              '--duration': `${piece.duration}s`,
              '--rotation': `${piece.rotation}deg`,
              '--confetti-color-a': piece.colorA,
              '--confetti-color-b': piece.colorB,
              '--confetti-scale': piece.scale
            }}
          />
        ))}
      </div>

      {title && <h2 className="victory-section__title">{title}</h2>}
      <div className="victory-section__body">
        {paragraphs?.map((paragraph, idx) => renderParagraph(paragraph, `victory-${idx}`))}
      </div>
    </section>
  );
}
