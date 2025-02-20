"use client";
import React, { useState } from "react";
import styles from "./formAddress.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function FormAddress({user , setShowForm}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    province: "",
    city: "",
    streetAddress: "",
    phoneNumber: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.province) newErrors.province = "استان الزامی است";
    if (!formData.city) newErrors.city = "شهر الزامی است";
    if (!formData.streetAddress) newErrors.streetAddress = "آدرس الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`/api/address/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ province: "", city: "", streetAddress: "", phoneNumber: "", postalCode: "" });
        setErrors({});

        Swal.fire({
          title: "موفقیت",
          text: "آدرس با موفقیت اضافه شد",
          icon: "success",
          confirmButtonText: "باشه",
        }).then(() => {
          router.refresh();
          setShowForm(false);
        });

      } else {
        alert("خطا در اضافه کردن آدرس");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
    <h2 className={styles.formTitle}>ثبت آدرس</h2>
    <form>
      <div className={styles.formGroup}>
        <label className={styles.label}>استان</label>
        <input type="text" className={styles.inputField} name="province" value={formData.province} onChange={handleChange} />
        {errors.province && <span className={styles.error}>{errors.province}</span>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>شهر</label>
        <input type="text" className={styles.inputField} name="city" value={formData.city} onChange={handleChange}  />
        {errors.city && <span className={styles.error}>{errors.city}</span>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>آدرس</label>
        <textarea className={styles.textareaField} name="streetAddress" value={formData.streetAddress} onChange={handleChange} ></textarea>
        {errors.streetAddress && <span className={styles.error}>{errors.streetAddress}</span>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>کد پستی</label>
        <input type="text" className={styles.inputField} name="postalCode" value={formData.postalCode} onChange={handleChange}  />
       
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>تلفن ثابت</label>
        <input type="text" className={styles.inputField} name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
       
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.submitButton} onClick={handleSubmit} >ثبت</button>
      </div>
    </form>
  </div>
  );
}

export default FormAddress;