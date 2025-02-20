"use client";
import React from 'react'
import styles from '@/app/contact-us/page.module.css';

function Form() {
  return (
    <form className={styles.FormElements}>
    <input  type="text" placeholder="YOUR EMAIL ADDRESS / PHONE NUMBER" className={styles.formInput}/>
    <button className={styles.formButton}>ارسال</button>
  </form>
  )
}

export default Form