import mongoose from 'mongoose';
const { Schema } = mongoose;

const provinceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('province', provinceSchema);