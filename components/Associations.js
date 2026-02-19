import React, { useState, useEffect, useRef, useCallback } from "react";
import localFont from "next/font/local";
import gsap from "gsap";

const calming = localFont({
  src: "../styles/calming/Calming-Regular.woff2",
  variable: "--font-calming",
});

// Array of slide data
const slides = [
  { title: "Amazon", imgSrc: "1.jpg" },
  { title: "Microsoft", imgSrc: "2.jpg" },
  { title: "Google", imgSrc: "3.jpg" },
  { title: "Phoenix", imgSrc: "4.jpg" },
  { title: "MEIL", imgSrc: "5.jpg" },
  { title: "Hotel Avasa", imgSrc: "6.jpg" },
  { title: "Lemon Tree", imgSrc: "7.jpg" },
  { title: "Amazon", imgSrc: "1.jpg" },
  { title: "Microsoft", imgSrc: "2.jpg" },
];

const Associations = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const totalSlides = 7;
  const imgTopRef = useRef(null);
  const imgBottomRef = useRef(null);
  const slideTitlesRef = useRef(null);

  const updateActiveSlide = useCallback(() => {
    const titles = slideTitlesRef.current?.querySelectorAll(".title");
    titles?.forEach((el, index) => {
      if (index === currentIndex) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }, [currentIndex]);

  const trimExcessImages = useCallback(() => {
    [imgTopRef, imgBottomRef].forEach((ref) => {
      const container = ref.current;
      if (!container) return;
      const images = Array.from(container.querySelectorAll("img"));
      const excessCount = images.length - 5;
      if (excessCount > 0) {
        images
          .slice(0, excessCount)
          .forEach((image) => container.removeChild(image));
      }
    });
  }, []);

  const updateImages = useCallback(
    (imgNumber) => {
      const imgSrc = `/final-media/associations/${imgNumber}.jpg`;
      const createImage = () => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
        img.style.transform = "scale(2)";
        return img;
      };

      const imgTop = createImage();
      const imgBottom = createImage();

      imgTopRef.current?.appendChild(imgTop);
      imgBottomRef.current?.appendChild(imgBottom);

      gsap.to([imgTop, imgBottom], {
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
        transform: "scale(1)",
        duration: 2,
        ease: "power4.out",
        stagger: 0.15,
        onComplete: trimExcessImages,
      });
    },
    [trimExcessImages]
  );

  const handleSlider = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalSlides ? prevIndex + 1 : 1
    );
  }, [totalSlides]);

  useEffect(() => {
    updateActiveSlide();
    updateImages(currentIndex + 1);

    gsap.to(slideTitlesRef.current, {
      x: `-${(currentIndex - 1) * 11.1111}%`,
      duration: 2,
      ease: "power4.out",
    });
  }, [currentIndex, updateActiveSlide, updateImages]);

  useEffect(() => {
    updateImages(2);
    updateActiveSlide();
  }, []);

  return (
    <div
      className={`slider ${calming.className} w-screen h-screen relative`}
      onClick={handleSlider}
    >
      <div
        ref={slideTitlesRef}
        className="slide-titles absolute top-0 left-0 w-[300vw] h-screen flex pointer-events-none z-[2]"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`title flex-1 w-full h-full flex items-center justify-center ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <h1 className="text-center text-[min(7.825vw,25px)] md:text-[min(2.075vw,30px)] font-normal text-white/20 opacity-0 md:opacity-100 transition-color-opacity duration-25 ease">
              {slide.title}
            </h1>
          </div>
        ))}
      </div>
      <div className="slide-images w-[90vw] h-[70vh] md:w-[min(70vw,1000px)] md:h-[min(50vw,650px)] absolute top-1/2 left-1/2 opacity-75 z-[1]">
        <div ref={imgTopRef} className="img-top w-full h-full absolute"></div>
        <div
          ref={imgBottomRef}
          className="img-bottom w-full h-full absolute"
        ></div>
      </div>
    </div>
  );
};

export default Associations;
