import About from "components/About";
import Footer from "components/Footer";
import GetInTouch from "components/GetInTouch";
import Navbar from "components/Navbar";
// import Navbar from "@/components/Navbar";
import React from "react";

const Aboutus = () => {
  return (
    <div className=" overflow-hidden ">
      <Navbar />
      <About />
      <GetInTouch />
      <Footer />
    </div>
  );
};

export default Aboutus;
