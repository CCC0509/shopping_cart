import allData from "@/public/data";
import ProductsList from "@/components/products/product-list";
import WallPaper from "@/components/home/wallpaper";
import HomeAbout from "@/components/home/home-about";
import ScrollHandler from "@/components/home/scroll-handler";

import style from "./page.module.css";

export default function Home() {
  return (
    <ScrollHandler className={style.home_container}>
      <WallPaper />

      <HomeAbout />

      <ProductsList />
    </ScrollHandler>
  );
}
