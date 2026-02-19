import React, { useEffect, useRef, useMemo } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import { gsap } from "gsap";
import useParallax from "hooks/Parallax";
import useLineByLine from "hooks/LineByLine";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import TypewriterGSAP from "./ReusableComponents/TypewriterGSAP";

const calming = localFont({
  src: "../styles/calming/Calming-Regular.woff2",
  variable: "--font-calming",
});

const quentin = localFont({
  src: "../styles/quentin/Quentin.woff2",
  variable: "--font-quentin",
});

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "HITEC City Tech Park",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
  },
  {
    name: "Financial District Campus",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop",
  },
  {
    name: "Gachibowli Corporate Hub",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
  },
  {
    name: "Knowledge City Hyderabad",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
  {
    name: "Nanakramguda IT Campus",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop",
  },
  {
    name: "Madhapur Business Center",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
  },
  {
    name: "Raidurg Tech Towers",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
  },
  {
    name: "Kokapet Commercial Campus",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
  {
    name: "Cyberabad Office Complex",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop",
  },
  {
    name: "Hyderabad Innovation Hub",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
  },
  {
    name: "Banjara Hills Corporate Center",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
  },
  {
    name: "Jubilee Hills Business Park",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
];

const PortfolioHyderabad = () => {
  const title = useRef(null);
  const hero = useRef(null);
  const paragraph1 = useRef(null);
  const gridRef = useRef(null);
  const sectionRef = useRef(null);

  useParallax(0.1, 0.2);

  useLineByLine(hero);
  useLineByLine(paragraph1);

  const opacityRefs = useRef([]);

  useEffect(() => {
    opacityRefs.current = [title.current];

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

    // Grid animation
    if (gridRef.current) {
      const items = Array.from(gridRef.current.children);
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
            delay: index * 0.1,
          }
        );
      });
    }

    // Section heading animation
    if (sectionRef.current) {
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
    }

    return () => {
      animations.forEach((animation) => animation && animation.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Use first project images as hero images (placeholder - you can replace with actual hero images)
  const heroImage1 = projects[0]?.image || "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop";
  const heroImage2 = projects[1]?.image || "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop";

  // Create ImageGrid component
  const ImageGrid = useMemo(
    () =>
      ({ images, className }) =>
        (
          <div className={className}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `Project ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                {image.name && (
                  <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-lg font-semibold drop-shadow-lg">
                      {image.name}
                    </h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        ),
    []
  );

  // Create first grid layout - mosaic style
  const firstGridImages = useMemo(
    () => [
      {
        src: projects[0]?.image,
        alt: projects[0]?.name,
        name: projects[0]?.name,
        className:
          "w-full h-full col-start-1 col-span-5 row-start-1 row-span-3",
      },
      {
        src: projects[1]?.image,
        alt: projects[1]?.name,
        name: projects[1]?.name,
        className:
          "w-full h-full col-start-6 col-span-7 row-start-1 row-span-3",
      },
      {
        src: projects[2]?.image,
        alt: projects[2]?.name,
        name: projects[2]?.name,
        className:
          "hidden sm2:block w-full h-full col-start-1 col-span-3 row-start-4 row-span-3",
      },
      {
        src: projects[3]?.image,
        alt: projects[3]?.name,
        name: projects[3]?.name,
        className:
          "w-full h-full col-start-1 sm2:col-start-4 col-span-7 sm2:col-span-6 row-start-4 row-span-3",
      },
      {
        src: projects[4]?.image,
        alt: projects[4]?.name,
        name: projects[4]?.name,
        className:
          "w-full h-full col-start-8 sm2:col-start-10 col-span-5 sm2:col-span-3 row-start-4 row-span-3",
      },
    ],
    []
  );

  // Create second grid layout
  const secondGridImages = useMemo(
    () => [
      {
        src: projects[5]?.image,
        alt: projects[5]?.name,
        name: projects[5]?.name,
        className:
          "w-full h-full hidden md:block col-start-1 col-span-8 row-start-1 row-span-3",
      },
      {
        src: projects[6]?.image,
        alt: projects[6]?.name,
        name: projects[6]?.name,
        className:
          "w-full h-full col-start-1 col-span-full md:col-start-9 md:col-span-4 row-start-1 row-span-3",
      },
      {
        src: projects[7]?.image,
        alt: projects[7]?.name,
        name: projects[7]?.name,
        className:
          "w-full h-full col-start-1 col-span-6 md:col-span-4 row-start-4 row-span-3",
      },
      {
        src: projects[8]?.image,
        alt: projects[8]?.name,
        name: projects[8]?.name,
        className:
          "w-full h-full col-start-7 md:col-start-5 col-span-6 md:col-span-8 row-start-4 row-span-3",
      },
      {
        src: projects[9]?.image,
        alt: projects[9]?.name,
        name: projects[9]?.name,
        className:
          "w-full h-full col-start-7 md:hidden md:col-start-5 col-span-6 md:col-span-8 row-start-4 row-span-3",
      },
    ],
    []
  );

  // Remaining projects in a grid
  const remainingProjects = projects.slice(10);

  const memoizedImages = useMemo(
    () => (
      <>
        <Image
          src={heroImage1}
          alt="Portfolio"
          width={1200}
          height={800}
          className="parallax-minus brightness-110 row-start-13 row-span-23 lg:col-start-1 lg:row-start-13 lg:row-span-20 col-span-36 lg:col-span-36 col-start-1 object-cover h-full w-full z-0"
        />
        <Image
          src={heroImage2}
          alt="Portfolio"
          width={800}
          height={600}
          className="parallax-minus row-start-29 row-span-8 col-start-2 col-span-10 hidden lg:block object-cover w-full h-full"
        />
      </>
    ),
    [heroImage1, heroImage2]
  );

  return (
    <>
      {/* Hero Section - Similar to ProjectHero */}
      <div className="min-h-full w-full flex items-center justify-center flex-col">
        <div className="parallax-plus h-[100vh] lg:h-[150vh] w-full grid justify-center items-center grid-cols-36 grid-rows-36">
          <h1
            ref={title}
            className={`${calming.className} col-start-4 ml-[1vw] md:ml-0 mb-[2vw] md:mb-0 md:col-start-7 lg:col-start-8 row-start-8 row-span-3 col-span-30 md:col-span-24 lg:col-span-22 text-[13.5vw] sm2:text-[11vw] lg:text-[10vw] leading-none z-[1] tracking-tight text-[#46304f]`}
          >
            Our Portfolio
          </h1>

          {memoizedImages}
        </div>
        <div className="h-full w-full flex items-end justify-center py-[3vw] lg:py-[4vw]">
          <div className="w-[95%] sm2:w-[90%] lg:w-[85%] flex flex-col items-end justify-between gap-[4vw]">
            <h2
              ref={hero}
              className={`flex flex-wrap w-full text-[12.4vw] lg:text-[6vw] leading-[0.85] ${calming.className} uppercase text-[#51375b] z-[1]`}
            >
              Hyderabad High-Tech Campus Projects
            </h2>

            <div className="w-full h-full flex flex-col items-end justify-center text-left gap-[2.5vw] lg:gap-[1.5vw] text-[2.8vw] lg:text-[1vw] font-medium text-[#51375bbd]">
              <p ref={paragraph1} className="w-full text-left">
                Our portfolio showcases exceptional high-tech campus projects across
                Hyderabad. Each development represents our commitment to creating
                innovative, sustainable, and world-class office spaces that meet the
                evolving needs of modern businesses.
                <br />
                <span className="pt-[2vw] lg:pt-[1vw]">
                  From HITEC City to the Financial District, our projects reflect
                  excellence in design, functionality, and architectural innovation.
                  We've meticulously crafted each campus to provide exceptional
                  working environments that inspire creativity and productivity.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid Section - Similar to TheVilla layout */}
      <div className="gridlayout w-full flex justify-center text-[#51375bce]">
        <div className="w-[95%] sm2:w-[90%] lg:w-[85%] flex items-center justify-between gap-[3vw] lg:gap-[1.5vw] flex-col">
          <h1
            ref={sectionRef}
            className="text-[13vw] lg:text-[9.85vw] uppercase leading-none tracking-[0.2em] sm2:tracking-[0.19em] lg:tracking-[3.8875vw] lg:text-justify text-center sm2:text-left text-[#51375b] font-extralight"
          >
            Our Projects{" "}
            <span className="tracking-wide lg:tracking-[2vw] font-normal">
              Collection
            </span>
          </h1>

          {/* First Image Grid - Mosaic Style */}
          <TypewriterGSAP
            text="our projects"
            mainClassName="w-full text-center"
            className="text-[5.5vw] lg:text-[3vw] py-[5vw] lg:py-10 font-light tracking-[-0.075em]"
          />

          <ImageGrid
            images={firstGridImages}
            className="w-full h-screen lg:h-[150vh] grid grid-cols-12 grid-rows-6 gap-4"
          />

          {/* Second Image Grid */}
          {secondGridImages.length > 0 && (
            <>
              <TypewriterGSAP
                text="more projects"
                mainClassName="w-full text-center"
                className="text-[5vw] lg:text-[3vw] py-[5vw] lg:py-10 font-light tracking-[-0.075em]"
              />

              <ImageGrid
                images={secondGridImages}
                className="w-full grid grid-cols-12 grid-rows-6 h-screen lg:h-[150vh] gap-[3vw] lg:gap-[1.5vw] mb-[min(5vw,5rem)]"
              />
            </>
          )}

          {/* Remaining Projects Grid */}
          {remainingProjects.length > 0 && (
            <>
              <TypewriterGSAP
                text="additional projects"
                mainClassName="w-full text-center"
                className="text-[5vw] lg:text-[3vw] py-[5vw] lg:py-10 font-light tracking-[-0.075em]"
              />

              <div
                ref={gridRef}
                className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 py-8"
              >
                {remainingProjects.map((project, index) => (
                  <div
                    key={index + 10}
                    className="group cursor-pointer grid-item relative overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm group-hover:shadow-lg transition-all duration-300 ease-out"
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white text-lg font-semibold drop-shadow-lg">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(PortfolioHyderabad);
