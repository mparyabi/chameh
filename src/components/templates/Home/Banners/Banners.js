import React from 'react';
import styles from '@/styles/Banners.module.css';
import Link from 'next/link';
import Image from 'next/image';

function Banners() {
  return (
    <div className={styles.container}>
       <div className={styles.first}>
      <Link href="#" className={styles.firstRight}><div ><Image src='/images/mainpage/firstRight.jpg' width={602} height={400} alt='Jacket Reversible'/></div></Link> 
      <Link href="#" className={styles.firstLeft}><div ><Image src='/images/mainpage/firstLeft.jpg' width={929} height={400} alt='WHite Jacjket'/></div></Link>  
       </div>
       <div className={styles.second}>
       <Link href="#" className={styles.secondRight}><div><Image src='/images/mainpage/secondRight.jpg' width={602} height={400} alt=''/></div></Link>
       <Link href="#" className={styles.secondLeft}><div><Image src='/images/mainpage/secondLeft.jpg' width={929} height={400} alt=''/></div></Link>  
       </div>
       <div className={styles.third}>
       <Link href="#" className={styles.thirdRight}><div><Image src='/images/mainpage/thirdRight.jpg' width={900} height={400} alt=''/></div></Link> 
       <Link href="#" className={styles.thirdLeft}> <div><Image src='/images/mainpage/thirdLeft.jpg' width={602} height={400} alt=''/></div></Link> 
       </div>
       <div className={styles.fourth}>
       <Link href="#" className={styles.fourthRight}><div><Image src='/images/mainpage/fourthRight.jpg' width={900} height={400} alt=''/></div></Link> 
        <Link href="#" className={styles.fourthLeft}> <div><Image src='/images/mainpage/fourthLeft.jpg' width={602} height={400} alt=''/></div></Link> 
       </div>
    </div>
    
  )
}

export default Banners