import mongoose from 'mongoose';
const { Schema } = mongoose;

const otpSchema = new Schema({
    code: {
        type: Number,
        length: 6,
        required: true
    },
    deadline: {
        type: Schema.Types.Date,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('otp', otpSchema)
