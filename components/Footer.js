import React, { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import localFont from "next/font/local";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const metropolis = localFont({
  src: "../styles/metropolis/METROPOLIS.woff2",
  variable: "--font-metropolis",
});

const Line = memo(({ path, top }) => {
  const borderRef = useRef(null);

  useEffect(() => {
    const border = borderRef.current;
    const children = border.children;

    gsap.fromTo(
      border,
      { width: 0 },
      {
        width: "100%",
        duration: 0.75,
        ease: "Expo.easeOut",
        scrollTrigger: {
          trigger: border,
        },
      }
    );

    gsap.fromTo(
      children,
      { y: -1.5, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "Expo.easeOut",
        stagger: 0.5,
        scrollTrigger: {
          trigger: border,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={borderRef}
      className="w-full transition ease-out duration-500 h-[0.5px] bg-[#51375b] relative flex justify-center items-center"
    >
      <svg
        className={`absolute ${top}`}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path fill="#51375b" d={path}></path>
      </svg>
    </div>
  );
});

Line.displayName = "Line";

const useGSAPAnimation = (ref, triggerOptions = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll("*");
    
    // Ensure elements are visible by default
    gsap.set(elements, { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "top 20%",
        ...triggerOptions,
      },
    });

    tl.fromTo(
      elements,
      { opacity: 1, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
        stagger: 0.04, // Reduced from 0.115 to speed up animation
      }
    );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [ref, triggerOptions]);
};

const LogoText = memo(({ text }) => {
  const logoTextRef = useRef(null);

  const onLogoEnter = () => {
    const currColor = logoTextRef.current.getAttribute("data-color");
    const nextColor =
      currColor === "#FF85A1"
        ? "#76398C"
        : currColor === "#76398C"
        ? "#51375b"
        : "#FF85A1";

    logoTextRef.current.setAttribute("data-color", nextColor);
    gsap.to(logoTextRef.current, {
      color: currColor,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  const onLogoLeave = () => {
    gsap.to(logoTextRef.current, {
      backgroundClip: "text",
      color: "transparent",
      duration: 0.2,
      ease: "power1.out",
    });
  };

  return (
    <text
      data-color="#51375bce"
      ref={logoTextRef}
      onMouseEnter={onLogoEnter}
      onMouseLeave={onLogoLeave}
      className={`${metropolis.className} transition-all duration-300 ease-in-out text-[12.5vw] sm2:text-[9.5vw] md:text-[7vw] leading-none lg:text-[4.5vw] cursor-none text-transparent bg-clip-text bg-gradient-to-r from-[rgba(170,115,52,1)] via-[rgba(208,168,93,1)] to-[rgba(182,128,55,1)]`}
    >
      <Link href="" style={{ cursor: "none" }}>
        {text}
      </Link>
    </text>
  );
});

LogoText.displayName = "LogoText";

const Footer = () => {
  const footerContent = useRef(null);

  const connectItems = [
    { label: "Email", href: "mailto:", value: "mrinal@marqi.in" },
    { label: "Email", href: "mailto:", value: "aman@marqi.in" },
    { label: "Phone", href: "tel:", value: "+91 988-509-5844" },
    { label: "Phone", href: "tel:", value: "+91 986-603-7900" },
    { label: "Dubai Address", href: null, value: "DAMAC Paramount Tower, Marasi Drive, Business Bay, Dubai, UAE" },
    { label: "Hyderabad address", href: null, value: "Rd No 27, Jubilee Hills, Hyderabad, India" },
  ];

  useGSAPAnimation(footerContent);

  return (
    <div className="w-full flex justify-center">
      <div
        ref={footerContent}
        className="w-full flex flex-col justify-center items-center opacity-100"
      >
        <Line path="M7 10l5 5 5-5H7z" top="-top-[9.65px]" />
        <div className="w-full flex flex-col md:flex-row">
          <div className="py-10 md:py-14 text-[#51375b] text-opacity-90 uppercase font-semibold justify-between px-4 md:px-10 text-[2.75vw] md:text-[1vw] w-full md:w-1/3 flex flex-col items-center md:items-start gap-3 md:gap-6">
            <text>Connect</text>
            <div className="font-semibold flex flex-col items-center md:items-start text-[#51375b] text-opacity-90">
              {connectItems.map((item, index) => (
                <text key={index}>
                  {item.label}{" "}
                  {item.href ? (
                    <a href={`${item.href}${item.value}`}>
                      <span className="text-[#51375b8d] transition-all duration-500 cursor-pointer ease-in-out hover:text-[#51375b]">
                        {item.value}
                      </span>
                    </a>
                  ) : (
                    <span className="text-[#51375b8d]">
                      {item.value}
                    </span>
                  )}
                </text>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-4 items-center justify-center">
            <LogoText text="MARQI" />
          </div>
          <div className="w-full md:w-1/3 py-10 md:pt-14 flex flex-col justify-center items-center md:items-end px-4 md:px-10 gap-8 md:gap-[min(3vw,2.85rem)]">
            <div className="w-full flex flex-col uppercase text-[2.75vw] md:text-[1vw] font-semibold items-center md:items-end">
              <div className="text-[#51375b] text-opacity-90">
                Follow us on
                <a
                  href="https://www.instagram.com/marqi.design/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#51375b8d] transition-colors duration-200 hover:text-[#51375b] ml-1"
                >
                  Instagram
                </a>
              </div>
              <div className="text-[#51375b] text-opacity-90">
                Site by <span className="text-[#51375b8d]">OA</span>
              </div>
            </div>
            <div className="uppercase text-[2.75vw] md:text-[1vw] font-semibold text-[#51375b] text-opacity-90">
              COPYRIGHT 2026 © MARQI 
            </div>
          </div>
        </div>
        <Line path="M7 14l5-5 5 5H7z" top="-top-[13.5px]" />
      </div>
    </div>
  );
};

export default memo(Footer);
