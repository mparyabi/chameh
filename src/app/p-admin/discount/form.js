"use client";
import { useState } from "react";
import styles from "./discount.module.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"; // تقویم فارسی
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import gregorian from "react-date-object/calendars/gregorian"; // تقویم میلادی
import persian_en from "react-date-object/locales/persian_en"; // زبان فارسی
import { useRouter } from "next/navigation";

function Form() {
  const [startDate, setStartDate] = useState(""); // تاریخ انتخاب‌شده
  const [endDate, setEndDate] = useState(""); // تاریخ انتخاب‌شده
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    amount: 0,
    usageLimit: "",
    // applicableProducts: [],
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // بررسی اینکه تاریخ‌ها مقدار دارند
      if (!startDate || !endDate) {
        alert("لطفاً تاریخ شروع و پایان را وارد کنید.");
        return;
      }

      const gregorianstartDate = startDate
        .convert(gregorian)
        .format("YYYY-MM-DDTHH:mm:ssZ");
      const gregorianendDate = endDate
        .convert(gregorian)
        .format("YYYY-MM-DDTHH:mm:ssZ");

      // ترکیب داده‌ها برای ارسال
      const dataToSend = {
        ...formData,
        startDate: new Date(gregorianstartDate), // تبدیل به Date برای Mongoose
        endDate: new Date(gregorianendDate), // تبدیل به Date برای Mongoose
      };

      console.log(dataToSend.discountType, dataToSend.amount);

      if (dataToSend.discountType == "percentage" && dataToSend.amount > 100) {
        alert("کد تخفیف درصدی نمی تواند بیشتر از 100 باشد!");
        return;
      }

      const response = await fetch("/api/discounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("کد تخفیف با موفقیت ایجاد شد");
        router.refresh();
        setFormData({
          code: "",
          description: "",
          discountType: "percentage",
          amount: 0,
          usageLimit: "",
          // applicableProducts: [],
        });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="code" className={styles.label}>
          کد تخفیف:
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          توضیحات:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="discountType" className={styles.label}>
          نوع تخفیف:
        </label>
        <select
          id="discountType"
          name="discountType"
          value={formData.discountType}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="percentage">درصدی</option>
          <option value="fixed">مقدار ثابت</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="amount" className={styles.label}>
          مقدار :
        </label>
        <input
          type="number"
          min={1}
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="startDate" className={styles.label}>
          تاریخ شروع:
        </label>

        <DatePicker
          inputClass={styles.input}
          containerStyle={{ width: "100%", margin: "10px 0" }} // استایل مستقیم
          value={formData.startDate}
          onChange={setStartDate}
          calendar={persian} // تنظیم تقویم به شمسی
          format="YYYY/MM/DD - HH:mm" // فرمت نمایش
          plugins={[<TimePicker position="bottom" />]}
          locale={persian_en}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="endDate" className={styles.label}>
          تاریخ پایان:
        </label>

        <DatePicker
          inputClass={styles.input}
          containerStyle={{ width: "100%", margin: "10px 0" }} // استایل مستقیم
          value={formData.endDate}
          onChange={setEndDate}
          calendar={persian} // تنظیم تقویم به شمسی
          format="YYYY/MM/DD - HH:mm" // فرمت نمایش
          locale={persian_en}
          plugins={[<TimePicker position="bottom" />]}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="usageLimit" className={styles.label}>
          محدودیت استفاده :{" "}
        </label>
        <input
          min={1}
          type="number"
          id="usageLimit"
          name="usageLimit"
          value={formData.usageLimit}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.button}>
        ساخت کد تخفیف
      </button>
    </form>
  );
}

export default Form;
