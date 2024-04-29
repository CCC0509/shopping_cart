"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useFn } from "@/context/cart-data-context";
import OrderCheck from "@/components/payment-page/order-check";
import OrderConfirm from "@/components/payment-page/order-confirm";
import BackDrop from "@/components/ui-elements/back-drop";

import style from "./page.module.css";

const Payment = () => {
  const { order, cartData } = useFn();
  const router = useRouter();
  useEffect(() => {
    if (cartData.length === 0 && !order) {
      return router.push("/");
    }
  }, [order, cartData]);

  return (
    <main className={style.container}>
      <OrderCheck />
      {order && <OrderConfirm />}
      {<BackDrop className={`${style.backdrop} ${order ? style.show : ""} `} />}
    </main>
  );
};

export default Payment;
