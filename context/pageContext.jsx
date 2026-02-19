"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

function SmoothScrolling({ children }) {
  const lenisRef = useRef();

  const update = useCallback((time) => {
    lenisRef.current?.lenis?.raf(time * 1000);
  }, []);

  useEffect(() => {
    const backToTop = document.querySelector(".svg");
    if (backToTop) {
      const handleBackToTop = () => {
        lenisRef.current?.lenis?.scrollTo("top", {
          duration: 4.5,
          easing: (t) =>
            t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        });
      };

      backToTop.addEventListener("click", handleBackToTop);
      return () => backToTop.removeEventListener("click", handleBackToTop);
    }
  }, []);

  useEffect(() => {
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [update]);

  return (
    <ReactLenis
      root
      options={{ lerp: 0.05, duration: 1.75, smoothTouch: true }}
      ref={lenisRef}
      autoRaf={false}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
