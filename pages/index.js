import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import GetInTouch from "../components/GetInTouch";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import OurProjects from "../components/OurProjects";
import Service from "../components/Service";
import Video from "../components/Video";
import AboutUs from "../components/AboutUs";

export default function Home() {
  return (
    <div className="overflow-clip">
      <Navbar />
      <Video />
      <Service />
      <Hero />
      <AboutUs />
      <Gallery />
      <OurProjects />
      <GetInTouch />
      <Footer />
    </div>
  );
}
