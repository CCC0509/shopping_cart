import ProductsList from "@/components/main-page-products-list/product-list";
import WallPaper from "@/components/home/wallpaper";
import HomeAbout from "@/components/home/home-about";
import ScrollHandler from "@/components/home/scroll-handler";

import style from "./page.module.css";
import NavigateButton from "@/components/home/navigate-botton";

export default function Home() {
  return (
    <ScrollHandler className={style.home_container}>
      <NavigateButton />
      <WallPaper />
      <HomeAbout />
      <ProductsList />
    </ScrollHandler>
  );
}
