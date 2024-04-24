import ProductsNav from "@/components/products-page/products-nav";

import style from "./page.module.css";
import ProductsPageMain from "@/components/products-page/products-page-main";

const Products = () => {
  return (
    <main className={style.products_page_container}>
      <ProductsNav />
      <ProductsPageMain />
    </main>
  );
};

export default Products;
