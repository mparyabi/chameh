"use client";

import React, { useEffect, useState } from "react";
import styles from "./orders.module.css";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          //    credentials: 'include', // ارسال کوکی‌ها در درخواست
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          setUser(data.data); // ذخیره اطلاعات کاربر در state
        }
      } catch (error) {
        console.error("خطا در احراز هویت", error);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const checkOrders = async () => {
      try {
        const res = await fetch(`/api/order/${user._id}`, {
          method: "GET",
          //    credentials: 'include', // ارسال کوکی‌ها در درخواست
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          setOrders(data.data);
        }
      } catch (error) {
        console.error("خطا در دریافت orders", error);
      }
    };

    checkOrders();
  }, [user]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };
  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>سفارشات گذشته</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>شماره سفارش</th>
            <th>تاریخ</th>
            <th>مبلغ کل</th>
            <th>وضعیت</th>
            <th>جزئیات</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.toString()}</td>
              <td>{new Date(order.createdAt).toLocaleDateString("fa-IR")}</td>
              <td>{order.totalAmount.toLocaleString("fa-IR")} تومان</td>
              <td>
                <span
                  className={`${styles.status} ${
                    order.status === "Delivered"
                      ? styles.delivered
                      : order.status === "Pending"
                      ? styles.pending
                      : order.status === "Cancelled"
                      ? styles.Cancelled
                      : null
                  }`}
                >
                  {order.status === "Delivered"
                    ? "ارسال شده"
                    : order.status === "Pending"
                    ? "در حال پردازش"
                    : order.status === "Cancelled"
                    ? "لغو شده"
                    : null}
                </span>
              </td>
              <td>
                <button
                  className={styles.detailsButton}
                  onClick={() => handleViewDetails(order)}
                >
                  مشاهده
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length == 0 && (
        <div className={styles.loading}>در حال بارگزاری...</div>
      )}
      {selectedOrder && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>جزئیات سفارش {selectedOrder._id}</h3>
            <p>
              تاریخ:{" "}
              {new Date(selectedOrder.createdAt).toLocaleDateString("fa-IR")}
            </p>
            <p
              className={`${styles.status} ${
                selectedOrder.status === "Delivered"
                  ? styles.delivered
                  : selectedOrder.status === "Pending"
                  ? styles.pending
                  : selectedOrder.status === "Cancelled"
                  ? styles.Cancelled
                  : null
              }`}
            >
              وضعیت:
              {selectedOrder.status === "Delivered"
                ? "ارسال شده"
                : selectedOrder.status === "Pending"
                ? "در حال پردازش"
                : selectedOrder.status === "Cancelled"
                ? "لغو شده"
                : null}
            </p>
            {/* جدول نمایش محصولات */}
            <table className={styles.productsTable}>
              <thead>
                <tr>
                  <th>نام محصول</th>
                  <th>قیمت</th>
                  <th>رنگ</th>
                  <th>سایز</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((product, index) => (
                  <tr key={index}>
                    <td>{product.product}</td>
                    <td>{product.price.toLocaleString("fa-IR")} تومان</td>
                    <td>
                      <div
                        className={styles.productTablecolor}
                        style={{ backgroundColor: `${product.color}` }}
                      ></div>
                    </td>
                    <td>{product.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>قیمت کل {selectedOrder.totalAmount.toLocaleString("fa-IR")}</h4>
            <button className={styles.closeButton} onClick={closeModal}>
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
