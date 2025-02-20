"use client";
import React from "react";
import styles from "./discount.module.css";
import { useRouter } from "next/navigation";

const AdminDiscountTable = ({ discounts }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    const response = await fetch(`/api/discounts`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      alert("کد تخفیف با موفقیت حذف شد");
      router.refresh();
    } else {
      alert("خطا در حذف کد تخفیف");
    }
  };
  return (
    <>
      {discounts.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>کد تخفیف</th>
                <th>توضیحات</th>
                <th>نوع تخفیف</th>
                <th>مقدار</th>
                <th>تاریخ شروع</th>
                <th>تاریخ پایان</th>
                <th>محدودیت استفاده</th>
                <th>تعداد استفاده‌شده</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount._id}>
                  <td>{discount.code}</td>
                  <td>{discount.description || "—"}</td>
                  <td>
                    {discount.discountType === "percentage" ? "درصدی" : "ثابت"}
                  </td>
                  <td>{discount.amount.toLocaleString("fa-IR")}</td>
                  <td>
                    {new Date(discount.startDate).toLocaleDateString("fa-IR")}
                  </td>
                  <td>
                    {new Date(discount.endDate).toLocaleDateString("fa-IR")}
                  </td>
                  <td>{discount.usageLimit || "نامحدود"}</td>
                  <td>{discount.usedCount}</td>
                  {discount.endDate < new Date() ? (
                    <td style={{ color: "orange" }}>تاریخ گذشته</td>
                  ) : discount.usedCount == discount.usageLimit ? (
                    <td style={{ color: "red" }}>تمام شده</td>
                  ) : discount.startDate > new Date() ? (
                    <td style={{ color: "orange" }}>شروع نشده</td>
                  ) : (
                    <td style={{ color: "green" }}>فعال</td>
                  )}
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(discount._id)} // ارسال id تخفیف برای حذف
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.empty}> کد تخفیفی وجود ندارد </div>
      )}
    </>
  );
};

export default AdminDiscountTable;
