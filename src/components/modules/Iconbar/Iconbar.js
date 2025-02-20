import React from 'react'
import styles from './iconbar.module.css';
import { TbTruckReturn } from "react-icons/tb";
import { MdDeliveryDining } from "react-icons/md";
import { LuPackageCheck } from "react-icons/lu";
import { TiDocumentText } from "react-icons/ti";

function Iconbar() {
  return (
    <>
    <div className={styles.IconTextContainer}>
<div className={styles.serviceTitr}>خدمات ویژه</div>
<div className={styles.IconText}> <div className={styles.Icon}><TbTruckReturn/></div> <div className={styles.Text}>ضمانت بازگشت محصول</div> </div>
<div className={styles.IconText}> <div className={styles.Icon}><MdDeliveryDining/></div> <div className={styles.Text}>ارسال رایگان</div> </div>
<div className={styles.IconText}> <div className={styles.Icon}><LuPackageCheck/></div> <div className={styles.Text}>بسته بندی ویژه</div> </div>
<div className={styles.IconText}> <div className={styles.Icon}><TiDocumentText/></div> <div className={styles.Text}>لورم ایپسوم متن ساز</div> </div>
</div>
</>
  )
}

export default Iconbar
