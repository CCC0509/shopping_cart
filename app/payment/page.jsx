"use client";
import { redirect } from "next/navigation";

import { useFn } from "@/context/cart-data-context";

import style from "./page.module.css";
import OrderCheck from "@/components/payment-page/order-check";

const Payment = () => {
  const { cartData } = useFn();
  if (cartData.length === 0) {
    redirect("/products");
  }
  return (
    <main className={style.container}>
      <OrderCheck />
    </main>
  );
};

export default Payment;
