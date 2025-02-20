"use client";
import React, { useEffect, useState } from "react";
import styles from "./summary.module.css";
import { useCart } from "@/context/CartContext";
import { FaRegCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function Summary({ selectedAddress }) {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();

  const [copounCode, setCopounCode] = useState("");
  const [iscopoun, setIscopoun] = useState(false);
  const [copoundetails, setCopoundetails] = useState({});


  const handlePay = async () => {
    if (Object.keys(selectedAddress).length == 0) {
      Swal.fire({
        title: "خطا",
        text: "لطفا یک آدرس را انتخاب کنید",
        icon: "warning",
        confirmButtonText: "باشه",
      });
      return null;
    }

    const items = cart.map((item) => ({
      product: item.name,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
      color: item.color,
    }));

    const address = {
      province: selectedAddress.province,
      landline: selectedAddress.phoneNumber,
      city: selectedAddress.city,
      streetAddress: selectedAddress.streetAddress,
      postalCode: selectedAddress.postalCode,
    };

    const paymentMethod = "Credit Card";

    try {
      const response = await fetch(`/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, address, paymentMethod }),
      });
      if (response.ok) {
        clearCart();
        Swal.fire({
          title: "موفقیت",
          text: "سفارش شما با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
        }).then(() => {
          router.push("/");
        });
      } else {
        alert("خطا در ثبت سفارش");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCoupon = async () => {
    const response = await fetch(`/api/discounts`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: copounCode }),
    });
    if (response.status == 404) {
      Swal.fire({
        title: "خطا",
        text: "این کد تخفیف موجود نمی باشد",
        icon: "error",
        confirmButtonText: "باشه",
      });
      return;
    }

    if (response.status == 405) {
      Swal.fire({
        title: "خطا",
        text: "این کد تخفیف منقضی شده است",
        icon: "error",
        confirmButtonText: "باشه",
      });
      return;
    }

    if (response.status == 406) {
      Swal.fire({
        title: "خطا",
        text: "هنوز زمان استفاده از این کد فرا نرسیده",
        icon: "warning",
        confirmButtonText: "باشه",
      });
      return;
    }

    if (response.status == 400) {
      Swal.fire({
        title: "خطا",
        text: "استفاده از این کد به حد نصاب رسیده",
        icon: "warning",
        confirmButtonText: "باشه",
      });
      return;
    }

    if (response.status == 200) {
      const data = await response.json();
      setCopoundetails(data.data);
      setIscopoun(true);

      Swal.fire({
        title: "تبریک",
        text: "کد تخفیف با موفقیت اعمال شد",
        icon: "success",
        confirmButtonText: "باشه",
      }).then();
    }
  };

  return (
    <div className={styles.summaryItem}>
      <div className={styles.details}>
        {cart.map((item) => (
          <>
            <div className={styles.item}>
              <div className={styles.itemName} key={item._id}>
                {item.name}
              </div>
              <div className={styles.price}>
                {item.price.toLocaleString("fa-IR")} تومان
              </div>
            </div>
          </>
        ))}
        {iscopoun ? (
          <>
            <div className={styles.beforePrice}>
              {totalPrice.toLocaleString("fa-IR")} تومان
            </div>
            <div className={styles.total}>
              {copoundetails.discountType == "percentage"
                ? `  جمع کل : ${(
                    totalPrice -
                    (totalPrice * copoundetails.amount) / 100
                  ).toLocaleString("fa-IR")} تومان`
                : `  جمع کل : ${(
                    totalPrice - copoundetails.amount
                  ).toLocaleString("fa-IR")} تومان`}
            </div>
          </>
        ) : (
          <div className={styles.total}>
            جمع کل : {totalPrice.toLocaleString("fa-IR")} تومان
          </div>
        )}
      </div>

      <div className={styles.coupon}>
        <input
          type="text"
          className={styles.couponInput}
          placeholder="کد تخفیف را وارد کنید"
          value={copounCode}
          onChange={(e) => setCopounCode(e.target.value)}
        ></input>
        <div onClick={handleCoupon} className={styles.couponButton}>
          اعمال کد تخفیف
        </div>
      </div>

      <div className={styles.payButtonContainer}>
        <div onClick={handlePay} className={styles.payButton}>
          <FaRegCreditCard className={styles.CreditCard} /> پرداخت صورتحساب{" "}
        </div>
      </div>
    </div>
  );
}

export default Summary;
