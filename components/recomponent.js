import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const ReComponent = () => {
  gsap.registerPlugin(ScrollTrigger);

  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current.forEach((ref) => {
      gsap.from(ref, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref,
        },
      });
    });
  }, []);

  // Add as many sections as needed here
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);

  useEffect(() => {
    sectionRefs.current = [
      section1Ref.current,
      section2Ref.current,
      section3Ref.current,
      section4Ref.current,
      section5Ref.current,
      section6Ref.current,
    ];
  }, []);

  return (
    <div>
      <section className=" h-[80vh] bg-black " ref={section1Ref}>
        Section 1 Content
      </section>
      <section className=" h-[80vh] bg-slate-600 " ref={section2Ref}>
        Section 2 Content
      </section>
      <section className=" h-[80vh] bg-neutral-600 " ref={section3Ref}>
        Section 3 Content
      </section>
    </div>
  );
};

export default ReComponent;
