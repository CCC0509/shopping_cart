"use client";
import { redirect } from "next/navigation";

import { useFn } from "@/context/cart-data-context";

import style from "./page.module.css";

const Payment = () => {
  const { cartData } = useFn();
  if (cartData.length === 0) {
    redirect("/");
  }
  return <main className={style.container}>payment</main>;
};

export default Payment;
