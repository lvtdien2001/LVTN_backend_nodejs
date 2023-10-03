import mongoose from 'mongoose';
const { Schema } = mongoose;

const districtSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    parent_code: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('district', districtSchema);