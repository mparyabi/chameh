import React from 'react'
import styles from '@/styles/Footer.module.css';
import Image from 'next/image';

function Footer() {
  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <div className={styles.data}>
            <div className={styles.logo}> <Image src='/images/EnglishLogo.png' width={300} height={56} /> </div>
            <div className={styles.titr}> کالکشن ها </div>
            <div className={styles.texts}>
                <div className={styles.text}>بهار 1403</div>
                <div className={styles.text}>پاییز 1403</div>
                <div className={styles.text}>تابستان 1403</div>
            </div>

            <div className={styles.titr}> جستجو</div>
            <div className={styles.texts}>
                <div className={styles.text}>تماس با ما</div>
                <div className={styles.text}>FAQ</div>
                <div className={styles.text}>بازگشت کالا</div>
                <div className={styles.text}>خدمات</div>
            </div>
            </div>
        </div>
        <div className={styles.bottom}>
            <div className={styles.bottomTexts}>
            <div className={styles.bottomText}>Chameh Corporation</div>
            <div className={styles.bottomText}>25-2024</div>
            <div className={styles.bottomText}>All Rights Reserved</div>
            </div>
        </div>
    </div>   
  )
}

export default Footer