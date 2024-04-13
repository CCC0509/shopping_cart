"use client";

import { useEffect, useRef, useState } from "react";

import { useFn } from "@/context/cart-data-context";

import style from "./about-card.module.css";

const AboutCard = (props) => {
  const [slidePosition, setSlidePosition] = useState(200);
  const [cardPosition, setCardPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState(false);
  const { scale, scrollPosition, screenHeight, screenWidth } = useFn();
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      const { top, height } = scrollRef.current.getBoundingClientRect();
      const cardCurrent = scale(
        top,
        screenHeight,
        screenHeight - height,
        250,
        0
      );
      if (top <= screenHeight) {
        if (screenWidth > 680) {
          return setSlidePosition(cardCurrent >= 60 ? cardCurrent : 60);
        }
        return setSlidePosition(cardCurrent >= 0 ? cardCurrent : 0);
      }
      return setSlidePosition(250);
    }
  }, [scrollPosition]);

  useEffect(() => {
    if (window.innerHeight >= 824) {
      setWindowHeight(true);
    }
    setCardPosition(window.innerHeight > 560 ? window.innerHeight - 560 : 0);
    const onResize = () => {
      if (window.innerHeight < 824) {
        setWindowHeight(false);
        setCardPosition(
          window.innerHeight > 560 ? window.innerHeight - 560 : 0
        );
      } else if (window.innerHeight >= 824) {
        setWindowHeight(true);
        if (window.innerWidth < 695) {
          return setSlidePosition(0);
        }
        return setSlidePosition(60);
      }
      return setWindowHeight(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {windowHeight && (
        <div
          ref={scrollRef}
          style={{
            transform: `translateX(${
              props.ind % 2 === 0 ? slidePosition : -slidePosition
            }%) `,
          }}
          className={`${style.card} ${
            windowHeight ? props.slideIn : props.dragList
          }`}
        >
          {props.children}
        </div>
      )}
      {!windowHeight && (
        <div
          style={{
            transform: `translateY(${cardPosition}px)`,
            opacity: `${props.aboutIndex === props.ind ? "1" : "0"}`,
          }}
          className={`${style.card} ${
            windowHeight ? props.slideIn : props.dragList
          } `}
        >
          {props.children}
        </div>
      )}
    </>
  );
};

export default AboutCard;
