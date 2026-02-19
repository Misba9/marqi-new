import { gsap } from "gsap";
import React, { useEffect } from "react";

const Cursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const links = document.querySelectorAll("a");
    const cursorText = document.querySelector(".cursor-text");

    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, { x: clientX - 19, y: clientY - 19 });
    };

    const onMouseEnterLink = (event) => {
      const link = event.target;
      if (link.classList.contains("view")) {
        gsap.to(cursor, { scale: 1.5, backgroundColor: "#FFFFFF" });
        cursorText.style.display = "block";
      } else {
        gsap.to(cursor, { scale: 1.5 });
      }
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1 });
      cursorText.style.display = "none";
    };

    document.addEventListener("mousemove", onMouseMove);
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });
  }, []);

  return (
    <div id="custom-cursor" className="custom-cursor">
      <span className="cursor-text ">View</span>
    </div>
  );
};

export default Cursor;
