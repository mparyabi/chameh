import React from 'react'
import Collection from '@/components/modules/Collection/Collection';
import styles from './collections.module.css';
import CollectionModel from '@/models/Collection';
import connectToDB from '@/utils/db';

async function Collections() {
await connectToDB();
const collections =await CollectionModel.find({},'-description').lean();
  return (
    <>
    <div className={styles.HeaderContainer}> 
    <img src='/images/collections/logo.png'/>
    <div className={styles.Text}>آخرین کالکشن ها</div>
    </div>
        <div className={styles.CollectionsContainer}>
          {collections.map((collection)=> <Collection 
           key={collection._id}
           img={collection.thumbnail} 
           id={collection._id.toString()}
           name={collection.name}
           count={collection.count}
           />) }
    </div>
    </>
  )
}

export default Collections