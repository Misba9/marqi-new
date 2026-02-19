import React, { useEffect, useRef } from "react";
import localFont from "next/font/local";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const quentin = localFont({
  src: "./././../././../styles/quentin/Quentin.woff2",
  variable: "--font-quentin",
});

gsap.registerPlugin(ScrollTrigger);

const TypewriterGSAP = ({ text, className, mainClassName }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = text.split("").map((letter, index) => ({
      letter,
      index,
    }));
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 70%",
        end: "top 30%",
      },
    });

    letters.forEach(({ letter, index }) => {
      tl.fromTo(
        textRef.current.children[index],
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.099,
        }
      );
    });
  }, [text]);

  return (
    <div className={`${mainClassName} overflow-hidden `}>
      <h1 ref={textRef} className={` ${quentin.className} ${className} `}>
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className={`inline-block ${letter === " " ? "w-[0.25em]" : ""}`}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TypewriterGSAP;
