import mongoose from 'mongoose';
const { Schema } = mongoose;

const supplierSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('supplier', supplierSchema);