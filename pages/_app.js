import "styles/globals.css";
import "../styles/golden/stylesheet.css";
import "../styles/monteserrat/stylesheet.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { loadIonicons } from "utils/LoadIonicons";
import { SpeedInsights } from "@vercel/speed-insights/next";

const SmoothScrolling = dynamic(() => import("context/pageContext"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    loadIonicons();
  }, []);

  return (
    <SmoothScrolling>
      <Component {...pageProps} />
    </SmoothScrolling>
  );
}
