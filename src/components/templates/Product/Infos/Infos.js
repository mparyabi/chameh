"use client";
import React, { useState } from "react";
import Sizes from "../Sizes/Sizes";
import Colors from "../MoreProducts/Color";
import styles from "@/app/product/[id]/product.module.css";
import { useCart } from "@/context/CartContext";
import Swal from "sweetalert2";
import MobileGallery from "./MobileGallery";

function Infos({ product }) {
  const { addToCart } = useCart();
  const [mainimg, setMainimg] = useState(product.thumbnail);
  const [sizeItem, setSizeItem] = useState("");
  const [colorItem, setColorItem] = useState("");

  const SizeHandle = (size) => {
    setSizeItem(size);
  };

  const ColorHandle = (color) => {
    setColorItem(color);
  };

  const order = {
    quantity: 1,
    name: product.name,
    price: product.price,
    _id: product._id.toString(),
    thumbnail: product.thumbnail,
    size: sizeItem,
    color: colorItem,
  };

  const addToCartHandle = () => {
    if (!product.stock) {
      Swal.fire({
        title: "متاسفیم",
        text: " این کالا ناموجود است",
        icon: "error",
        confirmButtonText: "باشه",
      });
      return;
    }

    if (!sizeItem && product.sizes.length > 0) {
      Swal.fire({
        title: "توجه",
        text: "باید حتما سایز را انتخاب کنید!",
        icon: "warning",
        confirmButtonText: "باشه",
      });
      return;
    }

    if (!colorItem && product.colors.length > 0) {
      Swal.fire({
        title: "توجه",
        text: "باید حتما رنگ را انتخاب کنید!",
        icon: "warning",
        confirmButtonText: "باشه",
      });
      return;
    }

    addToCart(order);
    Swal.fire({
      title: "تبریک",
      text: "محصول با موفقیت به سبد خرید اضافه شد",
      icon: "success",
      confirmButtonText: "باشه",
    });
  };

  return (
    <>
      <div className={styles.HeaderContainer}>
        <img src="/images/collections/logo.png" />
        <div className={styles.Text}>{product.collections[0]?.name}</div>
      </div>

      <div className={styles.InfoContainer}>
        <div className={styles.mainImg}>
          <img src={mainimg} />
        </div>
        {/* فقط برای موبایل قابل مشاهده است */}
      <MobileGallery gallery={product.images} thumbnail={product.thumbnail} setMainimg={setMainimg}/>
        {/* فقط برای موبایل قابل مشاهده است */}
        <div className={styles.detailsInfo}>
          <div className={styles.productName}>{product.name}</div>
          <div className={styles.price}>
            {product.price.toLocaleString("fa-IR")} تومان
          </div>

          <div
            style={{ display: "flex", alignItems: "center", height: "50px" }}
          >
            <div style={{ marginLeft: "10px" }}>وضعیت کالا : </div>
            {product.stock ? (
              <h3> موجود</h3>
            ) : (
              <h3 style={{ color: "#a70000" }}> ناموجود</h3>
            )}
          </div>
          {console.log("product size length", product.sizes.length)}
          {product.sizes.length > 0 && product.stock ? (
            <div className={styles.availables}>سایزهای موجود</div>
          ) : null}

          {product.stock && product.sizes.length > 0 ? (
            <div className={styles.sizes}>
              <Sizes
                SizeHandle={SizeHandle}
                sizes={product.sizes}
                sizeItem={sizeItem}
              />
            </div>
          ) : null}

          {product.colors.length > 0 && product.stock ? (
            <div className={styles.availables}>رنگ های موجود</div>
          ) : null}
          {product.stock && (
            <Colors
              colors={product.colors}
              ColorHandle={ColorHandle}
              colorItem={colorItem}
            />
          )}
          <div className={styles.shortDesc}>{product.description}</div>
          <div className={styles.buttons}>
            <div className={styles.preorder}>پیش سفارش</div>
            <div className={styles.addCart} onClick={addToCartHandle}>
              اضافه به سبدخرید
            </div>
          </div>
          <div className={styles.thumbnailsContainer}>
            {/* عکس اصلی محصول */}
            <img
              src={product.thumbnail}
              className={styles.thumbnail}
              onClick={() => setMainimg(product.thumbnail)}
            />
            {/* باقی مانده عکس ها*/}
            {product.images?.map((thumb, index) => (
              <img
                src={thumb}
                className={styles.thumbnail}
                key={index}
                onClick={() => setMainimg(thumb)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Infos;
