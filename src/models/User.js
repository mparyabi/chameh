const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum:["USER","ADMIN"],
    default: "USER",
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address", // ارتباط با مدل دسته‌بندی
      required:false
    },
  ],

  //   refreshToken: {
  //     type: String,
  //   },

  refreshToken: String,
});

try{
  const model = mongoose.models.User || mongoose.model("User", schema);
  module.exports = model;
}
catch(err){
  console.log("model not found", err)
}


