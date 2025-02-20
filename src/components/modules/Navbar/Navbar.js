"use client"
import React, { useEffect } from 'react';
import styles from '@/styles/Navbar.module.css';
import Link from 'next/link';
import CartDropdown from './CartDropdown';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import SearchDropdown from './SearchDropdown';

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'GET',
      //    credentials: 'include', // ارسال کوکی‌ها در درخواست
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.status === 200) {
          const data = await res.json()
          setUser(data.data); // ذخیره اطلاعات کاربر در state
        }
      } catch (error) {
        console.error("خطا در احراز هویت", error)
      }
    }

    checkAuth()
  }, []);

  const { totalItems } = useCart();
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [searchDropdownOpen,setSearchDropdownOpen] = useState(false);

  return (
    <div className={styles.container}>

<div className={styles.menu}>
    <Link className={styles.menuitem} href="/"> خانه </Link>
    <Link className={styles.menuitem} href="/collections"> کالکشن ها </Link>
    <Link className={styles.menuitem} href="/products"> محصولات </Link>
    <Link className={styles.menuitem} href="/about-us"> درباره ما </Link>
    <Link className={styles.menuitem} href="/contact-us">تماس با ما </Link>
</div>

{/* شروع منوی همبرگری */}
<div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
  <div className={styles.bar}></div>
  <div className={styles.bar}></div>
  <div className={styles.bar}></div>
</div>

{menuOpen && (
  <>
    {/* افکت تاریکی پس‌زمینه */}
    <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>

    {/* منوی همبرگری */}
    <div className={styles.mobileMenu}>
      <Link className={styles.menuitem} onClick={()=>setMenuOpen(false)} href="/"> خانه </Link>
      <Link className={styles.menuitem} onClick={()=>setMenuOpen(false)} href="/collections"> کالکشن‌ها </Link>
      <Link className={styles.menuitem} onClick={()=>setMenuOpen(false)} href="/products"> محصولات </Link>
      <Link className={styles.menuitem} onClick={()=>setMenuOpen(false)} href="/about-us"> درباره ما </Link>
      <Link className={styles.menuitem} onClick={()=>setMenuOpen(false)} href="/contact-us"> تماس با ما </Link>
    </div>
  </>
)}


{/* پایان منوی همبرگری */}

<div className={styles.logo}>
   <Link href="/"> <img className={styles.logoimg} src='/images/logo.jpg'/> </Link>
</div>

<div className={styles.icons}>
    <div className={styles.right}>
        <div onMouseEnter={() => setSearchDropdownOpen(true)} onMouseLeave={() => setSearchDropdownOpen(false)} style={{ position: 'relative' }} >
          <img className={styles.iconimgs} src='/images/search.png'/> <div>{searchDropdownOpen && <SearchDropdown />}</div> </div>
        <Link href="#"><img className={styles.iconimgs} src='/images/lang.png'/></Link>
        <Link href="#"><img className={styles.iconimgs} src='/images/heart.png'/></Link>
    </div>
    <div className={styles.left}>
    <div onMouseEnter={() => setCartDropdownOpen(true)}  onMouseLeave={() => setCartDropdownOpen(false)} className={styles.cartcontainer}>
    <img className={styles.iconimgs} src='/images/cart.png'/>  <div>{cartDropdownOpen && <CartDropdown />}</div> 
    <div className={styles.price}>{totalItems.toLocaleString('fa-IR')}</div></div>

    <Link href={user?'/p-user':'/auth/login?from=/'}>
     <img className={styles.iconimgs} src='/images/account.png'/>
    </Link>

  
    </div>
</div>
    </div>
    
  )
}

export default Navbar