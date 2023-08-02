import mongoose from 'mongoose';
const { Schema } = mongoose;

const userschema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    fullName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    avatar: {
        url: {
            type: String,
            default: ''
        },
        cloudId: {
            type: String,
            default: ''
        }
    }
}, { timestamps: true })

export default mongoose.model('user', userschema)
