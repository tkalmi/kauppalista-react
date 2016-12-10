'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ITEM SCHEMA ========================
var ItemSchema = new _mongoose2.default.Schema({
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

var _default = _mongoose2.default.model('Item', ItemSchema);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ItemSchema, 'ItemSchema', 'server/models/Item.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'server/models/Item.js');
}();

;
//# sourceMappingURL=Item.js.map