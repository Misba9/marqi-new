import React, { useEffect, useRef, memo } from "react";
import Heading from "./ReusableComponents/Heading";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image1 from "/public/final-media/coral-gables/location/1.webp";
import Image2 from "/public/final-media/coral-gables/location/2.jpg";
import Image3 from "/public/final-media/coral-gables/location/3.jpg";
import Image4 from "/public/final-media/coral-gables/location/4.jpg";

gsap.registerPlugin(ScrollTrigger);

const LocationImage = memo(({ src, className, alt }) => (
  <Image
    style={{ filter: "grayscale(75%)" }}
    src={src}
    alt={alt}
    className={className}
  />
));

const LearnMoreButton = memo(() => (
  <button className="group relative w-fit overflow-hidden overflow-x-hidden bg-transparent border-[#51375b] border px-[1em] py-[0.5em] sm2:px-[0.85em] sm2:py-[0.4em] text-[2.85vw] lg:text-[1.25vw] text-[#51375b] hover:text-[#fcf3ff]">
    <Link href="/projects/coral-gables">
      <span className="relative z-[1]">Learn More</span>
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-[#3f2b47] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
      </span>
    </Link>
  </button>
));

const Location = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const animation = gsap.fromTo(
      sectionRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 2.75, delay: 0.25, ease: "Expo.easeOut" }
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "top 20%",
      animation,
    });

    return () => {
      scrollTrigger.kill();
      animation.kill();
    };
  }, []);

  return (
    <section className="w-full my-[5vw] lg:my-[2.5vw] flex items-center justify-center">
      <div className="w-[95%] sm2:w-[90%] lg:w-[85%] flex items-center justify-between gap-[3vw] lg:gap-[1.5vw] flex-col">
        <h1
          ref={sectionRef}
          className="text-[13vw] lg:text-[9.85vw] uppercase leading-none tracking-[-0.05em] sm2:tracking-[-0.08em] lg:tracking-[0.775vw] lg:text-justify text-center sm2:text-left text-[#51375b] font-light"
        >
          The <span className="font-normal">Location</span>
        </h1>

        <div className="w-full flex flex-col-reverse lg:flex-row justify-between gap-[3vw] lg:gap-0">
          <div className="lg:w-[45%] flex flex-col justify-center gap-[2.5vw] lg:gap-4">
            <Heading title="Coral Gables" />
            <p className="text-[2.75vw] lg:text-[1.25vw] text-[#51375bce] font-medium">
              Hyderabad&apos;s cosmopolitan lifestyle is characterized by a
              harmonious coexistence of various communities and cultures. The
              city is known for its warm hospitality and friendly people. It
              offers a diverse range of recreational activities, including
              shopping malls, theaters, parks, and multiplexes, catering to
              different interests and preferences.
            </p>
            <LearnMoreButton />
          </div>

          <div className="lg:w-[49.3%] base:h-[40vw] lg:h-[27.5vw] flex items-center justify-center">
            <Image
              style={{ filter: "grayscale(100%)" }}
              src={Image1}
              width={500}
              height={500}
              className="w-full object-cover opacity-100 h-full brightness-[.85]"
              alt="Our Projects"
            />
          </div>
        </div>

        <div className="w-full h-[85vh] lg:h-[150vh] flex justify-center">
          <div className="grid grid-cols-12 grid-rows-6 gap-[1vw]">
            <LocationImage
              src={Image2}
              className="  w-full sm:h-full col-start-1 col-span-6 row-start-1 row-span-2"
              alt="Location Image 2"
            />
            <LocationImage
              src={Image3}
              className="  w-full sm:h-full col-start-7 col-span-6 row-start-1 row-span-2"
              alt="Location Image 3"
            />
            <Image
              src={Image4}
              alt="Location Image 4"
              className=" w-full sm:h-full col-start-1 col-span-12 row-start-3 row-span-4  object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Location);
