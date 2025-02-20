import React from 'react'
import styles from './page.module.css';

import dynamic from 'next/dynamic';
import Form from '@/components/templates/Contact-us/Form';

const MapComponent = dynamic(() => import('@/components/templates/Contact-us/Map'), {
  ssr: false, // غیرفعال‌سازی رندر در سمت سرور
});


function Contactus() {
  return (
    <div>
  <img className={styles.contactBanner} src='/images/contact-us/contact-banner.jpg' />
   <MapComponent/>
   <div className={styles.infoContainer}>

  <div className={styles.infoBlackbox}>
  <div className={styles.contactIcon}><img style={{width:'50px'}} src='/images/contact-us/location.png'/></div>
  <div className={styles.contactIcon}><img style={{width:'50px'}} src='/images/contact-us/phone.png'/></div>
  <div className={styles.contactIcon}><img style={{width:'50px'}} src='/images/contact-us/email.png'/></div>
  </div>

    <div className={styles.contactTextcontainer}>
      <div className={styles.contactText}>کد پستی : 1961753165</div>
      <div className={styles.contactLine} style={{top:'28%;'}}></div>
      <div className={styles.contactText}>تلفن و فکس : 45000912873</div>
      <div className={styles.contactLine} style={{top:'63%;'}}></div>
      <div className={styles.contactText}>ایمیل : maryam@gmail.com</div>
    </div>

   </div>

   <div className={styles.formContainer}>
    <div className={styles.form}>
      <img className={styles.formImg} src='/images/contact-us/m-logo.png'/>
      <p className={styles.formText}>برای اطلاعات بیشتر ایمیل و یا شماره تلفن خود را وارد کنید</p>
     <Form/>
    </div>
   </div>
    </div>
  )
}

export default Contactus