import { useRouter } from "next/router";
import React from "react";

const Heading = ({ title }) => {
  const router = useRouter();
  return (
    <div
      className={
        router.pathname === "/projects/coral"
          ? " base:text-[1.2rem] leading-none lg:text-[2vw] font-semibold text-[#51375bce]  mt-[1vw] lg:mt-[2vw] "
          : " base:text-[4.5vw] leading-none lg:text-[2vw] font-semibold text-[#51375bd9]  lg:mt-[2vw]  "
      }
    >
      • {title}
    </div>
  );
};

export default Heading;
