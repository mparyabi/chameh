// app/dashboard/Header.jsx
"use client"
import React from "react";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";



export default function Header({user}) {
const router=useRouter();


   if(!user){
   router.push('/auth/login?from=p-user');
   return;
   }

  const logoutHandle=async()=>{
    
      try {
        const res = await fetch('/api/auth/logout', {
          method: 'POST',
      //    credentials: 'include', // ارسال کوکی‌ها در درخواست
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.status === 200) {
          Swal.fire({
            title: "موفقیت",
            text: "با موفقیت از حساب خود خارج شدید",
            icon: "success",
            confirmButtonText: "باشه",
          }).then(() => {
            router.push('/auth/login?from=p-user');
          });
      
        }
      } catch (error) {
        console.error("خطا در Lougout", error)
      }
    
  }
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>داشبورد کاربر</h1>
      <div className={styles.userSection}>
        <span className={styles.userName}>سلام، {user.name} عزیز!</span>
        <button className={styles.logoutButton} onClick={logoutHandle} >خروج</button>
      </div>
    </header>
  );
}
