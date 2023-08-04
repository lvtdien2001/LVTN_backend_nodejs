import mongoose from 'mongoose';
const { Schema } = mongoose;

const staticSchema = new Schema({
    name: String,
    code: String,
    category: String
}, { timestamps: true });

export default mongoose.model('static', staticSchema);