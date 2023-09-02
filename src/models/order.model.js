import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        quantity: Number,
        price: Number,
        name: String,
        imageUrl: String,
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        fullName: String,
        phoneNumber: String,
        province: String,
        district: String,
        ward: String,
        description: String
    },
    paymentMethod: {
        code: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    isPayment: {
        type: Boolean,
        default: false
    },
    cancelReason: {
        type: String,
        default: null
    },
    status: {
        code: {
            type: String,
            required: true,
            default: '01'
        },
        name: {
            type: String,
            required: true,
            default: 'Chờ xác nhận'
        }
    }
}, { timestamps: true });

export default mongoose.model('order', orderSchema);