"use client";

import { useFn } from "@/context/cart-data-context";

const ScrollHandler = (props) => {
  const { setScrollPosition, setScreenHeight, setScreenWidth } = useFn();

  const scrollHandler = (e) => {
    const { scrollTop, clientHeight, clientWidth } = e.target;
    setScreenHeight(clientHeight);
    setScreenWidth(clientWidth);
    setScrollPosition(scrollTop);
  };

  return (
    <main className={props.className} onScroll={scrollHandler}>
      {props.children}
    </main>
  );
};

export default ScrollHandler;
