import mongoose from 'mongoose';
const { Schema } = mongoose;

const warrantyCardSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    deadline: {
        from: {
            type: Date,
            default: Date.now()
        },
        to: {
            type: Date,
            required: true
        }
    },
    customerInfo: {
        fullName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

export default mongoose.model('warrantyCard', warrantyCardSchema);