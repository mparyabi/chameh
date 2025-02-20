"use client";

import ProductForm from "@/components/templates/Dashboard/ProductForm";

const CreateProductPage = () => {
  const handleCreateProduct = async (productData) => {

    try {
      // ارسال اطلاعات به API
      const response = await fetch("/api/product", {
        method: "POST",
        body: productData
      });

      if (response.ok) {
        alert("محصول با موفقیت ایجاد شد!");
        window.location.href = "/p-admin/products";
      } else {
        alert("ایجاد محصول با خطا مواجه شد.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("مشکلی رخ داد.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>ایجاد محصول جدید</h1>
      <ProductForm onCreate={handleCreateProduct} mode={"Create"} />
    </div>
  );
};

export default CreateProductPage;
