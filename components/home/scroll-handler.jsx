"use client";

import { useFn } from "@/context/cart-data-context";
import { useEffect } from "react";

const ScrollHandler = (props) => {
  const {
    setMainScrollPosition,
    setScreenHeight,
    setScreenWidth,
    currHeight,
    navigateScrollHeight,
  } = useFn();

  useEffect(() => {
    const handleScroll = () => {};

    currHeight.current.addEventListener("scroll", handleScroll);

    currHeight.current.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollHandler = (e) => {
    if (navigateScrollHeight) {
      e.target.scrollTop = navigateScrollHeight;
    }
    const { scrollTop, clientHeight, clientWidth } = e.target;
    setScreenHeight(clientHeight);
    setScreenWidth(clientWidth);
    setMainScrollPosition(scrollTop);
  };

  return (
    <main className={props.className} onScroll={scrollHandler} ref={currHeight}>
      {props.children}
    </main>
  );
};

export default ScrollHandler;
