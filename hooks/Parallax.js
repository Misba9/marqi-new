import { useEffect } from "react";
import { gsap } from "gsap";

const useParallax = (minusMultiplier, plusMultiplier) => {
  useEffect(() => {
    const handleParallax = () => {
      const scrollY = window.scrollY;
      // Check if elements exist before applying gsap
      const parallaxImages = document.querySelectorAll(".parallax-minus");
      const parallaxTexts = document.querySelectorAll(".parallax-plus");

      if (parallaxImages.length > 0) {
        gsap.to(parallaxImages, {
          y: -scrollY * minusMultiplier,
          ease: "power1.out",
        });
      }

      if (parallaxTexts.length > 0) {
        gsap.to(parallaxTexts, {
          y: scrollY * plusMultiplier,
          ease: "power1.out",
        });
      }
    };

    window.addEventListener("scroll", handleParallax);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleParallax);
    };
  }, [minusMultiplier, plusMultiplier]);
};

export default useParallax;
