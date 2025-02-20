import React from 'react'
import styles from './ProductCard.module.css'
import Link from 'next/link'

function ProductCard({ProductId , img , Colors , price , name}) {
  return (
    <Link  href={`/product/${ProductId.toString()}`}className={styles.CollectionContainer}>
    <img src={img} className={styles.CollectionImg}/>
    <div className={styles.HoverDetails}>
        <div className={styles.Details}>
            <div className={styles.DetailsColl}>{name}</div>
            <div className={styles.DetailsCount}>{price.toLocaleString('fa-IR')} تومان</div>
            <div className={styles.ColorsContainer}>
              {Colors.map((color,index)=>(
                <div key={index} className={styles.Color} style={{backgroundColor:`${color}`}} ></div>
              ))}
            </div>
        </div>
    </div>
</Link>
  )
}

export default ProductCard