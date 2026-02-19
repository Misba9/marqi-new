import React, { useEffect, useRef, useCallback, useMemo } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import HeroRepertoire from "/public/final-media/repertoires/heroCat/1.jpg";
import HeroRepertoire2 from "/public/final-media/repertoires/heroCat/2.jpg";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import useParallax from "hooks/Parallax";
import TypewriterGSAP from "./ReusableComponents/TypewriterGSAP";
import useLineByLine from "hooks/LineByLine";

gsap.registerPlugin(ScrollTrigger);

const calming = localFont({
  src: "../styles/calming/Calming-Regular.woff2",
  variable: "--font-calming",
});

const HeroCat = () => {
  const title = useRef(null);
  const image1 = useRef(null);
  const image2 = useRef(null);
  const hero = useRef(null);
  const paragraph1 = useRef(null);
  const paragraph2 = useRef(null);

  useParallax(0.05, 0.005);

  useLineByLine(hero);
  useLineByLine(paragraph1);
  useLineByLine(paragraph2);

  const opacityRefs = useRef([]);

  const animateElement = useCallback((ref) => {
    if (ref) {
      gsap.fromTo(
        ref,
        {
          y: 20,
          opacity: 0,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.75,
          ease: "Expo.easeOut",
          scrollTrigger: {
            trigger: ref,
          },
          stagger: 0.5,
        }
      );
    }
  }, []);

  useEffect(() => {
    opacityRefs.current = [title.current, image1.current, image2.current];
    opacityRefs.current.forEach(animateElement);

    return () => {
      opacityRefs.current.forEach((ref) => {
        if (ref) {
          gsap.killTweensOf(ref);
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.trigger === ref) {
              trigger.kill();
            }
          });
        }
      });
    };
  }, [animateElement]);

  const memoizedTypewriter = useMemo(
    () => (
      <TypewriterGSAP
        text="We are Marqi"
        mainClassName="text-left w-full py-[3vw] lg:py-[2vw]"
        className="text-[8.5vw] md:text-[10vw] lg:text-[3.75vw] md:leading-[4.25vw] text-[#312137]"
      />
    ),
    []
  );

  return (
    <div className="min-h-full w-full flex items-center justify-center flex-col">
      <div className="parallax-plus h-[100vh] lg:h-[150vh] w-full grid justify-center items-center grid-cols-36 grid-rows-36">
        <h1
          ref={title}
          className={`${calming.className} col-start-4 ml-[1vw] md:ml-0 mb-[2vw] md:mb-0 md:col-start-7 lg:col-start-8 row-start-12 lg:mt-[0.5vw] row-span-3 col-span-30 md:col-span-24 lg:col-span-22 text-[13.5vw] sm2:text-[11vw] lg:text-[10vw] leading-none z-[1] tracking-tight uppercase text-[#46304f]`}
        >
          Repertoires
        </h1>

        <Image
          ref={image1}
          src={HeroRepertoire}
          alt="Repertoire"
          className="parallax-minus row-start-13 row-span-23 lg:col-start-1 lg:row-start-13 lg:row-span-20 col-span-36 lg:col-span-31 col-start-1 object-cover h-full w-full z-0"
        />

        <Image
          ref={image2}
          src={HeroRepertoire2}
          alt="Repertoire"
          className="parallax-minus row-start-28 row-span-8 col-start-27 col-span-8 hidden lg:block object-cover w-full h-full"
        />
      </div>
      <div className="h-full w-full flex items-end justify-center py-[3vw] lg:py-[4vw]">
        <div className="w-[87.5%] lg:w-[85%] flex flex-col lg:flex-row items-end justify-between gap-[7vw]">
          <h2
            ref={hero}
            className={`flex flex-wrap w-full lg:w-[175%] text-[12.4vw] lg:text-[7vw] leading-[0.8] ${calming.className} tracking-tight uppercase text-[#51375b] z-[1]`}
          >
            Crafting the Pinnacle of Luxury Design
          </h2>

          <div className="w-full h-full flex flex-col items-end justify-center text-left gap-[2.5vw] lg:gap-[1.5vw] text-[2.75vw] lg:text-[0.9vw] font-medium text-[#51375bbd]">
            <p ref={paragraph1} className="w-full text-left">
              Beyond expectation. Beyond imagination. We create exceptional
              spaces that push boundaries and redefine luxury. Whether you
              envision timeless grandeur or modern vibrancy, our team brings
              your desires to life with unparalleled skill and dedication.
              <br />
              <span className="pt-[2vw] lg:pt-[1vw]">
                We are for the select few.
              </span>
            </p>
            {memoizedTypewriter}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeroCat);
