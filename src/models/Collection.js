// models/collection.js
import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0, // مقدار پیش‌فرض 0
  },
  
  thumbnail:{
    type: String
  } ,
  
  description : {
    type: String
  }
});

export default mongoose.models.Collection || mongoose.model("Collection", collectionSchema);