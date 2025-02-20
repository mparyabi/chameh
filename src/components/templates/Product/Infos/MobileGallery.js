"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import styles from "./mobilegallery.module.css"; // فایل CSS Module برای استایل‌دهی

function MySwiper({ gallery, thumbnail,setMainimg }) {
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={3} // تعداد اسلاید‌های نمایش داده شده
        spaceBetween={10} // فاصله بین اسلایدها
        pagination={{ clickable: true }} // افزودن نقطه‌های ناوبری
        modules={[Navigation, Pagination]} // ماژول‌های استفاده‌شده
        style={{ width: "100%", height: "185px" }} // استایل‌دهی به Swiper
      >
        <SwiperSlide onClick={()=>setMainimg(thumbnail)}>
          <div className={styles.slideContent}>
            <img src={thumbnail} className={styles.image} />
          </div>
        </SwiperSlide>
        {gallery.map((item, index) => (
          <SwiperSlide key={index} onClick={()=>setMainimg(item)}>
            <div className={styles.slideContent}>
              <img
                src={item}
                alt={`Slide ${index + 1}`}
                className={styles.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MySwiper;
