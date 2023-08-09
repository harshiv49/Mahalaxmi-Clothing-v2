import { Fragment } from "react";
import ShopWallpaperImage from "../../assets/shop_akaur.jpg";
import SHOP_DATA from "../../shop-data.json";
import ProductCard from "../../components/product-card/product_card_component";
import "./shop_component_styles.scss";
import ShopWallpaper from "../../components/shop-wallpaper/shop_wallpaper";


function Shop() {
  return (
    <Fragment>
    
      <ShopWallpaper image={ShopWallpaperImage}></ShopWallpaper>
      <div className="products-container">
        {SHOP_DATA.map((product) => {
          return <ProductCard key={product.id} product={product}></ProductCard>;
        })}
      </div>
    </Fragment>
  );
}

export default Shop;
