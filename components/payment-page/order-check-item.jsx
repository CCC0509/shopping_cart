import Card from "../ui-elements/card";
import { useFn } from "@/context/cart-data-context";

import style from "./order-check-item.module.css";
import Image from "next/image";

const OrderCheckItem = () => {
  const { cartData, productTotalPrice, productTotalCount } = useFn();
  return (
    <div className={style.order_container}>
      <div className={style.item_container}>
        {cartData.map((d) => (
          <Card
            className={`${style.order_check_card} ${
              d.event === "草莓季" ? style.event : ""
            }`}
            key={d.name}
          >
            <div className={style.img_container}>
              <Image src={d.image} alt={d.name} fill sizes="width:5rem" />
            </div>
            <div>
              <h3 className={style.order_check_title}>{d.name}</h3>
              <p>單價：{d.price}</p>
              <p>數量：{d.count}</p>
              <p>總額：{d.price * d.count}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className={style.total_container}>
        <div>
          <h3>訂單摘要</h3>
          <p>商品數量：{productTotalCount}</p>
          <p>總金額：{productTotalPrice}</p>
        </div>

        <p className={style.notice}>若要更改商品，請至購物車操作！！！</p>
      </div>
    </div>
  );
};

export default OrderCheckItem;
