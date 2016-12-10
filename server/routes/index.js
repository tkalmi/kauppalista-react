import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import {
    Promise
} from 'bluebird';
import {
    Item,
    ShoppingList
} from '../models/index';

mongoose.Promise = Promise; // mongoose's own Promise is deprecated, so replace it with bluebird

const router = express.Router();

// MAIN PAGE GET =====================
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
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
router.get('/:listID', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../../index.html'));
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
router.post('/createList', (req, res, next) => {
    new ShoppingList().save()
        .then((list) => {
            res.redirect(`/${list._id}`)
        })
        .catch(err => {
            console.error(err)
        })
});

export default router;
