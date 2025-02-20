import Image from 'next/image'
import React from 'react'
import styles from './aboutus.module.css'

function page() {
  return (
    <div>
    <Image width={2200} height={500} src='/images/about-us/top-about-us.jpg' style={{objectFit:'cover',width:'100%'}}/>
    <div className={styles.textandlogo}>
        <div><img className={styles.logointextandlogo} src='/images/m-logo.png'/></div>
        <div className={styles.textintextandlogo}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</div>
    </div>

    <Image width={2200} height={400} src='/images/about-us/aboutUs-Chameh.jpg' style={{objectFit:'cover',width:'100%'}}/>

    <div className={styles.textandlogo}>
        <div><img className={styles.logointextandlogo} src='/images/m-logo.png' style={{ transform: 'rotate(180deg)'}} /></div>
        <div className={styles.textintextandlogo}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</div>
    </div>

    <div className={styles.CarouselContainer}>
    <Image width={500} height={400} src='/images/about-us/about-slider1.jpg' className={styles.imageCarousel}/>
    <Image width={500} height={400} src='/images/about-us/about-slider2.jpg' className={styles.imageCarousel}/>
    <Image width={500} height={400} src='/images/about-us/about-slider3.jpg' className={styles.imageCarousel}/>
    <Image width={500} height={400} src='/images/about-us/about-slider4.jpg' className={styles.imageCarousel}/>
    </div>

    <div className={styles.ceoContainer}>
    <img src='/images/about-us/maryam-haghi.jpg' className={styles.ceoImage} />
    </div>

    <div className={styles.ceotextcontainer}>
        <div>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</div>
    </div>

    <div className={styles.sign}>
    <img src='/images/about-us/sign.jpg' className={styles.signImg}/>
    <div className={styles.ceoName}>Maryam Haghi</div>
    </div>
    
    </div>

  )
}

export default page