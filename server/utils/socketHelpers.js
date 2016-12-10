import {
    Item,
    ShoppingList
} from '../models/index';

import {
    Promise
} from 'bluebird'


/**
 * Handles Redux actions arriving via socket connection
 * @parameter socket - socket instance for the client that sent the action
 * @parameter listID - ObjectId of the list that's concerned with the action
 * @parameter action - Redux action object
 * @parameter io - server's socket.io instance
 */
export function socketActions(socket, listID, action, io) {

    switch (action.type) {
        case 'SEND_ITEM_TO_SERVER':
            // Adds an item to list
            new Item({
                    name: action.name,
                    quantity: action.quantity,
                    unit: action.unit,
                    additionalInfo: action.additionalInfo
                }).save()
                .then((newItem) => {
                    console.log(`[INFO]: Item ${newItem.name} saved to list ${listID}`)
                    socket.emit('hide_spinner');
                    io.to(listID).emit('add_item', newItem);
                    return newItem
                }).then((newItem) => {
                    return ShoppingList.findByIdAndUpdate(listID, {
                        $push: {
                            'items': newItem._id
                        }
                    }, {
                        new: true
                    })
                })
                .catch((err) => {
                    console.error(err)
                })
            break;
        case 'GET_LIST_FROM_SERVER':
            // Gets list by ObjectId
            ShoppingList.findById(action.listID).populate({
                    path: 'items',
                    match: {
                        archived: false,
                        deleted: false
                    }
                })
                .then((list) => {
                    socket.emit('set_list', list);
                })
                .catch(err => {
                    console.log('Something went wrong while fetching list for ' + listID);
                    console.error(err)
                    socket.emit('show_error', 'Syöttämäsi osoite ei vastannut yhtään listaa.')
                });
            break;
        case 'UPDATE_ITEM':
            // Updates a specific item
            Item.findById(action.item._id).then((item) => {
                item.name = typeof action.item.name !== 'undefined' ? action.item.name : item.name;
                item.quantity = typeof action.item.quantity !== 'undefined' ? action.item.quantity : item.quantity;
                item.unit = typeof action.item.unit !== 'undefined' ? action.item.unit : item.unit;
                item.additionalInfo = typeof action.item.additionalInfo !== 'undefined' ? action.item.additionalInfo : item.additionalInfo;
                item.archived = typeof action.item.archived !== 'undefined' ? action.item.archived : item.archived;
                item.bought = typeof action.item.bought !== 'undefined' ? action.item.bought : item.bought;
                item.deleted = typeof action.item.deleted !== 'undefined' ? action.item.deleted : item.deleted;

                return item.save();
            }).then((item) => {
                console.log(`[INFO]: Item ${item.name} updated in list ${listID}`)
                io.to(listID).emit('update_item', item)
            }).catch(err => {
                console.error(err)
                socket.emit('show_error', `Esinettä ${item.name} ei voitu päivittää tietokantaan. Yritä uudelleen!`)
            })
            break;
        case 'ARCHIVE_ITEMS':
            // Archives bought items
            let idArr = action.items.map(item => (item._id))
            Item.update({
                    _id: {
                        $in: idArr
                    }
                }, {
                    $set: {
                        archived: true
                    }
                }, {
                    multi: true
                })
                .then(() => {
                    let promise = ShoppingList.findById(listID).populate({
                        path: 'items',
                        match: {
                            archived: false,
                            deleted: false
                        }
                    })
                    return promise
                })
                .then((list) => {
                    io.to(listID).emit('set_list', list);
                    socket.emit('hide_spinner');
                })
                .catch(err => {
                    console.log('Something went wrong while archiving items for list ' + listID);
                    console.error(err)
                    socket.emit('show_error', 'Jotakin meni pieleen. Lataa sivu uudelleen ja toivo parasta!')
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
export function socketOnConnection(socket, listID) {
    ShoppingList.findById(listID).populate({
            path: 'items',
            match: {
                archived: false,
                deleted: false
            }
        })
        .then((list) => {
            // if list was not found, redirect to front page
            if (!list) {
                return res.redirect('/');
            }
            socket.join(listID); // join to shoppinglist's socket room
            socket.emit('set_list', list) // set the new connection's current state
        }).catch(err => {
            console.log('Something went wrong while fetching list for ' + listID);
            console.error(err)
            socket.emit('show_error', 'Syöttämäsi osoite ei vastannut yhtään listaa.')
        });
}
