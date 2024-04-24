"use client";
import allData from "@/public/data";
import Button from "../ui-elements/button";
import { useFn } from "@/context/cart-data-context";

import style from "./products-nav.module.css";

const ProductsNav = () => {
  const { data } = allData;
  const { type, setType } = useFn();
  const allTypes = [
    "所有商品",
    ...new Set(data.filter((d) => d.event !== "").map((d) => d.event)),
    ...new Set(data.map((d) => d.type)),
  ];

  const typeHandler = (e) => {
    setType(e.target.innerText);
  };

  return (
    <div className={style.container}>
      <h2>商品分類</h2>
      <div className={style.button_container}>
        {allTypes.map((d) => {
          return (
            <Button
              className={style.type_btn}
              key={d}
              onClick={typeHandler}
              event={d === "草莓季" ? true : false}
              active={d === type ? true : false}
            >
              {d}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsNav;
