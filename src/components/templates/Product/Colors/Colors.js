"use client"
import React, { useState } from 'react'
import styles from './colors.module.css'

function Colors({colors}) {

    const [selectedItem, setSelectedItem] = useState(null);
    const ActiveHandle=(index)=>{
     setSelectedItem(index);
    }

  return (
    <>
    <div  className={styles.ColorsContainer}>
    {colors.map((color,index)=><div key={index} onClick={()=>ActiveHandle(index)}
    className={selectedItem==index ? styles.selectedColor :  styles.color} style={{backgroundColor:`${color}`}}></div>)}
    </div>
    </>
  )
}

export default Colors