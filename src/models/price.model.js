import mongoose from 'mongoose';
const { Schema } = mongoose;

const priceSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('price', priceSchema);