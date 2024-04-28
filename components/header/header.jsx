"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import CartSlider from "../cart/cart-slider";
import BackDrop from "../ui-elements/back-drop";
import Message from "../shared/message";
import { useFn } from "@/context/cart-data-context";
import NavLink from "../ui-elements/nav-link";

import style from "./header.module.css";

const Header = (props) => {
  const [showCart, setShowCart] = useState(false);
  const {
    cartData,
    productTotalCount,
    setProductTotalCount,
    setProductTotalPrice,
    setExtend,
    setNavSlideOut,
  } = useFn();
  const pathName = usePathname();

  useEffect(() => {
    if (cartData) {
      setProductTotalCount(
        cartData.reduce((total, ele) => total + ele.count, 0)
      );
      setProductTotalPrice(
        cartData.reduce((total, ele) => total + ele.count * ele.price, 0)
      );
    }
  }, [cartData]);

  const cartOpenHandler = () => {
    setShowCart(true);
  };

  const cartCloseHandler = () => {
    setShowCart(false);
    setExtend(false);
  };

  const navListHandler = () => {
    setNavSlideOut((prev) => (prev ? false : true));
  };
  return (
    <header className={style.header_container}>
      <Link
        className={style.logo}
        href="/"
        onClick={pathName === "/" ? (e) => e.preventDefault() : null}
      >
        <h1>壹點。甜</h1>
      </Link>
      <NavLink className={style.nav_link} onClick={(e) => e.preventDefault()} />

      <span
        className={` ${style.cart_item_count} ${
          !productTotalCount ? style.display_none : ""
        } ${showCart ? style.cart_show : ""}`}
      >
        {productTotalCount}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${style.cart_icon} ${showCart ? style.cart_show : ""}`}
        onClick={cartOpenHandler}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={4.5}
        stroke="currentColor"
        className={`${showCart ? style.cancel_show : style.cancel_hidden}`}
        onClick={cartCloseHandler}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={style.hidden_list}
        onClick={navListHandler}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
        />
      </svg>

      <BackDrop
        className={`${showCart ? style.slider_active : ""}`}
        onClick={cartCloseHandler}
      />
      <CartSlider
        setShowCart={setShowCart}
        className={`${showCart ? style.slider_active : ""}`}
      />
      <Message />
    </header>
  );
};

export default Header;
