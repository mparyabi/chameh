"use client"
import React, { useState } from 'react'
import styles from './sizes.module.css'

function Sizes({ sizes , SizeHandle ,sizeItem}) {

  return (<>
    <div  className={styles.SizesContainer}>
    {sizes.map((size,index)=><div key={index} onClick={()=>SizeHandle(size)} className={sizeItem==size ?  styles.sizeSelected : styles.size}>{size}</div>)}
    </div></>
  )
}

export default Sizes