import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRefs = useRef([]);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/final-media/main/hero/1.webp",
    "/final-media/main/hero/2.webp",
    "/final-media/main/hero/3.webp",
    "/final-media/main/hero/4.webp",
    "/final-media/main/hero/5.webp",
    "/final-media/main/hero/6.webp",
    "/final-media/main/hero/7.webp",
    "/final-media/main/hero/8.webp",
  ];

  const setupGSAP = useCallback(() => {
    sectionRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2.75,
            delay: 0.25,
            ease: "Expo.easeOut",
            scrollTrigger: {
              trigger: ref,
            },
            stagger: 0.5,
          }
        );
      }
    });
  }, []);

  useEffect(() => {
    setupGSAP();

    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      sectionRefs.current.forEach((ref) => {
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
  }, [setupGSAP, images.length]);

  const sectionClasses = "text-[#51375b] text-[8.5vw] font-normal uppercase";

  return (
    <div className="w-full flex flex-col justify-center my-[2.5%]">
      <div className="flex items-center w-full leading-none px-[0.725%]">
        <h1
          ref={(el) => (sectionRefs.current[0] = el)}
          className="text-[12.5vw] lg:text-[9.85vw] mb-[1.5vw] leading-none tracking-[-0.85vw] lg:text-justify text-center sm2:text-left text-[#51375be4] font-light"
        >
          sleek{" "}
          <span className="tracking-[-0.775vw] text-[#51375b] font-normal uppercase">
            sophistication
          </span>
        </h1>
      </div>

      <div className="h-[65vh] lg:h-screen relative">
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={`Image ${index + 1}`}
            className={`object-cover w-full h-full brightness-[0.85] absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
            fill={true}
            priority={index === 0}
          />
        ))}
      </div>

      <div className="grid w-full md:h-full gap-[1vw] md:gap-0 leading-[0.7] grid-cols-30 grid-rows-30 my-[2.5vw]">
        <div
          ref={(el) => (sectionRefs.current[1] = el)}
          className={`${sectionClasses} col-span-15 col-start-11 lowercase italic ml-[0.5vw]`}
        >
          seamless
        </div>
        <div
          ref={(el) => (sectionRefs.current[2] = el)}
          className={`${sectionClasses} col-span-8 col-start-14 row-start-2 lowercase italic leading-[0.75] ml-[1.165vw]`}
        >
          style
        </div>
        <div
          ref={(el) => (sectionRefs.current[3] = el)}
          className={`${sectionClasses} col-span-21 col-start-11 row-start-3 ml-[2.5vw]`}
        >
          unmatched
        </div>
        <div
          ref={(el) => (sectionRefs.current[4] = el)}
          className={`${sectionClasses} col-span-26 col-start-3 row-start-4`}
        >
          functionality
        </div>
        <div
          ref={(el) => (sectionRefs.current[5] = el)}
          id="exquisite"
          className={`${sectionClasses} col-span-17 col-start-18 row-start-5`}
        >
          exquisite
        </div>
      </div>
    </div>
  );
};

export default Hero;
