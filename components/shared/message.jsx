import Card from "../ui-elements/card";
import { useFn } from "@/context/cart-data-context";

import allData from "@/public/data";

import style from "./message.module.css";
import { useEffect, useState } from "react";

const Message = () => {
  const { cartMessage, setCartMessage, messageSlideDown, setMessageSlideDown } =
    useFn();
  const [currMessage, setCurrMessage] = useState([]);
  const { cartMessageData } = allData;

  useEffect(() => {
    if (cartMessageData.length === 0) {
      setMessageSlideDown(false);
      setCurrMessage([]);
      return;
    }
    if (cartMessage.length < currMessage.length) {
      setCurrMessage([...cartMessage]);
      return;
    }

    setCurrMessage([...cartMessage]);
    setTimeout(() => {
      setMessageSlideDown(true);
    }, 2500);
    setTimeout(() => {
      cartMessageData.pop();
      setCartMessage([...cartMessageData]);
      setMessageSlideDown(false);
    }, 3000);
  }, [cartMessage]);

  return (
    <div className={style.message_list_container}>
      {cartMessage &&
        cartMessage.map((d, ind) => (
          <Card
            key={d}
            style={{
              zIndex: `-${ind}`,
              top: `calc(1.5rem * ${ind}`,
            }}
            className={`${style.message_container} ${
              d.includes("草莓") ? style.event_container : ""
            } ${
              ind === cartMessage.length - 1 && messageSlideDown
                ? style.slide_out
                : ""
            }`}
          >
            <p className={style.message_header}>購物車</p>
            <p
              className={`${style.message_contain} ${
                d.includes("草莓") ? style.event_contain : ""
              }`}
            >
              已將{d}加入購物車
            </p>
          </Card>
        ))}
    </div>
  );
};

export default Message;
