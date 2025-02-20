import React from 'react'
import styles from './Collection.module.css';
import Link from 'next/link';

function Collection({img , id , name , count}) {
  return (
    
        <Link  href={`/collection/${id}`}className={styles.CollectionContainer}>
        <img src={img} className={styles.CollectionImg}/>
        <div className={styles.CollectionTitr}>تابستان 1403</div>
        <div className={styles.HoverDetails}>
            <div className={styles.Details}>
                <div className={styles.DetailsTitr}>{name}</div>
                <div className={styles.DetailsColl}>بهار 1403</div>
                <div className={styles.DetailsCount}>{count.toLocaleString('fa-IR')} قطعه</div>
                <div className={styles.DetailsShowMore}>نمایش بیشتر</div>
            </div>
        </div>
    </Link>
 
  )
}

export default Collection