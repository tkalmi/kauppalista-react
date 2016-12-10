// DEVELOPMENT SPECIFIC STUFF
if (process.env.NODE_ENV !== 'production') {
    require('babel-register')({
        sourceMaps: true
    });
}

// SET PWD TO REPLACE __dirname FOR HEROKU ================
process.env.PWD = process.cwd();

import express from 'express';
import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {
    Promise
} from 'bluebird';
import fs from 'fs';
import url from 'url';
import path from 'path';
import favicon from 'serve-favicon';
import SocketIO from 'socket.io';
import http from 'http';
import Item from './models/Item';
import ShoppingList from './models/ShoppingList';
import { socketActions, socketOnConnection } from './utils/socketHelpers';

import router from './routes/index';


// CONFIG ENVIREONMENT CONSTANTS ===================
const port = process.env.PORT || 3000;

// DATABASE CONFIG =================================
mongoose.Promise = Promise; // Mongoose's promise is deprecated
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/testiredux')
    .then(() => console.log('Database connection successful!'))
    .catch((err) => console.error(err));

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);

// DEVELOPMENT ENVIRONMENT STUFF (WEBPACK HMR) =========
if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config');
    var compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, // if true, then only warnings and errors are displayed
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

// EXPRESS MIDDLEWARE =================================
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(process.env.PWD, 'static'))); // Use static folder as the root for static files
app.use(favicon(path.join(process.env.PWD, 'static', 'favicon.ico')));

// ROUTES =============================================
app.use('/', router);

// SOCKET.IO CONFIGURATION ============================
io.on('connection', (socket) => {

    // extract listID from client URL
    let listID = socket.handshake.headers.referer.split('/').pop();

    if (listID) {
        // New client connects
        console.log('[INFO]: New connection established to list ' + listID);
        socketOnConnection(socket, listID) // set list for new connection

        // Client sends an action
        socket.on('action', (action) => {
            socketActions(socket, listID, action, io) // handle various actions
        })

        socket.on('disconnect', () => {
          console.log('[INFO]: Connection dropped from list ' + listID);
        })

    }
});

// START THE SERVER ===================================
server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port);
});
