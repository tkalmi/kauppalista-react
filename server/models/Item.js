import mongoose from 'mongoose';

// ITEM SCHEMA ========================
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String
    },
    archived: {
      type: Boolean,
      default: false
    },
    bought: {
      type: Boolean,
      default: false
    },
    deleted: {
      type: Boolean,
      default: false
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export default mongoose.model('Item', ItemSchema);
