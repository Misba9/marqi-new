import Footer from "components/Footer";
import GetInTouch from "components/GetInTouch";
import Location from "components/Location";
import Navbar from "components/Navbar";
import ProjectHero from "components/ProjectHero";
import TheVilla from "components/TheVilla";
import React from "react";

const Coral = () => {
  return (
    <div className=" overflow-clip ">
      <Navbar />
      <ProjectHero />
      <Location />
      <TheVilla />
      <GetInTouch />
      <Footer />
    </div>
  );
};

export default Coral;
