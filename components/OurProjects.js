import React, { useEffect, useRef, memo } from "react";
import Heading from "./ReusableComponents/Heading";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetails = memo(
  ({ title, description, learnMoreLink, imageSrc }) => (
    <div className="w-full flex flex-col-reverse lg:flex-row justify-between gap-[3vw] lg:gap-0">
      <div className="lg:w-[45%] flex flex-col gap-[2.5vw] lg:gap-4">
        <Heading title={title} />
        <div className="text-[2.75vw] lg:text-[1.5vw] text-[#51375bce] font-medium">
          {description}
        </div>
        <button className="group relative w-fit overflow-hidden bg-transparent border-[#51375b] border px-[1em] py-[0.5em] sm2:px-[0.85em] sm2:py-[0.4em] text-[2.85vw] lg:text-[1.25vw] text-[#51375b] hover:text-[#fcf3ff]">
          <Link href={learnMoreLink}>
            <span className="relative z-[1]">Learn More</span>
            <span className="absolute inset-0 overflow-hidden">
              <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-[#3f2b47] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
          </Link>
        </button>
      </div>
      <div className="border-r pr-5 border-[#51375b]"></div>
      <div className="lg:w-[45%] base:h-[20rem] lg:h-[30vw] flex items-center justify-center">
        <Image
          src={imageSrc}
          width={500}
          height={500}
          className="w-full object-cover opacity-100 h-full brightness-[.85]"
          alt="Our Projects"
        />
      </div>
    </div>
  )
);

ProjectDetails.displayName = "ProjectDetails";

const OurProjects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animation = gsap.fromTo(
        sectionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.75, delay: 0.25, ease: "Expo.easeOut" }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        animation,
      });
    });

    return () => ctx.revert(); // This will clean up the GSAP animations
  }, []);

  return (
    <section className="w-full my-[5vw] lg:my-[2.5vw] flex items-center justify-center">
      <div className="w-[95%] sm2:w-[90%] lg:w-[85%] flex items-center justify-between gap-[3vw] lg:gap-[1.5vw] flex-col">
        <h1
          ref={sectionRef}
          className="text-[13vw] lg:text-[9.85vw] uppercase leading-none tracking-[0.484vw] lg:text-justify text-center sm2:text-left text-[#51375b] font-light"
        >
          our <span className="font-normal">projects</span>
        </h1>
        <ProjectDetails
          title="Coral Gables"
          description="Our concept of luxury goes beyond mere opulence and extravagance. We value creating exceptional environments that seamlessly combine serenity, practicality, and sustainability. Our commitment to design is evident in the intricate craftsmanship of our villas, each a testament to our passion."
          learnMoreLink="/projects/coral-gables"
          imageSrc="/final-media/main/ourProjects/2.webp"
        />
      </div>
    </section>
  );
};

export default OurProjects;
