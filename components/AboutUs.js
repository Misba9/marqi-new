import React, { useEffect, useRef, memo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Heading from "./ReusableComponents/Heading";

gsap.registerPlugin(ScrollTrigger);

const AboutImage = memo(() => (
  <div className="w-full lg:w-[45%] h-[60vh] lg:h-[80vh]">
    <Image
      src="/final-media/main/about/1.jpg"
      className="w-full object-cover h-full brightness-[0.85]"
      width={1000}
      height={1000}
      alt="About Us"
      priority
    />
  </div>
));

AboutImage.displayName = "AboutImage";

const AboutContent = memo(() => (
  <div className="w-full lg:w-[45%] flex flex-col gap-[2.5vw]">
    <Heading title="About Us" />
    <div className="text-[2.75vw] lg:text-[1.5vw] text-[#51375bce] font-medium">
      We are a passionate group of professionals dedicated to designing and
      constructing exquisite and sustainable environments. Our team brings
      together extensive global expertise of 40+ years and collaborates with cutting-edge
      international partners to create luxurious properties that are built to
      withstand the test of time.
      <br /> By paying meticulous attention to every detail and utilizing
      high-quality finishes, we strive to establish a new benchmark for
      excellence in the Global market.
    </div>
  </div>
));

AboutContent.displayName = "AboutContent";

const AboutUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2.75,
          delay: 0.25,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full my-[5vw] lg:my-[2.5vw] flex items-center justify-center">
      <div
        className="w-[95%] sm2:w-[90%] lg:w-[85%] flex items-center justify-between flex-col lg:flex-row gap-[4vw] lg:gap-0"
        ref={sectionRef}
      >
        <AboutImage />
        <AboutContent />
      </div>
    </div>
  );
};

export default memo(AboutUs);
