import Footer from "components/Footer";
import GetInTouch from "components/GetInTouch";
import PortfolioLocation from "components/PortfolioLocation";
import Navbar from "components/Navbar";
import PortfolioHero from "components/PortfolioHero";
import PortfolioTheVilla from "components/PortfolioTheVilla";
import React from "react";

const Portfolio = () => {
  return (
    <div className=" overflow-clip ">
      <Navbar />
      <PortfolioHero />
      <PortfolioLocation />
      <PortfolioTheVilla />
      <GetInTouch />
      <Footer />
    </div>
  );
};

export default Portfolio;