import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

import NaturalStone from "/public/final-media/repertoires/categoriesSection/1.jpg";
import DecorativePanel from "/public/final-media/repertoires/categoriesSection/2.jpg";
import Furniture from "/public/final-media/repertoires/categoriesSection/3.jpg";
import ModularKitchen from "/public/final-media/repertoires/categoriesSection/4.jpg";
import Wardrobe from "/public/final-media/repertoires/categoriesSection/5.jpg";
import Sanitaryware from "/public/final-media/repertoires/categoriesSection/6.png";
import Fitting from "/public/final-media/repertoires/categoriesSection/7.webp";
import Tile from "/public/final-media/repertoires/categoriesSection/8.jpg";
import Mosaic from "/public/final-media/repertoires/categoriesSection/9.jpg";
import WoodenFlooring from "/public/final-media/repertoires/categoriesSection/10.jpg";
import Wallpaper from "/public/final-media/repertoires/categoriesSection/11.jpg";
import useParallax from "hooks/Parallax";
import useLineByLine from "hooks/LineByLine";

gsap.registerPlugin(ScrollTrigger);

const content = [
  {
    title: "Natural Stone",
    desc: "We source the finest natural stones, curated to bring your design vision to life. Our commitment goes beyond exceptional materials. We guide you through stone selection, ensuring an unparalleled client experience. Let us unlock the unique beauty of stone in your project.",
    img: NaturalStone,
  },
  {
    title: "Decorative Panels",
    desc: "Go beyond ordinary walls with our stunning collection of decorative panels. We offer a diverse range of materials, textures, and finishes, allowing you to create a captivating focal point that reflects your unique style.  Our design team is here to collaborate with you, ensuring your vision becomes a reality.",
    img: DecorativePanel,
  },
  {
    title: "Furniture",
    desc: "Imagine a home that embodies your personality and reflects your taste. Our curated collection of luxury furniture from designer-trusted brands offers the perfect pieces to bring your vision to life. Explore furniture for every style, from sleek minimalism to opulent elegance.",
    img: Furniture,
  },
  {
    title: "Modulars Kitchens",
    desc: "Declutter your space and elevate your style with our modular wardrobe systems. We offer a variety of options, finishes, and components, allowing you to create a personalized wardrobe solution that maximizes storage and complements your existing décor.",
    img: ModularKitchen,
  },
  {
    title: "Wardrobes",
    desc: "A series of modular systems offered in different variations and finishes and configurable with multiple components and accessories to acheive the perfect wardrobe.",
    img: Wardrobe,
  },
  {
    title: "Sanitaryware",
    desc: "Transform your bathroom into a haven of relaxation and luxury with our premium sanitaryware collection. We offer meticulously crafted designs that combine exceptional quality with beautiful aesthetics. Enhance your daily routine with these world-class products.",
    img: Sanitaryware,
  },
  {
    title: "Fittings",
    desc: "The perfect blend of form and function, our collection of fittings elevates your space to the next level.  We offer innovative designs that incorporate the latest technological advancements, ensuring exceptional performance and a touch of elegance.  Find the perfect complement to your overall design vision.",
    img: Fitting,
  },
  {
    title: "Tiles",
    desc: "Unleash your creativity with our vast selection of high-quality tiles. We offer a variety of styles, materials, and effects like stone, concrete, and marble, allowing you to transform any space, indoors or outdoors. Find the perfect tiles to bring your design vision to life.",
    img: Tile,
  },
  {
    title: "Mosaic",
    desc: "Elevate your walls with the timeless beauty of handcrafted mosaic tiles.  We offer endless chromatic and decorative combinations, allowing you to create a unique and artistic focal point that reflects your personality.",
    img: Mosaic,
  },
  {
    title: "Wooden Flooring",
    desc: "Imagine the luxurious feel of rich, engineered wooden flooring beneath your feet.  Our curated selection boasts exquisite finishes and patterns, transforming any space into a warm and sophisticated haven.",
    img: WoodenFlooring,
  },
  {
    title: "Wallpapers",
    desc: "Wallpapers are more than just decoration; they are a way to express your personality and transform your space.  We offer a diverse collection, from bold patterns to calming textures, ensuring you find the perfect design to speak to you.",
    img: Wallpaper,
  },
];

const SingleSection = React.memo(({ img, title, desc, index }) => {
  useParallax(0.5, 0.3);

  const parentRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const imageParentRef = useRef(null);
  const borderRightRef = useRef(null);
  const descriptionRef = useRef(null);

  useLineByLine(descriptionRef);

  useEffect(() => {
    const parent = parentRef.current;
    const title = titleRef.current;
    const image = imageRef.current;
    const imageParent = imageParentRef.current;
    const borderRight = borderRightRef.current;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: "top 90%",
      },
    });

    timeline
      .fromTo(
        imageParent,
        { scale: 0.5 },
        { scale: 1, duration: 1.75, ease: "Expo.easeOut" }
      )
      .fromTo(
        image,
        { scale: 2.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.75, ease: "Expo.easeOut" },
        "<"
      )
      .fromTo(
        borderRight,
        { height: "0" },
        {
          height: "21.25vw",
          duration: 2,
          ease: "Expo.easeOut",
        },
        "<"
      )
      .fromTo(
        title,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.75,
          ease: "power2.out",
        },
        "<"
      );

    return () => {
      timeline.kill();
    };
  }, [index]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={parentRef}
      className={`w-[97%] lg:w-full flex ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } flex-col justify-center items-center gap-[3vw] lg:gap-0`}
    >
      <div
        ref={imageParentRef}
        className="overflow-hidden flex items-center justify-center h-[40vw] sm2:h-[30vw] lg:h-[21.25vw] w-full lg:w-[60%]"
      >
        <Image
          ref={imageRef}
          className="w-full h-full object-cover"
          src={img}
          alt={title}
        />
      </div>
      <div className="flex justify-center items-center h-full mx-[2.5vw]">
        <div
          ref={borderRightRef}
          className="w-[1.75px] hidden lg:block bg-[#51375bce]"
        ></div>
      </div>
      <div
        className={`flex flex-col ${
          isEven ? "lg:items-end lg:pr-[2vw]" : "lg:items-start lg:pl-[2vw]"
        } items-center justify-center w-full lg:w-[35%] gap-[1.5vw]`}
      >
        <h2
          ref={titleRef}
          className={`w-full ${
            isEven ? "lg:text-right" : "lg:text-left"
          } text-left base:text-[4.25vw] sm2:text-[3.75vw] leading-none lg:text-[1.85vw] font-semibold text-[#51375b]`}
        >
          {title}
        </h2>
        <div
          ref={descriptionRef}
          className={`lg:text-[1.05vw] w-full text-[2.75vw] sm2:text-[2.25vw] text-[#51375bd9] font-normal lg:w-[80%] text-justify ${
            isEven ? "lg:text-right" : "lg:text-left"
          }`}
        >
          {desc}
        </div>
      </div>
    </div>
  );
});

SingleSection.displayName = "SingleSection";

const CategoriesSection = () => {
  const memoizedContent = useMemo(() => content, []);

  return (
    <div className="w-full flex-col flex items-center justify-center gap-[5vw] sm2:gap-[3.75vw] lg:gap-[4vw] my-[5vw] lg:my-[3.5vw] overflow-hidden">
      {memoizedContent.map((data, index) => (
        <SingleSection key={index} {...data} index={index} />
      ))}
    </div>
  );
};

export default React.memo(CategoriesSection);
