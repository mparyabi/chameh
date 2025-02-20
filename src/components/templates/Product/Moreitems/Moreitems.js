"use client"
import React from 'react'
import styles from './moreitems.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import Link from 'next/link';

function Moreitems({moreItem}) {
  return (
    <div className={styles.Container}>
        <div className={styles.Product}>

        <Swiper
        slidesPerView={4}
        spaceBetween={0}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        height={1300}
        width={1300}
        modules={[FreeMode]}
        className="mySwiper"
      >

        {moreItem.map((item)=>(
        <SwiperSlide>
        <div className={styles.Imagewrapper}>
        <Link href={`/product/${item._id.toString()}`}><img className={styles.ProductImg} src={item.thumbnail}/></Link>
        <div className={styles.AddtoCard}>
          <div className={styles.shortDesc}>{item.description}</div>
          <div className={styles.AddButton}>افزودن به سبد</div>
        </div>
        </div>
        <div className={styles.moreName}>{item.name}</div>
        <div className={styles.morePrice}>{item.price.toLocaleString('fa-IR')} تومان</div>
        
        </SwiperSlide>
        ))}

      </Swiper>
        </div>
    </div>
  )
}

export default Moreitems