import { useEffect, useState } from "react";
import Image from "next/image";

import Card from "../ui-elements/card";
import Button from "../ui-elements/button";
import { useFn } from "@/context/cart-data-context";

import allData from "@/public/data";

import style from "./cart-item.module.css";

const CartItem = (props) => {
  const [productCount, setProductCount] = useState(1);
  const [productIsMin, setProductIsMin] = useState(true);
  const [removeItem, setRemoveItem] = useState(false);
  const { cart } = allData;
  const { removeAllCart, cartData, setCartData } = useFn();

  const index = cart.findIndex((ele) => ele.name === props.name);

  useEffect(() => {
    if (cart.length === 0) return;
    cart[index].count = productCount;
    setCartData([...cart]);
  }, [productCount, cart]);

  const plusHandler = () => {
    setProductCount((prev) => prev + 1);
    setProductIsMin(false);
  };

  const minusHandler = () => {
    if (productCount > 1) {
      setProductCount((prev) => prev - 1);
    }

    if (productCount <= 2) {
      setProductIsMin(true);
    }
  };

  const selectHandler = (e) => {
    e.preventDefault();
  };

  const removeCartItemHandler = () => {
    setRemoveItem(true);
    setTimeout(() => {
      if (index !== -1) {
        cart.splice(index, 1);
      }
      const removedData = cartData.filter((ele) => ele.name !== props.name);
      setCartData((prev) => [...removedData]);
    }, 500);
  };

  return (
    <li>
      <Card
        onMouseDown={selectHandler}
        className={`${style.cart_item_container} ${
          removeItem || removeAllCart ? style.slide_out : ""
        } ${props.event === "草莓季" ? style.event_item_container : ""}`}
      >
        {props.event === "草莓季" ? (
          <p className={style.event_text}>{props.event}</p>
        ) : null}
        <div className={style.cart_item_image_container}>
          <Image
            src={props.image}
            alt={props.name}
            fill
            sizes="(max-width:5rem)"
          />
        </div>
        <div className={style.cart_item_text_container}>
          <p
            className={`${style.cart_item_title} ${style.product} ${
              props.event === "草莓季" ? style.event_title : ""
            }`}
          >
            商品名稱
          </p>
          <h3 style={{ fontSize: `${props.name.length > 4 ? "80%" : ""}` }}>
            {props.name}
          </h3>
        </div>
        <div className={style.cart_item_text_container}>
          <p
            className={`${style.cart_item_title} ${style.price} ${
              props.event === "草莓季" ? style.event_title : ""
            }`}
          >
            單價
          </p>{" "}
          <p>{props.price}元</p>
        </div>
        <p className={style.cart_item_count}>
          <Button
            onClick={plusHandler}
            className={`${style.item_count} ${
              props.event === "草莓季" ? style.event_btn : ""
            } ${style.plus}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
          </Button>
          <Button
            onClick={minusHandler}
            className={`${style.item_count} ${
              props.event === "草莓季" ? style.event_btn : ""
            } ${style.minus}`}
            disabled={productIsMin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
            </svg>
          </Button>

          {productCount}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={style.trash}
          onClick={removeCartItemHandler}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </Card>
    </li>
  );
};

export default CartItem;
