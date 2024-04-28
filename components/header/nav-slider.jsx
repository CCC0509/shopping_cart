"use client";

import NavLink from "../ui-elements/nav-link";
import { useFn } from "@/context/cart-data-context";

import style from "./nav-slider.module.css";
import { useEffect } from "react";

const NavSlider = () => {
  const { navSlideOut, setNavSlideOut } = useFn();
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 750) {
        setNavSlideOut(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className={`${style.container} ${navSlideOut ? style.slide_out : ""}`}>
      <NavLink
        className={`${style.nav_link}`}
        slideIn={() => setNavSlideOut(false)}
      />
    </div>
  );
};

export default NavSlider;
