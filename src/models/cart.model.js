import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('cart', cartSchema);