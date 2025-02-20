"use client";
import React from 'react'
import styles from './moreroducts.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode} from 'swiper/modules';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import Link from 'next/link';
import Colors from './Color';

function Moreproducts({moreItem}) {
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
</div>
<div className={styles.moreName}>{item.name}</div>
<div className={styles.morePrice}>{item.price.toLocaleString('fa-IR')} تومان</div>
<Colors colors = {item.colors}/>
</SwiperSlide>

        ))}



      </Swiper>
        </div>
    </div>
  )
}

export default Moreproducts