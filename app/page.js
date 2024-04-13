import allData from "@/public/data";
import ProductsList from "@/components/products/product-list";
import WallPaper from "@/components/home/wallpaper";
import HomeAbout from "@/components/home/home-about";
import ScrollHandler from "@/components/home/scroll-handler";
import { useFn } from "@/context/cart-data-context";

import style from "./page.module.css";

const { data, cart } = allData;

export default function Home() {
  return (
    <ScrollHandler className={style.home_container}>
      <WallPaper />

      <HomeAbout />

      <ProductsList data={data} cart={cart} />
    </ScrollHandler>
  );
}
