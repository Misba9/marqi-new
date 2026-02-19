import Head from "next/head";
import localFont from "next/font/local";
import { gsap } from "gsap";
import { useEffect, useRef, useMemo, useState } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metropolis = localFont({
  src: "../styles/metropolis/METROPOLIS.woff2",
  variable: "--font-metropolis",
});

const contactItems = [
  {
    label: "Email",
    labelClassname: "text-[#fcf3ff7e]",
    href: "mailto:",
    value1: "aman@thehillsglobal.com",
    value2: "mrinal@thehillsglobal.com",
    valueClassName: "uppercase",
  },
  {
    label: "Phone",
    labelClassname: "text-[#fcf3ff7e]",
    href: "tel:",
    value1: "+91 988-509-5844",
    value2: "+91 986-603-7900",
    valueClassName: "",
  },
  {
    label: "Send us a message",
    labelClassname: "text-[#fcf3ff] ",
    valueClassName: "normal-case",
  },
];

const useGSAPAnimation = (ref) => {
  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "top 20%",
      },
    });

    tl.fromTo(
      ref.current.querySelectorAll("*"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.125,
      }
    );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [ref]);
};

const ContactItem = ({ item }) => (
  <div className="flex flex-col gap-[0.65vw] text-center md:text-left w-full text-[2.5vw] md:text-[0.85vw] text-[#fcf3ff]">
    <text className={`font-semibold uppercase ${item.labelClassname}`}>
      {item.label}
    </text>
    <text className={item.valueClassName}>
      <a href={`${item.href}${item.value1}`}>{item.value1}</a>
      <br />
      <a href={`${item.href}${item.value2}`}>{item.value2}</a>
    </text>
  </div>
);

const ContactButton = () => (
  <a href="mailto:info@marqi-associates.com">
    <button className="view border-[1.5px] border-[rgba(208,168,93,1)] w-12 h-12 md:w-11 md:h-11 group relative cursor-pointer overflow-hidden rounded-full flex justify-center items-center">
      <span className="inline-block p-1 transition duration-500 ease-out group-hover:translate-x-[120%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          width={30}
          height={30}
          viewBox="0 0 31 32"
          id="right-arrow"
        >
          <path
            fill="rgba(208,168,93,1)"
            d="M23.5 17h-16a1 1 0 0 1 0-2h13.59l-1.3-1.29a1 1 0 0 1 1.42-1.42l3 3a1 1 0 0 1 .21 1.09 1 1 0 0 1-.92.62Z"
          ></path>
          <path
            fill="rgba(208,168,93,1)"
            d="M20.5 20a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42l3-3a1 1 0 0 1 1.42 1.42l-3 3a1 1 0 0 1-.71.29Z"
          ></path>
        </svg>
      </span>
      <span className="absolute inline-block -translate-x-[120%] text-white p-1 transition duration-500 ease-out group-hover:translate-x-0 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 31 32"
          width={30}
          height={30}
          id="right-arrow"
        >
          <path
            fill="rgba(208,168,93,1)"
            d="M23.5 17h-16a1 1 0 0 1 0-2h13.59l-1.3-1.29a1 1 0 0 1 1.42-1.42l3 3a1 1 0 0 1 .21 1.09 1 1 0 0 1-.92.62Z"
          ></path>
          <path
            fill="rgba(208,168,93,1)"
            d="M20.5 20a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42l3-3a1 1 0 0 1 1.42 1.42l-3 3a1 1 0 0 1-.71.29Z"
          ></path>
        </svg>
      </span>
    </button>
  </a>
);

const Contact = () => {
  const contentRef = useRef(null);
  const [message, setMessage] = useState("");

  useGSAPAnimation(contentRef);

  const memoizedContactItems = useMemo(
    () =>
      contactItems
        .filter((item) => item.label !== "Send us a message")
        .map((item, index) => <ContactItem key={index} item={item} />),
    []
  );

  const sendMessageItem = useMemo(
    () => contactItems.find((item) => item.label === "Send us a message"),
    []
  );

  return (
    <>
      <Head>
        <title>Contact Us - Your Interior Design</title>
      </Head>

      <div className="w-full min-h-screen bg-[#51357B] flex items-center justify-center">
        <div
          ref={contentRef}
          className="w-full md:w-[97.5%] my-[10vw] md:my-0 flex flex-col md:flex-row items-center justify-center uppercase gap-[10vw] md:gap-0"
        >
          <text
            className={`${metropolis.className} w-full md:w-[75%] text-center tracking-[-3.5vw] md:tracking-[-2vw] text-[28vw] leading-[24vw] md:text-[22vw] md:leading-[16vw] md:h-[35vw] text-transparent bg-clip-text bg-gradient-to-r from-[rgba(170,115,52,1)] via-[rgba(208,168,93,1)] to-[rgba(182,128,55,1)]`}
          >
            Get in touch
          </text>
          <div className="w-[60%] md:w-[25%] flex flex-col items-center md:items-start justify-center gap-[4vw] md:gap-[2.5vw]">
            {memoizedContactItems}
            <div className="flex flex-col w-full gap-[0.65vw] text-center md:text-left text-[2.5vw] md:text-[0.85vw] text-[#fcf3ff]">
              <text className={`font-semibold uppercase ${sendMessageItem.labelClassname}`}>
                {sendMessageItem.label}
              </text>
              <textarea
                rows="2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="To discuss your project in further detail, or for information about our services."
                className="w-full placeholder:text-base placeholder:text-[#9a98a0db] focus:outline-none p-2 border-b-[1.5px] text-[#929197] text-base border-[rgba(208,168,93,1)] bg-transparent min-h-[3rem] transition-colors duration-300 focus:border-[rgba(208,168,93,1)] resize-none"
              />
            </div>
            <div className="w-full flex justify-center md:justify-start mt-[2vw] md:mt-[1.5vw]">
              <ContactButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

