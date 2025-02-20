// app/dashboard/Sidebar.jsx
"use client"
import React from "react";
import styles from "./sidebar.module.css";
import { CiShop } from "react-icons/ci";
import { PiAddressBookTabsLight } from "react-icons/pi";



export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
       <a href="/p-user/orders" className={styles.navLink}> <CiShop size={24}/>  سفارشات </a>
        <a href="/p-user/address" className={styles.navLink}> <PiAddressBookTabsLight size={20}/> مدیریت آدرس ها</a>
      </nav>
    </aside>
  );
}
