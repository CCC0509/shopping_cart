import { useEffect, useState } from "react";

import Button from "../ui-elements/button";
import Card from "../ui-elements/card";

import { useFn } from "@/context/cart-data-context";
import allData from "@/public/data";

import style from "./product-item.module.css";

const ProductsItem = (props) => {
  const [addToCart, setAddTOCart] = useState(false);
  const {
    cartData,
    setCartData,
    setRemoveAllCart,
    setCartMessage,
    setClickDisable,
  } = useFn();
  const { cart, cartMessageData } = allData;

  const addToCartHandler = () => {
    setRemoveAllCart(false);
    cartMessageData.unshift(props.name);
    setCartMessage([...cartMessageData]);
    cart.push(props.data);
    setCartData([...cart]);
  };
  const mouseDownHandler = () => {
    setClickDisable(true);
  };

  useEffect(() => {
    if (cart.some((ele) => ele.id === props.data.id)) {
      return setAddTOCart(true);
    }
    setAddTOCart(false);
  }, [cartData]);

  return (
    <>
      <Card
        className={`${style.product_item_container} ${
          props.event === "草莓季" ? style.event_container : ""
        } ${props.className} `}
      >
        {props.event !== "" ? (
          <p className={style.event_text}>{props.event}</p>
        ) : null}
        <div className={style.img_container}>
          <img src={props.image} alt={props.name} />
        </div>
        <div
          className={`${style.product_content} ${
            props.event === "草莓季" ? style.event_content : ""
          }`}
        >
          <h3>{props.name}</h3>
          <p>{props.price}元</p>
          <Button
            className={`${style.add_to_cart} `}
            disabled={addToCart || props.clickAble}
            onClick={addToCartHandler}
            onMouseDown={mouseDownHandler}
            event={props.event === "草莓季" ? true : false}
          >
            {addToCart ? "已加入購物車" : "加入購物車"}
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ProductsItem;
