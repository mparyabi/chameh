"use client";

import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import styles from "./category.module.css";

const ManageCategories = () => {
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    image: null, // فقط فایل تصویر را ذخیره می‌کنیم
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/product/category");
        if (!res.ok) throw new Error("Error fetching categories");
        const data = await res.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!validTypes.includes(file.type)) {
      alert("لطفاً یک تصویر معتبر انتخاب کنید (JPEG, PNG, WEBP)");
      fileInputRef.current.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("فایل بزرگتر از 2 مگابایت مجاز نیست!");
      fileInputRef.current.value = "";
      return;
    }

    // فقط فایل تصویر را در فرم ذخیره می‌کنیم
    setForm((prev) => ({ ...prev, image: file }));
  };

  const resetForm = () => {
    setForm({ id: null, name: "", description: "", image: null });
    setIsEditing(false);
    fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);

      if (form.image) {
        formData.append("thumbnail", form.image); // فقط فایل واقعی را ارسال می‌کنیم
      }

      const method = isEditing ? "PATCH" : "POST";
      if (isEditing) formData.append("id", form.id);

      const res = await fetch("/api/product/category", {
        method,
        body: formData,
      });
      if (!res.ok) throw new Error("Error saving category");

      const updatedCategory = await res.json();

      if (isEditing) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === updatedCategory.data._id ? updatedCategory.data : cat
          )
        );
      } else {
        setCategories((prev) => [...prev, updatedCategory.data]);
      }

      Swal.fire(
        "عملیات موفق",
        isEditing ? "دسته‌بندی ویرایش شد" : "دسته‌بندی اضافه شد",
        "success"
      );
      resetForm();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "آیا مطمئنید؟",
      text: "این دسته‌بندی برای همیشه حذف خواهد شد!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/product/category", {
            method: "DELETE",
            body: JSON.stringify({ id }),
          });
          if (!res.ok) throw new Error("Error deleting category");

          setCategories((prev) => prev.filter((cat) => cat._id !== id));
          Swal.fire("حذف شد!", "دسته‌بندی با موفقیت حذف شد.", "success");
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      }
    });
  };

  const handleEdit = (category) => {
    setForm({
      id: category._id,
      name: category.name,
      description: category.description,
      image: category.thumbnail || null,
    });
    setIsEditing(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>مدیریت دسته‌بندی‌ها</h2>

      <div className={styles.formContainer}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="نام دسته‌بندی"
          className={styles.input}
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="توضیحات دسته‌بندی"
          className={styles.input}
        />
        <label>
          تصویر:
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        {/* Image preview */}
        {form.image && (
          <div className={styles.imagePreview}>
            <div className={styles.imageContainer}>
              <img
                src={
                  form.image instanceof File
                    ? URL.createObjectURL(form.image) // if the image is a file
                    : form.image // if the image is a URL
                }
                alt="Preview"
                className={styles.imageThumbnail}
              />
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, image: null }))}
                className={styles.removeButton}
              >
                ✖
              </button>
            </div>
          </div>
        )}

        <button onClick={handleSubmit} className={styles.submitButton}>
          {isEditing ? "ویرایش دسته‌بندی" : "اضافه کردن"}
        </button>
        {isEditing && (
          <button onClick={resetForm} className={styles.cancelButton}>
            انصراف
          </button>
        )}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>نام</th>
            <th>توضیحات</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button
                  onClick={() => handleEdit(category)}
                  className={styles.editButton}
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className={styles.deleteButton}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
