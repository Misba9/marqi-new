import React, {
  useEffect,
  useRef,
  forwardRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { gsap } from "gsap";
import Image from "next/image";
import localFont from "next/font/local";
import SplitType from "split-type";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import dynamic from "next/dynamic";
import { debounce } from "lodash";
import founder1Image from "../public/final-media/about/1.jpg";
import founder2Image from "../public/final-media/about/2.jpg";
import useLineByLine from "hooks/LineByLine";

const TypewriterGSAP = dynamic(
  () => import("./ReusableComponents/TypewriterGSAP"),
  {
    ssr: false,
  }
);

gsap.registerPlugin(ScrollTrigger);

const calming = localFont({
  src: "../styles/calming/Calming-Regular.woff2",
  variable: "--font-calming",
});

const founders = [
  {
    name: "Aman Muqeet",
    image: founder1Image,
    gap: "gap-[7vw]",
    left: "-left-[10vw]",
    description:
      "Aman is a highly proficient Civil Engineer who possesses a Master's degree in Construction Management from Florida International University located in Miami. He has gained valuable experience by contributing to renowned undertakings like the St. Regis Bal Harbour and the Faena District situated in Miami Beach. Aman's specialization revolves around supervising extensive construction ventures and ensuring their seamless implementation throughout the entire process. His profound comprehension of Construction Management greatly enhances any team or collaboration within the industry, making him an invaluable asset.",
  },
  {
    name: "Mrinal Didige",
    image: founder2Image,
    gap: "gap-[2.5vw]",
    left: "-left-[5vw]",
    description:
      "Mrinal, a serial entrepreneur with close to two decades of experience in launching, running and successfully exiting businesses in diverse industries and markets, having started and ran four different companies thus far. An innovator and an individual with exceptional achievements, his passion and strength lies in leveraging emerging technologies including in the field of real estate development to drive business impact. Further, Mrinal holds an MBA degree from INSEAD business school, France. Possessing extensive expertise in international business and having dealt with companies right from China to Silicon Valley, USA, he brings a vast amount of knowledge and experience to the discussion, besides the deep experience of the Global market which he learnt from ground up. Mrinal's proficiency in these domains positions him as a valuable asset who can adeptly handle the intricacies of various markets and business cycles, to achieve business triumph.",
  },
];

const useGSAPAnimation = (ref, triggerOptions = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const textElements = Array.from(
      ref.current.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6")
    );
    const allChildren = Array.from(ref.current.children);
    const otherElements = allChildren.filter(
      (child) => !textElements.includes(child)
    );

    const animations = [];

    textElements.forEach((element) => {
      const splitDesc = new SplitType(element, { types: "lines" });
      animations.push(
        gsap.fromTo(
          splitDesc.lines,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.125,
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: "top 70%",
              end: "bottom 30%",
            },
          }
        )
      );
    });

    animations.push(
      gsap.fromTo(
        otherElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.125,
          duration: 1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 30%",
          },
        }
      )
    );

    return () => {
      animations.forEach((anim) => anim.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [ref, triggerOptions]);
};

