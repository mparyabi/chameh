import React from 'react'
import styles from '@/styles/About.module.css';
import Link from 'next/link';

function About() {
  return (
    <div className={styles.container}>
        <div className={styles.top}>
        <div><img className={styles.logo} src='/images/m-logo.png'/></div>
        <div className={styles.text}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</div>
        </div>
        <div className={styles.bottom}>
        <div className={styles.date}>1403-04</div>
        <div className={styles.title}>کالکشن جدید بهار - تابستان</div>
        <div className={styles.detail}>به زودی</div>
        </div>
    </div>
  )
}

export default About