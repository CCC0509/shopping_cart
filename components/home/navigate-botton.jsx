"use client";
import { useEffect, useReducer, useState } from "react";

import { Arrow } from "../ui-elements/arrow";
import { useFn } from "@/context/cart-data-context";

import style from "./navigate-botton.module.css";

const initController = {
  btnHover1: false,
  btnHover2: false,
  isTop: false,
  isBottom: false,
};

const buttonController = (state, action) => {
  switch (action.type) {
    case "HOVER":
      return { ...state, [action.button]: !state[action.button] };
    case "TOP":
      return { ...state, [action.action]: true };
    case "notTOP":
      return { ...state, [action.action]: false };
    case "BOTTOM":
      return { ...state, [action.action]: true };
    case "notBOTTOM":
      return { ...state, [action.action]: false };
    default:
      return state;
  }
};

const NavigateButton = () => {
  const { currHeight, scale, setNavigateScrollHeight, mainScrollPosition } =
    useFn();
  const [scrolling, setScrolling] = useState(false);
  const [navigateText, setNavigateText] = useState([]);
  const [buttonControl, controlDispatch] = useReducer(
    buttonController,
    initController
  );

  useEffect(() => {
    if (currHeight.current) {
      const { scrollTop, offsetHeight } = currHeight.current;
      if (scrollTop === 0) {
        controlDispatch({ type: "TOP", action: "isTop" });
        setNavigateText(["回到最上面", "關於我們"]);
        return;
      }
      controlDispatch({ type: "notTOP", action: "isTop" });
      controlDispatch({ type: "notBOTTOM", action: "isBottom" });
      if (scrollTop < offsetHeight - 80) {
        setNavigateText(["回到最上面", "關於我們"]);
        return;
      }
      if (scrollTop === offsetHeight - 80) {
        setNavigateText(["回到最上面", "商品列表"]);
        return;
      }
      if (
        scrollTop > offsetHeight - 80 &&
        scrollTop < (offsetHeight - 80) * 2
      ) {
        setNavigateText(["關於我們", "商品列表"]);
        return;
      }
      if (scrollTop === (offsetHeight - 80) * 2) {
        controlDispatch({ type: "BOTTOM", action: "isBottom" });
        setNavigateText(["關於我們", ""]);
        return;
      }
    }
  }, [mainScrollPosition]);

  const prevHandler = () => {
    if (scrolling) return;
    if (currHeight.current.scrollTop <= currHeight.current.offsetHeight - 80) {
      const toPrev = setInterval(() => {
        if (!currHeight.current) {
          clearInterval(toPrev);
          setNavigateScrollHeight(null);
          return;
        }
        const move = scale(
          currHeight.current.scrollTop,
          currHeight.current.offsetHeight - 80,
          0,
          10,
          navigator.userAgent.indexOf("Chrome") !== -1 ? 0 : 0.5
        );
        currHeight.current.scrollTop -= move;
        setNavigateScrollHeight(currHeight.current.scrollTop);
        setScrolling(true);
        if (currHeight.current.scrollTop === 0) {
          clearInterval(toPrev);
          setNavigateScrollHeight(null);
          setScrolling(false);
        }
      }, 1);
      return;
    }

    const toPrev = setInterval(() => {
      if (!currHeight.current) {
        clearInterval(toPrev);
        setNavigateScrollHeight(null);
        return;
      }
      const move = scale(
        currHeight.current.scrollTop,
        (currHeight.current.offsetHeight - 80) * 2,
        currHeight.current.offsetHeight - 80,
        10,
        navigator.userAgent.indexOf("Chrome") !== -1 ? 0 : 0.5
      );
      currHeight.current.scrollTop -= move;
      setNavigateScrollHeight(currHeight.current.scrollTop);
      setScrolling(true);
      if (
        currHeight.current.scrollTop ===
        currHeight.current.offsetHeight - 80
      ) {
        clearInterval(toPrev);
        setNavigateScrollHeight(null);
        setScrolling(false);
      }
    }, 1);
  };

  const nextHandler = () => {
    if (scrolling) return;
    if (currHeight.current.scrollTop < currHeight.current.offsetHeight - 80) {
      const toNext = setInterval(() => {
        if (!currHeight.current) {
          clearInterval(toNext);
          setNavigateScrollHeight(null);
          return;
        }
        const move = scale(
          currHeight.current.scrollTop,
          0,
          currHeight.current.offsetHeight,
          10,
          navigator.userAgent.indexOf("Chrome") !== -1 ? 0 : 0.5
        );
        currHeight.current.scrollTop += move;
        setNavigateScrollHeight(currHeight.current.scrollTop);
        setScrolling(true);
        if (
          currHeight.current.scrollTop ===
          currHeight.current.offsetHeight - 80
        ) {
          clearInterval(toNext);
          setNavigateScrollHeight(null);
          setScrolling(false);
        }
      }, 1);
      return;
    }
    const toNext = setInterval(() => {
      if (!currHeight.current) {
        clearInterval(toNext);
        setNavigateScrollHeight(null);
        return;
      }
      const move = scale(
        currHeight.current.scrollTop,
        currHeight.current.offsetHeight - 80,
        (currHeight.current.offsetHeight - 80) * 2,
        10,
        navigator.userAgent.indexOf("Chrome") !== -1 ? 0.5 : 1
      );
      currHeight.current.scrollTop += move;
      setNavigateScrollHeight(currHeight.current.scrollTop);
      setScrolling(true);
      if (
        currHeight.current.scrollTop ===
        (currHeight.current.offsetHeight - 80) * 2
      ) {
        clearInterval(toNext);
        setNavigateScrollHeight(null);
        setScrolling(false);
      }
    }, 1);
  };

  return (
    <div className={style.navigate_container}>
      <div
        className={`${style.text_container} ${
          buttonControl.isTop ? style.top : ""
        } `}
      >
        <Arrow
          className={style.arrow_up}
          onClick={prevHandler}
          onMouseEnter={() =>
            controlDispatch({ type: "HOVER", button: "btnHover1" })
          }
          onMouseLeave={() =>
            controlDispatch({ type: "HOVER", button: "btnHover1" })
          }
        />
        <p
          className={`${style.text_prev} ${
            buttonControl.btnHover1 ? style.show : ""
          }`}
        >
          {navigateText[0]}
        </p>
      </div>
      <div
        className={`${style.text_container} ${
          buttonControl.isBottom ? style.bottom : ""
        }`}
      >
        <Arrow
          className={style.arrow_down}
          onClick={nextHandler}
          onMouseEnter={() =>
            controlDispatch({ type: "HOVER", button: "btnHover2" })
          }
          onMouseLeave={() =>
            controlDispatch({ type: "HOVER", button: "btnHover2" })
          }
        />
        <p
          className={`${style.text_next} ${
            buttonControl.btnHover2 ? style.show : ""
          }`}
        >
          {navigateText[1]}
        </p>
      </div>
    </div>
  );
};

export default NavigateButton;
