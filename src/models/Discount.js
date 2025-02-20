const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'], // درصدی یا مقدار ثابت
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value > 0; // مقدار تخفیف باید بزرگ‌تر از صفر باشد
      },
      message: 'Amount must be greater than 0',
    },
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startDate; // تاریخ پایان باید بعد از تاریخ شروع باشد
      },
      message: 'End date must be greater than start date',
    },
  },
  usageLimit: {
    type: Number,
    required: false, // محدودیت تعداد استفاده (اختیاری)
    default: null,
  },
  usedCount: {
    type: Number,
    required: true,
    default: 0, // تعداد دفعات استفاده‌شده
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  // applicableProducts: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Product', // ارجاع به مدل محصولات (در صورت محدود بودن تخفیف به محصولات خاص)
  //   },
  // ],
});

export default mongoose.models.Discount || mongoose.model("Discount", discountSchema);

