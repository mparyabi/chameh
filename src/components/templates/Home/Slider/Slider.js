import React from 'react';
import styles from '@/styles/Slider.module.css';
import Link from 'next/link';

function Slider() {
  return (
    <div className={styles.container}>
        <div className={styles.pix}>
        <div className={`${styles.Right} ${styles.slide}`}>
        <img src='/images/Slider/slider-right.jpg'/>
    </div>
    <div className={`${styles.Left} ${styles.slide}`}>
    <img src='/images/Slider/slider-left.jpg'/>
    </div>
        </div>
<div className={styles.buttons}>
<div className={styles.button}><Link href='#' style={{color:"white"}}>کالکشن بهار 1403</Link></div>
<div className={styles.button}><Link href='#' style={{color:"white"}} >کالکشن تابستان 1403</Link></div>
</div>
    </div>
  )
}

export default Slider