import OrderCheckItem from "./order-check-item";

import style from "./order-check.module.css";
import OrderForm from "./order-form";

const OrderCheck = () => {
  return (
    <section className={style.container}>
      <h2>您的訂單</h2>
      <section className={style.order_container}>
        <OrderCheckItem />
        <OrderForm />
      </section>
    </section>
  );
};

export default OrderCheck;
