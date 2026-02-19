import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import localFont from "next/font/local";
import TypewriterGSAP from "./ReusableComponents/TypewriterGSAP";

import Image1 from "/public/final-media/coral-gables/theVilla/1.jpg";
import Image2 from "/public/final-media/coral-gables/theVilla/2.jpg";
import Image3 from "/public/final-media/coral-gables/theVilla/3.jpg";
import Image5 from "/public/final-media/coral-gables/theVilla/4.webp";
import Image6 from "/public/final-media/coral-gables/theVilla/5.jpg";
import Image8 from "/public/final-media/coral-gables/theVilla/6.webp";
import Image9 from "/public/final-media/coral-gables/theVilla/7.webp";
import Image10 from "/public/final-media/coral-gables/theVilla/8.webp";
import Image11 from "/public/final-media/coral-gables/theVilla/9.webp";
import Image12 from "/public/final-media/coral-gables/theVilla/10.webp";
// Import reasons data

const reasonsToInvest = [
  {
    logo: "/stock.svg",
    width: "w-16 mb-6",
    title: "A solid economy and a flourishing IT industry",
    description:
      "Highest rate of economic expansion The “Silicon Valley of India” , home to Microsoft, Google, and Amazon.",
  },
  {
    logo: "/buildings.svg",
    width: "w-16 mb-6",
    title: "Reasonable costs for real estate",
    description: "Affordable cost of living.",
  },
  {
    logo: "/road.svg",
    width: "w-16 mb-5",
    title: "Outstanding infrastructure and connectivity",
    description:
      "Home to an airport of international renown Expansion & improvement of road & rail networks. The Hyderabad Metro is convenient & economical.",
  },
  {
    logo: "/business.svg",
    width: "w-16 mb-8",
    title: "Competition",
    description:
      "The competition for real estate in Hyderabad is increasing, partly as a result of the city's expanding economy and the flood of people relocating here for work",
  },
  {
    logo: "/charminar.svg",
    width: "w-24",
    title: "An active and thriving cultural scene",
    description:
      "Diverse cultural landscape, rich history & museums, many festivals & delicious cuisine Excellent location for both permanent residence and business investment.",
  },
  {
    logo: "/secured.svg",
    width: "w-16 mb-7",
    title: "Recognized for being safe and inviting",
    description:
      "Low crime rate and a populace that is known for being friendly, thus the city is regarded for being safe and welcoming.High quality of life for residents and employees.",
  },
];

gsap.registerPlugin(ScrollTrigger);

const TheVilla = () => {
  const gridRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".grid-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        sectionRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2.75,
          delay: 0.25,
          ease: "Expo.easeOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const GridItem = useMemo(
    () =>
      ({ logo, width, title, description }) =>
        (
          <div className="grid-item bg-[#ffffff91] border-4 border-[#51375b] p-6 rounded-lg flex flex-col items-center text-center">
            <div className={width}>
              <Image
                src={logo}
                alt={`Logo for ${title}`}
                className="w-full"
                width={1000}
                height={1000}
              />
            </div>
            <h3 className="text-base text-[#51375b] font-semibold mb-2">
              {title}
            </h3>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>
        ),
    []
  );

  const ImageGrid = useMemo(
    () =>
      ({ images, className }) =>
        (
          <div className={className}>
            {images.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={`Image ${index + 1}`}
                className={image.className}
              />
            ))}
          </div>
        ),
    []
  );

  const firstGridImages = useMemo(
    () => [
      {
        src: Image1,
        className:
          "w-full h-full col-start-1 col-span-5 row-start-1 row-span-3",
      },
      {
        src: Image2,
        className:
          "w-full h-full col-start-6 col-span-7 row-start-1 row-span-3",
      },
      {
        src: Image5,
        className:
          "hidden sm2:block w-full h-full col-start-1 col-span-3 row-start-4 row-span-3",
      },
      {
        src: Image3,
        className:
          "w-full h-full col-start-1 sm2:col-start-4 col-span-7 sm2:col-span-6 row-start-4 row-span-3",
      },
      {
        src: Image6,
        className:
          "w-full h-full col-start-8 sm2:col-start-10 col-span-5 sm2:col-span-3 row-start-4 row-span-3",
      },
    ],
    []
  );

  const secondGridImages = useMemo(
    () => [
      {
        src: Image8,
        className:
          "w-full h-full hidden md:block col-start-1 col-span-8 row-start-1 row-span-3",
      },
      {
        src: Image9,
        className:
          "w-full h-full col-start-1 col-span-full md:col-start-9 md:col-span-4 row-start-1 row-span-3",
      },
      {
        src: Image10,
        className:
          "w-full h-full col-start-1 col-span-6 md:col-span-4 row-start-4 row-span-3",
      },
      {
        src: Image11,
        className:
          "w-full h-full col-start-7 md:col-start-5 col-span-6 md:col-span-8 row-start-4 row-span-3",
      },
      {
        src: Image12,
        className:
          "w-full h-full col-start-7 md:hidden md:col-start-5 col-span-6 md:col-span-8 row-start-4 row-span-3",
      },
    ],
    []
  );

  return (
    <div className="gridlayout w-full flex justify-center text-[#51375bce]">
      <div className="w-[95%] sm2:w-[90%] lg:w-[85%] flex items-center justify-between gap-[3vw] lg:gap-[1.5vw] flex-col">
        <h1
          ref={sectionRef}
          className="text-[13vw] lg:text-[9.85vw] uppercase leading-none tracking-[0.2em] sm2:tracking-[0.19em] lg:tracking-[3.8875vw] lg:text-justify text-center sm2:text-left text-[#51375b] font-extralight"
        >
          The Villa{" "}
          <span className="tracking-wide lg:tracking-[2vw] font-normal">
            Collection
          </span>
        </h1>

        <TypewriterGSAP
          text="the design"
          mainClassName="w-full text-center"
          className="text-[5.5vw] lg:text-[3vw] py-[5vw] lg:py-10 font-light tracking-[-0.075em]"
        />

        <ImageGrid
          images={firstGridImages}
          className="w-full h-screen lg:h-[150vh] grid grid-cols-12 grid-rows-6 gap-4"
        />

        <TypewriterGSAP
          text="why invest in Hyderabad?"
          mainClassName="w-full text-center"
          className="text-[5vw] lg:text-[3vw] py-[5vw] lg:py-10 font-light tracking-[-0.075em]"
        />

        <div className="w-full mx-auto py-8">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reasonsToInvest.map((reason, index) => (
              <GridItem key={index} {...reason} />
            ))}
          </div>
        </div>

        <TypewriterGSAP
          text="the development"
          mainClassName="w-full text-center"
          className="text-[5vw] lg:text-[3vw] py-[5vw] lg:py-10 font-light tracking-[-0.075em]"
        />

        <ImageGrid
          images={secondGridImages}
          className="w-full grid grid-cols-12 grid-rows-6 h-screen lg:h-[150vh] gap-[3vw] lg:gap-[1.5vw] mb-[min(5vw,5rem)]"
        />
      </div>
    </div>
  );
};

export default TheVilla;
