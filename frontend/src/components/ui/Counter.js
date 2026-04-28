import React, { useEffect, useState } from "react";

const Counter = ({ value, duration = 1000, formatter = (input) => input }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrame;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayValue(Math.round(progress * Number(value || 0)));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return formatter(displayValue);
};

export default Counter;

