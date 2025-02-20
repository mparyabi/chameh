"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./checkout.module.css";
import FormAddress from "./FormAddress";
import { RiDeleteBinLine } from "react-icons/ri";
import Summary from "./Summary";

function RequireLogin({ user, addresses, from }) {
  const [selectedAddress, setSelectedAddress] = useState({});
  const [showForm, setShowForm] = useState(addresses.length === 0);
  const [localAddresses, setLocalAddresses] = useState(addresses);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: "دسترسی محدود",
        text: "برای دسترسی به این صفحه باید لاگین کنید",
        icon: "warning",
        confirmButtonText: "باشه",
      }).then(() => {
        router.push("/auth/login?from=checkout"); // تغییر مسیر به صفحه لاگین
      });
    }
  }, [user]);

  if (!user) return null; // اگر کاربر لاگین نکرده باشد، چیزی نمایش نمی‌دهد

  const handleDelete = async (addressId) => {
    try {
      const response = await fetch(`/api/address/${user._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addressId }),
      });
      if (response.ok) {
        Swal.fire({
          title: "موفقیت",
          text: "آدرس با موفقیت حذف شد",
          icon: "success",
          confirmButtonText: "باشه",
        }).then(() => {
          const updatedAddresses = localAddresses.filter(
            (addr) => addr._id !== addressId
          );
          setLocalAddresses(updatedAddresses);
          setSelectedAddress({});
          // اگر آدرس‌ها خالی شد، فرم را نمایش دهد
          if (updatedAddresses.length === 0) {
            setShowForm(true);
            router.refresh();
          } else {
            router.refresh();
          }
        });
      } else {
        Swal.fire({
          title: "خطا",
          text: "خطا در حذف آدرس",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* محتوای صفحه برای کاربران لاگین‌شده */}
      <div className={styles.checkoutContainer}>
        {from === "checkout" ? (
          <h1 className={styles.header}>انتخاب آدرس و پرداخت</h1>
        ) : (
          <h1 className={styles.header}>ویرایش آدرس ها</h1>
        )}
        <div className={styles.checkoutItems}>
          {addresses.length > 0 && (
            <>
              {from === "checkout" && (
                <h4>می توانید یکی از آدرس های قبلی را انتخاب کنید:</h4>
              )}

              {addresses.map((address) => (
                <div key={address._id}>
                  <div
                    onClick={() => setSelectedAddress(address)}
                    className={`${styles.addressItem} ${
                      selectedAddress._id === address._id && from==="checkout" ? styles.active : ""
                    }`}
                  >
                    <div className={styles.firstLine}>
                      <div className={styles.province}>
                        {" "}
                        <h4>استان: </h4> {address.province}{" "}
                      </div>
                      <div className={styles.city}>
                        {" "}
                        <h4>شهر: </h4> {address.city}{" "}
                      </div>
                      <div className={styles.address}>
                        <h4>آدرس: </h4> {address.streetAddress}{" "}
                      </div>
                    </div>
                    <div className={styles.secondLine}>
                      <div className={styles.postal}>
                        <h4>کد پستی : </h4>
                        {address.postalCode}
                      </div>
                      <div className={styles.landline}>
                        <h4>تلفن ثابت :</h4>
                        {address.phoneNumber}
                      </div>
                    </div>
                    <div className={styles.delete}>
                      <RiDeleteBinLine
                        onClick={() => handleDelete(address._id)}
                        size={25}
                        color="#610000"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div
                className={styles.moreAddress}
                onClick={() => setShowForm(true)}
              >
                اضافه کردن آدرس
              </div>
            </>
          )}
          {showForm && <FormAddress user={user} setShowForm={setShowForm} />}
        </div>
        {from === "checkout" && (
          <div className={styles.payBox}>
            <h4> جزئیات خرید </h4>
            <Summary selectedAddress={selectedAddress} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RequireLogin;
