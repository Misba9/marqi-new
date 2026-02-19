import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const International = () => {
  const imageparent = useRef(null);
  const image = useRef(null);

  const images = [
    "/webp/international/1.webp",
    "/webp/international/1-32.webp",
    "/webp/international/1-38.webp",
    "/webp/international/1-43.webp",
  ];

  // const [currentSlide, setCurrentSlide] = useState(0);
  // const colors = [
  //   { image: "/webp/international/1.webp" },
  //   { image: "/webp/international/2.webp" },
  //   { image: "/webp/international/3.webp" },
  //   { image: "/webp/international/4.webp" },
  // ];

  // const timeoutRef = useRef(null);

  // function resetTimeout() {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }
  // }

  // useEffect(() => {
  //   timeoutRef.current = setTimeout(() => {
  //     setCurrentSlide((prevSlide) =>
  //       prevSlide === colors.length - 1 ? 0 : prevSlide + 1
  //     );
  //   }, 2000);
  //   return () => {
  //     resetTimeout();
  //   };
  // }, [currentSlide]);

  // useEffect(() => {
  //   gsap.fromTo(
  //     imageparent.current,
  //     {
  //       scale: 0.3,
  //     },
  //     {
  //       display: "block",
  //       scale: 1,
  //       duration: 2.5,
  //       ease: "Expo.easeOut",
  //       delay: 0.1,
  //     }
  //   );
  //   gsap.fromTo(
  //     image.current,
  //     {
  //       scale: 4,
  //     },
  //     {
  //       display: "block",
  //       opacity: 0.7,
  //       scale: 1,
  //       duration: 2.5,
  //       ease: "Expo.easeOut",
  //       delay: 0.1,
  //     }
  //   );
  // }, []);

  return (
    <>
      {/* <div */}
      {/* // ref={imageparent} */}
      {/* className="mt-[-0.8rem] h-[100vh] object-cover overflow-hidden"
      > */}
      {/* <img
          // ref={image}
          alt=""
          className="  opacity-70 w-full base:h-[60vh]  px-[1%]   lg:h-full object-cover scale-150 "
          src="/webp/international/2.webp"
        /> */}
      {/* </div> */}

      {/* <div className="slideshow  overflow-hidden h-fit lg:h-[90vh] w-full ">
        <div
          className="slideshowSlider whitespace-nowrap w-full mt-[-0.8rem] h-full object-cover overflow-hidden"
          style={{
            transform: `translate3d(${-currentSlide * 100}%, 0, 0)`,
          }}
        >
          {colors.map((image, index) => {
            return (
              <div
                className={`slide inline-block h-full w-full ${
                  index === currentSlide ? "active" : ""
                }`}
                key={index}
              >
                <img
                  // ref={image}
                  src={image.image}
                  alt={`Slide ${index + 1}`}
                  className="  opacity-70 w-full base:h-[60vh]  px-[1%]   lg:h-full object-cover scale-150 "
                />
              </div>
            );
          })}
        </div>
      </div> */}

      {/* <div
        // ref={imageparent}
        className="    w-full mt-[-0.5vw] lg:mt-[-0.8rem] h-fit lg:h-[100vh] lg:px-[0.5%] object-cover overflow-hidden"
      >
        <div
          // ref={image}
          className="slideshowSlider whitespace-nowrap lg:h-full w-full  "
          style={{
            transform: `translate3d(${-currentSlide * 100}%, 0, 0)`,
          }}
        >
          {colors.map((image, index) => {
            return (
              <div
                className={`slide inline-block h-full w-full ${
                  index === currentSlide ? "active" : ""
                }`}
                key={index}
              >
                <img
                  src={image.image}
                  className=" whitespace-pre-wrap opacity-100 w-full base:h-[55vh] lg:h-full object-cover scale-150"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            );
          })}
        </div>
        {/* <div className="slideshowDots absolute text-center flex bottom-4 gap-1 left-[50%] ">
          {colors.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot inline-block  h-2 w-2 rounded-[50%] cursor-pointer  bg-[#64748B] ${
                currentSlide === idx ? " active" : ""
              }`}
              onClick={() => {
                setCurrentSlide(idx);
              }}
            ></div>
          ))}
        </div> */}
      {/* </div> */}

      <div className="h-screen relative overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default International;
