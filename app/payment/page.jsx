"use client";

import { useFn } from "@/context/cart-data-context";
import OrderCheck from "@/components/payment-page/order-check";
import OrderConfirm from "@/components/payment-page/order-confirm";

import style from "./page.module.css";

const Payment = () => {
  const { order } = useFn();

  return (
    <main className={style.container}>
      <OrderCheck />
      {order && <OrderConfirm />}
    </main>
  );
};

export default Payment;
