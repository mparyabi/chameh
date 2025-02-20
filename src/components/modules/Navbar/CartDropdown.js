// CartDropdown.js
import React from 'react';
import { useCart } from '@/context/CartContext';
import styles from './cartdropdown.module.css'; // استایل‌های خود را اضافه کنید
import Link from 'next/link';
import { MdOutlineDeleteForever } from "react-icons/md";

const CartDropdown = () => {
  const { cart, totalPrice } = useCart();
  const { removeFromCart } = useCart();
  return (
    <div className={styles.dropdown}>
      {cart.length === 0 ? (
        <div>سبد خرید شما خالی است</div>
      ) : (
        <>
          <ul className={styles.cartListContainer}>
            {cart.map(item => (
              <li className={styles.cartItem} key={item._id}>
               <Link href={`/product/${item._id.toString()}`} style={{color:"inherit" , display:"flex"}}>
               <img className={styles.itemImg} src={item.thumbnail}/> 
               <div className={styles.itemName}> {item.name} <br/> <div className={styles.itemPrice}> {item.price.toLocaleString('fa-IR')} تومان </div> </div> </Link>
               <div onClick={()=>removeFromCart(item._id)} className={styles.RemoveItem}><MdOutlineDeleteForever size={18}/></div>
              </li>
            ))}
          </ul>
          <div style={{fontWeight:"bold"}}>جمع کل: {totalPrice.toLocaleString('fa-IR')} تومان</div>
          <Link href={'/cart'}><div className={styles.cartLink}> نمایش سبد خرید </div></Link>
        </>
      )}
    </div>
  );
};

export default CartDropdown;