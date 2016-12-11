'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = _bluebird.Promise; // mongoose's own Promise is deprecated, so replace it with bluebird

var router = _express2.default.Router();

// MAIN PAGE GET =====================
router.get('/', function (req, res, next) {
    res.sendFile(_path2.default.join(process.env.PWD, 'index.html'));
});

// ITEMS POST =====================
// router.post('/items', (req, res, next) => {
//     // Create new Item and save it
//     let item = new Item({
//         name: req.body.name,
//         quantity: req.body.quantity
//     }).save()
//
//     item.then(() => {
//             return Item.find().exec();
//         })
//         .then((items) => {
//             // return all items after successfully inserting
//             res.json({
//                 message: `Item: ${req.body.name} added successfully!`,
//                 items
//             });
//         })
//         .catch((err) => {
//             res.json({
//                 message: `Something went wrong while adding item: ${req.body.name}\n Please try again`,
//                 error: true
//             })
//             console.error(err);
//         });
// });

// LIST GET ======================
router.get('/:listID', function (req, res, next) {

    if (process.env.NODE_ENV === 'development') {
        res.sendFile(_path2.default.join(__dirname, '../../index_dev.html'));
    } else {
        res.sendFile(_path2.default.join(__dirname, '../../index.html'));
    }

    // let promise = Item.find().exec();
    // promise.then((items) => {
    //   res.json(items);
    // })
    // .catch((err) => {
    //   res.json({message: `Something went wrong while getting items. Please try again`});
    //   console.error(err);
    // });
});

// CREATE NEW LIST =================
router.post('/createList', function (req, res, next) {
    new _index.ShoppingList().save().then(function (list) {
        res.redirect('/' + list._id);
    }).catch(function (err) {
        console.error(err);
    });
});

var _default = router;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(router, 'router', 'server/routes/index.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'server/routes/index.js');
}();

;
//# sourceMappingURL=index.js.map