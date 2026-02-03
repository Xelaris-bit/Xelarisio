"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

type AnimatedCounterProps = {
  to: number;
  duration?: number;
};

const AnimatedCounter = ({ to, duration = 1.5 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      let start = 0;
      const end = to;
      const totalFrames = duration * 60; // 60 frames per second
      const increment = end / totalFrames;

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);

      return () => clearInterval(counter);
    }
  }, [inView, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export default AnimatedCounter;
