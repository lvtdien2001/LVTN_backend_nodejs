import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        supplier: {
            type: Schema.Types.ObjectId,
            ref: 'supplier',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('goodsReceivedNote', noteSchema);