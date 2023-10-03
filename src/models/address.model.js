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
        code: String,
        name: String
    },
    district: {
        code: String,
        name: String
    },
    ward: {
        code: String,
        name: String
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
