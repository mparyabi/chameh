const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                min: 1,
                default: 1
            },
            price: {
                type: Number,
                required: true
            } ,
            color:{
                type: String ,
                required: false
            },
            size: {
                type:String,
                required:false
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        province:String,
        streetAddress: String,
        city: String,
        postalCode: String,
        landline:String,
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'PayPal', 'Cash on Delivery'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);