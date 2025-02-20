import connectToDB from '@/utils/db';
import React from 'react';
import ProductModel from "@/models/Product";
import EditComponent from './EditComponent';


async function EditProductPage({params}) {
    await connectToDB();
    const {id}=params;
    const product = await ProductModel.findById(id , '-__v').lean();


  return (
    <div style={{ padding: "2rem" }}>
    <h1>ویرایش محصول {product.name}</h1>
    <EditComponent product={product}/>
  </div>
  )
}

export default EditProductPage