import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 5
    }
}, { timestamps: true });

export default mongoose.model('comment', commentSchema);