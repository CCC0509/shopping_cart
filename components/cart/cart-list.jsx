import { useFn } from "@/context/cart-data-context";

import CartItem from "./cart-item";

import style from "./cart-list.module.css";

const CartList = (props) => {
  const { cartData } = useFn();
  return (
    <div>
      <ul className={style.cart_item_container}>
        {cartData.map((d) => (
          <CartItem
            key={d.id}
            image={d.image}
            name={d.name}
            price={d.price}
            event={d.event}
          />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
