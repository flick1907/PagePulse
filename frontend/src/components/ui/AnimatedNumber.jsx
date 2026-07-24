import React, { useEffect, useState } from 'react';

export default function AnimatedNumber({ value, duration = 800 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }

    const startTime = performance.now();
    const startValue = 0;
    const endValue = value;

    let animFrameId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad formula
      const easeProgress = progress * (2 - progress);

      const currentVal = Math.round(startValue + (endValue - startValue) * easeProgress);
      setDisplayValue(currentVal);

      if (progress < 1) {
        animFrameId = requestAnimationFrame(animate);
      }
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [value, duration]);

  return <span>{typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}</span>;
}
