import FormValid from "./form-valid";

import style from "./order-form.module.css";

const OrderForm = () => {
  return (
    <section className={style.container}>
      <h3>收件人資訊</h3>
      <FormValid />
    </section>
  );
};

export default OrderForm;
