"use client";
import { useEffect, useState } from "react";

import { useFn } from "@/context/cart-data-context";
import allData from "@/public/data";
import ProductsItem from "../main-page-products-list/product-item";

import style from "./products-page-main.module.css";

const ProductsPageMain = () => {
  const [pageSelecter, setPageSelecter] = useState(1);
  const { type } = useFn();
  const { data } = allData;
  const filterData = data.filter((d) => {
    if (type === "所有商品") return d;
    if (d.type === type) return d.type;
    if (d.event === type) return d.event;
  });
  const pageController = [];
  for (let i = 1; i <= Math.ceil(filterData.length / 2); i++) {
    pageController.push(i);
  }
  useEffect(() => {
    setPageSelecter(1);
  }, [type]);
  const pageChange = (e) => {
    setPageSelecter(Number(e.target.innerText));
  };

  return (
    <main className={style.container}>
      <h2 className={`${type === "草莓季" ? style.event : ""}`}>{type}</h2>
      <section className={style.products_list_container}>
        {filterData
          .sort((a, b) => b.event.localeCompare(a.event))
          .filter(
            (d, ind) => 2 * (pageSelecter - 1) <= ind && ind < 2 * pageSelecter
          )
          .map((d, ind) => {
            return (
              <ProductsItem
                key={d.id}
                name={d.name}
                price={d.price}
                image={d.image}
                event={d.event}
                data={d}
                className={style.card}
              />
            );
          })}
      </section>
      <div
        className={`${style.page_controller_container} ${
          type === "草莓季" ? style.event : ""
        }`}
      >
        {pageController.map((page) => (
          <p
            className={`${style.page_controller} ${
              pageSelecter === page ? style.active : ""
            } ${type === "草莓季" ? style.event : ""} `}
            key={page}
            onClick={pageChange}
          >
            {page}
          </p>
        ))}
      </div>
    </main>
  );
};

export default ProductsPageMain;
