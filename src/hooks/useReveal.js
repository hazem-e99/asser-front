import { useState, useEffect, useRef } from "react";

export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "50px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}
