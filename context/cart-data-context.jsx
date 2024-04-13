"use client";

import { createContext, useContext, useState } from "react";

const UseFnContext = createContext({
  setCartData: () => {},
  cartData: [],
  scale: () => {},
  productTotalCount: 0,
  setProductTotalCount: () => {},
  productTotalPrice: 0,
  setProductTotalPrice: () => {},
  prevPrice: 0,
  setPrevPrice: () => {},
  extend: false,
  setExtend: () => {},
  scrollPosition: 0,
  setScrollPosition: () => {},
  screenHeight: 0,
  setScreenHeight: () => {},
  screenWidth: 0,
  setScreenWidth: () => {},
});

export const useFn = () => {
  return useContext(UseFnContext);
};

export const UseFnProvider = (props) => {
  const [cartData, setCartData] = useState([]);
  const [productTotalCount, setProductTotalCount] = useState(0);
  const [productTotalPrice, setProductTotalPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [extend, setExtend] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };
  return (
    <UseFnContext.Provider
      value={{
        setCartData,
        cartData,
        scale,
        productTotalCount,
        setProductTotalCount,
        productTotalPrice,
        setProductTotalPrice,
        prevPrice,
        setPrevPrice,
        extend,
        setExtend,
        scrollPosition,
        setScrollPosition,
        screenHeight,
        setScreenHeight,
        screenWidth,
        setScreenWidth,
      }}
    >
      {props.children}
    </UseFnContext.Provider>
  );
};
