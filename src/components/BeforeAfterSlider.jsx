import { useId, useMemo, useState } from "react";

export default function BeforeAfterSlider({ beforeSrc, beforeAlt, beforeLabel, afterSrc, afterAlt, afterLabel }) {
  const [position, setPosition] = useState(50);
  const sliderId = useId();
  const clipStyle = useMemo(() => {
    const inset = `inset(0 ${100 - position}% 0 0)`;
    return { clipPath: inset, WebkitClipPath: inset };
  }, [position]);

  const handleChange = event => {
    setPosition(Number(event.target.value));
  };

  return (
    <div className="before-after" aria-labelledby={`${sliderId}-label`}>
      <div className="before-after__image before-after__image--after">
        <img src={afterSrc} alt={afterAlt ?? afterLabel ?? "Comparison image after the fire."} loading="lazy" />
      </div>

      <div className="before-after__image before-after__image--before" style={clipStyle}>
        <img src={beforeSrc} alt={beforeAlt ?? beforeLabel ?? "Comparison image before the fire."} loading="lazy" />
      </div>

      <div className="before-after__label before-after__label--before">{beforeLabel}</div>
      <div className="before-after__label before-after__label--after">{afterLabel}</div>

      <label id={`${sliderId}-label`} className="sr-only">
        Move slider left or right to reveal the before and after imagery
      </label>
      <input
        id={sliderId}
        className="before-after__slider"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={handleChange}
        aria-labelledby={`${sliderId}-label`}
      />
    </div>
  );
}
