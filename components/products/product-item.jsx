import { useEffect, useState } from "react";

import Button from "../ui-elements/button";
import Card from "../ui-elements/card";

import { useFn } from "@/context/cart-data-context";
import allData from "@/public/data";

import style from "./product-item.module.css";

const ProductsItem = (props) => {
  const [addToCart, setAddTOCart] = useState(false);
  const { cartData, setCartData } = useFn();
  const { cart } = allData;

  const addToCartHandler = () => {
    cart.push(props.data);
    setCartData([...cart]);
  };

  useEffect(() => {
    if (cart.some((ele) => ele.id === props.data.id)) {
      return setAddTOCart(true);
    }
    setAddTOCart(false);
  }, [cartData]);

  return (
    <>
      <Card className={style.product_item_container}>
        <div className={style.img_container}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={style.product_content}>
          <h3>{props.name}</h3>
          <p>{props.price}元</p>
          <Button
            className={style.add_to_cart}
            disabled={addToCart || props.clickAble}
            onClick={addToCartHandler}
          >
            {addToCart ? "已加入購物車" : "加入購物車"}
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ProductsItem;
