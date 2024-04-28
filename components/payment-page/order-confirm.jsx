"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useFn } from "@/context/cart-data-context";
import allData from "@/public/data";

import style from "./order-confirm.module.css";

const OrderConfirm = () => {
  const [countDown, setCountDown] = useState(3);
  const { setOrder, setRemoveAllCart, setCartData } = useFn();
  const router = useRouter();
  const { cart } = allData;

  useEffect(() => {
    const countDownTimes = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return countDown === 0
      ? clearInterval(countDownTimes)
      : () => clearInterval(countDownTimes);
  }, [countDown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
      setOrder(false);
      setRemoveAllCart(true);
      cart.splice(0, cart.length);
      setCartData([]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.loader}></div>
      <h3>訂單已送出</h3>
      <p>將於{countDown}秒後為您導向首頁</p>
    </div>
  );
};

export default OrderConfirm;
