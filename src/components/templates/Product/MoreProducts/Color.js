"use client"
import React, { useState } from 'react'
import styles from './color.module.css'

function Colors({colors , ColorHandle , colorItem}) {

  return (
    <>
    <div  className={styles.ColorsContainer}>
    {colors.map((color,index)=><div key={index} onClick={()=>ColorHandle(color)}
    className={colorItem==color ? styles.selectedColor :  styles.color} style={{backgroundColor:`${color}`}}></div>)}
    </div>
    </>
  )
}

export default Colors