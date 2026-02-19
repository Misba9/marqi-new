import Associations from "components/Associations";
import Navbar from "components/Navbar";
import React from "react";

const associations = () => {
  return (
    <div
      className={`associations-page w-screen h-screen bg-[#51375B] overflow-hidden`}
    >
      <Navbar />
      <Associations />
    </div>
  );
};

export default associations;
