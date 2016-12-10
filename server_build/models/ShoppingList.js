'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ITEM SCHEMA ========================
var ShoppingListSchema = new _mongoose2.default.Schema({
    items: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    date_created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

var _default = _mongoose2.default.model('ShoppingList', ShoppingListSchema);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ShoppingListSchema, 'ShoppingListSchema', 'server/models/ShoppingList.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'server/models/ShoppingList.js');
}();

;
//# sourceMappingURL=ShoppingList.js.map