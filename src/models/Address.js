// models/address.js
import mongoose from "mongoose";

// تعریف اسکیمای آدرس
const addressSchema = new mongoose.Schema({
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  postalCode: {
    type: String,
    required: false
  }
});

// مدل آدرس را ثبت می‌کنیم
const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;