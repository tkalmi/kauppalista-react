'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.socketActions = socketActions;
exports.socketOnConnection = socketOnConnection;

var _index = require('../models/index');

var _bluebird = require('bluebird');

/**
 * Handles Redux actions arriving via socket connection
 * @parameter socket - socket instance for the client that sent the action
 * @parameter listID - ObjectId of the list that's concerned with the action
 * @parameter action - Redux action object
 * @parameter io - server's socket.io instance
 */
function socketActions(socket, listID, action, io) {

    switch (action.type) {
        case 'SEND_ITEM_TO_SERVER':
            // Adds an item to list
            new _index.Item({
                name: action.name,
                quantity: action.quantity,
                unit: action.unit,
                additionalInfo: action.additionalInfo
            }).save().then(function (newItem) {
                console.log('[INFO]: Item ' + newItem.name + ' saved to list ' + listID);
                socket.emit('hide_spinner');
                io.to(listID).emit('add_item', newItem);
                return newItem;
            }).then(function (newItem) {
                return _index.ShoppingList.findByIdAndUpdate(listID, {
                    $push: {
                        'items': newItem._id
                    }
                }, {
                    new: true
                });
            }).catch(function (err) {
                console.error(err);
            });
            break;
        case 'GET_LIST_FROM_SERVER':
            // Gets list by ObjectId
            _index.ShoppingList.findById(action.listID).populate({
                path: 'items',
                match: {
                    archived: false,
                    deleted: false
                }
            }).then(function (list) {
                socket.emit('set_list', list);
            }).catch(function (err) {
                console.log('Something went wrong while fetching list for ' + listID);
                console.error(err);
                socket.emit('show_error', 'Syöttämäsi osoite ei vastannut yhtään listaa.');
            });
            break;
        case 'UPDATE_ITEM':
            // Updates a specific item
            _index.Item.findById(action.item._id).then(function (item) {
                item.name = typeof action.item.name !== 'undefined' ? action.item.name : item.name;
                item.quantity = typeof action.item.quantity !== 'undefined' ? action.item.quantity : item.quantity;
                item.unit = typeof action.item.unit !== 'undefined' ? action.item.unit : item.unit;
                item.additionalInfo = typeof action.item.additionalInfo !== 'undefined' ? action.item.additionalInfo : item.additionalInfo;
                item.archived = typeof action.item.archived !== 'undefined' ? action.item.archived : item.archived;
                item.bought = typeof action.item.bought !== 'undefined' ? action.item.bought : item.bought;
                item.deleted = typeof action.item.deleted !== 'undefined' ? action.item.deleted : item.deleted;

                return item.save();
            }).then(function (item) {
                console.log('[INFO]: Item ' + item.name + ' updated in list ' + listID);
                io.to(listID).emit('update_item', item);
            }).catch(function (err) {
                console.error(err);
                socket.emit('show_error', 'Esinett\xE4 ' + item.name + ' ei voitu p\xE4ivitt\xE4\xE4 tietokantaan. Yrit\xE4 uudelleen!');
            });
            break;
        case 'ARCHIVE_ITEMS':
            // Archives bought items
            var idArr = action.items.map(function (item) {
                return item._id;
            });
            _index.Item.update({
                _id: {
                    $in: idArr
                }
            }, {
                $set: {
                    archived: true
                }
            }, {
                multi: true
            }).then(function () {
                var promise = _index.ShoppingList.findById(listID).populate({
                    path: 'items',
                    match: {
                        archived: false,
                        deleted: false
                    }
                });
                return promise;
            }).then(function (list) {
                io.to(listID).emit('set_list', list);
                socket.emit('hide_spinner');
            }).catch(function (err) {
                console.log('Something went wrong while archiving items for list ' + listID);
                console.error(err);
                socket.emit('show_error', 'Jotakin meni pieleen. Lataa sivu uudelleen ja toivo parasta!');
            });
            break;
        default:
            break;
    }
}

/**
 * Sets client's list on connection
 * @parameter socket - socket instance for the client
 * @parameter listID - ObjectId of the list the client is spectating
 */
function socketOnConnection(socket, listID) {
    _index.ShoppingList.findById(listID).populate({
        path: 'items',
        match: {
            archived: false,
            deleted: false
        }
    }).then(function (list) {
        // if list was not found, redirect to front page
        if (!list) {
            return res.redirect('/');
        }
        socket.join(listID); // join to shoppinglist's socket room
        socket.emit('set_list', list); // set the new connection's current state
    }).catch(function (err) {
        console.log('Something went wrong while fetching list for ' + listID);
        console.error(err);
        socket.emit('show_error', 'Syöttämäsi osoite ei vastannut yhtään listaa.');
    });
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(socketActions, 'socketActions', 'server/utils/socketHelpers.js');

    __REACT_HOT_LOADER__.register(socketOnConnection, 'socketOnConnection', 'server/utils/socketHelpers.js');
}();

;
//# sourceMappingURL=socketHelpers.js.map