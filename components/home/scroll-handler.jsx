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
    if (!currHeight.current) return;
    const handleScroll = () => {
      if (navigateScrollHeight) {
        currHeight.current.scrollTop = navigateScrollHeight;
      }
    };

    currHeight.current.addEventListener("scroll", handleScroll);

    return () => currHeight.current.removeEventListener("scroll", handleScroll);
  }, [navigateScrollHeight]);

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
    <div className={props.className} onScroll={scrollHandler} ref={currHeight}>
      {props.children}
    </div>
  );
};

export default ScrollHandler;
