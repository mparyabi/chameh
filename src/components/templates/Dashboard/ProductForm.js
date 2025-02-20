"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ProductForm.module.css";

const ProductForm = ({ onCreate, onEditProduct, mode, product }) => {
  const fileInputRef = useRef(null); // مرجع ورودی فایل

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    collections: [],
    stock: true,
    colors: [],
    sizes: [],
    thumbnail: null,
    images: [],
  });

  useEffect(() => {
    if (mode === "Edit") {
      setFormData({
        name: `${product.name}`,
        price: `${product.price}`,
        description: `${product.description}`,
        collections: product.collections,
        stock: product.stock,
        colors: product.colors,
        sizes: product.sizes,
        thumbnail: product.thumbnail,
        images: product.images,
      });
    }
  }, [mode]);


  const [newColor, setNewColor] = useState("#000000");
  const [newSize, setNewSize] = useState("");
  const [categories, setCategories] = useState([]);

  // دریافت دسته‌بندی‌ها از API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/product/category");
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAvailability = () => {
    setFormData((prev) => ({ ...prev, stock: !prev.stock }));
  };

  const addColor = () => {
    if (!formData.colors.includes(newColor)) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor],
      }));
    }
  };

  const addSize = () => {
    if (newSize.trim() && !formData.sizes.includes(newSize)) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, newSize.trim()],
      }));
      setNewSize("");
    }
  };

  const handlethumbnailChange = (e) => {
    const file = e.target.files[0];

    // اعتبارسنجی نوع فایل
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/jpg",
    ];
    if (!validImageTypes.includes(file.type)) {
      alert("لطفا فقط عکس انتخاب کنید (JPEG, PNG, GIF, WEBP)");
      setFormData((prev) => ({ ...prev, thumbnail: null }));
      fileInputRef.current.value = "";
      return;
    }

    // اعتبارسنجی اندازه فایل (حداکثر 2 مگابایت)
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_FILE_SIZE) {
      alert("فایل بزرگ تر از 2 مگابایت ممنوع است!");
      setFormData((prev) => ({ ...prev, thumbnail: null }));
      fileInputRef.current.value = "";
      return;
    }

    setFormData((prev) => ({ ...prev, thumbnail: file }));
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };


  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...formData.images, ...files];
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const removeColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color),
    }));
  };

  const removeSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  const removethumbnail = () => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: null,
    }));
    fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const createData = new FormData();
    createData.append("name", formData.name);
    createData.append("price", formData.price);
    createData.append("description", formData.description);
    createData.append("collections", formData.collections);
    createData.append("stock", formData.stock);
    createData.append("colors", formData.colors);
    createData.append("sizes", formData.sizes);
    createData.append("thumbnail", formData.thumbnail);
    formData.images.forEach((image) => {
      createData.append("images", image);
    });

    if (!formData.thumbnail) {
      alert("لطفا عکس انتخاب کنید");
      return;
    }
    onCreate(createData);
  };

  const handleEdit = (e) => {

    e.preventDefault();

    const createData = new FormData();
    createData.append("name", formData.name);
    createData.append("price", formData.price);
    createData.append("description", formData.description);
    createData.append("collections", formData.collections);
    createData.append("stock", formData.stock);
    createData.append("colors", formData.colors);
    createData.append("sizes", formData.sizes);
    createData.append("thumbnail", formData.thumbnail);
    formData.images.forEach((image) => {
      createData.append("images", image);
    });

    onEditProduct(createData);
  };

  return (
    <form
      onSubmit={mode === "Create" ? handleSubmit : handleEdit}
      className={styles.form}
    >
      <div className={styles.field}>
        <label htmlFor="name" className={styles.fieldLabel}>
          نام محصول:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="price" className={styles.fieldLabel}>
          قیمت:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price.toLocaleString("fa-IR")}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description" className={styles.fieldLabel}>
          توضیحات:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
        ></textarea>
      </div>

      <div className={styles.field}>
        <label htmlFor="category" className={styles.fieldLabel}>
          دسته‌بندی:
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={(e) => {
            const selectedCategory = e.target.value;
            setFormData((prev) => ({
              ...prev,
              collections: [selectedCategory], // بروزرسانی آرایه collections در formData
            }));
          }}
          className={styles.input}
          required
        >
          <option value="">انتخاب دسته‌بندی</option>
          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
              selected={product && category._id === product.collections[0]}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* وضعیت موجودی */}
      <div className={styles.field}>
        <label className={styles.fieldLabel}>وضعیت محصول:</label>
        <div className={styles.inlineGroup}>
          <input
            type="checkbox"
            id="isAvailable"
            checked={formData.stock}
            onChange={toggleAvailability}
            className={styles.checkbox}
          />
          <label htmlFor="isAvailable">
            {formData.stock ? "موجود" : "ناموجود"}
          </label>
        </div>
      </div>

      {/* مدیریت رنگ‌ها */}
      <div className={styles.field}>
        <label className={styles.fieldLabel}>رنگ‌ها:</label>
        <div className={styles.inlineGroup}>
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className={styles.colorPicker}
          />
          <button type="button" onClick={addColor} className={styles.addButton}>
            اضافه کن
          </button>
        </div>
        <ul className={styles.list}>
          {formData.colors.map((color) => (
            <li key={color} className={styles.listItem}>
              <span
                className={styles.colorBox}
                style={{ backgroundColor: color }}
              ></span>
              {color}
              <button type="button" onClick={() => removeColor(color)}>
                حذف
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* مدیریت سایزها */}
      <div className={styles.field}>
        <label className={styles.fieldLabel}>سایزها:</label>
        <div className={styles.inlineGroup}>
          <input
            type="text"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            placeholder="اضافه کردن سایز جدید"
            className={styles.input}
          />
          <button type="button" onClick={addSize} className={styles.addButton}>
            اضافه کن
          </button>
        </div>
        <ul className={styles.list}>
          {formData.sizes.map((size) => (
            <li key={size} className={styles.listItem}>
              {size}
              <button type="button" onClick={() => removeSize(size)}>
                حذف
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* انتخاب عکس محصول */}
      <div className={styles.field}>
        <label htmlFor="thumbnail" className={styles.fieldLabel}>
          انتخاب عکس اصلی محصول:
        </label>
        <input
          type="file"
          id="thumbnail"
          name="thumbnail"
          accept="image/*"
          ref={fileInputRef} // مرجع ورودی فایل
          onChange={handlethumbnailChange}
          className={styles.input}
        />
      </div>
      {/* نمایش پیش‌نمایش عکس اصلی */}
      {formData.thumbnail && (
        <div className={styles.imagePreview}>
          <div className={styles.imageContainer}>
            <img
              src={
                mode === "Create"
                  ? URL.createObjectURL(formData.thumbnail) // اگر حالت ایجاد است، پیش‌نمایش فایل جدید
                  : formData.thumbnail instanceof File
                  ? URL.createObjectURL(formData.thumbnail) // اگر تصویر جدید انتخاب شده، پیش‌نمایش نمایش داده شود
                  : formData.thumbnail // اگر حالت ویرایش است، تصویر قبلی که از سرور آمده را نمایش می‌دهیم
              }
              alt="Main Product"
              className={styles.imageThumbnail}
            />
            {/* دکمه حذف عکس اصلی */}
            <button
              type="button"
              onClick={() => removethumbnail()}
              className={styles.removeButton}
            >
              ✖
            </button>
          </div>
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="images" className={styles.fieldLabel}>
          انتخاب تصاویر گالری:
        </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleGalleryImageChange}
          className={styles.input}
        />
      </div>

      {/* پیش‌نمایش گالری عکس‌ها */}
      {formData.images.length > 0 && (
        <div className={styles.imagePreview}>
          <div className={styles.galleryPreview}>
            {formData.images.map((file, index) => (
              <div key={index} className={styles.imageContainer}>
                <img
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                  alt={`Gallery Image ${index + 1}`}
                  className={styles.imageThumbnail}
                />
                {/* دکمه حذف */}
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className={styles.removeButton}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>
      )}



      <button type="submit" className={styles.submitButton}>
        ارسال
      </button>
    </form>
  );
};

export default ProductForm;
