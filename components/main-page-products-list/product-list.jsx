"use client";

import { useEffect, useRef, useState } from "react";

import ProductsItem from "./product-item";
import { useFn } from "@/context/cart-data-context";
import { Arrow } from "../ui-elements/arrow";
import allData from "@/public/data";

import style from "./product-list.module.css";

const ProductsList = (props) => {
  const [initX, setInitX] = useState(null);
  const [move, setMove] = useState(0);
  const [productListScrollPosition, setProductListScrollPosition] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [clickMove, setClickMove] = useState(0);
  const [clickMax, setClickMax] = useState(false);
  const [clickAble, setClickAble] = useState(false);
  const [backgroudText, setBackgroundText] = useState(0);
  const {
    scale,
    clickDisable,
    setClickDisable,
    screenHeight,
    mainScrollPosition,
  } = useFn();
  const dragDiv = useRef();
  const { data } = allData;
  let cardGap = 16;
  const dataLength = data.length;

  const scrollReset = () => {
    const { scrollLeft, offsetWidth, scrollWidth } = dragDiv.current;
    if (scrollWidth === 1416) {
      cardGap = 12;
    }

    if (scrollWidth === 1062) {
      cardGap = 9;
    }

    const moveWidth =
      (scrollWidth - cardGap * (dataLength - 1)) / dataLength + cardGap;
    if (scrollLeft === 0) {
      dragDiv.current.scrollLeft = 0;
      setProductListScrollPosition(dragDiv.current.scrollLeft);
      setClickMove(0);
      return;
    }

    if (scrollLeft === scrollWidth - offsetWidth) {
      dragDiv.current.scrollLeft = scrollWidth - offsetWidth;
      setScrolling(false);
      setProductListScrollPosition(dragDiv.current.scrollLeft);
      return;
    }
    if (
      productListScrollPosition < scrollLeft &&
      (scrollLeft - productListScrollPosition) / moveWidth >= 0.5
    ) {
      dragDiv.current.scrollLeft = scrollLeft;

      const toRight = setInterval(() => {
        const moveRange = scale(
          dragDiv.current.scrollLeft,
          scrollLeft,
          productListScrollPosition +
            Math.ceil((scrollLeft - productListScrollPosition) / moveWidth) *
              moveWidth,
          5,
          navigator.userAgent.indexOf("Chrome") !== -1 ? 0.5 : 1
        );
        dragDiv.current.scrollLeft += moveRange;
        setClickAble(true);
        if (
          dragDiv.current.scrollLeft ===
          productListScrollPosition +
            Math.ceil((scrollLeft - productListScrollPosition) / moveWidth) *
              moveWidth
        ) {
          setClickMove(
            (prev) =>
              prev +
              Math.ceil((scrollLeft - productListScrollPosition) / moveWidth)
          );
          setProductListScrollPosition(dragDiv.current.scrollLeft);
          setScrolling(false);
          clearInterval(toRight);
          setClickAble(false);
        }
      }, 10);
      return;
    }
    if (
      productListScrollPosition < scrollLeft &&
      (scrollLeft - productListScrollPosition) / moveWidth < 0.5
    ) {
      dragDiv.current.scrollLeft = scrollLeft;

      const toLeft = setInterval(() => {
        const moveRange = scale(
          dragDiv.current.scrollLeft,
          scrollLeft,
          productListScrollPosition +
            Math.floor((scrollLeft - productListScrollPosition) / moveWidth) *
              moveWidth,
          5,
          navigator.userAgent.indexOf("Chrome") !== -1 ? 0 : 0.5
        );
        dragDiv.current.scrollLeft -= moveRange;
        setClickAble(true);
        if (
          dragDiv.current.scrollLeft ===
          productListScrollPosition +
            Math.floor((scrollLeft - productListScrollPosition) / moveWidth) *
              moveWidth
        ) {
          setScrolling(false);
          clearInterval(toLeft);
          setClickAble(false);
        }
      }, 10);
    }
    if (
      productListScrollPosition > scrollLeft &&
      (scrollLeft - productListScrollPosition) / moveWidth > -0.5
    ) {
      dragDiv.current.scrollLeft = scrollLeft;

      const toRight = setInterval(() => {
        const moveRange = scale(
          dragDiv.current.scrollLeft,
          scrollLeft,
          productListScrollPosition -
            Math.ceil((scrollLeft - productListScrollPosition) / moveWidth) *
              moveWidth,
          5,
          navigator.userAgent.indexOf("Chrome") !== -1 ? 0.5 : 1
        );
        dragDiv.current.scrollLeft += moveRange;
        setClickAble(true);
        if (
          dragDiv.current.scrollLeft ===
          productListScrollPosition -
            Math.ceil((scrollLeft - productListScrollPosition) / moveWidth) *
              moveWidth
        ) {
          setScrolling(false);
          clearInterval(toRight);
          setClickAble(false);
        }
      }, 10);
      return;
    }
    if (
      productListScrollPosition > scrollLeft &&
      (scrollLeft - productListScrollPosition) / moveWidth <= -0.5
    ) {
      dragDiv.current.scrollLeft = scrollLeft;
      setClickMax(false);
      const toLeft = setInterval(() => {
        const moveRange = scale(
          dragDiv.current.scrollLeft,
          scrollLeft,
          productListScrollPosition +
            Math.floor((scrollLeft - productListScrollPosition) / moveWidth) *
              moveWidth,
          5,
          navigator.userAgent.indexOf("Chrome") !== -1 ? 0 : 0.5
        );
        dragDiv.current.scrollLeft -= moveRange;
        setClickAble(true);
        if (
          dragDiv.current.scrollLeft ===
          productListScrollPosition +
            Math.floor((scrollLeft - productListScrollPosition) / moveWidth) *
              moveWidth
        ) {
          setClickMove(
            (prev) =>
              prev +
              Math.floor((scrollLeft - productListScrollPosition) / moveWidth)
          );
          setProductListScrollPosition(dragDiv.current.scrollLeft);
          setScrolling(false);
          clearInterval(toLeft);
          setClickAble(false);
        }
      }, 10);
    }
  };

  const dragListhandler = (e) => {
    e.preventDefault();
    const { scrollLeft, scrollWidth } = dragDiv.current;
    if (scrollWidth === 1416) {
      cardGap = 12;
    }

    if (scrollWidth === 1062) {
      cardGap = 9;
    }
    const moveWidth =
      (scrollWidth - cardGap * (dataLength - 1)) / dataLength + cardGap;
    const { clientX } = e;

    if (!Number.isInteger(scrollLeft / moveWidth)) {
      return;
    }

    setScrolling(() => true);
    setInitX(() => clientX);
    setProductListScrollPosition(scrollLeft);
  };

  const dragMoveHandler = (e) => {
    const { clientX } = e;

    if (initX && Math.abs(initX - clientX) > 15) {
      setMove(() => initX - clientX);
    }
  };

  const mouseUpHandler = (e) => {
    setInitX(null);
    setScrolling(false);
    setClickDisable(false);
    if (!scrolling) {
      return;
    }
    scrollReset();
  };

  const mouseLeaveHandler = (e) => {
    setInitX(null);
    setScrolling(false);
    setClickDisable(false);
    if (!scrolling) {
      return;
    }
    scrollReset();
  };

  const nextProduct = () => {
    const { scrollLeft, scrollWidth, offsetWidth } = dragDiv.current;
    if (scrollWidth === 1416) {
      cardGap = 12;
    }

    if (scrollWidth === 1062) {
      cardGap = 9;
    }
    const moveWidth =
      (scrollWidth - cardGap * (dataLength - 1)) / dataLength + cardGap;

    if (!Number.isInteger(scrollLeft / moveWidth)) {
      return;
    }
    if (productListScrollPosition === scrollWidth - offsetWidth) {
      return;
    }

    if (clickMove + 1 === dataLength) return;
    setClickMove((prev) => prev + 1);
    const toRight = setInterval(() => {
      const moveRange = scale(
        dragDiv.current.scrollLeft,
        scrollLeft,
        productListScrollPosition + moveWidth,
        5,
        navigator.userAgent.indexOf("Chrome") !== -1 ? 0.5 : 1
      );

      dragDiv.current.scrollLeft += moveRange;

      setClickAble(true);
      if (
        dragDiv.current.scrollLeft ===
        productListScrollPosition + moveWidth
      ) {
        setProductListScrollPosition(dragDiv.current.scrollLeft);
        setScrolling(false);
        clearInterval(toRight);
        setClickAble(false);
      }
    }, 1);
  };

  const prevProduct = () => {
    const { scrollLeft, scrollWidth } = dragDiv.current;
    if (scrollWidth === 1416) {
      cardGap = 12;
    }

    if (scrollWidth === 1062) {
      cardGap = 9;
    }

    const moveWidth =
      (scrollWidth - cardGap * (dataLength - 1)) / dataLength + cardGap;

    if (!Number.isInteger(scrollLeft / moveWidth)) {
      return;
    }

    if (clickMove === 0) return;
    setClickMax(false);
    setClickMove((prev) => prev - 1);
    const toLeft = setInterval(() => {
      const moveRange = scale(
        dragDiv.current.scrollLeft,
        scrollLeft,
        productListScrollPosition - moveWidth,
        5,
        navigator.userAgent.indexOf("Chrome") !== -1 ? 0 : 0.5
      );
      dragDiv.current.scrollLeft -= moveRange;
      setClickAble(true);
      if (
        dragDiv.current.scrollLeft ===
        productListScrollPosition - moveWidth
      ) {
        setProductListScrollPosition(dragDiv.current.scrollLeft);
        setScrolling(false);
        clearInterval(toLeft);
        setClickAble(false);
      }
    }, 5);
  };

  useEffect(() => {
    const onResize = () => {
      if (productListScrollPosition !== 0) {
        const toZero = setInterval(() => {
          const moveRange = scale(
            dragDiv.current.scrollLeft,
            productListScrollPosition,
            0,
            20,
            0.5
          );
          dragDiv.current.scrollLeft -= moveRange;
          setScrolling(true);
          if (dragDiv.current.scrollLeft === 0) {
            setProductListScrollPosition(dragDiv.current.scrollLeft);
            setClickMove(0);
            setScrolling(false);
            setClickMax(false);
            clearInterval(toZero);
          }
        }, 10);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [productListScrollPosition]);

  useEffect(() => {
    if (!dragDiv.current) return;
    const { scrollWidth, offsetWidth } = dragDiv.current;

    if (productListScrollPosition === scrollWidth - offsetWidth) {
      return setClickMax(true);
    }
    setClickMax(false);
  }, [productListScrollPosition]);

  useEffect(() => {
    if (clickDisable) {
      return;
    }
    dragDiv.current.scrollLeft = productListScrollPosition + move;
  }, [move]);

  useEffect(() => {
    const backgroundTextCurrent = scale(
      mainScrollPosition,
      screenHeight - 80,
      (screenHeight - 80) * 2,
      200,
      0
    );
    setBackgroundText(backgroundTextCurrent);
  }, [mainScrollPosition]);

  return (
    <section className={style.product_container}>
      <h2 className={style.product_title}>商品列表</h2>
      <p
        className={style.background_text}
        style={{ transform: `rotate(-45deg) translateX(${backgroudText}%)` }}
      >
        商品列表
      </p>
      <Arrow
        className={`${style.left_arrow} ${
          clickMove === 0 ? style.arrow_disabled : ""
        }`}
        onClick={prevProduct}
      />
      <Arrow
        className={`${style.right_arrow} ${
          clickMax ? style.arrow_disabled : ""
        }`}
        onClick={nextProduct}
      />
      <ul className={style.product_list_container} ref={dragDiv}>
        <div
          className={style.product_drag_list}
          onMouseDown={dragListhandler}
          onMouseMove={dragMoveHandler}
          onMouseUp={mouseUpHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          {data.map((d) => (
            <ProductsItem
              key={d.id}
              name={d.name}
              price={d.price}
              image={d.image}
              event={d.event}
              data={d}
              clickAble={clickAble}
            />
          ))}
        </div>
      </ul>
    </section>
  );
};

export default ProductsList;