const FoundersSection = React.memo(() => {
  const sectionRef = useRef(null);
  const [currentFounder, setCurrentFounder] = useState(0);

  const handleScroll = useCallback(
    debounce((self) => {
      const progress = self.progress.toFixed(2);
      setCurrentFounder(progress >= 0.5 ? 1 : 0);
    }),
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const navbarHeight = 36;

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: `top top+=${navbarHeight}`,
      end: "bottom+=200% bottom",
      pin: true,
      scrub: 1,
      toggleActions: "play none none reverse",
      onUpdate: handleScroll,
    });

    return () => {
      scrollTrigger.kill();
      handleScroll.cancel();
    };
  }, [handleScroll]);

  useEffect(() => {
    const imageWrapper = sectionRef.current.querySelector(".image-wrapper");
    const revealMask = imageWrapper.querySelector(".reveal-mask");
    const description = sectionRef.current.querySelector(
      ".founder-description"
    );

    const tl = gsap.timeline();
    tl.fromTo(
      revealMask,
      { x: "0%" },
      { x: "-100%", duration: 1, ease: "power2.inOut" }
    ).fromTo(
      description,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 1 },
      "<"
    );

    return () => {
      tl.kill();
    };
  }, [currentFounder]);

  const founderText1 = useRef(null);
  const founderText2 = useRef(null);
  useLineByLine(founderText1);
  useLineByLine(founderText2);

  const currentFounderData = founders[currentFounder];

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full h-screen hidden lg:flex items-center justify-center bg-[#51375b]"
      >
        <div className="flex w-[80%] items-center justify-between relative">
          <div className="w-[28%] rounded-full flex-shrink-0 relative image-wrapper overflow-hidden">
            <div className="absolute inset-0 z-20 reveal-mask bg-[#fcf3ff]"></div>
            <div className="relative inset-0 z-10">
              <Image
                src={currentFounderData.image}
                alt={currentFounderData.name}
                className="founder-image h-[50vh] rounded-full border-[12.5px] border-[#FCF3FF] object-cover"
              />
            </div>
          </div>
          <div
            className={`flex flex-col justify-center items-end h-[60vh] relative w-[70%] ${currentFounderData.gap} text-[#fcf3ff]`}
          >
            <TypewriterGSAP
              mainClassName="relative w-fit z-10"
              className="founder-name text-[transparent] bg-clip-text bg-gradient-to-r from-[rgba(170,115,52,1)] via-[rgba(208,168,93,1)] to-[rgba(182,128,55,1)] font-medium md:min-w-[50vw] text-[12vw] md:text-[10vw] lg:text-[7.75vw] md:leading-[12vw]"
              text={currentFounderData.name}
            />
            <p className="founder-description text-[0.9vw] text-start w-[85%]">
              {currentFounderData.description}
            </p>
          </div>
        </div>
      </section>
      <div className="w-full h-full m-0 p-0 py-[10vw] flex items-center justify-center flex-col lg:hidden gap-[5vw] bg-[#51375b]">
        {founders.map((founder, index) => (
          <div
            key={founder.name}
            className="w-full h-full flex items-center justify-center flex-col gap-[5vw]"
          >
            <Image
              src={founder.image}
              alt={founder.name}
              width={8000}
              height={4500}
              className="h-[45vh] w-[90%] place-self-start object-cover"
            />
            <TypewriterGSAP
              mainClassName="w-[80%]"
              className="founder-name text-[transparent] bg-clip-text bg-gradient-to-r from-[rgba(170,115,52,1)] via-[rgba(208,168,93,1)] to-[rgba(182,128,55,1)] font-medium md:min-w-[50vw] text-[12vw] md:text-[10vw] lg:text-[7.75vw] md:leading-[12vw]"
              text={founder.name}
            />
            <p
              ref={index === 0 ? founderText1 : founderText2}
              className="text-[#fcf3ff] w-[82.55%] text-[2.75vw]"
            >
              {founder.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
});

FoundersSection.displayName = "FoundersSection";

const AboutContent = React.memo(
  forwardRef(
    (
      {
        title1,
        title2,
        title3,
        titlePositionStyle,
        titleDirectionStyle,
        titleContent1,
        extraContent1Style,
        extraContent1,
        image,
        imageStyle,
      },
      ref
    ) => {
      const internalRef = useRef(null);
      const resolvedRef = ref || internalRef;

      useGSAPAnimation(resolvedRef);

      return (
        <section
          ref={resolvedRef}
          className={`w-full h-full m-0 p-0 my-[15vw] lg:my-[3vw] lg:mt-[7.5vw] flex items-center justify-center flex-col gap-[5vw] lg:gap-[1vw]`}
        >
          <div
            className={`w-full lg:w-[97.75%] h-fit lg:h-[90vh] flex flex-col items-center relative gap-[40vw] sm:gap-[30vw]`}
          >
            <div
              className={`flex w-full justify-center relative ${titlePositionStyle}`}
            >
              <h2
                className={`text-[10vw] lg:text-[6.75vw] relative leading-none ${calming.className} tracking-tight text-[#51375b] z-[1] ${titleDirectionStyle}`}
              >
                <span className="right-0 absolute">{title1},</span>
                <br />
                <span>{title2},</span>
                <br />
                <span className="text-[transparent] bg-clip-text bg-gradient-to-r from-[rgba(170,115,52,1)] via-[rgba(208,168,93,1)] to-[rgba(182,128,55,1)]">
                  {title3}
                </span>
              </h2>
              <p className="text-[#51375bd1] w-[30%] font-medium text-[1vw] hidden lg:block">
                {titleContent1}
              </p>
            </div>
            <Image
              src={image}
              alt="About Us"
              width={8000}
              height={4500}
              className={`h-[20vh] sm2:h-[35vh] lg:h-[45vh] w-[90%] absolute top-[24vw] sm2:top-[23.775vw] lg:top-[16.125vw] object-cover z-[-1] ${imageStyle}`}
            />
            <p className="text-[#51375bd1] w-[90%] font-medium text-[2.75vw] lg:hidden block">
              {titleContent1}
            </p>
          </div>
          <p
            className={`text-[#51375bd1] w-[90%] lg:w-[80%] font-medium text-[2.75vw] lg:text-[1vw] ${extraContent1Style}`}
          >
            {extraContent1}
          </p>
        </section>
      );
    }
  )
);

AboutContent.displayName = "AboutContent";

const About = () => {
  const firstContentRef = useRef(null);
  const secondContentRef = useRef(null);
  const screenStandard = useRef(null);
  useLineByLine(screenStandard);

  const aboutContentProps = useMemo(
    () => [
      {
        title1: "EXPERIENCE",
        title2: "TECHNOLOGY",
        title3: "DESIGN",
        titleContent1:
          "We are a passionate group of professionals dedicated to designing and constructing exquisite and sustainable environments Our team brings together extensive global expertise of 40+ years and collaborates with cutting-edge international partners to create luxurious properties that are built to withstand the test of time.",
        titlePositionStyle: "gap-[5vw] lg:right-28",
        titleDirectionStyle: "-left-[15.75vw] lg:left-0",
        image: "/final-media/about/3.jpg",
        imageStyle: "right-0 lg:-right-[1.0945vw]",
        extraContent1Style: "hidden",
        extraContent1: "",
        ref: firstContentRef,
      },
      {
        title1: "BUILDING",
        title2: "ARCHITECTURAL",
        title3: "INTERIOR",
        titleContent1:
          "By paying meticulous attention to every detail and utilizing high-quality finishes, we strive to establish a new benchmark for excellence in the Global market. Our unwavering commitment to perfection drives us to constantly surpass expectations and redefine the standards of quality.",
        titlePositionStyle: "gap-[7vw] flex-row-reverse",
        titleDirectionStyle: "-right-[12.5vw] lg:right-0",
        image: "/final-media/about/4.jpg",
        imageStyle: "left-0 lg:-left-[1.1vw]",
        extraContent1Style: "block",
        extraContent1:
          "We exclusively employ top-tier materials and collaborate with trusted suppliers to ensure that every aspect of our properties adheres to our rigorous standards. You can rest assured knowing that your home is constructed with the utmost commitment to excellence, ensuring superior quality.",
        ref: secondContentRef,
      },
    ],
    []
  );

  return (
    <div className="overflow-hidden">
      {aboutContentProps.map((props, index) => (
        <AboutContent key={index} {...props} />
      ))}
      {/* <div className="w-full lg:h-screen flex flex-col items-center justify-center bg-[#51375b]">
        <div className="w-[85%] lg:w-[80%] pt-[15vw] lg:pt-0">
          <h2
            ref={screenStandard}
            className={`screen-standard flex flex-wrap lg:block text-[7.5vw] w-full h-full lg:text-[7.5vw] leading-[0.825] ${calming.className} tracking-tight uppercase text-[#fcf3ff] z-[1]`}
          >
            Setting 
            <br className="hidden lg:block" /> Standards{" "}
            <br className="hidden lg:block" /> In Luxury{" "}
            <br className="hidden lg:block" /> Design
          </h2>
        </div>
      </div> */}
      {/* <FoundersSection /> */}
    </div>
  );
};

export default About;
