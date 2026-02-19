import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = (imageContainerRef, phraseRef) => {
  useEffect(() => {
    const imageElement = imageContainerRef.current;
    const phraseElement = phraseRef.current;
    if (!imageElement || !phraseElement) return;

    const isLargeScreen = window.innerWidth >= 990;
    if (!isLargeScreen) return;

    const trigger = gsap.timeline({
      scrollTrigger: {
        trigger: imageElement,
        start: "-=50",
        end: "+=250",
        scrub: true,
        pin: true,
      },
    });

    trigger.to(imageElement, { duration: 0.5, ease: "power3.inOut" });

    gsap.fromTo(
      phraseElement,
      { marginTop: 0 },
      {
        marginTop: "25vw",
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: phraseElement,
          scrub: 3,
        },
      }
    );

    return () => {
      trigger.kill();
      ScrollTrigger.killAll();
    };
  }, [imageContainerRef, phraseRef]);
};
