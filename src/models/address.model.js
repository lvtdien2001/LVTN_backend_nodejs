import mongoose from 'mongoose';
const { Schema } = mongoose;

const addressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    province: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('address', addressSchema)
