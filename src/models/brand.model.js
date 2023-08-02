import mongoose from 'mongoose';
const { Schema } = mongoose;

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        url: {
            type: String,
            required: true
        },
        cloudId: {
            type: String,
            required: true
        }
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

export default mongoose.model('brand', brandSchema);