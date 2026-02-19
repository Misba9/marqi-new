import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { Source_Sans_3 } from "next/font/google";
import Image from "next/image";
import logo from "/public/marqi-logo.png";
import { useRouter } from "next/router";

// Local font imports
const metropolis = localFont({
  src: "../styles/metropolis/METROPOLIS.woff2",
  variable: "--font-metropolis",
});

const sourcesans = Source_Sans_3({ subsets: ["latin"] });

// Navigation links
const links = [
  { title: "main", href: "/" },
  { title: "about", href: "/about" },
  { title: "portfolio", href: "/projects/portfolio" },
  {
    title: "projects",
    subLink: true,
    subTitle: [
      { title: "associations", href: "/projects/associations" },
      { title: "coral gables", href: "/projects/coral-gables" },
    ],
  },
  { title: "repertoires", href: "/repertoires" },
  { title: "contact", href: "/contact" },
];

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [nav, setNav] = useState(false);
  const submenuRef = useRef(null);
  const mobileNav = useRef(null);
  const associate = useRef(null);
  const desktopNav = useRef(null);
  const svg = useRef(null);

  const isSpecialRoute = useMemo(() => {
    return (
      router.asPath === "/" ||
      router.asPath === "/contact" ||
      router.asPath === "/projects/associations"
    );
  }, [router.asPath]);

  const handleClickOutside = useCallback((event) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleClick = useCallback((event, link) => {
    if (link.subLink) {
      event.preventDefault();
      setOpen((prevOpen) => !prevOpen);
    }
  }, []);

  const handleSubLinkClick = useCallback((event, isMobile) => {
    if (!isMobile) {
      event.stopPropagation(); // Prevent the click from bubbling up to the parent link
    } else {
      setOpen(false); // Close the dropdown on mobile
    }
  }, []);
  const toggleNav = useCallback(() => {
    setNav((prevNav) => !prevNav);
  }, []);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top+=200",
          end: "+=1",
          toggleActions: "play none none reverse",
          scrub: 2,
        },
      });

      if (nav) {
        gsap.to(mobileNav.current, { y: 0, opacity: 1, duration: 0.45 });
      } else {
        gsap.to(mobileNav.current, { y: "-100vh", duration: 0.45 });
      }

      gsap.set(".nav-bg", { backgroundColor: "#FCF3FF", opacity: 0 });
      gsap.set(svg.current, { yPercent: -101 });
      gsap.set(".hamburger-color-onAnimation", {
        color: nav ? "#51375b" : isSpecialRoute ? "#fcf3ff" : "#51375b",
      });

      tl.to(".nav-bg", { opacity: 1 })
        .to(".desktop-nav-text", { color: "#51375b" })
        .to(associate.current, { color: "#51375b" }, "<")
        .to(svg.current, { yPercent: 0, rotate: 0 }, "<")
        .to(desktopNav.current, { x: -35 }, "<")
        .to(".hamburger-color-onAnimation", { color: "#51375b" });
    };

    loadGSAP();
  }, [nav, isSpecialRoute]);

  const renderNavLinks = useCallback(
    (mobile = false) => {
      return links.map((link, index) => (
        <div key={index} className={mobile ? "w-full" : "w-fit"}>
          <div className="w-full text-left cursor-pointer leading-none">
            <li
              className={
                mobile ? "w-full border-b border-[#51375b52] py-[3vw]" : ""
              }
            >
              <Link
                href={link.href || "/"}
                className={`${
                  mobile
                    ? "text-[min(8vw,1.25rem)] w-full leading-loose flex items-center text-[#51375b]"
                    : `text-[min(0.9375vw,1.125rem)] inline-block ${
                        isSpecialRoute
                          ? "text-[#fcf3ffb8] hover:text-[#fcf3ff]"
                          : "text-[#51375b] hover:text-[#51375bae]"
                      } desktop-nav-text`
                } font-semibold transition-all duration-500 ease-out`}
                onClick={(e) => handleClick(e, link)}
              >
                {link.title}
              </Link>
            </li>
            {link.subLink && (mobile ? true : open) && (
              <div ref={submenuRef}>
                <div
                  className={`${
                    mobile
                      ? "bg-[#fcf3ff] w-full p-2 pl-4 mt-2"
                      : `${
                          isSpecialRoute ? "bg-[#fcf3ff]" : "bg-[#d3c2dae7]"
                        } p-3 absolute block mt-2`
                  } transition-all duration-500 ease-out`}
                >
                  {link.subTitle.map((sublink, subIndex) => (
                    <div key={subIndex}>
                      <Link
                        href={sublink.href || "/"}
                        className={`${
                          mobile
                            ? "text-[min(5vw,1.05rem)] w-full leading-loose text-[#51375b80] hover:text-[#51375b]"
                            : "text-sm font-semibold text-[#51375b80] leading-normal hover:text-[#51375b]"
                        } transition-all duration-500 z-[4] ease-out`}
                        onClick={(e) => handleSubLinkClick(e, mobile)}
                      >
                        {sublink.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ));
    },
    [open, isSpecialRoute, handleClick, handleSubLinkClick]
  );

  return (
    <nav className="w-full fixed top-0 left-0 z-[3]">
      <div className="relative w-full flex items-center justify-between font-medium bg-transparent">
        {/* Marqi Logo */}
        <div className="pl-[1%] py-[2%] transition-all duration-500 z-[4] md:py-[0.5%] flex items-center gap-4">
          <Link rel="preload" href="/" className="cursor-pointer">
            <Image
              src={logo}
              alt="Marqi Logo"
              priority
              className="h-[9.25vw] sm2:h-[5vw] md:h-[4.40vw] w-auto object-contain"
            />
          </Link>
          {/* Brand Text Block */}
          <div className="flex flex-col leading-tight">
            <span
              className={`${metropolis.className} metropolis font-semibold tracking-[0.20em] text-[1.7rem] md:text-[3.15vw] text-[transparent] bg-clip-text bg-gradient-to-r from-[rgba(170,115,52,1)] via-[rgba(208,168,93,1)] to-[rgba(182,128,55,1)] uppercase`}
            >
              MARQI
            </span>
            <span
              ref={associate}
              className={`${sourcesans.className} sourcesans ${
                isSpecialRoute ? "text-[#fcf3ff]" : "text-[#51375b]"
              } text-[0.35rem] md:text-[0.65rem] tracking-[0.25em] uppercase opacity-70 mix-blend-difference`}
  >
              Design | Build | Materials
            </span>
          </div>
        </div>
        {/* Hamburger Menu */}
        <div
          className="pr-[0.75%] z-[4] text-[#51375b] md:hidden text-[8vw] flex justify-center items-center hover:cursor-pointer transition-all duration-500 ease-out hamburger-color-onAnimation"
          onClick={toggleNav}
        >
          <ion-icon name={`${nav ? "close-sharp" : "menu-sharp"}`}></ion-icon>
        </div>
        {/* Desktop Navbar */}
        <div className="pr-[1%] relative md:flex hidden items-center">
          <ul ref={desktopNav} className="flex uppercase items-center gap-3">
            {renderNavLinks()}
          </ul>
          <div className="text-[#51375b] text-[1.65vw] absolute right-6 lg:right-5 flex items-center justify-center overflow-hidden cursor-pointer">
            <div
              ref={svg}
              className="svg flex items-center rotate-180 justify-center"
            >
              <ion-icon name="caret-up-circle-sharp"></ion-icon>
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <ul
          ref={mobileNav}
          className={`px-[1%] pt-[20vh] md:hidden z-[-1] absolute w-full h-screen top-0 bg-[#fcf3ff] uppercase duration-300 transition-all -translate-y-full ${
            nav ? "block" : "hidden"
          }`}
        >
          {renderNavLinks(true)}
        </ul>
      </div>
      <div className="absolute z-[-1] w-full h-full top-0 left-0 nav-bg"></div>
    </nav>
  );
};

export default React.memo(Navbar);
