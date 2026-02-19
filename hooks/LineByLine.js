import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const useLineByLine = (ref, triggerOptions = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const splitDesc = new SplitType(ref.current, { types: "lines" });

    gsap.fromTo(
      splitDesc.lines,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.125,
        duration: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: true,
        },
      }
    );

    return () => {
      splitDesc.revert();
    };
  }, [ref, triggerOptions]);
};
export default useLineByLine;
