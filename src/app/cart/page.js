"use client";
// app/cart/page.js
import { useCart } from '@/context/CartContext';
import styles from './cart.module.css'; // فرض بر این است که از CSS Modules استفاده می‌کنید
import { CiCircleRemove } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import Link from 'next/link';



const CartPage = () => {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}> <CiShoppingCart/>سبد خرید</h1>
      {cart.length > 0 ? (
        <div className={styles.cartItems}>
          {cart.map((item) => (
          
            <div key={item._id} className={styles.cartItem}>
               <Link href={`/product/${item._id}`}>
              <img src={item.thumbnail} alt={item.name} className={styles.itemImage} /></Link>
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                { (item.size || item.color) ? <p className={styles.sizeColor}>{item.size} <p className={styles.color} style={{backgroundColor:`${item.color}`}}></p></p> :null }
                <p className={styles.itemPrice}>قیمت: {item.price.toLocaleString("fa-IR")} تومان</p>
                <button onClick={() => removeFromCart(item._id)} className={styles.removeButton}> <CiCircleRemove className={styles.CiCircleRemove} size={24}/> حذف</button>
              </div>
            </div>
          ))}
          <div className={styles.cartSummary}>
            <h3>جمع کل: {totalPrice.toLocaleString("fa-IR")} تومان</h3>
            <Link href={"/checkout"} className={styles.pay}> <MdOutlinePayment size={25}/>تسویه حساب</Link>
          </div>
        </div>
      ) : (
        <p className={styles.emptyCart}>سبد خرید خالی است</p>
      )}
    </div>
  );
};

export default CartPage;
