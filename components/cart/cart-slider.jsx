import { useEffect, useState } from "react";

import CartList from "./cart-list";
import Button from "../ui-elements/button";
import { useFn } from "@/context/cart-data-context";
import allData from "@/public/data";

import style from "./cart-slider.module.css";

const CartSlider = (props) => {
  const { cart } = allData;
  const {
    cartData,
    setCartData,
    productTotalCount,
    productTotalPrice,
    prevPrice,
    setPrevPrice,
    scale,
    extend,
    setExtend,
  } = useFn();

  useEffect(() => {
    const priceChange = setInterval(() => {
      let range;
      if (Math.abs(productTotalPrice - prevPrice) > 70) {
        range = scale(prevPrice, prevPrice, productTotalPrice, 100, 1);
      } else {
        range = 1;
      }
      if (productTotalPrice > prevPrice) {
        setPrevPrice((prev) => prev + range);
      }
      if (productTotalPrice < prevPrice) {
        setPrevPrice((prev) => prev - range);
      }
      clearInterval(priceChange);
    }, 10);
  }, [productTotalPrice, prevPrice]);

  const extendHandler = () => {
    !extend ? setExtend(true) : setExtend(false);
  };

  const clearCartHandler = () => {
    cart.splice(0, cart.length);
    setCartData([]);
  };

  return (
    <div className={`${style.cart_container} ${props.className}`}>
      <header className={`${style.cart_header} `}>
        <h2>購物車</h2>
      </header>
      <div className={style.cart_contain}>
        <CartList />
      </div>

      <footer className={`${style.cart_footer} ${extend ? style.extend : ""}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className={`${style.slide_arrow} ${extend ? style.rotate : ""}`}
          onClick={extendHandler}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 18.75 7.5-7.5 7.5 7.5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 7.5-7.5 7.5 7.5"
          />
        </svg>

        <h3
          className={`${style.cart_footer_title} ${
            extend ? style.invisible : ""
          }`}
        >
          訂單摘要
        </h3>
        <p className={`${extend ? style.invisible : style.count}`}>
          商品數量:{productTotalCount}
        </p>
        <p className={`${extend ? style.invisible : style.price}`}>
          總金額:{prevPrice}
        </p>

        <div
          className={`${style.extend_show} ${extend ? "" : style.invisible}`}
        >
          <div className={style.extend_left}>
            <h3>訂單摘要</h3>
            <div>
              {" "}
              <p>商品數量:{productTotalCount}</p>
              <p> 總金額:{prevPrice}</p>
            </div>
          </div>
          <div className={style.extend_right}>
            <Button className={`${style.btn} `}>繼續購物</Button>
            <Button
              disabled={cartData.length === 0}
              className={`${style.btn} `}
              onClick={clearCartHandler}
            >
              清空購物車
            </Button>
            <Button
              disabled={cartData.length === 0}
              className={`${style.btn} `}
            >
              結帳
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartSlider;
