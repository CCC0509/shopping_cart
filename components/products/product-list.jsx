"use client";

import { useEffect, useRef, useState } from "react";

import ProductsItem from "./product-item";
import { useFn } from "@/context/cart-data-context";
import { LeftArrow, RightArrow } from "../ui-elements/arrow";

import style from "./product-list.module.css";

const ProductsList = (props) => {
  const [initX, setInitX] = useState(null);
  const [move, setMove] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [scrollCurrentWidth, setScrollCurrentWidth] = useState(null);
  const [clickMove, setClickMove] = useState(0);
  const [clickMax, setClickMax] = useState(false);
  const [clickAble, setClickAble] = useState(false);
  const { scale } = useFn();
  const dragDiv = useRef();
  let cardGap = 16;
  const dataLength = props.data.length;

  useEffect(() => {
    if (!dragDiv.current) {
      return;
    }
    const { scrollWidth } = dragDiv.current;
    setScrollCurrentWidth(() => scrollWidth);
    const onResize = () => {
      const { scrollWidth } = dragDiv.current;
      if (scrollCurrentWidth !== scrollWidth) {
        const toZero = setInterval(() => {
          const moveRange = scale(
            dragDiv.current.scrollLeft,
            scrollPosition,
            0,
            5,
            0.5
          );
          dragDiv.current.scrollLeft -= moveRange;
          if (dragDiv.current.scrollLeft === 0) {
            setScrollPosition(dragDiv.current.scrollLeft);
            setClickMove(0);
            setScrolling(false);
            clearInterval(toZero);
          }
        }, 10);
        setScrollCurrentWidth(scrollWidth);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scrollCurrentWidth, scrollPosition]);

  const scrollReset = () => {
    const { scrollLeft, offsetWidth, scrollWidth } = dragDiv.current;
    if (scrollWidth === 1419) {
      cardGap = 12.5;
    }

    if (scrollWidth === 1065) {
      cardGap = 9.5;
    }

    const moveWidth =
      (scrollWidth - cardGap * (dataLength - 1)) / dataLength + cardGap;
    if (scrollLeft === 0) {
      return (dragDiv.current.scrollLeft = 0);
    }

    if (scrollLeft === scrollWidth - offsetWidth) {
      setScrolling(false);
      return (dragDiv.current.scrollLeft = scrollWidth - offsetWidth);
    }
    if (
      scrollPosition < scrollLeft &&
      (scrollLeft - scrollPosition) / moveWidth >= 0.5
    ) {
      dragDiv.current.scrollLeft = scrollLeft;

      const toRight = setInterval(() => {
        const moveRange = scale(
          dragDiv.current.scrollLeft,
          scrollLeft,
          scrollPosition +
            Math.ceil((scrollLeft - scrollPosition) / moveWidth) * moveWidth,
          5,
          0.5
        );
        dragDiv.current.scrollLeft += moveRange;
        setClickAble(true);
        if (
          dragDiv.current.scrollLeft ===
          scrollPosition +
            Math.ceil((scrollLeft - scrollPosition) / moveWidth) * moveWidth
        ) {
          setClickMove(
            (prev) =>
              prev + Math.ceil((scrollLeft - scrollPosition) / moveWidth)
          );
          setScrollPosition(dragDiv.current.scrollLeft);
          setScrolling(false);
          clearInterval(toRight);
          setClickAble(false);
        }
      }, 10);
      return;
    }
    if (
      scrollPosition < scrollLeft &&
      (scrollLeft - scrollPosition) / moveWidth < 0.5
    ) {
      dragDiv.current.scrollLeft = scrollLeft;

      const toLeft = setInterval(() => {
        const moveRange = scale(
          dragDiv.current.scrollLeft,
          scrollLeft,
          scrollPosition +
            Math.floor((scrollLeft - scrollPosition) / moveWidth) * moveWidth,
          5,
          0
        );
        dragDiv.current.scrollLeft -= moveRange;
        setClickAble(true);
        if (
          dragDiv.current.scrollLeft ===
          scrollPosition +
            Math.floor((scrollLeft - scrollPosition) / moveWidth) * moveWidth
        ) {
          setScrolling(false);
          clearInterval(toLeft);
          setClickAble(false);
        }
      }, 10);
    }
    if (
      scrollPosition > scrollLeft &&
      (scrollLeft - scrollPosition) / moveWidth > -0.5
    ) {
      dragDiv.current.scrollLeft = scrollLeft;

      const toRight = setInterval(() => {
        const moveRange = scale(
          dragDiv.current.scrollLeft,
          scrollLeft,
          scrollPosition -
            Math.ceil((scrollLeft - scrollPosition) / moveWidth) * moveWidth,
          5,
          0.5
        );
        dragDiv.current.scrollLeft += moveRange;
        setClickAble(true);
        if (
          dragDiv.current.scrollLeft ===
          scrollPosition -
            Math.ceil((scrollLeft - scrollPosition) / moveWidth) * moveWidth
        ) {
          setScrolling(false);
          clearInterval(toRight);
          setClickAble(false);
        }
      }, 10);
      return;
    }
    if (
      scrollPosition > scrollLeft &&
      (scrollLeft - scrollPosition) / moveWidth <= -0.5
    ) {
      dragDiv.current.scrollLeft = scrollLeft;
      setClickMax(false);
      const toLeft = setInterval(() => {
        const moveRange = scale(
          dragDiv.current.scrollLeft,
          scrollLeft,
          scrollPosition +
            Math.floor((scrollLeft - scrollPosition) / moveWidth) * moveWidth,
          5,
          0
        );
        dragDiv.current.scrollLeft -= moveRange;
        setClickAble(true);
        if (
          dragDiv.current.scrollLeft ===
          scrollPosition +
            Math.floor((scrollLeft - scrollPosition) / moveWidth) * moveWidth
        ) {
          setClickMove(
            (prev) =>
              prev + Math.floor((scrollLeft - scrollPosition) / moveWidth)
          );
          setScrollPosition(dragDiv.current.scrollLeft);
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
    if (scrollWidth === 1419) {
      cardGap = 12.5;
    }

    if (scrollWidth === 1065) {
      cardGap = 9.5;
    }
    const moveWidth =
      (scrollWidth - cardGap * (dataLength - 1)) / dataLength + cardGap;
    const { clientX } = e;

    if (!Number.isInteger(scrollLeft / moveWidth)) {
      return;
    }
    setScrolling(() => true);
    setInitX(() => clientX);
    setScrollPosition(scrollLeft);
  };

  const dragMoveHandler = (e) => {
    const { clientX } = e;

    if (initX) {
      setMove(() => initX - clientX);
    }
  };

  const mouseUpHandler = (e) => {
    setInitX(null);
    setScrolling(false);

    if (!scrolling) {
      return;
    }
    scrollReset();
  };

  const mouseLeaveHandler = (e) => {
    setInitX(null);
    setScrolling(false);

    if (!scrolling) {
      return;
    }
    scrollReset();
  };

  useEffect(() => {
    dragDiv.current.scrollLeft = scrollPosition + move;
  }, [move]);

  useEffect(() => {
    const { scrollWidth, offsetWidth } = dragDiv.current;
    if (scrollPosition === scrollWidth - offsetWidth) {
      setClickMax(true);
    }
  }, [scrollPosition]);

  const nextProduct = () => {
    const { scrollLeft, scrollWidth, offsetWidth } = dragDiv.current;
    if (scrollWidth === 1419) {
      cardGap = 12.5;
    }
    if (scrollWidth === 1065) {
      cardGap = 9.5;
    }

    const moveWidth =
      (scrollWidth - cardGap * (dataLength - 1)) / dataLength + cardGap;

    if (!Number.isInteger(scrollLeft / moveWidth)) {
      return;
    }
    if (scrollPosition === scrollWidth - offsetWidth) {
      return;
    }

    if (clickMove + 1 === dataLength) return;
    setClickMove((prev) => prev + 1);
    const toRight = setInterval(() => {
      const moveRange = scale(
        dragDiv.current.scrollLeft,
        scrollLeft,
        scrollPosition + moveWidth,
        5,
        0.5
      );
      dragDiv.current.scrollLeft += moveRange;
      setClickAble(true);
      if (dragDiv.current.scrollLeft === scrollPosition + moveWidth) {
        setScrollPosition(dragDiv.current.scrollLeft);
        setScrolling(false);
        clearInterval(toRight);
        setClickAble(false);
      }
    }, 5);
  };

  const prevProduct = () => {
    const { scrollLeft, scrollWidth } = dragDiv.current;
    if (scrollWidth === 1419) {
      cardGap = 12.5;
    }

    if (scrollWidth === 1065) {
      cardGap = 9.5;
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
        scrollPosition - moveWidth,
        5,
        0
      );
      dragDiv.current.scrollLeft -= moveRange;
      setClickAble(true);
      if (dragDiv.current.scrollLeft === scrollPosition - moveWidth) {
        setScrollPosition(dragDiv.current.scrollLeft);
        setScrolling(false);
        clearInterval(toLeft);
        setClickAble(false);
      }
    }, 5);
  };

  return (
    <section className={style.product_container}>
      <h2 className={style.product_title}>產品列表</h2>
      <LeftArrow
        className={`${style.left_arrow} ${
          clickMove === 0 ? style.arrow_disabled : ""
        }`}
        onClick={prevProduct}
      />
      <RightArrow
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
          {props.data.map((d) => (
            <ProductsItem
              key={d.id}
              name={d.name}
              price={d.price}
              image={d.image}
              data={d}
              cart={props.cart}
              clickAble={clickAble}
            />
          ))}
        </div>
      </ul>
    </section>
  );
};

export default ProductsList;
