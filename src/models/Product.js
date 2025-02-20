import mongoose from "mongoose";
const Collection = require('./Collection');

const productSchema = new mongoose.Schema({
  stock:{
type:Boolean,
default:true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
  },
  colors: {
    type: [String], // آرایه‌ای از رنگ‌ها به صورت رشته
    required: false,
  },
  sizes: {
    type: [String], // آرایه‌ای از سایزها به صورت رشته
    required: false,
  },
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection", // ارتباط با مدل دسته‌بندی
    },
  ],
  thumbnail: {
    type: String, // آدرس URL برای عکس شاخص
  },
  images: {
    type: [String], // آرایه‌ای از URLها برای تصاویر دیگر محصول
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);