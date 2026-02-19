import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const TextLineAnimation = ({ text, className }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const splitDesc = new SplitType(textRef.current, { types: "lines" });
    gsap.fromTo(
      splitDesc.lines,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: splitDesc,
          start: "top center",
          end: "bottom top",
          scrub: false,
        },
      }
    );

    return () => {
      splitDesc.revert();
    };
  }, []);

  return (
    <div ref={textRef} className={`${className}`}>
      {text}
    </div>
  );
};

export default TextLineAnimation;
