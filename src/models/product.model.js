import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'brand'
    },
    name: {
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    style: {
        name: {
            type: String,
            default: ''
        },
        code: {
            type: String,
            default: ''
        }
    },
    image: {
        url: {
            type: String,
            required: true
        },
        cloudId: {
            type: String,
            required: true
        }
    },
    strap: {
        name: {
            type: String,
            default: ''
        },
        code: {
            type: String,
            default: ''
        }
    },
    glass: {
        name: {
            type: String,
            default: ''
        },
        code: {
            type: String,
            default: ''
        }
    },
    system: {
        name: {
            type: String,
            default: ''
        },
        code: {
            type: String,
            default: ''
        }
    },
    description: {
        type: String,
        default: null
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

productSchema.index({ name: 'text', description: 'text', glass: 'text', strap: 'text', style: 'text' });
export default mongoose.model('product', productSchema);