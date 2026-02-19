import { useEffect } from "react";

function useScrollbar() {
  useEffect(() => {
    let timer;

    const handleScroll = () => {
      document.body.classList.add("on-scrollbar");
      clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.classList.remove("on-scrollbar");
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}

export default useScrollbar;
