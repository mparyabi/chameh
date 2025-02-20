import React from 'react'
import styles from './CollectionPage.module.css'
import ProductCard from '@/components/modules/ProductCard/ProductCard'
import Pagination from '@/components/modules/Pagination/Pagination';
import Iconbar from '@/components/modules/Iconbar/Iconbar';
import ProductModel from '@/models/Product';
import CollectionModel from '@/models/Collection';

async function CollectionPage({params , searchParams }) {
  const itemsPerPage = 9;
  const { id } = params;
  const page = parseInt(searchParams.page) || 1; // شماره صفحه
  const products =await ProductModel.find({collections:id});
  const collection =await CollectionModel.findById(id,"-thumbnail");

   // محاسبه محصولات برای صفحه جاری
   const startIndex = (page - 1) * itemsPerPage;
   const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  return (
    <>
    <div className={styles.CollectionPageContainer}>
     <div className={styles.HeaderContainer}> 
    <img src='/images/collections/logo.png'/>
    </div>
    <div className={styles.PageHeader}>
        <div className={styles.Count}>{collection.count.toLocaleString('fa-IR')} قطعه</div>
        <div className={styles.CollectionName}>بهار 1403</div>
        <div className={styles.subCollection}>{collection.name}</div>
    </div>

    <div className={styles.Description}>
    {collection.description}
    </div>
    <div className={styles.ShowMore}>درباره این کالکشن بیشتر بدانید</div>

    <div className={styles.ProductCardContainer}>
      {paginatedProducts.length > 0? paginatedProducts.map((product)=>(
     <ProductCard key={product._id.toString()} name={product.name} img={product.thumbnail} ProductId={product._id.toString()} price={product.price} Colors={product.colors}/>
      )) : <div>هیج محصولی برای نمایش وجود ندارد ...</div>}
    </div>  
    
    <Pagination page={page} totalPages={totalPages}/>
    
    <Iconbar/>

    </div>
    </>
  )
}

export default CollectionPage;