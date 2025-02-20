// app/dashboard/Sidebar.jsx
"use client"
import React from "react";
import styles from "./sidebar.module.css";
import { CiShop } from "react-icons/ci";
import { TbCategory2 } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { GiClothes } from "react-icons/gi";
import { RiDiscountPercentLine } from "react-icons/ri";



export default function SidebarAdmin() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
       <a href="/p-admin/orders" className={styles.navLink}> <CiShop size={24}/>  سفارشات </a>
       <a href="/p-admin/products" className={styles.navLink}> <LuClipboardList size={20}/> مدیریت محصولات  </a>
       <a href="/p-admin/category" className={styles.navLink}> <TbCategory2 size={20}/> دسته بندی محصولات</a>
       <a href="/p-admin/products/create" className={styles.navLink}> <GiClothes size={20}/> ایجاد محصول جدید</a>
       <a href="/p-admin/discount" className={styles.navLink}> <RiDiscountPercentLine size={20}/> کدهای تخفیف</a>
      </nav>
    </aside>
  );
}
