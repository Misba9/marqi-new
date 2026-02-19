import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import { useGSAPAnimations } from "hooks/useGSAPAnimations";

const services = [
  // {
  //   titleOne: "Proprietà",
  //   titleTwo: "Property",
  //   src: "final-media/main/services/property.jpg",
  //   phrase: "Crafting your haven, brick by dream.",
  // },
  {
    titleOne: "Disegni",
    titleTwo: "Design",
    src: "final-media/main/services/design.png",
    phrase: "Curating experiences, one detail at a time.",
  },
  {
    titleOne: "constructum",
    titleTwo: "build",
    src: "final-media/main/services/build.png",
    phrase: "Building strong foundations with quality materiae.",
  },
  {
    titleOne: "Materia",
    titleTwo: "Materials ",
    src: "final-media/main/services/materials.png",
    phrase: "Quality materials for reliable construction.",
  },
];

const Service = () => {
  const [selectedService, setSelectedService] = useState(0);
  const imageContainerRef = useRef(null);
  const phraseRef = useRef(null);
  const borderRefs = useRef(services.map(() => React.createRef()));

  const handleServiceHover = useCallback((index) => {
    setSelectedService(index);
  }, []);

  // Use GSAP animations from custom hook
  useGSAPAnimations(imageContainerRef, phraseRef);

  // Memoize the services list rendering
  const servicesList = useMemo(
    () =>
      services.map((service, index) => (
        <div
          ref={borderRefs.current[index]}
          onMouseEnter={() => handleServiceHover(index)}
          key={`service_${index}`}
          className="w-full flex justify-center sm2:justify-end leading-[1.75] border-t border-[#51375b] cursor-pointer opacity-80 hover:opacity-100 lg:hover:scale-[.99] transition ease-in duration-[325ms] text-[#51375ba9] serviceslist"
        >
          <p className="text-[5.25vw] sm2:text-[4.75vw] lg:text-[2.85vw] uppercase font-semibold m-0">
            {service.titleOne} e{" "}
            <span className="text-[#51375b]">{service.titleTwo}</span>
          </p>
        </div>
      )),
    [handleServiceHover]
  );

  return (
    <div className="w-full flex justify-center items-center my-[5vw] p-0">
      <div className="w-[95%] sm2:w-[90%] lg:w-[85%] flex flex-col justify-center gap-[5vw] lg:gap-[3vw]">
        <div className="w-full flex gap-[7.5vw]">
          <div
            ref={imageContainerRef}
            className="w-full lg:w-[30%] h-[55vw] lg:h-[33vw] z-[2]"
          >
            <Image
              className="w-full h-full object-cover brightness-[0.85] transition-all duration-500 ease-in-out"
              src={`/${services[selectedService].src}`}
              width={1000}
              height={1000}
              quality={100}
              priority={true}
              alt={`${services[selectedService].titleTwo} Service`}
            />
          </div>
          <p
            ref={phraseRef}
            className="w-[61%] min-h-full text-[#51375b] hidden lg:flex justify-center items-center font-semibold text-[2vw] z-0"
          >
            {services[selectedService].phrase}
          </p>
        </div>
        <div className="w-full flex flex-col justify-end">{servicesList}</div>
      </div>
    </div>
  );
};

export default React.memo(Service);
