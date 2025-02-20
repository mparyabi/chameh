'use client';

import React, { useEffect, useState } from 'react';
import styles from './orders.module.css';

const AdminOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/order', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          setOrders(data.data);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (err) {
        setError('خطا در دریافت سفارشات');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.status === 200) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error('خطا در تغییر وضعیت سفارش', err);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>مدیریت سفارشات</h2>
      {loading ? (
        <div className={styles.loading}>در حال بارگزاری...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : orders.length === 0 ? (
        <div className={styles.noOrders}>هیچ سفارشی وجود ندارد.</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شماره سفارش</th>
              <th>نام کاربر</th>
              <th>ایمیل</th>
              <th>تاریخ</th>
              <th>مبلغ کل</th>
              <th>وضعیت</th>
              <th>مدیریت</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.toString()}</td>
                <td>{order.user?.name || 'نامشخص'}</td>
                <td>{order.user?.phone || 'شماره نامشخص'}</td>
                <td>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</td>
                <td>{order.totalAmount.toLocaleString('fa-IR')} تومان</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={styles.statusDropdown}
                  >
                    <option value="Pending">در انتظار</option>
                    <option value="Cancelled">لغو شده</option>
                    <option value="Delivered">تکمیل شده</option>
                  </select>
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
      )}
      {selectedOrder && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>جزئیات سفارش {selectedOrder._id}</h3>
            <p>نام کاربر: {selectedOrder.user?.name || 'نامشخص'}</p>
            <p>ایمیل: {selectedOrder.user?.email || 'ایمیل نامشخص'}</p>
            <p>تاریخ: {new Date(selectedOrder.createdAt).toLocaleDateString('fa-IR')}</p>
            <p>وضعیت: {selectedOrder.status}</p>
            <p>نوع پرداخت: {selectedOrder.paymentMethod}</p>
            <p>آدرس: {selectedOrder.address.province} - {selectedOrder.address.city} - {selectedOrder.address.streetAddress}</p>
            <p>تلفن ثابت :  {selectedOrder.address.landline}</p>
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
                    <td>{product.price.toLocaleString('fa-IR')} تومان</td>
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
            <p style={{fontWeight:'bold'}}>قیمت کل :  {selectedOrder.totalAmount.toLocaleString('fa-IR')}</p>
            <button className={styles.closeButton} onClick={closeModal}>
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersTable;
