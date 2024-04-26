"use client";

import { createContext, useContext, useRef, useState } from "react";

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
  mainScrollPosition: 0,
  setMainScrollPosition: () => {},
  screenHeight: 0,
  setScreenHeight: () => {},
  screenWidth: 0,
  setScreenWidth: () => {},
  removeAllCart: false,
  setRemoveAllCart: () => {},
  cartMessage: [],
  setCartMessage: () => {},
  messageSlideDown: false,
  setMessageSlideDown: () => {},
  clickDisable: false,
  setClickDisable: () => {},
  currHeight: null,
  navigateScrollHeight: null,
  setNavigateScrollHeight: () => {},
  type: "",
  setType: () => {},
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
  const [mainScrollPosition, setMainScrollPosition] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [removeAllCart, setRemoveAllCart] = useState(false);
  const [cartMessage, setCartMessage] = useState([]);
  const [messageSlideDown, setMessageSlideDown] = useState(false);
  const [clickDisable, setClickDisable] = useState(false);
  const [navigateScrollHeight, setNavigateScrollHeight] = useState(null);
  const [type, setType] = useState("所有商品");

  const currHeight = useRef();
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
        mainScrollPosition,
        setMainScrollPosition,
        screenHeight,
        setScreenHeight,
        screenWidth,
        setScreenWidth,
        removeAllCart,
        setRemoveAllCart,
        cartMessage,
        setCartMessage,
        messageSlideDown,
        setMessageSlideDown,
        clickDisable,
        setClickDisable,
        currHeight,
        navigateScrollHeight,
        setNavigateScrollHeight,
        type,
        setType,
      }}
    >
      {props.children}
    </UseFnContext.Provider>
  );
};
