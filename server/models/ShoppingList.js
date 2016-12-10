import mongoose from 'mongoose';
import Item from './Item';

// ITEM SCHEMA ========================
const ShoppingListSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    date_created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export default mongoose.model('ShoppingList', ShoppingListSchema);
