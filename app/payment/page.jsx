"use client";
import { useRouter } from "next/navigation";

import { useFn } from "@/context/cart-data-context";
import OrderCheck from "@/components/payment-page/order-check";
import OrderConfirm from "@/components/payment-page/order-confirm";

import style from "./page.module.css";
import { useEffect } from "react";

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
    </main>
  );
};

export default Payment;
