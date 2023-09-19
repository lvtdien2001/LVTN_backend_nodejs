import mongoose from 'mongoose';
const { Schema } = mongoose;

const warrantyCardSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required
    },
    deadline: {
        type: Date,
        required
    }
}, { timestamps: true });

export default mongoose.model('warrantyCard', warrantyCardSchema);