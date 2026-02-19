import React, { useEffect, useRef, useMemo } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import HeroRepertoire from "/public/final-media/coral-gables/projectHero/1.jpg";
import HeroRepertoire2 from "/public/final-media/coral-gables/projectHero/2.webp";
import gsap from "gsap";
import useParallax from "hooks/Parallax";
import useLineByLine from "hooks/LineByLine";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const calming = localFont({
  src: "../styles/calming/Calming-Regular.woff2",
  variable: "--font-calming",
});

const quentin = localFont({
  src: "../styles/quentin/Quentin.woff2",
  variable: "--font-quentin",
});

gsap.registerPlugin(ScrollTrigger);

const ProjectHero = () => {
  const title = useRef(null);
  const image1 = useRef(null);
  const image2 = useRef(null);
  const hero = useRef(null);
  const paragraph1 = useRef(null);
  const paragraph2 = useRef(null);

  useParallax(0.1, 0.2);

  useLineByLine(hero);
  useLineByLine(paragraph1);
  useLineByLine(paragraph2);

  const opacityRefs = useRef([]);

  useEffect(() => {
    opacityRefs.current = [title.current, image1.current, image2.current];

    const animations = opacityRefs.current.map((ref) => {
      if (ref) {
        return gsap.fromTo(
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
      return null;
    });

    return () => {
      animations.forEach((animation) => animation && animation.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const memoizedImages = useMemo(
    () => (
      <>
        <Image
          ref={image1}
          src={HeroRepertoire}
          alt="Repertoire"
          className="parallax-minus brightness-110 row-start-13 row-span-23 lg:col-start-1 lg:row-start-13 lg:row-span-20 col-span-36 lg:col-span-36 col-start-1 object-cover h-full w-full z-0"
        />
        <Image
          ref={image2}
          src={HeroRepertoire2}
          alt="Repertoire"
          className="parallax-minus row-start-29 row-span-8 col-start-2 col-span-10 hidden lg:block object-cover w-full h-full"
        />
      </>
    ),
    []
  );

  return (
    <div className="min-h-full w-full flex items-center justify-center flex-col">
      <div className="parallax-plus h-[100vh] lg:h-[150vh] w-full grid justify-center items-center grid-cols-36 grid-rows-36">
        <h1
          ref={title}
          className={`${quentin.className} col-start-4 ml-[1vw] md:ml-0 mb-[2vw] md:mb-0 md:col-start-7 lg:col-start-8 row-start-12 row-span-3 col-span-30 md:col-span-24 lg:col-span-22 text-[13.5vw] sm2:text-[11vw] lg:text-[10vw] leading-none z-[1] tracking-tight text-[#46304f]`}
        >
          Coral Gables
        </h1>

        {memoizedImages}
      </div>
      <div className="h-full w-full flex items-end justify-center py-[3vw] lg:py-[4vw]">
        <div className="w-[95%] sm2:w-[90%] lg:w-[85%] flex flex-col items-end justify-between gap-[4vw]">
          <h2
            ref={hero}
            className={`flex flex-wrap w-full text-[12.4vw] lg:text-[6vw] leading-[0.85] ${calming.className} uppercase text-[#51375b] z-[1]`}
          >
            Where nature meets opulence
          </h2>

          <div className="w-full h-full flex flex-col items-end justify-center text-left gap-[2.5vw] lg:gap-[1.5vw] text-[2.8vw] lg:text-[1vw] font-medium text-[#51375bbd]">
            <p ref={paragraph1} className="w-full text-left">
              Our design process is a meticulous dance between dedication and
              expertise. Every detail, from the initial layout to the finishing
              flourish, receives our unwavering attention, ensuring an
              unparalleled level of craftsmanship.
              <br />
              <span className="pt-[2vw] lg:pt-[1vw]">
                Our villas transcend mere luxury; they represent a commitment to
                environmental stewardship. We've meticulously designed them to
                minimize their impact, offering eco-conscious dream homes that
                can be luxurious escapes or profitable investments, all while
                delivering exceptional returns on more than just finances.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectHero);
