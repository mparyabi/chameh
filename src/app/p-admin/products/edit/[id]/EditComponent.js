"use client"
import React from 'react'
import ProductForm from "@/components/templates/Dashboard/ProductForm";

function EditComponent({product}) {

    const handleEditProduct = async (productData) => {
        try {
          // ارسال اطلاعات به API
          const response = await fetch(`/api/product/${product._id}`, {
            method: "PATCH",
            body: productData,
          });
    
          if (response.ok) {
            alert("محصول با موفقیت ویرایش شد!");
            window.location.href = "/p-admin/products";
          } else {
            alert("ویرایش محصول با خطا مواجه شد.");
          }
        } catch (error) {
          console.error("Error creating product:", error);
          alert("مشکلی رخ داد.");
        }
      };

  return (
       <ProductForm onEditProduct={handleEditProduct} mode={"Edit"} product={product} />
  )
}

export default EditComponent