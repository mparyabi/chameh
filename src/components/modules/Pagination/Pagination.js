import React from 'react'
import styles from '@/app/collection/[id]/CollectionPage.module.css'
import Link from 'next/link';

function Pagination({page , totalPages}) {
  if (totalPages==1){
  return null;
  }
  return (
    <div className={styles.PaginationContainer}>
      {Array(totalPages).fill(null).map((_, index)=>(
       <Link key={index} className={ index+1==page ? `${styles.Paginationno} ${styles.active}`: styles.Paginationno} href={`?page=${index+1}`} passHref><div>{index+1}</div></Link>
      ))}
</div>
  )
}

export default Pagination