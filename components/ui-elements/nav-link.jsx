"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

import { useFn } from "@/context/cart-data-context";

import style from "./nav-link.module.css";

const NavLink = (props) => {
  const pathName = usePathname();
  const { cartData, setType } = useFn();

  useEffect(() => {
    if (pathName !== "/products") setType("所有商品");
  }, [pathName]);

  return (
    <div className={`${props.className} ${style.container}`}>
      <Link
        onClick={pathName === "/" ? props.onClick : props.slideIn}
        className={`${pathName === "/" ? style.active : ""}`}
        href="/"
      >
        首頁
      </Link>
      <Link
        className={`${pathName === "/products" ? style.active : ""}`}
        href="/products"
        onClick={pathName === "/products" ? props.onClick : props.slideIn}
      >
        商品分類
      </Link>
      {cartData.length !== 0 ? (
        <Link
          className={`${pathName === "/payment" ? style.active : ""}`}
          href="/payment"
          onClick={pathName === "/payment" ? props.onClick : props.slideIn}
        >
          前往結帳
        </Link>
      ) : null}
    </div>
  );
};

export default NavLink;
